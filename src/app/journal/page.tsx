"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import FadeInItem from "@/components/animations/FadeInItem";

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

export default function JournalPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch("/api/articles");
                if (res.ok) {
                    const data = await res.json();
                    // Filter for published articles
                    setArticles(data.filter((a: Article) => a.isPublished));
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="relative h-[300px] flex items-center justify-center bg-brand-blue overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images2/about1.png"
                        alt="Journal Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <FadeIn direction="down">
                        <h1 className="text-5xl font-bold font-montserrat mb-4">Atlas Journal</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Insights, news, and technical articles from the world of Lost Foam casting.</p>
                    </FadeIn>
                </div>
            </div>

            {/* Articles List */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
                        </div>
                    ) : articles.length > 0 ? (
                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {articles.map((article) => (
                                <FadeInItem key={article._id}>
                                    <Link href={`/journal/${article.slug}`} className="group block h-full">
                                        <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100">
                                            <div className="relative h-64 overflow-hidden">
                                                <Image
                                                    src={article.imageUrl || "/images2/placeholder.png"}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 left-4 flex gap-2">
                                                    {article.tags.slice(0, 2).map((tag) => (
                                                        <span key={tag} className="px-3 py-1 bg-brand-orange/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-8 flex flex-col flex-1">
                                                <div className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                                                    <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                    <span>•</span>
                                                    <span>{article.author}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-brand-blue mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-3 mb-6 flex-1">
                                                    {article.description}
                                                </p>
                                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-brand-blue font-bold group-hover:text-brand-orange transition-colors">
                                                    <span>Read Article</span>
                                                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </FadeInItem>
                            ))}
                        </StaggerContainer>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-400">No articles published yet.</h3>
                            <p className="text-gray-500 mt-2">Check back soon for latest insights!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6">Want to stay updated?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">Subscribe to our newsletter to receive the latest industry news and technical breakthroughs directly in your inbox.</p>
                    <div className="flex max-w-md mx-auto gap-2">
                        <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20" />
                        <button className="px-6 py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-orange transition-colors">Subscribe</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
