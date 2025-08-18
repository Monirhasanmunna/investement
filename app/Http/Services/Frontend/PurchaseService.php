<?php
namespace App\Http\Services\Frontend;
use App\Models\Package;
use App\Traits\Request;
use App\Traits\Response;

class PurchaseService
{
    use Request,Response;

    /**
     * @param string $packageId
     * @return array
     */
    public function purchasePage(string $packageId): array
    {
        try {
            $package = Package::find($packageId);
            if(!$package){
                return $this->response()->error('package not found');
            }

            return $this->response([
                'package' => $package,
            ])->success();
        }
        catch (\Exception $e) {
            return $this->response()->errors($e->getMessage());
        }
    }

}
