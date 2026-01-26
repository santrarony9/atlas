"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function Quality() {
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
        <>
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
                                        <h2>Quality</h2>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <a>Quality</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Banner */}

                {/* Start Content */}
                <div className="content">
                    <div className="news-posts">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* Quality Policy */}
                                    <div className="news-sec">
                                        <img src="/images2/qp.png" alt="Quality Policy" />
                                        <div className="detail">
                                            <span></span>
                                            <h3>Quality Policy</h3>
                                            <p>
                                                To deliver superior quality products at a reasonable price
                                                and in time-bound manner. To achieve customer
                                                satisfaction through meeting quality requirements of
                                                product and process. To elicit customer appreciation
                                                through continuous improvement in products and processes.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quality Assurance */}
                                    <div className="news-sec">
                                        <img src="/images2/qa.png" alt="Quality Assurance" />
                                        <div className="detail">
                                            <span></span>
                                            <h3>Quality Assurance</h3>
                                            <p>
                                                We follow a continuous improvement methodology with
                                                regards to quality. Our management team focuses on
                                                training & updating our human capital & sensitizing them
                                                to the importance of delivering the best product first
                                                time and every time. Our team of highly skilled
                                                supervisors have implemented control systems at every
                                                stage to ensure we are able to achieve the desired
                                                performance levels to ensure complete customer
                                                satisfaction
                                            </p>
                                        </div>
                                    </div>

                                    {/* ISO Certification */}
                                    <div className="news-sec">
                                        <img
                                            src="/images2/Certificate.jpg"
                                            alt="ISO Certificate"
                                        />
                                        <div className="detail">
                                            <span></span>
                                            <h3>ISO Certification</h3>
                                            <p>
                                                <a
                                                    href="/images2/Certificate_ISO_9001_QMS.pdf"
                                                    target="_blank"
                                                    style={{
                                                        color: "#f5b000",
                                                        fontWeight: "bold",
                                                        textDecoration: "underline",
                                                    }}
                                                >
                                                    View Certificate
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Inspections Section */}
                                    <section className="inspections-section">
                                        <div className="container">
                                            <div className="section-header">
                                                <h2>Inspections</h2>
                                                <p className="subtitle">
                                                    Inspections performed at every step to ensure product
                                                    meets all requisite standards.
                                                </p>
                                            </div>

                                            <div className="inspection-grid">
                                                <div className="inspection-card">
                                                    <span className="icon-circle">🏭</span>
                                                    <h5>Raw Material</h5>
                                                    <p>
                                                        Visual Inspection, Test Reports, In-House Testing to
                                                        ensure required compositions
                                                    </p>
                                                </div>

                                                <div className="inspection-card">
                                                    <span className="icon-circle">📈</span>
                                                    <h5>Molding</h5>
                                                    <p>
                                                        Visual Inspection, Density Tester to ensure error
                                                        free molds/patterns
                                                    </p>
                                                </div>

                                                <div className="inspection-card">
                                                    <span className="icon-circle">🛠️</span>
                                                    <h5>Assembly/Compaction</h5>
                                                    <p>
                                                        Visual Inspection, Strict Dimensional Control to
                                                        ensure accurate castings in pouring without shifts,
                                                        breaks, etc.
                                                    </p>
                                                </div>

                                                <div className="inspection-card">
                                                    <span className="icon-circle">🔥</span>
                                                    <h5>Melting</h5>
                                                    <p>
                                                        Proportion checks, temperature control, composition
                                                        analysis, time control to ensure proper mechanical
                                                        and chemical compositions
                                                    </p>
                                                </div>

                                                <div className="inspection-card">
                                                    <span className="icon-circle">🏗️</span>
                                                    <h5>Shakeout</h5>
                                                    <p>
                                                        Visual Inspection, Dimensional Checking, Surface
                                                        Check to ensure stage 1 compliance of quality
                                                        parameters
                                                    </p>
                                                </div>

                                                <div className="inspection-card">
                                                    <span className="icon-circle">✅</span>
                                                    <h5>Fettling / Finishing</h5>
                                                    <p>
                                                        Visual Inspection, Weight Check, Paint, etc. to
                                                        ensure error free dispatch
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Testing Facilities */}
                                    <section
                                        id="team"
                                        className="team"
                                        style={{ padding: "80px 0", overflow: "hidden" }}
                                    >
                                        <div className="container">
                                            <div className="section-header">
                                                <h2>Testing Facilities</h2>
                                                <p style={{ fontSize: "20px", textAlign: "left" }}>
                                                    (a) 29 channel Optical emission Spectrometer
                                                    <br />
                                                    (b) Microscope
                                                    <br />
                                                    (c) Portable Hardness Tester
                                                    <br />
                                                    (d) Grinding Machine, Surface cutter and polishing
                                                    machine for sample preparation
                                                    <br />
                                                    (e) C –Si Analyser, portable pyrometer for melting
                                                    <br />
                                                    (f) Sand Sieve for testing
                                                    <br />
                                                    (g) Hydrotesting Machine
                                                    <br />
                                                    (h) Others - Weighing scales, inside outside gauge,
                                                    calipers, Ultrasonic Thickness measurement gauge,
                                                    Tachometer, Vacuum Gauge, Baume meter, etc for various
                                                    measurements
                                                    <br />
                                                    <br />
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Content */}

                <Footer />
                <a href="#0" className="cd-top"></a>
            </div>

            {/* Scripts */}
            <Script src="/js/jquery.js" strategy="beforeInteractive" />
            <Script src="/js/jquery.themepunch.revolution.min.js" strategy="lazyOnload" />
            <Script src="/js/jquery.themepunch.tools.min.js" strategy="lazyOnload" />
            <Script src="/js/classie.js" strategy="lazyOnload" />
            <Script src="/js/jquery-ui-1.10.3.custom.js" strategy="lazyOnload" />
            <Script src="/js/tabs.js" strategy="lazyOnload" />
            <Script src="/js/owl.carousel.js" strategy="lazyOnload" />
            <Script src="/js/jquery.mmenu.min.all.js" strategy="lazyOnload" />
            <Script src="/js/custom.js" strategy="lazyOnload" />
        </>
    );
}
