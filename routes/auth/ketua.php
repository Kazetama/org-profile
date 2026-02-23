<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use Inertia\Inertia;

Route::middleware(['auth', 'redirect.usertype', 'ketua'])
    ->prefix('ketua')
    ->name('ketua.')
    ->group(function () {
        Route::get('/dashboard', fn () =>
            Inertia::render('ketua/dashboard')
        )->name('dashboard');

        // Resource route untuk CRUD members
        Route::resource('members', MemberController::class);
    });
