'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Scan, BookOpen, LayoutDashboard, ShoppingBag, ArrowUpRight, Zap } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { buildShopPresetUrl } from '@/lib/stack-url';
import type { PresetKey } from '@/lib/presets';

type AccentKey = 'cyan' | 'rose' | 'emerald' | 'amber';

const basePaths = [
  {
    icon: BookOpen,
    label: '01',
    title: 'Anti-Aging Library',
    desc: 'Hallmarks, compounds, synergies — full-text search with PMID-cited evidence tiers.',
    href: '/library',
    cta: 'Search Library',
    accent: 'cyan' as AccentKey,
    stat: '50 compounds',
  },
  {
    icon: Scan,
    label: '02',
    title: 'Bio Age Defense Scan',
    desc: 'Score 5 biomarker domains, get a biological age estimate, set your OS profile locally.',
    href: '/bio-age',
    cta: 'Run Scan',
    accent: 'rose' as AccentKey,
    stat: '5 domains',
  },
  {
    icon: LayoutDashboard,
    label: '03',
    title: 'Command Center',
    desc: 'Stack, labs, milestones, hallmark coverage grid — your entire OS in one view.',
    href: '/dashboard',
    cta: 'Open Dashboard',
    accent: 'emerald' as AccentKey,
    stat: 'Zero accounts',
  },
  {
    icon: ShoppingBag,
    label: '04',
    title: 'Protocol Shop',
    desc: 'Stack-filtered COA checklists and quality red flags. TNiC earns $0 from products.',
    href: '/shop',
    cta: 'Verify Quality',
    accent: 'amber' as AccentKey,
    stat: 'Unbiased',
  },
];

const cfg: Record<AccentKey, {
  grad: string;
  border: string;
  topBar: string;
  iconBg: string;
  iconText: string;
  ctaText: string;
  glow: string;
  statText: string;
  labelText: string;
}> = {
  cyan: {
    grad: 'from-accent-cyan/[0.10] via-accent-cyan/[0.04] to-transparent',
    border: 'border-accent-cyan/20 hover:border-accent-cyan/50',
    topBar: 'from-accent-cyan to-accent-emerald',
    iconBg: 'icon-badge-cyan',
    iconText: 'text-accent-cyan',
    ctaText: 'text-accent-cyan',
    glow: 'glow-hover-cyan',
    statText: 'text-accent-cyan',
    labelText: 'text-accent-cyan/50',
  },
  rose: {
    grad: 'from-accent-rose/[0.10] via-accent-rose/[0.04] to-transparent',
    border: 'border-accent-rose/20 hover:border-accent-rose/50',
    topBar: 'from-accent-rose to-accent-violet',
    iconBg: 'icon-badge-rose',
    iconText: 'text-accent-rose',
    ctaText: 'text-accent-rose',
    glow: 'glow-hover-rose',
    statText: 'text-accent-rose',
    labelText: 'text-accent-rose/50',
  },
  emerald: {
    grad: 'from-accent-emerald/[0.10] via-accent-emerald/[0.04] to-transparent',
    border: 'border-accent-emerald/20 hover:border-accent-emerald/50',
    topBar: 'from-accent-emerald to-accent-cyan',
    iconBg: 'icon-badge-emerald',
    iconText: 'text-accent-emerald',
    ctaText: 'text-accent-emerald',
    glow: 'glow-hover-emerald',
    statText: 'text-accent-emerald',
    labelText: 'text-accent-emerald/50',
  },
  amber: {
    grad: 'from-accent-amber/[0.10] via-accent-amber/[0.04] to-transparent',
    border: 'border-accent-amber/20 hover:border-accent-amber/50',
    topBar: 'from-accent-amber to-accent-rose',
    iconBg: 'icon-badge-amber',
    iconText: 'text-accent-amber',
    ctaText: 'text-accent-amber',
    glow: 'glow-hover-amber',
    statText: 'text-accent-amber',
    labelText: 'text-accent-amber/50',
  },
};

