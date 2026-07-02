'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { HallmarkIcon } from '@/components/library/HallmarkIcon';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import type { EvidenceTier } from '@/lib/types';

type AccentKey = 'cyan' | 'amber' | 'violet' | 'emerald' | 'rose';

const hallmarkAccent: Record<string, AccentKey> = {
  genomic:       'cyan',
  telomeres:     'amber',
  epigenetic:    'violet',
  proteostasis:  'violet',
  autophagy:     'cyan',
  mito:          'emerald',
  senescence:    'rose',
  stem:          'violet',
  communication: 'amber',
  inflammation:  'rose',
  dysbiosis:     'emerald',
  nutrient:      'amber',
};

const accentClasses: Record<AccentKey, {
  titleHover: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  barGrad: string;
  coverageText: string;
  iconWrap: string;
  glowHover: string;
}> = {
  cyan: {
    titleHover: 'group-hover:text-accent-cyan',
    badgeBg: 'bg-accent-cyan/10',
    badgeText: 'text-accent-cyan',
    badgeBorder: 'border-accent-cyan/25',
    barGrad: 'from-accent-cyan/70 to-accent-cyan',
    coverageText: 'text-accent-cyan',
    iconWrap: 'icon-badge-cyan-glow',
    glowHover: 'glow-hover-cyan',
  },
  amber: {
    titleHover: 'group-hover:text-accent-amber',
    badgeBg: 'bg-accent-amber/10',
    badgeText: 'text-accent-amber',
    badgeBorder: 'border-accent-amber/25',
    barGrad: 'from-accent-amber/70 to-accent-amber',
    coverageText: 'text-accent-amber',
    iconWrap: 'icon-badge-amber-glow',
    glowHover: 'glow-hover-amber',
  },
  violet: {
    titleHover: 'group-hover:text-accent-violet',
    badgeBg: 'bg-accent-violet/10',
    badgeText: 'text-accent-violet',
    badgeBorder: 'border-accent-violet/25',
    barGrad: 'from-accent-violet/70 to-accent-violet',
    coverageText: 'text-accent-violet',
    iconWrap: 'icon-badge-violet-glow',
    glowHover: 'glow-hover-violet',
  },
  emerald: {
    titleHover: 'group-hover:text-accent-emerald',
    badgeBg: 'bg-accent-emerald/10',
    badgeText: 'text-accent-emerald',
    badgeBorder: 'border-accent-emerald/25',
    barGrad: 'from-accent-emerald/70 to-accent-emerald',
    coverageText: 'text-accent-emerald',
    iconWrap: 'icon-badge-emerald-glow',
    glowHover: 'glow-hover-emerald',
  },
  rose: {
    titleHover: 'group-hover:text-accent-rose',
    badgeBg: 'bg-accent-rose/10',
    badgeText: 'text-accent-rose',
    badgeBorder: 'border-accent-rose/25',
    barGrad: 'from-accent-rose/70 to-accent-rose',
    coverageText: 'text-accent-rose',
    iconWrap: 'icon-badge-rose-glow',
    glowHover: 'glow-hover-rose',
  },
};

export function HallmarkProblemTiles() {
  return (
    <section
      id="hallmark-targets"
      className="py-20 md:py-28 border-b border-border section-mesh section-glow-violet relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-violet)_0%,_transparent_55%)] opacity-[0.07] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 section-header-mesh">
          <div className="flex justify-center mb-4">
            <span className="section-eyebrow section-eyebrow-violet">
              <Target className="w-3 h-3" aria-hidden="true" />
              Target What Slows With Age
            </span>
          </div>
          <h2 className="heading-section-glow mb-4">
            Twelve hallmarks. Twelve entry points.
          </h2>
          <p className="text-body-sm max-w-2xl mx-auto">
            Each tile maps a biological problem to elevated MDX modules, top interventions, and lab markers.
            Pick the hallmark that matches your symptoms — not the supplement ad you saw last.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {hallmarkLibrary.map((h, i) => {
            const top = h.interventions[0];
            const tier = (top?.evidence ?? 'B') as EvidenceTier;
            const accent = hallmarkAccent[h.id] ?? 'cyan';
            const ac = accentClasses[accent];

            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
              >
                <Link
                  href={`/library/${h.slug}`}
                  className={`focus-ring block h-full card-ultra card-ultra-hover p-5 group transition-all duration-300 ${ac.glowHover}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`rounded-xl p-2.5 ${ac.iconWrap}`}>
                      <HallmarkIcon type={h.visual} size={24} />
                    </div>
                    <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded-lg border ${ac.badgeBg} ${ac.badgeText} ${ac.badgeBorder}`}>
                      #{String(h.number).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm mb-1.5 leading-snug transition-colors ${ac.titleHover}`}>
                    {h.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {h.tagline}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${ac.barGrad}`}
                        style={{ width: `${h.coverage}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold tabular-nums ${ac.coverageText}`}>
                      {h.coverage}%
                    </span>
                  </div>

                  {top && (
                    <div className="pt-3 border-t border-border/40">
                      <p className={`text-[10px] font-mono font-semibold uppercase tracking-wider mb-1 ${ac.badgeText}`}>
                        Top intervention
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium truncate">{top.name}</p>
                        <EvidenceTag tier={tier} size="sm" />
                      </div>
                    </div>
                  )}

                  <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${ac.badgeText}`}>
                    Open module <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
          <Link
            href="/library"
            className="focus-ring btn-ghost-premium text-sm"
          >
            Explore full library <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/stacks"
            className="focus-ring interactive inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-violet/10 hover:bg-accent-violet/20 border border-accent-violet/30 hover:border-accent-violet/50 text-accent-violet text-sm font-semibold transition-all"
          >
            <Target className="w-4 h-4" />
            Build a stack for a hallmark
          </Link>
        </div>
      </div>
    </section>
  );
}
