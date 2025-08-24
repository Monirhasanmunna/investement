<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\HomeService;
use App\Http\Services\Frontend\WalletService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WalletController extends Controller
{
    public function __construct(private readonly WalletService $walletService){}

    /**
     * @param Request $request
     * @return Response
     */
    public function getList(Request $request): Response
    {
        $response = $this->walletService->getListData($request->query());
        return Inertia::render('Client/Wallet/List/Page', $response);
    }
}
