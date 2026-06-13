import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TNiC — Transformative Nutrition in Cell-health | Precision Longevity Science',
  description: 'Institutional-grade education on the 12 Hallmarks of Aging, mitochondrial health, NRF2 pathways, and evidence-based strategies for healthy lifespan extension. Home of the High-Powered Anti-Aging Stack.',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A1628] text-white antialiased">
        {/* Premium Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A1628]/95 backdrop-blur-2xl">
          <div className="mx-auto max-w-7xl px-8 flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-12 w-[210px]">
                <img 
                  src="/logo.png" 
                  alt="TNiC — Transformative Nutrition in Cell-health" 
                  className="h-full w-full object-contain transition-all duration-300 group-hover:scale-[1.015]" 
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-9 text-sm tracking-[0.6px] font-medium text-white/90">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/science" className="hover:text-emerald-400 transition-colors">The Science</Link>
              <Link href="/library" className="hover:text-emerald-400 transition-colors">Library</Link>
              <Link href="/library/longevity-stack" className="hover:text-emerald-400 transition-colors">Anti-Aging Stack</Link>
              <Link href="/elite-8" className="hover:text-emerald-400 transition-colors font-semibold">Elite 8</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link 
                href="/library/longevity-stack" 
                className="hidden md:inline-flex px-7 py-2.5 rounded-full bg-white text-[#0A1628] text-sm font-semibold tracking-[-0.2px] hover:bg-emerald-400 hover:text-white transition-all active:scale-[0.985]"
              >
                Explore the Stack
              </Link>
            </div>
          </div>
        </header>

        <main className="pt-20 min-h-[100dvh]">{children}</main>

        {/* Premium Footer */}
        <footer className="border-t border-white/10 bg-[#0A1628] py-20 text-sm">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-12 gap-y-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="TNiC" className="h-8 w-auto opacity-80" />
              </div>
              <p className="text-white/60 max-w-xs">Precision tools and education for cellular resilience and healthy lifespan extension.</p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-y-8 text-white/70">
              <div>
                <div className="font-medium text-white/90 mb-3 tracking-widest text-xs">PLATFORM</div>
                <div className="space-y-1.5">
                  <Link href="/library/longevity-stack" className="block hover:text-white transition">Anti-Aging Stack</Link>
                  <Link href="/library" className="block hover:text-white transition">Full Library</Link>
                  <Link href="/elite-8" className="block hover:text-white transition font-medium">Elite 8 LQ Ranking</Link>
                </div>
              </div>
              <div>
                <div className="font-medium text-white/90 mb-3 tracking-widest text-xs">SCIENCE</div>
                <div className="space-y-1.5">
                  <Link href="/science" className="block hover:text-white transition">12 Hallmarks</Link>
                  <Link href="/science" className="block hover:text-white transition">NRF2 & Mitochondria</Link>
                </div>
              </div>
              <div className="md:col-span-2 text-xs text-white/50 pt-8 md:pt-0">
                © {new Date().getFullYear()} TNiC. All rights reserved.<br />
                For educational purposes only. Not medical advice.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
