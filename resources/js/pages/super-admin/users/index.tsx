import { Head, Link, router } from '@inertiajs/react'
import { Plus, Pencil, Trash2, MoreHorizontal, Inbox, Search } from 'lucide-react'
import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'

interface User {
    id: number
    name: string
    email: string
    usertype: string
    created_at: string
}

interface Props {
    users: User[]
}

export default function Index({ users }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<number | null>(null)

    const confirmDelete = (id: number) => {
        setUserToDelete(id)
        setIsDeleteOpen(true)
    }

    const executeDelete = () => {
        if (userToDelete) {
            router.delete(`/super-admin/users/${userToDelete}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false)
                    setUserToDelete(null)
                },
            })
        }
    }

    const getRoleBadge = (usertype: string) => {
        switch (usertype) {
            case 'super-admin':
                return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0 text-xs font-semibold">Ketua Umum</Badge>
            case 'admin-publika':
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 text-xs font-semibold">Koor Publika</Badge>
            case 'admin-psdm':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-xs font-semibold">Koor PSDM</Badge>
            case 'member':
                return <Badge variant="secondary" className="text-xs font-semibold">Anggota</Badge>
            default:
                return <Badge variant="outline" className="text-xs font-semibold">{usertype}</Badge>
        }
    }

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.usertype.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <AppLayout breadcrumbs={[{ title: 'Manajemen Koordinator', href: '/super-admin/users' }]}>
            <Head title="Manajemen Koordinator" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Manajemen Koordinator Divisi
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola hak akses panel admin dan koordinator divisi HMTI.
                        </p>
                    </div>

                    <Button asChild className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-lg shrink-0">
                        <Link href="/super-admin/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengurus
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Cari pengurus..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-white"
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/80 border-b border-gray-200">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-700 pl-6">Nama Pengurus</TableHead>
                                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-44">Jabatan / Role</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-48">Tanggal Dibuat</TableHead>
                                <TableHead className="w-[80px] text-center pr-6 font-semibold text-gray-700">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <TableCell className="pl-6 font-medium text-gray-900">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="text-gray-500 text-sm">
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {getRoleBadge(user.usertype)}
                                        </TableCell>
                                        <TableCell className="text-gray-500 text-sm">
                                            {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="align-middle text-center pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200 text-gray-500">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 shadow-lg rounded-xl border-gray-100">
                                                    <DropdownMenuLabel className="text-xs text-gray-400">Opsi</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild className="cursor-pointer py-2">
                                                        <Link href={`/super-admin/users/${user.id}/edit`}>
                                                            <Pencil className="mr-2 h-4 w-4 text-amber-500" />
                                                            Edit Akun
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => confirmDelete(user.id)} className="text-red-600 cursor-pointer py-2 focus:text-red-700 focus:bg-red-50">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-72 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <div className="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                                                <Inbox className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-base font-medium text-gray-900">Belum ada pengurus</p>
                                            <p className="text-sm text-gray-500 mt-1">Gunakan tombol di atas untuk membuat pengurus baru.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Akun Pengurus?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Pengurus tersebut tidak akan memiliki akses lagi ke panel kepengurusan HMTI.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={executeDelete} className="bg-red-600 hover:bg-red-700">Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    )
}
