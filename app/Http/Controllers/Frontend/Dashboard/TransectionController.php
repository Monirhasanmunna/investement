<?php

namespace App\Http\Controllers\Frontend\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\Dashboard\TransectionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransectionController extends Controller
{
    public function __construct(private readonly TransectionService $transectionService){}

    /**
     * @param Request $request
     * @return Response
     */
    public function getList(Request $request): Response
    {
        $response = $this->transectionService->getListData($request->query());
        return Inertia::render('Client/Transection/List/Page', $response);
    }
}
