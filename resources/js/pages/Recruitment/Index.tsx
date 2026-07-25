import { Head, useForm, Link } from '@inertiajs/react'
import { Send, CheckCircle, XCircle, ArrowLeft, Users, Calendar, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import PublicLayout from '@/layouts/public-layout'

interface RegistrationField {
    name: string
    type: string
    required: boolean
    options?: string[]
}

interface Recruitment {
    id: number
    title: string
    description: string | null
    is_active: boolean
    registration_fields: RegistrationField[]
    max_registrants: number | null
    registrants_count: number
    starts_at: string | null
    ends_at: string | null
}

interface Props {
    recruitment: Recruitment | null
}

export default function RecruitmentIndex({ recruitment }: Props) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<Record<string, string | number | boolean | null>>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/recruitment/register', {
            onSuccess: () => reset(),
            preserveScroll: true,
        })
    }

    const renderField = (field: RegistrationField) => {
        const fieldId = field.name.replace(/\s+/g, '-').toLowerCase()
        const fieldName = field.name.replace(/\s+/g, '_').toLowerCase()

        return (
            <div key={field.name} className="space-y-2">
                <Label htmlFor={fieldId} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    {field.name}
                    {field.required && <span className="text-red-500 text-xs font-bold">*</span>}
                </Label>

                {field.type === 'text' && (
                    <Input
                        id={fieldId}
                        type="text"
                        value={(data[fieldName] as string) ?? ''}
                        onChange={(e) => setData(fieldName, e.target.value)}
                        placeholder={`Masukkan ${field.name.toLowerCase()}`}
                        className="bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                )}

                {field.type === 'email' && (
                    <Input
                        id={fieldId}
                        type="email"
                        value={(data[fieldName] as string) ?? ''}
                        onChange={(e) => setData(fieldName, e.target.value)}
                        placeholder={`Masukkan ${field.name.toLowerCase()}`}
                        className="bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                )}

                {field.type === 'number' && (
                    <Input
                        id={fieldId}
                        type="number"
                        value={(data[fieldName] as string) ?? ''}
                        onChange={(e) => setData(fieldName, e.target.value)}
                        placeholder={`Masukkan ${field.name.toLowerCase()}`}
                        className="bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                )}

                {field.type === 'textarea' && (
                    <Textarea
                        id={fieldId}
                        value={(data[fieldName] as string) ?? ''}
                        onChange={(e) => setData(fieldName, e.target.value)}
                        placeholder={`Masukkan ${field.name.toLowerCase()}`}
                        rows={3}
                        className="bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                )}

                {field.type === 'select' && field.options && (
                    <Select onValueChange={(val) => setData(fieldName, val)}>
                        <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue placeholder={`Pilih ${field.name.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options.map((opt) => (
                                <SelectItem key={opt} value={opt} className="cursor-pointer">
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {field.type === 'radio' && field.options && (
                    <RadioGroup onValueChange={(val) => setData(fieldName, val)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {field.options.map((opt) => (
                            <div key={opt} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                                <RadioGroupItem value={opt} id={`${fieldId}-${opt}`} />
                                <Label htmlFor={`${fieldId}-${opt}`} className="cursor-pointer flex-1 text-sm">{opt}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}

                {field.type === 'checkbox' && (
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <Checkbox
                            id={fieldId}
                            checked={data[fieldName] === true}
                            onCheckedChange={(val) => setData(fieldName, val)}
                        />
                        <Label htmlFor={fieldId} className="text-sm cursor-pointer">{field.name}</Label>
                    </div>
                )}

                {errors[fieldName] && (
                    <p className="text-xs text-red-500 font-medium">{errors[fieldName]}</p>
                )}
            </div>
        )
    }

    // No active recruitment
    if (!recruitment) {
        return (
            <PublicLayout>
                <Head title="Open Recruitment" />

                <div className="min-h-[70vh] flex items-center justify-center px-6">
                    <Card className="max-w-lg w-full text-center rounded-2xl shadow-xl border-gray-100">
                        <CardContent className="p-12 space-y-6">
                            <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                <XCircle className="w-10 h-10 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Pendaftaran Belum Dibuka
                                </h2>
                                <p className="text-gray-500 leading-relaxed">
                                    Saat ini belum ada periode pendaftaran anggota baru yang aktif.
                                    Silakan cek kembali nanti.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="rounded-full px-6">
                                <Link href="/">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali ke Beranda
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </PublicLayout>
        )
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return null
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
        })
    }

    return (
        <PublicLayout>
            <Head title={`${recruitment.title} - Pendaftaran`} />

            {/* Hero Section */}
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>
                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    <Link href="/" className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold border border-white/20 hover:bg-white/20 transition-all mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                        {recruitment.title}
                    </h1>
                    {recruitment.description && (
                        <p className="mt-4 text-lg text-blue-100 max-w-2xl leading-relaxed">
                            {recruitment.description}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {(recruitment.starts_at || recruitment.ends_at) && (
                            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(recruitment.starts_at)} — {formatDate(recruitment.ends_at)}
                            </div>
                        )}
                        {recruitment.max_registrants && (
                            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {recruitment.registrants_count} / {recruitment.max_registrants} Pendaftar
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10 pb-20">
                {recentlySuccessful ? (
                    <Card className="rounded-2xl shadow-xl border-green-200 bg-green-50/50">
                        <CardContent className="p-12 text-center space-y-6">
                            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in-50 duration-500">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-green-900">Pendaftaran Berhasil!</h2>
                                <p className="text-green-700">Terima kasih telah mendaftar. Data Anda telah kami terima.</p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="rounded-2xl shadow-xl border-gray-100">
                        <CardHeader className="pb-4 border-b bg-gray-50/40 rounded-t-2xl px-8 pt-8">
                            <CardTitle className="text-xl font-bold text-gray-900">
                                Formulir Pendaftaran
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                                Lengkapi data berikut untuk mendaftar. <span className="text-red-500">*</span> menandakan field wajib.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 py-8">
                            {errors.message && (
                                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-medium">
                                    {errors.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {recruitment.registration_fields.map(renderField)}

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl h-12 text-base font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 animate-spin" />
                                            Mengirim...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="w-4 h-4" />
                                            Daftar Sekarang
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </PublicLayout>
    )
}
