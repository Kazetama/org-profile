import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import type { MemberFormData } from '@/components/member-form';
import MemberForm from '@/components/member-form';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<MemberFormData>({
        full_name: '',
        nim: '',
        phone: '',
        batch: new Date().getFullYear(),
        position: '',
        status: 'trial',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/ketua/members');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tambah Member', href: '/ketua/members/create' }]}>
            <Head title="Tambah Member" />
            <div className="p-6">
                <MemberForm
                    title="Registrasi Member Baru"
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
