<?php

use App\Http\Controllers\Frontend\AuthController;
use Illuminate\Support\Facades\Route;


Route::group(['as'=> 'user.', 'prefix' => 'user'], function () {
    Route::get('/login', [AuthController::class, 'LoginPage'])->name('login_page');
    Route::post('/login', [AuthController::class, 'login'])->name('login_store');

    Route::get('/register', [AuthController::class, 'RegisterPage'])->name('register_page');
    Route::post('/register', [AuthController::class, 'register'])->name('register_store');
});

