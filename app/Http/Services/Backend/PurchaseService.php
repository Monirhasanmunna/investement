<?php
namespace App\Http\Services\Backend;

use App\Models\Purchase;
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
    public function storeData (array $payload): array
    {
        try {
            Purchase::create( $this->_formatedPurchaseCreatedData( $payload));

            return $this->response()->success('Purchase created successfully');

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
            $faq = Purchase::where('id', $payload['id'])->first();
            if(!$faq) {
                return $this->response()->error('Purchase not found');
            }

            $imageName = null;
            if(!empty($payload['image'])) {
                $imageName = $this->upload_file( $payload['image'], 'slider','slider');
            }

            $faq->update( $this->_formatedPurchaseUpdatedData( $payload, $imageName));

            return $this->response()->success('Purchase updated successfully');

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
            $faq = Purchase::where('id', $payload['id'])->first();
            if (!$faq) {
                return $this->response()->error("Purchase not found");
            }

            $faq->update(['status' => $payload['status']]);

            return $this->response(['tag' => $faq])->success('Purchase Status Updated Successfully');
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
            $faq = Purchase::where('id', $id)->first();
            if (!$faq) {
                return $this->response()->error("Purchase not found");
            }
            $faq->delete();

            return $this->response()->success('Purchase Deleted Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    /**
     * @param array $payload
     * @return array
     */
    private function _formatedPurchaseCreatedData(array $payload): array
    {
        return [
            'answer' => $payload['answer'],
            'question' => $payload['question'],
        ];
    }


    /**
     * @param array $payload
     * @param null $imageName
     * @return array
     */
    private function _formatedPurchaseUpdatedData(array $payload, $imageName = null): array
    {
        $data = [];

        if(array_key_exists('answer', $payload)) $data['answer']            = $payload['answer'];
        if(array_key_exists('question', $payload)) $data['question']        = $payload['question'];

        return $data;
    }
}
