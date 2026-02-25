import { Head, useForm } from '@inertiajs/react';
import MemberForm from '@/components/member-form';
import AppLayout from '@/layouts/app-layout';
import type { Member, BreadcrumbItem } from '@/types';

interface Props {
    member: Member;
}

export default function Edit({ member }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        full_name: member.full_name || '',
        nim: member.nim || '',
        phone: member.phone || '',
        batch: member.batch || new Date().getFullYear(),
        position: member.position || '',
        status: member.status || 'trial',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Members', href: '/ketua/members' },
        { title: 'Edit Member', href: `/ketua/members/${member.id}/edit` },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/ketua/members/${member.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Member - ${member.full_name}`} />

            <div className="p-6">
                <MemberForm
                    title={`Edit Profil: ${member.full_name}`}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                />
            </div>
        </AppLayout>
    );
}
