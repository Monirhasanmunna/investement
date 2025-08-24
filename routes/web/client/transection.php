<?php

use App\Http\Controllers\Frontend\TransectionController;
use Illuminate\Support\Facades\Route;


Route::get('/user/transection',[TransectionController::class,'getList'])->name('client.transection.list');
