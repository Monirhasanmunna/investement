<?php

use App\Http\Controllers\Frontend\WithdrawController;
use Illuminate\Support\Facades\Route;


Route::group(['as' => 'client.', 'prefix' => 'user', 'auth' => ['user.auth']], function () {
    Route::get('withdraw/list',[WithdrawController::class,'getList'])->name('withdraw.list');
    Route::post('withdraw',[WithdrawController::class,'withdraw'])->name('withdraw.store');
});
