<?php

namespace App\Http\Controllers\AdminPsdm;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Recruitment;
use App\Models\RecruitmentRegistrant;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_members'       => Member::count(),
            'active_members'      => Member::where('status', 'aktif')->count(),
            'trial_members'       => Member::where('status', 'trial')->count(),
            'demision_members'    => Member::where('status', 'demision')->count(),
            'nonactive_members'   => Member::where('status', 'nonaktif')->count(),
            'total_recruitments'  => Recruitment::count(),
            'active_recruitments' => Recruitment::where('is_active', true)->count(),
            'total_registrants'   => RecruitmentRegistrant::count(),
        ];

        // Group members by batch (angkatan)
        $members_by_batch = Member::select('batch', DB::raw('count(*) as count'))
            ->groupBy('batch')
            ->orderBy('batch', 'desc')
            ->get();

        // Fetch recent members
        $recent_members = Member::latest()
            ->limit(5)
            ->get(['id', 'full_name', 'position', 'batch', 'status', 'created_at']);

        // Fetch recent registrants with recruitment title
        $recent_registrants = RecruitmentRegistrant::with('recruitment:id,title')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('admin-psdm/dashboard', [
            'stats'              => $stats,
            'members_by_batch'   => $members_by_batch,
            'recent_members'     => $recent_members,
            'recent_registrants' => $recent_registrants,
        ]);
    }
}
