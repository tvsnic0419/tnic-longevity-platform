'use client';

/**
 * JournalCredibilityStrip — "As Seen In The Research"
 *
 * A continuously scrolling marquee of real journals cited in the TNiC
 * PMID database. Pauses on hover. Respects prefers-reduced-motion.
 * No fabricated affiliations — every journal listed has a real citation.
 */

import { useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { citedJournals, TOTAL_PMID_CITATIONS, type JournalEntry } from '@/lib/journal-credibility';

const TIER_STYLES: Record<JournalEntry['tier'], CSSProperties> = {
  flagship: {
    color: 'oklch(92% 0.01 250)',
    fontWeight: 700,
    fontSize: '0.9rem',
    letterSpacing: '-0.02em',
  },
  high: {
    color: 'oklch(75% 0.012 250)',
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  solid: {
    color: 'oklch(60% 0.012 250)',
    fontWeight: 500,
    fontSize: '0.82rem',
  },
};

const TIER_DOT: Record<JournalEntry['tier'], string> = {
  flagship: '#00da7e',
  high: '#00bdbe',
  solid: '#a78bfa',
};

function JournalPill({ journal }: { journal: JournalEntry }) {
  return (
    <a
      href={journal.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${journal.fullName} — ${journal.context}`}
      aria-label={`${journal.fullName}: ${journal.context}`}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full shrink-0 transition-all hover:scale-105"
      style={{
        background: 'oklch(16% 0.022 255)',
        border: `1px solid oklch(25% 0.02 255)`,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: TIER_DOT[journal.tier] }}
        aria-hidden="true"
      />
      <span style={TIER_STYLES[journal.tier]}>{journal.name}</span>
    </a>
  );
}

export function JournalCredibilityStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate the list for seamless infinite scroll
  const doubled = [...citedJournals, ...citedJournals];

  return (
    <section
      aria-label="Journals cited in TNiC research database"
      style={{
        background: 'oklch(11% 0.02 255)',
        borderTop: '1px solid oklch(22% 0.02 255)',
        borderBottom: '1px solid oklch(22% 0.02 255)',
      }}
    >
      {/* Header row */}
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: '#00da7e' }}
          >
            As Seen In The Research
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: 'oklch(55% 0.012 250)' }}
          >
            Every recommendation traces to a peer-reviewed citation in one of these journals.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p
              className="text-2xl font-black font-mono leading-none"
              style={{ color: 'oklch(92% 0.01 250)' }}
            >
              {TOTAL_PMID_CITATIONS}
            </p>
            <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'oklch(55% 0.012 250)' }}>
              PMID citations
            </p>
          </div>
          <div
            className="w-px h-8 self-center"
            style={{ background: 'oklch(25% 0.02 255)' }}
            aria-hidden="true"
          />
          <div className="text-right">
            <p
              className="text-2xl font-black font-mono leading-none"
              style={{ color: 'oklch(92% 0.01 250)' }}
            >
              {citedJournals.length}
            </p>
            <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'oklch(55% 0.012 250)' }}>
              journals cited
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div
        className="relative overflow-hidden pb-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-3 journal-marquee"
          aria-hidden="true"
          style={{ width: 'max-content' }}
        >
          {doubled.map((journal, i) => (
            <JournalPill key={`${journal.abbr}-${i}`} journal={journal} />
          ))}
        </div>
      </div>

      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {citedJournals.map((j) => (
          <li key={j.abbr}>
            <a href={j.url} target="_blank" rel="noopener noreferrer">
              {j.fullName}: {j.context}
            </a>
          </li>
        ))}
      </ul>

      {/* Disclaimer */}
      <p
        className="text-center text-[10px] pb-4 px-6"
        style={{ color: 'oklch(40% 0.01 250)' }}
      >
        TNiC is an independent educational platform. Journal logos are displayed solely to identify
        the peer-reviewed sources cited in our compound database. No affiliation or endorsement is implied.
      </p>
    </section>
  );
}
