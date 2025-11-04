"use client";
import { useRef } from 'react'
import { Block6Component } from '../Blocks/Block6Component';
import { ServicesPage } from './ServicesPage';
import { ConditionsPage } from './ConditionsPage';
import { Block3Component } from '../Blocks/Block3Component';

export const LandingPage = () => {
    const block1Ref = useRef<HTMLDivElement | null>(null);
    
    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;
        const top = ref.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
    };
    
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-linear-to-b from-[#15268D] to-[#2541E9] text-white p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-center items-center">
                    <img
                        src="/logos/apolologo2.webp"
                        alt="Apolo Energies"
                        className="h-12 md:h-16"
                    />
                </div>
            </nav>

            <div ref={block1Ref}>
                <ServicesPage />
            </div>
            <Block3Component />
            <ConditionsPage />
            <Block6Component onScrollToForm={() => scrollTo(block1Ref)} />
        </div>
    );
};
