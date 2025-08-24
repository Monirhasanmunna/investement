<?php
namespace App\Http\Services\Frontend;

use App\Models\Purchase;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;
use Illuminate\Support\Facades\Auth;

class WalletService
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

            $dbQuery = Wallet::where('user_id', Auth::id())->where('status', WALLET_STATUS_NOTWITHDRAWN);
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Wallet);

            $count = $dbQuery->count();
            $wallets = $this->queryPagination($dbQuery, $query)->get();

            return $this->response([
                'wallets' => $wallets,
                'walletStatus' => walletStatus(),
                'count' => $count,
                ...$query
            ])->success();
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }

}
