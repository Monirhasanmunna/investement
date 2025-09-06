<?php

use App\Http\Controllers\Frontend\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'user.', 'prefix' => 'user', 'auth' => ['user.auth']], function () {
    Route::get('profile',[UserController::class,'profile'])->name('profile');
    Route::post('profile/update',[UserController::class,'updateProfileData'])->name('profile.update');
});
