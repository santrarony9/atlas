import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "./custom.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-montserrat" });

export const metadata: Metadata = {
    title: "Atlas Foundries",
    description: "Atlas Foundries Website",
};

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Global metadata and fonts are handled by Next.js */}
            </head>
            <body className={`${inter.className} ${montserrat.variable} bg-brand-light`}>
                <TopBar />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
