import { Head } from '@inertiajs/react'
import CategoryForm from '@/components/category-form'
import AppLayout from '@/layouts/app-layout'

export default function Create() {
    return (
        <AppLayout>
            <Head title="Create Category" />

            <div className="p-6">
                <CategoryForm
                    url="/admin-publika/categories"
                    method="post"
                />
            </div>
        </AppLayout>
    )
}
