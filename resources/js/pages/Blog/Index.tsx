import { Head, Link } from '@inertiajs/react'
import { Calendar, User, Eye, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import AppLayout from '@/layouts/app-layout'

interface Post {
    id: number
    title: string
    slug: string
    excerpt: string | null
    thumbnail: string | null
    views: number
    created_at: string
    category?: { id: number, name: string, slug: string }
    author?: { id: number, name: string }
    tags?: { id: number, name: string }[]
}

interface PaginatedData<T> {
    data: T[]
    links: { url: string | null; label: string; active: boolean }[]
    from: number
    to: number
    total: number
}

interface Props {
    posts: PaginatedData<Post> | Post[]
}

export default function Index({ posts }: Props) {
    const postsData = Array.isArray(posts) ? posts : posts.data

    return (
        <AppLayout>
            <Head title="Blog" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Kabar & Tulisan Terbaru
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Temukan insight, tutorial, dan informasi terbaru seputar teknologi dan program kami.
                    </p>
                </div>

                {/* Grid Posts */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {postsData.map((post) => (
                        <div key={post.id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            {/* Thumbnail */}
                            <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100">
                                {post.thumbnail ? (
                                    <img
                                        src={`/storage/${post.thumbnail}`}
                                        alt={post.title}
                                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-400">
                                        <span className="text-sm font-medium">No Image</span>
                                    </div>
                                )}
                                {post.category && (
                                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 hover:bg-white border-0 shadow-sm backdrop-blur-sm">
                                        {post.category.name}
                                    </Badge>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(post.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Eye className="w-3.5 h-3.5" />
                                        {post.views} views
                                    </span>
                                </div>

                                <Link href={`/blog/${post.slug}`} className="block group">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                                        {post.excerpt || 'Baca selengkapnya untuk melihat isi konten dari artikel ini...'}
                                    </p>
                                </Link>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {post.author?.name || 'Admin'}
                                        </span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                                        Baca <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination (If Paginated) */}
                {!Array.isArray(posts) && posts.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                            {posts.links.map((link, index) => {
                                const label = link.label
                                    .replace('&laquo; Previous', '«')
                                    .replace('Next &raquo;', '»')

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveScroll
                                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                                            link.active
                                                ? 'bg-gray-900 text-white font-medium shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span
                                        key={index}
                                        className="px-4 py-2 text-sm text-gray-300 cursor-not-allowed"
                                    >
                                        {label}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
