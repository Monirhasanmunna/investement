<?php

use App\Http\Controllers\Backend\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.user.', 'prefix' => 'admin/user' ,'middleware' => ['auth']], function () {
    Route::get('/list', [UserController::class, 'getList'])->name('list');
});
