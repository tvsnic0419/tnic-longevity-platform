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

const ac: Record<AccentKey, {
  titleHover: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  arcStroke: string;
  glowHover: string;
  dotBg: string;
  deepDiveCls: string;
  topBarGrad: string;
}> = {
  cyan: {
    titleHover: 'group-hover:text-accent-cyan',
    badgeBg: 'bg-accent-cyan/8',
    badgeText: 'text-accent-cyan',
    badgeBorder: 'border-accent-cyan/20',
    arcStroke: 'text-accent-cyan',
    glowHover: 'glow-hover-cyan',
    dotBg: 'bg-accent-cyan',
    deepDiveCls: 'bg-accent-cyan/8 hover:bg-accent-cyan/15 border-accent-cyan/20 hover:border-accent-cyan/50 text-accent-cyan',
    topBarGrad: 'from-accent-cyan to-accent-emerald',
  },
  amber: {
    titleHover: 'group-hover:text-accent-amber',
    badgeBg: 'bg-accent-amber/8',
    badgeText: 'text-accent-amber',
    badgeBorder: 'border-accent-amber/20',
    arcStroke: 'text-accent-amber',
    glowHover: 'glow-hover-amber',
    dotBg: 'bg-accent-amber',
    deepDiveCls: 'bg-accent-amber/8 hover:bg-accent-amber/15 border-accent-amber/20 hover:border-accent-amber/50 text-accent-amber',
    topBarGrad: 'from-accent-amber to-accent-rose',
  },
  violet: {
    titleHover: 'group-hover:text-accent-violet',
    badgeBg: 'bg-accent-violet/8',
    badgeText: 'text-accent-violet',
    badgeBorder: 'border-accent-violet/20',
    arcStroke: 'text-accent-violet',
    glowHover: 'glow-hover-violet',
    dotBg: 'bg-accent-violet',
    deepDiveCls: 'bg-accent-violet/8 hover:bg-accent-violet/15 border-accent-violet/20 hover:border-accent-violet/50 text-accent-violet',
    topBarGrad: 'from-accent-violet to-accent-cyan',
  },
  emerald: {
    titleHover: 'group-hover:text-accent-emerald',
    badgeBg: 'bg-accent-emerald/8',
    badgeText: 'text-accent-emerald',
    badgeBorder: 'border-accent-emerald/20',
    arcStroke: 'text-accent-emerald',
    glowHover: 'glow-hover-emerald',
    dotBg: 'bg-accent-emerald',
    deepDiveCls: 'bg-accent-emerald/8 hover:bg-accent-emerald/15 border-accent-emerald/20 hover:border-accent-emerald/50 text-accent-emerald',
    topBarGrad: 'from-accent-emerald to-accent-cyan',
  },
  rose: {
    titleHover: 'group-hover:text-accent-rose',
    badgeBg: 'bg-accent-rose/8',
    badgeText: 'text-accent-rose',
    badgeBorder: 'border-accent-rose/20',
    arcStroke: 'text-accent-rose',
    glowHover: 'glow-hover-rose',
    dotBg: 'bg-accent-rose',
    deepDiveCls: 'bg-accent-rose/8 hover:bg-accent-rose/15 border-accent-rose/20 hover:border-accent-rose/50 text-accent-rose',
    topBarGrad: 'from-accent-rose to-accent-violet',
  },
};

