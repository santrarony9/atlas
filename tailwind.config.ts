import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                brand: {
                    blue: "#003366", // Royal Blue
                    orange: "#FF9933", // Safety Orange/Saffron
                    light: "#F5F5F5", // Light Gray for backgrounds
                    dark: "#1A1A1A", // Dark Gray for text
                }
            }
        },
    },
    plugins: [],
};
export default config;
