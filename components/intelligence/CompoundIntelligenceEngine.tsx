'use client';

import { useState, useRef, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search, Sparkles, ArrowRight, ExternalLink, Zap, FlaskConical,
  ChevronRight, RotateCcw, ShoppingBag,
} from 'lucide-react';
import {
  runIntelligenceEngine,
  INTELLIGENCE_EXAMPLE_QUERIES,
  type IntelligenceResult,
  type CompoundRecommendation,
} from '@/lib/intelligence-engine';

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

function EvidencePill({ tier }: { tier: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wide"
      style={{
        color: TIER_COLORS[tier] ?? '#94a3b8',
        border: `1px solid color-mix(in oklab, ${TIER_COLORS[tier] ?? '#94a3b8'} 40%, transparent)`,
      }}
    >
      Tier {tier}
    </span>
  );
}

function RecommendationCard({ rec, index }: { rec: CompoundRecommendation; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="rounded-xl p-5 flex flex-col gap-3 hover:border-[color:var(--m-green)] transition-colors"
      style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <EvidencePill tier={rec.compound.evidence} />
            {rec.matchedIntents.slice(0, 2).map((intent) => (
              <span
                key={intent}
                className="text-[10px] font-medium rounded px-1.5 py-0.5 capitalize"
                style={{
                  color: 'var(--m-cyan)',
                  background: 'color-mix(in oklab, var(--m-cyan) 10%, transparent)',
                }}
              >
                {intent}
              </span>
            ))}
          </div>
          <h3 className="text-base font-bold" style={{ color: 'var(--m-fg)' }}>
            {rec.compound.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--m-muted)' }}>
            {rec.compound.pathway}
          </p>
        </div>
        <div
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
          style={{
            background: 'color-mix(in oklab, var(--m-green) 12%, transparent)',
            color: 'var(--m-green)',
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* Why this compound */}
      <p className="text-xs leading-relaxed" style={{ color: 'var(--m-muted)' }}>
        {rec.primaryReason}
      </p>

      {/* Dose + hallmarks */}
      <div className="flex flex-wrap gap-2">
        <span
          className="text-[11px] font-mono rounded px-2 py-0.5"
          style={{
            color: 'var(--m-amber)',
            background: 'color-mix(in oklab, var(--m-amber) 10%, transparent)',
          }}
        >
          {rec.compound.dose}
        </span>
        {rec.hallmarkNames.slice(0, 2).map((h) => (
          <span
            key={h}
            className="text-[10px] rounded px-1.5 py-0.5"
            style={{
              color: 'var(--m-muted)',
              border: '1px solid var(--m-border)',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-1">
        <Link
          href={rec.libraryUrl}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors hover:opacity-90"
          style={{
            background: 'color-mix(in oklab, var(--m-green) 15%, transparent)',
            color: 'var(--m-green)',
            border: '1px solid color-mix(in oklab, var(--m-green) 30%, transparent)',
          }}
        >
          <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
          Deep Dive
        </Link>
        <Link
          href={rec.productUrl}
          className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
          style={{
            border: '1px solid var(--m-border)',
            color: 'var(--m-muted)',
          }}
        >
          <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
          Buy
        </Link>
        {rec.leadPmid && (
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${rec.leadPmid}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-mono transition-colors"
            style={{ border: '1px solid var(--m-border)', color: 'var(--m-cyan)' }}
          >
            PMID
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ResultsView({
  result,
  onReset,
}: {
  result: IntelligenceResult;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Query echo + confidence */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--m-muted)' }}>
            Analyzing:
          </p>
          <p className="text-sm font-semibold italic" style={{ color: 'var(--m-fg)' }}>
            &ldquo;{result.query}&rdquo;
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {result.parsed.intents.map((intent) => (
              <span
                key={intent}
                className="text-[11px] font-medium rounded-full px-2.5 py-0.5 capitalize"
                style={{
                  color: 'var(--m-green)',
                  border: '1px solid color-mix(in oklab, var(--m-green) 35%, transparent)',
                }}
              >
                {intent}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-2 transition-colors"
          style={{ border: '1px solid var(--m-border)', color: 'var(--m-muted)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          New query
        </button>
      </div>

      {/* Synergy callout */}
      {result.synergyNote && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 flex gap-3"
          style={{
            background: 'color-mix(in oklab, var(--m-violet) 8%, transparent)',
            border: '1px solid color-mix(in oklab, var(--m-violet) 30%, transparent)',
          }}
        >
          <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--m-violet)' }} aria-hidden="true" />
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--m-violet)' }}>
              Stack Synergy Detected
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--m-muted)' }}>
              {result.synergyNote}
            </p>
          </div>
        </motion.div>
      )}

      {/* Suggestion if low confidence */}
      {result.suggestedQuery && (
        <p className="text-xs" style={{ color: 'var(--m-muted)' }}>
          <span style={{ color: 'var(--m-amber)' }}>Tip:</span> {result.suggestedQuery}
        </p>
      )}

      {/* Recommendations grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.recommendations.map((rec, i) => (
          <RecommendationCard key={rec.compound.id} rec={rec} index={i} />
        ))}
      </div>

      {/* Hallmarks covered */}
      {result.hallmarksCovered.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--m-muted)' }}>
            Hallmarks addressed by this protocol:
          </p>
          <div className="flex flex-wrap gap-2">
            {result.hallmarksCovered.map((h) => (
              <span
                key={h}
                className="text-[11px] rounded-full px-2.5 py-0.5"
                style={{
                  color: 'var(--m-fg)',
                  border: '1px solid var(--m-border)',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA bridge */}
      <div
        className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
      >
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--m-fg)' }}>
            Ready to build your stack?
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--m-muted)' }}>
            Verify quality, check COAs, and buy from vetted brands.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            View Products
          </Link>
          <Link
            href="/library"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ border: '1px solid var(--m-border)', color: 'var(--m-fg)' }}
          >
            Library
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function CompoundIntelligenceEngine() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<IntelligenceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    // Simulate a brief "thinking" delay for UX — engine is synchronous
    setTimeout(() => {
      setResult(runIntelligenceEngine(trimmed));
      setLoading(false);
    }, 420);
  };

  const reset = () => {
    setResult(null);
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div style={TOKENS} className="w-full">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Search bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); run(query); }}
              className="relative"
            >
              <label htmlFor="intelligence-query" className="sr-only">
                Describe your health goal
              </label>
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ color: 'var(--m-muted)' }}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                id="intelligence-query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. I want more energy and less brain fog…"
                className="w-full pl-12 pr-32 py-4 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: 'var(--m-card)',
                  border: '1px solid var(--m-border)',
                  color: 'var(--m-fg)',
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = 'color-mix(in oklab, var(--m-green) 60%, transparent)')
                }
                onBlur={(e) => (e.target.style.borderColor = 'var(--m-border)')}
              />
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity disabled:opacity-40"
                style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                )}
                {loading ? 'Analyzing' : 'Analyze'}
              </button>
            </form>

            {/* Example queries */}
            <div>
              <p className="text-xs mb-3" style={{ color: 'var(--m-muted)' }}>
                Try an example:
              </p>
              <div className="flex flex-wrap gap-2">
                {INTELLIGENCE_EXAMPLE_QUERIES.map((eq) => (
                  <button
                    key={eq}
                    onClick={() => { setQuery(eq); run(eq); }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:border-[color:var(--m-green)]"
                    style={{
                      border: '1px solid var(--m-border)',
                      color: 'var(--m-muted)',
                    }}
                  >
                    <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                    {eq}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ResultsView result={result} onReset={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
