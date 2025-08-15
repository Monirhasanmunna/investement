<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Services\Backend\DashboardService;
use App\Http\Services\Backend\SliderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SliderController extends Controller
{
    /**
     * @param SliderService $service
     */
    public function __construct(private readonly SliderService $service){}

    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function getList(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->service->getListData( $request->query()));

        return $response['success'] ?
            Inertia::render('Admin/Slider/List/Page', $response)
            : back()->withErrors($response['message']);

    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
//        dd($request);
        $request->validate([
            'name' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            'id'        => 'required|string|exists:sliders,id',
            'name'      => 'nullable|string',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            'id'     => 'required|string|exists:sliders,id',
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
