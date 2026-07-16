import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="sticky top-0 right-0 left-0 z-50 ">
      <header className="max-w-[1400px] mx-auto flex items-center justify-between p-6 md:p-8 lg:px-1">

        <div className="flex items-center text-white">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5C20 5 24 9 24 14C24 19 20 20 20 20C20 20 16 19 16 14C16 9 20 5 20 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35 20C35 20 31 16 26 16C21 16 20 20 20 20C20 20 21 24 26 24C31 24 35 20 35 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 35C20 35 16 31 16 26C16 21 20 20 20 20C20 20 24 21 24 26C24 31 20 35 20 35Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 20C5 20 9 24 14 24C19 24 20 20 20 20C20 20 19 16 14 16C9 16 5 20 5 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Right Actions */}
        <div className="flex items-center bg-white p-1 rounded-xl shadow-xl">
          <Link
            href="/admission"
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            About
          </Link>
          <Link
            href="/inquiry"
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#1a202c] text-white hover:bg-black transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </header>
    </div>
  )
}


