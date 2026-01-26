"use client";

import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function ContactUs() {
    useEffect(() => {
        // Preloader
        const preloader = document.getElementById("preloader");
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 900);
        }
    }, []);

    return (
        <div className="contact-page">
            <div id="wrap">
                {/* PRELOADER */}
                <div id="preloader">
                    <div className="loader-wrap">
                        <div className="loader-text">
                            <span className="atlas">ATLAS</span>
                            <span className="foundries">FOUNDRIES</span>
                        </div>
                        <div className="loader-bar">
                            <span></span>
                        </div>
                    </div>
                </div>

                <TopBar />
                <Header />

                {/* Start Banner */}
                <div className="sub-banner">
                    <div className="detail">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="paging">
                                        <h2>Contact Us</h2>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <a>Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Banner */}

                {/* Start Atlas Split Section */}
                <section className="atlas-split">
                    <div className="atlas-left">
                        <h2 style={{ color: "#fff" }}>ATLAS FOUNDRIES</h2>

                        <p>
                            <strong>Office</strong> – 225/2 CIT Road, Scheme VII M,
                            <br />
                            Kolkata – 700054
                        </p>

                        <p>
                            <strong>Works</strong> – JL No.11, Perore Road,
                            <br />
                            Gram Basantapur, MouzaBhetkepara,
                            <br />
                            Munsirhat, Howrah – 711410
                        </p>

                        <p>
                            <strong>Phone:</strong> 033 23357376
                        </p>

                        <p>
                            <strong>Email:</strong> atlascatings@gmail.com
                            <br />
                            <strong>Email:</strong> enquiry@atlasfoundries.com
                        </p>
                    </div>

                    <div className="atlas-right">
                        <img src="/images2/Contact.jpg" alt="Atlas Foundries Team" />
                    </div>
                </section>
                {/* End Atlas Split Section */}

                {/* Footer Bottom (No Main Footer on Contact Page) */}
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

                <a href="#0" className="cd-top"></a>
            </div>

            {/* Scripts */}
            <Script src="/js/jquery.js" strategy="beforeInteractive" />
            <Script src="/js/jquery.themepunch.revolution.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.themepunch.tools.min.js" strategy="lazyOnload" />
            <Script src="/js/classie.js" strategy="lazyOnload" />
            <Script src="/js/jquery-ui-1.10.3.custom.js" strategy="lazyOnload" />
            <Script src="/js/tabs.js" strategy="lazyOnload" />
            <Script src="/js/jquery.mmenu.min.all.js" strategy="lazyOnload" />
            <Script src="/js/owl.carousel.js" strategy="lazyOnload" />
            <Script src="/js/custom.js" strategy="lazyOnload" />
        </div>
    );
}
