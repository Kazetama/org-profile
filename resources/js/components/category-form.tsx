import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import type { FormEvent } from 'react'
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

interface CategoryFormData {
    name: string
    _method?: 'put' | 'post'
}

type Props = {
    category?: { id: number, name: string }
    url: string
    method: 'post' | 'put'
}

export default function CategoryForm({ category, url, method }: Props) {
    const { data, setData, post, processing, errors } = useForm<CategoryFormData>({
        _method: method === 'put' ? 'put' : undefined,
        name: category?.name ?? '',
    })

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const options = {
            preserveScroll: true,
        }
        post(url, options)
    }

    return (
        <form onSubmit={submit} className="max-w-3xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {category ? 'Edit Kategori' : 'Buat Kategori Baru'}
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
                        Kembali
                    </Button>
                    <Button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-800 text-white flex-1 sm:flex-none shadow-sm"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Simpan Kategori
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <Card className="shadow-sm border-gray-200 rounded-xl">
                <CardHeader className="border-b bg-gray-50/30">
                    <CardTitle className="text-lg">Informasi Kategori</CardTitle>
                    <CardDescription>
                        Input nama kategori untuk mengelompokkan blog post
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className={errors.name ? "text-red-500" : "text-gray-700 font-semibold"}>
                            Nama Kategori
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Contoh: Tutorial, Berita..."
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-gray-900"}
                        />
                        {errors.name && <p className="text-xs font-medium text-red-500">{errors.name}</p>}
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
