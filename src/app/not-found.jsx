"use client"

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fffbeb] to-[#fff7e6]">
      <div className="max-w-lg text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl">
        <h1 className="text-6xl font-extrabold text-[#ff6b6b] mb-4">404</h1>
        <p className="text-lg text-[#555] mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#ff6b6b] px-4 py-2 text-white hover:bg-[#ff4c4c] transition">
          <ArrowLeft size={16} />
          Go back home
        </Link>
      </div>
    </main>
  );
}
