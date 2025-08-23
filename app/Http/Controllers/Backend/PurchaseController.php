<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Services\Backend\PurchaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseController extends Controller
{
    /**
     * @param PurchaseService $service
     */
    public function __construct(private readonly PurchaseService $service){}

    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function getList(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->service->getListData( $request->query()));

        return $response['success'] ?
            Inertia::render('Admin/Investment/List/Page', $response)
            : back()->withErrors($response['message']);

    }



    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function changeStatus (Request $request): RedirectResponse
    {
        $request->validate([
            'id'     => 'required|string|exists:purchases,id',
            'status' => 'required|in:'.implode(',', [STATUS_ACTIVE, STATUS_PENDING]),
        ]);

        $response = $this->service->changeStatus( $request->all());
        return $response['success'] ?
            back()->with($response)
            : back()->withErrors($response['message']);
    }


}
