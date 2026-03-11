import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'

type Post = {
    id: number
    title: string
    status: string
    created_at: string
}

type Props = {
    posts: Post[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Posts',
        href: '/admin/posts',
    },
]

export default function Index({ posts }: Props) {

    function destroy(id: number) {

        if (confirm('Delete this post?')) {
            router.delete(`/admin/posts/${id}`)
        }

    }

    return (

        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Posts" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <h1 className="text-2xl font-semibold">
                        Posts
                    </h1>

                    <Link
                        href="/admin/posts/create"
                        className="rounded-lg bg-black px-4 py-2 text-white"
                    >
                        Create Post
                    </Link>

                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">

                    <table className="w-full text-sm">

                        <thead className="border-b">

                            <tr className="text-left">

                                <th className="p-4">Title</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {posts.map((post) => (

                                <tr key={post.id} className="border-b">

                                    <td className="p-4 font-medium">
                                        {post.title}
                                    </td>

                                    <td>
                                        <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                                            {post.status}
                                        </span>
                                    </td>

                                    <td>
                                        {post.created_at}
                                    </td>

                                    <td className="space-x-3">

                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => destroy(post.id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AppLayout>

    )

}
