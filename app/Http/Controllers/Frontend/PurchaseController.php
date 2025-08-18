<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\PurchaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseController extends Controller
{
    public function __construct(private readonly PurchaseService $service){}

    /**
     * @param Request $request
     * @param string $packageId
     * @return Response
     */
    public function PurchasePage(Request $request, string $packageId): Response
    {
        $response = $this->service->purchasePage( $packageId);
        return Inertia::render('Client/Purchase/Page', $response);
    }
}
