import { Head } from '@inertiajs/react'
import RecruitmentForm from '@/components/recruitment-form'
import AppLayout from '@/layouts/app-layout'

interface Recruitment {
    id: number
    title: string
    description: string | null
    registration_fields: { name: string; type: string; required: boolean; options?: string[] }[]
    max_registrants: number | null
    starts_at: string | null
    ends_at: string | null
}

interface Props {
    recruitment: Recruitment
}

export default function Edit({ recruitment }: Props) {
    return (
        <AppLayout>
            <Head title={`Edit Rekrutmen - ${recruitment.title}`} />
            <div className="p-6">
                <RecruitmentForm
                    recruitment={{
                        ...recruitment,
                        max_registrants: recruitment.max_registrants ?? '',
                    }}
                    url={`/admin-psdm/recruitment/${recruitment.id}`}
                    method="put"
                />
            </div>
        </AppLayout>
    )
}
