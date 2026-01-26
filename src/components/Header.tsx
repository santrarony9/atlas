"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "text-brand-orange" : "text-brand-dark hover:text-brand-blue";
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-brand-orange rounded flex items-center justify-center text-white font-bold text-2xl group-hover:bg-brand-blue transition-colors">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-brand-blue uppercase tracking-tight leading-none group-hover:text-brand-orange transition-colors">Atlas</span>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest leading-none">Foundries</span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex gap-8 font-semibold uppercase text-sm tracking-wide">
                            <li><Link href="/" className={`${isActive("/")} transition-colors`}>Home</Link></li>
                            <li><Link href="/about-us" className={`${isActive("/about-us")} transition-colors`}>About Us</Link></li>
                            <li><Link href="/lost-foam-manufacturing" className={`${isActive("/lost-foam-manufacturing")} transition-colors`}>Lost Foam</Link></li>
                            <li><Link href="/infrastructure" className={`${isActive("/infrastructure")} transition-colors`}>Infrastructure</Link></li>
                            <li><Link href="/products" className={`${isActive("/products")} transition-colors`}>Products</Link></li>
                            <li><Link href="/quality" className={`${isActive("/quality")} transition-colors`}>Quality</Link></li>
                            <li><Link href="/contact-us" className={`px-5 py-2.5 bg-brand-blue text-white rounded hover:bg-brand-orange transition-colors`}>Contact Us</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button (Simple Placeholder) */}
                    <button className="lg:hidden text-brand-blue">
                        <i className="icon-menu text-2xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
}
