<?php

use App\Http\Controllers\Frontend\WalletController;
use Illuminate\Support\Facades\Route;


Route::get('/user/wallet',[WalletController::class,'getList'])->name('client.wallet.list');
