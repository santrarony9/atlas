"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        // Custom Hero Animation Script (from original index.html)
        const images = [
            "/images2/2.jpg",
            "/images2/3.jpg",
            "/images2/Cover.jpg",
            "/images2/about1.png",
        ];

        let index = 0;
        let showingFirst = true;
        const hero = document.querySelector(".hero") as HTMLElement;

        if (hero) {
            // set initial images
            hero.style.setProperty("--img1", `url(${images[0]})`);
            hero.style.setProperty("--img2", `url(${images[1]})`);

            hero.style.setProperty("--before-bg", `url(${images[0]})`);
            hero.style.setProperty("--after-bg", `url(${images[1]})`);

            hero.style.setProperty("--opacity-before", "1");
            hero.style.setProperty("--opacity-after", "0");

            const updateBackground = () => {
                index = (index + 1) % images.length;

                if (showingFirst) {
                    hero.style.setProperty("--after-bg", `url(${images[index]})`);
                    hero.style.setProperty("--opacity-after", "1");
                    hero.style.setProperty("--opacity-before", "0");
                } else {
                    hero.style.setProperty("--before-bg", `url(${images[index]})`);
                    hero.style.setProperty("--opacity-before", "1");
                    hero.style.setProperty("--opacity-after", "0");
                }

                showingFirst = !showingFirst;
            };

            // manual arrows
            const rightArrow = document.querySelector(".hero-arrow.right") as HTMLElement;
            const leftArrow = document.querySelector(".hero-arrow.left") as HTMLElement;

            if (rightArrow) rightArrow.onclick = updateBackground;
            if (leftArrow) leftArrow.onclick = updateBackground;

            // auto change (slow)
            const intervalId = setInterval(updateBackground, 1000); // Original was 1000

            return () => clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        // Preloader script
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

                {/* Start Header */}
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
                                    <li className="active">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/about-us">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/lost-foam-manufacturing">
                                            Lost Foam Manufacturing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/infrastructure">Infrastructure</Link>
                                    </li>
                                    <li>
                                        <Link href="/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link href="/quality">Quality</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact-us">Contact Us</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                {/* End Header */}

                {/* Mobile Menu Start */}
                <div className="container">
                    <div id="page">
                        <header className="header">
                            <a href="#menu"></a>
                        </header>

                        <nav id="menu">
                            <ul>
                                <li className="select">
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about-us">About us</Link>
                                </li>
                                <li>
                                    <Link href="/lost-foam-manufacturing">
                                        Lost Foam Manufacturing
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/infrastructure">Infrastructure</Link>
                                </li>

                                <li>
                                    <Link href="/products">Products</Link>
                                </li>

                                <li>
                                    <Link href="/quality">Quality</Link>
                                </li>

                                <li>
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/* Mobile Menu End */}

                {/* Start Banner */}
                <section className="hero">
                    <div className="hero-overlay"></div>

                    <div className="hero-content">
                        <h1>
                            Welcome to Atlas
                            <br />
                            Foundries
                        </h1>

                        <div className="divider"></div>

                        <p className="tagline">
                            “Casting solutions through Lost Foam Process for
                            <br />
                            all your engineered casting requirements”
                        </p>

                        <p className="location">Location - Kolkata, Howrah</p>

                        <Link href="/about-us" className="hero-btn">
                            Get Started
                        </Link>
                    </div>
                    <div className="hero-arrow left">&#10094;</div>
                    <div className="hero-arrow right">&#10095;</div>
                </section>
                {/* End Banner */}

                {/* Footer Bottom (Matches visual structure) */}
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
            <Script src="/js/counter.js" strategy="lazyOnload" />
            <Script src="/js/tabs.js" strategy="lazyOnload" />
            <Script src="/js/jquery.mmenu.min.all.js" strategy="lazyOnload" />
            <Script src="/js/owl.carousel.js" strategy="lazyOnload" />
            <Script src="/js/custom.js" strategy="lazyOnload" />
            <Script src="/js/switcher.js" strategy="lazyOnload" />
            <Script id="revolution-init" strategy="lazyOnload">
                {`
          jQuery(document).ready(function () {
             // Basic revolution init if element exists
             if(jQuery(".tp-banner").length > 0) {
                jQuery(".tp-banner").show().revolution({
                  dottedOverlay: "none",
                  delay: 16000,
                  startwidth: 1170,
                  startheight: 750,
                  hideThumbs: 200,
                  thumbWidth: 100,
                  thumbHeight: 50,
                  thumbAmount: 5,
                  navigationType: "bullet",
                  navigationArrows: "solo",
                  navigationStyle: "preview4",
                  touchenabled: "on",
                  onHoverStop: "off",
                  swipe_velocity: 0.7,
                  swipe_min_touches: 1,
                  swipe_max_touches: 1,
                  drag_block_vertical: false,
                  parallax: "mouse",
                  parallaxBgFreeze: "on",
                  parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
                  keyboardNavigation: "off",
                  navigationHAlign: "center",
                  navigationVAlign: "bottom",
                  navigationHOffset: 0,
                  navigationVOffset: 20,
                  soloArrowLeftHalign: "left",
                  soloArrowLeftValign: "center",
                  soloArrowLeftHOffset: 20,
                  soloArrowLeftVOffset: 0,
                  soloArrowRightHalign: "right",
                  soloArrowRightValign: "center",
                  soloArrowRightHOffset: 20,
                  soloArrowRightVOffset: 0,
                  shadow: 0,
                  fullWidth: "on",
                  fullScreen: "off",
                  spinner: "spinner4",
                  stopLoop: "off",
                  stopAfterLoops: -1,
                  stopAtSlide: -1,
                  shuffle: "off",
                  autoHeight: "off",
                  forceFullWidth: "off",
                  hideThumbsOnMobile: "off",
                  hideNavDelayOnMobile: 1500,
                  hideBulletsOnMobile: "off",
                  hideArrowsOnMobile: "off",
                  hideThumbsUnderResolution: 0,
                  hideSliderAtLimit: 0,
                  hideCaptionAtLimit: 0,
                  hideAllCaptionAtLilmit: 0,
                  startWithSlide: 0,
                  videoJsPath: "rs-plugin/videojs/",
                  fullScreenOffsetContainer: "",
                });
             }
          });
        `}
            </Script>
        </>
    );
}
