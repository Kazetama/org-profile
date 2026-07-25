<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MemberMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        if ($user->usertype !== 'member') {
            return redirect()->route(
                match ($user->usertype) {
                    'super-admin' => 'super-admin.dashboard',
                    'admin-publika' => 'admin-publika.dashboard',
                    'admin-psdm' => 'admin-psdm.dashboard',
                    default => 'dashboard',
                }
            );
        }

        return $next($request);
    }
}
