<?php
namespace App\Http\Services\Frontend;
use App\Http\Services\Backend\SettingService;
use App\Models\Package;
use App\Models\Purchase;
use App\Traits\Request;
use App\Traits\Response;
use Illuminate\Support\Facades\Auth;

class PurchaseService
{
    use Request,Response;

    public function __construct(private readonly SettingService $settingService){}

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

            $settingDBQuery = ['key' => 'payment_info', 'graph' => '{key,value}'];
            $appSetting = $this->settingService->getListData($settingDBQuery);

            return $this->response([
                'package' => $package,
                'appSetting' => ['payment_info' => $appSetting['data']['settings'][0]]
            ])->success();
        }
        catch (\Exception $e) {
            return $this->response()->errors($e->getMessage());
        }
    }


    /**
     * @param array $payload
     * @return array
     */
    public function purchase(array $payload): array
    {
        try {
            $package = Package::find($payload['package_id']);
            if(!$package){
                return $this->response()->error('package not found');
            }

            $user = Auth::user();
            if(!$user){
                return $this->response()->error('user not login');
            }

            Purchase::create( $this->_purchaseCreatedData( $payload, $user, $package));

            return $this->response()->success('Purchased successfully');
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }


    /**
     * @param array $payload
     * @param object $user
     * @param object $package
     * @return array
     */
    private function _purchaseCreatedData(array $payload, object $user, object $package): array
    {
        return [
            'user_id'           => $user->id,
            'package_id'        => $payload['package_id'],
            'trx_id'            => $payload['trx_id'],
            'reference_phone'   => $payload['reference_phone'],
            'reference_name'    => $payload['reference_name'],
            'amount'            => $package->price,
            'package_info'      => json_encode( $this->_packageJsonDataFormated($package)),
            'purchase_at'       => today()
        ];
    }


    /**
     * @param object $package
     * @return array
     */
    private function _packageJsonDataFormated (object $package): array
    {
        return [
            'package_id'        => $package->id,
            'name'              => $package->name,
            'price'             => $package->price,
            'interest_type'     => $package->interest_type,
            'interest'          => $package->interest,
            'duration_day'      => $package->duration_day,
        ];
    }

}
