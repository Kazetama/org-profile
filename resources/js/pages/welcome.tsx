import { Head } from '@inertiajs/react';
import FeaturesSection from '@/components/organism/features-section';
import Hero from '@/components/organism/hero';
import MissionSection from '@/components/organism/mission-section';
import PublicLayout from '@/layouts/public-layout';

interface Props {
    activeMembersCount: number;
    eventsCount: number;
}

export default function Welcome({ activeMembersCount, eventsCount }: Props) {
    return (
        <PublicLayout>
            <Head title="Welcome to Informatics Core" />

            <Hero activeMembersCount={activeMembersCount} eventsCount={eventsCount} />
            <MissionSection />
            <FeaturesSection />

        </PublicLayout>
    );
}
