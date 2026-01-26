"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { client, urlFor } from "@/sanity/client";
import { GET_PRODUCT_BY_SLUG } from "@/sanity/lib/queries";
import FadeIn from "@/components/animations/FadeIn";

interface ProductDetail {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    category?: string;
}

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (slug) {
                const data = await client.fetch(GET_PRODUCT_BY_SLUG, { slug });
                setProduct(data);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white text-center px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
                <Link href="/products" className="bg-brand-blue text-white px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Breadcrumb */}
            <div className="bg-gray-50 border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wider mb-4">
                        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-brand-orange transition-colors">Products</Link>
                        <span>/</span>
                        <span className="text-brand-orange font-bold truncate max-w-[200px]">{product.title}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
                    {/* Image Section */}
                    <FadeIn direction="right">
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl aspect-square relative">
                            {product.imageUrl ? (
                                <Image
                                    src={urlFor(product.imageUrl).width(1200).height(1200).url()}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No Image Available
                                </div>
                            )}
                        </div>
                    </FadeIn>

                    {/* Info Section */}
                    <FadeIn direction="left" delay={0.2}>
                        <div>
                            {product.category && (
                                <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                                    {product.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-8 font-montserrat">{product.title}</h1>

                            <div className="prose prose-lg text-gray-600 mb-10">
                                <p className="whitespace-pre-line">{product.description}</p>
                            </div>

                            <div className="border-t pt-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to order?</h3>
                                <Link href="/contact-us" className="inline-block bg-brand-blue text-white text-lg font-bold px-8 py-4 rounded-lg hover:bg-brand-orange transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Request a Quote
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
