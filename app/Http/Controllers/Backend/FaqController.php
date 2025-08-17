<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Services\Backend\DashboardService;
use App\Http\Services\Backend\FaqService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * @param FaqService $service
     */
    public function __construct(private readonly FaqService $service){}

    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function getList(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->service->getListData( $request->query()));

        return $response['success'] ?
            Inertia::render('Admin/Faq/List/Page', $response)
            : back()->withErrors($response['message']);

    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'question' => 'required|string|unique:faqs,question',
            'answer' => 'required|string',
        ]);

        $response = $this->handleSession( $this->service->storeData( $request->all()));

        return $response['success'] ?
            back()->with($response)
            : back()->withErrors($response['message']);
    }


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'id'        => 'required|string|exists:faqs,id',
            'question' => 'required|string|unique:faqs,question,'. $request->id,
            'answer' => 'required|string',
        ]);

        $response = $this->handleSession( $this->service->updateData( $request->all()));

        return $response['success'] ?
            back()->with($response)
            : back()->withErrors($response['message']);
    }


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function changeStatus (Request $request): RedirectResponse
    {
        $request->validate([
            'id'     => 'required|string|exists:faqs,id',
            'status' => 'required|in:'.implode(',', [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_PENDING]),
        ]);

        $response = $this->service->changeStatus( $request->all());
        return $response['success'] ?
            back()->with($response)
            : back()->withErrors($response['message']);
    }

    /**
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy (string $id): RedirectResponse
    {
        $response = $this->service->deleteData( $id);
        return $response['success'] ?
            back()->with($response)
            : back()->withErrors($response['message']);
    }

}
