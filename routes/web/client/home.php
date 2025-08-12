<?php

use App\Http\Controllers\Frontend\Tour\HomeController;
use Illuminate\Support\Facades\Route;


Route::get('/',[HomeController::class,'HomePage'])->name('home');
