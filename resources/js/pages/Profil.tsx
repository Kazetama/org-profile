import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { BookOpen, Users, History, Rocket, Heart, Star, Award, ShieldCheck } from "lucide-react";
import PublicLayout from "@/layouts/public-layout";

export default function Profil() {
    const stats = [
        { label: "Tahun Berdiri", value: "2018", icon: History },
        { label: "Total Anggota", value: "500+", icon: Users },
        { label: "Proyek Selesai", value: "120+", icon: Rocket },
        { label: "Penghargaan", value: "15+", icon: Award },
    ];

    const divisions = [
        {
            name: "Software Development",
            desc: "Fokus pada pengembangan aplikasi web, mobile, dan sistem informasi.",
            icon: Rocket,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            name: "Research & Development",
            desc: "Melakukan riset teknologi terbaru dan inovasi solusi digital.",
            icon: Star,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            name: "Cyber Security",
            desc: "Mempelajari keamanan informasi dan perlindungan data digital.",
            icon: ShieldCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            name: "Public Relation",
            desc: "Menjalin kerjasama dengan stakeholder dan publikasi kegiatan.",
            icon: Heart,
            color: "text-rose-600",
            bg: "bg-rose-50",
        },
    ];

    return (
        <PublicLayout>
            <Head title="Profil - Biro Teknik Informatika" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-slate-900 border-b border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">Mengenal Lebih Dekat <br />Biro Teknik Informatika</h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Dedikasi kami untuk membangun generasi teknologi unggul, kolaboratif, dan inovatif di lingkungan akademik dan industri.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="relative -mt-16 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sejarah & Latar Belakang */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                            <BookOpen className="w-3.5 h-3.5" />
                            Sejarah Kami
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">Berawal dari Visi, <br />Tumbuh dengan Karya.</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Biro Teknik Informatika didirikan dengan tujuan menjadi wadah integrasi bagi seluruh mahasiswa informatika untuk meningkatkan kompetensi teknis dan soft skills mereka.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Selama bertahun-tahun, kami telah bertransformasi dari sebuah kelompok belajar kecil menjadi organisasi yang solid dengan berbagai divisi spesialisasi, mengelola proyek nyata, dan menyelenggarakan event teknologi bergengsi.
                        </p>
                    </motion.div>
                    <div className="relative">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl skew-y-3">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team documentation" className="w-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600 rounded-[2rem] -z-10" />
                    </div>
                </div>
            </section>

            {/* Visi & Misi */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Visi & Misi Utama</h2>
                        <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-blue-50 group-hover:text-blue-100 transition-colors">
                                <Rocket className="w-32 h-32 rotate-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 relative z-10">Visi Kami</h3>
                            <p className="text-lg text-slate-600 leading-relaxed relative z-10">
                                Menjadi pusat unggulan pengembangan kreativitas dan inovasi teknologi bagi mahasiswa yang berorientasi pada kemajuan ekosistem digital global.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {[
                                "Mendorong kolaborasi aktif antar mahasiswa dalam pengembangan software.",
                                "Menyelenggarakan pelatihan dan workshop teknologi terkini secara rutin.",
                                "Menyiapkan sumber daya manusia yang siap bersaing di industri teknologi.",
                                "Menjalin kemitraan strategis dengan instansi pemerintah dan swasta."
                            ].map((misi, i) => (
                                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:translate-x-2 transition-transform">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold border border-blue-100">
                                        {i + 1}
                                    </div>
                                    <p className="text-slate-600 font-medium">{misi}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Divisi Page */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Divisi Organisasi</h2>
                        <p className="text-slate-500">Struktur kerja kami yang terorganisir untuk mencapai efektivitas dalam setiap program.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {divisions.map((div, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${div.bg} ${div.color} flex items-center justify-center mb-6`}>
                                    <div.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3">{div.name}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {div.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
