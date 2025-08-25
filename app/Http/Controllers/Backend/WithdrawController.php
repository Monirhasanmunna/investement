<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Services\Backend\DashboardService;
use App\Http\Services\Backend\WithdrawService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WithdrawController extends Controller
{
    /**
     * @param WithdrawService $service
     */
    public function __construct(private readonly WithdrawService $service){}

    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function getList(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->service->getListData( $request->query()));

        return $response['success'] ?
            Inertia::render('Admin/Withdraw/List/Page', $response)
            : back()->withErrors($response['message']);

    }



    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function changeStatus (Request $request): RedirectResponse
    {
        $request->validate([
            'id'     => 'required|string|exists:withdraws,id',
            'status' => 'required|in:'.implode(',', [WITHDRAW_STATUS_PENDING, WITHDRAW_STATUS_ACCEPTED]),
        ]);

        $response = $this->service->changeStatus( $request->all());
        return $response['success'] ?
            back()->with($response)
            : back()->withErrors($response['message']);
    }

}
