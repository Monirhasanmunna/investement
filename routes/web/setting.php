<?php

use App\Http\Controllers\Backend\SettingController;
use Illuminate\Support\Facades\Route;

Route::group(['as'=> 'admin.setting.', 'prefix' => 'admin/setting' ,'middleware' => ['auth']], function () {
    Route::get('/', [SettingController::class, 'getList'])->name('list');
    Route::post('/update', [SettingController::class, 'update'])->name('update');
});
