'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Calendar, Shield, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

interface SubscriptionData {
    domainName: string;
    domainRenewalDate: string;
    hostName: string;
    hostRenewalDate: string;
}

export default function SubscriptionPage() {
    const [data, setData] = useState<SubscriptionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(content => {
                if (content && content.subscription) {
                    setData(content.subscription);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Digital Asset Status</h1>
                <p className="text-slate-400">Manage and monitor your domain, hosting, and technical compliance.</p>
            </header>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                    title="Domain Name" 
                    value={data?.domainName || 'N/A'} 
                    icon={Globe} 
                    trend={{ value: 'Active', isPositive: true }}
                />
                <StatCard 
                    title="Host Name" 
                    value={data?.hostName || 'N/A'} 
                    icon={Server} 
                    trend={{ value: 'Secured', isPositive: true }}
                />
                <StatCard 
                    title="Domain Renewal" 
                    value={data?.domainRenewalDate || 'N/A'} 
                    icon={Calendar} 
                />
                <StatCard 
                    title="Host Renewal" 
                    value={data?.hostRenewalDate || 'N/A'} 
                    icon={Calendar} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
                {/* Dreamline Production Summary */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-brand-blue/20 rounded-2xl text-brand-blue">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Dreamline Production Summary</h2>
                        </div>
                        
                        <div className="space-y-4 text-slate-300 leading-relaxed">
                            <p>
                                This website has been <strong>fully designed and customised by Dreamline Production</strong>. We have implemented a state-of-the-art tech stack using Next.js 14 and MongoDB to ensure lightning-fast performance and seamless content management for Atlas Foundries.
                            </p>
                            <p>
                                Our design philosophy centers around premium aesthetics—integrating smooth animations, modern typography, and a "glassmorphism" UI that reflects the industrial excellence of your manufacturing processes.
                            </p>
                            <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-4 mt-6">
                                <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    Scope of Work Completed:
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <li className="flex items-center gap-2 text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                        Custom Admin Dashboard (CMS)
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                        SEO-Optimized Architecture
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                        Responsive High-End Interface
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                        Integrated Product Catalog
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </motion.div>

                {/* Legal Disclaimer - Indian Law */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6 text-brand-orange">
                            <Shield className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Legal Compliance</h2>
                        </div>
                        
                        <div className="space-y-6 text-[13px] text-slate-400 leading-relaxed font-medium">
                            <p>
                                This platform is developed and maintained in strict compliance with the 
                                <span className="text-white"> Information Technology Act, 2000 </span> 
                                and the <span className="text-white"> IT (Intermediaries Guidelines) Rules, 2011 </span> 
                                as per Indian Law.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-slate-200 font-bold mb-1 underline">Intermediary Liability</h4>
                                    <p>Dreamline Production acts as a technical intermediary. Under Section 79 of the IT Act, we are not liable for user-generated content provided we exercise due diligence.</p>
                                </div>
                                <div>
                                    <h4 className="text-slate-200 font-bold mb-1 underline">Data Privacy</h4>
                                    <p>Compliant with Reasonable Security Practices (RSPP). We ensure that all corporate and sensitive personal data is protected via industry-standard encryption.</p>
                                </div>
                                <div>
                                    <h4 className="text-slate-200 font-bold mb-1 underline">Jurisdiction</h4>
                                    <p>These terms and conditions are governed by Indian laws. Any disputes arising shall be subject to the exclusive jurisdiction of the Indian courts.</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 mt-4 italic">
                                Developed for Atlas Foundries by Dreamline Production.
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
