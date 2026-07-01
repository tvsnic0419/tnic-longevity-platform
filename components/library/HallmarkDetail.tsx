'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { HallmarkLibraryEntry } from '@/lib/types';
import { HallmarkVisual } from './HallmarkVisual';
import { InterventionExplorer } from './InterventionExplorer';
import { HallmarkNotesPanel } from './HallmarkNotesPanel';
import { MdxRenderer } from './MdxRenderer';
import { ContextRail } from '@/components/ui/ContextRail';
import { getHallmarkContext } from '@/lib/hub-context';

export function HallmarkDetail({
  hallmark,
  mdxBody,
}: {
  hallmark: HallmarkLibraryEntry;
  mdxBody: string | null;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground pt-6 md:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-cyan transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Anti-Aging Library
        </Link>

        <Link
          href={`/hallmarks/${hallmark.slug}`}
          className="inline-flex items-center gap-2 w-full rounded-xl border border-accent-emerald/30 bg-accent-emerald/5 px-4 py-3 mb-8 text-sm font-semibold text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Editorial Deep Dive — mechanisms, biomarkers &amp; evidence-graded interventions</span>
          <ArrowLeft className="w-4 h-4 ml-auto rotate-180 shrink-0" />
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <HallmarkVisual
              visual={hallmark.visual}
              coverage={hallmark.coverage}
              number={hallmark.number}
            />
            <HallmarkNotesPanel hallmark={hallmark} />
          </div>

          <div className="lg:col-span-8 space-y-10">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-mono text-[10px] text-accent-cyan tracking-widest mb-2">
                HALLMARK {hallmark.number} OF 12
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{hallmark.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{hallmark.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{hallmark.summary}</p>
              <div className="glass rounded-xl p-5 mb-4">
                <p className="text-[10px] font-mono text-accent-violet uppercase mb-2">Mechanism</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{hallmark.mechanism}</p>
              </div>
              <div className="glass rounded-xl p-5">
                <p className="text-[10px] font-mono text-accent-amber uppercase mb-2">Why it matters</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{hallmark.whyItMatters}</p>
              </div>
            </motion.div>

            <ContextRail {...getHallmarkContext(hallmark)} theme="cyan" />

            {mdxBody && (
              <div className="gradient-border p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                  <p className="text-[10px] font-mono text-accent-cyan uppercase">Deep dive (MDX)</p>
                </div>
                <MdxRenderer content={mdxBody} />
              </div>
            )}

            <div>
              <p className="text-[10px] font-mono text-accent-emerald uppercase tracking-wider mb-4">
                Intervention Explorer — ranked by evidence
              </p>
              <InterventionExplorer
                interventions={hallmark.interventions}
                hallmarkTitle={hallmark.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}