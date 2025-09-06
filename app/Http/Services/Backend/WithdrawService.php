<?php
namespace App\Http\Services\Backend;

use App\Models\Withdraw;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;

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
                $query['graph'] = '{*,user{name,phone,withdraw_info}}';
            }

            $dbQuery = Withdraw::query();
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryWhere($dbQuery, $query, ['status']);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Withdraw);

            $count = $dbQuery->count();
            $withdraws = $this->queryPagination($dbQuery, $query)->get();

            return $this->response([
                'withdraws' => $withdraws,
                'count' => $count,
                'withdrawStatus' => withdrawStatus2(),
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
            $withdraw = Withdraw::where('id', $payload['id'])->first();
            if (!$withdraw) {
                return $this->response()->error("Withdraw not found");
            }

            $withdraw->update(['status' => $payload['status']]);

            return $this->response(['withdraw' => $withdraw])->success('Withdraw Status Updated Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }
}
