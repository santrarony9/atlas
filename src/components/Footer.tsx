import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Download, MapPin, Phone, Mail, Home } from "lucide-react";
import dbConnect from "@/lib/db";
import SiteContent from "@/models/SiteContent";
import { ISiteContent } from "@/models/SiteContent";

async function getSiteContent() {
    await dbConnect();
    const content = await SiteContent.findOne().lean();
    return content as unknown as ISiteContent | null;
}

export default async function Footer() {
    const content = await getSiteContent();

    return (
        <footer className="bg-brand-blue text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Column 1: Company Info */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-brand-orange rounded flex items-center justify-center text-white font-bold text-2xl">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold uppercase tracking-tight leading-none text-white">Atlas</span>
                                <span className="text-xs text-brand-orange font-semibold uppercase tracking-widest leading-none">Foundries</span>
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            A leading manufacturer specializing in high-quality castings and precision engineering for global markets.
                        </p>
                        <div className="flex gap-4 mb-6">
                            {content?.socialLinks?.facebook && (
                                <a href={content.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors group">
                                    <Facebook className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {content?.socialLinks?.twitter && (
                                <a href={content.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors group">
                                    <Twitter className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {content?.socialLinks?.linkedin && (
                                <a href={content.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors group">
                                    <Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {content?.socialLinks?.instagram && (
                                <a href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors group">
                                    <Instagram className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {content?.socialLinks?.youtube && (
                                <a href={content.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors group">
                                    <Youtube className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                        </div>

                        {content?.companyProfileUrl && (
                            <a
                                href={content.companyProfileUrl}
                                target="_blank"
                                download
                                className="inline-flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-brand-orange transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Profile (PDF)
                            </a>
                        )}
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Home</Link></li>
                            <li><Link href="/about-us" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> About Us</Link></li>
                            <li><Link href="/infrastructure" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Infrastructure</Link></li>
                            <li><Link href="/quality" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Quality Control</Link></li>
                            <li><Link href="/contact-us" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Products */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Our Capabilities</h4>
                        <ul className="space-y-3">
                            <li><Link href="/products" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Railway Castings</Link></li>
                            <li><Link href="/products" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Marine Components</Link></li>
                            <li><Link href="/products" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Industrial Valves</Link></li>
                            <li><Link href="/lost-foam-manufacturing" className="text-slate-300 hover:text-brand-orange transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Lost Foam Process</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 border-b-2 border-brand-orange inline-block pb-2">Contact Us</h4>
                        <ul className="space-y-4 text-slate-300 text-sm">
                            <li className="flex gap-3">
                                <Home className="w-5 h-5 text-brand-orange shrink-0" />
                                <span>225/2 CIT Road, Scheme VII M,<br />Kolkata - 700054, India</span>
                            </li>
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                                <span>Works: Howrah - 711410</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                                <a href="tel:+919830735480" className="hover:text-white transition-colors">+91 98307 35480</a>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                                <a href="mailto:enquiry@atlasfoundries.com" className="hover:text-white transition-colors">enquiry@atlasfoundries.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Atlas Foundries. All Rights Reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Designed by <a href="https://dreamlineproduction.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Dreamline Production</a>
                        <span className="mx-2">|</span>
                        <Link href="/login" className="hover:text-white transition-colors">Admin</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
