<?php

namespace App\Http\Controllers\Frontend\Tour;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\HomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function HomePage(Request $request): Response
    {
        return Inertia::render('Client/Home/Page');
    }
}
