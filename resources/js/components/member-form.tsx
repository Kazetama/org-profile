import { Loader2, Save, X, UserCircle, Phone, Fingerprint, Briefcase } from "lucide-react";
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Member } from '@/types';

export type MemberFormData = Omit<Member, 'id' | 'created_at' | 'updated_at'>;

interface MemberFormProps {
    data: MemberFormData;
    setData: (key: keyof MemberFormData, value: string | number) => void;
    errors: Partial<Record<keyof MemberFormData, string>>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    title: string;
}

export default function MemberForm({ data, setData, errors, processing, onSubmit, title }: MemberFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
                    <p className="text-sm text-muted-foreground">Lengkapi informasi anggota untuk sinkronisasi sistem.</p>
                </div>
                <Badge variant="outline" className="px-3 py-1 text-xs font-medium uppercase tracking-wider">
                    Informatics Core
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Section Utama: Identitas */}
                <Card className="md:col-span-7 border-zinc-200/60 shadow-sm overflow-hidden">
                    <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
                        <CardTitle className="text-base flex items-center gap-2">
                            <UserCircle className="w-4 h-4 text-zinc-500" />
                            Informasi Personal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="full_name" className="text-zinc-700">Nama Lengkap</Label>
                            <Input
                                id="full_name"
                                placeholder="Masukkan nama tanpa gelar..."
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                                className={errors.full_name ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-indigo-500"}
                            />
                            {errors.full_name && <span className="text-[11px] font-medium text-destructive">{errors.full_name}</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nim" className="flex items-center gap-1.5 text-zinc-700">
                                    <Fingerprint className="w-3.5 h-3.5" /> NIM
                                </Label>
                                <Input
                                    id="nim"
                                    placeholder="A11.202X.XXXXX"
                                    value={data.nim}
                                    onChange={(e) => setData('nim', e.target.value)}
                                    className={errors.nim ? "border-destructive" : ""}
                                />
                                {errors.nim && <span className="text-[11px] font-medium text-destructive">{errors.nim}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-1.5 text-zinc-700">
                                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                                </Label>
                                <Input
                                    id="phone"
                                    placeholder="08..."
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section Samping: Status & Jabatan */}
                <Card className="md:col-span-5 border-zinc-200/60 shadow-sm">
                    <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-zinc-500" />
                            Organisasi
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        <div className="space-y-2">
                            <Label className="text-zinc-700">Status Keanggotaan</Label>
                            <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                                <SelectTrigger className="w-full focus:ring-indigo-500">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="aktif">Aktif</SelectItem>
                                    <SelectItem value="nonaktif">Non-Aktif</SelectItem>
                                    <SelectItem value="demision">Demisioner</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-zinc-700">Jabatan</Label>
                            <Input
                                id="position"
                                placeholder="Contoh: Koordinator Lab"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="batch" className="text-zinc-700">Angkatan</Label>
                            <Input
                                id="batch"
                                type="number"
                                value={data.batch}
                                onChange={(e) => setData('batch', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => window.history.back()}
                    className="text-zinc-500 hover:text-zinc-800"
                >
                    <X className="w-4 h-4 mr-2" />
                    Batal
                </Button>
                <Button
                    disabled={processing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 min-w-[140px]"
                >
                    {processing ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    {processing ? 'Menyimpan...' : 'Simpan Member'}
                </Button>
            </div>
        </form>
    );
}
