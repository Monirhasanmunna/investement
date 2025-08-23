<?php

use App\Http\Controllers\Backend\FaqController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.faq.', 'prefix' => 'admin/faq' ,'middleware' => ['auth']], function () {
    Route::get('/list', [FaqController::class, 'getList'])->name('list');
    Route::post('/store', [FaqController::class, 'store'])->name('store');
    Route::post('/update', [FaqController::class, 'update'])->name('update');
    Route::post('/change-status', [FaqController::class, 'changeStatus'])->name('change_status');
    Route::delete('/delete/{id}', [FaqController::class, 'destroy'])->name('delete');
});
