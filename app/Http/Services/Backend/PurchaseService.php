<?php
namespace App\Http\Services\Backend;

use App\Models\Purchase;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;

class PurchaseService
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
                $query['graph'] = '{trx_id,amount,reference_name,reference_phone,status,package{name},user{name}}';
            }

            $dbQuery = Purchase::query();
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryWhere($dbQuery, $query, ['status']);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Purchase);

            if (array_key_exists('search', $query)) {
                $dbQuery = $dbQuery->where('trx_id', 'like', '%'.$query['search'].'%');
            }

            $count = $dbQuery->count();
            $purchases = $this->queryPagination($dbQuery, $query)->get();

            return $this->response([
                'purchases' => $purchases,
                'count' => $count,
                'purchaseStatus' => investmentStatus(),
                ...$query
            ])->success();
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }

    /**
     * @param array $payload
     * @return array
     */
    public function changeStatus (array $payload): array
    {
        try {
            $purchase = Purchase::where('id', $payload['id'])->first();
            if (!$purchase) {
                return $this->response()->error("Purchase not found");
            }

            $purchase->update(['status' => $payload['status']]);

            if($purchase->status === STATUS_ACTIVE){
                $purchaseTransaction = Transaction::where('type', 'investment')->where('user_id', $purchase->user_id)->exists();
                if(!$purchaseTransaction){
                    Transaction::create( $this->_transactionCreatedDataFormat( $purchase));
                }
            }

            if($purchase->status === STATUS_ACTIVE){
                $purchaseWallet = Wallet::where('type', 'investment')->where('user_id', $purchase->user_id)->exists();
                if(!$purchaseWallet){
                    Wallet::create( $this->_walletCreateDataFormat( $purchase));
                }
            }

            return $this->response(['purchase' => $purchase])->success('Purchase Status Updated Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    /**
     * @param object $purchase
     * @return array
     */
    public function _transactionCreatedDataFormat(object $purchase): array
    {
        return [
            'user_id' => $purchase->user_id,
            'amount' => $purchase->amount,
            'type'  => 'investment',
        ];
    }

    public function _walletCreateDataFormat(object $purchase): array
    {
        return [
            'user_id' => $purchase->user_id,
            'amount' => $purchase->amount,
            'type'  => 'investment',
        ];
    }

}
