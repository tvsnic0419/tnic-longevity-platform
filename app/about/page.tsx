import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import {
  Dna, FlaskConical, ShieldCheck, BookOpen, ArrowRight,
  Globe, Lock, Microscope, Heart, Users, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About TNiC | Science-First Longevity Platform',
  description:
    'TNiC is an independent, evidence-first longevity research platform. No supplement sponsorships. No paid rankings. Every claim is PMID-cited and evidence-graded.',
  openGraph: {
    title: 'About TNiC — Who We Are & Why We Built This',
    description: 'The mission, methodology, and principles behind the TNiC longevity platform.',
  },
};

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Evidence-First, Always',
    body:
      'Every compound, hallmark, and protocol on this platform is graded by evidence tier — Tier A (human RCTs), Tier B (human + mechanistic), Tier C (preclinical). We show our work: every claim links to a PMID.',
  },
  {
    icon: Lock,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    title: 'Privacy-First by Architecture',
    body:
      'Your health data never leaves your browser. Lab entries, quiz results, and bio-age scores are stored locally using the Web Storage API. TNiC cannot see, sell, or subpoena your health information.',
  },
  {
    icon: Globe,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    title: 'Independent & Conflict-Free',
    body:
      'TNiC is not funded by supplement manufacturers, longevity clinics, or pharmaceutical companies. Shop recommendations are based on COA verification and formulation quality — not commission rates.',
  },
  {
    icon: Microscope,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Transparent Methodology',
    body:
      'Our evidence grading rubric, biological age algorithm (Levine et al. 2018 PhenoAge methodology), and synergy scoring logic are all documented in the Trust Center — open to peer scrutiny.',
  },
];

const PLATFORM_STATS = [
  { value: '12', label: 'Hallmarks of Aging covered', sub: 'Full mechanism + intervention maps' },
  { value: '150+', label: 'PMIDs indexed', sub: 'Linked to source at PubMed' },
  { value: '9', label: 'Tier A/B compounds', sub: 'With full dosing + synergy profiles' },
  { value: '0', label: 'Sponsored rankings', sub: 'No paid placement. Ever.' },
];

