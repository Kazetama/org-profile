import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/organism/navbar'; // Pastikan path file Navbar.tsx sudah benar
import Hero from '@/components/organism/hero'; // Pastikan path file Hero.tsx sudah benar
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Layout } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-background">
            <Head title="Welcome to Informatics Core" />

            <Navbar />
            <Hero />

        </div>
    );
}
