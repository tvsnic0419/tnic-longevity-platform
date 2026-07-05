'use client';

/**
 * BioAgeEstimator — wraps the existing BioAgeWizard and upgrades the
 * results CTA to bridge directly to /products and /library instead of /stacks.
 * This is the Intelligence Suite entry point: hook → educate → convert.
 */

import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ShoppingBag, FlaskConical, RotateCcw,
  Activity, Flame, Zap, Moon, CheckCircle2, AlertTriangle, ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import {
  computeBioAge,
  type BasicProfile, type MetabolicInputs, type InflammatoryInputs,
  type HormonalMitoInputs, type LifestyleInputs, type BioAgeResult, type Sex,
} from '@/lib/bio-age-engine';
import { getProductPick } from '@/lib/product-picks';

const TOKENS: CSSProperties = {
  ['--m-bg' as string]: 'oklch(13% 0.02 255)',
  ['--m-card' as string]: 'oklch(16% 0.022 255)',
  ['--m-border' as string]: 'oklch(25% 0.02 255)',
  ['--m-fg' as string]: 'oklch(92% 0.01 250)',
  ['--m-muted' as string]: 'oklch(60% 0.015 250)',
  ['--m-green' as string]: '#00da7e',
  ['--m-cyan' as string]: '#00bdbe',
  ['--m-amber' as string]: '#fbbf24',
  ['--m-rose' as string]: '#fb7185',
};