const WHAT_WE_ARE_NOT = [
  'We are not a supplement store pretending to be a research platform',
  'We are not affiliated with any longevity clinic or testing company',
  'We do not sell, rent, or trade your health data',
  'We do not provide medical advice — everything here is educational',
  'We do not hide negative evidence about compounds we feature',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,color-mix(in_srgb,var(--accent-emerald)_12%,transparent),transparent)]" />
          <div className="relative container-page max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Dna className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400 tracking-widest uppercase">About TNiC</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
              The longevity platform
              <br />
              <span className="text-emerald-400">built to tell the truth.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
              Most supplement platforms are shops masquerading as research. TNiC started from the opposite direction:
              a systematic mapping of the 12 hallmarks of aging, with every intervention ranked by evidence strength.
              The shop came last — and it doesn't fund the science.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/trust" className="inline-flex items-center gap-2 bg-emerald-500 text-black px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors">
                Trust Center <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/library" className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                Explore the Science
              </Link>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="py-10 border-y border-border/50 bg-card/20">
          <div className="container-page">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PLATFORM_STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl font-black font-mono text-emerald-400 mb-1">{s.value}</p>
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-28">
          <div className="container-page max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-medium mb-4">Our Mission</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6">
                  Make longevity science legible — and actionable.
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The science of aging has never moved faster. David Sinclair's sirtuins work, Levine's epigenetic clocks,
                    the NRF2 pathway, senolytic compounds — breakthroughs are arriving monthly. But almost none of it
                    reaches the people who need it most.
                  </p>
                  <p>
                    The gap isn't a lack of research. It's that translating clinical findings into actionable protocols requires
                    systematic evidence grading, mechanism mapping, interaction analysis, and dosing calibration — work
                    that no single supplement company is incentivized to do honestly.
                  </p>
                  <p>
                    <strong className="text-foreground">TNiC is that translation layer.</strong> We built the infrastructure
                    to systematically map interventions to hallmarks, grade them by evidence quality, check for interactions,
                    and surface them through tools that let you act on them — not just read about them.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
                  <BookOpen className="w-6 h-6 text-emerald-400 mb-3" />
                  <h3 className="font-bold text-foreground mb-2">What "evidence-graded" actually means</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tier A: Multiple human RCTs with consistent outcomes. Tier B: At least one human trial plus
                    strong mechanistic evidence. Tier C: Preclinical only (animal or in vitro). We don't pretend
                    Tier C is Tier A — even when it sells better.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
                  <Heart className="w-6 h-6 text-rose-400 mb-3" />
                  <h3 className="font-bold text-foreground mb-2">Why we built the tools</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Reading about longevity is not the same as having a protocol. The Stack Builder, Bio Age Engine,
                    and Lab Tracker exist because knowledge without personalization stays inert. We close that gap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-20 border-t border-border/50 bg-gradient-to-b from-card/20 to-transparent">
          <div className="container-page max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-xs text-emerald-400 uppercase tracking-widest font-medium mb-3">Our Principles</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Non-negotiable commitments.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {PRINCIPLES.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className={`rounded-2xl border p-6 ${p.bg}`}>
                    <Icon className={`w-6 h-6 ${p.color} mb-4`} />
                    <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What we are NOT */}
        <section className="py-20 border-t border-border/50">
          <div className="container-page max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-xs text-rose-400 uppercase tracking-widest font-medium mb-3">Transparency</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground">What TNiC is not.</h2>
              <p className="text-muted-foreground mt-3">We believe in stating this explicitly — not burying it in a disclaimer.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
              {WHAT_WE_ARE_NOT.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4 border-b border-border/40 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science team */}
        <section className="py-20 border-t border-border/50 bg-card/10">
          <div className="container-page max-w-4xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs text-cyan-400 uppercase tracking-widest font-medium mb-4">The Science Team</p>
                <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">
                  Built by researchers, not marketers.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  TNiC was founded by a team with backgrounds in computational biology, clinical pharmacology, and
                  science communication. We started this because we were frustrated with the state of longevity
                  information online — oversimplified influencer stacks on one end, impenetrable journals on the other.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We don't publish team photos or LinkedIn profiles because we want the science to stand on its own.
                  Every claim is PMID-citable. Challenge any of it in the Trust Center — that's what it's there for.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/trust/methodology" className="inline-flex items-center gap-2 border border-border px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                    <FileText className="w-4 h-4" />
                    Our Methodology
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 border border-border px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                    <Users className="w-4 h-4" />
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/40 p-6 space-y-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Platform milestones</p>
                {[
                  { date: 'May 2025', event: 'Platform launched with 9 Tier A/B compounds and 12 hallmark maps' },
                  { date: 'Jun 2025', event: 'Stack Architect released with live synergy scoring and hallmark coverage' },
                  { date: 'Jun 2025', event: 'Elite 8 Longevity Quotient tool launched — interactive benchmark ranking' },
                  { date: 'Jul 2025', event: 'Biological Age Engine (v2) — 5-domain PhenoAge-calibrated assessment' },
                ].map((m) => (
                  <div key={m.date} className="flex gap-3">
                    <span className="text-xs font-mono text-emerald-400 shrink-0 mt-0.5 w-20">{m.date}</span>
                    <p className="text-sm text-muted-foreground">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-border/50">
          <div className="container-page text-center max-w-2xl">
            <FlaskConical className="w-10 h-10 text-emerald-400 mx-auto mb-5" />
            <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">
              Ready to start your protocol?
            </h2>
            <p className="text-muted-foreground mb-8">
              Take the 3-minute quiz to get a personalized stack preset, then track your progress in the Longevity OS.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/quiz" className="inline-flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors">
                Take the Quiz <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/bio-age" className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Calculate Bio Age
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
