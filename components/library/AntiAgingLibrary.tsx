'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Library, Network } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { PageHeader } from '@/components/ui/PageHeader';
import { HallmarkDeepDive } from './HallmarkDeepDive';

interface AntiAgingLibraryProps {
  /** Use h1 when rendered as dedicated /library page */
  asPageTitle?: boolean;
}

export function AntiAgingLibrary({ asPageTitle = false }: AntiAgingLibraryProps) {
  const [selected, setSelected] = useState(hallmarkLibrary[0].id);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return hallmarkLibrary;
    const q = query.toLowerCase();
    return hallmarkLibrary.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.interventions.some((i) => i.name.toLowerCase().includes(q)),
    );
  }, [query]);

  const active = hallmarkLibrary.find((h) => h.id === selected)!;

  return (
    <section
      id="anti-aging-library"
      aria-labelledby="library-heading"
      className="py-8 md:py-12 bg-background border-b border-border"
    >
      <div className="container-page">
        <PageHeader
          id="library-heading"
          icon={Library}
          eyebrow="Anti-Aging Library"
          title="The 12 Hallmarks of Aging"
          description="Each hallmark explained with mechanism visuals, evidence-ranked interventions, PubMed citations, and direct compound links. Select a hallmark to explore."
          theme="cyan"
          as={asPageTitle ? 'h1' : 'h2'}
        />

        {/* Systems Map CTA */}
        <div className="flex justify-center mb-6">
          <Link
            href="/library/systems"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-violet glass glass-hover px-5 py-2.5 rounded-full glow-hover-violet transition"
          >
            <Network className="w-4 h-4" />
            Explore Systems Map — cross-hallmark synthesis
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {!asPageTitle && (
          <div className="relative max-w-lg mx-auto mb-8 md:mb-10">
            <label htmlFor="hallmark-search" className="sr-only">
              Search hallmarks or interventions
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <input
              id="hallmark-search"
              type="search"
              placeholder="Search hallmarks or interventions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-base pl-11"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Hallmark selector sidebar */}
          <nav className="lg:col-span-4" aria-label="Hallmark list">
            <p className="text-label text-accent-cyan mb-3 hidden lg:block">Select hallmark</p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 max-h-none lg:max-h-[40rem] lg:overflow-y-auto lg:pr-1 scroll-region"
              role="list"
            >
              {filtered.map((h) => {
                const isActive = selected === h.id;
                const coverageColor =
                  h.coverage >= 70
                    ? 'var(--accent-emerald)'
                    : h.coverage >= 40
                    ? 'var(--accent-cyan)'
                    : 'var(--accent-amber)';
                const arcPct = h.coverage / 100;
                const r = 14;
                const circ = Math.PI * r;
                const dashOffset = circ * (1 - arcPct);
                return (
                  <button
                    key={h.id}
                    role="listitem"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setSelected(h.id)}
                    className={`focus-ring interactive text-left p-4 min-h-[var(--space-touch)] rounded-xl transition-all ${
                      isActive
                        ? 'bg-accent-cyan/10 border border-accent-cyan/30 shadow-[0_0_20px_-4px_rgba(0,224,255,0.25)]'
                        : 'glass glass-hover'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-label">#{h.number}</span>
                        <h3 className="heading-card mt-1 leading-snug">{h.title}</h3>
                      </div>
                      {/* Mini coverage arc */}
                      <svg
                        width="38" height="22"
                        viewBox="0 0 38 22"
                        aria-label={`${h.coverage}% coverage`}
                        className="shrink-0 mt-0.5"
                      >
                        <path
                          d={`M 5,19 A ${r},${r} 0 0,1 33,19`}
                          fill="none"
                          stroke="currentColor"
                          strokeOpacity="0.12"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <path
                          d={`M 5,19 A ${r},${r} 0 0,1 33,19`}
                          fill="none"
                          stroke={coverageColor}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray={`${circ}`}
                          strokeDashoffset={`${dashOffset}`}
                        />
                        <text
                          x="19" y="16"
                          textAnchor="middle"
                          fontSize="7"
                          fontFamily="monospace"
                          fill={coverageColor}
                          fontWeight="700"
                        >
                          {h.coverage}
                        </text>
                      </svg>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-label" style={{ color: coverageColor }}>{h.coverage}% covered</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Rich deep-dive detail panel */}
          <div className="lg:col-span-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <HallmarkDeepDive key={active.id} hallmark={active} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
