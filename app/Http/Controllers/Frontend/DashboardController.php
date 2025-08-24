<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\DashboardService;
use App\Http\Services\Frontend\PurchaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $service){}


    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function Dashboard(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->service->DashboardPage( $request->query()));

        return $response['success'] ?
            Inertia::render('Client/Dashboard/Page', $response) :
                back()->withErrors($response['message']);
    }

}
