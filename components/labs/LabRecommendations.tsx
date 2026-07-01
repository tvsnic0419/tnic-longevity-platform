'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Pill, Activity, Stethoscope, ArrowRight, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';
import type { LabRecommendation } from '@/lib/lab-analysis';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { usePlatform } from '@/context/PlatformContext';

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

const hallmarkSlug = (id: string) => hallmarkLibrary.find((h) => h.id === id)?.slug ?? id;
const hallmarkTitle = (id: string) => hallmarkLibrary.find((h) => h.id === id)?.title ?? id;

const categoryIcon = {
  compound: Pill,
  lifestyle: Activity,
  monitoring: Lightbulb,
  clinical: Stethoscope,
};

const priorityStyle = {
  high: 'border-accent-rose/30 bg-accent-rose/5',
  medium: 'border-accent-amber/20 bg-accent-amber/5',
  low: 'border-border',
};

interface LabRecommendationsProps {
  recommendations: LabRecommendation[];
}

export function LabRecommendations({ recommendations }: LabRecommendationsProps) {
  const { toggle, selected } = usePlatform();

  if (recommendations.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-muted-foreground text-sm">Log lab data to unlock personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec, i) => {
        const Icon = categoryIcon[rec.category];
        const inStack = rec.compoundId && selected.includes(rec.compoundId);

        return (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass rounded-xl p-5 border ${priorityStyle[rec.priority]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${
                rec.priority === 'high' ? 'bg-accent-rose/10' : rec.priority === 'medium' ? 'bg-accent-amber/10' : 'bg-muted/50'
              }`}>
                <Icon className={`w-4 h-4 ${
                  rec.priority === 'high' ? 'text-accent-rose' : rec.priority === 'medium' ? 'text-accent-amber' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <span className="text-[9px] font-mono text-caption uppercase">{rec.priority}</span>
                  {inStack && (
                    <span className="text-[9px] font-mono text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.5 rounded">
                      in stack
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{rec.rationale}</p>
                <p className="text-xs text-muted-foreground">{rec.action}</p>
                {rec.compoundId && !inStack && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    <button
                      onClick={() => toggle(rec.compoundId!)}
                      className="text-xs font-semibold text-accent-rose hover:text-accent-cyan transition flex items-center gap-1"
                    >
                      Add to active stack <ArrowRight className="w-3 h-3" />
                    </button>
                    {rec.priority === 'high' && rec.hallmarkIds[0] && (
                      <Link
                        href={`/stacks?from=labs&preset=${HALLMARK_PRESET_MAP[rec.hallmarkIds[0]] ?? 'hybrid'}`}
                        className="text-xs font-semibold text-accent-violet hover:text-accent-cyan transition flex items-center gap-1"
                      >
                        <Layers className="w-3 h-3" />
                        Load targeted stack
                      </Link>
                    )}
                  </div>
                )}
                {rec.hallmarkIds.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rec.hallmarkIds.map((h) => (
                      <Link
                        key={h}
                        href={`/hallmarks/${hallmarkSlug(h)}`}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-accent-cyan hover:text-accent-emerald transition"
                      >
                        <BookOpen className="w-3 h-3 shrink-0" />
                        {hallmarkTitle(h)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}