<?php

use App\Http\Controllers\Frontend\Dashboard\WalletController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'client.', 'prefix' => 'user', 'auth' => ['user.auth']], function () {
    Route::get('wallet',[WalletController::class,'getList'])->name('wallet.list');
});
