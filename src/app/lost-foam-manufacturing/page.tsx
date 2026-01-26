"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import FadeInItem from "@/components/animations/FadeInItem";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

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
            <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images2/4.jpg"
                        alt="Lost Foam Process"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 to-brand-blue/60"></div>
                </div>
                <div className="relative z-10 text-center text-white max-w-4xl px-4">
                    <FadeIn direction="down" delay={0.1}>
                        <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6">Lost Foam Manufacturing</h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <div className="flex justify-center gap-2 text-sm uppercase tracking-widest text-brand-orange font-bold">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <span>Process</span>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Intro */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-brand-blue mb-6">What is Lost Foam Casting?</h2>
                        <p className="text-gray-600 leading-relaxed text-xl mb-8">
                            Lost Foam Casting is a type of evaporative pattern casting, similar to investment casting but using foam instead of wax.
                            This process combines the <strong>surface finish of investment casting</strong> with the <strong>economical costs of sand casting</strong>.
                            It is ideal for complex parts that would normally require multiple cores.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Interactive Process Steps */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-brand-blue mb-16 text-center">The Manufacturing Process</h2>
                    </FadeIn>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Step List */}
                        <FadeIn direction="right" className="lg:col-span-1 bg-white rounded-xl shadow-lg run-flow overflow-hidden">
                            {steps.map((step, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-full text-left px-6 py-5 border-b last:border-0 hover:bg-gray-50 transition-all duration-300 flex items-center justify-between group ${activeStep === index ? 'bg-brand-blue text-white hover:bg-brand-blue' : 'text-gray-600'}`}
                                >
                                    <span className={`font-bold text-lg ${activeStep === index ? 'text-brand-orange' : 'text-gray-400 group-hover:text-brand-blue'} mr-4`}>0{index + 1}</span>
                                    <span className="font-semibold flex-1">{step.title}</span>
                                    {activeStep === index && <motion.span layoutId="active-arrow" className="text-brand-orange">➜</motion.span>}
                                </button>
                            ))}
                        </FadeIn>

                        {/* Step Detail */}
                        <FadeIn direction="left" className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-2xl p-8 min-h-[500px] flex flex-col relative overflow-hidden">
                                <key key={activeStep}> {/* Forces re-render for animation */}
                                    <FadeIn delay={0.1} className="flex flex-col md:flex-row gap-8 items-center h-full">
                                        <div className="w-full md:w-1/2 relative h-64 md:h-80 rounded-lg overflow-hidden shrink-0 shadow-inner">
                                            <Image
                                                src={steps[activeStep].img}
                                                alt={steps[activeStep].title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <div className="text-9xl font-bold text-gray-100 absolute top-4 right-4 -z-0 select-none">0{activeStep + 1}</div>
                                            <h3 className="text-3xl font-bold text-brand-blue mb-6 relative z-10">{steps[activeStep].title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                                                {steps[activeStep].desc}
                                            </p>
                                        </div>
                                    </FadeIn>
                                </key>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Differences */}
                        <div>
                            <FadeIn direction="right">
                                <h3 className="text-2xl font-bold text-brand-blue mb-8 border-l-4 border-gray-300 pl-4">Differences from Sand Casting</h3>
                            </FadeIn>
                            <StaggerContainer className="space-y-4">
                                {[
                                    "No usage of cores.",
                                    "No additives/binders/resins.",
                                    "No risers required.",
                                    "Sand is 100% recycled."
                                ].map((item, i) => (
                                    <FadeInItem key={i}>
                                        <ScaleOnHover className="flex gap-4 text-gray-700 p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold shrink-0">VS</div>
                                            <span className="font-medium">{item}</span>
                                        </ScaleOnHover>
                                    </FadeInItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        {/* Advantages */}
                        <div>
                            <FadeIn direction="left">
                                <h3 className="text-2xl font-bold text-brand-blue mb-8 border-l-4 border-brand-orange pl-4">Key Advantages</h3>
                            </FadeIn>
                            <StaggerContainer className="space-y-4">
                                {[
                                    "Excellent surface finish.",
                                    "Dimensionally accurate (Near net-shape).",
                                    "No blowholes or pinholes.",
                                    "Environmentally friendly (Green Technology).",
                                    "Substantially reduced machining costs."
                                ].map((item, i) => (
                                    <FadeInItem key={i}>
                                        <ScaleOnHover className="flex gap-4 text-gray-700 p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-xl shadow-sm hover:shadow-md transition-shadow items-center">
                                            <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold shrink-0">✓</div>
                                            <span className="font-medium text-brand-blue">{item}</span>
                                        </ScaleOnHover>
                                    </FadeInItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