/* Animated SVG arc — 270° sweep */
function CoverageArc({
  pct,
  accent,
  animDelay = 0,
  size = 52,
}: {
  pct: number;
  accent: AccentKey;
  animDelay?: number;
  size?: number;
}) {
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const arcLen = circ * 0.75;
  const fill = (pct / 100) * arcLen;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {/* Track ring */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="arc-track"
        strokeDasharray={`${arcLen} ${circ}`}
        transform={`rotate(135 ${cx} ${cy})`}
      />
      {/* Animated fill */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        stroke="currentColor"
        className={ac[accent].arcStroke}
        strokeDasharray={`${fill} ${circ}`}
        transform={`rotate(135 ${cx} ${cy})`}
        initial={{ strokeDasharray: `0 ${circ}` }}
        whileInView={{ strokeDasharray: `${fill} ${circ}` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: animDelay }}
      />
      {/* Percentage label */}
      <text
        x={cx} y={cy + 4}
        textAnchor="middle"
        fontSize={size * 0.18}
        fontWeight="800"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        className={ac[accent].arcStroke}
      >
        {pct}%
      </text>
    </svg>
  );
}

export function HallmarkProblemTiles() {
  return (
    <section
      id="hallmark-targets"
      className="py-24 md:py-32 border-b border-border relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[700px] h-[400px] rounded-full bg-accent-violet/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-accent-cyan/[0.05] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-accent-violet/60" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-accent-violet uppercase">The Science</span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-accent-violet/60" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-4">
                Twelve hallmarks.{' '}
                <br className="hidden sm:block" />
                <span className="headline-gradient">Twelve targets.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Every biological driver of aging — mapped to interventions, evidence grades, and your biomarker panel.
                Each coverage arc shows how well-targeted this hallmark currently is.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-accent-violet/20 bg-accent-violet/8 text-[11px] font-mono font-bold text-accent-violet lg:flex-shrink-0">
              <Target className="w-3.5 h-3.5" aria-hidden="true" />
              12 Hallmarks Indexed
            </div>
          </div>
        </motion.div>

        {/* Asymmetric grid — first card spans 2 cols on xl */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {hallmarkLibrary.map((h, i) => {
            const top = h.interventions[0];
            const tier = (top?.evidence ?? 'B') as EvidenceTier;
            const accent = hallmarkAccent[h.id] ?? 'cyan';
            const a = ac[accent];
            const isFeatured = i === 0; // genomic instability gets the hero treatment

            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.5 }}
                className={isFeatured ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''}
              >
                <div
                  className={[
                    'group relative h-full flex flex-col overflow-hidden rounded-2xl',
                    'border border-border/50 hover:border-border/80',
                    'bg-card/40 backdrop-blur-sm',
                    'transition-all duration-300',
                    a.glowHover,
                  ].join(' ')}
                >
                  {/* Accent top-bar — visible on hover */}
                  <div className={`h-[2px] w-full bg-gradient-to-r ${a.topBarGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {isFeatured ? (
                    /* ── Featured card layout ── */
                    <div className="flex flex-col sm:flex-row flex-1 gap-0">
                      {/* Left: icon + arc */}
                      <div className={`flex flex-col items-center justify-center gap-4 p-7 sm:w-48 bg-gradient-to-br from-${accent === 'cyan' ? 'accent-cyan' : 'accent-emerald'}/[0.08] to-transparent border-b sm:border-b-0 sm:border-r border-border/30`}>
                        <div className={`rounded-2xl p-3.5 ${a.badgeBg} border ${a.badgeBorder} group-hover:scale-110 transition-transform duration-300`}>
                          <HallmarkIcon type={h.visual} size={32} />
                        </div>
                        <CoverageArc pct={h.coverage} accent={accent} size={64} animDelay={0.1} />
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${a.badgeText} opacity-60`}>
                          Coverage
                        </span>
                      </div>

                      {/* Right: content */}
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-lg border ${a.badgeBg} ${a.badgeText} ${a.badgeBorder}`}>
                            #{String(h.number).padStart(2, '0')}
                          </span>
                          <span className={`text-[9px] font-mono ${a.badgeText} opacity-50`}>
                            {h.relatedCompoundIds?.length ?? 0} compounds
                          </span>
                        </div>

                        <h3 className={`font-bold text-base mb-2 leading-snug transition-colors ${a.titleHover}`}>
                          {h.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1">
                          {h.tagline}
                        </p>

                        {/* Top 2 interventions */}
                        <div className="space-y-2 mb-4">
                          {h.interventions.slice(0, 2).map((intv) => (
                            <div key={intv.id} className="flex items-center justify-between gap-2">
                              <p className="text-[11px] font-medium truncate text-foreground/80">{intv.name}</p>
                              <EvidenceTag tier={intv.evidence as EvidenceTier} size="sm" />
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-1">
                          <Link href={`/hallmarks/${h.slug}`} className={`focus-ring flex-1 text-center text-[10px] font-bold py-2 rounded-lg border transition-all duration-200 ${a.deepDiveCls}`}>
                            Deep Dive
                          </Link>
                          <Link href={`/library/${h.slug}`} className="focus-ring flex-1 text-center text-[10px] font-medium py-2 rounded-lg border border-border/50 hover:border-border bg-card/60 text-muted-foreground hover:text-foreground transition-colors">
                            Library
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ── Standard card layout ── */
                    <div className="flex flex-col flex-1 p-5">
                      {/* Header row: icon + arc */}
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className={`rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110 ${a.badgeBg} border ${a.badgeBorder}`}>
                          <HallmarkIcon type={h.visual} size={20} />
                        </div>
                        <CoverageArc pct={h.coverage} accent={accent} size={48} animDelay={i * 0.035 + 0.2} />
                      </div>

                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className={`font-bold text-sm leading-snug transition-colors ${a.titleHover}`}>
                          {h.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-1">
                        {h.tagline}
                      </p>

                      {/* Compound count + top intervention */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${a.badgeBg} ${a.badgeText} ${a.badgeBorder}`}>
                          {h.relatedCompoundIds?.length ?? 0} cpds
                        </span>
                        {top && <EvidenceTag tier={tier} size="sm" />}
                        {top && <p className="text-[10px] font-medium truncate text-foreground/70 flex-1">{top.name}</p>}
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Link href={`/hallmarks/${h.slug}`} className={`focus-ring flex-1 text-center text-[10px] font-bold py-2 rounded-lg border transition-all duration-200 ${a.deepDiveCls}`}>
                          Deep Dive
                        </Link>
                        <Link href={`/library/${h.slug}`} className="focus-ring flex-1 text-center text-[10px] font-medium py-2 rounded-lg border border-border/50 hover:border-border bg-card/60 text-muted-foreground hover:text-foreground transition-colors">
                          Library
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14"
        >
          <Link href="/hallmarks" className="focus-ring btn-gradient text-sm">
            All 12 Hallmarks Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/library" className="focus-ring btn-ghost-premium text-sm">
            Explore full library
          </Link>
          <Link
            href="/stacks"
            className="focus-ring interactive inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-violet/8 hover:bg-accent-violet/15 border border-accent-violet/25 hover:border-accent-violet/50 text-accent-violet text-sm font-semibold transition-all"
          >
            <Target className="w-4 h-4" />
            Build a stack
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
