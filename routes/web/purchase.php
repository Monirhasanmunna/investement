<?php

use App\Http\Controllers\Backend\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.purchase.', 'prefix' => 'admin/purchase' ,'middleware' => ['auth']], function () {
    Route::get('/list', [PurchaseController::class, 'getList'])->name('list');
    Route::post('/store', [PurchaseController::class, 'store'])->name('store');
    Route::post('/update', [PurchaseController::class, 'update'])->name('update');
    Route::post('/change-status', [PurchaseController::class, 'changeStatus'])->name('change_status');
    Route::delete('/delete/{id}', [PurchaseController::class, 'destroy'])->name('delete');
});
