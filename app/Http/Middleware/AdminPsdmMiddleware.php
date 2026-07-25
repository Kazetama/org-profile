<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminPsdmMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        if ($user->usertype !== 'admin-psdm') {
            return redirect()->route(
                match ($user->usertype) {
                    'super-admin' => 'super-admin.dashboard',
                    'admin-publika' => 'admin-publika.dashboard',
                    'member' => 'dashboard',
                    default => 'dashboard',
                }
            );
        }

        return $next($request);
    }
}
