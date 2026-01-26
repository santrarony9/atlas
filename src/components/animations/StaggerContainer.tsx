"use client";

import React from "react";
import { motion } from "framer-motion";

interface StaggerContainerProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
}

export default function StaggerContainer({ children, staggerDelay = 0.1, className = "" }: StaggerContainerProps) {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
