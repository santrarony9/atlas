"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Printer } from "lucide-react";

interface SiteContent {
    hero: { title: string; subtitle: string; bgImage: string };
    about: { title: string; heading: string; description: string; imageUrl: string };
    contactEmail: string;
    socialLinks: { facebook: string; twitter: string; linkedin: string; instagram: string; youtube: string };
    infrastructure: { companyImages: string[]; certificates: string[] };
}

export default function CompanyProfile() {
    const [content, setContent] = useState<SiteContent | null>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => setContent(data));
    }, []);

    if (!content) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white min-h-screen text-slate-900">
            {/* Print Button (Hidden when printing) */}
            <div className="fixed top-4 right-4 z-50 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full shadow-lg hover:bg-brand-orange transition-all font-bold"
                >
                    <Printer className="w-5 h-5" />
                    Print / Save as PDF
                </button>
            </div>

            {/* A4 Page Container */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none print:w-[210mm]">

                {/* --- PAGE 1: COVER --- */}
                <div className="h-[297mm] relative flex flex-col print:break-after-page overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        {content.hero.bgImage && (
                            <Image
                                src={content.hero.bgImage}
                                alt="Cover"
                                fill
                                className="object-cover opacity-90"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end p-16 text-white pb-32">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-brand-orange rounded-lg flex items-center justify-center text-4xl font-bold mb-6 shadow-xl">
                                A
                            </div>
                            <h1 className="text-6xl font-bold uppercase tracking-tight mb-4">Atlas<br />Foundries</h1>
                            <p className="text-2xl text-brand-orange font-medium tracking-wide uppercase">Company Profile {new Date().getFullYear()}</p>
                        </div>
                        <div className="w-32 h-2 bg-brand-orange mb-8"></div>
                        <p className="text-xl max-w-lg text-slate-200 leading-relaxed">
                            {content.hero.title}
                            <br />
                            <span className="text-lg opacity-80">{content.hero.subtitle}</span>
                        </p>
                    </div>
                </div>

                {/* --- PAGE 2: ABOUT & INTRO --- */}
                <div className="min-h-[297mm] p-16 print:break-after-page flex flex-col relative bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-end border-b-4 border-brand-orange pb-6 mb-12">
                        <h2 className="text-4xl font-bold text-brand-blue uppercase">Who We Are</h2>
                        <span className="text-slate-400 font-semibold">02</span>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">{content.about.heading}</h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-12 text-justify">
                            {content.about.description}
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h4 className="text-xl font-bold text-brand-orange mb-2">Vision</h4>
                                <p className="text-sm text-slate-600">To be a global leader in precision casting, setting benchmarks for quality and innovation in the manufacturing sector.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h4 className="text-xl font-bold text-brand-orange mb-2">Mission</h4>
                                <p className="text-sm text-slate-600">Delivering superior engineered solutions through sustainable practices, advanced technology, and unwavering commitment to customer satisfaction.</p>
                            </div>
                        </div>

                        {content.about.imageUrl && (
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                                <Image
                                    src={content.about.imageUrl}
                                    alt="About Factory"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* --- PAGE 3: INFRASTRUCTURE & CONTACT --- */}
                <div className="min-h-[297mm] p-16 flex flex-col relative bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-end border-b-4 border-brand-orange pb-6 mb-12">
                        <h2 className="text-4xl font-bold text-brand-blue uppercase">Infrastructure & Contact</h2>
                        <span className="text-slate-400 font-semibold">03</span>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-6 mb-12">
                            {content.infrastructure.companyImages?.slice(0, 4).map((img, idx) => (
                                <div key={idx} className="relative h-48 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                                    <Image src={img} alt={`Infrastructure ${idx}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white p-12 rounded-3xl shadow-xl mt-auto">
                            <h3 className="text-3xl font-bold mb-8 border-b border-brand-orange/50 pb-4 inline-block">Get in Touch</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold text-lg">Registered Office</p>
                                        <p className="text-slate-300">225/2 CIT Road, Scheme VII M,<br />Kolkata - 700054, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Globe className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold text-lg">Works</p>
                                        <p className="text-slate-300">Howrah - 711410</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-6 h-6 text-brand-orange shrink-0" />
                                    <p className="text-lg">+91 98307 35480</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 text-brand-orange shrink-0" />
                                    <p className="text-lg">{content.contactEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer for PDF */}
                    <div className="mt-16 text-center text-slate-400 text-sm border-t pt-8">
                        &copy; {new Date().getFullYear()} Atlas Foundries. All Rights Reserved. | www.atlasfoundries.com
                    </div>
                </div>

            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 0; size: A4; }
                    body { background: white; -webkit-print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
