'use client';

import { useState, useMemo, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Share2, Copy, CheckCircle2, ShoppingBag,
  Plus, Minus, Trophy, Zap,
} from 'lucide-react';
import { compounds, synergyScore } from '@/lib/data';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import {
  encodeScorecard, scorecardGrade, gradeColors, gradeLabels,
  buildShareText, type ScorecardPayload,
} from '@/lib/scorecard';

const TOKENS: CSSProperties = {
  ['--m-bg' as string]: 'oklch(13% 0.02 255)',
  ['--m-card' as string]: 'oklch(16% 0.022 255)',
  ['--m-border' as string]: 'oklch(25% 0.02 255)',
  ['--m-fg' as string]: 'oklch(92% 0.01 250)',
  ['--m-muted' as string]: 'oklch(60% 0.015 250)',
  ['--m-green' as string]: '#00da7e',
  ['--m-cyan' as string]: '#00bdbe',
  ['--m-violet' as string]: '#c084fc',
  ['--m-amber' as string]: '#fbbf24',
};

const TIER_COLORS: Record<string, string> = {
  A: '#00da7e',
  B: '#00bdbe',
  C: '#fbbf24',
};

// Compute hallmark coverage from selected compound IDs
function computeCoverage(selectedIds: string[]): number {
  if (selectedIds.length === 0) return 0;
  const covered = new Set<string>();
  for (const id of selectedIds) {
    const c = compounds.find((x) => x.id === id);
    if (c) c.hallmarks.forEach((h) => covered.add(h));
  }
  return Math.round((covered.size / hallmarkLibrary.length) * 100);
}

function computeCoveredHallmarks(selectedIds: string[]): string[] {
  const covered = new Set<string>();
  for (const id of selectedIds) {
    const c = compounds.find((x) => x.id === id);
    if (c) c.hallmarks.forEach((h) => covered.add(h));
  }
  return Array.from(covered);
}

// Animated grade ring
function GradeRing({ grade, size = 96 }: { grade: string; size?: number }) {
  const color = gradeColors[grade as keyof typeof gradeColors] ?? '#94a3b8';
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} 0%, color-mix(in oklab, ${color} 15%, transparent) 100%)`,
        boxShadow: `0 0 32px -4px ${color}55`,
      }}
    >
      <div
        className="absolute inset-1.5 rounded-full flex flex-col items-center justify-center"
        style={{ background: 'oklch(13% 0.02 255)' }}
      >
        <span className="text-3xl font-black leading-none" style={{ color }}>
          {grade}
        </span>
        <span className="text-[9px] font-medium mt-0.5" style={{ color: 'var(--m-muted)' }}>
          GRADE
        </span>
      </div>
    </div>
  );
}

// Horizontal coverage bar
function CoverageBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs" style={{ color: 'var(--m-muted)' }}>{label}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--m-border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function LongevityStackScorecard() {
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const synergy = useMemo(() => synergyScore(selected), [selected]);
  const coverage = useMemo(() => computeCoverage(selected), [selected]);
  const coveredHallmarkIds = useMemo(() => computeCoveredHallmarks(selected), [selected]);

  const payload: ScorecardPayload = useMemo(
    () => ({ age: 0, bioAge: 0, synergy, coverage, stackSize: selected.length }),
    [synergy, coverage, selected.length],
  );

  const grade = scorecardGrade(payload);
  const gradeColor = gradeColors[grade];
  const gradeLabel = gradeLabels[grade];
  const shareCode = encodeScorecard(payload);
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/scorecard/${shareCode}`
    : `https://tnic.help/scorecard/${shareCode}`;
  const shareText = buildShareText(payload);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const tweetText = encodeURIComponent(`${shareText}\n${shareUrl}`);

  return (
    <div style={TOKENS} className="w-full space-y-6">
      {/* Compound selector */}
      <div>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--m-muted)' }}>
          Select your current supplements — or build your ideal stack:
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {compounds.map((c) => {
            const active = selected.includes(c.id);
            const tierColor = TIER_COLORS[c.evidence] ?? '#94a3b8';
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className="flex items-center gap-3 rounded-xl p-3 text-left transition-all"
                style={{
                  background: active
                    ? `color-mix(in oklab, ${tierColor} 10%, var(--m-card))`
                    : 'var(--m-card)',
                  border: active
                    ? `1px solid color-mix(in oklab, ${tierColor} 50%, transparent)`
                    : '1px solid var(--m-border)',
                }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    background: active
                      ? `color-mix(in oklab, ${tierColor} 20%, transparent)`
                      : 'var(--m-border)',
                    color: active ? tierColor : 'var(--m-muted)',
                  }}
                >
                  {active ? (
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold truncate"
                    style={{ color: active ? 'var(--m-fg)' : 'var(--m-muted)' }}
                  >
                    {c.name}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: 'var(--m-muted)' }}>
                    Tier {c.evidence} · {c.pathway.split(' ')[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live score panel */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-2xl p-6"
            style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Grade ring */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <GradeRing grade={grade} />
                <p className="text-xs font-medium text-center" style={{ color: gradeColor }}>
                  {gradeLabel}
                </p>
              </div>

              {/* Bars */}
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <p className="text-sm font-bold mb-3" style={{ color: 'var(--m-fg)' }}>
                    Your Stack: {selected.length} compound{selected.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-3">
                    <CoverageBar
                      label="Hallmark Coverage"
                      value={coverage}
                      color="var(--m-green)"
                    />
                    <CoverageBar
                      label="Synergy Score"
                      value={synergy}
                      color="var(--m-cyan)"
                    />
                  </div>
                </div>

                {/* Covered hallmarks */}
                {coveredHallmarkIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {coveredHallmarkIds.map((hid) => {
                      const h = hallmarkLibrary.find((x) => x.id === hid);
                      return h ? (
                        <span
                          key={hid}
                          className="text-[10px] rounded-full px-2 py-0.5"
                          style={{
                            color: 'var(--m-green)',
                            border: '1px solid color-mix(in oklab, var(--m-green) 30%, transparent)',
                          }}
                        >
                          ✓ {h.title}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Share section */}
            <div
              className="mt-5 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ borderTop: '1px solid var(--m-border)' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4" style={{ color: gradeColor }} aria-hidden="true" />
                  <p className="text-sm font-bold" style={{ color: 'var(--m-fg)' }}>
                    Share your grade
                  </p>
                </div>
                <p className="text-xs" style={{ color: 'var(--m-muted)' }}>
                  Friends see your grade, coverage, and can build theirs in 3 minutes.
                </p>
              </div>
              <div className="flex gap-2 shrink-0 flex-wrap">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
                  style={{
                    background: copied
                      ? 'color-mix(in oklab, var(--m-green) 15%, transparent)'
                      : 'var(--m-card)',
                    border: '1px solid var(--m-border)',
                    color: copied ? 'var(--m-green)' : 'var(--m-muted)',
                  }}
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
                  style={{
                    background: 'color-mix(in oklab, var(--m-cyan) 10%, transparent)',
                    border: '1px solid color-mix(in oklab, var(--m-cyan) 30%, transparent)',
                    color: 'var(--m-cyan)',
                  }}
                >
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Post on 𝕏
                </a>
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                  Buy Stack
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {selected.length === 0 && (
        <div
          className="rounded-xl p-6 text-center"
          style={{ border: '1px dashed var(--m-border)' }}
        >
          <Zap className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--m-muted)' }} aria-hidden="true" />
          <p className="text-sm" style={{ color: 'var(--m-muted)' }}>
            Select compounds above to see your live grade, hallmark coverage, and synergy score.
          </p>
        </div>
      )}
    </div>
  );
}
