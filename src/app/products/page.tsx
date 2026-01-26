"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Products() {
    const [modalImage, setModalImage] = useState<string | null>(null);

    useEffect(() => {
        // Preloader
        const preloader = document.getElementById("preloader");
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 900);
        }
    }, []);

    const openModal = (src: string) => {
        setModalImage(src);
    };

    const closeModal = () => {
        setModalImage(null);
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
                                        <h2>Products</h2>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <a>Products</a>
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
                    <div className="gallery">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-title">
                                        <h2>
                                            <span>Our</span> Products
                                        </h2>
                                        <p>
                                            Atlas Foundries is engaged in development and commercial
                                            production of products across various industries. Inspite
                                            of being a newcomer in the industry, it has been recognized
                                            for the adoption of latest technology that results in good
                                            castings consistently. We are working in the engineered
                                            casting segment with products for railways and automobiles.
                                            Our particular focus is on substitution of products that
                                            are currently being produced through investment casting
                                            process to save costs without any compromise on the quality.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="product-grid">
                                {[
                                    {
                                        src: "/images2/Axle_Box_Hosuing.jpg",
                                        title: "Axle Box Housing",
                                    },
                                    { src: "/images2/Cover.jpg", title: "Cover" },
                                    { src: "/images2/DE_Frame.jpg", title: "DE Frame" },
                                    {
                                        src: "/images2/Front_Axle_Bracket.jpg",
                                        title: "Front Axle Bracket",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="product-card"
                                        onClick={() => openModal(item.src)}
                                    >
                                        <img src={item.src} alt={item.title} />
                                        <div className="product-title">
                                            <h3>{item.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* MODAL */}
                            <div
                                className={`modal ${modalImage ? "active" : ""}`}
                                id="imageModal"
                                onClick={closeModal}
                            >
                                <span className="close-btn" onClick={closeModal}>
                                    &times;
                                </span>
                                <div
                                    className="modal-content"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {modalImage && <img id="modalImage" src={modalImage} alt="Product Detail" />}
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
            <Script src="/js/jquery.fancybox.js" strategy="lazyOnload" />
            <Script src="/js/jquery.fancybox-media.js" strategy="lazyOnload" />
            <Script src="/js/tabs.js" strategy="lazyOnload" />
            <Script src="/js/owl.carousel.js" strategy="lazyOnload" />
            <Script src="/js/jquery.mmenu.min.all.js" strategy="lazyOnload" />
            <Script src="/js/custom.js" strategy="lazyOnload" />
        </>
    );
}
