<?php

use App\Http\Controllers\Frontend\PurchaseController;
use Illuminate\Support\Facades\Route;


Route::get('/purchase/{packageId}',[PurchaseController::class,'PurchasePage'])->name('purchase');
