<?php

use App\Http\Controllers\Backend\WithdrawController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.withdraw.', 'prefix' => 'admin/withdraw' ,'middleware' => ['auth']], function () {
    Route::get('/list', [WithdrawController::class, 'getList'])->name('list');
    Route::post('/change-status', [WithdrawController::class, 'changeStatus'])->name('change_status');
});
