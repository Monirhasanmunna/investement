<?php
namespace App\Http\Services\Backend;

use App\Models\Setting;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;

class SettingService
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

            $dbQuery = Setting::query();
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryWhere($dbQuery, $query, ['key']);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Setting);

            $settings = $dbQuery->get();

            return $this->response([
                'settings' => $settings,
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
    public function updateData (array $payload): array
    {
        try {
            $others = [
                "payment_info",
            ];

            foreach ($others as $key){
                if(array_key_exists($key, $payload)){
                    $appSetting = Setting::where('key', $key)->first();
                    $appSetting ?
                        $appSetting->update(['value' => json_encode($payload[$key])])
                        : Setting::create(['key' => $key, 'value' => json_encode($payload[$key])]);
                }
            }

            return $this->response()->success('Setting Updated Successfully');

        } catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }
}
