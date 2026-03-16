import Navbar from "@/components/organism/navbar";
import Footer from "@/components/organism/footer";
import { ReactNode } from "react";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-white flex flex-col font-inter">
            <Navbar />
            <main className="flex-1 pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
