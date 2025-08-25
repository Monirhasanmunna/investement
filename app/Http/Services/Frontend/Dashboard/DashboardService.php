<?php
namespace App\Http\Services\Frontend\Dashboard;
use App\Traits\Request;
use App\Traits\Response;

class DashboardService
{
    use Request,Response;

    public function __construct(readonly private TransectionService $transectionService){}

    /**
     * @param array $query
     * @return array
     */
    public function DashboardPage(array $query): array
    {
        try {
            $transectionDBQuery = [
                'graph' => '{_timestamps,amount,type}',
                'length' => 10
            ];

            $transections = $this->transectionService->getListData( $transectionDBQuery);

            return $this->response(['transections' => $transections['data']])->success();
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }
}
