<?php
namespace App\Http\Services\Frontend;
use App\Traits\Request;
use App\Traits\Response;

class DashboardService
{
    use Request,Response;

    /**
     * @param array $query
     * @return array
     */
    public function DashboardPage(array $query): array
    {
        try {
            return $this->response()->success();
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }
}
