import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react'
import type { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

interface RegistrationField {
    name: string
    type: string
    required: boolean
    options?: string[]
}

interface Recruitment {
    id?: number
    title: string
    description: string | null
    registration_fields: RegistrationField[]
    max_registrants: number | ''
    starts_at: string | null
    ends_at: string | null
}

interface RecruitmentFormData {
    _method?: 'put' | 'post'
    title: string
    description: string
    registration_fields: RegistrationField[]
    max_registrants: number | ''
    starts_at: string
    ends_at: string
}

type Props = {
    recruitment?: Recruitment
    url: string
    method: 'post' | 'put'
}

export default function RecruitmentForm({ recruitment, url, method }: Props) {
    const { data, setData, post, processing, errors } = useForm<RecruitmentFormData>({
        _method: method === 'put' ? 'put' : undefined,
        title: recruitment?.title ?? '',
        description: recruitment?.description ?? '',
        registration_fields: recruitment?.registration_fields ?? [
            { name: 'Nama Lengkap', type: 'text', required: true },
            { name: 'NIM', type: 'text', required: true },
            { name: 'Email', type: 'email', required: true },
            { name: 'No. Telepon', type: 'text', required: true },
        ],
        max_registrants: recruitment?.max_registrants ?? '',
        starts_at: recruitment?.starts_at ? recruitment.starts_at.substring(0, 16) : '',
        ends_at: recruitment?.ends_at ? recruitment.ends_at.substring(0, 16) : '',
    })

    const addField = () => {
        const newFields = [...data.registration_fields, { name: '', type: 'text', required: true } as RegistrationField]
        setData('registration_fields', newFields)
    }

    const removeField = (index: number) => {
        const newFields = data.registration_fields.filter((_, i) => i !== index)
        setData('registration_fields', newFields)
    }

    const updateField = (index: number, field: Partial<RegistrationField>) => {
        const newFields = [...data.registration_fields]
        newFields[index] = { ...newFields[index], ...field }
        setData('registration_fields', newFields)
    }

    const addOption = (fieldIndex: number) => {
        const newFields = [...data.registration_fields]
        const currentOptions = newFields[fieldIndex].options ?? []
        newFields[fieldIndex].options = [...currentOptions, '']
        setData('registration_fields', newFields)
    }

    const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
        const newFields = [...data.registration_fields]
        const options = [...(newFields[fieldIndex].options ?? [])]
        options[optionIndex] = value
        newFields[fieldIndex].options = options
        setData('registration_fields', newFields)
    }

    const removeOption = (fieldIndex: number, optionIndex: number) => {
        const newFields = [...data.registration_fields]
        const options = (newFields[fieldIndex].options ?? []).filter((_, i) => i !== optionIndex)
        newFields[fieldIndex].options = options
        setData('registration_fields', newFields)
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(url, { preserveScroll: true })
    }

    const needsOptions = (type: string) => ['select', 'radio', 'checkbox'].includes(type)

    return (
        <form onSubmit={submit} className="max-w-5xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {recruitment ? 'Edit Rekrutmen' : 'Buat Rekrutmen Baru'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Atur informasi dan form pendaftaran anggota baru.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        disabled={processing}
                        className="flex-1 sm:flex-none hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Button>
                    <Button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-800 text-white flex-1 sm:flex-none shadow-md transition-all active:scale-95"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Simpan
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="space-y-8">
                {/* General Information */}
                <Card className="shadow-sm border-gray-200 rounded-xl overflow-hidden">
                    <CardHeader className="border-b bg-gray-50/40">
                        <CardTitle className="text-lg font-bold text-gray-800">Informasi Umum</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-700 font-bold">Judul Rekrutmen</Label>
                            <Input
                                id="title"
                                placeholder="Contoh: Open Recruitment HMTI 2026"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={errors.title ? 'border-red-500' : 'focus:ring-2 focus:ring-gray-900'}
                            />
                            {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-700 font-bold">Deskripsi</Label>
                            <Textarea
                                id="description"
                                placeholder="Informasi mengenai rekrutmen..."
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className={errors.description ? 'border-red-500' : ''}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="max_registrants" className="text-gray-700 font-bold">Maks Pendaftar</Label>
                                <Input
                                    id="max_registrants"
                                    type="number"
                                    placeholder="Kosongkan jika tak terbatas"
                                    value={data.max_registrants}
                                    onChange={(e) => setData('max_registrants', e.target.value ? Number(e.target.value) : '')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="starts_at" className="text-gray-700 font-bold">Tanggal Mulai</Label>
                                <Input
                                    id="starts_at"
                                    type="datetime-local"
                                    value={data.starts_at}
                                    onChange={(e) => setData('starts_at', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ends_at" className="text-gray-700 font-bold">Tanggal Akhir</Label>
                                <Input
                                    id="ends_at"
                                    type="datetime-local"
                                    value={data.ends_at}
                                    onChange={(e) => setData('ends_at', e.target.value)}
                                />
                                {errors.ends_at && <p className="text-xs text-red-500 font-medium">{errors.ends_at}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Registration Fields Builder */}
                <Card className="shadow-sm border-gray-200 rounded-xl overflow-hidden">
                    <CardHeader className="border-b bg-gray-50/40 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-800">Form Pendaftaran</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addField} className="gap-1">
                            <Plus className="h-4 w-4" />
                            Tambah Field
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        {errors.registration_fields && (
                            <p className="text-xs text-red-500 font-medium">{errors.registration_fields}</p>
                        )}

                        {data.registration_fields.map((field, index) => (
                            <div key={index} className="flex flex-col gap-3 p-4 border rounded-lg bg-gray-50/50 relative group">
                                <div className="flex items-start gap-3">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <Input
                                            placeholder="Nama Field"
                                            value={field.name}
                                            onChange={(e) => updateField(index, { name: e.target.value })}
                                            className="bg-white"
                                        />
                                        <Select
                                            value={field.type}
                                            onValueChange={(val) => updateField(index, { type: val, options: needsOptions(val) ? (field.options ?? ['']) : undefined })}
                                        >
                                            <SelectTrigger className="bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Teks</SelectItem>
                                                <SelectItem value="number">Angka</SelectItem>
                                                <SelectItem value="email">Email</SelectItem>
                                                <SelectItem value="textarea">Teks Panjang</SelectItem>
                                                <SelectItem value="select">Dropdown</SelectItem>
                                                <SelectItem value="radio">Pilihan Ganda</SelectItem>
                                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    checked={field.required}
                                                    onCheckedChange={(val) => updateField(index, { required: val })}
                                                />
                                                <Label className="text-sm text-gray-600">Wajib</Label>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeField(index)}
                                                className="text-red-400 hover:text-red-600 hover:bg-red-50 ml-auto"
                                                disabled={data.registration_fields.length <= 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Options for select/radio/checkbox */}
                                {needsOptions(field.type) && (
                                    <div className="pl-0 sm:pl-2 space-y-2">
                                        <Label className="text-xs text-gray-500 font-semibold">Opsi Pilihan:</Label>
                                        {(field.options ?? []).map((option, optIdx) => (
                                            <div key={optIdx} className="flex items-center gap-2">
                                                <Input
                                                    placeholder={`Opsi ${optIdx + 1}`}
                                                    value={option}
                                                    onChange={(e) => updateOption(index, optIdx, e.target.value)}
                                                    className="bg-white flex-1 h-8 text-sm"
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index, optIdx)} className="h-8 w-8 text-red-400 hover:text-red-600">
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" size="sm" onClick={() => addOption(index)} className="text-xs h-7">
                                            <Plus className="h-3 w-3 mr-1" /> Tambah Opsi
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}
