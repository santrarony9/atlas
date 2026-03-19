"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AboutContent {
    about: { title: string; heading: string; description: string; imageUrl: string };
    aboutPage: { missionTitle: string; missionText: string; visionTitle: string; visionText: string; headerImage?: string };
}

export default function AboutUs() {
    const [content, setContent] = useState<AboutContent | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            const res = await fetch("/api/content", { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                setContent(data);
            }
        };
        fetchContent();
    }, []);

    // Fallback data
    const mission = content?.aboutPage?.missionText || "To bring a change in the engineered castings market through better technology, improved quality, lower costs, and reduced impact on the environment by adoption of green technologies.";
    const missionTitle = content?.aboutPage?.missionTitle || "Our Mission";
    const vision = content?.aboutPage?.visionText || "To be a pioneer in the casting industry by sustainably and profitably establishing latest production methodologies through continuous research, development, and adoption of best practices.";
    const visionTitle = content?.aboutPage?.visionTitle || "Our Vision";

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src={content?.aboutPage?.headerImage || "/images2/12.png"}
                        alt="About Atlas Foundries"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-blue/80"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold font-montserrat mb-4">About Us</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-brand-orange">About Us</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-brand-orange font-bold uppercase tracking-wider mb-2 block">Our Story</span>
                            <h2 className="text-4xl font-bold text-brand-blue mb-6">Pioneering the Lost Foam Process</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Atlas Foundries was established in 2020 as a dedicated
                                <strong> 100% Lost Foam Process Foundry</strong>. We are a pioneer in this manufacturing process and currently the only foundry of its kind in Eastern India catering to critical sectors like Railways, Water Supply, Automotives, and Heavy Industry.
                            </p>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Imbued with the spirit of a modern startup, we combine deep product knowledge with a focus on R&D. Our facility is designed to produce complex geometries that traditional sand casting simply cannot achieve, offering superior surface finish and dimensional accuracy.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src={content?.about?.imageUrl || "/images2/about1.png"}
                                alt="Factory Interior"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Cards */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="bg-white p-10 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300 border-t-4 border-brand-orange">
                            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-3xl mb-6">
                                👁️
                            </div>
                            <h3 className="text-2xl font-bold text-brand-blue mb-4">{visionTitle}</h3>
                            <p className="text-gray-600 italic">
                                "{vision}"
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-white p-10 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300 border-t-4 border-brand-blue">
                            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-3xl mb-6">
                                🎯
                            </div>
                            <h3 className="text-2xl font-bold text-brand-blue mb-4">{missionTitle}</h3>
                            <p className="text-gray-600 italic">
                                "{mission}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
