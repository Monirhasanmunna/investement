<?php
namespace App\Http\Services\Backend;

use App\Models\Package;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;

class PackageService
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

            $dbQuery = Package::query();
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryWhere($dbQuery, $query, ['status']);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Package);

            if (array_key_exists('search', $query)) {
                $dbQuery = $dbQuery->where('name', 'like', '%'.$query['search'].'%');
            }

            $count = $dbQuery->count();
            $packages = $this->queryPagination($dbQuery, $query)->get();

            return $this->response([
                'packages' => $packages,
                'count' => $count,
                'packageStatus' => commonStatus(),
                'interestType' => interestType(),
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
            Package::create( $this->_formatedPackageCreatedData( $payload));

            return $this->response()->success('Package created successfully');

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
            $faq = Package::where('id', $payload['id'])->first();
            if(!$faq) {
                return $this->response()->error('Package not found');
            }

            $faq->update( $this->_formatedPackageUpdatedData( $payload));

            return $this->response()->success('Package updated successfully');

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
            $faq = Package::where('id', $payload['id'])->first();
            if (!$faq) {
                return $this->response()->error("Package not found");
            }

            $faq->update(['status' => $payload['status']]);

            return $this->response(['tag' => $faq])->success('Package Status Updated Successfully');
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
            $faq = Package::where('id', $id)->first();
            if (!$faq) {
                return $this->response()->error("Package not found");
            }
            $faq->delete();

            return $this->response()->success('Package Deleted Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    /**
     * @param array $payload
     * @return array
     */
    private function _formatedPackageCreatedData(array $payload): array
    {
        return [
            'name' => $payload['name'],
            'price' => $payload['price'],
            'interest_type' => $payload['interest_type'],
            'interest' => $payload['interest'],
            'duration' => $payload['duration'],
        ];
    }


    /**
     * @param array $payload
     * @return array
     */
    private function _formatedPackageUpdatedData(array $payload): array
    {
        $data = [];

        if(array_key_exists('name', $payload)) $data['name']                            = $payload['name'];
        if(array_key_exists('price', $payload)) $data['price']                          = $payload['price'];
        if(array_key_exists('interest_type', $payload)) $data['interest_type']          = $payload['interest_type'];
        if(array_key_exists('interest', $payload)) $data['interest']                    = $payload['interest'];
        if(array_key_exists('duration', $payload)) $data['duration']                    = $payload['duration'];

        return $data;
    }
}
