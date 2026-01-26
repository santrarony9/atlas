import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer id="footer" className="footer">
                <div className="footer-content position-relative">
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
                </div>

                <div className="footer-legal text-center position-relative">
                    <div className="container">
                        <div className="copyright">
                            <p></p>
                        </div>
                        <div className="credits"></div>
                    </div>
                </div>
            </footer>
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
