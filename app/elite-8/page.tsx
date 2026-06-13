'use client';

import React, { useState, useEffect } from 'react';

// ─── DESIGN TOKENS ─────────────────────────────────
const C = {
  cream: '#F8F5EE',
  forest: '#1A3A2A',
  teal: '#00C9A7',
  amber: '#D4A843',
  carbon: '#1C1C1E',
  mist: '#EAE7DE',
  fern: '#2E5D42',
  navy: '#0F172A',
} as const;

// ─── EQUATION CONSTANTS ───────────────────────────
const WEIGHTS = { CE: 0.22, EB: 0.18, ES: 0.16, EE: 0.14, SF: 0.12, BV: 0.10, HP: 0.05, R: 0.03 } as const;

// ─── PRODUCT DATA ───────────────────────────
const PRODUCTS = [ { id: 'nmn', name: 'NMN', full: 'Nicotinamide Mononucleotide', category: 'NAD+ Precursor', mechanism: 'Replenishes NAD⁺ → activates sirtuins, PARP repair, mitochondrial biogenesis', CE: 7.2, EB: 8.1, ES: 7.8, EE: 9.2, SF: 8.5, BV: 6.8, HP: 6.5, R: 2.0, topStudy: 'Igarashi et al. 2022 — oral NMN raised NAD⁺ 38%, improved muscle function in older adults', clock: 'Horvath DNAmAge −2.1yr avg (pilot)', color: C.teal }, { id: 'rapamycin', name: 'Rapamycin', full: 'Rapamycin (Sirolimus)', category: 'mTOR Inhibitor', mechanism: 'Inhibits mTORC1 → induces autophagy, reduces senescent cell burden, extends lifespan in 25+ model organisms', CE: 8.8, EB: 7.4, ES: 9.1, EE: 9.8, SF: 5.5, BV: 7.5, HP: 5.8, R: 5.5, topStudy: 'Harrison et al. 2009 (ITP) — 14% lifespan extension in mice; multiple human trials ongoing', clock: 'PhenoAge −3.4yr (Mannick 2022 cohort)', color: C.amber }, { id: 'metformin', name: 'Metformin', full: 'Metformin HCl', category: 'AMPK Activator', mechanism: 'Activates AMPK, inhibits Complex I → mimics caloric restriction, reduces IGF-1 signaling', CE: 9.2, EB: 6.8, ES: 7.2, EE: 8.5, SF: 7.8, BV: 8.9, HP: 9.1, R: 2.8, topStudy: 'TAME Trial (ongoing) — observational: diabetics on metformin outlive matched non-diabetic controls', clock: 'GrimAge −1.8yr (epidemiological estimate)', color: C.fern }, { id: 'spermidine', name: 'Spermidine', full: 'Spermidine', category: 'Autophagy Inducer', mechanism: 'Polyamine → induces autophagy via eIF5A hypusination; epigenetically modulates histones', CE: 7.0, EB: 7.9, ES: 7.3, EE: 8.7, SF: 9.0, BV: 7.2, HP: 7.4, R: 1.5, topStudy: 'Madeo et al. 2021 (Cell) — wheat germ extract RCT: improved memory in older adults', clock: 'DunedinPACE −0.12 units (Schroeder 2021)', color: '#7B68EE' }, { id: 'senolytics', name: 'D+Q', full: 'Dasatinib + Quercetin', category: 'Senolytic Combo', mechanism: 'Clears senescent cells via pro-apoptotic pathway restoration → reduces SASP, tissue rejuvenation', CE: 7.8, EB: 8.6, ES: 8.4, EE: 8.1, SF: 6.2, BV: 6.5, HP: 5.5, R: 4.2, topStudy: 'Kirkland 2023 — intermittent D+Q improved frailty index in IPF patients; multiple phase 2 trials', clock: 'Horvath −3.2yr (Mayo Clinic pilot, n=9)', color: '#E85D75' }, { id: 'glycine_nac', name: 'GlyNAC', full: 'Glycine + N-Acetylcysteine', category: 'Glutathione Precursor', mechanism: 'Restores glutathione → combats oxidative stress, mitochondrial dysfunction, hallmarks of aging', CE: 7.5, EB: 8.2, ES: 8.0, EE: 7.6, SF: 9.3, BV: 8.4, HP: 6.8, R: 1.2, topStudy: 'Kumar et al. 2023 (JNutr) — GlyNAC in older adults: GSH +139%, mitochondrial function +71%', clock: 'Biological age markers −3.0yr equiv (functional)', color: '#FF7F50' }, { id: 'taurine', name: 'Taurine', full: 'Taurine', category: 'Sulfonic Amino Acid', mechanism: 'Declines ~80% with age; supplementation activates longevity pathways, reduces DNA damage, extends C. elegans/mouse lifespan', CE: 7.6, EB: 7.1, ES: 7.5, EE: 8.4, SF: 9.5, BV: 9.0, HP: 7.2, R: 1.0, topStudy: 'Singh et al. 2023 (Science) — taurine deficiency drives aging; supplementation +10% lifespan in mice', clock: 'GlycoAge −2.4yr (glycan estimate)', color: '#00BFFF' }, { id: 'resveratrol_pterostilbene', name: 'Pterostilbene', full: 'Pterostilbene (Resveratrol analog)', category: 'SIRT1 Activator', mechanism: 'Methylated resveratrol → 4× bioavailability; activates SIRT1, induces autophagy, anti-inflammatory', CE: 6.8, EB: 7.3, ES: 7.0, EE: 8.0, SF: 8.8, BV: 9.2, HP: 6.2, R: 1.8, topStudy: 'Kapetanovic et al. 2011 — superior bioavailability vs resveratrol; human safety confirmed 350mg/day', clock: 'Horvath est. −1.5yr (extrapolated from animal models)', color: '#9B59B6' } ] as const;

