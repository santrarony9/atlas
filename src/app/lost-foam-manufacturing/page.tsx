"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function LostFoam() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        // Preloader
        const preloader = document.getElementById("preloader");
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 900);
        }

        // Observers
        const observerOptions = { threshold: 0.25 };

        // Process Title Observer
        const processTitle = document.querySelector(".process-title");
        if (processTitle) {
            const titleObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        titleObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            titleObserver.observe(processTitle);
        }

        // Team Section Headers Observer
        const headers = document.querySelectorAll(".team .section-header");
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    headerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -80px 0px" });
        headers.forEach(header => headerObserver.observe(header));

    }, []);

    const steps = [
        "EPS Beads Pre-forming",
        "Forming / Moulding",
        "Assembly",
        "Coating",
        "Compaction",
        "Vacuum"
    ];

    const renderStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="gallery-sec">
                                <div className="image-hover img-layer-slide-left-right" style={{ width: '400px', height: '400px', marginBottom: '10px', objectFit: 'cover' }}>
                                    <img src="/images2/73.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="team-detail">
                                <div className="name">
                                    <h6>EPS Beads Pre-forming</h6>
                                    <span></span>
                                </div>
                                <span style={{ fontSize: "50px", fontWeight: "bold" }}>EPS is the primary raw material that is steam treated in order to make patterns which will be later used to cast the actual product</span>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="gallery-sec">
                                <div className="image-hover img-layer-slide-left-right">
                                    <img src="/images2/4.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="team-detail">
                                <div className="name">
                                    <h6>Forming/Moulding</h6>
                                    <span></span>
                                </div>
                                <span style={{ fontSize: "50px", fontWeight: "bold" }}>Preformed beads are then injected in a custom-made die to produce the patterns by application of steam and pressure. These patterns are an exact replica of the actual product required.</span>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="gallery-sec">
                                <div className="image-hover img-layer-slide-left-right">
                                    <img src="/images2/Assembly_1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="team-detail">
                                <div className="name">
                                    <h6>Assembly</h6>
                                    <span></span>
                                </div>
                                <span style={{ fontSize: "50px", fontWeight: "bold" }}>Patterns are inspected for deformities or imperfections as any error in the pattern will result in a like error in the final product. They are glued to formed cluster and dried to make them stable for next process.</span>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="gallery-sec">
                                <div className="image-hover img-layer-slide-left-right">
                                    <img src="/images2/68.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="team-detail">
                                <div className="name">
                                    <h6>Coating</h6>
                                    <span></span>
                                </div>
                                <span style={{ fontSize: "50px", fontWeight: "bold" }}>Patterns are then coated with refractory which acts as a barrier medium between sand and liquid metal during pouring. Coated patterns are dried in heating rooms..</span>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="gallery-sec">
                                <div className="image-hover img-layer-slide-left-right">
                                    <img src="/images2/features-5.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="team-detail">
                                <div className="name">
                                    <h6>Compaction</h6>
                                    <span></span>
                                </div>
                                <span style={{ fontSize: "50px", fontWeight: "bold" }}>Patterns are compacted in free-flowing sand in a sandbox using a 3-axis vibration on a compaction table. This gives strength to the assembly to withstand pressure during pouring resulting in accurate dimensions of castings and zero defects due to deformities.</span>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="gallery-sec">
                                <div className="image-hover img-layer-slide-left-right">
                                    <img src="/images2/features-6.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="team-detail">
                                <div className="name">
                                    <h6>Vacuum</h6>
                                    <span></span>
                                </div>
                                <span style={{ fontSize: "50px", fontWeight: "bold" }}>This is a critical step in the entire process. Pouring of liquid metal is done under high vacuum pressure to ensure all gas generated during evaporation of foam pattern is extracted.</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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
                                        <h2>Lost Foam Manufacturing</h2>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <a>Lost Foam Manufacturing</a>
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
                    <div className="member-detail">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title">
                                        <h2>
                                            <span>The </span> Process
                                        </h2>
                                        <p>
                                            Lost Foam Casting is a type of evaporative pattern casting.
                                            This method is quite similar to investment casting which
                                            uses wax instead of foam in the pattern making process.
                                            This process takes advantage of the low boiling point of
                                            polymer foams to simplify the investment casting process by
                                            removing the need to melt the wax out of the mold. All
                                            other steps in the casting process are similar to sand
                                            casting. Lost Foam casting process can be said to combine
                                            the quality and surface benefits of investment casting with
                                            the economical production costs of Sand-Casting process. It
                                            is most advantageous for complex castings that would
                                            regularly require cores and are difficult to produce in the
                                            traditional green sand or no bake process.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <section className="process-steps">
                                <p className="process-title" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1px', color: '#222', marginBottom: '30px', paddingLeft: '18px' }}>
                                    The Process has following steps:
                                </p>

                                <ul className="steps">
                                    {steps.map((step, index) => (
                                        <li
                                            key={index}
                                            className={activeStep === index ? "active" : ""}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <div id="demo">
                                <div className="row">
                                    <div>
                                        <div id="team-detail">
                                            {renderStepContent(activeStep)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section id="team" className="team" style={{ padding: '80px 0', overflow: 'hidden' }}>
                            <div className="container">
                                <div className="section-header">
                                    <h2>Differences with Sand casting process</h2>
                                    <p align="left" style={{ fontSize: '20px' }}>
                                        1. No usage of cores.<br />
                                        2. No additives, binders, resins etc for treating sand.<br />
                                        3. No risers.<br />
                                        4. Sand is 100% recycled.<br />
                                        <br />
                                    </p>
                                </div>
                            </div>
                            <div className="container">
                                <div className="section-header">
                                    <h2>Advantages of Lost Foam Casting process</h2>
                                    <p align="left" style={{ fontSize: '20px' }}>
                                        1. Outstanding results with complex/engineered castings involcing multiple cores.<br />
                                        2. Excellent surface finish.<br />
                                        3. Dimensionally accurate. Near net-shape castings achievable.<br />
                                        4. Defects of blowholes, pinholes, flash etc eliminated completely.<br />
                                        5. Requires no draft in removal of castings.<br />
                                        6. Flexible process due to inherent nature of foam which is easier to handle.<br />
                                        7. Economical. As the complexity increases, overall costs of a casting reduces as compared to sand casting.<br />
                                        8. Substantially reduced machining saving further costs in the production lifecycle of a casting.<br />
                                        9. Combines the benefits of investment casting and sand casting process beautifully.<br />
                                        10. Environmentally friendly by reducing overall sand requirement and carbon generation. Less polluting than a conventional sand foundry.<br />
                                    </p>
                                </div>
                            </div>
                        </section>
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
            <Script src="/js/jquery.mmenu.min.all.js" strategy="lazyOnload" />
            <Script src="/js/owl.carousel.js" strategy="lazyOnload" />
            <Script src="/js/custom.js" strategy="lazyOnload" />
        </>
    );
}
