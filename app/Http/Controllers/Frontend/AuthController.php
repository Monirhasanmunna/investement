<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Services\Frontend\AuthService;
use App\Http\Services\Frontend\HomeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function __construct(private readonly  AuthService $authService){}


    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function RegisterPage(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->authService->registerPage( $request->query()));

        return $response['success'] ?
            Inertia::render('Client/Auth/Registration')->with($response)
            : back()->withErrors($response['message']);

    }


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required|unique:users,phone',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
        ]);

        $response = $this->handleSession( $this->authService->register( $request->all()));

        return $response['success'] ?
            !array_key_exists('packageId', $response['data']) ?
                to_route('user.login_page')->with($response)
                : to_route('user.login_page', ['package_id' => $response['data']['packageId']])->with($response)
                    : back()->withErrors($response['message']);
    }


    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function LoginPage(Request $request): Response|RedirectResponse
    {
        $response = $this->handleSession( $this->authService->loginPage( $request->query()));

        return $response['success'] ?
            Inertia::render('Client/Auth/Login')->with($response)
            : back()->withErrors($response['message']);
    }


    /**
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function login(Request $request): Response|RedirectResponse
    {
        $request->validate([
            'phone' => 'required|exists:users,phone',
            'password' => 'required|min:8',
            'package_id' => 'nullable|exists:packages,id',
        ]);


        $response = $this->handleSession( $this->authService->login( $request->all()));

        return $response['success'] ?
            !array_key_exists('packageId', $response['data']) ?
                Inertia::render('Client/Auth/Login')->with($response)
                    : to_route('purchase', ['packageId' => $response['data']['packageId']])
                        : back()->withErrors($response['message']);
    }
}
