<?php

use App\Http\Controllers\Backend\PackageController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.package.', 'prefix' => 'package' ,'middleware' => ['auth']], function () {
    Route::get('/list', [PackageController::class, 'getList'])->name('list');
    Route::post('/store', [PackageController::class, 'store'])->name('store');
    Route::post('/update', [PackageController::class, 'update'])->name('update');
    Route::post('/change-status', [PackageController::class, 'changeStatus'])->name('change_status');
    Route::delete('/delete/{id}', [PackageController::class, 'destroy'])->name('delete');
});
