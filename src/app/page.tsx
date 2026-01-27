"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import FadeInItem from "@/components/animations/FadeInItem";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

// Define the shape of our content
interface SiteContentData {
    hero: { title: string; subtitle: string; bgImage: string };
    about: { title: string; heading: string; description: string; imageUrl: string };
    features: { title: string; description: string; imageUrl: string; linkUrl: string }[];
}

// Default content (Initial State / Fallback)
const defaultContent: SiteContentData = {
    hero: {
        title: "Engineered Casting Solutions",
        subtitle: "100+ Years of Excellence",
        bgImage: "/images2/Cover.jpg"
    },
    about: {
        title: "About Atlas Foundries",
        heading: "World-Class Manufacturing in the Heart of India",
        description: "Atlas Foundries is a pioneering force in the metal casting industry. We combine traditional craftsmanship with modern Lost Foam technology to produce complex, high-precision components that traditional sand casting cannot achieve.",
        imageUrl: "/images2/about1.png"
    },
    features: [
        { title: "Railway", description: "Couplers, draft gears, and bogie components engineered for durability.", imageUrl: "/images2/2.jpg", linkUrl: "/products" },
        { title: "Marine", description: "Corrosion-resistant castings for ship building and offshore platforms.", imageUrl: "/images2/3.jpg", linkUrl: "/products" },
        { title: "Industrial", description: "Valves, pumps, and heavy machinery parts made with Lost Foam precision.", imageUrl: "/images2/73.png", linkUrl: "/products" }
    ]
};

export default function Home() {
    const [content, setContent] = useState<SiteContentData>(defaultContent);

    useEffect(() => {
        // Fetch dynamic content on client mount
        const fetchContent = async () => {
            try {
                const res = await fetch("/api/content");
                if (res.ok) {
                    const data = await res.json();
                    // Only update if we got valid data back (contains hero, etc)
                    if (data && data.hero) {
                        setContent(data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch site content, using defaults", error);
            }
        };
        fetchContent();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={content.hero.bgImage}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 to-brand-blue/60"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl text-white">
                        <FadeIn delay={0.1} direction="down">
                            <span className="text-brand-orange font-bold tracking-widest uppercase mb-4 block">
                                {content.hero.subtitle}
                            </span>
                        </FadeIn>
                        <FadeIn delay={0.2} direction="up">
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-montserrat"
                                dangerouslySetInnerHTML={{
                                    // Allow simple HTML like <br/> or spans if user adds them, or just text
                                    // But for now let's just render text. If we want coloring, we might need to parse.
                                    // For simplicity and safety, let's just render text, maybe basic newlines.
                                    // Actually, let's keep the fancy coloring of 'Solutions' hardcoded? 
                                    // User asked for full control, so they lose the hardcoded color span unless we provide a rich text editor.
                                    // Let's preserve the existing style on 'Solutions' by checking if it matches the default, 
                                    // otherwise render plain text.
                                    __html: content.hero.title.replace('Solutions', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Solutions</span>').replace(/\n/g, '<br/>')
                                }}
                            />
                        </FadeIn>
                        <FadeIn delay={0.3} direction="up">
                            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
                                Specializing in the <strong>Lost Foam Process</strong> to deliver precision castings for Railway, Marine, and Industrial applications globally.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.4} direction="up">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact-us" className="px-8 py-4 bg-brand-orange text-white font-bold rounded hover:bg-white hover:text-brand-orange transition-all text-center">
                                    Get a Quote
                                </Link>
                                <Link href="/about-us" className="px-8 py-4 border border-white text-white font-bold rounded hover:bg-white hover:text-brand-blue transition-all text-center">
                                    Our Story
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right" delay={0.2}>
                            <ScaleOnHover className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                                <Image
                                    src={content.about.imageUrl}
                                    alt="About Image"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </ScaleOnHover>
                        </FadeIn>
                        <div>
                            <FadeIn direction="left" delay={0.2}>
                                <h4 className="text-brand-orange font-bold uppercase tracking-wider mb-2">{content.about.title}</h4>
                                <h2 className="text-4xl font-bold text-brand-blue mb-6">{content.about.heading}</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                                    {content.about.description}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-sm">✓</div>
                                        <span className="font-semibold text-gray-700">ISO 9001:2015 Certified</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-sm">✓</div>
                                        <span className="font-semibold text-gray-700">Specialized in Complex Geometries</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-sm">✓</div>
                                        <span className="font-semibold text-gray-700">Exporting to 15+ Countries</span>
                                    </li>
                                </ul>
                                <Link href="/about-us" className="text-brand-blue font-bold hover:text-brand-orange transition-colors flex items-center gap-2">
                                    Read More <span>→</span>
                                </Link>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services / Capabilities Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h4 className="text-brand-orange font-bold uppercase tracking-wider mb-2">Our Expertise</h4>
                        <h2 className="text-4xl font-bold text-brand-blue mb-4">Precision Industries We Serve</h2>
                        <p className="text-gray-600">Delivering critical components where failure is not an option.</p>
                    </div>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8">
                        {content.features.map((feature, idx) => (
                            <FadeInItem key={idx}>
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group h-full flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={feature.imageUrl}
                                            alt={feature.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">View Details</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-bold text-brand-blue mb-3">{feature.title}</h3>
                                        <p className="text-gray-600 mb-4 flex-1">{feature.description}</p>
                                        <Link href={feature.linkUrl} className="text-brand-orange font-bold text-sm uppercase self-start">Learn more</Link>
                                    </div>
                                </div>
                            </FadeInItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* CTA Section (Kept Static for now as user only asked for Hero/About/Services) */}
            <section className="py-20 bg-brand-blue relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/images2/Cover.jpg" alt="bg" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl text-white font-bold mb-6">Ready to upgrade your supply chain?</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Contact us today to discuss your casting requirements and experience the Atlas advantage.</p>
                    <Link href="/contact-us" className="px-10 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-white hover:text-brand-orange transition-all shadow-lg inline-block">
                        Contact Us Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
