<?php
namespace App\Http\Services\Backend;

use App\Models\Faq;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;

class FaqService
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

            $dbQuery = Faq::query();
            $dbQuery = QueryAssist::queryOrderBy($dbQuery, $query);
            $dbQuery = QueryAssist::queryWhere($dbQuery, $query, ['status']);
            $dbQuery = QueryAssist::queryGraphSQL($dbQuery, $query, new Faq);

            if (array_key_exists('search', $query)) {
                $dbQuery = $dbQuery->where('name', 'like', '%'.$query['search'].'%');
            }

            $count = $dbQuery->count();
            $faqs = $this->queryPagination($dbQuery, $query)->get();

            return $this->response([
                'faqs' => $faqs,
                'count' => $count,
                'faqStatus' => commonStatus(),
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
            Faq::create( $this->_formatedFaqCreatedData( $payload));

            return $this->response()->success('Faq created successfully');

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
            $faq = Faq::where('id', $payload['id'])->first();
            if(!$faq) {
                return $this->response()->error('Faq not found');
            }

            $imageName = null;
            if(!empty($payload['image'])) {
                $imageName = $this->upload_file( $payload['image'], 'slider','slider');
            }

            $faq->update( $this->_formatedFaqUpdatedData( $payload, $imageName));

            return $this->response()->success('Faq updated successfully');

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
            $faq = Faq::where('id', $payload['id'])->first();
            if (!$faq) {
                return $this->response()->error("Faq not found");
            }

            $faq->update(['status' => $payload['status']]);

            return $this->response(['tag' => $faq])->success('Faq Status Updated Successfully');
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
            $faq = Faq::where('id', $id)->first();
            if (!$faq) {
                return $this->response()->error("Faq not found");
            }
            $faq->delete();

            return $this->response()->success('Faq Deleted Successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    /**
     * @param array $payload
     * @return array
     */
    private function _formatedFaqCreatedData(array $payload): array
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
    private function _formatedFaqUpdatedData(array $payload, $imageName = null): array
    {
        $data = [];

        if(array_key_exists('answer', $payload)) $data['answer']            = $payload['answer'];
        if(array_key_exists('question', $payload)) $data['question']        = $payload['question'];

        return $data;
    }
}
