'use client';

/**
 * HallmarkDeepDive — the rich, visually explosive hallmark detail panel.
 *
 * Replaces the plain glass-card layout with:
 * - Full-bleed gradient banner with hallmark number, title, and coverage arc
 * - "Why It Matters" callout block
 * - Key molecules tag cloud
 * - Biomarker callout chips
 * - Evidence-ranked intervention cards with impact bars, PMID links, and buy CTAs
 * - Compound cards for TNiC-available interventions with direct library/product links
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ExternalLink, ShoppingBag, FlaskConical, ArrowRight,
  AlertCircle, Dna, Zap, Activity, Flame, Layers, Brain,
  Microscope, Leaf, Stethoscope,
} from 'lucide-react';
import type { HallmarkLibraryEntry, HallmarkIntervention } from '@/lib/types';
import { compounds } from '@/lib/data';
import { getHallmarkVisual } from '@/lib/hallmark-visuals';

// ── Colour system ────────────────────────────────────────────────────────────

const VISUAL_GRADIENTS: Record<HallmarkLibraryEntry['visual'], string> = {
  dna:         'from-cyan-500/20 via-cyan-500/5 to-transparent',
  telomere:    'from-violet-500/20 via-violet-500/5 to-transparent',
  epigenetic:  'from-emerald-500/20 via-emerald-500/5 to-transparent',
  protein:     'from-amber-500/20 via-amber-500/5 to-transparent',
  autophagy:   'from-rose-500/20 via-rose-500/5 to-transparent',
  mito:        'from-orange-500/20 via-orange-500/5 to-transparent',
  senescence:  'from-pink-500/20 via-pink-500/5 to-transparent',
  stem:        'from-sky-500/20 via-sky-500/5 to-transparent',
  signaling:   'from-purple-500/20 via-purple-500/5 to-transparent',
  inflammation:'from-red-500/20 via-red-500/5 to-transparent',
  gut:         'from-lime-500/20 via-lime-500/5 to-transparent',
  nutrient:    'from-teal-500/20 via-teal-500/5 to-transparent',
};

const VISUAL_ICONS: Record<HallmarkLibraryEntry['visual'], typeof Dna> = {
  dna:         Dna,
  telomere:    Activity,
  epigenetic:  Layers,
  protein:     Microscope,
  autophagy:   Zap,
  mito:        Flame,
  senescence:  AlertCircle,
  stem:        Leaf,
  signaling:   Brain,
  inflammation:Flame,
  gut:         Activity,
  nutrient:    Zap,
};

const EVIDENCE_COLORS: Record<string, string> = {
  A: '#00da7e',
  B: '#00bdbe',
  C: '#fbbf24',
};

const CATEGORY_ICONS: Record<HallmarkIntervention['category'], typeof FlaskConical> = {
  compound:  FlaskConical,
  lifestyle: Leaf,
  clinical:  Stethoscope,
  emerging:  Microscope,
};

// ── Coverage arc SVG ─────────────────────────────────────────────────────────

function CoverageArc({ coverage, color }: { coverage: number; color: string }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (coverage / 100) * circ;
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" aria-label={`${coverage}% hallmark coverage`}>
      <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <circle
        cx="55" cy="55" r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 55 55)"
        style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
      />
      <text x="55" y="51" textAnchor="middle" fontSize="18" fontWeight="800" fill={color} fontFamily="monospace">
        {coverage}
      </text>
      <text x="55" y="65" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="system-ui">
        COVERED
      </text>
    </svg>
  );
}

// ── Impact bar ───────────────────────────────────────────────────────────────

function ImpactBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-mono font-bold w-8 text-right" style={{ color }}>
        {value}/10
      </span>
    </div>
  );
}

// ── Intervention card ─────────────────────────────────────────────────────────

function InterventionCard({
  item,
  index,
  accentColor,
}: {
  item: HallmarkIntervention;
  index: number;
  accentColor: string;
}) {
  const compound = item.compoundId ? compounds.find((c) => c.id === item.compoundId) : null;
  const CategoryIcon = CATEGORY_ICONS[item.category];
  const tierColor = EVIDENCE_COLORS[item.evidence] ?? '#94a3b8';

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-xl p-4 flex gap-4"
      style={{
        background: item.tnicAvailable
          ? `color-mix(in oklab, ${accentColor} 5%, rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.02)',
        border: item.tnicAvailable
          ? `1px solid color-mix(in oklab, ${accentColor} 20%, transparent)`
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Rank bubble */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-sm"
        style={{
          background: index === 0
            ? `color-mix(in oklab, ${accentColor} 20%, transparent)`
            : 'rgba(255,255,255,0.05)',
          color: index === 0 ? accentColor : 'rgba(255,255,255,0.4)',
        }}
      >
        {item.rank}
      </div>

      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h4 className="text-sm font-bold text-white/90">{item.name}</h4>

          {/* Evidence tier */}
          <span
            className="text-[10px] font-bold font-mono rounded px-1.5 py-0.5"
            style={{
              color: tierColor,
              border: `1px solid color-mix(in oklab, ${tierColor} 40%, transparent)`,
            }}
          >
            Tier {item.evidence}
          </span>

          {/* Category */}
          <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
            <CategoryIcon className="w-3 h-3" aria-hidden="true" />
            {item.category}
          </span>

          {/* TNiC available badge */}
          {item.tnicAvailable && (
            <span
              className="text-[10px] font-bold rounded px-1.5 py-0.5"
              style={{
                color: accentColor,
                background: `color-mix(in oklab, ${accentColor} 12%, transparent)`,
              }}
            >
              ✓ TNiC
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-white/55 leading-relaxed mb-2">{item.description}</p>

        {/* Impact bar */}
        <ImpactBar value={item.impact} color={tierColor} />

        {/* Action row */}
        <div className="flex flex-wrap gap-2 mt-3">
          {compound && (
            <Link
              href={`/library/compounds/${compound.id}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 transition-colors"
              style={{
                background: `color-mix(in oklab, ${accentColor} 12%, transparent)`,
                color: accentColor,
                border: `1px solid color-mix(in oklab, ${accentColor} 25%, transparent)`,
              }}
            >
              <FlaskConical className="w-3 h-3" aria-hidden="true" />
              Deep Dive
            </Link>
          )}
          {compound && (
            <Link
              href={`/products#${compound.id}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-lg px-2.5 py-1.5 transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <ShoppingBag className="w-3 h-3" aria-hidden="true" />
              Buy
            </Link>
          )}
          {item.pmid && (
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono rounded-lg px-2.5 py-1.5 transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#00bdbe',
              }}
            >
              PMID {item.pmid}
              <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function HallmarkDeepDive({ hallmark }: { hallmark: HallmarkLibraryEntry }) {
  const meta = getHallmarkVisual(hallmark.visual);
  const VisualIcon = VISUAL_ICONS[hallmark.visual] ?? Dna;
  const gradient = VISUAL_GRADIENTS[hallmark.visual];
  // Resolve the CSS variable to a concrete color for SVG
  const svgColor = {
    'var(--accent-cyan)': '#00e0ff',
    'var(--accent-violet)': '#c084fc',
    'var(--accent-emerald)': '#34d399',
    'var(--accent-amber)': '#fbbf24',
    'var(--accent-rose)': '#f472b6',
  }[meta.colorVar] ?? '#00e0ff';

  const topInterventions = useMemo(
    () => [...hallmark.interventions].sort((a, b) => a.rank - b.rank),
    [hallmark.interventions],
  );

  const tnicCompounds = topInterventions.filter((i) => i.tnicAvailable && i.compoundId);
  const coverageColor = hallmark.coverage >= 70 ? '#34d399' : hallmark.coverage >= 40 ? '#00e0ff' : '#fbbf24';

  return (
    <motion.article
      key={hallmark.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
      aria-label={`${hallmark.title} deep dive`}
    >
      {/* ── Hero banner ── */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradient}`}
        style={{ border: `1px solid color-mix(in oklab, ${svgColor} 20%, transparent)` }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${svgColor} 1px, transparent 1px), linear-gradient(90deg, ${svgColor} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Left: number + title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `color-mix(in oklab, ${svgColor} 15%, transparent)` }}
              >
                <VisualIcon className="w-5 h-5" style={{ color: svgColor }} aria-hidden="true" />
              </div>
              <span
                className="text-xs font-bold font-mono uppercase tracking-widest"
                style={{ color: svgColor }}
              >
                Hallmark #{hallmark.number}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white/95 leading-tight mb-2">
              {hallmark.title}
            </h2>
            <p className="text-sm text-white/55 italic mb-4">{hallmark.tagline}</p>
            <p className="text-sm text-white/70 leading-relaxed max-w-xl">{hallmark.summary}</p>
            <Link
              href={`/library/${hallmark.slug}`}
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold rounded-lg px-4 py-2 transition-opacity hover:opacity-80"
              style={{ background: svgColor, color: 'oklch(12% 0.02 255)' }}
            >
              Full Mechanism Deep Dive
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right: coverage arc */}
          <div className="shrink-0">
            <CoverageArc coverage={hallmark.coverage} color={coverageColor} />
          </div>
        </div>
      </div>

      {/* ── Why It Matters callout ── */}
      <div
        className="rounded-xl p-5 flex gap-4"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: svgColor }} aria-hidden="true" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: svgColor }}>
            Why It Matters
          </p>
          <p className="text-sm text-white/65 leading-relaxed">{hallmark.whyItMatters}</p>
        </div>
      </div>

      {/* ── Key molecules ── */}
      {hallmark.keyMolecules && hallmark.keyMolecules.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/40">
            Key Molecules & Pathways
          </p>
          <div className="flex flex-wrap gap-2">
            {hallmark.keyMolecules.map((mol) => (
              <span
                key={mol}
                className="text-xs font-mono rounded-full px-3 py-1"
                style={{
                  background: `color-mix(in oklab, ${svgColor} 8%, transparent)`,
                  border: `1px solid color-mix(in oklab, ${svgColor} 20%, transparent)`,
                  color: svgColor,
                }}
              >
                {mol}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Biomarkers ── */}
      {hallmark.biomarkers.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/40">
            Track These Biomarkers
          </p>
          <div className="flex flex-wrap gap-2">
            {hallmark.biomarkers.map((bm) => (
              <span
                key={bm}
                className="text-xs rounded-full px-3 py-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                📊 {bm}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── TNiC compound quick-access ── */}
      {tnicCompounds.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: svgColor }}>
            TNiC-Available Compounds for This Hallmark
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {tnicCompounds.map((item) => {
              const compound = compounds.find((c) => c.id === item.compoundId)!;
              const tierColor = EVIDENCE_COLORS[item.evidence] ?? '#94a3b8';
              return (
                <div
                  key={item.id}
                  className="rounded-xl p-4 flex flex-col gap-3"
                  style={{
                    background: `color-mix(in oklab, ${tierColor} 6%, rgba(255,255,255,0.02))`,
                    border: `1px solid color-mix(in oklab, ${tierColor} 18%, transparent)`,
                  }}
                >
                  <div>
                    <span
                      className="text-[10px] font-bold font-mono rounded px-1.5 py-0.5 mb-2 inline-block"
                      style={{
                        color: tierColor,
                        border: `1px solid color-mix(in oklab, ${tierColor} 40%, transparent)`,
                      }}
                    >
                      Tier {item.evidence}
                    </span>
                    <p className="text-sm font-bold text-white/90">{compound.name}</p>
                    <p className="text-[11px] text-white/45 mt-0.5">{compound.pathway}</p>
                  </div>
                  <p className="text-[11px] text-white/55 leading-relaxed flex-1">{item.description}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/library/compounds/${compound.id}`}
                      className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold rounded-lg py-2 transition-colors"
                      style={{
                        background: `color-mix(in oklab, ${tierColor} 12%, transparent)`,
                        color: tierColor,
                        border: `1px solid color-mix(in oklab, ${tierColor} 25%, transparent)`,
                      }}
                    >
                      <FlaskConical className="w-3 h-3" aria-hidden="true" />
                      Library
                    </Link>
                    <Link
                      href={`/products#${compound.id}`}
                      className="flex items-center justify-center gap-1 text-[11px] rounded-lg px-3 py-2 transition-colors"
                      style={{
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.45)',
                      }}
                    >
                      <ShoppingBag className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Full intervention ranking ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/40">
          All Interventions — Ranked by Evidence & Impact
        </p>
        <div className="space-y-3">
          {topInterventions.map((item, i) => (
            <InterventionCard
              key={item.id}
              item={item}
              index={i}
              accentColor={svgColor}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
