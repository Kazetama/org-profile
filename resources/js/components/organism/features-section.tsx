import { motion } from "framer-motion";
import { Laptop, Users, GraduationCap, Globe2 } from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            title: "Workshop & Training",
            desc: "Pelatihan rutin software development, desain UI/UX, dan teknologi terbaru.",
            icon: Laptop,
            gradient: "from-blue-600 to-indigo-600",
        },
        {
            title: "Project Kolaborasi",
            desc: "Membangun proyek nyata secara tim untuk portofolio dan solusi masyarakat.",
            icon: Globe2,
            gradient: "from-emerald-500 to-teal-600",
        },
        {
            title: "Komunitas Belajar",
            desc: "Wadah diskusi dan sharing knowledge antar sesama mahasiswa informatika.",
            icon: Users,
            gradient: "from-amber-500 to-orange-600",
        },
        {
            title: "Mentoring & Karir",
            desc: "Bimbingan langsung dari senior dan alumni yang profesional di bidang IT.",
            icon: GraduationCap,
            gradient: "from-purple-600 to-pink-600",
        },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Program Kerja & Unggulan</h2>
                    <p className="text-slate-500">Berbagai inisiatif kami untuk mendorong perkembangan ekosistem teknologi yang inklusif dan inovatif.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                {feature.desc}
                            </p>
                            <div className="w-8 h-1 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
