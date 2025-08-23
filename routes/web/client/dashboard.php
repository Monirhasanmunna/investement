<?php

use App\Http\Controllers\Frontend\DashboardController;
use Illuminate\Support\Facades\Route;


Route::group(['as' => 'user.dashboard.', 'prefix' => 'user', 'middleware' => ['user.auth']], function () {
    Route::get('/dashboard', [DashboardController::class, 'Dashboard'])->name('dashboard');
});
