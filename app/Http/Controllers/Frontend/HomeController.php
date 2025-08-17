<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\HomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(private readonly HomeService $homeService){}

    /**
     * @param Request $request
     * @return Response
     */
    public function HomePage(Request $request): Response
    {
        $response = $this->homeService->getData($request->query());
        return Inertia::render('Client/Home/Page', $response);
    }
}
