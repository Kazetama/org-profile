import { Head } from '@inertiajs/react'
import PostForm from '@/components/post-form'
import AppLayout from '@/layouts/app-layout'

interface Category {
    id: number
    name: string
}

interface Tag {
    id: number
    name: string
}

interface Post {
    id: number
    title: string
    excerpt: string | null
    content: string
    thumbnail: string | null
    status: string
    category_id: number | null
    is_featured: boolean
    meta_title: string | null
    meta_description: string | null
    keywords: string | null
    tags?: Tag[]
}

interface Props {
    post: Post
    categories: Category[]
    tags: Tag[]
}

export default function Edit({ post, categories, tags }: Props) {
    return (
        <AppLayout>
            <Head title={`Edit Post - ${post.title}`} />
            <div className="p-6">
                <PostForm
                    post={post}
                    categories={categories}
                    tags={tags}
                    url={`/admin/posts/${post.id}`}
                    method="put"
                />
            </div>
        </AppLayout>
    )
}
