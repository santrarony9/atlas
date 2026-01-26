"use client";

import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
    fullWidth?: boolean;
}

export default function FadeIn({ children, delay = 0, direction = "up", className = "", fullWidth = false }: FadeInProps) {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: [0.22, 1, 0.36, 1] as const, // Custom cubic-bezier for "premium" feel
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            className={`${className} ${fullWidth ? "w-full" : ""}`}
        >
            {children}
        </motion.div>
    );
}
