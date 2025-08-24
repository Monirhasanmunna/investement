<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\WithdrawService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WithdrawController extends Controller
{
    public function __construct(private readonly WithdrawService $withdrawService){}

    /**
     * @param Request $request
     * @return Response
     */
    public function getList(Request $request): Response
    {
        $response = $this->handleSession( $this->withdrawService->getListData($request->query()));
        return Inertia::render('Client/Withdraw/List/Page', $response);
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function withdraw(Request $request): RedirectResponse
    {
        $response = $this->handleSession( $this->withdrawService->withdraw($request->all()));
        return $response['success'] ?
            back()->with($response) :
            back()->withErrors($response['message']);
    }
}