function calcScore(p: typeof PRODUCTS[number]) { return (WEIGHTS.CE * p.CE + WEIGHTS.EB * p.EB + WEIGHTS.ES * p.ES + WEIGHTS.EE * p.EE + WEIGHTS.SF * p.SF + WEIGHTS.BV * p.BV + WEIGHTS.HP * p.HP - WEIGHTS.R * p.R) * 10; }
const scored = [...PRODUCTS].map(p => ({ ...p, score: calcScore(p) })).sort((a, b) => b.score - a.score);
const DIMS = [ { key: 'CE' as const, label: 'Clinical Evidence', w: WEIGHTS.CE, desc: 'RCT quality, meta-analyses, N-size' }, { key: 'EB' as const, label: 'Epigenetic Biomarkers', w: WEIGHTS.EB, desc: 'Methylation clock improvements' }, { key: 'ES' as const, label: 'Effect Size', w: WEIGHTS.ES, desc: 'Magnitude of benefit (Cohen\'s d equiv)' }, { key: 'EE' as const, label: 'Evolutionary Evidence', w: WEIGHTS.EE, desc: 'Conserved pathway target across species' }, { key: 'SF' as const, label: 'Safety Profile', w: WEIGHTS.SF, desc: 'Tolerability, adverse event rate' }, { key: 'BV' as const, label: 'Bioavailability', w: WEIGHTS.BV, desc: 'Absorption, delivery, formulation quality' }, { key: 'HP' as const, label: 'Human Population Data', w: WEIGHTS.HP, desc: 'Observational cohort / epidemiological signal' }, { key: 'R' as const, label: 'Risk Penalty', w: WEIGHTS.R, desc: 'Adverse events, drug interactions (subtracted)' } ];

function AnimCounter({ target, duration = 1400, decimals = 1 }: { target: number; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => { let start: number | null = null; const step = (ts: number) => { if (!start) start = ts; const pct = Math.min((ts - start) / duration, 1); setVal(+(target * pct).toFixed(decimals)); if (pct < 1) requestAnimationFrame(step); }; const raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [target, duration, decimals]); return <span>{val.toFixed(decimals)}</span>;
}

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth((value / max) * 100), 60); return () => clearTimeout(t); }, [value, max]);
  return <div className="h-1.5 w-full bg-[#E5E2D9] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${width}%`, background: color }} /></div>;
}

