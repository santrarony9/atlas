"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";
import { Lock, CheckCircle } from "lucide-react";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus("error");
            setMessage("Passwords do not match.");
            return;
        }

        if (!token) {
            setStatus("error");
            setMessage("Invalid or missing token.");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Your password has been reset successfully.");
                setTimeout(() => router.push("/login"), 3000);
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to reset password.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Something went wrong.");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
                <p className="text-gray-500 mb-6">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="password"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition-colors"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="password"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-brand-orange focus:border-brand-orange transition-colors"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={6}
                    />
                </div>
            </div>

            {status === "error" && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                    {message}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" ? "Resetting..." : "Set New Password"}
            </button>
        </form>
    );
}

export default function ResetPassword() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <FadeIn>
                <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-brand-blue mb-2">Reset Password</h1>
                        <p className="text-gray-500">Create a new secure password.</p>
                    </div>
                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </FadeIn>
        </div>
    );
}
