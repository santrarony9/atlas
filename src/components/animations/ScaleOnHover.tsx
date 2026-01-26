"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScaleOnHoverProps {
    children: React.ReactNode;
    scale?: number;
    className?: string;
}

export default function ScaleOnHover({ children, scale = 1.05, className = "" }: ScaleOnHoverProps) {
    return (
        <motion.div
            whileHover={{ scale: scale }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </motion.div>
    );
}
