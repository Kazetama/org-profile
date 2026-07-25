<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminPsdm\MemberController;
use App\Http\Controllers\AdminPsdm\RecruitmentController;
use App\Http\Controllers\AdminPsdm\DashboardController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'redirect.usertype', 'admin-psdm'])
    ->prefix('admin-psdm')
    ->name('admin-psdm.')
    ->group(function (): void {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Members
        Route::get('/members/export', [MemberController::class, 'export'])->name('members.export');
        Route::post('/members/import', [MemberController::class, 'import'])->name('members.import');
        Route::resource('/members', MemberController::class);

        // Recruitment
        Route::patch('/recruitment/{recruitment}/toggle', [RecruitmentController::class, 'toggle'])->name('recruitment.toggle');
        Route::get('/recruitment/{recruitment}/registrants', [RecruitmentController::class, 'registrants'])->name('recruitment.registrants');
        Route::get('/recruitment/{recruitment}/export', [RecruitmentController::class, 'exportRegistrants'])->name('recruitment.export');
        Route::resource('/recruitment', RecruitmentController::class);
    });

