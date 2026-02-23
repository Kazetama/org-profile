<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        return Inertia::render('ketua/Members/index', [
            'members' => Member::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('ketua/Members/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'nim'       => 'required|string|unique:members,nim',
            'phone'     => 'required|string|max:20',
            'batch'     => 'required|integer',
            'position'  => 'required|string',
            'status'    => 'required|in:aktif,nonaktif,trial,demision',
        ]);

        Member::create($validated);
        return redirect('/ketua/members')->with('message', 'Member berhasil ditambahkan');
    }

    public function edit(Member $member)
    {
        return Inertia::render('ketua/Members/edit', [
            'member' => $member
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'nim'       => 'required|string|unique:members,nim,'.$member->id,
            'phone'     => 'required|string|max:20',
            'batch'     => 'required|integer',
            'position'  => 'required|string',
            'status'    => 'required|in:aktif,nonaktif,trial,demision',
        ]);

        $member->update($validated);
        return redirect('/ketua/members')->with('message', 'Member berhasil diperbarui');
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return redirect()->back();
    }
}
