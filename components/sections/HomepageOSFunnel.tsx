'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  FlaskConical,
  Library,
  Wand2,
  ArrowRight,
} from 'lucide-react';
import { ContextRail } from '@/components/ui/ContextRail';
import { usePlatform } from '@/context/PlatformContext';
import { getOsFunnelOrder } from '@/lib/homepage-personalization';

type AccentKey = 'emerald' | 'violet' | 'cyan' | 'amber' | 'rose';

const accentConfig: Record<AccentKey, {
  gradFrom: string;
  iconBadge: string;
  iconText: string;
  ctaText: string;
  featuredRing: string;
}> = {
  emerald: {
    gradFrom: 'from-accent-emerald/[0.09]',
    iconBadge: 'icon-badge-emerald-glow',
    iconText: 'text-accent-emerald',
    ctaText: 'text-accent-emerald',
    featuredRing: 'ring-1 ring-accent-emerald/30',
  },
  violet: {
    gradFrom: 'from-accent-violet/[0.09]',
    iconBadge: 'icon-badge-violet-glow',
    iconText: 'text-accent-violet',
    ctaText: 'text-accent-violet',
    featuredRing: '',
  },
  cyan: {
    gradFrom: 'from-accent-cyan/[0.09]',
    iconBadge: 'icon-badge-cyan-glow',
    iconText: 'text-accent-cyan',
    ctaText: 'text-accent-cyan',
    featuredRing: '',
  },
  amber: {
    gradFrom: 'from-accent-amber/[0.09]',
    iconBadge: 'icon-badge-amber-glow',
    iconText: 'text-accent-amber',
    ctaText: 'text-accent-amber',
    featuredRing: '',
  },
  rose: {
    gradFrom: 'from-accent-rose/[0.09]',
    iconBadge: 'icon-badge-rose-glow',
    iconText: 'text-accent-rose',
    ctaText: 'text-accent-rose',
    featuredRing: '',
  },
};

const osPaths = [
  {
    icon: LayoutDashboard,
    title: 'My Longevity OS',
    desc: 'Command center — active stack, hallmark coverage map, lab status, outcome milestones, and export kit.',
    context: 'Ties every module together. Your personal protocol hub, visible at a glance.',
    href: '/dashboard',
    cta: 'Open dashboard',
    accent: 'emerald' as AccentKey,
    featured: true,
    step: '01',
  },
  {
    icon: Layers,
    title: 'Stack Architect',
    desc: 'Build protocols with live synergy scoring, hallmark coverage, and contraindication checks.',
    context: 'Every compound is evidence-graded Tier A/B/C before it enters a preset. No random bundling.',
    href: '/stacks',
    cta: 'Build stack',
    accent: 'violet' as AccentKey,
    step: '02',
  },
  {
    icon: FlaskConical,
    title: 'Lab Hub',
    desc: 'Log biomarkers locally. Track NAD+, glutathione, hs-CRP. Trends, retest nudges, CSV export.',
    context: 'Compare your real bloodwork against modeled projections — no cloud, no accounts.',
    href: '/labs',
    cta: 'Track labs',
    accent: 'cyan' as AccentKey,
    step: '03',
  },
  {
    icon: Library,
    title: 'Anti-Aging Library',
    desc: '12 hallmarks, 9 compound deep-dives, synergy guides — all PMID-cited and evidence-graded.',
    context: 'Search by compound, hallmark, or pathway. Every entry links to the primary trial.',
    href: '/library',
    cta: 'Search library',
    accent: 'amber' as AccentKey,
    step: '04',
  },
  {
    icon: Wand2,
    title: 'Longevity Tools',
    desc: 'Six interactive tools: stack simulator, interaction network, biomarker forecasts, defense scan.',
    context: 'All local-first. No paywall, no account required. Run scenarios before you commit to a stack.',
    href: '/tools',
    cta: 'Open tools',
    accent: 'rose' as AccentKey,
    step: '05',
  },
] as const;

const funnelNextByGoal: Record<string, string> = {
  learn: 'Start at the Library for mechanism-mapped deep-dives, then take the quiz for a stack preset.',
  defense: 'Run Defense Scan first, then build an NRF2-focused stack with synergy scoring.',
  energy: 'Open Stack Architect for mitochondrial presets, then log NAD+ and inflammation labs.',
  full: 'Open your dashboard for the full OS picture, then customize the Hybrid preset in Stack Architect.',
};

export function HomepageOSFunnel() {
  const { quizResult } = usePlatform();
  const order = getOsFunnelOrder(quizResult?.goal);
  const sorted = [...osPaths].sort((a, b) => order.indexOf(a.href) - order.indexOf(b.href));
  const featuredHref = order[0];
  const contextNext = funnelNextByGoal[quizResult?.goal ?? ''] ?? 'Start at the dashboard for the full picture, or jump directly to the module you need right now.';

  return (
    <section id="os" className="py-16 md:py-24 border-b border-border bg-card section-glow-emerald section-mesh">
      <div className="container-page">
        <div className="text-center mb-8 md:mb-10 section-header-mesh">
          <div className="flex justify-center mb-4">
            <span className="section-eyebrow section-eyebrow-emerald">
              <span className="dot-pulse dot-pulse-emerald" aria-hidden="true" />
              Longevity OS
            </span>
          </div>
          <h2 className="heading-section-glow">
            One operating system. Five entry points.
          </h2>
          <p className="text-body-sm mt-3 max-w-xl mx-auto">
            Every module is free, local-first, and grounded in the same evidence standards that grade the library. No paywall. No accounts. No supplement store agenda.
          </p>
        </div>

        <ContextRail
          what="Five evidence-grounded modules — stack architect, biomarker tracker, library, tools, and dashboard — built around the 12 Hallmarks of Aging."
          why="Most people combine supplements from multiple sources with no synergy check and no outcome tracking. TNiC maps every compound to a specific hallmark, checks pathway interactions, and tracks results over time."
          next={contextNext}
          theme="emerald"
          className="mb-10 md:mb-14 max-w-4xl mx-auto"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((path, i) => {
            const Icon = path.icon;
            const cfg = accentConfig[path.accent];
            const isFeatured = path.href === featuredHref;

            return (
              <motion.div
                key={path.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  href={path.href}
                  className={[
                    'focus-ring group block h-full rounded-2xl p-6 card-premium',
                    'bg-gradient-to-br', cfg.gradFrom, 'to-transparent',
                    `glow-hover-${path.accent}`,
                    isFeatured ? cfg.featuredRing : '',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cfg.iconBadge}`}>
                      <Icon className={`w-5 h-5 ${cfg.iconText}`} aria-hidden="true" />
                    </div>
                    <span className="os-card-number">{path.step}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-1.5 leading-snug">{path.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground mb-2 leading-relaxed">{path.context}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{path.desc}</p>

                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold mt-5 group-hover:gap-3 transition-all duration-300 ${cfg.ctaText}`}>
                    {path.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}