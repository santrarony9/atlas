"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Minimal Header for Contact Page */}
            <div className="bg-brand-blue py-12 text-center text-white">
                <h1 className="text-4xl font-bold font-montserrat mb-2">Contact Us</h1>
                <p className="text-brand-orange font-semibold tracking-wider uppercase">Get in touch with our team</p>
            </div>

            <section className="flex-grow container mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                    {/* Left: Contact Info */}
                    <div className="p-12 md:p-16 flex flex-col justify-center bg-brand-light">
                        <h2 className="text-3xl font-bold text-brand-blue mb-8">Atlas Foundries</h2>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded bg-brand-orange flex items-center justify-center text-white shrink-0">
                                    📍
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Registered Office</h4>
                                    <p className="text-gray-600">225/2 CIT Road, Scheme VII M,<br />Kolkata – 700054</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded bg-brand-orange flex items-center justify-center text-white shrink-0">
                                    🏭
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Factory (Works)</h4>
                                    <p className="text-gray-600">JL No.11, Perore Road, Gram Basantapur, Mouza Bhetkepara,<br />Munsirhat, Howrah – 711410</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded bg-brand-orange flex items-center justify-center text-white shrink-0">
                                    📞
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                                    <p className="text-gray-600">
                                        <a href="tel:03323357376" className="hover:text-brand-blue transition-colors">033 23357376</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded bg-brand-orange flex items-center justify-center text-white shrink-0">
                                    📧
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                                    <p className="text-gray-600">
                                        <a href="mailto:enquiry@atlasfoundries.com" className="hover:text-brand-blue transition-colors">enquiry@atlasfoundries.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Map or Image */}
                    <div className="relative min-h-[400px]">
                        <Image
                            src="/images2/Contact.jpg"
                            alt="Contact Atlas Foundries"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-blue/40"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
