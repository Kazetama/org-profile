import { Head } from '@inertiajs/react'
import CategoryForm from '@/components/category-form'
import AppLayout from '@/layouts/app-layout'

interface Category {
    id: number
    name: string
}

interface Props {
    category: Category
}

export default function Edit({ category }: Props) {
    return (
        <AppLayout>
            <Head title={`Edit Category - ${category.name}`} />
            <div className="p-6">
                <CategoryForm
                    category={category}
                    url={`/admin/categories/${category.id}`}
                    method="put"
                />
            </div>
        </AppLayout>
    )
}