export function HomepageCTA() {
  const { quizResult } = usePlatform();
  const shopHref =
    quizResult?.preset && quizResult.preset in { starter: 1, nrf2: 1, mito: 1, hybrid: 1 }
      ? buildShopPresetUrl(quizResult.preset as PresetKey)
      : '/shop';

  const paths = basePaths.map((p) =>
    p.title === 'Protocol Shop' ? { ...p, href: shopHref } : p,
  );

  return (
    <section className="py-24 md:py-32 relative overflow-hidden border-b border-border">
      {/* Deep ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[500px] rounded-full bg-accent-cyan/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-accent-violet/[0.06] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent-emerald/[0.03] blur-[160px]" />
      </div>

      <div className="relative container-page">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-accent-violet/60" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-accent-violet uppercase">Entry Points</span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-accent-violet/60" />
          </div>
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.0] mb-5">
              Four ways in.{' '}
              <br className="hidden sm:block" />
              <span className="headline-gradient">One destination.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Learn the science, scan your biology, command your protocol, verify your sources.
              Every path leads to the same local-first OS — no account, no paywall, no agenda.
            </p>
          </div>
        </motion.div>

        {/* Editorial stat numbers — the numbers that matter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-2xl"
        >
          {[
            { n: '50', label: 'Compounds indexed', color: 'text-accent-cyan' },
            { n: '12', label: 'Hallmarks mapped',  color: 'text-accent-violet' },
            { n: '$0', label: 'Revenue from you',  color: 'text-accent-emerald' },
          ].map(({ n, label, color }) => (
            <div key={n} className="flex flex-col">
              <span className={`text-5xl md:text-6xl font-black tracking-[-0.04em] leading-none ${color}`}>{n}</span>
              <span className="text-[11px] font-mono text-muted-foreground/70 mt-2 leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Four path cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {paths.map((path, i) => {
            const c = cfg[path.accent];
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={path.href}
                  className={[
                    'focus-ring group relative flex flex-col h-full overflow-hidden rounded-2xl border transition-all duration-300',
                    'bg-gradient-to-br', c.grad,
                    c.border,
                    c.glow,
                    'min-h-[240px]',
                  ].join(' ')}
                >
                  {/* Colored top bar */}
                  <div className={`h-px w-full bg-gradient-to-r ${c.topBar} opacity-60`} />

                  <div className="flex flex-col flex-1 p-6">
                    {/* Icon + label row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-5 h-5 ${c.iconText}`} aria-hidden="true" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold ${c.labelText}`}>{path.label}</span>
                    </div>

                    <h3 className="font-bold text-base leading-tight mb-2">{path.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-5">{path.desc}</p>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.ctaText} group-hover:gap-2.5 transition-all duration-300`}>
                        {path.cta}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                      </span>
                      <span className={`text-[10px] font-mono ${c.statText} opacity-60`}>{path.stat}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Hero CTA block — editorial terminal style */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-accent-violet/20 bg-gradient-to-br from-accent-violet/[0.08] via-accent-cyan/[0.04] to-transparent"
        >
          {/* Internal glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent-violet/[0.12] blur-[80px] rounded-full pointer-events-none" />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent" />

          <div className="relative p-10 md:p-14 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-accent-violet/25 bg-accent-violet/8 text-[11px] font-mono font-bold text-accent-violet tracking-widest uppercase">
              <Zap className="w-3 h-3" aria-hidden="true" />
              Your OS awaits
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-[1.05]">
              Everything in one place.
              <br />
              <span className="text-foreground/50">Free. Local. Yours.</span>
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Stack architect, lab hub, 12-hallmark library, six evidence tools — all running in your browser with zero accounts required. Your health data never touches our servers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="focus-ring btn-gradient group text-base px-8 py-3.5"
              >
                <LayoutDashboard className="w-5 h-5" />
                Launch Longevity OS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/quiz"
                className="focus-ring btn-ghost-premium text-base px-8 py-3.5 border-accent-violet/30 text-accent-violet hover:border-accent-violet/60"
              >
                Take the quiz first
              </Link>
            </div>

            {/* Trust micro-copy row */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[11px] font-mono text-muted-foreground/60">
              <span>No account</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
              <span>localStorage only</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
              <span>No paywall. Ever.</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
              <span>Not medical advice</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
