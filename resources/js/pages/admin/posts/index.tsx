import { Head, Link, router } from '@inertiajs/react'
import { Plus, Pencil, Trash2, Eye, MoreHorizontal, Inbox, CheckCircle2 } from 'lucide-react'
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

interface Post {
    id: number
    title: string
    thumbnail: string | null
    status: string
    views: number
    is_featured: boolean
    created_at: string
    category?: { id: number, name: string }
    author?: { id: number, name: string }
}

interface PaginatedData<T> {
    data: T[]
    links: { url: string | null; label: string; active: boolean }[]
    from: number
    to: number
    total: number
}

// We assume the controller wraps posts in a paginator, if not, it will just be an array
interface Props {
    posts: PaginatedData<Post> | Post[]
}

export default function Index({ posts }: Props) {
    const [postToDelete, setPostToDelete] = useState<number | null>(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    // Handle both paginated and non-paginated data safely
    const postsData = Array.isArray(posts) ? posts : posts.data

    const confirmDelete = (id: number) => {
        setPostToDelete(id)
        setIsDeleteOpen(true)
    }

    const executeDelete = () => {
        if (postToDelete) {
            router.delete(`/admin/posts/${postToDelete}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false)
                    setPostToDelete(null)
                },
            })
        }
    }

    return (
        <AppLayout>
            <Head title="Posts Management" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Blog Posts
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola semua artikel blog, kategori, dan lihat statistik views.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-3">
                        <Button asChild className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white shadow-sm rounded-lg shrink-0">
                            <Link href="/admin/posts/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Tulis Artikel
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/80 border-b border-gray-200">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[120px] pl-6 py-4 font-semibold text-gray-700">Thumbnail</TableHead>
                                <TableHead className="font-semibold text-gray-700 min-w-64">Informasi Artikel</TableHead>
                                <TableHead className="hidden md:table-cell font-semibold text-gray-700 w-32">Kategori</TableHead>
                                <TableHead className="hidden lg:table-cell font-semibold text-gray-700 w-32">Metrik</TableHead>
                                <TableHead className="font-semibold text-gray-700 w-32">Status</TableHead>
                                <TableHead className="w-[80px] text-center pr-6 font-semibold text-gray-700">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {postsData && postsData.length > 0 ? (
                                postsData.map((post) => (
                                    <TableRow key={post.id} className="hover:bg-gray-50 group transition-colors border-b border-gray-100 last:border-0">
                                        {/* IMAGE */}
                                        <TableCell className="pl-6 py-4 align-top">
                                            <div className="w-24 h-16 rounded-md border border-gray-200 overflow-hidden bg-gray-50 shadow-sm flex items-center justify-center">
                                                {post.thumbnail ? (
                                                    <img
                                                        src={`/storage/${post.thumbnail}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-400">No Image</span>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* INFO */}
                                        <TableCell className="align-top py-4">
                                            <div className="space-y-1.5 max-w-lg">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900 text-base leading-tight block">
                                                        {post.title}
                                                    </span>
                                                    {post.is_featured && (
                                                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-[10px] px-1.5 py-0 h-4">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>Oleh {post.author?.name || 'Unknown'}</span>
                                                    <span>•</span>
                                                    <span>{new Date(post.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric'})}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* CATEGORY */}
                                        <TableCell className="hidden md:table-cell align-top py-4">
                                            {post.category?.name ? (
                                                <Badge variant="outline" className="text-xs text-gray-600 font-normal bg-white">
                                                    {post.category.name}
                                                </Badge>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Tanpa Kategori</span>
                                            )}
                                        </TableCell>

                                        {/* METRICS */}
                                        <TableCell className="hidden lg:table-cell align-top py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{post.views}</span>
                                                <span className="text-xs text-gray-500">Views</span>
                                            </div>
                                        </TableCell>

                                        {/* STATUS */}
                                        <TableCell className="align-top py-4">
                                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className={`text-[11px] font-medium justify-center w-20 shadow-none ${post.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'}`}>
                                                {post.status === 'published' ? 'Published' : 'Draft'}
                                            </Badge>
                                        </TableCell>

                                        {/* ACTIONS */}
                                        <TableCell className="align-middle text-center pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200 text-gray-500 data-[state=open]:bg-gray-200">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44 shadow-lg rounded-xl border-gray-100">
                                                    <DropdownMenuLabel className="text-xs text-gray-400">Opsi Artikel</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild className="cursor-pointer py-2">
                                                        <Link href={`/admin/posts/${post.id}/edit`}>
                                                            <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                                                            Edit Artikel
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => confirmDelete(post.id)} className="text-red-600 cursor-pointer py-2 focus:text-red-700 focus:bg-red-50">
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
                                    <TableCell colSpan={6} className="h-72 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <div className="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                                                <Inbox className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-base font-medium text-gray-900">Belum ada artikel</p>
                                            <p className="text-sm mt-1">Mulai menulis artikel pertama Anda dengan menekan tombol Create.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* DELETE CONFIRMATION ALERT */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Artikel Ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Artikel beserta gambar (jika ada) akan dihapus permanen dari sistem.
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
