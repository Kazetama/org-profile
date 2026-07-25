<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'member'])
    ->get('/dashboard', fn () => Inertia::render('dashboard'))
    ->name('dashboard');
