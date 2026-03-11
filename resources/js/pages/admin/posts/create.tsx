import { Head, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'
import AppLayout from '@/layouts/app-layout'

type PostForm = {
    title: string
    excerpt: string
    content: string
    thumbnail: File | null
    status: string
}

export default function Create() {

    const { data, setData, post, processing } = useForm<PostForm>({
        title: '',
        excerpt: '',
        content: '',
        thumbnail: null,
        status: 'draft'
    })

    function submit(e: FormEvent) {

        e.preventDefault()

        post('/admin/posts', {
            forceFormData: true
        })

    }

    return (

        <AppLayout>

            <Head title="Create Post" />

            <div className="p-6 max-w-xl space-y-4">

                <h1 className="text-2xl font-semibold">
                    Create Post
                </h1>

                <form onSubmit={submit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Title"
                        value={data.title}
                        className="w-full border rounded p-2"
                        onChange={(e) => setData('title', e.target.value)}
                    />

                    <textarea
                        placeholder="Excerpt"
                        value={data.excerpt}
                        className="w-full border rounded p-2"
                        onChange={(e) => setData('excerpt', e.target.value)}
                    />

                    <textarea
                        placeholder="Content"
                        value={data.content}
                        className="w-full border rounded p-2 h-40"
                        onChange={(e) => setData('content', e.target.value)}
                    />

                    <input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files) {
                                setData('thumbnail', e.target.files[0])
                            }
                        }}
                    />

                    <select
                        value={data.status}
                        className="border rounded p-2"
                        onChange={(e) => setData('status', e.target.value)}
                    >

                        <option value="draft">Draft</option>
                        <option value="published">Published</option>

                    </select>

                    <button
                        className="bg-black text-white px-4 py-2 rounded"
                        disabled={processing}
                    >

                        Save Post

                    </button>

                </form>

            </div>

        </AppLayout>

    )

}
