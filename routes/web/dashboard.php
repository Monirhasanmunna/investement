<?php

use App\Http\Controllers\Backend\DashboardController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.', 'prefix' => 'admin' ,'middleware' => ['admin.auth']], function () {
    Route::get('dashboard', [DashboardController::class, 'Home'])->name('dashboard');
});
