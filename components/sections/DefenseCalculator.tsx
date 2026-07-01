'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scan, Zap, Moon, Flame, Activity, Brain, Shield, ChevronRight } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { compounds } from '@/lib/data';
import { usePlatform } from '@/context/PlatformContext';
import type { PresetKey } from '@/lib/presets';

type SliderTheme = 'cyan' | 'rose' | 'violet' | 'emerald';

const sliderTrack: Record<SliderTheme, string> = {
  cyan:    'bg-accent-cyan',
  rose:    'bg-accent-rose',
  violet:  'bg-accent-violet',
  emerald: 'bg-accent-emerald',
};

const sliderGlow: Record<SliderTheme, string> = {
  cyan:    'shadow-[0_0_12px_theme(colors.accent-cyan/0.6)]',
  rose:    'shadow-[0_0_12px_theme(colors.accent-rose/0.6)]',
  violet:  'shadow-[0_0_12px_theme(colors.accent-violet/0.6)]',
  emerald: 'shadow-[0_0_12px_theme(colors.accent-emerald/0.6)]',
};

const sliderText: Record<SliderTheme, string> = {
  cyan:    'text-accent-cyan',
  rose:    'text-accent-rose',
  violet:  'text-accent-violet',
  emerald: 'text-accent-emerald',
};

