import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import type { FormEvent, ChangeEvent } from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Tipe Data Props
interface Category {
    id: number
    name: string
}

interface Tag {
    id: number
    name: string
}

interface Post {
    id: number
    title: string
    excerpt: string | null
    content: string
    thumbnail: string | null
    status: string
    category_id: number | null
    is_featured: boolean
    meta_title: string | null
    meta_description: string | null
    keywords: string | null
    tags?: Tag[]
}

interface PostFormData {
    _method?: 'put' | 'post'
    title: string
    excerpt: string
    content: string
    thumbnail: File | null
    status: string
    category_id: string
    tags: number[]
    is_featured: boolean
    meta_title: string
    meta_description: string
    keywords: string
}

interface Props {
    post?: Post
    categories: Category[]
    tags: Tag[]
    url: string
    method: 'post' | 'put'
}

export default function PostForm({ post, categories, tags, url, method }: Props) {
    // Initial tagging states mapping from relations
    const initialTags = post?.tags?.map((t) => t.id) || []

    const { data, setData, post: submitPost, processing, errors } = useForm<PostFormData>({
        _method: method === 'put' ? 'put' : undefined,
        title: post?.title ?? '',
        excerpt: post?.excerpt ?? '',
        content: post?.content ?? '',
        thumbnail: null,
        status: post?.status ?? 'draft',
        category_id: post?.category_id ? String(post.category_id) : '',
        tags: initialTags,
        is_featured: post?.is_featured ?? false,
        meta_title: post?.meta_title ?? '',
        meta_description: post?.meta_description ?? '',
        keywords: post?.keywords ?? ''
    })

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        const seoFormatted = newTitle.replace(/\s+/g, '-').toLowerCase()

        setData((prev) => ({
            ...prev,
            title: newTitle,
            meta_title: seoFormatted,
        }))
    }

    const toggleTag = (tagId: number) => {
        let newTags = [...data.tags]
        if (newTags.includes(tagId)) {
            newTags = newTags.filter((id) => id !== tagId)
        } else {
            newTags.push(tagId)
        }
        setData('tags', newTags)
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        submitPost(url, { preserveScroll: true, forceFormData: true })
    }

    return (
        <form onSubmit={submit} className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {post ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        disabled={processing}
                        className="flex-1 sm:flex-none"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-800 text-white flex-1 sm:flex-none"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Simpan Artikel
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Kiri - Konten Utama */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="border-b bg-gray-50/30">
                            <CardTitle className="text-lg">Editor Konten</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className={errors.title && "text-red-500"}>Judul Artikel</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    className={errors.title && "border-red-500"}
                                />
                                {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt" className={errors.excerpt && "text-red-500"}>Kutipan Singkat (Excerpt)</Label>
                                <Textarea
                                    id="excerpt"
                                    rows={3}
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    className={errors.excerpt && "border-red-500"}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className={errors.content && "text-red-500"}>Isi Konten</Label>
                                <div className="bg-white rounded-md">
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content}
                                        onChange={(val) => setData('content', val)}
                                        className="h-96 mb-12"
                                    />
                                </div>
                                {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="border-b bg-gray-50/30">
                            <CardTitle className="text-lg">Thumbnail & Media</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                             <div className="flex flex-col md:flex-row items-center gap-8 p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                {post?.thumbnail && (
                                    <div className="w-48 h-32 rounded-lg border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 bg-white">
                                        <img
                                            src={`/storage/${post.thumbnail}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 w-full space-y-3">
                                    <Input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('thumbnail', e.target.files?.[0] ?? null)}
                                        className="bg-white"
                                    />
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <ImageIcon className="w-3.5 h-3.5" />
                                        <span>Rekomendasi rasio 16:9. Maks 2MB.</span>
                                    </div>
                                    {errors.thumbnail && <p className="text-xs text-red-500">{errors.thumbnail}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Kolom Kanan - Metadata & Relasi */}
                <div className="space-y-8">
                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="border-b bg-gray-50/30">
                            <CardTitle className="text-lg">Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 text-sm"
                                >
                                    <option value="draft">Draft (Konsep)</option>
                                    <option value="published">Published (Terbit)</option>
                                </select>
                            </div>

                            <div className="space-y-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-gray-900 shadow-sm focus:ring-gray-500"
                                />
                                <Label htmlFor="is_featured" className="mb-0 cursor-pointer">Jadikan Posting Unggulan</Label>
                            </div>

                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 text-sm"
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <div className="p-3 border rounded-md max-h-48 overflow-y-auto bg-gray-50 space-y-2">
                                    {tags.map((tag) => (
                                        <label key={tag.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.tags.includes(tag.id)}
                                                onChange={() => toggleTag(tag.id)}
                                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                                            />
                                            {tag.name}
                                        </label>
                                    ))}
                                    {tags.length === 0 && <span className="text-xs text-gray-400">Belum ada tag tersedia.</span>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="border-b bg-gray-50/30">
                            <CardTitle className="text-lg">SEO & Meta</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="meta_title" className="text-xs">Meta Title (Slug URL)</Label>
                                <Input
                                    id="meta_title"
                                    type="text"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="text-sm bg-gray-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meta_description" className="text-xs">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    rows={3}
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    className="text-sm bg-gray-50 resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="keywords" className="text-xs">Keywords (Pisahkan dgn koma)</Label>
                                <Input
                                    id="keywords"
                                    type="text"
                                    value={data.keywords}
                                    onChange={(e) => setData('keywords', e.target.value)}
                                    className="text-sm bg-gray-50"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
