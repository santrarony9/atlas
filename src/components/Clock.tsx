"use client";

import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    // Format options
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    };

    // IST Time
    const istTime = time.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "Asia/Kolkata",
    });

    // Local Time
    const localTime = time.toLocaleTimeString("en-US", timeOptions);

    return (
        <div className="flex gap-4 text-xs font-semibold text-white uppercase tracking-wider">
            <div className="flex items-center gap-1">
                <span className="text-brand-orange">IST:</span>
                <span>{istTime}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 border-l border-white/20 pl-4">
                <span className="text-brand-orange">Local:</span>
                <span>{localTime}</span>
            </div>
        </div>
    );
}