function SliderControl({
  label,
  icon: Icon,
  value,
  onChange,
  min,
  max,
  unit,
  theme,
  desc,
}: {
  label: string;
  icon: React.ElementType;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit?: string;
  theme: SliderTheme;
  desc: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center bg-background border border-border/50 group-hover:border-current transition-colors ${sliderText[theme]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="hidden sm:block text-xs text-muted-foreground">— {desc}</span>
        </div>
        <span className={`font-mono text-sm font-bold tabular-nums ${sliderText[theme]}`}>
          {value}{unit}
        </span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-150 ${sliderTrack[theme]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute opacity-0 w-full h-2 -mt-2 cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

const pathwayConfig = [
  { key: 'nrf2' as const,   label: 'NRF2 Oxidative Defense', color: 'bg-accent-cyan',    text: 'text-accent-cyan',    border: 'border-accent-cyan/30' },
  { key: 'mito' as const,   label: 'Mitochondrial Capacity', color: 'bg-accent-violet',  text: 'text-accent-violet',  border: 'border-accent-violet/30' },
  { key: 'sirt' as const,   label: 'Sirtuin Epigenetic',     color: 'bg-accent-emerald', text: 'text-accent-emerald', border: 'border-accent-emerald/30' },
  { key: 'infl' as const,   label: 'Inflammaging Index',     color: 'bg-accent-rose',    text: 'text-accent-rose',    border: 'border-accent-rose/30' },
];

const recLabel: Record<string, string> = {
  nrf2:   'NRF2 Activation Stack',
  mito:   'Mitochondrial Renewal Stack',
  hybrid: 'Hybrid Defense Stack',
};

const recGlow: Record<string, string> = {
  nrf2:   'shadow-[0_0_40px_theme(colors.accent-cyan/0.15)]',
  mito:   'shadow-[0_0_40px_theme(colors.accent-violet/0.15)]',
  hybrid: 'shadow-[0_0_40px_theme(colors.accent-emerald/0.15)]',
};

const recBorder: Record<string, string> = {
  nrf2:   'border-accent-cyan/25',
  mito:   'border-accent-violet/25',
  hybrid: 'border-accent-emerald/25',
};

const recBadge: Record<string, string> = {
  nrf2:   'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20',
  mito:   'bg-accent-violet/10 text-accent-violet border border-accent-violet/20',
  hybrid: 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20',
};

const recPreset: Record<string, PresetKey> = {
  nrf2: 'nrf2',
  mito: 'mito',
  hybrid: 'hybrid',
};

const recDesc: Record<string, string> = {
  nrf2:   'High oxidative load detected. Prioritize NRF2 activation and glutathione restoration before mitochondrial optimization.',
  mito:   'Energy crisis pattern identified. NAD+ restoration and mitochondrial biogenesis should lead your protocol.',
  hybrid: 'Dual-pathway decline detected. A hybrid stack addressing both NRF2 and mitochondrial systems is optimal.',
};

function getDeltaColor(delta: number) {
  if (delta >= 3) return 'text-accent-emerald';
  if (delta > 0)  return 'text-accent-cyan';
  if (delta === 0) return 'text-muted-foreground';
  return 'text-accent-rose';
}

function getDeltaGlow(delta: number) {
  if (delta >= 3) return 'shadow-[0_0_20px_theme(colors.accent-emerald/0.4)]';
  if (delta > 0)  return 'shadow-[0_0_20px_theme(colors.accent-cyan/0.4)]';
  return 'shadow-[0_0_20px_theme(colors.accent-rose/0.4)]';
}

export function DefenseCalculator() {
  const { profile, setProfile, defenseProfile, applyPreset } = usePlatform();
  const { age, stress, sleep, exercise, scanned } = profile;

  const rec = defenseProfile.recommendation as keyof typeof recLabel;

  const recommendedCompounds = compounds
    .filter((c) => rec === 'hybrid' ? true : c.badge === rec)
    .slice(0, 3);

  // Derive 4 pathway scores from defenseProfile
  const pathwayScores = {
    nrf2: defenseProfile.nrf2,
    mito: defenseProfile.mito,
    sirt: Math.round((defenseProfile.nrf2 + defenseProfile.mito) / 2 * 0.85),
    infl: Math.round(100 - (stress * 0.6 + (100 - sleep) * 0.4)),
  };

  const runScan = () => setProfile({ scanned: true });

  return (
    <SectionShell
      id="calculator"
      mod="MOD-AGE-05"
      theme="rose"
      badge="Biological Age Engine"
      title="Biological Age Calculator"
      subtitle="DoNotAge sells biological age tests for $$$. InsideTracker requires blood draws. TNiC estimates your biological age from lifestyle inputs — then prescribes the stack to reverse it."
      className="bg-background"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* ── Left: Input Panel ────────────────────────────────── */}
        <div className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/80 to-background overflow-hidden">
          {/* Top gradient strip */}
          <div className="h-1 w-full bg-gradient-to-r from-accent-rose via-accent-violet to-accent-cyan" />

          <div className="p-7 space-y-7">
            <div>
              <p className="text-[10px] font-mono tracking-widest text-accent-rose uppercase mb-1">Input Variables</p>
              <h3 className="text-lg font-bold">Your Longevity Profile</h3>
            </div>

            <div className="space-y-6 relative">
              <SliderControl
                label="Age"
                icon={Activity}
                value={age}
                onChange={(v) => setProfile({ age: v })}
                min={25} max={80}
                theme="cyan"
                desc="chronological baseline"
              />
              <SliderControl
                label="Stress Load"
                icon={Flame}
                value={stress}
                onChange={(v) => setProfile({ stress: v })}
                min={0} max={100} unit="%"
                theme="rose"
                desc="cortisol + HPA burden"
              />
              <SliderControl
                label="Sleep Quality"
                icon={Moon}
                value={sleep}
                onChange={(v) => setProfile({ sleep: v })}
                min={0} max={100} unit="%"
                theme="violet"
                desc="repair & consolidation"
              />
              <SliderControl
                label="Exercise"
                icon={Zap}
                value={exercise}
                onChange={(v) => setProfile({ exercise: v })}
                min={0} max={100} unit="%"
                theme="emerald"
                desc="mitochondrial stimulus"
              />
            </div>

            {/* Pathway preview bars (always visible) */}
            <div className="rounded-2xl border border-border/40 bg-background/50 p-5 space-y-3">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Pathway Preview</p>
              {pathwayConfig.map((p) => {
                const score = pathwayScores[p.key];
                return (
                  <div key={p.key}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{p.label}</span>
                      <span className={`font-mono font-semibold ${p.text}`}>{score}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${p.color}`}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={runScan}
              className="relative w-full group overflow-hidden rounded-2xl bg-gradient-to-r from-accent-rose via-accent-violet to-accent-cyan p-px"
            >
              <div className="relative flex items-center justify-center gap-3 bg-background/90 rounded-[calc(1rem-1px)] py-4 font-bold text-foreground group-hover:bg-background/70 transition-all duration-300">
                <Scan className="w-5 h-5 text-accent-rose group-hover:text-accent-cyan transition-colors" />
                <span className="bg-gradient-to-r from-accent-rose to-accent-cyan bg-clip-text text-transparent font-extrabold tracking-wide">
                  Execute Defense Scan
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-rose/10 via-accent-violet/5 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </button>
          </div>
        </div>

        {/* ── Right: Results Panel ─────────────────────────────── */}
        <div className="space-y-5">
          <AnimatePresence mode="wait">
            {!scanned ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-border/40 bg-gradient-to-br from-card to-background p-8 flex flex-col items-center justify-center text-center min-h-[340px] gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent-rose/10 border border-accent-rose/20 flex items-center justify-center mb-2">
                  <Shield className="w-8 h-8 text-accent-rose opacity-60" />
                </div>
                <p className="text-lg font-bold">Awaiting Scan</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Set your inputs and execute the Defense Scan to reveal your biological age estimate and personalized stack recommendation.
                </p>
                <div className="flex gap-2 mt-2">
                  {['cyan', 'violet', 'rose', 'emerald'].map((c) => (
                    <div key={c} className={`w-2 h-2 rounded-full bg-accent-${c} opacity-40`} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                {/* Age triple card */}
                <div className={`rounded-3xl border ${recBorder[rec]} bg-gradient-to-br from-card via-card/80 to-background ${recGlow[rec]} p-6`}>
                  <div className="flex items-center gap-2 mb-5">
                    <Brain className="w-4 h-4 text-muted-foreground" />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Age Analysis</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Chronological */}
                    <div className="rounded-2xl border border-border/50 bg-background/60 p-4 text-center">
                      <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Chronological</p>
                      <p className="text-3xl font-black font-mono tabular-nums text-foreground/80">{age}</p>
                      <p className="text-[9px] text-muted-foreground mt-1">years</p>
                    </div>

                    {/* Biological — glowing focal point */}
                    <div className={`rounded-2xl border ${recBorder[rec]} bg-gradient-to-b from-background to-card/60 p-4 text-center relative overflow-hidden ${recGlow[rec]}`}>
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
                      <p className={`text-[9px] font-mono uppercase tracking-wider mb-2 ${recBadge[rec].split(' ')[1]}`}>Biological</p>
                      <p className={`text-3xl font-black font-mono tabular-nums ${recBadge[rec].split(' ')[1]}`}>
                        {defenseProfile.biologicalAge}
                      </p>
                      <p className="text-[9px] text-muted-foreground mt-1">years</p>
                    </div>

                    {/* Delta */}
                    <div className={`rounded-2xl border border-border/50 bg-background/60 p-4 text-center ${getDeltaGlow(defenseProfile.ageDelta)}`}>
                      <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Reversal</p>
                      <p className={`text-3xl font-black font-mono tabular-nums ${getDeltaColor(defenseProfile.ageDelta)}`}>
                        {defenseProfile.ageDelta > 0 ? `-${defenseProfile.ageDelta}` : `+${Math.abs(defenseProfile.ageDelta)}`}
                      </p>
                      <p className="text-[9px] text-muted-foreground mt-1">yr delta</p>
                    </div>
                  </div>

                  {/* Defense score */}
                  <div className="flex items-end justify-between border-t border-border/30 pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Defense Index</p>
                      <p className={`text-5xl font-black font-mono tabular-nums ${recBadge[rec].split(' ')[1]}`}>
                        {defenseProfile.defenseScore}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">out of 100</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Recommended</p>
                      <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg ${recBadge[rec]}`}>
                        {recLabel[rec]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pathway bars */}
                <div className="rounded-3xl border border-border/40 bg-gradient-to-br from-card to-background p-6 space-y-3.5">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">Hallmark Pathway Analysis</p>
                  {pathwayConfig.map((p, i) => {
                    const score = pathwayScores[p.key];
                    return (
                      <div key={p.key}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">{p.label}</span>
                          <span className={`font-mono font-bold ${p.text}`}>{score}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${p.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Diagnosis */}
                <div className={`rounded-2xl border ${recBorder[rec]} bg-gradient-to-r from-card to-background px-5 py-4`}>
                  <p className="text-xs text-foreground leading-relaxed">{recDesc[rec]}</p>
                </div>

                {/* Top compounds */}
                <div className="space-y-2">
                  {recommendedCompounds.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className={`flex items-center justify-between rounded-xl border ${recBorder[rec]} bg-background/60 px-4 py-3 group`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono font-bold w-4 text-center ${recBadge[rec].split(' ')[1]} opacity-50`}>{i + 1}</span>
                        <span className="text-sm font-semibold">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground">{c.dose}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => applyPreset(recPreset[rec])}
                    className={`flex-1 relative overflow-hidden rounded-xl py-3.5 text-sm font-bold transition-all duration-200 bg-gradient-to-r ${
                      rec === 'nrf2' ? 'from-accent-cyan to-accent-violet text-black' :
                      rec === 'mito' ? 'from-accent-violet to-accent-cyan text-black' :
                                       'from-accent-emerald to-accent-cyan text-black'
                    } hover:opacity-90 hover:scale-[1.01]`}
                  >
                    Apply Recommended Stack
                  </button>
                  <a
                    href="/stacks"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/60 py-3.5 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all"
                  >
                    Customize in Architect <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
