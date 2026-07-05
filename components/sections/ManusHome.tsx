'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Dna,
  Share2,
  Layers,
  Sparkles,
  Activity,
  ArrowRight,
  Beaker,
  ExternalLink,
} from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { homeStats, hallmarkTiles, featuredCompounds } from '@/lib/home-stats';

/**
 * Manus-baseline homepage.
 *
 * A faithful rebuild of the reference design at tnic-longev-av5urgzz.manus.space —
 * restrained, editorial, one green accent, generous negative space — using the
 * site-wide Nav and Footer so the homepage shares one chrome with the rest of
 * the platform. Section-local colour tokens are scoped to `.manus-root` via
 * inline CSS custom properties and only affect the page body between them.
 */

const TOKENS: CSSProperties = {
  ['--m-bg' as string]: 'oklch(13% 0.02 255)',
  ['--m-bg-2' as string]: 'oklch(11% 0.02 255)',
  ['--m-card' as string]: 'oklch(16% 0.022 255)',
  ['--m-border' as string]: 'oklch(25% 0.02 255)',
  ['--m-fg' as string]: 'oklch(92% 0.01 250)',
  ['--m-muted' as string]: 'oklch(60% 0.015 250)',
  ['--m-green' as string]: '#00da7e',
  ['--m-cyan' as string]: '#00bdbe',
};

const TIERS = [
  {
    tier: 'Tier A',
    accent: 'var(--m-green)',
    title: 'Robust Evidence',
    desc: 'Multiple randomized controlled trials in humans with consistent, reproducible results and clear mechanistic understanding.',
  },
  {
    tier: 'Tier B',
    accent: 'var(--m-cyan)',
    title: 'Emerging Evidence',
    desc: 'Promising human data from pilot studies or strong mechanistic rationale with ongoing clinical trials.',
  },
  {
    tier: 'Tier C',
    accent: 'var(--m-muted)',
    title: 'Preclinical Only',
    desc: 'Strong animal model data or in-vitro evidence only. No published human efficacy trials for longevity endpoints.',
  },
];

const FEATURES = [
  {
    Icon: FlaskConical,
    title: 'Supplement Library',
    desc: `${homeStats.compoundCount} compounds with full mechanism breakdowns, evidence tiers, and dosing context from published research.`,
    href: '/library',
  },
  {
    Icon: Dna,
    title: `${homeStats.hallmarkCount} Hallmarks of Aging`,
    desc: 'Understand the biological mechanisms of aging and which interventions target each pathway.',
    href: '/hallmarks',
  },
  {
    Icon: Share2,
    title: 'Synergy Matrix',
    desc: "Discover which compounds amplify each other's effects and the mechanistic rationale behind combinations.",
    href: '/stacks',
  },
  {
    Icon: Layers,
    title: 'Protocol Builder',
    desc: '3-step guided flow to build an evidence-matched supplement stack based on your goals and concerns.',
    href: '/quiz',
  },
  {
    Icon: Sparkles,
    title: 'AI Stack Analysis',
    desc: 'Select your compounds and get an AI-generated synergy report, interaction warnings, and pathway coverage.',
    href: '/tools',
  },
  {
    Icon: Activity,
    title: 'Health Prognostication',
    desc: 'Coming soon: AI-powered projections of long-term health outcomes from consistent supplement interventions.',
    href: '#prognostication',
    soon: true,
  },
];

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    try {
      await fetch('/api/brief/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'prognostication-waitlist' }),
      });
    } catch {
      /* waitlist is best-effort; the confirmation still shows */
    }
  }

  if (done) {
    return (
      <p className="text-sm font-medium" style={{ color: 'var(--m-green)' }}>
        You&apos;re on the list — we&apos;ll email you once at launch.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <label htmlFor="prognostication-email" className="sr-only">
        Email address
      </label>
      <input
        id="prognostication-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full sm:w-72 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--m-green)]"
        style={{
          background: 'var(--m-bg-2)',
          border: '1px solid var(--m-border)',
          color: 'var(--m-fg)',
        }}
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        Notify Me
      </button>
    </form>
  );
}

