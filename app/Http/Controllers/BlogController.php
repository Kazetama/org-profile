<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function index()
    {

        $posts = Post::where('status', 'published')
            ->latest()
            ->get();

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {

        $post = Post::where('slug', $slug)->firstOrFail();

        return Inertia::render('Blog/Show', [
            'post' => $post
        ]);
    }
}
