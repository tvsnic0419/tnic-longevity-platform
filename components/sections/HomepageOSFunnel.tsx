'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  FlaskConical,
  Library,
  Wand2,
  ArrowUpRight,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { getOsFunnelOrder } from '@/lib/homepage-personalization';

type AccentKey = 'emerald' | 'violet' | 'cyan' | 'amber' | 'rose';

interface OsPath {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  cta: string;
  accent: AccentKey;
  step: string;
  featured?: boolean;
}

const osPaths: OsPath[] = [
  {
    icon: LayoutDashboard,
    title: 'My Longevity OS',
    desc: 'Command center — active stack, hallmark coverage map, lab status, outcome milestones, and export kit. Every module unified into one view.',
    href: '/dashboard',
    cta: 'Open Dashboard',
    accent: 'emerald',
    step: '01',
    featured: true,
  },
  {
    icon: Layers,
    title: 'Stack Architect',
    desc: 'Build protocols with live synergy scoring, hallmark coverage, and contraindication checks.',
    href: '/stacks',
    cta: 'Build Stack',
    accent: 'violet',
    step: '02',
  },
  {
    icon: FlaskConical,
    title: 'Lab Hub',
    desc: 'Log biomarkers locally. Track NAD+, glutathione, hs-CRP. Trends and CSV export.',
    href: '/labs',
    cta: 'Track Labs',
    accent: 'cyan',
    step: '03',
  },
  {
    icon: Library,
    title: 'Anti-Aging Library',
    desc: '50 compounds, 12 hallmarks, synergy guides — all PMID-cited and evidence-graded.',
    href: '/library',
    cta: 'Search Library',
    accent: 'amber',
    step: '04',
  },
  {
    icon: Wand2,
    title: 'Longevity Tools',
    desc: 'Six interactive tools: simulator, interaction network, biomarker forecasts, defense scan.',
    href: '/tools',
    cta: 'Open Tools',
    accent: 'rose',
    step: '05',
  },
];

const cfg: Record<AccentKey, {
  grad: string;
  border: string;
  iconBg: string;
  iconText: string;
  labelText: string;
  ctaText: string;
  glowHover: string;
  topBar: string;
  numberColor: string;
}> = {
  emerald: {
    grad: 'from-accent-emerald/[0.12] via-accent-emerald/[0.04] to-transparent',
    border: 'border-accent-emerald/20 hover:border-accent-emerald/40',
    iconBg: 'icon-badge-emerald',
    iconText: 'text-accent-emerald',
    labelText: 'text-accent-emerald',
    ctaText: 'text-accent-emerald',
    glowHover: 'glow-hover-emerald',
    topBar: 'from-accent-emerald via-accent-cyan to-transparent',
    numberColor: 'text-accent-emerald',
  },
  violet: {
    grad: 'from-accent-violet/[0.12] via-accent-violet/[0.04] to-transparent',
    border: 'border-accent-violet/20 hover:border-accent-violet/40',
    iconBg: 'icon-badge-violet',
    iconText: 'text-accent-violet',
    labelText: 'text-accent-violet',
    ctaText: 'text-accent-violet',
    glowHover: 'glow-hover-violet',
    topBar: 'from-accent-violet via-accent-cyan to-transparent',
    numberColor: 'text-accent-violet',
  },
  cyan: {
    grad: 'from-accent-cyan/[0.12] via-accent-cyan/[0.04] to-transparent',
    border: 'border-accent-cyan/20 hover:border-accent-cyan/40',
    iconBg: 'icon-badge-cyan',
    iconText: 'text-accent-cyan',
    labelText: 'text-accent-cyan',
    ctaText: 'text-accent-cyan',
    glowHover: 'glow-hover-cyan',
    topBar: 'from-accent-cyan via-accent-emerald to-transparent',
    numberColor: 'text-accent-cyan',
  },
  amber: {
    grad: 'from-accent-amber/[0.12] via-accent-amber/[0.04] to-transparent',
    border: 'border-accent-amber/20 hover:border-accent-amber/40',
    iconBg: 'icon-badge-amber',
    iconText: 'text-accent-amber',
    labelText: 'text-accent-amber',
    ctaText: 'text-accent-amber',
    glowHover: 'glow-hover-amber',
    topBar: 'from-accent-amber via-accent-rose to-transparent',
    numberColor: 'text-accent-amber',
  },
  rose: {
    grad: 'from-accent-rose/[0.12] via-accent-rose/[0.04] to-transparent',
    border: 'border-accent-rose/20 hover:border-accent-rose/40',
    iconBg: 'icon-badge-rose',
    iconText: 'text-accent-rose',
    labelText: 'text-accent-rose',
    ctaText: 'text-accent-rose',
    glowHover: 'glow-hover-rose',
    topBar: 'from-accent-rose via-accent-violet to-transparent',
    numberColor: 'text-accent-rose',
  },
};

export function HomepageOSFunnel() {
  const { quizResult } = usePlatform();
  const order = getOsFunnelOrder(quizResult?.goal);
  const sorted = [...osPaths].sort((a, b) => order.indexOf(a.href) - order.indexOf(b.href));

  return (
    <section id="os" className="py-20 md:py-28 border-b border-border bg-background relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-emerald/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-accent-violet/[0.05] blur-[100px]" />
      </div>

      <div className="relative container-page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-accent-emerald/50" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-accent-emerald uppercase">Longevity OS</span>
            <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-accent-emerald/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 max-w-2xl">
            One OS.{' '}
            <span className="headline-gradient">Five entry points.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Every module is free, local-first, and grounded in the same evidence standards that grade the library. No paywall. No accounts. No supplement store agenda.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {sorted.map((path, i) => {
            const c = cfg[path.accent];
            const Icon = path.icon;
            const isFeatured = path.featured || path.href === order[0];

            return (
              <motion.div
                key={path.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={isFeatured ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
              >
                <Link
                  href={path.href}
                  className={[
                    'focus-ring group relative flex flex-col h-full overflow-hidden rounded-2xl border transition-all duration-300',
                    'bg-gradient-to-br', c.grad,
                    c.border,
                    c.glowHover,
                    isFeatured ? 'min-h-[320px] lg:min-h-full' : 'min-h-[160px]',
                  ].join(' ')}
                >
                  {/* Colored top bar */}
                  <div className={`h-px w-full bg-gradient-to-r ${c.topBar} opacity-70`} />

                  <div className={`flex flex-col flex-1 ${isFeatured ? 'p-7' : 'p-5'}`}>
                    {/* Step + icon row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-5 h-5 ${c.iconText}`} aria-hidden="true" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold ${c.labelText} opacity-50`}>{path.step}</span>
                    </div>

                    <h3 className={`font-bold leading-tight mb-2 ${isFeatured ? 'text-xl' : 'text-base'} group-hover:${c.ctaText} transition-colors`}>
                      {path.title}
                    </h3>

                    <p className={`text-muted-foreground leading-relaxed flex-1 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                      {path.desc}
                    </p>

                    {/* CTA */}
                    <div className={`flex items-center gap-1.5 mt-5 ${c.ctaText} font-semibold text-sm group-hover:gap-3 transition-all duration-300`}>
                      {path.cta}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Ghost step number */}
                  <span
                    className={`absolute bottom-4 right-5 text-7xl font-black font-mono tabular-nums ${c.numberColor} opacity-[0.06] pointer-events-none select-none leading-none`}
                    aria-hidden="true"
                  >
                    {path.step}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-10 font-mono"
        >
          All tools run in your browser · localStorage only · no server, no account, no cost
        </motion.p>
      </div>
    </section>
  );
}
