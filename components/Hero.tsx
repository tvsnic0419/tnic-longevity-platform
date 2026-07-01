'use client';

import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

interface HeroProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
}

export default function Hero({ onJoinClick, onExploreClick }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0A1628] text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-tnic.jpg"
          alt="TNiC Cellular Resilience — abstract scientific visualization of mitochondria, DNA, and cellular networks in deep navy and emerald tones"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/60 to-[#0A1628]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium tracking-[2px] uppercase">
            Premium Formulations · Evidence-Based
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">TNiC</h1>
        <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8 text-emerald-400">
          Cellular Resilience &amp; Longevity
        </p>

        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/90 mb-10 leading-tight">
          High-bioavailability formulations targeting the core mechanisms of aging.
          <br className="hidden md:block" />
          Your cells are the operating system of longevity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onJoinClick || (() => scrollToSection('recommendations'))}
            className="cta-primary group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl text-lg font-semibold text-[#0A1628] shadow-xl hover:shadow-2xl transition-all active:scale-[0.985]"
          >
            Join the Defense Network
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={onExploreClick || (() => scrollToSection('science'))}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-medium border border-white/30 hover:bg-white/10 backdrop-blur transition-all active:scale-[0.985]"
          >
            Explore the Science
            <Users className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-sm text-white/60 tracking-widest">
          <div>12 HALLMARKS OF AGING</div>
          <div>200+ NRF2 GENES</div>
          <div>5–10× BIOAVAILABILITY</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-1 text-white/50 text-xs tracking-[3px]">
          SCROLL TO BEGIN
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export { Hero };
