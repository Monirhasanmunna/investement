<?php

use App\Http\Controllers\Backend\SliderController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.slider.', 'prefix' => 'admin/slider' ,'middleware' => ['auth']], function () {
    Route::get('/list', [SliderController::class, 'getList'])->name('list');
    Route::post('/store', [SliderController::class, 'store'])->name('store');
    Route::post('/update', [SliderController::class, 'update'])->name('update');
    Route::post('/change-status', [SliderController::class, 'changeStatus'])->name('change_status');
    Route::delete('/delete/{id}', [SliderController::class, 'destroy'])->name('delete');
});
