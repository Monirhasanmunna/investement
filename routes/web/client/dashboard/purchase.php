<?php

use App\Http\Controllers\Frontend\Dashboard\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'client.', 'prefix' => 'user', 'auth' => ['user.auth']], function () {
    Route::get('purchase/list',[PurchaseController::class,'getList'])->name('purchase.list');
});
