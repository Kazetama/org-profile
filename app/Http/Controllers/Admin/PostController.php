<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index()
    {
        return Inertia::render('admin/posts/index', [
            'posts' => Post::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/posts/create');
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'title' => 'required',
            'excerpt' => 'nullable',
            'content' => 'required',
            'thumbnail' => 'nullable|image',
            'status' => 'required'
        ]);

        if ($request->hasFile('thumbnail')) {

            $data['thumbnail'] = $request
                ->file('thumbnail')
                ->store('posts', 'public');
        }

        $data['slug'] = Str::slug($request->title);

        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        Post::create($data);

        return redirect()->route('admin.posts.index');
    }

    public function edit(Post $post)
    {
        return Inertia::render('admin/posts/edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => 'required',
            'excerpt' => 'nullable',
            'content' => 'required',
            'thumbnail' => 'nullable|image',
            'status' => 'required'
        ]);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('posts', 'public');
        }

        $data['slug'] = Str::slug($request->title);

        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        $post->update($data);

        return redirect()->route('admin.posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return back();
    }
}
