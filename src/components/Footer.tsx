import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-blue text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Company Info */}
                    <div>
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
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <i className="icon-facebook"></i>
                            </a>
                            <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <i className="icon-twitter"></i>
                            </a>
                            <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <i className="icon-linkedin"></i>
                            </a>
                        </div>
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
                                <i className="icon-home text-brand-orange mt-1"></i>
                                <span>225/2 CIT Road, Scheme VII M,<br />Kolkata - 700054, India</span>
                            </li>
                            <li className="flex gap-3">
                                <i className="icon-map-marker text-brand-orange mt-1"></i>
                                <span>Works: Howrah - 711410</span>
                            </li>
                            <li className="flex gap-3">
                                <i className="icon-phone4 text-brand-orange mt-1"></i>
                                <a href="tel:+919830735480" className="hover:text-white transition-colors">+91 98307 35480</a>
                            </li>
                            <li className="flex gap-3">
                                <i className="icon-mail text-brand-orange mt-1"></i>
                                <a href="mailto:enquiry@atlasfoundries.com" className="hover:text-white transition-colors">enquiry@atlasfoundries.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Atlas Foundries. All Rights Reserved.</p>
                    <p className="mt-2 md:mt-0">Designed by Dreamline Production</p>
                </div>
            </div>
        </footer>
    );
}
<div className="container">
    <div className="row">
        <div className="col-lg-4 col-md-6">
            <div className="footer-info">
                <h3>Atlas Foundries</h3>
                <p>
                    Office – 225/2 CIT Road, Scheme VII M, Kolkata - 700054
                    <br />
                    Works – JL No.11, Perore Road, Gram Basantapur, MouzaBhetkepara,
                    Munsirhat, Howrah - 711410.
                    <br />
                    <br />
                    <strong>Phone:</strong> +91 98307 35480
                    <br />
                    <strong>Email:</strong> enquiry@atlasfoundries.com
                    <br />
                </p>
            </div>
        </div>
        {/* End footer info column */}

        <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about-us">About Us</Link>
                </li>
                <li>
                    <Link href="/products">Products</Link>
                </li>
                <li>
                    <Link href="/quality">Quality</Link>
                </li>
                <li>
                    <Link href="/infrastructure">Infrastructure</Link>
                </li>
                <li>
                    <Link href="/lost-foam-manufacturing">Lost Foam Manufacturing</Link>
                </li>
                <li>
                    <Link href="/contact-us">Contact</Link>
                </li>
            </ul>
        </div>
        {/* End footer links column */}
    </div>
</div>
                </div >

    <div className="footer-legal text-center position-relative">
        <div className="container">
            <div className="copyright">
                <p></p>
            </div>
            <div className="credits"></div>
        </div>
    </div>
            </footer >
    <div className="footer-bottom">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <span className="copyrights">
                        © Copyright Atlas Foundries. All Rights Reserved Designed by
                        Dreamline Production
                    </span>
                </div>
            </div>
        </div>

        <a className="back-to-top" href="#."></a>
    </div>
        </>
    );
}
