"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function Infrastructure() {
    useEffect(() => {
        // Preloader
        const preloader = document.getElementById("preloader");
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 900);
        }

        // Observers
        const observerOptions = { threshold: 0.2 };

        // Infrastructure List Observer
        const items = document.querySelectorAll(".research-detail li");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Add staggered delay class or handle in CSS? Original script uses setTimeout
                    // Since I can't easily reproduce 'i' from entries (which are unordered subset),
                    // I will just add 'show' immediately or rely on CSS transition delay if possible to be simpler.
                    // BUT original script used `i * 80`.
                    // To replicate:
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        items.forEach((item, index) => {
            // Since IntersectionObserver might fire for all visible items at once,
            // we can add a style transition-delay inline based on index,
            // OR just depend on the observer callback firing sequentially (it doesn't guarantee order).
            // Let's attach an index/delay to the element data attribute if strictly needed,
            // or just accept simpler animation.
            // Actually, the original code used `items.forEach((entry, i) => ...)` inside observer callback?
            // Wait, original: `entries.forEach((entry, i) => ...)` 
            // `entries` is an array of intersecting entries. If all intersect at once, they get staggered delay.
            // `i` is the index IN THE ENTRIES array. So if 5 items appear, they stagger. Correct.
            // My implementation above does simple add.
            // I will improve it to match original behavior.
        });

        // Improved Observer for Stagger
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, i * 80);
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        items.forEach(item => staggerObserver.observe(item));

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
                                        <h2>Infrastructure</h2>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <a>Infrastructure</a>
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
                    <div className="research">
                        <div className="container">
                            <div className="research-sec">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="main-title">
                                            <h2>
                                                <span>Infrastructure</span>
                                            </h2>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row"></div>

                                <ul className="research-detail">
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            A covered shed area of 12000 sqft and a land bank of
                                            almost 100,000 sqft for future use.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>Induction Furnace Dual Track 500 kgs.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Boiler for steam generation.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>Pre-forming Machine.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            2 no.s Hydraulic Moulding Machine for pattern making.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            Gluing and assembly station for mould handling with
                                            hot-wire cutting machine.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            {" "}
                                            Coating Blender with tank of capacity 1800 ltrs.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Drying rooms for moulds.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Compressor 93 CFM capacity.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Compaction Table for Sand box preparations.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Vacuum system.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            {" "}
                                            17 no.s Sandboxes to accommodate casting of size upto 650
                                            mm cube and continuous pouring cycle of 24 hrs.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            {" "}
                                            Sand plant including sand conveyor and bucket elevator.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Sand shakeout machine for metal stripping.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            {" "}
                                            Sand cooler with 30 Hp blower for dust separation.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            Fully mechanised transfer track system for sandbox
                                            movement.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>Two EOT cranes.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>Cooling Tower (2 no.s)</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            {" "}
                                            Power infrastructure with VCB, transformer, LT panel for
                                            connected load of 630 Kva.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>DG for electrical support.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>3 no.s weighing machines.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>RO water treatment plant.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>Shot Blasting machine.</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> Ladle pre-heater and ladles (3 nos).</span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span>
                                            {" "}
                                            Fettling unit with angle grinders, bench grinders, etc.
                                        </span>
                                    </li>
                                    <li>
                                        <div className="icon"></div>
                                        <span> A fully equipped lab to ensure quality.</span>
                                    </li>
                                </ul>
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
            <Script src="/js/jquery.mmenu.min.all.js" strategy="lazyOnload" />
            <Script src="/js/owl.carousel.js" strategy="lazyOnload" />
            <Script src="/js/custom.js" strategy="lazyOnload" />
        </>
    );
}
