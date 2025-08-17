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

    public function LoginPage(Request $request): Response
    {
        return Inertia::render('Client/Auth/Login');
    }

    public function RegisterPage(Request $request): Response
    {
        return Inertia::render('Client/Auth/Registration');
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
           to_route('user.login_page')->with($response)
            : back()->withErrors($response['message']);
    }
}
