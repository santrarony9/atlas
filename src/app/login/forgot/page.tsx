"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Check your console (Dev Mode) or server logs for the reset link.");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to send request.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <FadeIn>
                <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8">
                    <div className="mb-8 text-center">
                        <Link href="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-orange mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Login
                        </Link>
                        <h1 className="text-3xl font-bold text-brand-blue mb-2">Forgot Password?</h1>
                        <p className="text-gray-500">Enter your email to receive a reset link.</p>
                    </div>

                    {status === "success" ? (
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center mb-6">
                            <p className="font-bold mb-2">Request Sent!</p>
                            <p className="text-sm">{message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition-colors"
                                        placeholder="admin@atlas.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {status === "error" && (
                                <div className="text-red-500 text-sm text-center">
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    )}
                </div>
            </FadeIn>
        </div>
    );
}
