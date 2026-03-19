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
    about: { title: string; heading: string; description: string; imageUrl: string; bulletPoints: string[] };
    features: { title: string; description: string; imageUrl: string; linkUrl: string }[];
    homeCTA: { title: string; subtitle: string; buttonText: string; buttonLink: string; bgImage: string };
    processPage?: {
        steps: { title: string; description: string; imageUrl: string }[];
    };
}

// Default content (Initial State / Fallback)
const defaultContent: SiteContentData = {
    hero: {
        title: "Engineered Casting Solutions",
        subtitle: "100+ Years of Excellence",
        bgImage: "/images2/Image 1.png"
    },
    about: {
        title: "About Atlas Foundries",
        heading: "World-Class Manufacturing in the Heart of India",
        description: "Atlas Foundries is a pioneering force in the metal casting industry. We combine traditional craftsmanship with modern Lost Foam technology to produce complex, high-precision components that traditional sand casting cannot achieve.",
        imageUrl: "/images2/about1.png",
        bulletPoints: [
            "ISO 9001:2015 Certified",
            "Specialized in Complex Geometries",
            "Exporting to 15+ Countries"
        ]
    },
    features: [
        { title: "Railway", description: "Couplers, draft gears, and bogie components engineered for durability.", imageUrl: "/images2/2.jpg", linkUrl: "/products" },
        { title: "Marine", description: "Corrosion-resistant castings for ship building and offshore platforms.", imageUrl: "/images2/3.jpg", linkUrl: "/products" },
        { title: "Industrial", description: "Valves, pumps, and heavy machinery parts made with Lost Foam precision.", imageUrl: "/images2/73.png", linkUrl: "/lost-foam-manufacturing" }
    ],
    homeCTA: {
        title: "Ready to upgrade your supply chain?",
        subtitle: "Contact us today to discuss your casting requirements and experience the Atlas advantage.",
        buttonText: "Contact Us Now",
        buttonLink: "/contact-us",
        bgImage: "/images2/Image 1.png"
    },
    processPage: {
        steps: [
            { title: "Pattern Production", description: "High-density polystyrene patterns are molded with precision.", imageUrl: "/images2/73.png" },
            { title: "Coating & Assembly", description: "Patterns are coated with refractory material and assembled.", imageUrl: "/images2/2.jpg" },
            { title: "Casting & Finishing", description: "Molten metal replaces the foam pattern, creating the final part.", imageUrl: "/images2/3.jpg" }
        ]
    }
};

export default function Home() {
    const [content, setContent] = useState<SiteContentData>(defaultContent);

    useEffect(() => {
        // Fetch dynamic content on client mount
        const fetchContent = async () => {
            try {
                const res = await fetch("/api/content", { cache: 'no-store' });
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

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl text-white">
                        <FadeIn delay={0.1} direction="down">
                            <span className="text-brand-orange font-bold tracking-widest uppercase mb-4 block text-sm md:text-base">
                                {content.hero.subtitle}
                            </span>
                        </FadeIn>
                        <FadeIn delay={0.2} direction="up">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 font-montserrat"
                                dangerouslySetInnerHTML={{
                                    __html: content.hero.title.replace('Solutions', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Solutions</span>').replace(/\n/g, '<br/>')
                                }}
                            />
                        </FadeIn>
                        <FadeIn delay={0.3} direction="up">
                            <p className="text-lg md:text-xl text-slate-200 mb-8 md:mb-10 leading-relaxed max-w-xl">
                                Specializing in the <strong>Lost Foam Process</strong> to deliver precision castings for Railway, Marine, and Industrial applications globally.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.4} direction="up">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact-us" className="px-8 py-3.5 bg-brand-orange text-white font-bold rounded hover:bg-white hover:text-brand-orange transition-all text-center text-sm md:text-base">
                                    Get a Quote
                                </Link>
                                <Link href="/about-us" className="px-8 py-3.5 border border-white text-white font-bold rounded hover:bg-white hover:text-brand-blue transition-all text-center text-sm md:text-base">
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
                                    {content.about.bulletPoints?.map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-sm">✓</div>
                                            <span className="font-semibold text-gray-700">{point}</span>
                                        </li>
                                    ))}
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

            {/* Lost Foam Process Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <FadeIn direction="right">
                                <h4 className="text-brand-orange font-bold uppercase tracking-wider mb-2">Our Core Technology</h4>
                                <h2 className="text-4xl font-bold text-brand-blue mb-6">Lost Foam Manufacturing Process</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Our state-of-the-art Lost Foam process allows for the creation of complex, high-precision castings with exceptional surface finish and dimensional accuracy. This zero-draft technology eliminates the need for cores and reduces machining requirements.
                                </p>
                                <div className="space-y-6 mb-8">
                                    {content.processPage?.steps.slice(0, 3).map((step, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold">
                                                0{idx + 1}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-brand-blue mb-1">{step.title}</h5>
                                                <p className="text-sm text-gray-500">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/lost-foam-manufacturing" className="px-8 py-3 bg-brand-blue text-white font-bold rounded hover:bg-brand-orange transition-colors inline-block">
                                    Explore the Process
                                </Link>
                            </FadeIn>
                        </div>
                        <div className="md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <FadeIn direction="left">
                                <Image
                                    src="/images2/73.png"
                                    alt="Lost Foam Process"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent flex items-end p-8">
                                    <p className="text-white font-medium italic">"Precision engineered to perfection using advanced foam evaporation technology."</p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-blue relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src={content.homeCTA.bgImage} alt="bg" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">{content.homeCTA.title}</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">{content.homeCTA.subtitle}</p>
                    <Link href={content.homeCTA.buttonLink} className="px-10 py-4 bg-brand-orange text-white font-bold rounded hover:bg-white hover:text-brand-orange transition-all shadow-lg inline-block">
                        {content.homeCTA.buttonText}
                    </Link>
                </div>
            </section>
        </div>
    );
}
