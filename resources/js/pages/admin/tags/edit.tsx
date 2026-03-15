import { Head } from '@inertiajs/react'
import TagForm from '@/components/tag-form'
import AppLayout from '@/layouts/app-layout'

interface Tag {
    id: number
    name: string
}

interface Props {
    tag: Tag
}

export default function Edit({ tag }: Props) {
    return (
        <AppLayout>
            <Head title={`Edit Tag - ${tag.name}`} />
            <div className="p-6">
                <TagForm
                    tag={tag}
                    url={`/admin/tags/${tag.id}`}
                    method="put"
                />
            </div>
        </AppLayout>
    )
}
