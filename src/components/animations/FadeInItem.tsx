"use client";

import React from "react";
import { motion } from "framer-motion";

interface FadeInItemProps {
    children: React.ReactNode;
    className?: string;
}

export default function FadeInItem({ children, className = "" }: FadeInItemProps) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const },
        },
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}
