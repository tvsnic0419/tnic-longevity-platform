'use client';

import { useState, type CSSProperties } from 'react';
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
  Menu,
  X,
} from 'lucide-react';
import { homeStats, hallmarkTiles } from '@/lib/home-stats';

/**
 * Manus-baseline homepage.
 *
 * A faithful 1:1 rebuild of the reference design at tnic-longev-av5urgzz.manus.space —
 * restrained, editorial, one green accent, generous negative space. All colour tokens are
 * scoped to `.manus-root` via inline CSS custom properties so the rest of the site's design
 * system is untouched.
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

const NAV = [
  { label: 'Supplement Library', href: '/library' },
  { label: 'Aging Pathways', href: '/hallmarks' },
  { label: 'Synergy Matrix', href: '/stacks' },
  { label: 'Protocol Builder', href: '/quiz' },
  { label: 'AI Analysis', href: '/tools' },
];

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

function BrandMark({ size = 'nav' }: { size?: 'nav' | 'footer' }) {
  const box = size === 'nav' ? 'w-8 h-8' : 'w-6 h-6';
  const text = size === 'nav' ? 'text-xl' : 'text-base';
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`${box} rounded-lg flex items-center justify-center`}
        style={{ background: 'color-mix(in oklab, var(--m-green) 16%, transparent)' }}
      >
        <FlaskConical className="w-4 h-4" style={{ color: 'var(--m-green)' }} aria-hidden="true" />
      </span>
      <span className={`${text} font-bold tracking-tight`} style={{ color: 'var(--m-fg)' }}>
        TNiC
      </span>
    </span>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="manus-root min-h-screen w-full"
      style={{ ...TOKENS, background: 'var(--m-bg)', color: 'var(--m-fg)' }}
    >
      {/* ── Nav ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: 'color-mix(in oklab, var(--m-bg) 82%, transparent)',
          borderBottom: '1px solid var(--m-border)',
        }}
      >
        <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="focus-ring rounded-md" onClick={() => setMenuOpen(false)}>
            <BrandMark />
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--m-muted)' }}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[color:var(--m-fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="focus-ring md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-lg"
            style={{ color: 'var(--m-fg)' }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="md:hidden"
            style={{ borderTop: '1px solid var(--m-border)', background: 'var(--m-bg)' }}
          >
            <ul className="mx-auto max-w-7xl px-6 py-3 flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="focus-ring block py-3 text-sm transition-colors hover:text-[color:var(--m-green)]"
                    style={{ color: 'var(--m-fg)', borderBottom: '1px solid var(--m-border)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        {/* ── Hero ── */}
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
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

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--m-border)' }}>
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2">
            <BrandMark size="footer" />
            <span className="text-xs" style={{ color: 'var(--m-muted)' }}>
              Evidence-Based Longevity
            </span>
          </span>
          <p className="text-xs text-center sm:text-right" style={{ color: 'var(--m-muted)' }}>
            Educational resource only. Not medical advice. Consult a healthcare provider before
            starting any supplement protocol.
          </p>
        </div>
      </footer>
    </div>
  );
}
