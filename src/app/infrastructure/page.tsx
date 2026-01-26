"use client";

import Image from "next/image";
import Link from "next/link";

export default function Infrastructure() {
    const facilities = [
        "A covered shed area of 12,000 sqft and a land bank of almost 100,000 sqft for future use.",
        "Induction Furnace Dual Track 500 kgs.",
        "Boiler for steam generation.",
        "Pre-forming Machine.",
        "2 no.s Hydraulic Moulding Machine for pattern making.",
        "Gluing and assembly station for mould handling with hot-wire cutting machine.",
        "Coating Blender with tank of capacity 1800 ltrs.",
        "Drying rooms for moulds.",
        "Compressor 93 CFM capacity.",
        "Compaction Table for Sand box preparations.",
        "Vacuum system.",
        "17 no.s Sandboxes to accommodate casting of size upto 650 mm cube.",
        "Sand plant including sand conveyor and bucket elevator.",
        "Sand shakeout machine for metal stripping.",
        "Sand cooler with 30 Hp blower for dust separation.",
        "Fully mechanised transfer track system for sandbox movement.",
        "Two EOT cranes.",
        "Cooling Tower (2 no.s).",
        "Power infrastructure with VCB, transformer, LT panel for connected load of 630 Kva.",
        "DG for electrical support.",
        "3 no.s weighing machines.",
        "RO water treatment plant.",
        "Shot Blasting machine.",
        "Ladle pre-heater and ladles (3 nos).",
        "Fettling unit with angle grinders, bench grinders, etc.",
        "A fully equipped lab to ensure quality."
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="relative h-[300px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images2/about1.png"
                        alt="Infrastructure"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-blue/90"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold font-montserrat mb-4">Infrastructure</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-brand-orange">Infrastructure</span>
                    </div>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">State-of-the-Art Facilities</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {facilities.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 border rounded-lg hover:border-brand-orange hover:shadow-lg transition-all bg-white">
                                    <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-orange shrink-0">
                                        ✓
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
