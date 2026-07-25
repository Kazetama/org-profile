<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        if ($user->usertype !== 'super-admin') {
            return redirect()->route(
                match ($user->usertype) {
                    'admin-psdm' => 'admin-psdm.dashboard',
                    'admin-publika' => 'admin-publika.dashboard',
                    'member' => 'dashboard',
                    default => 'dashboard',
                }
            );
        }

        return $next($request);
    }
}
