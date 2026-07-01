'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, Shield, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import type { HallmarkRisk, RiskLevel } from '@/lib/lab-analysis';

const HALLMARK_PRESET_MAP: Record<string, string> = {
  mito: 'mito',
  genomic: 'nrf2',
  inflammation: 'nrf2',
  proteostasis: 'nrf2',
  autophagy: 'mito',
  epigenetic: 'mito',
  senescence: 'nrf2',
  stem: 'mito',
  intercell: 'hybrid',
  dysbiosis: 'starter',
  telomere: 'hybrid',
  macroautophagy: 'mito',
};

const riskStyle: Record<RiskLevel, { bar: string; text: string; bg: string }> = {
  low: { bar: 'bg-accent-emerald', text: 'text-accent-emerald', bg: 'bg-accent-emerald/10' },
  moderate: { bar: 'bg-accent-cyan', text: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
  elevated: { bar: 'bg-accent-amber', text: 'text-accent-amber', bg: 'bg-accent-amber/10' },
  high: { bar: 'bg-accent-rose', text: 'text-accent-rose', bg: 'bg-accent-rose/10' },
};

interface HallmarkRiskPanelProps {
  risks: HallmarkRisk[];
  healthspanScore: number;
}

export function HallmarkRiskPanel({ risks, healthspanScore }: HallmarkRiskPanelProps) {
  const slugFor = (id: string) => hallmarkLibrary.find((h) => h.id === id)?.slug ?? id;

  if (risks.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <Shield className="w-8 h-8 text-caption mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">Log biomarkers to generate hallmark-linked risk insights.</p>
        <p className="text-xs text-caption mt-2">Each marker maps to 1–4 hallmarks of aging for prognosis analysis.</p>
      </div>
    );
  }

  const elevated = risks.filter((r) => r.riskLevel === 'high' || r.riskLevel === 'elevated');

  return (
    <div className="space-y-6">
      {/* Healthspan score */}
      <div className="gradient-border p-6 text-center">
        <p className="text-[10px] font-mono text-accent-rose uppercase tracking-wider mb-1">Lab-Derived Healthspan Score</p>
        <motion.p
          key={healthspanScore}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`text-5xl font-bold ${
            healthspanScore >= 75 ? 'text-accent-emerald' : healthspanScore >= 50 ? 'text-accent-amber' : 'text-accent-rose'
          }`}
        >
          {healthspanScore}
        </motion.p>
        <p className="text-xs text-muted-foreground mt-2">Based on {risks.reduce((s, r) => s + r.drivingMarkers.length, 0)} marker–hallmark links</p>
        {elevated.length > 0 && (
          <p className="text-xs text-accent-amber mt-3 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {elevated.length} hallmark{elevated.length > 1 ? 's' : ''} need attention
          </p>
        )}
      </div>

      {/* Risk cards */}
      <div className="space-y-3">
        {risks.map((risk, i) => {
          const style = riskStyle[risk.riskLevel];
          return (
            <motion.div
              key={risk.hallmarkId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`glass rounded-xl p-5 border border-border`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[10px] font-mono text-caption">HALLMARK {risk.hallmarkNumber}</p>
                  <h4 className="font-semibold text-sm">{risk.hallmarkTitle}</h4>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                  {risk.riskLevel}
                </span>
              </div>

              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${style.bar}`}
                  style={{ width: `${risk.riskScore}%` }}
                />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{risk.prognosis}</p>

              {risk.drivingMarkers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {risk.drivingMarkers.map((m) => (
                    <span
                      key={m.markerId}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        m.status === 'critical'
                          ? 'bg-accent-rose/10 text-accent-rose'
                          : m.status === 'watch'
                            ? 'bg-accent-amber/10 text-accent-amber'
                            : 'bg-accent-emerald/10 text-accent-emerald'
                      }`}
                    >
                      {m.name}: {m.value}
                    </span>
                  ))}
                </div>
              )}

              {risk.priorityInterventions.length > 0 && (
                <p className="text-[10px] text-caption mb-2">
                  Interventions: {risk.priorityInterventions.join(' · ')}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-1">
                <Link
                  href={`/hallmarks/${slugFor(risk.hallmarkId)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:text-accent-emerald transition"
                >
                  <BookOpen className="w-3 h-3" />
                  Editorial deep dive
                </Link>
                <span className="text-caption text-xs">·</span>
                <Link
                  href={`/library/${slugFor(risk.hallmarkId)}`}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
                >
                  Library
                  <ArrowRight className="w-3 h-3" />
                </Link>
                {(risk.riskLevel === 'high' || risk.riskLevel === 'elevated') && (
                  <>
                    <span className="text-caption text-xs">·</span>
                    <Link
                      href={`/stacks?from=labs&preset=${HALLMARK_PRESET_MAP[risk.hallmarkId] ?? 'hybrid'}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent-violet hover:text-accent-cyan transition"
                    >
                      <Layers className="w-3 h-3" />
                      Load targeted stack
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}