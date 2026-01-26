"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "active" : "";
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    {/* Logo */}
                    <Link href="/" className="logo">
                        Atlas Foundries
                    </Link>

                    {/* Navigation */}
                    <nav className="menu">
                        <ul>
                            <li className={isActive("/")}>
                                <Link href="/">Home</Link>
                            </li>
                            <li className={isActive("/about-us")}>
                                <Link href="/about-us">About Us</Link>
                            </li>
                            <li className={isActive("/lost-foam-manufacturing")}>
                                <Link href="/lost-foam-manufacturing">Lost Foam Manufacturing</Link>
                            </li>
                            <li className={isActive("/infrastructure")}>
                                <Link href="/infrastructure">Infrastructure</Link>
                            </li>
                            <li className={isActive("/products")}>
                                <Link href="/products">Products</Link>
                            </li>
                            <li className={isActive("/quality")}>
                                <Link href="/quality">Quality</Link>
                            </li>
                            <li className={isActive("/contact-us")}>
                                <Link href="/contact-us">Contact Us</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