export function ManusHome() {
  // The reference design is dark-only with no light variant — force dark
  // chrome while this page is mounted (shared Nav/Footer are theme-aware and
  // would otherwise clash with the page body's hardcoded dark palette).
  // DOM-only: doesn't touch the user's saved theme preference or localStorage,
  // and restores whatever was set before on unmount.
  useEffect(() => {
    const root = document.documentElement;
    const prevTheme = root.getAttribute('data-theme');
    const prevColorScheme = root.style.colorScheme;
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
    return () => {
      if (prevTheme) root.setAttribute('data-theme', prevTheme);
      root.style.colorScheme = prevColorScheme;
    };
  }, []);

  return (
    <>
      <Nav />
      <div
        className="manus-root min-h-screen w-full"
        style={{ ...TOKENS, background: 'var(--m-bg)', color: 'var(--m-fg)' }}
      >
        <main id="main-content" tabIndex={-1}>
        {/* ── Hero ── */}
        <section className="mx-auto max-w-7xl px-6 pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                border: '1px solid color-mix(in oklab, var(--m-green) 40%, transparent)',
                color: 'var(--m-green)',
                background: 'color-mix(in oklab, var(--m-green) 8%, transparent)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--m-green)' }} />
              {homeStats.compoundCount} Compounds Indexed
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                border: '1px solid color-mix(in oklab, var(--m-cyan) 40%, transparent)',
                color: 'var(--m-cyan)',
              }}
            >
              {homeStats.tierACount} Tier A (Human Trials)
            </span>
          </div>

          <h1
            className="max-w-4xl font-bold tracking-tight leading-[1.03] text-[clamp(2.75rem,7vw,5rem)]"
            style={{ color: 'var(--m-fg)' }}
          >
            Evidence-graded longevity{' '}
            <span style={{ color: 'var(--m-green)' }}>compounds</span>, mapped to aging biology.
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--m-muted)' }}
          >
            Explore supplement interventions ranked by human trial evidence. Understand
            mechanisms, aging pathway targets, and synergistic combinations — no marketing
            rhetoric, only data.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/library"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
            >
              <Beaker className="w-4 h-4" aria-hidden="true" />
              Explore the Library
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/quiz"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors hover:border-[color:var(--m-fg)]"
              style={{ border: '1px solid var(--m-border)', color: 'var(--m-fg)' }}
            >
              Build Your Protocol
            </Link>
          </div>
        </section>

        {/* ── Featured compounds ── */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--m-fg)' }}>
                Tier A, right now
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--m-muted)' }}>
                A sample from the catalog — every entry cites its source.
              </p>
            </div>
            <Link
              href="/library"
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[color:var(--m-green)]"
              style={{ color: 'var(--m-fg)' }}
            >
              Browse the full library
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCompounds.map((c) => (
              <div
                key={c.id}
                className="group relative rounded-xl p-5 transition-colors hover:border-[color:var(--m-green)]"
                style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
              >
                <span
                  className="inline-block rounded px-2 py-0.5 text-[10px] font-bold font-mono tracking-wide mb-3"
                  style={{
                    color: 'var(--m-green)',
                    border: '1px solid color-mix(in oklab, var(--m-green) 45%, transparent)',
                  }}
                >
                  Tier A
                </span>
                <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--m-fg)' }}>
                  <Link href="/stacks" className="focus-ring after:absolute after:inset-0">
                    {c.name}
                  </Link>
                </h3>
                <p className="text-xs mb-3" style={{ color: 'var(--m-muted)' }}>
                  {c.pathway}
                </p>
                <p className="text-xs font-mono mb-4" style={{ color: 'var(--m-muted)' }}>
                  {c.dose}
                </p>
                {c.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring relative z-10 inline-flex items-center gap-1 text-[11px] font-mono hover:underline"
                    style={{ color: 'var(--m-cyan)' }}
                  >
                    PMID {c.pmid}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Evidence tiers ── */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.tier}
                className="rounded-xl p-6"
                style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="rounded px-2 py-0.5 text-[11px] font-bold font-mono tracking-wide"
                    style={{
                      color: t.accent,
                      border: `1px solid color-mix(in oklab, ${t.accent} 45%, transparent)`,
                    }}
                  >
                    {t.tier}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--m-fg)' }}>
                    {t.title}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--m-muted)' }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--m-fg)' }}>
            Built for informed decision-making
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--m-muted)' }}>
            Every feature is designed to help you understand the science — not sell you a product.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ Icon, title, desc, href, soon }) => (
              <Link
                key={title}
                href={href}
                className="focus-ring group rounded-xl p-6 transition-colors"
                style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
              >
                <span
                  className="inline-flex w-10 h-10 rounded-lg items-center justify-center mb-5"
                  style={{ background: 'color-mix(in oklab, var(--m-green) 12%, transparent)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--m-green)' }} aria-hidden="true" />
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold" style={{ color: 'var(--m-fg)' }}>
                    {title}
                  </h3>
                  {soon && (
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        color: 'var(--m-cyan)',
                        border: '1px solid color-mix(in oklab, var(--m-cyan) 40%, transparent)',
                      }}
                    >
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--m-muted)' }}>
                  {desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 12 Hallmarks ── */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--m-fg)' }}>
                The {homeStats.hallmarkCount} Hallmarks of Aging
              </h2>
              <p className="mt-3 text-sm" style={{ color: 'var(--m-muted)' }}>
                Each hallmark mapped to evidence-based supplement interventions.
              </p>
            </div>
            <Link
              href="/hallmarks"
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:border-[color:var(--m-fg)]"
              style={{ border: '1px solid var(--m-border)', color: 'var(--m-fg)' }}
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {hallmarkTiles.map((h) => (
              <Link
                key={h.id}
                href={h.href}
                className="focus-ring rounded-lg p-4 text-center transition-colors hover:border-[color:var(--m-green)]"
                style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
              >
                <div className="text-sm font-medium leading-snug" style={{ color: 'var(--m-fg)' }}>
                  {h.title}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--m-muted)' }}>
                  {h.count === 1 ? '1 compound' : `${h.count} compounds`}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── AI Health Prognostication ── */}
        <section
          id="prognostication"
          className="scroll-mt-20"
          style={{ borderTop: '1px solid var(--m-border)', background: 'var(--m-bg-2)' }}
        >
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                color: 'var(--m-green)',
                border: '1px solid color-mix(in oklab, var(--m-green) 40%, transparent)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--m-green)' }} />
              In Development
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight" style={{ color: 'var(--m-fg)' }}>
              AI Health Prognostication
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--m-muted)' }}>
              Upload labs, track your supplement protocol over time, and receive AI-generated
              projections of how consistent interventions may influence your biological aging
              trajectory. Grounded in published longitudinal data.
            </p>
            <div className="mt-8">
              <EmailCapture />
            </div>
            <p className="mt-4 text-xs" style={{ color: 'var(--m-muted)' }}>
              No spam. One notification when the feature launches.
            </p>
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
