<?php

use App\Http\Controllers\Frontend\Dashboard\TransectionController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'client.', 'prefix' => 'user', 'auth' => ['user.auth']], function () {
    Route::get('transection',[TransectionController::class,'getList'])->name('transection.list');
});
