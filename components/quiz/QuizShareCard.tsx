'use client';

import { useState } from 'react';
import { Link2, Copy, FileText, CheckCircle2, Share2 } from 'lucide-react';
import type { QuizAnswers } from '@/lib/homepage';
import {
  buildQuizShareMarkdown,
  buildQuizShareText,
  buildQuizShareUrl,
  buildQuizStacksUrl,
  buildQuizShopUrl,
  PRESET_OG_ACCENTS,
} from '@/lib/quiz-share';
import type { PresetKey } from '@/lib/presets';
import { compounds } from '@/lib/data';
import { getQuizResult } from '@/lib/homepage';

interface QuizShareCardProps {
  answers: Required<QuizAnswers>;
  preset: PresetKey;
  stackLabel: string;
}

type CopyKind = 'link' | 'stacks' | 'shop' | 'text' | 'markdown' | null;

export function QuizShareCard({ answers, preset, stackLabel }: QuizShareCardProps) {
  const [copied, setCopied] = useState<CopyKind>(null);

  const copy = async (kind: CopyKind, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      /* ignore */
    }
  };

  const result = getQuizResult(answers);
  const shareUrl = buildQuizShareUrl(answers);
  const stacksUrl = buildQuizStacksUrl(preset);
  const shopUrl = buildQuizShopUrl(preset);
  const accent = PRESET_OG_ACCENTS[preset] ?? '#34d399';

  const stackCompounds = result.stack.ids
    .map((id) => compounds.find((c) => c.id === id))
    .filter(Boolean) as typeof compounds;

  const hallmarkCount = new Set(stackCompounds.flatMap((c) => c.hallmarks)).size;

  return (
    <div className="mt-4 space-y-3">
      {/* Visual stack card */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: `${accent}33` }}
      >
        {/* Card header strip */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: `${accent}18` }}
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accent }}>
              TNiC · My Stack
            </p>
            <p className="text-sm font-black text-foreground leading-tight">{stackLabel}</p>
          </div>
          <Share2 className="w-4 h-4" style={{ color: accent }} />
        </div>

        {/* Compound list */}
        <div className="px-5 py-3 space-y-2 bg-card/40">
          {stackCompounds.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-foreground">{c.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-mono">{c.dose}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    c.evidence === 'A'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {c.evidence}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Card footer */}
        <div className="px-5 py-2.5 border-t bg-card/60 flex items-center justify-between" style={{ borderColor: `${accent}22` }}>
          <span className="text-[10px] text-muted-foreground">
            {stackCompounds.length} compounds · {hallmarkCount} hallmarks targeted
          </span>
          <span className="text-[10px] font-semibold" style={{ color: accent }}>tnic.help</span>
        </div>
      </div>

      {/* Copy actions */}
      <div className="glass rounded-xl p-4 border border-accent-violet/20">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-4 h-4 text-accent-violet" aria-hidden="true" />
          <p className="text-label text-accent-violet">Share your stack</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => copy('link', shareUrl)}
            className="focus-ring inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-accent-violet/15 border border-accent-violet/25 text-violet-300 hover:bg-accent-violet/25 transition"
          >
            {copied === 'link' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            {copied === 'link' ? 'Copied' : 'Quiz link'}
          </button>
          <button
            type="button"
            onClick={() => copy('stacks', stacksUrl)}
            className="focus-ring inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold glass hover:border-accent-cyan/30 transition"
          >
            {copied === 'stacks' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            {copied === 'stacks' ? 'Copied' : 'Architect link'}
          </button>
          <button
            type="button"
            onClick={() => copy('shop', shopUrl)}
            className="focus-ring inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold glass hover:border-accent-emerald/30 transition"
          >
            {copied === 'shop' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            {copied === 'shop' ? 'Copied' : `Shop (${stackLabel})`}
          </button>
          <button
            type="button"
            onClick={() => copy('text', buildQuizShareText(answers))}
            className="focus-ring inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold glass hover:border-accent-violet/30 transition"
          >
            {copied === 'text' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied === 'text' ? 'Copied' : 'Social post'}
          </button>
          <button
            type="button"
            onClick={() => copy('markdown', buildQuizShareMarkdown(answers))}
            className="focus-ring inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold glass hover:border-accent-emerald/30 transition"
          >
            {copied === 'markdown' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
            {copied === 'markdown' ? 'Copied' : 'Markdown'}
          </button>
        </div>
      </div>
    </div>
  );
}
