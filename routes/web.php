<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PublicEventController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/profil', fn () => Inertia::render('Profil'))->name('profil');

Route::get('/artikel', [BlogController::class, 'index'])->name('artikel.index');
Route::get('/artikel/{slug}', [BlogController::class, 'show'])->name('artikel.show');

Route::get('/event', [PublicEventController::class, 'index'])->name('event.index');
Route::get('/event/{slug}', [PublicEventController::class, 'show'])->name('event.show');
Route::post('/event/{slug}/register', [PublicEventController::class, 'register'])->name('event.register');

Route::get('/recruitment', [\App\Http\Controllers\PublicRecruitmentController::class, 'show'])->name('recruitment.show');
Route::post('/recruitment/register', [\App\Http\Controllers\PublicRecruitmentController::class, 'register'])->name('recruitment.register');

/*
|--------------------------------------------------------------------------
| Load Role-based & Settings Routes
|--------------------------------------------------------------------------
*/

require __DIR__.'/settings.php';
require __DIR__.'/auth/member.php';
require __DIR__.'/auth/admin-publika.php';
require __DIR__.'/auth/admin-psdm.php';
require __DIR__.'/auth/super-admin.php';
