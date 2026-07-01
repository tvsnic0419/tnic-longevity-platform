'use client';

import Link from 'next/link';
import {
  Shield,
  HardDrive,
  Scale,
  FileText,
  Download,
  BadgeCheck,
  FlaskConical,
  BookOpen,
  Layers,
  Microscope,
  Lock,
  Star,
} from 'lucide-react';

const row1 = [
  { icon: BadgeCheck, label: 'Tier A/B/C Evidence Graded',  accent: 'emerald', href: '/trust/methodology' },
  { icon: HardDrive,  label: 'Local-First · No Account',    accent: 'cyan',    href: '/trust/disclaimers' },
  { icon: Scale,      label: 'Zero Shop Bias',              accent: 'amber',   href: '/shop' },
  { icon: FileText,   label: 'Every Claim PMID-Cited',      accent: 'violet',  href: '/library' },
  { icon: FlaskConical, label: '50 Compounds Indexed',      accent: 'cyan',    href: '/library' },
  { icon: Shield,     label: 'Evidence-First Since 2025',   accent: 'emerald', href: '/trust' },
  { icon: Microscope, label: '12 Hallmarks Mapped',         accent: 'violet',  href: '/hallmarks' },
  { icon: BookOpen,   label: 'MDX Deep-Dives',              accent: 'amber',   href: '/library' },
];

const row2 = [
  { icon: Lock,       label: 'Your Data Stays Local',       accent: 'cyan',    href: '/trust/disclaimers' },
  { icon: Download,   label: 'CSV & JSON Export Kit',       accent: 'violet',  href: '/dashboard' },
  { icon: Layers,     label: 'Stack Architect Presets',     accent: 'emerald', href: '/stacks' },
  { icon: Star,       label: 'No Paywall. Ever.',           accent: 'amber',   href: '/trust' },
  { icon: BadgeCheck, label: 'Physician-Reviewable Sources',accent: 'cyan',    href: '/trust/methodology' },
  { icon: Microscope, label: 'Human RCT Priority',          accent: 'rose',    href: '/library' },
  { icon: Shield,     label: 'Independent Intelligence',    accent: 'violet',  href: '/trust' },
  { icon: FlaskConical, label: 'Biomarker Lab Tracker',     accent: 'emerald', href: '/labs' },
];

type AccentKey = 'emerald' | 'cyan' | 'amber' | 'violet' | 'rose';

const pill: Record<AccentKey, { text: string; bg: string; border: string; dot: string }> = {
  emerald: { text: 'text-accent-emerald', bg: 'bg-accent-emerald/8',  border: 'border-accent-emerald/20', dot: 'bg-accent-emerald' },
  cyan:    { text: 'text-accent-cyan',    bg: 'bg-accent-cyan/8',     border: 'border-accent-cyan/20',    dot: 'bg-accent-cyan' },
  amber:   { text: 'text-accent-amber',   bg: 'bg-accent-amber/8',    border: 'border-accent-amber/20',   dot: 'bg-accent-amber' },
  violet:  { text: 'text-accent-violet',  bg: 'bg-accent-violet/8',   border: 'border-accent-violet/20',  dot: 'bg-accent-violet' },
  rose:    { text: 'text-accent-rose',    bg: 'bg-accent-rose/8',     border: 'border-accent-rose/20',    dot: 'bg-accent-rose' },
};

function Pill({ item }: { item: typeof row1[0] }) {
  const ac = pill[item.accent as AccentKey];
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`focus-ring flex-shrink-0 inline-flex items-center gap-2.5 rounded-full border ${ac.border} ${ac.bg} px-4 py-2 mx-2 transition-all duration-200 hover:scale-[1.04] hover:brightness-110 group`}
    >
      <Icon className={`w-3.5 h-3.5 ${ac.text} shrink-0`} aria-hidden="true" />
      <span className={`text-xs font-semibold whitespace-nowrap ${ac.text}`}>{item.label}</span>
      <span className={`w-1.5 h-1.5 rounded-full ${ac.dot} opacity-50`} aria-hidden="true" />
    </Link>
  );
}

export function HomepageTrustStrip() {
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <section aria-label="Trust indicators" className="py-6 border-y border-border/50 bg-background/60 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none z-10" />

      <div className="space-y-3">
        {/* Row 1 — left */}
        <div className="marquee-wrap">
          <div className="marquee-track-left" aria-hidden="true">
            {doubled1.map((item, i) => <Pill key={i} item={item} />)}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="marquee-wrap">
          <div className="marquee-track-right" aria-hidden="true">
            {doubled2.map((item, i) => <Pill key={i} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
