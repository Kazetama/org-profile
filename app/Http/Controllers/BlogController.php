<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function index()
    {
        $posts = Post::with(['author:id,name', 'category:id,name,slug', 'tags:id,name,slug'])
            ->where('status', 'published')
            ->latest()
            ->paginate(9);

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $post = Post::with(['author:id,name', 'category:id,name,slug', 'tags:id,name,slug'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment Views Count
        $post->increment('views');

        return Inertia::render('Blog/Show', [
            'post' => $post
        ]);
    }
}
