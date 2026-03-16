import { Link } from "@inertiajs/react";
import { Code2, Github, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8 font-inter">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-blue-200 shadow-lg">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">
                                Biro Teknik Informatika
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Platform informasi dan edukasi resmi Biro Teknik Informatika untuk seluruh mahasiswa dan civitas akademik.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Instagram, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Github, href: "#" },
                                { icon: Linkedin, href: "#" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 underline decoration-blue-500 decoration-2 underline-offset-8">
                            Tautan Cepat
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Beranda", href: "/" },
                                { name: "Tentang Kami", href: "/profil" },
                                { name: "Program Kerja", href: "/proker" },
                                { name: "Artikel & Berita", href: "/artikel" },
                                { name: "Hubungi Kami", href: "/kontak" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-500 hover:text-blue-600 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-600 group-hover:scale-150 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 underline decoration-blue-500 decoration-2 underline-offset-8">
                            Informasi
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Bantuan & FAQ",
                                "Kebijakan Privasi",
                                "Syarat & Ketentuan",
                                "Karir",
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-slate-500 hover:text-blue-600 text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 underline decoration-blue-500 decoration-2 underline-offset-8">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 rounded-lg bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-slate-500 text-sm leading-relaxed">
                                    Jl. Raya Kampus IT, Gedung B Lantai 2, Kota Informatika
                                </span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-slate-500 text-sm">info@infotek.ac.id</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-slate-500 text-sm">+62 (21) 1234-5678</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-semibold">
                        Biro Teknik Informatika © {currentYear} • All Rights Reserved
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-slate-400 hover:text-slate-900 text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors">
                            Admin Portal
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
