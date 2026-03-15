import { Head, Link, router } from '@inertiajs/react'
import { Plus, Pencil, Trash2, MoreHorizontal, Inbox } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'

interface Tag {
    id: number
    name: string
    slug: string
    posts_count: number
}

interface Props {
    tags: Tag[]
}

export default function Index({ tags }: Props) {
    const [tagToDelete, setTagToDelete] = useState<number | null>(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const confirmDelete = (id: number) => {
        setTagToDelete(id)
        setIsDeleteOpen(true)
    }

    const executeDelete = () => {
        if (tagToDelete) {
            router.delete(`/admin/tags/${tagToDelete}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false)
                    setTagToDelete(null)
                },
            })
        }
    }

    return (
        <AppLayout>
            <Head title="Tags Management" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Tags
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-3">
                        <Button asChild className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white shadow-sm rounded-lg shrink-0">
                            <Link href="/admin/tags/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Tag
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/80 border-b border-gray-200">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-700 pl-6 w-1/3">Nama Tag</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-1/3">Slug</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-32">Total Post</TableHead>
                                <TableHead className="w-[80px] text-center pr-6 font-semibold text-gray-700">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tags.length > 0 ? (
                                tags.map((tag) => (
                                    <TableRow key={tag.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <TableCell className="pl-6 font-medium text-gray-900">
                                            #{tag.name}
                                        </TableCell>
                                        <TableCell className="text-gray-500">
                                            {tag.slug}
                                        </TableCell>
                                        <TableCell className="text-gray-500">
                                            {tag.posts_count}
                                        </TableCell>

                                        <TableCell className="align-middle text-center pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200 text-gray-500 data-[state=open]:bg-gray-200">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44 shadow-lg rounded-xl border-gray-100">
                                                    <DropdownMenuLabel className="text-xs text-gray-400">Opsi</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild className="cursor-pointer py-2">
                                                        <Link href={`/admin/tags/${tag.id}/edit`}>
                                                            <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => confirmDelete(tag.id)} className="text-red-600 cursor-pointer py-2 focus:text-red-700 focus:bg-red-50">
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
                                    <TableCell colSpan={4} className="h-72 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <div className="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                                                <Inbox className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-base font-medium text-gray-900">Belum ada Tag</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Tag Ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Blog post yang menggunakan tag ini tidak akan terhapus, namun relasi tagnya akan hilang.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-lg">Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={executeDelete}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm"
                        >
                            Ya, Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    )
}
