import { Head } from '@inertiajs/react';
import Hero from '@/components/organism/hero';
import Navbar from '@/components/organism/navbar';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-background">
            <Head title="Welcome to Informatics Core" />

            <Navbar />
            <Hero />

        </div>
    );
}
