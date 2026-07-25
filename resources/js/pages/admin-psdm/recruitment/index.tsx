import { Head, Link, router } from '@inertiajs/react'
import { Plus, Pencil, Trash2, MoreHorizontal, Users, ToggleLeft, ToggleRight, Inbox } from 'lucide-react'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'

interface Recruitment {
    id: number
    title: string
    description: string | null
    is_active: boolean
    max_registrants: number | null
    starts_at: string | null
    ends_at: string | null
    registrants_count: number
    created_at: string
}

interface Props {
    recruitments: Recruitment[]
}

export default function Index({ recruitments }: Props) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [recruitmentToDelete, setRecruitmentToDelete] = useState<number | null>(null)

    const confirmDelete = (id: number) => {
        setRecruitmentToDelete(id)
        setIsDeleteOpen(true)
    }

    const executeDelete = () => {
        if (recruitmentToDelete) {
            router.delete(`/admin-psdm/recruitment/${recruitmentToDelete}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false)
                    setRecruitmentToDelete(null)
                },
            })
        }
    }

    const toggleStatus = (id: number) => {
        router.patch(`/admin-psdm/recruitment/${id}/toggle`, {}, {
            preserveScroll: true,
        })
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '-'
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
        })
    }

    return (
        <AppLayout>
            <Head title="Open Recruitment" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Open Recruitment
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola periode pendaftaran anggota baru organisasi.
                        </p>
                    </div>

                    <Button asChild className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white shadow-sm rounded-lg shrink-0">
                        <Link href="/admin-psdm/recruitment/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Rekrutmen
                        </Link>
                    </Button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/80 border-b border-gray-200">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-700 pl-6">Judul</TableHead>
                                <TableHead className="font-semibold text-gray-700">Periode</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-28">Pendaftar</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-28">Status</TableHead>
                                <TableHead className="w-[80px] text-center pr-6 font-semibold text-gray-700">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recruitments.length > 0 ? (
                                recruitments.map((recruitment) => (
                                    <TableRow key={recruitment.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <TableCell className="pl-6">
                                            <div>
                                                <p className="font-medium text-gray-900">{recruitment.title}</p>
                                                {recruitment.description && (
                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{recruitment.description}</p>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-500 text-sm">
                                            {formatDate(recruitment.starts_at)} — {formatDate(recruitment.ends_at)}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-medium text-gray-700">
                                                {recruitment.registrants_count}
                                                {recruitment.max_registrants && (
                                                    <span className="text-gray-400"> / {recruitment.max_registrants}</span>
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => toggleStatus(recruitment.id)}
                                                className="flex items-center gap-1.5 cursor-pointer"
                                                title={recruitment.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                                            >
                                                {recruitment.is_active ? (
                                                    <>
                                                        <ToggleRight className="h-5 w-5 text-emerald-500" />
                                                        <Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-xs">Aktif</Badge>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                                                        <Badge variant="secondary" className="text-xs">Nonaktif</Badge>
                                                    </>
                                                )}
                                            </button>
                                        </TableCell>
                                        <TableCell className="align-middle text-center pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200 text-gray-500 data-[state=open]:bg-gray-200">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 shadow-lg rounded-xl border-gray-100">
                                                    <DropdownMenuLabel className="text-xs text-gray-400">Opsi</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild className="cursor-pointer py-2">
                                                        <Link href={`/admin-psdm/recruitment/${recruitment.id}/registrants`}>
                                                            <Users className="mr-2 h-4 w-4 text-blue-500" />
                                                            Lihat Pendaftar
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild className="cursor-pointer py-2">
                                                        <Link href={`/admin-psdm/recruitment/${recruitment.id}/edit`}>
                                                            <Pencil className="mr-2 h-4 w-4 text-amber-500" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => confirmDelete(recruitment.id)} className="text-red-600 cursor-pointer py-2 focus:text-red-700 focus:bg-red-50">
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
                                            <p className="text-base font-medium text-gray-900">Belum ada rekrutmen</p>
                                            <p className="text-sm text-gray-500 mt-1">Buat periode rekrutmen pertama Anda.</p>
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
                        <AlertDialogTitle>Hapus Rekrutmen?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Semua data pendaftar pada rekrutmen ini juga akan terhapus.
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
