import { Head } from '@inertiajs/react';
import Hero from '@/components/organism/hero';
import PublicLayout from '@/layouts/public-layout';
import MissionSection from '@/components/organism/mission-section';
import FeaturesSection from '@/components/organism/features-section';

export default function Welcome() {
    return (
        <PublicLayout>
            <Head title="Welcome to Informatics Core" />

            <Hero />
            <MissionSection />
            <FeaturesSection />

        </PublicLayout>
    );
}
