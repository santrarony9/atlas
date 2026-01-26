"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import FadeInItem from "@/components/animations/FadeInItem";
import StaggerContainer from "@/components/animations/StaggerContainer";
import ScaleOnHover from "@/components/animations/ScaleOnHover";
import { client } from "@/sanity/client";
import { GET_ALL_PRODUCTS } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/client";

interface Product {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    category?: string;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await client.fetch(GET_ALL_PRODUCTS);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

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
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-orange"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl text-gray-500">No products found. Add some in the CMS!</h3>
                        </div>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <FadeInItem key={product._id}>
                                    <ScaleOnHover className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                                        <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
                                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                                {product.imageUrl ? (
                                                    <Image
                                                        src={urlFor(product.imageUrl).width(600).height(600).url()}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white font-semibold flex items-center gap-2">
                                                        View Details <span>→</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 text-center flex-1">
                                                {product.category && (
                                                    <span className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2 block">
                                                        {product.category}
                                                    </span>
                                                )}
                                                <h3 className="text-xl font-bold text-brand-blue group-hover:text-brand-orange transition-colors">
                                                    {product.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    </ScaleOnHover>
                                </FadeInItem>
                            ))}
                        </StaggerContainer>
                    )}
                </div>
            </section>
        </div>
    );
}
