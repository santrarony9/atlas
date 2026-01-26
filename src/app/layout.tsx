import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Atlas Foundries",
    description: "Atlas Foundries Website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link href="/css/medical-guide.css" rel="stylesheet" type="text/css" />
                <link href="/fonts/medical-guide-icons.css" rel="stylesheet" type="text/css" />
                <link href="/css/default-color.css" rel="stylesheet" id="color" type="text/css" />
                <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
                <link href="/css/dropmenu.css" rel="stylesheet" type="text/css" />
                <link href="/css/sticky-header.css" rel="stylesheet" type="text/css" />
                <link href="/css/style.css" rel="stylesheet" type="text/css" />
                <link href="/css/settings.css" rel="stylesheet" type="text/css" />
                <link href="/css/extralayers.css" rel="stylesheet" type="text/css" />
                <link href="/css/accordion.css" rel="stylesheet" type="text/css" />
                <link href="/css/tabs.css" rel="stylesheet" type="text/css" />
                <link href="/css/owl.carousel.css" rel="stylesheet" type="text/css" />
                <link rel="stylesheet" type="text/css" href="/css/jquery.mmenu.all.css" />
                <link rel="stylesheet" type="text/css" href="/css/demo.css" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
