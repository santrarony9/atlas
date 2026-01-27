/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
};

module.exports = nextConfig;
