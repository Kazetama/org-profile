import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, Download, Calendar, Inbox, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'

interface RegistrationField {
    name: string
    type: string
    required: boolean
}

interface Registrant {
    id: number
    registration_data: Record<string, string | number | boolean | null>
    created_at: string
}

interface PaginatedData<T> {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    links: { url: string | null; label: string; active: boolean }[]
}

interface Recruitment {
    id: number
    title: string
    registration_fields: RegistrationField[]
}

interface Props {
    recruitment: Recruitment
    registrants: PaginatedData<Registrant>
}

export default function Registrants({ recruitment, registrants }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const fields = recruitment.registration_fields ?? []

    const filteredRegistrants = registrants.data.filter((r) => {
        const fullDataString = JSON.stringify(r.registration_data).toLowerCase()
        return fullDataString.includes(searchTerm.toLowerCase())
    })

    const handleExport = () => {
        window.open(`/admin-psdm/recruitment/${recruitment.id}/export`, '_blank')
    }

    const getFieldValue = (registrant: Registrant, field: RegistrationField) => {
        const fieldName = field.name.replace(/\s+/g, '_').toLowerCase()
        return registrant.registration_data[fieldName] ?? '-'
    }

    return (
        <AppLayout>
            <Head title={`Pendaftar - ${recruitment.title}`} />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                            <Link href="/admin-psdm/recruitment">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Daftar Pendaftar
                            </h1>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {recruitment.title}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari pendaftar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-64 bg-white"
                            />
                        </div>
                        <Button onClick={handleExport} variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/80 border-b border-gray-200">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-700 pl-6 w-12">No</TableHead>
                                {fields.map((field) => (
                                    <TableHead key={field.name} className="font-semibold text-gray-700">
                                        {field.name}
                                    </TableHead>
                                ))}
                                <TableHead className="font-semibold text-gray-700">Tanggal Daftar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRegistrants.length > 0 ? (
                                filteredRegistrants.map((registrant, index) => (
                                    <TableRow key={registrant.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <TableCell className="pl-6 text-gray-500 text-sm">{index + 1}</TableCell>
                                        {fields.map((field) => (
                                            <TableCell key={field.name} className="text-gray-700 text-sm">
                                                {String(getFieldValue(registrant, field))}
                                            </TableCell>
                                        ))}
                                        <TableCell className="text-gray-500 text-sm">
                                            {new Date(registrant.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={fields.length + 2} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <div className="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                                                <Inbox className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-base font-medium text-gray-900">Belum ada pendaftar</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="text-sm text-gray-500 text-center">
                    Total: {registrants.total} pendaftar
                </div>
            </div>
        </AppLayout>
    )
}
