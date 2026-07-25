import { Head } from '@inertiajs/react'
import RecruitmentForm from '@/components/recruitment-form'
import AppLayout from '@/layouts/app-layout'

export default function Create() {
    return (
        <AppLayout>
            <Head title="Buat Rekrutmen" />
            <div className="p-6">
                <RecruitmentForm
                    url="/admin-psdm/recruitment"
                    method="post"
                />
            </div>
        </AppLayout>
    )
}
