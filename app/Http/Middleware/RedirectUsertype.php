<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectUsertype
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        $dashboards = [
            'super-admin' => 'super-admin.dashboard',
            'admin-publika' => 'admin-publika.dashboard',
            'admin-psdm' => 'admin-psdm.dashboard',
            'member' => 'dashboard',
        ];

        $usertype = $user->usertype;

        if (! isset($dashboards[$usertype])) {
            return redirect()->route('dashboard');
        }

        $targetRoute = $dashboards[$usertype];

        if ($usertype === 'super-admin') {
            return $next($request);
        }

        $restrictedPaths = match ($usertype) {
            'admin-publika' => ['super-admin/*', 'admin-psdm/*'],
            'admin-psdm' => ['admin-publika/*', 'super-admin/*'],
            'member' => ['admin-publika/*', 'super-admin/*', 'admin-psdm/*'],
            default => [],
        };

        foreach ($restrictedPaths as $path) {
            if ($request->is($path)) {

                if ($request->routeIs($targetRoute)) {
                    break;
                }

                return redirect()->route($targetRoute);
            }
        }

        return $next($request);
    }
}
