import { motion } from "framer-motion";
import { Target, Zap, Shield, Rocket } from "lucide-react";

export default function MissionSection() {
    const missions = [
        {
            title: "Inovasi Digital",
            desc: "Membangun solusi teknologi yang relevan dan berdampak bagi masyarakat.",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            title: "Pengembangan Bakat",
            desc: "Wabah untuk mengasah skill software engineering dan leadership.",
            icon: Target,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Integritas & Etika",
            desc: "Menjunjung tinggi etika profesional dalam setiap karya teknologi.",
            icon: Shield,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            title: "Visi Masa Depan",
            desc: "Menyiapkan talenta IT unggul untuk tantangan industri global.",
            icon: Rocket,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
        },
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                            Misi Kami: Membangun <br />
                            <span className="text-blue-600">Masa Depan Teknologi</span> yang Lebih Baik.
                        </h2>
                        <p className="text-slate-500 mb-8 leading-relaxed max-w-lg">
                            Biro Teknik Informatika berkomitmen untuk menjadi garda terdepan dalam inovasi teknologi tingkat mahasiswa, menciptakan ekosistem yang kolaboratif dan progresif.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-bold text-slate-900">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <span>50+ Mahasiswa Bergabung</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {missions.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
