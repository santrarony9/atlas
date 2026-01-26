"use client";

import Image from "next/image";
import Link from "next/link";

export default function Quality() {
    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="relative h-[300px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images2/qa.png"
                        alt="Quality Assurance"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-blue/90"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold font-montserrat mb-4">Quality Control</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-brand-orange">Quality</span>
                    </div>
                </div>
            </div>

            {/* Policy & Assurance Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Policy */}
                        <div className="bg-brand-light p-8 rounded-xl shadow-sm">
                            <h3 className="text-2xl font-bold text-brand-blue mb-4 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-orange block rounded"></span>
                                Quality Policy
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To deliver superior quality products at a reasonable price and in time-bound manner. To achieve customer satisfaction through meeting quality requirements of product and process. To elicit customer appreciation through continuous improvement in products and processes.
                            </p>
                            <div className="mt-6 relative h-48 rounded-lg overflow-hidden">
                                <Image
                                    src="/images2/qp.png"
                                    alt="Policy"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Assurance */}
                        <div className="bg-brand-light p-8 rounded-xl shadow-sm">
                            <h3 className="text-2xl font-bold text-brand-blue mb-4 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-orange block rounded"></span>
                                Quality Assurance
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We follow a continuous improvement methodology. Our team focuses on training and sensitizing staff to the importance of "Right First Time". Supervisors implement control systems at every stage to ensure we achieve zero-defect performance levels.
                            </p>
                            <div className="mt-6 relative h-48 rounded-lg overflow-hidden">
                                <Image
                                    src="/images2/qa.png"
                                    alt="Assurance"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inspections */}
            <section className="py-20 bg-brand-blue text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Rigorous Inspections</h2>
                        <p className="text-slate-300">Performed at every step to ensure your product meets all standards.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: "🏭", title: "Raw Material", desc: "Visual Inspection, Test Reports, In-House Composition Testing" },
                            { icon: "📈", title: "Molding", desc: "Visual Inspection, Density Tester to ensure error-free molds" },
                            { icon: "🛠️", title: "Assembly", desc: "Strict Dimensional Control to ensure accurate castings without shifts" },
                            { icon: "🔥", title: "Melting", desc: "Proportion checks, temperature control, composition analysis" },
                            { icon: "🏗️", title: "Shakeout", desc: "Visual & Dimensional Checking, Surface Check for Stage 1 Compliance" },
                            { icon: "✅", title: "Finishing", desc: "Visual Inspection, Weight Check, Paint check for error-free dispatch" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h4 className="text-xl font-bold mb-2 text-brand-orange">{item.title}</h4>
                                <p className="text-sm text-slate-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testing Facilities List */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Testing Facilities</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {[
                            "29 channel Optical emission Spectrometer",
                            "Microscope",
                            "Portable Hardness Tester",
                            "Grinding Machine & Polishing Machine",
                            "C-Si Analyser & Pyrometer",
                            "Sand Sieve for testing",
                            "Hydrotesting Machine",
                            "Ultrasonic Thickness Gauge & Calipers"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 border rounded bg-brand-light">
                                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                                <span className="text-gray-800 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
