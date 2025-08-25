<?php
namespace App\Http\Services\Backend;
use App\Models\Package;
use App\Models\Purchase;
use App\Models\User;
use App\Models\Withdraw;
use App\Traits\Response;

class DashboardService
{
    use Response;

    /**
     * @param array $query
     * @return array
     */
    public function Home (array $query): array
    {
        try {
            $totalPackage = Package::all()->count() ?? 0;
            $totalInvestment = Purchase::all()->sum('amount') ?? 0;
            $totalWithdraw = Withdraw::all()->sum('amount') ?? 0;
            $totalUser = User::all()->count() ?? 0;

           return $this->response([
               'total_package' => $totalPackage,
               'total_investment' => $totalInvestment,
               'total_withdraw' => $totalWithdraw,
               'total_user' => $totalUser,
           ])->success();
        } catch (\Exception $exception) {
            return $this->response( )->error($exception->getMessage());
        }
    }
}
