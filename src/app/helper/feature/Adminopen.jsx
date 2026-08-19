"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Adminopen = () => {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Listen for custom event to open admin modal after 10 clicks on Don Bosco button
    useEffect(() => {
        const openHandler = () => setOpen(true);
        document.addEventListener('open-admin', openHandler);
        return () => document.removeEventListener('open-admin', openHandler);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "suman") {
            setOpen(false);
            setPassword("");
            setError("");
            router.push("/admin");
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/60 backdrop-blur-md">
                    <div className="bg-neutral-900/80 p-8 rounded-3xl shadow-2xl border border-white/10 w-[90%] max-w-md relative backdrop-blur-xl">
                        <button
                            onClick={() => { setOpen(false); setError(""); setPassword(""); }}
                            className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-8 mt-2">
                            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Access</h2>
                            <p className="text-white/60 text-sm">Please enter the administrator password</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    placeholder="Password"
                                    className={`w-full bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all shadow-inner text-lg`}
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-red-400 text-sm mt-2 absolute -bottom-6 left-2 font-medium">{error}</p>
                                )}
                            </div>
                            
                            <button
                                type="submit"
                                className="mt-4 w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] text-lg"
                            >
                                Authenticate
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Adminopen