// ── Reusable slider ──────────────────────────────────────────────────────────
function Slider({
  label, value, onChange, min, max, step = 1, unit = '', lowLabel, highLabel,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; unit?: string;
  lowLabel?: string; highLabel?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-sm" style={{ color: 'var(--m-muted)' }}>{label}</label>
        <span className="text-sm font-mono font-bold" style={{ color: 'var(--m-fg)' }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: 'var(--m-green)' }}
      />
      {(lowLabel || highLabel) && (
        <div className="flex justify-between mt-1">
          <span className="text-[10px]" style={{ color: 'var(--m-muted)' }}>{lowLabel}</span>
          <span className="text-[10px]" style={{ color: 'var(--m-muted)' }}>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

// ── Number input ─────────────────────────────────────────────────────────────
function NumberInput({
  label, value, onChange, unit, placeholder, optional = true,
}: {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; placeholder?: string; optional?: boolean;
}) {
  return (
    <div>
      <label className="text-sm mb-1.5 block" style={{ color: 'var(--m-muted)' }}>
        {label} {optional && <span className="text-[10px]">(optional)</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '—'}
          className="flex-1 rounded-lg px-3 py-2 text-sm font-mono outline-none transition-colors"
          style={{
            background: 'oklch(11% 0.02 255)',
            border: '1px solid var(--m-border)',
            color: 'var(--m-fg)',
          }}
        />
        {unit && <span className="text-xs shrink-0" style={{ color: 'var(--m-muted)' }}>{unit}</span>}
      </div>
    </div>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────
function WizardProgress({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-xs" style={{ color: 'var(--m-muted)' }}>
          {step < total ? `Step ${step + 1} of ${total}` : 'Results'}
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--m-green)' }}>{pct}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--m-border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--m-green)' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

// ── Age gauge visual ─────────────────────────────────────────────────────────
function AgeGauge({ chronological, biological }: { chronological: number; biological: number }) {
  const delta = biological - chronological;
  const color = delta <= -2 ? 'var(--m-green)' : delta < 3 ? 'var(--m-amber)' : 'var(--m-rose)';
  return (
    <div className="flex items-center justify-center gap-8 py-6">
      <div className="text-center">
        <p className="text-4xl font-black" style={{ color: 'var(--m-fg)' }}>{chronological}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--m-muted)' }}>Chronological</p>
      </div>
      <div className="text-center">
        <p className="text-5xl font-black" style={{ color }}>{biological}</p>
        <p className="text-xs mt-1 font-medium" style={{ color }}>Biological Age</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--m-muted)' }}>
          {delta > 0 ? `+${delta}` : delta} years vs chrono
        </p>
      </div>
    </div>
  );
}

// ── Domain bar ───────────────────────────────────────────────────────────────
function DomainBar({ name, score, grade, insight }: {
  name: string; score: number; grade: string; insight: string;
}) {
  const color = grade === 'A' || grade === 'B' ? 'var(--m-green)'
    : grade === 'C' ? 'var(--m-amber)' : 'var(--m-rose)';
  return (
    <div className="rounded-lg p-3" style={{ background: 'oklch(11% 0.02 255)' }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold" style={{ color: 'var(--m-fg)' }}>{name}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden mb-2" style={{ background: 'var(--m-border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--m-muted)' }}>{insight}</p>
    </div>
  );
}

// ── Results view ─────────────────────────────────────────────────────────────
function Results({ result, onReset }: { result: BioAgeResult; onReset: () => void }) {
  const Icon = result.ageDelta <= 0 ? ShieldCheck
    : result.ageDelta < 3 ? AlertTriangle
    : Flame;
  const accentColor = result.ageDelta <= -2 ? 'var(--m-green)'
    : result.ageDelta < 3 ? 'var(--m-amber)' : 'var(--m-rose)';

  // Map protocol compounds to product picks for direct buy links
  const protocolWithProducts = result.protocol.map((entry) => {
    // Try to find a product pick by matching compound name prefix
    const compoundId = entry.compound.toLowerCase().split(' ')[0];
    const pick = getProductPick(compoundId);
    return { ...entry, pick };
  });

  return (
    <div className="space-y-5">
      {/* Headline */}
      <div
        className="rounded-xl p-4 flex gap-3 items-start"
        style={{
          background: `color-mix(in oklab, ${accentColor} 8%, transparent)`,
          border: `1px solid color-mix(in oklab, ${accentColor} 30%, transparent)`,
        }}
      >
        <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accentColor }} aria-hidden="true" />
        <p className="text-sm font-semibold" style={{ color: 'var(--m-fg)' }}>{result.headline}</p>
      </div>

      {/* Age gauge */}
      <AgeGauge chronological={result.chronologicalAge} biological={result.biologicalAge} />

      {/* Domain breakdown */}
      <div className="grid gap-2 sm:grid-cols-2">
        <DomainBar {...result.domains.metabolic} />
        <DomainBar {...result.domains.inflammatory} />
        <DomainBar {...result.domains.hormonalMito} />
        <DomainBar {...result.domains.lifestyle} />
      </div>

      {/* Personalized protocol with buy links */}
      <div
        className="rounded-xl p-5"
        style={{ background: 'var(--m-card)', border: '1px solid var(--m-border)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--m-muted)' }}>
          Your Personalized Protocol
        </p>
        <div className="space-y-3">
          {protocolWithProducts.map((entry) => (
            <div
              key={entry.compound}
              className="flex items-start justify-between gap-3 pb-3"
              style={{ borderBottom: '1px solid var(--m-border)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: entry.priority === 'critical' ? 'var(--m-rose)'
                        : entry.priority === 'high' ? 'var(--m-amber)' : 'var(--m-green)',
                    }}
                  />
                  <span className="text-sm font-semibold" style={{ color: 'var(--m-fg)' }}>
                    {entry.compound}
                  </span>
                  <span
                    className="text-[10px] font-mono rounded px-1.5 py-0.5 capitalize"
                    style={{
                      color: entry.priority === 'critical' ? 'var(--m-rose)'
                        : entry.priority === 'high' ? 'var(--m-amber)' : 'var(--m-green)',
                      border: `1px solid color-mix(in oklab, ${
                        entry.priority === 'critical' ? 'var(--m-rose)'
                        : entry.priority === 'high' ? 'var(--m-amber)' : 'var(--m-green)'
                      } 40%, transparent)`,
                    }}
                  >
                    {entry.priority}
                  </span>
                </div>
                <p className="text-xs mt-0.5 pl-3.5" style={{ color: 'var(--m-muted)' }}>
                  {entry.mechanism}
                </p>
              </div>
              {entry.pick && (
                <Link
                  href={`/products#${entry.pick.compoundId}`}
                  className="shrink-0 flex items-center gap-1 text-[11px] font-medium rounded-lg px-2.5 py-1.5 transition-colors"
                  style={{
                    background: 'color-mix(in oklab, var(--m-green) 10%, transparent)',
                    color: 'var(--m-green)',
                    border: '1px solid color-mix(in oklab, var(--m-green) 25%, transparent)',
                  }}
                >
                  <ShoppingBag className="w-3 h-3" aria-hidden="true" />
                  Buy
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] mt-4 pt-3" style={{ color: 'var(--m-muted)', borderTop: '1px solid var(--m-border)' }}>
          Educational only — not medical advice. Consult a physician before starting any protocol.
        </p>
      </div>

      {/* CTA row */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/products"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-opacity hover:opacity-90"
          style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          Shop Vetted Products
        </Link>
        <Link
          href="/library"
          className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors"
          style={{ border: '1px solid var(--m-border)', color: 'var(--m-fg)' }}
        >
          <FlaskConical className="w-4 h-4" aria-hidden="true" />
          Library
        </Link>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm transition-colors"
          style={{ border: '1px solid var(--m-border)', color: 'var(--m-muted)' }}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Retake
        </button>
      </div>
    </div>
  );
}

// ── Step icons ───────────────────────────────────────────────────────────────
const STEP_ICONS = [Activity, Zap, Flame, Moon, CheckCircle2];
const STEP_TITLES = ['Basic Profile', 'Metabolic Health', 'Inflammation & Gut', 'Lifestyle & Vitality', 'Your Results'];

// ── Main component ───────────────────────────────────────────────────────────
export function BioAgeEstimator() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<BioAgeResult | null>(null);

  const [profile, setProfile] = useState<BasicProfile>({
    chronologicalAge: 45, sex: 'prefer_not', weightKg: 75, heightCm: 175,
  });
  const [metabolic, setMetabolic] = useState<MetabolicInputs>({
    fastingGlucose: null, hba1c: null, triglycerides: null, hdl: null, ldl: null, skipped: false,
  });
  const [inflammatory, setInflammatory] = useState<InflammatoryInputs>({
    hsCRP: null, dietQuality: 60, gutHealth: 60, skipped: false,
  });
  const [hormonalMito, setHormonalMito] = useState<HormonalMitoInputs>({
    vitaminD: null, energyLevel: 60, libidoVitality: 60, restingHR: null,
  });
  const [lifestyle, setLifestyle] = useState<LifestyleInputs>({
    sleepHours: 7, sleepQuality: 65, exerciseDaysPerWeek: 3, exerciseIntensity: 60,
    stressLoad: 40, fastingPractice: 40, smokingAlcohol: 20,
  });

  const compute = () => {
    const r = computeBioAge({ profile, metabolic, inflammatory, hormonalMito, lifestyle });
    setResult(r);
    setStep(4);
  };

  const reset = () => { setResult(null); setStep(0); };

  const StepIcon = STEP_ICONS[step] ?? CheckCircle2;

  return (
    <div style={TOKENS} className="w-full max-w-2xl mx-auto">
      <WizardProgress step={step} total={4} />

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--m-border)', background: 'var(--m-card)' }}
      >
        {/* Step header */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{
            borderBottom: '1px solid var(--m-border)',
            background: 'color-mix(in oklab, var(--m-green) 5%, transparent)',
          }}
        >
          <StepIcon className="w-5 h-5" style={{ color: 'var(--m-green)' }} aria-hidden="true" />
          <div>
            <p className="text-[11px] uppercase tracking-widest font-medium" style={{ color: 'var(--m-green)' }}>
              {step < 4 ? `Step ${step + 1} of 4` : 'Results'}
            </p>
            <p className="text-base font-bold" style={{ color: 'var(--m-fg)' }}>
              {STEP_TITLES[step]}
            </p>
          </div>
        </div>

        {/* Step content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {/* ── Step 0: Profile ── */}
              {step === 0 && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <NumberInput
                      label="Age"
                      value={String(profile.chronologicalAge)}
                      onChange={(v) => setProfile((p) => ({ ...p, chronologicalAge: Number(v) || 45 }))}
                      unit="years"
                      placeholder="45"
                      optional={false}
                    />
                    <div>
                      <label className="text-sm mb-1.5 block" style={{ color: 'var(--m-muted)' }}>Sex</label>
                      <div className="flex gap-2">
                        {(['male', 'female', 'prefer_not'] as Sex[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => setProfile((p) => ({ ...p, sex: s }))}
                            className="flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-colors"
                            style={{
                              background: profile.sex === s
                                ? 'color-mix(in oklab, var(--m-green) 15%, transparent)'
                                : 'oklch(11% 0.02 255)',
                              border: profile.sex === s
                                ? '1px solid color-mix(in oklab, var(--m-green) 40%, transparent)'
                                : '1px solid var(--m-border)',
                              color: profile.sex === s ? 'var(--m-green)' : 'var(--m-muted)',
                            }}
                          >
                            {s === 'prefer_not' ? 'Prefer not' : s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <NumberInput label="Weight" value={String(profile.weightKg)} onChange={(v) => setProfile((p) => ({ ...p, weightKg: Number(v) || 75 }))} unit="kg" placeholder="75" optional={false} />
                    <NumberInput label="Height" value={String(profile.heightCm)} onChange={(v) => setProfile((p) => ({ ...p, heightCm: Number(v) || 175 }))} unit="cm" placeholder="175" optional={false} />
                  </div>
                </div>
              )}

              {/* ── Step 1: Metabolic ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs" style={{ color: 'var(--m-muted)' }}>
                    Skip any values you don&apos;t have — the engine will estimate from lifestyle inputs.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <NumberInput label="Fasting Glucose" value={String(metabolic.fastingGlucose ?? '')} onChange={(v) => setMetabolic((p) => ({ ...p, fastingGlucose: v ? Number(v) : null }))} unit="mg/dL" placeholder="85" />
                    <NumberInput label="HbA1c" value={String(metabolic.hba1c ?? '')} onChange={(v) => setMetabolic((p) => ({ ...p, hba1c: v ? Number(v) : null }))} unit="%" placeholder="5.2" />
                    <NumberInput label="Triglycerides" value={String(metabolic.triglycerides ?? '')} onChange={(v) => setMetabolic((p) => ({ ...p, triglycerides: v ? Number(v) : null }))} unit="mg/dL" placeholder="100" />
                    <NumberInput label="HDL Cholesterol" value={String(metabolic.hdl ?? '')} onChange={(v) => setMetabolic((p) => ({ ...p, hdl: v ? Number(v) : null }))} unit="mg/dL" placeholder="60" />
                  </div>
                </div>
              )}

              {/* ── Step 2: Inflammation ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <NumberInput label="hs-CRP" value={String(inflammatory.hsCRP ?? '')} onChange={(v) => setInflammatory((p) => ({ ...p, hsCRP: v ? Number(v) : null }))} unit="mg/L" placeholder="0.5" />
                  <Slider label="Diet Quality" value={inflammatory.dietQuality} onChange={(v) => setInflammatory((p) => ({ ...p, dietQuality: v }))} min={0} max={100} lowLabel="Ultra-processed" highLabel="Whole food" />
                  <Slider label="Gut Health" value={inflammatory.gutHealth} onChange={(v) => setInflammatory((p) => ({ ...p, gutHealth: v }))} min={0} max={100} lowLabel="Chronic issues" highLabel="Excellent" />
                </div>
              )}

              {/* ── Step 3: Lifestyle ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <Slider label="Sleep Hours" value={lifestyle.sleepHours} onChange={(v) => setLifestyle((p) => ({ ...p, sleepHours: v }))} min={4} max={10} step={0.5} unit="h" />
                  <Slider label="Sleep Quality" value={lifestyle.sleepQuality} onChange={(v) => setLifestyle((p) => ({ ...p, sleepQuality: v }))} min={0} max={100} lowLabel="Poor" highLabel="Excellent" />
                  <Slider label="Exercise Days / Week" value={lifestyle.exerciseDaysPerWeek} onChange={(v) => setLifestyle((p) => ({ ...p, exerciseDaysPerWeek: v }))} min={0} max={7} unit="d" />
                  <Slider label="Stress Load" value={lifestyle.stressLoad} onChange={(v) => setLifestyle((p) => ({ ...p, stressLoad: v }))} min={0} max={100} lowLabel="Low" highLabel="Chronic" />
                  <Slider label="Energy Level" value={hormonalMito.energyLevel} onChange={(v) => setHormonalMito((p) => ({ ...p, energyLevel: v }))} min={0} max={100} lowLabel="Exhausted" highLabel="Optimal" />
                </div>
              )}

              {/* ── Step 4: Results ── */}
              {step === 4 && result && <Results result={result} onReset={reset} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{ border: '1px solid var(--m-border)', color: 'var(--m-muted)' }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => step < 3 ? setStep((s) => s + 1) : compute()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: 'var(--m-green)', color: 'oklch(12% 0.02 255)' }}
              >
                {step < 3 ? 'Continue' : 'Calculate My Biological Age'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
