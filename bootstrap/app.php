<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\{Exceptions, Middleware};
use App\Http\Middleware\{HandleAppearance, HandleInertiaRequests};
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'super-admin'       => \App\Http\Middleware\SuperAdminMiddleware::class,
            'admin-publika'     => \App\Http\Middleware\AdminPublikaMiddleware::class,
            'admin-psdm'        => \App\Http\Middleware\AdminPsdmMiddleware::class,
            'member'            => \App\Http\Middleware\MemberMiddleware::class,
            'redirect.usertype' => \App\Http\Middleware\RedirectUsertype::class,
        ]);
    })
    ->withExceptions(fn (Exceptions $exceptions) => null)
    ->create();
