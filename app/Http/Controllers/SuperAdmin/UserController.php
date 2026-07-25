<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get(['id', 'name', 'email', 'usertype', 'created_at']);

        return Inertia::render('super-admin/users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('super-admin/users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'usertype' => ['required', 'string', Rule::in(['super-admin', 'admin-publika', 'admin-psdm', 'member'])],
        ]);

        User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'usertype' => $validated['usertype'],
        ]);

        return redirect()
            ->route('super-admin.users.index')
            ->with('success', 'Koordinator berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        return Inertia::render('super-admin/users/edit', [
            'user' => $user->only(['id', 'name', 'email', 'usertype']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'usertype' => ['required', 'string', Rule::in(['super-admin', 'admin-publika', 'admin-psdm', 'member'])],
        ]);

        $data = [
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'usertype' => $validated['usertype'],
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        return redirect()
            ->route('super-admin.users.index')
            ->with('success', 'Data koordinator berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        // Prevent deleting oneself
        if (Auth::id() === $user->id) {
            return back()->withErrors(['message' => 'Anda tidak dapat menghapus akun Anda sendiri.']);
        }

        $user->delete();

        return back()->with('success', 'Akun koordinator berhasil dihapus.');
    }
}
