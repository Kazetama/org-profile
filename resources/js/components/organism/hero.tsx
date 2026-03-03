import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="z-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6">
                        <Sparkles className="w-3.5 h-3.5" />
                        Official Student Organization
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-inter font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                        Inovasi Teknologi <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Tanpa Batas.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10">
                        Wadah bagi mahasiswa Teknik Informatika untuk bereksplorasi,
                        mengembangkan potensi software engineering, dan membangun ekosistem digital yang solutif.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all hover:shadow-xl hover:shadow-blue-200 group">
                            Eksplorasi Program
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 transition-all">
                            <Terminal className="mr-2 w-5 h-5" />
                            Dokumentasi
                        </Button>
                    </div>

                    {/* Quick Stats Micro-interaction */}
                    <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
                        <div>
                            <p className="text-2xl font-bold text-slate-900">50+</p>
                            <p className="text-sm text-slate-500 font-medium">Anggota Aktif</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div>
                            <p className="text-2xl font-bold text-slate-900">12+</p>
                            <p className="text-sm text-slate-500 font-medium">Project Selesai</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content: Image Landscape */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative"
                >
                    {/* Image Wrapper dengan Efek Frame Modern */}
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-slate-200/50">
                        <img
                            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
                            alt="Biro Teknik Informatika Activity"
                            className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Floating Tech Card (Micro-interaction) */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 z-20 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status System</p>
                            <p className="text-sm font-bold text-slate-900">All Systems Operational</p>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
