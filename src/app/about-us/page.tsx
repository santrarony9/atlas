"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function AboutUs() {
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document
            .querySelectorAll(".vm-glass-card, .main-title")
            .forEach((el) => observer.observe(el));

        const postObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        postObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll(".meet-specialists .post").forEach(el => postObserver.observe(el));

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
                                        <h2>About Us</h2>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <a>About Us</a>
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
                    {/* Start Welcome */}
                    <div className="welcome-two">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title">
                                        <h2>
                                            <span style={{ fontSize: "35px" }}>Welcome to</span> Atlas
                                            Foundries
                                        </h2>
                                        <p style={{ fontSize: "30px" }}>
                                            We can cater to all types of requirements of engineered
                                            castings for any industry.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="welcome-detail">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src="/images2/12.png" alt="" />
                                    </div>

                                    <div className="col-md-7">
                                        <div className="detail">
                                            <p>
                                                Atlas Foundries was established in the year 2020 as a
                                                dedicated 100% Lost Foam Process Foundry. It’s a pioneer
                                                in the manufacturing process and to date is the only LFC
                                                process foundry in Eastern India catering to various
                                                industries like railways, water supply, automotives,
                                                tractors etc.
                                                <br />
                                                <br />
                                                Imbued with the spirit of a new-age startup, in-depth
                                                product and process knowledge and focus on R&D the
                                                company is steadily growing to find its foothold in the
                                                castings ecosystem and has made a name for itself in
                                                producing quality products meeting varied customer
                                                requirements and quality parameters. some of our following
                                                Departments.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Welcome */}

                    {/* Start Specialists */}
                    <div
                        className="meet-specialists"
                        style={{ backgroundColor: "#e3e0e0" }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title">
                                        <h2>
                                            <span></span>Who are We
                                        </h2>
                                        <p style={{ fontSize: "25px" }}>Know more about Us</p>
                                    </div>
                                </div>
                            </div>
                            <div className="vm-glass-section">
                                <div className="vm-glass-card reveal">
                                    <div className="vm-glass-icon">👁️</div>
                                    <h3>Vision</h3>
                                    <p>
                                        “To be a pioneer in the casting industry by sustainably and
                                        profitably establishing latest production methodologies through
                                        continuous research, development, value addition and adoption
                                        of best practices.”
                                    </p>
                                </div>

                                <div className="vm-glass-card reveal delay">
                                    <div className="vm-glass-icon">🎯</div>
                                    <h3>Mission</h3>
                                    <p>
                                        “To bring a change in the engineered castings market through
                                        better technology, improved quality, lower costs and reduced
                                        impact on the environment by adoption of green technologies.”
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Specialists */}

                    {/* Start Services Four */}
                    <div className="services-four-dark">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title">
                                        <h2>
                                            <span>Our</span> Capacity
                                        </h2>
                                        <p>
                                            Our capacity is 2400 mt per annum of Grey Cast Iron and
                                            Ductile Iron with a scalable opportunity of upto three
                                            times. We can cater to all types of requirements of
                                            engineered castings for any industry. Our superior
                                            manufacturing process gives us an edge over traditional
                                            sand-casting foundries both in terms of quality and costs.
                                            The company has a Management team with vast experience in
                                            all the areas of production, finance and marketing. We, at
                                            Atlas, continuously strive to combine latest technologies
                                            with traditional skills and experience to achieve better
                                            results and continuous improvements. The team is involved
                                            hands-on in the entire life-cycle of a casting to ensure
                                            stringent quality control at every stage.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Services Four */}
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