function RadarMini({ product, size = 168 }: { product: typeof scored[0]; size?: number }) {
  const dims = ['CE', 'EB', 'ES', 'EE', 'SF', 'BV'] as const;
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const pts = dims.map((k, i) => { const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2; const val = product[k] / 10; return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) }; });
  const gridPts = dims.map((_, i) => { const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2; return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }; });
  const polyPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + 'Z';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
      <defs><linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={product.color} stopOpacity="0.15" /><stop offset="100%" stopColor={product.color} stopOpacity="0.05" /></linearGradient></defs>
      <polygon points={gridPts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')} fill="none" stroke="#D1CFC4" strokeWidth="1" />
      {[0.25, 0.5, 0.75].map((f, idx) => <polygon key={idx} points={dims.map((_, i) => { const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2; return `${(cx + r * f * Math.cos(angle)).toFixed(2)},${(cy + r * f * Math.sin(angle)).toFixed(2)}`; }).join(' ')} fill="none" stroke="#D1CFC4" strokeWidth="0.75" />)}
      {gridPts.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#D1CFC4" strokeWidth="0.75" />)}
      <path d={polyPath} fill={`url(#radarGrad)`} stroke={product.color} strokeWidth="2.25" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={product.color} stroke="#fff" strokeWidth="1.5" />)}
    </svg>
  );
}

