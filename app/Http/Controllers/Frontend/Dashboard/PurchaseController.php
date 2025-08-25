<?php

namespace App\Http\Controllers\Frontend\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\Dashboard\PurchaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseController extends Controller
{
    public function __construct(private readonly PurchaseService $purchaseService){}

    /**
     * @param Request $request
     * @return Response
     */
    public function getList(Request $request): Response
    {
        $response = $this->purchaseService->getListData($request->query());
        return Inertia::render('Client/Dashboard/Purchase/List/Page', $response);
    }
}
