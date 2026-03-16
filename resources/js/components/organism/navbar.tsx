import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Menu, Code2, ChevronRight, LayoutDashboard } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Pastikan path ke komponen shadcn benar
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Event", href: "/event" },
    { name: "Artikel", href: "/artikel" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 border-b font-inter",
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl py-3 shadow-sm border-slate-200/50"
                    : "bg-transparent py-6 border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-blue-200 shadow-lg transition-transform group-hover:rotate-3">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-lg tracking-tight text-slate-900">
                            Biro Teknik Informatika
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-semibold">
                            Official Website
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = url === item.href || url.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 group overflow-hidden"
                            >
                                <span className={cn(
                                    "relative z-10 text-sm font-medium transition-colors duration-300",
                                    isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-900"
                                )}>
                                    {item.name}
                                </span>
                                <div className="absolute inset-0 bg-slate-100/80 rounded-lg scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
                                {isActive && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <div className="ml-4 pl-4 border-l border-slate-200">
                        <Button className="rounded-full bg-slate-900 hover:bg-blue-600 text-white gap-2 transition-all active:scale-95">
                            <LayoutDashboard className="w-4 h-4" />
                            Portal
                        </Button>
                    </div>
                </div>

                {/* Mobile Trigger & Menu */}
                <div className="md:hidden">
                    <Sheet>
                        {/* Trigger WAJIB ada agar Sheet berfungsi */}
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100">
                                <Menu className="w-6 h-6 text-slate-700" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-[85%] sm:w-[400px] p-0 border-none bg-white flex flex-col">
                            {/* Mobile Header */}
                            <SheetHeader className="p-6 text-left border-b border-slate-50">
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl">
                                        <Code2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-inter font-bold text-slate-900">Menu Utama</span>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Mobile Links */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                {navItems.map((item) => {
                                    const isActive = url === item.href;
                                    return (
                                        <Link key={item.name} href={item.href} className="block">
                                            <div className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                                                isActive
                                                    ? "bg-blue-50/80 border border-blue-100 shadow-sm"
                                                    : "hover:bg-slate-50 border border-transparent"
                                            )}>
                                                <span className={cn(
                                                    "font-bold tracking-tight text-[16px]",
                                                    isActive
                                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                                                        : "text-slate-600"
                                                )}>
                                                    {item.name}
                                                </span>
                                                <div className={cn(
                                                    "p-1 rounded-lg transition-all",
                                                    isActive ? "bg-blue-600 text-white" : "text-slate-300 group-hover:text-slate-900"
                                                )}>
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile Footer (Button) */}
                            <div className="p-6 border-t border-slate-50">
                                <Button className="w-full bg-slate-900 hover:bg-blue-600 h-14 rounded-2xl shadow-xl shadow-slate-200 text-white font-bold transition-all active:scale-[0.97]">
                                    Masuk Portal
                                </Button>
                                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em]">
                                    Biro Teknik Informatika © 2026
                                </p>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </nav>
    );
}
