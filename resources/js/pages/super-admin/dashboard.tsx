import { Head, Link } from '@inertiajs/react'
import { Users, Shield, FileText, Calendar, ArrowRight, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'

interface Stats {
    total_members: number
    total_admins: number
    total_posts: number
    total_events: number
}

interface Admin {
    id: number
    name: string
    email: string
    usertype: string
}

interface Props {
    stats: Stats
    admins: Admin[]
}

export default function Dashboard({ stats, admins }: Props) {
    const getRoleBadge = (usertype: string) => {
        switch (usertype) {
            case 'super-admin':
                return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">Ketua Umum</Badge>
            case 'admin-publika':
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Koor Publika</Badge>
            case 'admin-psdm':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Koor PSDM</Badge>
            default:
                return <Badge variant="secondary">{usertype}</Badge>
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/super-admin/dashboard' }]}>
            <Head title="Super Admin Dashboard" />

            <div className="p-6 space-y-8">
                {/* Header Welcome */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Selamat Datang, Ketua Umum!
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Pantau seluruh statistik dan kepengurusan organisasi HMTI Anda.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Total Anggota</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_members}</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Users className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Koordinator Divisi</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_admins}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <Shield className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Artikel Publikasi</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_posts}</p>
                            </div>
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                <FileText className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Event Berjalan</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total_events}</p>
                            </div>
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                                <Calendar className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Admins list (span 2) */}
                    <Card className="lg:col-span-2 shadow-sm border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <div>
                                <CardTitle className="text-lg font-bold text-gray-900">
                                    Koordinator Divisi HMTI
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Akun administrator yang memegang hak akses panel masing-masing divisi.
                                </CardDescription>
                            </div>
                            <Button asChild variant="outline" size="sm" className="rounded-lg">
                                <Link href="/super-admin/users">
                                    Kelola Koor
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="divide-y divide-gray-100 p-0">
                            {admins.length > 0 ? (
                                admins.map((admin) => (
                                    <div key={admin.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border">
                                                {admin.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 text-sm">{admin.name}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">{admin.email}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {getRoleBadge(admin.usertype)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-gray-500 text-sm">
                                    Tidak ada pengurus yang ditemukan.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Access Sidebar */}
                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-lg font-bold text-gray-900">
                                Pintasan Aksi
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Akses cepat ke pengaturan dan manajemen kepengurusan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-5 h-auto text-sm font-semibold shadow-sm justify-start">
                                <Link href="/super-admin/users/create">
                                    <UserCheck className="mr-3 h-5 w-5" />
                                    Tambah Koor Divisi Baru
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="w-full rounded-xl py-5 h-auto text-sm font-semibold border-gray-200 justify-start hover:bg-gray-50">
                                <Link href="/super-admin/users">
                                    <Users className="mr-3 h-5 w-5 text-gray-500" />
                                    Lihat Semua Akun Pengurus
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
