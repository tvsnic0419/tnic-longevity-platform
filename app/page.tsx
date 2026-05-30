'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TNiCHome() {
  return (
    <div className="bg-[#0A1628] text-white overflow-hidden">
      {/* Premium Hero with Depth */}
      <section className="relative min-h-[100dvh] flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(#1a2a4a_0.6px,transparent_1px)] bg-[length:4px_4px] opacity-30"></div>
        <div className="relative z-10 max-w-5xl px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/20 text-[10px] tracking-[4px] mb-8 text-white/60 font-medium">
            INSTITUTIONAL-GRADE  •  EVIDENCE-LED  •  PRECISION LONGEVITY
          </div>
          
          <h1 className="text-[92px] md:text-[120px] leading-[0.82] font-semibold tracking-[-7.5px] mb-6">
            Cellular<br />Resilience.<br />Redefined.
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-white/75 tracking-[-0.2px]">
            The premier platform for deep education on the biology of aging, mitochondrial health, and science-backed strategies for healthy lifespan extension.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/library/longevity-stack" 
              className="group inline-flex items-center justify-center px-10 h-14 rounded-2xl bg-white text-[#0A1628] text-lg font-semibold tracking-[-0.3px] transition-all active:scale-[0.985] hover:bg-emerald-400 hover:text-white">
              Open the High-Powered Anti-Aging Stack
            </Link>
            <Link href="#framework" 
              className="inline-flex items-center justify-center px-9 h-14 rounded-2xl border border-white/30 text-lg hover:bg-white/5 transition-all">
              Explore the Framework
            </Link>
          </div>
          <p className="mt-8 text-xs tracking-[2px] text-white/50">Transformative Nutrition in Cell-health</p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] tracking-[3px] text-white/40">
          SCROLL TO BEGIN
          <div className="w-px h-8 bg-white/20"></div>
        </div>
      </section>

      {/* The Challenge + Framework */}
      <section id="framework" className="max-w-6xl mx-auto px-8 py-24 border-b border-white/10">
        <div className="grid md:grid-cols-12 gap-x-12">
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <div className="text-emerald-400 text-xs tracking-[4px] font-medium mb-3">THE BIOLOGY OF AGING</div>
              <h2 className="text-7xl font-semibold tracking-[-3.5px] leading-none">The 12 Hallmarks.<br />One Integrated Stack.</h2>
            </div>
          </div>
          <div className="md:col-span-7 pt-8 md:pt-0 text-[17px] text-white/80 space-y-6 leading-relaxed">
            <p>Aging is not one process — it is a network of 12 interconnected hallmarks. Our High-Powered Anti-Aging Stack was architected to target every hallmark with precision compounds, optimal dosing, and synergistic timing.</p>
            <p className="text-white/60">This is not a random collection of supplements. It is a coherent, evidence-mapped system designed for serious longevity work.</p>
            
            <div className="pt-4">
              <Link href="/library/longevity-stack" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium group">
                View the complete mapped stack and protocols 
                <span className="group-hover:translate-x-0.5 transition">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Resource */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-emerald-400 text-xs tracking-[4px] font-medium">FLAGSHIP RESOURCE</div>
            <h3 className="text-6xl font-semibold tracking-[-2.5px]">High-Powered Anti-Aging Stack</h3>
          </div>
          <Link href="/library/longevity-stack" className="hidden md:block text-sm tracking-widest hover:text-emerald-400 transition">ENTER THE FULL LIBRARY →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "10 Precision Compounds", desc: "NMN, Urolithin A, Fisetin, Quercetin, Spermidine, Ca-AKG, TMG and more — each selected for mechanistic strength and human evidence." },
            { title: "Daily + Pulse Protocols", desc: "Structured daily timing schedule and monthly senolytic pulse designed for safety, synergy, and real-world adherence." },
            { title: "Biomarker Framework", desc: "Track the metrics that matter: oxidative stress, mitochondrial function, inflammation, and metabolic health." }
          ].map((item, i) => (
            <div key={i} className="group rounded-3xl border border-white/10 bg-white/[0.015] p-8 hover:border-white/20 transition-all">
              <div className="text-4xl font-semibold tracking-[-1.5px] mb-6 text-white/90 group-hover:text-white transition-colors">{item.title}</div>
              <p className="text-white/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/library/longevity-stack" className="inline-block px-8 py-4 rounded-2xl bg-white text-[#0A1628] font-semibold tracking-[-0.3px] text-lg active:scale-[0.985]">
            Open Full Anti-Aging Stack →
          </Link>
        </div>
      </section>

      {/* Trust & Methodology */}
      <section className="border-t border-white/10 bg-black/20 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center text-sm text-white/60">
          Built on primary literature, human RCTs where available, and mechanistic depth. No hype. No overclaims. Just the highest-signal information for people who take longevity seriously.
        </div>
      </section>
    </div>
  );
}
