<?php

namespace App\Console\Commands;

use App\Models\Purchase;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessInterest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'interest:process';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process interest for active investment users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $purchases = Purchase::with(['user', 'package'])->where('status', STATUS_ACTIVE)
                ->whereHas('user', fn ($query) => $query->where('user_type', 'investor'))
                ->get();

            if($purchases->count() <= 0) {
                throw new \Exception("No active investment purchases");
            }

            DB::beginTransaction();
            foreach ($purchases as $purchase) {
                $package = json_decode($purchase->package_info, true);
                $user = $purchase->user;

                $amount = $package['price'];
                $interestRate = $package['interest'] ?? 0;
                $interestType = $package['interest_type'] ?? 'daily';

                $expiryDate = isset($purchase->package->duration) ? Carbon::parse($purchase->package->duration) : null;

                if ($expiryDate && now()->gte($expiryDate)) {
                    continue;
                }

                $lastInterest = $purchase->last_interest_paid ?? $purchase->purchase_at;
                $due = false;

                // For daily interest: 24 hours since last interest
                if ($interestType === 'daily' && Carbon::parse($lastInterest)->addHours(24)->lte(now())) {
                    $due = true;
                }

                // For monthly interest: 1 month since last interest
                if ($interestType === 'monthly' && Carbon::parse($lastInterest)->addMonths(1)->lte(now())) {
                    $due = true;
                }

                if($due) {
                    $interestAmount = $amount * ($interestRate / 100);

                    // Wallet create
                    Wallet::create([
                        'user_id' => $user->id,
                        'purchase_id' => $purchase->id,
                        'amount' => $interestAmount,
                    ]);

                    // Transection create
                    Transaction::create([
                        'user_id' => $user->id,
                        'purchase_id' => $purchase->id,
                        'amount' => $interestAmount,
                        'type' => 'interest',
                    ]);

                    // Update last_interest_paid
                    $purchase->last_interest_paid = now();
                    $purchase->save();
                }
            }

            DB::commit();
//            $this->info('Interest processed successfully ✅');
            Log::info('Interest processed');
        }
        catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
        }
    }
}
