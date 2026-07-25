import { Head, Link } from '@inertiajs/react';
import { Users, UserCheck, ClipboardList, UserPlus, ArrowRight, Plus, Upload, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Member } from '@/types';

interface Stats {
    total_members: number;
    active_members: number;
    trial_members: number;
    demision_members: number;
    nonactive_members: number;
    total_recruitments: number;
    active_recruitments: number;
    total_registrants: number;
}

interface MemberBatch {
    batch: number;
    count: number;
}

interface Registrant {
    id: number;
    recruitment_id: number;
    registration_data: Record<string, string | number | boolean | null>;
    created_at: string;
    recruitment: {
        id: number;
        title: string;
    };
}

interface Props {
    stats: Stats;
    members_by_batch: MemberBatch[];
    recent_members: Member[];
    recent_registrants: Registrant[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard PSDM',
        href: '/admin-psdm/dashboard',
    },
];

export default function Dashboard({ stats, members_by_batch, recent_members, recent_registrants }: Props) {
    const getStatusBadge = (status: Member['status']) => {
        switch (status) {
            case 'aktif':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 dark:bg-emerald-950/50 dark:text-emerald-400">Aktif</Badge>;
            case 'trial':
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 dark:bg-amber-950/50 dark:text-amber-400">Trial</Badge>;
            case 'demision':
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 dark:bg-blue-950/50 dark:text-blue-400">Demision</Badge>;
            case 'nonaktif':
                return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-0 dark:bg-rose-950/50 dark:text-rose-400">Nonaktif</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getRegistrantName = (registrant: Registrant) => {
        const data = registrant.registration_data;
        if (!data) return `Pendaftar #${registrant.id}`;
        
        // Find key that contains name or nama
        const nameKey = Object.keys(data).find(key => 
            key.toLowerCase().includes('name') || 
            key.toLowerCase().includes('nama')
        );
        if (nameKey && data[nameKey]) {
            return String(data[nameKey]);
        }
        
        // Fallback to email
        const emailKey = Object.keys(data).find(key => key.toLowerCase().includes('email'));
        if (emailKey && data[emailKey]) {
            return String(data[emailKey]);
        }

        // Fallback to first value
        const firstVal = Object.values(data)[0];
        if (firstVal) {
            return String(firstVal);
        }

        return `Pendaftar #${registrant.id}`;
    };

    const formatTime = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateStr;
        }
    };

    // Calculate max count for batch progress bars
    const maxBatchCount = members_by_batch.length > 0 
        ? Math.max(...members_by_batch.map(b => b.count)) 
        : 1;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard PSDM" />

            <div className="p-6 space-y-8">
                {/* Header Welcome */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Dashboard PSDM
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                            Kelola keanggotaan dan rekrutmen organisasi HMTI Anda.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="shadow-sm border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Anggota</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_members}</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 rounded-xl">
                                <Users className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Anggota Aktif</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.active_members}</p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-xl">
                                <UserCheck className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rekrutmen Aktif</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.active_recruitments}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 rounded-xl">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pendaftar</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total_registrants}</p>
                            </div>
                            <div className="p-3 bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 rounded-xl">
                                <UserPlus className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Recent Members Column (Span 2) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Recent Members Card */}
                        <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between border-b dark:border-zinc-800 pb-4">
                                <div>
                                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Anggota Terbaru
                                    </CardTitle>
                                    <CardDescription className="text-xs dark:text-gray-400">
                                        Anggota yang baru saja dimasukkan ke database keanggotaan.
                                    </CardDescription>
                                </div>
                                <Button asChild variant="outline" size="sm" className="rounded-lg">
                                    <Link href="/admin-psdm/members">
                                        Semua Anggota
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="divide-y divide-gray-100 dark:divide-zinc-800 p-0">
                                {recent_members.length > 0 ? (
                                    recent_members.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center font-bold border dark:border-zinc-800">
                                                    {member.full_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{member.full_name}</h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{member.position} • Angkatan {member.batch}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {getStatusBadge(member.status)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-gray-500 text-sm dark:text-gray-400">
                                        Belum ada data anggota.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Registrants Card */}
                        <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between border-b dark:border-zinc-800 pb-4">
                                <div>
                                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Pendaftaran Terbaru
                                    </CardTitle>
                                    <CardDescription className="text-xs dark:text-gray-400">
                                        Calon anggota yang baru mendaftar di periode rekrutmen aktif.
                                    </CardDescription>
                                </div>
                                <Button asChild variant="outline" size="sm" className="rounded-lg">
                                    <Link href="/admin-psdm/recruitment">
                                        Kelola Rekrutmen
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="divide-y divide-gray-100 dark:divide-zinc-800 p-0">
                                {recent_registrants.length > 0 ? (
                                    recent_registrants.map((registrant) => (
                                        <div key={registrant.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center font-bold border dark:border-zinc-800">
                                                    {getRegistrantName(registrant).charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{getRegistrantName(registrant)}</h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mendaftar pada: <span className="font-medium">{registrant.recruitment?.title || 'Rekrutmen'}</span></p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500">
                                                {formatTime(registrant.created_at)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-gray-500 text-sm dark:text-gray-400">
                                        Belum ada pendaftar baru.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        
                        {/* Quick Access Actions */}
                        <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
                            <CardHeader className="border-b dark:border-zinc-800 pb-4">
                                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Pintasan Aksi
                                </CardTitle>
                                <CardDescription className="text-xs dark:text-gray-400">
                                    Aksi cepat untuk manajemen PSDM.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 h-auto text-sm font-semibold shadow-sm justify-start">
                                    <Link href="/admin-psdm/members/create">
                                        <Plus className="mr-3 h-5 w-5" />
                                        Tambah Anggota Baru
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" className="w-full rounded-xl py-5 h-auto text-sm font-semibold border-gray-200 dark:border-zinc-800 justify-start hover:bg-gray-50 dark:hover:bg-zinc-900">
                                    <Link href="/admin-psdm/members">
                                        <Upload className="mr-3 h-5 w-5 text-gray-500" />
                                        Import/Export Anggota
                                    </Link>
                                </Button>

                                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-5 h-auto text-sm font-semibold shadow-sm justify-start">
                                    <Link href="/admin-psdm/recruitment/create">
                                        <Plus className="mr-3 h-5 w-5" />
                                        Buat Periode Rekrutmen
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Batch Distribution Card */}
                        <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
                            <CardHeader className="border-b dark:border-zinc-800 pb-4">
                                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Distribusi Angkatan
                                </CardTitle>
                                <CardDescription className="text-xs dark:text-gray-400">
                                    Jumlah anggota aktif/terdaftar per angkatan.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                {members_by_batch.length > 0 ? (
                                    members_by_batch.map((b) => {
                                        const percentage = Math.round((b.count / maxBatchCount) * 100);
                                        return (
                                            <div key={b.batch} className="space-y-1.5">
                                                <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                    <span>Angkatan {b.batch}</span>
                                                    <span>{b.count} Anggota</span>
                                                </div>
                                                <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-blue-500 rounded-full" 
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center text-gray-500 text-sm dark:text-gray-400 py-6">
                                        Tidak ada data angkatan.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
