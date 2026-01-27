import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import SiteContent from "@/models/SiteContent";
import { ISiteContent } from "@/models/SiteContent";

async function getSiteContent() {
    await dbConnect();
    const content = await SiteContent.findOne().lean();
    return content as unknown as ISiteContent | null;
}

function getYoutubeEmbedUrl(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default async function Infrastructure() {
    const content = await getSiteContent();
    const videoEmbedUrl = content?.infrastructure?.videoUrl ? getYoutubeEmbedUrl(content.infrastructure.videoUrl) : null;

    // Fallback facilities if needed, or keep them static as they are quite specific
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

                    {/* Manufacturing Process Video */}
                    {videoEmbedUrl && (
                        <div className="max-w-4xl mx-auto mb-20">
                            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Manufacturing Process</h2>
                            <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    src={videoEmbedUrl}
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {/* Company Images Gallery */}
                    {content?.infrastructure?.companyImages && content.infrastructure.companyImages.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Our Facility</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {content.infrastructure.companyImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md">
                                        <Image src={img} alt={`Facility ${idx + 1}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto mb-20">
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

                    {/* Certificates Gallery */}
                    {content?.infrastructure?.certificates && content.infrastructure.certificates.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Certifications & Awards</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {content.infrastructure.certificates.map((img, idx) => (
                                    <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300 bg-white p-2">
                                        <div className="relative w-full h-full rounded overflow-hidden">
                                            <Image src={img} alt={`Certificate ${idx + 1}`} fill className="object-contain" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
