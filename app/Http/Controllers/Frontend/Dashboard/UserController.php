<?php

namespace App\Http\Controllers\Frontend\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\Dashboard\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService){}

    /**
     * @param Request $request
     * @return Response
     */
    public function profile(Request $request): Response
    {
        $response = $this->handleSession( $this->userService->getProfileData($request->query()));
        return Inertia::render('Client/User/Profile/Page', $response);
    }


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateProfileData(Request $request): RedirectResponse
    {
        $response = $this->userService->updateProfileData($request->all());
        return back()->with($response);
    }
}
