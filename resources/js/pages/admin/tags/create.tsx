import { Head } from '@inertiajs/react'
import TagForm from '@/components/tag-form'
import AppLayout from '@/layouts/app-layout'

export default function Create() {
    return (
        <AppLayout>
            <Head title="Create Tag" />

            <div className="p-6">
                <TagForm
                    url="/admin/tags"
                    method="post"
                />
            </div>
        </AppLayout>
    )
}
