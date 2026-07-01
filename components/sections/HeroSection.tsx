'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  ClipboardList,
  Activity,
  TrendingDown,
  Zap,
} from 'lucide-react';
import { StarterQuiz } from '@/components/sections/StarterQuiz';
import { StatStrip } from '@/components/ui/StatStrip';
import { ContextRail } from '@/components/ui/ContextRail';
import { HeroRings } from '@/components/ui/HeroRings';
import { platformStats } from '@/lib/platform-stats';
import { usePlatform } from '@/context/PlatformContext';
import { getHeroPersonalization } from '@/lib/homepage-personalization';

const DATA_CHIPS = [
  { label: 'NAD⁺', value: '+34%', Icon: Activity,     color: 'emerald', cls: 'border-accent-emerald/30 text-accent-emerald', pos: '-left-5 top-10',        anim: 'float',      delay: '0s' },
  { label: 'hs-CRP', value: '−62%', Icon: TrendingDown, color: 'cyan',    cls: 'border-accent-cyan/30 text-accent-cyan',       pos: '-right-5 top-[38%]',   anim: 'float-slow', delay: '1.5s' },
  { label: '12 Hallmarks', value: 'mapped', Icon: Zap,  color: 'violet',  cls: 'border-accent-violet/30 text-accent-violet',   pos: '-bottom-4 left-[15%]', anim: 'float-alt',  delay: '0.8s' },
] as const;

export function HeroSection() {
  const { quizResult } = usePlatform();
  const hero = getHeroPersonalization(quizResult);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 200, damping: 35 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 200, damping: 35 });

  return (
    <section
      id="hero"
      className="relative hero-mesh hero-cinematic noise scan-overlay min-h-[94vh] flex items-center pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <HeroRings />
      <div className="hero-beam" aria-hidden="true" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative container-page w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Left: Headline + CTAs ── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 card-premium rounded-full px-5 py-2.5 mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent-emerald animate-pulse-glow" aria-hidden="true" />
              <span className="text-sm font-semibold tracking-wide">Anti-Aging Operating System</span>
              <span className="w-px h-3 bg-border/60" aria-hidden="true" />
              <span className="text-[11px] font-mono text-accent-emerald font-bold">v1.36</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse-glow" aria-hidden="true" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-black tracking-[-0.03em] leading-[0.9] mb-7 text-[clamp(3rem,7.5vw,5.5rem)]"
            >
              {hero.line1}
              <br />
              <span className="shimmer-text">{hero.line2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-body text-lg max-w-xl mb-8 mx-auto lg:mx-0 leading-relaxed"
            >
              {hero.subcopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-9"
            >
              <StatStrip stats={[...platformStats]} variant="hero" ariaLabel="Platform scale" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={hero.primary.href} className="focus-ring btn-gradient group text-base px-7 py-3.5">
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
                {hero.primary.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link href={hero.secondary.href} className="focus-ring btn-ghost-premium text-base px-7 py-3.5">
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                {hero.secondary.label}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-caption font-mono mt-6 mx-auto lg:mx-0"
            >
              Educational only · Not medical advice · Data stays local
            </motion.p>
          </div>

          {/* ── Right: 3D quiz card ── */}
          <motion.div
            id="starter-quiz"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 80 }}
            className="lg:col-span-5 scroll-mt-28 relative"
            style={{ perspective: 1200 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseX.set(e.clientX - rect.left - rect.width / 2);
              mouseY.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          >
            {/* Deep aura behind card */}
            <div
              className="absolute -inset-8 rounded-3xl blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 40% 40%, color-mix(in srgb, var(--accent-cyan) 28%, transparent), color-mix(in srgb, var(--accent-violet) 18%, transparent) 60%, transparent)',
                opacity: 0.65,
              }}
              aria-hidden="true"
            />

            {/* Floating data chips */}
            {DATA_CHIPS.map(({ label, value, Icon, cls, pos, anim, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + i * 0.25, duration: 0.5, type: 'spring' }}
                className={`absolute z-30 ${pos} ${anim}`}
                style={{ animationDelay: delay }}
              >
                <div className={`flex items-center gap-1.5 rounded-full border ${cls} bg-background/80 backdrop-blur-md px-3 py-1.5 shadow-lg shadow-black/30`}>
                  <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span className="text-[10px] font-mono font-bold whitespace-nowrap">{label}</span>
                  <span className="text-[10px] font-mono opacity-70">{value}</span>
                </div>
              </motion.div>
            ))}

            {/* 3D tilt wrapper */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
              {/* Terminal frame header */}
              <div className="terminal-header">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-rose/80" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-amber/80" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald/80" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.18em] uppercase">
                  Longevity OS · Profile Quiz
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-accent-emerald/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" aria-hidden="true" />
                  live
                </span>
              </div>

              {/* Quiz body */}
              <div className="terminal-body">
                <div className="relative">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-cyan) 5%, transparent), color-mix(in srgb, var(--accent-violet) 4%, transparent))',
                    }}
                    aria-hidden="true"
                  />
                  <StarterQuiz />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-14 md:mt-20 max-w-4xl mx-auto lg:mx-0"
        >
          <ContextRail
            what="A privacy-first longevity OS built on 12 Hallmarks of Aging — not a supplement store or medical service."
            why="Most longevity sites sell products before explaining the mechanism. TNiC grades every compound claim, cites every PMID, and keeps your health data in your own browser — never on TNiC servers."
            next={hero.contextNext}
            theme="cyan"
          />
        </motion.div>
      </div>
    </section>
  );
}