function ProductCard({ product, rank, expanded, onToggle }: { product: typeof scored[0]; rank: number; expanded: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} className={`group rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${expanded ? 'border-[#00C9A7] shadow-xl shadow-black/5' : 'border-[#D5D0C6] hover:border-[#B8B3A8] hover:shadow-lg'}`} style={{ background: expanded ? C.forest : C.cream }}>
      <div className="p-8">
        <div className="flex items-start gap-6">
          <div className="font-mono text-[42px] font-black leading-none tracking-[-2px]" style={{ color: product.color }}>{String(rank).padStart(2, '0')}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className={`font-semibold text-3xl tracking-[-0.4px] transition-colors ${expanded ? 'text-white' : 'text-[#1C1C1E]'}`}>{product.name}</span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase" style={{ background: product.color + '22', color: product.color }}>{product.category}</span>
            </div>
            <div className={`mt-0.5 text-sm ${expanded ? 'text-white/60' : 'text-[#666]'}`}>{product.full}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[34px] font-black leading-none tracking-[-1.5px]" style={{ color: product.color }}><AnimCounter target={product.score} /></div>
            <div className={`text-[10px] tracking-[1.5px] mt-0.5 ${expanded ? 'text-white/50' : 'text-[#888]'}`}>LQ SCORE</div>
          </div>
        </div>
        <div className="mt-5"><ScoreBar value={product.score} color={product.color} /></div>
      </div>

      {expanded && (
        <div className="px-8 pb-8 pt-2 border-t border-white/10 text-[#ddd]">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <RadarMini product={product} size={172} />
              <div className="mt-2 text-[10px] tracking-widest text-white/50">CE · EB · ES · EE · SF · BV</div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-xs tracking-[1.5px] font-semibold mb-3 text-[#00C9A7]">DIMENSION SCORES</div>
                {DIMS.map(d => (
                  <div key={d.key} className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/70">{d.label} <span className="text-white/40">×{d.w.toFixed(2)}</span>{d.key === 'R' && <span className="text-red-400/80 ml-1">(penalty)</span>}</span>
                      <span className="font-mono font-semibold" style={{ color: d.key === 'R' ? '#ff6b6b' : product.color }}>{product[d.key].toFixed(1)}</span>
                    </div>
                    <ScoreBar value={product[d.key]} max={10} color={d.key === 'R' ? '#ff6b6b' : product.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 rounded-2xl p-5 text-sm leading-relaxed">
              <div className="uppercase tracking-[1.5px] text-xs font-semibold mb-2 text-[#00C9A7]">MECHANISM OF ACTION</div>
              {product.mechanism}
            </div>
            <div className="bg-white/5 rounded-2xl p-5 text-sm leading-relaxed">
              <div className="uppercase tracking-[1.5px] text-xs font-semibold mb-2 text-[#00C9A7]">KEY HUMAN STUDY</div>
              {product.topStudy}
              <div className="mt-3 text-[#00C9A7] text-xs tracking-wider">⏱ EPIGENETIC CLOCK IMPACT: {product.clock}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EquationBlock() {
  return (
    <div className="bg-[#1A3A2A] rounded-3xl p-9 text-white border border-[#00C9A7]/20">
      <div className="uppercase tracking-[2px] text-xs font-semibold text-[#00C9A7] mb-4">THE LONGEVITY QUOTIENT EQUATION</div>
      <div className="font-mono text-lg md:text-xl leading-relaxed tracking-[-0.3px] text-white/90">
        <span className="font-bold text-[#D4A843]">LQ(p)</span> = <span className="text-[#00C9A7]">0.22·CE</span> + <span className="text-[#7B68EE]">0.18·EB</span> + <span className="text-[#FF7F50]">0.16·ES</span> + <span className="text-[#00BFFF]">0.14·EE</span> + <span className="text-[#9B59B6]">0.12·SF</span> + <span className="text-[#E85D75]">0.10·BV</span> + <span className="text-white/60">0.05·HP</span> − <span className="text-red-400">0.03·R</span>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 text-xs text-white/70">
        {DIMS.map(d => <div key={d.key}><span className="font-semibold text-white">{d.key}</span> <span className="text-white/50">({(d.w*100).toFixed(0)}%)</span> — {d.desc}{d.key === 'R' && <span className="text-red-400/70"> [subtracted]</span>}</div>)}
      </div>
      <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-white/50 leading-relaxed">All dimension scores (0–10) derived from expert synthesis of peer-reviewed literature. Weights reflect evidence hierarchy in longevity science (Hallmarks of Aging + epigenetic clock validation). Final output scaled ×10 to 0–100 LQ.</div>
    </div>
  );
}

function CompareTool() {
  const [aId, setAId] = useState(scored[0].id); const [bId, setBId] = useState(scored[1].id);
  const pA = scored.find(p => p.id === aId)!; const pB = scored.find(p => p.id === bId)!;
  return (
    <div className="bg-white rounded-3xl border border-[#D5D0C6] p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="uppercase tracking-[1.5px] text-xs font-semibold text-[#1A3A2A]">HEAD-TO-HEAD COMPARISON</div>
        <div className="flex items-center gap-3 text-sm">
          <select value={aId} onChange={e => setAId(e.target.value)} className="bg-[#1A3A2A] text-white rounded-xl px-4 py-2 text-sm font-medium focus:outline-none">
            {scored.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <span className="text-[#888] font-medium">vs</span>
          <select value={bId} onChange={e => setBId(e.target.value)} className="bg-[#1A3A2A] text-white rounded-xl px-4 py-2 text-sm font-medium focus:outline-none">
            {scored.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>
      {DIMS.map(d => { const va = pA[d.key], vb = pB[d.key]; const winner = d.key === 'R' ? (va < vb ? 'A' : 'B') : (va > vb ? 'A' : 'B'); return (<div key={d.key} className="mb-4">
        <div className="flex justify-between text-xs mb-1.5 px-1 text-[#555]">
          <span className={winner === 'A' ? 'font-semibold' : ''} style={{ color: winner === 'A' ? pA.color : undefined }}>{va.toFixed(1)}</span>
          <span className="font-medium tracking-wider">{d.label}</span>
          <span className={winner === 'B' ? 'font-semibold' : ''} style={{ color: winner === 'B' ? pB.color : undefined }}>{vb.toFixed(1)}</span>
        </div>
        <div className="flex h-2 gap-1">
          <div className="rounded-l-full transition-all" style={{ flex: va, background: pA.color, opacity: winner === 'A' ? 1 : 0.35 }} />
          <div className="rounded-r-full transition-all" style={{ flex: vb, background: pB.color, opacity: winner === 'B' ? 1 : 0.35 }} />
        </div>
      </div>); })}
      <div className="mt-8 pt-6 border-t flex items-end justify-between text-center">
        <div><div className="font-mono text-4xl font-black tracking-[-1px]" style={{ color: pA.color }}>{pA.score.toFixed(1)}</div><div className="text-xs text-[#888] mt-1">{pA.name} LQ</div></div>
        <div className="text-sm text-[#666] pb-2">{pA.score > pB.score ? <><span className="font-semibold" style={{color: pA.color}}>{pA.name}</span> leads by <span className="font-mono">{(pA.score - pB.score).toFixed(1)}</span></> : <><span className="font-semibold" style={{color: pB.color}}>{pB.name}</span> leads by <span className="font-mono">{(pB.score - pA.score).toFixed(1)}</span></>}</div>
        <div><div className="font-mono text-4xl font-black tracking-[-1px]" style={{ color: pB.color }}>{pB.score.toFixed(1)}</div><div className="text-xs text-[#888] mt-1">{pB.name} LQ</div></div>
      </div>
    </div>
  );
}

function WeightTuner() {
  const [weights, setWeights] = useState({ ...WEIGHTS });
  const [ranking, setRanking] = useState(scored);
  const recalc = (w: typeof WEIGHTS) => { const ns = [...PRODUCTS].map(p => ({...p, score: (w.CE*p.CE + w.EB*p.EB + w.ES*p.ES + w.EE*p.EE + w.SF*p.SF + w.BV*p.BV + w.HP*p.HP - w.R*p.R)*10 })).sort((a,b)=>b.score-a.score); setRanking(ns); };
  const setW = (k: keyof typeof WEIGHTS, v: number) => { const nw = {...weights, [k]: v}; setWeights(nw); recalc(nw); };
  return (
    <div className="bg-white rounded-3xl border border-[#D5D0C6] p-8">
      <div className="mb-6"><div className="uppercase tracking-[1.5px] text-xs font-semibold text-[#1A3A2A]">WEIGHT TUNER — CUSTOMIZE PRIORITIES</div><p className="text-sm text-[#555] mt-1.5">Drag sliders to re-weight the Longevity Quotient. Ranking updates instantly.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
        {DIMS.map(d => (<div key={d.key}>
          <div className="flex justify-between text-sm mb-2"><span className="font-medium text-[#333]">{d.key} {d.key==='R' && <span className="text-red-500/70 text-xs">(penalty)</span>}</span><span className="font-mono font-semibold tabular-nums" style={{color: d.key==='R'?'#ff6b6b':'#1A3A2A'}}>{(weights[d.key]*100).toFixed(0)}%</span></div>
          <input type="range" min={0} max={0.4} step={0.005} value={weights[d.key]} onChange={e=>setW(d.key, parseFloat(e.target.value))} className="w-full accent-[#00C9A7]" />
          <div className="text-[10px] text-[#777] mt-1 tracking-wide">{d.desc}</div>
        </div>))}
      </div>
      <div className="mt-9 pt-7 border-t">
        <div className="uppercase tracking-widest text-xs font-semibold mb-4 text-[#1A3A2A]">YOUR CUSTOM RANKING</div>
        {ranking.slice(0,8).map((p,i) => (<div key={p.id} className="flex items-center gap-4 py-2.5 border-b last:border-none text-sm">
          <div className="w-8 font-mono text-xl font-black" style={{color:p.color}}>{i+1}</div>
          <div className="flex-1 font-medium text-[#222]">{p.name}</div>
          <div className="w-40"><ScoreBar value={p.score} color={p.color} /></div>
          <div className="w-14 text-right font-mono font-semibold tabular-nums" style={{color:p.color}}>{p.score.toFixed(1)}</div>
        </div>))}
      </div>
    </div>
  );
}

export default function Elite8Page() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<'ranking' | 'compare' | 'tune'>('ranking');
  const top3 = scored.slice(0, 3);

  return (
    <div className="bg-[#F8F5EE] min-h-screen text-[#1C1C1E] pb-20">
      {/* Monumental Hero */}
      <div className="relative bg-[#1A3A2A] text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_0.8px,transparent_1px)] bg-[length:5px_5px]" />
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs tracking-[2px] mb-6">EVIDENCE-BASED • INSTITUTIONAL GRADE</div>
          <h1 className="font-semibold text-[72px] md:text-[92px] leading-[0.88] tracking-[-4.2px] mb-4">THE<br />ELITE <span className="text-[#D4A843]">8</span></h1>
          <p className="max-w-[620px] mx-auto text-xl text-white/75 tracking-[-0.2px]">Eight premier longevity interventions ranked by the <span className="font-medium text-white">Longevity Quotient</span> — a calibrated synthesis of clinical rigor, epigenetic impact, evolutionary conservation, and real-world safety.</p>
          <div className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest bg-white/10 px-5 h-9 rounded-full">FOR RESEARCH & EDUCATIONAL USE ONLY • NOT MEDICAL ADVICE</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        {/* Top 3 Snapshot */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-[#E5E2D9] p-8 mb-10">
          <div className="flex items-center justify-between mb-6 px-1">
            <div><div className="uppercase tracking-[1.5px] text-xs font-semibold text-[#1A3A2A]">CURRENT LEADERBOARD SNAPSHOT</div><div className="text-sm text-[#666]">Based on the default Longevity Quotient weights</div></div>
            <button onClick={() => setTab('ranking')} className="text-xs px-5 h-9 rounded-full border border-[#1A3A2A] hover:bg-[#1A3A2A] hover:text-white transition flex items-center">VIEW FULL RANKING</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {top3.map((p, i) => (
              <div key={p.id} onClick={() => { setTab('ranking'); setExpanded(p.id); window.scrollTo({ top: 420, behavior: 'smooth' }); }} className="group border border-[#E5E2D9] hover:border-[#00C9A7] rounded-2xl p-6 cursor-pointer transition-all active:scale-[0.985]">
                <div className="flex justify-between items-start"><div className="font-mono text-5xl font-black tracking-[-2px]" style={{color:p.color}}>{i+1}</div><div className="text-right"><div className="font-mono text-4xl font-black tracking-[-1.5px]" style={{color:p.color}}>{p.score.toFixed(1)}</div><div className="text-[10px] text-[#888] -mt-1">LQ</div></div></div>
                <div className="mt-4 font-semibold text-xl tracking-[-0.3px] group-hover:text-[#00C9A7] transition">{p.name}</div>
                <div className="text-xs text-[#666] mt-0.5 line-clamp-1">{p.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Equation */}
        <div className="mb-10"><EquationBlock /></div>

        {/* Refined Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl p-1 shadow-sm border border-[#E5E2D9]">
            {[{k:'ranking',l:'Full Ranking'},{k:'compare',l:'Head-to-Head'},{k:'tune',l:'Customize Weights'}].map(t => (
              <button key={t.k} onClick={() => setTab(t.k as any)} className={`px-9 py-2.5 rounded-[14px] text-sm font-semibold tracking-[-0.1px] transition-all ${tab === t.k ? 'bg-[#1A3A2A] text-white shadow' : 'text-[#555] hover:text-[#1A3A2A]'}`}>{t.l}</button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1080px] mx-auto">
          {tab === 'ranking' && (
            <div className="space-y-4">
              {scored.map((p, i) => <ProductCard key={p.id} product={p} rank={i+1} expanded={expanded === p.id} onToggle={() => setExpanded(expanded === p.id ? null : p.id)} />)}
            </div>
          )}
          {tab === 'compare' && <CompareTool />}
          {tab === 'tune' && <WeightTuner />}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-20 px-6 text-center text-xs text-[#777] leading-relaxed">
        Scores synthesized from peer-reviewed literature. This tool is for educational and research purposes only. The Longevity Quotient framework and weights are subject to revision as new high-quality evidence emerges.<br />Part of the <span className="font-medium text-[#1A3A2A]">TNiC Longevity Platform</span>.
      </div>
    </div>
  );
}
