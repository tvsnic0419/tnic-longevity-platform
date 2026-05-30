'use client';

import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A1628] text-white antialiased">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A1628]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-8 flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-12 w-[200px]">
                <img src="/logo.png" alt="TNiC — Transformative Nutrition in Cell-health" className="h-full w-full object-contain transition-all duration-300 group-hover:scale-[1.02]" />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-10 text-sm tracking-[0.75px] font-medium text-white/90">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/science" className="hover:text-emerald-400 transition-colors">The Science</Link>
              <Link href="/library" className="hover:text-emerald-400 transition-colors">Library</Link>
              <Link href="/library/longevity-stack" className="hover:text-emerald-400 transition-colors">Anti-Aging Stack</Link>
            </nav>
            <Link href="/library/longevity-stack" className="hidden md:block px-6 py-2.5 rounded-full bg-white text-[#0A1628] text-sm font-semibold hover:bg-emerald-400 hover:text-white transition-all">Explore the Stack</Link>
          </div>
        </header>
        <main className="pt-20">{children}</main>
        <footer className="border-t border-white/10 bg-[#0A1628] py-16 text-sm text-white/70">
          <div className="mx-auto max-w-7xl px-8">© {new Date().getFullYear()} TNiC — Precision Longevity Science. Institutional-grade education for cellular resilience.</div>
        </footer>
      </body>
    </html>
  );
}