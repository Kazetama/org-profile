<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Member;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_members' => Member::count(),
            'total_admins' => User::whereIn('usertype', ['super-admin', 'admin-publika', 'admin-psdm'])->count(),
            'total_posts' => Post::count(),
            'total_events' => Event::count(),
        ];

        // Fetch all active admins/coordinators to display on the dashboard
        $admins = User::whereIn('usertype', ['super-admin', 'admin-publika', 'admin-psdm'])
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'usertype']);

        return Inertia::render('super-admin/dashboard', [
            'stats' => $stats,
            'admins' => $admins,
        ]);
    }
}
