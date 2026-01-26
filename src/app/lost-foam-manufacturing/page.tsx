"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LostFoam() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: "EPS Beads Pre-forming",
            desc: "EPS is the primary raw material that is steam treated to make patterns which will be later used to cast the actual product.",
            img: "/images2/73.png"
        },
        {
            title: "Forming / Moulding",
            desc: "Preformed beads are injected in a custom-made die to produce patterns by application of steam and pressure. These patterns are an exact replica of the actual product.",
            img: "/images2/4.jpg"
        },
        {
            title: "Assembly",
            desc: "Patterns are inspected for deformities. They are glued to a formed cluster and dried to make them stable for the next process.",
            img: "/images2/Assembly_1.jpg"
        },
        {
            title: "Coating",
            desc: "Patterns are coated with refractory material which acts as a barrier between sand and liquid metal. Coated patterns are dried in heating rooms.",
            img: "/images2/68.png"
        },
        {
            title: "Compaction",
            desc: "Patterns are compacted in free-flowing sand using 3-axis vibration. This gives strength to withstand pressure during pouring.",
            img: "/images2/features-5.png"
        },
        {
            title: "Vacuum Pouring",
            desc: "Liquid metal is poured under high vacuum pressure to ensure all gas generated from foam evaporation is extracted.",
            img: "/images2/features-6.png"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="relative h-[300px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images2/4.jpg"
                        alt="Lost Foam Process"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-blue/90"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold font-montserrat mb-4">Lost Foam Manufacturing</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-brand-orange">Process</span>
                    </div>
                </div>
            </div>

            {/* Intro */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6">What is Lost Foam Casting?</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                        Lost Foam Casting is a type of evaporative pattern casting, similar to investment casting but using foam instead of wax.
                        This process combines the <strong>surface finish of investment casting</strong> with the <strong>economical costs of sand casting</strong>.
                        It is ideal for complex parts that would normally require multiple cores.
                    </p>
                </div>
            </section>

            {/* Interactive Process Steps */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-brand-blue mb-12 text-center">The Manufacturing Process</h2>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Step List */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
                            {steps.map((step, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-full text-left px-6 py-4 border-b last:border-0 hover:bg-gray-50 transition-colors flex items-center justify-between ${activeStep === index ? 'bg-brand-blue text-white hover:bg-brand-blue' : 'text-gray-700'}`}
                                >
                                    <span className="font-semibold">{index + 1}. {step.title}</span>
                                    {activeStep === index && <span>→</span>}
                                </button>
                            ))}
                        </div>

                        {/* Step Detail */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center min-h-[400px]">
                            <div className="w-full md:w-1/2 relative h-64 md:h-80 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={steps[activeStep].img}
                                    alt={steps[activeStep].title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brand-blue mb-4">{steps[activeStep].title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {steps[activeStep].desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Differences */}
                        <div>
                            <h3 className="text-2xl font-bold text-brand-blue mb-6 border-l-4 border-brand-orange pl-4">Differences from Sand Casting</h3>
                            <ul className="space-y-4">
                                {[
                                    "No usage of cores.",
                                    "No additives/binders/resins.",
                                    "No risers required.",
                                    "Sand is 100% recycled."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-700 p-4 border rounded hover:shadow-md transition-shadow">
                                        <span className="text-brand-orange font-bold">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Advantages */}
                        <div>
                            <h3 className="text-2xl font-bold text-brand-blue mb-6 border-l-4 border-brand-orange pl-4">Key Advantages</h3>
                            <ul className="space-y-4">
                                {[
                                    "Excellent surface finish.",
                                    "Dimensionally accurate (Near net-shape).",
                                    "No blowholes or pinholes.",
                                    "Environmentally friendly (Green Technology).",
                                    "Substantially reduced machining costs."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-700 p-4 border rounded hover:shadow-md transition-shadow">
                                        <span className="text-brand-orange font-bold">★</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
