"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";

interface Article {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    tags: string[];
    isPublished: boolean;
    createdAt: string;
}

export default function ArticleDetail() {
    const params = useParams();
    const slug = params?.slug;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/articles/slug/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setArticle(data);
                }
            } catch (error) {
                console.error("Failed to fetch article:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center px-4">
                <h1 className="text-4xl font-bold text-brand-blue mb-4">Article Not Found</h1>
                <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
                <Link href="/journal" className="px-8 py-3 bg-brand-blue text-white font-bold rounded hover:bg-brand-orange transition-colors">
                    Back to Journal
                </Link>
            </div>
        );
    }

    return (
        <article className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[500px] md:h-[600px] w-full">
                <Image
                    src={article.imageUrl || "/images2/about1.png"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full py-12 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <FadeIn direction="up">
                            <div className="flex gap-2 mb-6">
                                {article.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-montserrat">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-4 text-white/80 font-medium">
                                <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">
                                    {article.author[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{article.author}</p>
                                    <p className="text-sm">{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-4xl py-20 px-4">
                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-2xl text-gray-500 font-medium leading-relaxed mb-10 italic border-l-4 border-brand-orange pl-6">
                        {article.description}
                    </p>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Tags & Share */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Tags:</span>
                        <div className="flex gap-2">
                            {article.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded hover:bg-brand-blue hover:text-white transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                         <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Share:</span>
                         <div className="flex gap-4">
                             {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
                                 <button key={social} className="text-gray-400 hover:text-brand-orange transition-colors font-bold text-sm tracking-wide">
                                     {social}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Author Bio */}
                <div className="mt-20 p-8 md:p-12 bg-brand-light rounded-3xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="w-24 h-24 rounded-2xl bg-brand-blue flex items-center justify-center text-white text-4xl font-bold shrink-0 shadow-lg">
                        {article.author[0]}
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-brand-blue mb-2">About {article.author}</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Expert in Lost Foam Manufacturing and technical engineering at Atlas Foundries. Dedicated to pushing the boundaries of precision casting and sustainable manufacturing practices.
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-16 text-center">
                    <Link href="/journal" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-orange transition-colors">
                        <span>← Back to all articles</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
