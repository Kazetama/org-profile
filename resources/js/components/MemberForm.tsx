import React from 'react';
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
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
                    <input
                        type="text"
                        className={`w-full p-3 rounded-xl border ${errors.full_name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                    />
                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                </div>

                {/* NIM */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">NIM</label>
                    <input
                        type="text"
                        className={`w-full p-3 rounded-xl border ${errors.nim ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                        value={data.nim}
                        onChange={(e) => setData('nim', e.target.value)}
                    />
                    {errors.nim && <p className="text-red-500 text-xs mt-1">{errors.nim}</p>}
                </div>

                {/* No HP */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">No. HP (WhatsApp)</label>
                    <input
                        type="text"
                        className={`w-full p-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Angkatan */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Angkatan</label>
                    <input
                        type="number"
                        className={`w-full p-3 rounded-xl border ${errors.batch ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                        value={data.batch}
                        onChange={(e) => setData('batch', parseInt(e.target.value) || 0)}
                    />
                    {errors.batch && <p className="text-red-500 text-xs mt-1">{errors.batch}</p>}
                </div>

                {/* Jabatan */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Jabatan</label>
                    <input
                        type="text"
                        className={`w-full p-3 rounded-xl border ${errors.position ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                    />
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                </div>

                {/* Status Anggota */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Status Anggota</label>
                    <select
                        className={`w-full p-3 rounded-xl border ${errors.status ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white text-sm`}
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="trial">Trial</option>
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Non-Aktif</option>
                        <option value="demision">Demision</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-50">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100 transition duration-200"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                </button>
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition duration-200"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
