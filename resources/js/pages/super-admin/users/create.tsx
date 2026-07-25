import { Head, useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout'

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        usertype: 'admin-publika',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/super-admin/users')
    }

    return (
        <AppLayout breadcrumbs={[
            { title: 'Manajemen Koordinator', href: '/super-admin/users' },
            { title: 'Tambah Pengurus', href: '/super-admin/users/create' }
        ]}>
            <Head title="Tambah Pengurus Baru" />

            <div className="max-w-2xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Tambah Pengurus Baru
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Daftarkan pengurus baru dan tentukan hak akses divisinya.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                            disabled={processing}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </div>

                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="border-b bg-gray-50/40">
                            <CardTitle className="text-base font-bold text-gray-800">Detail Akun Pengurus</CardTitle>
                            <CardDescription className="text-xs">
                                Akun ini akan digunakan oleh koordinator divisi untuk login ke sistem.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700 font-bold text-sm">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-bold text-sm">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nama@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="usertype" className="text-gray-700 font-bold text-sm">Role / Hak Akses Divisi</Label>
                                <Select
                                    value={data.usertype}
                                    onValueChange={(val) => setData('usertype', val)}
                                >
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Pilih jabatan/hak akses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="super-admin">Ketua Umum (Super Admin)</SelectItem>
                                        <SelectItem value="admin-publika">Publika (Publikasi & Dokumentasi)</SelectItem>
                                        <SelectItem value="admin-psdm">PSDM (Pengembangan Sumber Daya Mahasiswa)</SelectItem>
                                        <SelectItem value="member">Anggota Biasa (Member)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.usertype && <p className="text-xs text-red-500 font-medium">{errors.usertype}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 font-bold text-sm">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Min. 8 karakter"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={errors.password ? 'border-red-500' : ''}
                                    />
                                    {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-gray-700 font-bold text-sm">Konfirmasi Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        placeholder="Ulangi password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 text-sm font-semibold shadow-sm"
                    >
                        {processing ? 'Menyimpan...' : (
                            <span className="flex items-center justify-center gap-2">
                                <Save className="h-4 w-4" />
                                Simpan Akun Pengurus
                            </span>
                        )}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}
