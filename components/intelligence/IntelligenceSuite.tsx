'use client';

/**
 * TNiC Intelligence Suite
 *
 * Three-tool tabbed section for the homepage:
 *   Tab A — Biological Age Estimator
 *   Tab B — Compound Intelligence Engine
 *   Tab C — Longevity Stack Scorecard
 *
 * Designed to be the primary attention-grabbing section replacing the
 * dormant "AI Health Prognostication" placeholder.
 */

import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, Trophy } from 'lucide-react';
import { BioAgeEstimator } from './BioAgeEstimator';
import { CompoundIntelligenceEngine } from './CompoundIntelligenceEngine';
import { LongevityStackScorecard } from './LongevityStackScorecard';

const TOKENS: CSSProperties = {
  ['--m-bg' as string]: 'oklch(13% 0.02 255)',
  ['--m-bg-2' as string]: 'oklch(11% 0.02 255)',
  ['--m-card' as string]: 'oklch(16% 0.022 255)',
  ['--m-border' as string]: 'oklch(25% 0.02 255)',
  ['--m-fg' as string]: 'oklch(92% 0.01 250)',
  ['--m-muted' as string]: 'oklch(60% 0.015 250)',
  ['--m-green' as string]: '#00da7e',
  ['--m-cyan' as string]: '#00bdbe',
  ['--m-violet' as string]: '#c084fc',
};

type TabId = 'bioage' | 'intelligence' | 'scorecard';

const TABS: { id: TabId; label: string; shortLabel: string; icon: typeof Activity; color: string; description: string }[] = [
  {
    id: 'bioage',
    label: 'Biological Age Estimator',
    shortLabel: 'Bio-Age',
    icon: Activity,
    color: '#00da7e',
    description: '4 steps · Modeled biological age · Personalized protocol with buy links',
  },
  {
    id: 'intelligence',
    label: 'Compound Intelligence Engine',
    shortLabel: 'Intelligence',
    icon: Search,
    color: '#00bdbe',
    description: 'Natural-language search · Evidence-ranked compounds · PMID citations',
  },
  {
    id: 'scorecard',
    label: 'Stack Scorecard',
    shortLabel: 'Scorecard',
    icon: Trophy,
    color: '#c084fc',
    description: 'Select your stack · Live grade · Shareable card with viral loop',
  },
];

export function IntelligenceSuite() {
  const [activeTab, setActiveTab] = useState<TabId>('bioage');
  const activeConfig = TABS.find((t) => t.id === activeTab)!;

  return (
    <section
      id="intelligence-suite"
      className="scroll-mt-20"
      style={{ ...TOKENS, borderTop: '1px solid var(--m-border)', background: 'var(--m-bg-2)' }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-5"
            style={{
              color: 'var(--m-green)',
              border: '1px solid color-mix(in oklab, var(--m-green) 40%, transparent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--m-green)' }} />
            Intelligence Suite — Live
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--m-fg)' }}
          >
            Three tools. One mission.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'var(--m-muted)' }}>
            Know your biological age. Understand which compounds target your goals.
            Grade your stack and share it. All client-side, no account required.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="flex flex-col sm:flex-row gap-2 mb-8 p-1.5 rounded-2xl"
          style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
          role="tablist"
          aria-label="Intelligence Suite tools"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded-xl px-4 py-3 text-left transition-all"
                style={{
                  background: isActive
                    ? `color-mix(in oklab, ${tab.color} 10%, oklch(11% 0.02 255))`
                    : 'transparent',
                  border: isActive
                    ? `1px solid color-mix(in oklab, ${tab.color} 35%, transparent)`
                    : '1px solid transparent',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: isActive
                      ? `color-mix(in oklab, ${tab.color} 20%, transparent)`
                      : 'var(--m-border)',
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: isActive ? tab.color : 'var(--m-muted)' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: isActive ? 'var(--m-fg)' : 'var(--m-muted)' }}
                  >
                    {tab.shortLabel}
                  </p>
                  <p
                    className="text-[11px] leading-snug hidden sm:block"
                    style={{ color: 'var(--m-muted)' }}
                  >
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active tab description (mobile) */}
        <p className="text-xs mb-6 sm:hidden" style={{ color: 'var(--m-muted)' }}>
          {activeConfig.description}
        </p>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'bioage' && <BioAgeEstimator />}
            {activeTab === 'intelligence' && <CompoundIntelligenceEngine />}
            {activeTab === 'scorecard' && <LongevityStackScorecard />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
