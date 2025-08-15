<?php
namespace App\Http\Services\Backend;

use App\Models\Slider;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;

class SliderService
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

            $dbQuery = Slider::query();
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryWhere($dbQuery, $query, ['status']);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Slider);

            if (array_key_exists('search', $query)) {
                $dbQuery = $dbQuery->where('name', 'like', '%'.$query['search'].'%');
            }

            $count = $dbQuery->count();
            $sliders = $this->queryPagination($dbQuery, $query)->get();

            return $this->response([
                'sliders' => $sliders,
                'count' => $count,
                'sliderStatus' => commonStatus(),
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
    public function storeData (array $payload): array
    {
        try {
            Slider::create( $this->_formatedSliderCreatedData( $payload));

            return $this->response()->success('Slider created successfully');

        } catch (\Exception $exception) {
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
            $slider = Slider::where('id', $payload['id'])->first();
            if(!$slider) {
                return $this->response()->error('Slider not found');
            }

            $slider->update( $this->_formatedSliderUpdatedData( $payload));

            return $this->response()->success('Slider updated successfully');

        } catch (\Exception $exception) {
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
            $slider = Slider::where('id', $payload['id'])->first();
            if (!$slider) {
                return $this->response()->error("Slider not found");
            }

            $slider->update(['status' => $payload['status']]);

            return $this->response(['tag' => $slider])->success('Slider Status Updated Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }

    /**
     * @param string $id
     * @return array
     */
    public function deleteData (string $id): array
    {
        try {
            $slider = Slider::where('id', $id)->first();
            if (!$slider) {
                return $this->response()->error("Slider not found");
            }
            $slider->delete();

            return $this->response()->success('Slider Deleted Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    /**
     * @param array $payload
     * @param null $imageName
     * @return array
     */
    private function _formatedSliderCreatedData(array $payload, $imageName = null): array
    {
        return [
            'name' => $payload['name'],
            'image' => $imageName,
        ];
    }


    /**
     * @param array $payload
     * @param null $imageName
     * @return array
     */
    private function _formatedSliderUpdatedData(array $payload, $imageName = null): array
    {
        $data = [];

        if(array_key_exists('name', $payload)) $data['name']     = $payload['name'];
        if(!empty($imageName)) $data['image']                         = $imageName;

        return $data;
    }
}
