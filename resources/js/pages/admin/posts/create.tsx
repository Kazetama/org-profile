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

interface Props {
    categories: Category[]
    tags: Tag[]
}

export default function Create({ categories, tags }: Props) {
    return (
        <AppLayout>
            <Head title="Create Post" />
            <div className="p-6">
                <PostForm
                    categories={categories}
                    tags={tags}
                    url="/admin/posts"
                    method="post"
                />
            </div>
        </AppLayout>
    )
}
