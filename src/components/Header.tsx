"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const isActive = (path: string) => {
        return pathname === path ? "text-brand-orange" : "text-brand-dark hover:text-brand-blue";
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about-us", label: "About Us" },
        { href: "/lost-foam-manufacturing", label: "Lost Foam" },
        { href: "/infrastructure", label: "Infrastructure" },
        { href: "/products", label: "Products" },
        { href: "/quality", label: "Quality" },
        { href: "/contact-us", label: "Contact Us", isButton: true },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group z-50 relative">
                        <div className="w-10 h-10 bg-brand-orange rounded flex items-center justify-center text-white font-bold text-2xl group-hover:bg-brand-blue transition-colors">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-brand-blue uppercase tracking-tight leading-none group-hover:text-brand-orange transition-colors">Atlas</span>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest leading-none">Foundries</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex gap-8 font-semibold uppercase text-sm tracking-wide items-center">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={link.isButton
                                            ? "px-5 py-2.5 bg-brand-blue text-white rounded hover:bg-brand-orange transition-colors"
                                            : `${isActive(link.href)} transition-colors`
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-brand-blue z-50 relative p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-white z-40 lg:hidden pt-24 px-6 flex flex-col"
                    >
                        <nav>
                            <ul className="flex flex-col gap-6 font-bold text-xl uppercase tracking-wider text-center">
                                {navLinks.map((link, idx) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={link.isButton
                                                ? "inline-block px-8 py-3 bg-brand-blue text-white rounded hover:bg-brand-orange transition-colors mt-4"
                                                : `block py-2 ${isActive(link.href)}`
                                            }
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        <div className="mt-auto mb-10 text-center">
                            <p className="text-slate-400 text-sm font-semibold">
                                Atlas Foundries <br />
                                Expert Casting Solutions
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
