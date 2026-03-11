import { Head, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'
import AppLayout from '@/layouts/app-layout'

type Post = {
    id: number
    title: string
    excerpt: string | null
    content: string
    thumbnail: string | null
    status: string
}

type PostForm = {
    title: string
    excerpt: string
    content: string
    thumbnail: File | null
    status: string
}

type Props = {
    post: Post
}

export default function Edit({ post }: Props) {

    const { data, setData, put, processing } = useForm<PostForm>({
        title: post.title ?? '',
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        thumbnail: null,
        status: post.status ?? 'draft'
    })

    function submit(e: FormEvent) {

        e.preventDefault()

        put(`/admin/posts/${post.id}`, {
            forceFormData: true
        })

    }

    return (

        <AppLayout>

            <Head title="Edit Post" />

            <div className="p-6 max-w-xl space-y-4">

                <h1 className="text-2xl font-semibold">
                    Edit Post
                </h1>

                <form onSubmit={submit} className="space-y-4">

                    <div>

                        <label className="text-sm font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                    </div>

                    <div>

                        <label className="text-sm font-medium">
                            Excerpt
                        </label>

                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            className="w-full border rounded p-2"
                        />

                    </div>

                    <div>

                        <label className="text-sm font-medium">
                            Content
                        </label>

                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full border rounded p-2 h-40"
                        />

                    </div>

                    <div>

                        <label className="text-sm font-medium">
                            Thumbnail
                        </label>

                        <input
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                if (e.target.files) {
                                    setData('thumbnail', e.target.files[0])
                                }

                            }}
                        />

                        {post.thumbnail && (

                            <img
                                src={`/storage/${post.thumbnail}`}
                                className="w-40 rounded mt-2"
                            />

                        )}

                    </div>

                    <div>

                        <label className="text-sm font-medium">
                            Status
                        </label>

                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="border rounded p-2"
                        >

                            <option value="draft">Draft</option>
                            <option value="published">Published</option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded"
                        disabled={processing}
                    >

                        Update Post

                    </button>

                </form>

            </div>

        </AppLayout>

    )

}
