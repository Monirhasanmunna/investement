<?php
namespace App\Http\Services\Frontend;

use App\Http\Services\Backend\FaqService;
use App\Http\Services\Backend\PackageService;
use App\Http\Services\Backend\SliderService;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;
use Illuminate\Support\Facades\Cache;

class HomeService
{
    use Request,Response, QueryAssistTrait, FileSaver;


    public function __construct(
        private readonly SliderService $sliderService,
        private readonly FaqService $faqService,
        private readonly PackageService $packageService,
    ){}


    /**
     * @param array $query
     * @return array
     */
    public function getData (array $query): array
    {
        try {
            $packages = Cache::remember('packages', now()->addMinute(10), function () {
                $packageDBQuery = [
                    'graph' => '{name,price,interest_type,interest,duration}',
                    'status' => STATUS_ACTIVE,
                    'length' => 100
                ];

                return $this->packageService->getListData( $packageDBQuery);
            });

            $sliders = Cache::remember('sliders', now()->addMinute(20), function () {
                $sliderDBQuery = [
                    'graph' => '{image}',
                    'status' => STATUS_ACTIVE,
                    'length' => 50
                ];

                return $this->sliderService->getListData( $sliderDBQuery);
            });


            $faqs = Cache::remember('faqs', now()->addMinute(20), function () {
                $faqDBQuery = [
                    'graph' => '{question,answer}',
                    'status' => STATUS_ACTIVE,
                    'length' => 50
                ];

                return $this->faqService->getListData( $faqDBQuery);
            });


            $data = [
                'packages' => $packages['data']['packages'],
                'sliders' => $sliders['data']['sliders'],
                'faqs' => $faqs['data']['faqs'],
            ];

            return $this->response([...$data, ...$query])->success();
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }

}
