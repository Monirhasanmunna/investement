<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\Dashboard\PurchaseService;
use Illuminate\Http\RedirectResponse;
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


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function Purchase(Request $request): RedirectResponse
    {
        $request->validate([
            'package_id' => 'required',
            'trx_id'     => 'required',
            'reference_phone' => 'required',
            'reference_name' => 'required',

        ]);

        $response = $this->service->purchase( $request->all());

        return $response['success'] ?
            to_route('home')->with($response) :
            back()->withErrors($response['message']);
    }
}
