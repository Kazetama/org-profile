<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminPublika\DashboardController;
use App\Http\Controllers\AdminPublika\EventController;
use App\Http\Controllers\AdminPublika\PostController;
use App\Http\Controllers\AdminPublika\CategoryController;
use App\Http\Controllers\AdminPublika\TagController;

Route::middleware(['auth', 'verified', 'redirect.usertype', 'admin-publika'])
    ->prefix('admin-publika')
    ->name('admin-publika.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('event/{event}/participants', [EventController::class, 'participants'])->name('event.participants');
        Route::get('event/{event}/export', [EventController::class, 'export'])->name('event.export');
        
        Route::resource('event', EventController::class);
        Route::resource('posts', PostController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('tags', TagController::class);
    });
