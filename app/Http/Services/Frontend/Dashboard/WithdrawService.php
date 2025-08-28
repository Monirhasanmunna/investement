<?php
namespace App\Http\Services\Frontend\Dashboard;

use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\Withdraw;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class WithdrawService
{
    use Request,Response, QueryAssistTrait, FileSaver;

    /**
     * @param array $query
     * @return array
     */
    public function getListData (array $query): array
    {
        try {
            $validationErrorMsg = $this->queryParams($query)->required([]);
            if ($validationErrorMsg) {
                return $this->response()->error($validationErrorMsg);
            }

            if (!array_key_exists('graph', $query)) {
                $query['graph'] = '{*}';
            }

            $dbQuery = Withdraw::where('user_id', Auth::id());
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Withdraw);

            $count = $dbQuery->count();
            $withdraws = $this->queryPagination($dbQuery, $query)->get();


            $totalAmount = Wallet::where('status', WALLET_STATUS_NOTWITHDRAWN)->where(function($query) {
                $query->where(function($q) {
                    $q->where('type', 'investment')
                        ->where('created_at', '<=', Carbon::now()->subMonth());
                })
                 ->orWhere(function($q) {
                     $q->where('type', 'interest');
                 });
            })->sum('amount');

            return $this->response([
                'withdraws' => $withdraws,
                'walletStatus' => withdrawStatus(),
                'totalWithdrawalAmount' => $totalAmount,
                'count' => $count,
                ...$query
            ])->success();
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    /**
     * @param array $query
     * @return array
     */
    public function withdraw (array $query): array
    {
        try {
            $totalWallet = Wallet::where('status', WALLET_STATUS_NOTWITHDRAWN)->where(function($query) {
                $query->where(function($q) {
                    $q->where('type', 'investment')
                        ->where('created_at', '<=', Carbon::now()->subMonth());
                })
                    ->orWhere(function($q) {
                        $q->where('type', 'interest');
                    });
            })->get();

            if($totalWallet->sum('amount') < 50){
                throw new \Exception('Amount less then Tk.50');
            }

            $totalAmount = 0;
            foreach ($totalWallet as $wallet) {
                $wallet->update(['status' => WALLET_STATUS_WITHDRAW]);
                $totalAmount += $wallet->amount;
            }

            Withdraw::create([
                'user_id' => Auth::id(),
                'amount' => $totalAmount,
            ]);

            Transaction::create([
                'user_id' => Auth::id(),
                'amount' => $totalAmount,
            ]);

            return $this->response([])->success('Withdraw Successful');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }

}
