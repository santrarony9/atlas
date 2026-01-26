"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FadeInItem from "@/components/animations/FadeInItem";
import StaggerContainer from "@/components/animations/StaggerContainer";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

export default function Products() {
    const [modalImage, setModalImage] = useState<string | null>(null);

    const products = [
        { src: "/images2/Axle_Box_Hosuing.jpg", title: "Axle Box Housing" },
        { src: "/images2/Cover.jpg", title: "Cover" },
        { src: "/images2/DE_Frame.jpg", title: "DE Frame" },
        { src: "/images2/Front_Axle_Bracket.jpg", title: "Front Axle Bracket" },
        { src: "/images2/73.png", title: "Industrial Valve" },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="relative h-[300px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images2/3.jpg"
                        alt="Atlas Products"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-blue/90"></div>
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold font-montserrat mb-4">Our Products</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-brand-orange">Products</span>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6">Engineered for Excellence</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        We specialize in replacing complex <strong>Investment Casting</strong> parts with cost-effective <strong>Lost Foam</strong> solutions without compromising quality.
                        Our products serve critical industries including Railways, Automobiles, and Heavy Engineering.
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12 bg-brand-light">
                <div className="container mx-auto px-4">
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <FadeInItem key={index}>
                                <ScaleOnHover
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                                // onClick is handled by the div inside ScaleOnHover if ScaleOnHover passes props, but ScaleOnHover is a div wrapper.
                                // We need to move the onClick to the ScaleOnHover or the div inside. 
                                // Since ScaleOnHover spreads logic, let's wrap the div properly.
                                >
                                    <div onClick={() => setModalImage(product.src)}>
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={product.src}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white font-semibold">View Full Image</span>
                                            </div>
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-brand-blue group-hover:text-brand-orange transition-colors">{product.title}</h3>
                                        </div>
                                    </div>
                                </ScaleOnHover>
                            </FadeInItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Custom Modal */}
            {modalImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity"
                    onClick={() => setModalImage(null)}
                >
                    <button className="absolute top-6 right-6 text-white text-4xl hover:text-brand-orange">&times;</button>
                    <div className="relative max-w-4xl w-full h-[80vh]">
                        <Image
                            src={modalImage}
                            alt="Full View"
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
