import { Head } from '@inertiajs/react';
import FeaturesSection from '@/components/organism/features-section';
import Hero from '@/components/organism/hero';
import MissionSection from '@/components/organism/mission-section';
import PublicLayout from '@/layouts/public-layout';

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
