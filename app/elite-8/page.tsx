'use client';

import React, { useState, useEffect } from 'react';

// ─── DESIGN TOKENS ─────────────────────────────────

const C = {
  cream: "#F8F5EE",
  forest: "#1A3A2A",
  teal: "#00C9A7",
  amber: "#D4A843",
  carbon: "#1C1C1E",
  mist: "#EAE7DE",
  fern: "#2E5D42",
} as const;

// ─── EQUATION CONSTANTS ───────────────────────────

const WEIGHTS = {
  CE: 0.22,
  EB: 0.18,
  ES: 0.16,
  EE: 0.14,
  SF: 0.12,
  BV: 0.10,
  HP: 0.05,
  R:  0.03,
} as const;

// ─── PRODUCT DATA ───────────────────────────

const PRODUCTS = [
  {
    id: "nmn",
    name: "NMN",
    full: "Nicotinamide Mononucleotide",
    category: "NAD+ Precursor",
    mechanism: "Replenishes NAD⁺ → activates sirtuins, PARP repair, mitochondrial biogenesis",
    CE: 7.2, EB: 8.1, ES: 7.8, EE: 9.2, SF: 8.5, BV: 6.8, HP: 6.5, R: 2.0,
    topStudy: "Igarashi et al. 2022 — oral NMN raised NAD⁺ 38%, improved muscle function in older adults",
    clock: "Horvath DNAmAge −2.1yr avg (pilot)",
    color: C.teal,
  },
  {
    id: "rapamycin",
    name: "Rapamycin",
    full: "Rapamycin (Sirolimus)",
    category: "mTOR Inhibitor",
    mechanism: "Inhibits mTORC1 → induces autophagy, reduces senescent cell burden, extends lifespan in 25+ model organisms",
    CE: 8.8, EB: 7.4, ES: 9.1, EE: 9.8, SF: 5.5, BV: 7.5, HP: 5.8, R: 5.5,
    topStudy: "Harrison et al. 2009 (ITP) — 14% lifespan extension in mice; multiple human trials ongoing",
    clock: "PhenoAge −3.4yr (Mannick 2022 cohort)",
    color: C.amber,
  },
  {
    id: "metformin",
    name: "Metformin",
    full: "Metformin HCl",
    category: "AMPK Activator",
    mechanism: "Activates AMPK, inhibits Complex I → mimics caloric restriction, reduces IGF-1 signaling",
    CE: 9.2, EB: 6.8, ES: 7.2, EE: 8.5, SF: 7.8, BV: 8.9, HP: 9.1, R: 2.8,
    topStudy: "TAME Trial (ongoing) — observational: diabetics on metformin outlive matched non-diabetic controls",
    clock: "GrimAge −1.8yr (epidemiological estimate)",
    color: C.fern,
  },
  {
    id: "spermidine",
    name: "Spermidine",
    full: "Spermidine",
    category: "Autophagy Inducer",
    mechanism: "Polyamine → induces autophagy via eIF5A hypusination; epigenetically modulates histones",
    CE: 7.0, EB: 7.9, ES: 7.3, EE: 8.7, SF: 9.0, BV: 7.2, HP: 7.4, R: 1.5,
    topStudy: "Madeo et al. 2021 (Cell) — wheat germ extract RCT: improved memory in older adults",
    clock: "DunedinPACE −0.12 units (Schroeder 2021)",
    color: "#7B68EE",
  },
  {
    id: "senolytics",
    name: "D+Q",
    full: "Dasatinib + Quercetin",
    category: "Senolytic Combo",
    mechanism: "Clears senescent cells via pro-apoptotic pathway restoration → reduces SASP, tissue rejuvenation",
    CE: 7.8, EB: 8.6, ES: 8.4, EE: 8.1, SF: 6.2, BV: 6.5, HP: 5.5, R: 4.2,
    topStudy: "Kirkland 2023 — intermittent D+Q improved frailty index in IPF patients; multiple phase 2 trials",
    clock: "Horvath −3.2yr (Mayo Clinic pilot, n=9)",
    color: "#E85D75",
  },
  {
    id: "glycine_nac",
    name: "GlyNAC",
    full: "Glycine + N-Acetylcysteine",
    category: "Glutathione Precursor",
    mechanism: "Restores glutathione → combats oxidative stress, mitochondrial dysfunction, hallmarks of aging",
    CE: 7.5, EB: 8.2, ES: 8.0, EE: 7.6, SF: 9.3, BV: 8.4, HP: 6.8, R: 1.2,
    topStudy: "Kumar et al. 2023 (JNutr) — GlyNAC in older adults: GSH +139%, mitochondrial function +71%",
    clock: "Biological age markers −3.0yr equiv (functional)",
    color: "#FF7F50",
  },
  {
    id: "taurine",
    name: "Taurine",
    full: "Taurine",
    category: "Sulfonic Amino Acid",
    mechanism: "Declines ~80% with age; supplementation activates longevity pathways, reduces DNA damage, extends C. elegans/mouse lifespan",
    CE: 7.6, EB: 7.1, ES: 7.5, EE: 8.4, SF: 9.5, BV: 9.0, HP: 7.2, R: 1.0,
    topStudy: "Singh et al. 2023 (Science) — taurine deficiency drives aging; supplementation +10% lifespan in mice",
    clock: "GlycoAge −2.4yr (glycan estimate)",
    color: "#00BFFF",
  },
  {
    id: "resveratrol_pterostilbene",
    name: "Pterostilbene",
    full: "Pterostilbene (Resveratrol analog)",
    category: "SIRT1 Activator",
    mechanism: "Methylated resveratrol → 4× bioavailability; activates SIRT1, induces autophagy, anti-inflammatory",
    CE: 6.8, EB: 7.3, ES: 7.0, EE: 8.0, SF: 8.8, BV: 9.2, HP: 6.2, R: 1.8,
    topStudy: "Kapetanovic et al. 2011 — superior bioavailability vs resveratrol; human safety confirmed 350mg/day",
    clock: "Horvath est. −1.5yr (extrapolated from animal models)",
    color: "#9B59B6",
  },
] as const;

// ─── SCORE CALCULATION ───────────────────────────

function calcScore(p: typeof PRODUCTS[number]) {
  return (
    WEIGHTS.CE * p.CE +
    WEIGHTS.EB * p.EB +
    WEIGHTS.ES * p.ES +
    WEIGHTS.EE * p.EE +
    WEIGHTS.SF * p.SF +
    WEIGHTS.BV * p.BV +
    WEIGHTS.HP * p.HP -
    WEIGHTS.R  * p.R
  ) * 10;
}

const scored = [...PRODUCTS]
  .map(p => ({ ...p, score: calcScore(p) }))
  .sort((a, b) => b.score - a.score);

// ─── DIMENSION META ───────────────────────────
const DIMS = [
  { key: "CE" as const, label: "Clinical Evidence", w: WEIGHTS.CE, desc: "RCT quality, meta-analyses, N-size" },
  { key: "EB" as const, label: "Epigenetic Biomarkers", w: WEIGHTS.EB, desc: "Methylation clock improvements" },
  { key: "ES" as const, label: "Effect Size", w: WEIGHTS.ES, desc: "Magnitude of benefit (Cohen's d equiv)" },
  { key: "EE" as const, label: "Evolutionary Evidence", w: WEIGHTS.EE, desc: "Conserved pathway target across species" },
  { key: "SF" as const, label: "Safety Profile", w: WEIGHTS.SF, desc: "Tolerability, adverse event rate" },
  { key: "BV" as const, label: "Bioavailability", w: WEIGHTS.BV, desc: "Absorption, delivery, formulation quality" },
  { key: "HP" as const, label: "Human Population Data", w: WEIGHTS.HP, desc: "Observational cohort / epidemiological signal" },
  { key: "R" as const,  label: "Risk Penalty", w: WEIGHTS.R,  desc: "Adverse events, drug interactions (subtracted)" },
];

// ─── ANIMATED COUNTER ───────────────────────────
function AnimCounter({ target, duration = 1200, decimals = 1 }: { target: number; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      setVal(+(target * pct).toFixed(decimals));
      if (pct < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals]);
  
  return <span>{val.toFixed(decimals)}</span>;
}

// ─── SCORE BAR ───────────────────────────
function ScoreBar({ value, max = 100, color, animate = true }: { value: number; max?: number; color: string; animate?: boolean }) {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 80);
    return () => clearTimeout(t);
  }, [value, max]);
  
  return (
    <div style={{ background: "#E0DDD5", borderRadius: 2, height: 6, flex: 1, overflow: 'hidden' }}>
      <div 
        style={{
          width: `${width}%`, 
          height: "100%", 
          background: color,
          borderRadius: 2, 
          transition: animate ? "width 1s cubic-bezier(0.16,1,0.3,1)" : 'none'
        }} 
      />
    </div>
  );
}

// ─── RADAR MINI ───────────────────────────
function RadarMini({ product, size = 120 }: { product: typeof scored[0]; size?: number }) {
  const dims = ["CE", "EB", "ES", "EE", "SF", "BV"] as const;
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  
  const pts = dims.map((k, i) => {
    const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2;
    const val = product[k] / 10;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
  });
  
  const gridPts = dims.map((_, i) => {
    const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  
  const polyPath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";
  const gridPath = gridPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <polygon 
        points={gridPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
        fill="none" stroke={C.mist} strokeWidth={1} 
      />
      {[0.33, 0.66].map((f, idx) => (
        <polygon 
          key={idx}
          points={dims.map((_, i) => {
            const angle = (i / dims.length) * 2 * Math.PI - Math.PI / 2;
            return `${(cx + r * f * Math.cos(angle)).toFixed(1)},${(cy + r * f * Math.sin(angle)).toFixed(1)}`;
          }).join(" ")} 
          fill="none" stroke={C.mist} strokeWidth={0.5} 
        />
      ))}
      {gridPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.mist} strokeWidth={0.5} />
      ))}
      <path 
        d={polyPath} 
        fill={product.color + "33"} 
        stroke={product.color} 
        strokeWidth={1.5} 
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={product.color} />
      ))}
    </svg>
  );
}

// ─── PRODUCT CARD ───────────────────────────
function ProductCard({ 
  product, 
  rank, 
  expanded, 
  onToggle 
}: { 
  product: typeof scored[0]; 
  rank: number; 
  expanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <div 
      onClick={onToggle} 
      className="product-card"
      style={{
        background: expanded ? C.forest : C.cream,
        border: `1.5px solid ${expanded ? product.color : "#D5D0C6"}`,
        borderRadius: 12,
        padding: "20px 24px",
        cursor: "pointer",
        fontFamily: 'var(--font-inter)',
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: expanded ? 20 : 0 }}>
        <div style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 42, 
          fontWeight: 900, 
          lineHeight: 1,
          color: product.color, 
          minWidth: 52,
        }}>
          {String(rank).padStart(2, "0")}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 22, 
              fontWeight: 800,
              color: expanded ? "#fff" : C.carbon,
            }}>
              {product.name}
            </span>
            <span style={{
              fontSize: 11, 
              fontWeight: 600, 
              letterSpacing: "0.08em",
              color: product.color, 
              textTransform: "uppercase",
              background: product.color + "22", 
              padding: "2px 8px", 
              borderRadius: 4,
            }}>
              {product.category}
            </span>
          </div>
          <div style={{ fontSize: 12, color: expanded ? "#aaa" : "#888", marginTop: 2 }}>
            {product.full}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 32, 
            fontWeight: 900, 
            color: product.color, 
            lineHeight: 1,
          }}>
            <AnimCounter target={product.score} decimals={1} />
          </div>
          <div style={{ fontSize: 10, color: expanded ? "#aaa" : "#999", letterSpacing: "0.1em" }}>
            /100 LQ SCORE
          </div>
        </div>
      </div>

      {/* Score bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ScoreBar value={product.score} color={product.color} />
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ marginTop: 24, color: "#ddd" }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {/* Radar */}
            <div style={{ flexShrink: 0 }}>
              <RadarMini product={product} size={130} />
              <div style={{ fontSize: 10, color: "#888", textAlign: "center", marginTop: 4 }}>
                CE · EB · ES · EE · SF · BV
              </div>
            </div>
            
            {/* Dimension breakdown */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ 
                fontSize: 11, 
                letterSpacing: "0.1em", 
                color: product.color, 
                marginBottom: 10, 
                fontWeight: 700 
              }}>
                DIMENSION SCORES
              </div>
              {DIMS.map(d => (
                <div key={d.key} style={{ marginBottom: 8 }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    fontSize: 11, 
                    marginBottom: 3 
                  }}>
                    <span style={{ color: "#ccc" }}>
                      {d.label}
                      <span style={{ color: "#666", marginLeft: 4 }}>×{d.w.toFixed(2)}</span>
                      {d.key === "R" && <span style={{ color: "#ff6b6b" }}> (−)</span>}
                    </span>
                    <span style={{ 
                      color: d.key === "R" ? "#ff6b6b" : product.color, 
                      fontWeight: 700 
                    }}>
                      {product[d.key].toFixed(1)}
                    </span>
                  </div>
                  <ScoreBar 
                    value={product[d.key]} 
                    max={10} 
                    color={d.key === "R" ? "#ff6b6b" : product.color} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mechanism + Study */}
          <div style={{ 
            marginTop: 20, 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 16 
          }}>
            <div style={{ 
              background: "#ffffff0d", 
              borderRadius: 8, 
              padding: 14 
            }}>
              <div style={{ 
                fontSize: 10, 
                color: product.color, 
                fontWeight: 700, 
                letterSpacing: "0.1em", 
                marginBottom: 6 
              }}>
                MECHANISM
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: "#ccc" }}>
                {product.mechanism}
              </div>
            </div>
            <div style={{ 
              background: "#ffffff0d", 
              borderRadius: 8, 
              padding: 14 
            }}>
              <div style={{ 
                fontSize: 10, 
                color: product.color, 
                fontWeight: 700, 
                letterSpacing: "0.1em", 
                marginBottom: 6 
              }}>
                KEY STUDY
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: "#ccc" }}>
                {product.topStudy}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: C.teal }}>
                ⏱ Clock: {product.clock}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── EQUATION DISPLAY ───────────────────────────
function EquationBlock() {
  return (
    <div style={{
      background: C.forest, 
      borderRadius: 16, 
      padding: "32px 36px",
      fontFamily: 'var(--font-space-grotesk)',
      border: `1px solid ${C.teal}33`,
    }}>
      <div style={{ 
        fontSize: 11, 
        color: C.teal, 
        letterSpacing: "0.15em", 
        fontWeight: 700, 
        marginBottom: 20 
      }}>
        THE LONGEVITY QUOTIENT EQUATION
      </div>
      
      <div style={{
        fontSize: "clamp(13px, 2vw, 17px)", 
        color: "#fff", 
        lineHeight: 2.2,
        fontFamily: "'Courier New', monospace", 
        overflowX: "auto",
      }}>
        <span style={{ color: C.amber, fontWeight: 700 }}>LQ(p)</span>
        <span style={{ color: "#888" }}> = </span>
        <span style={{ color: C.teal }}>0.22·CE</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={{ color: "#7B68EE" }}>0.18·EB</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={{ color: "#FF7F50" }}>0.16·ES</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={{ color: "#00BFFF" }}>0.14·EE</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={{ color: "#9B59B6" }}>0.12·SF</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={{ color: "#E85D75" }}>0.10·BV</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={{ color: "#aaa" }}>0.05·HP</span>
        <span style={{ color: "#888" }}> − </span>
        <span style={{ color: "#ff6b6b" }}>0.03·R</span>
      </div>

      <div style={{ 
        marginTop: 24, 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
        gap: 10 
      }}>
        {DIMS.map(d => (
          <div key={d.key} style={{ fontSize: 11, color: "#aaa", lineHeight: 1.5 }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>{d.key}</span>
            {" "}<span style={{ color: "#555" }}>({(d.w * 100).toFixed(0)}%)</span>
            {" — "}{d.desc}
            {d.key === "R" && <span style={{ color: "#ff6b6b" }}> [subtracted]</span>}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: 20, 
        fontSize: 11, 
        color: "#555", 
        borderTop: "1px solid #ffffff11", 
        paddingTop: 14 
      }}>
        All dimensions scored 0–10 by expert review of peer-reviewed literature. Weights reflect evidence hierarchy per longevity science consensus (Hallmarks of Aging framework + epigenetic clock literature). Output multiplied ×10 → LQ on 0–100 scale.
      </div>
    </div>
  );
}

// ─── COMPARE TOOL ───────────────────────────
function CompareTool() {
  const [a, setA] = useState(scored[0].id);
  const [b, setB] = useState(scored[1].id);
  
  const pA = scored.find(p => p.id === a)!;
  const pB = scored.find(p => p.id === b)!;

  return (
    <div style={{
      background: C.cream, 
      borderRadius: 16, 
      padding: 24,
      border: "1.5px solid #D5D0C6",
    }}>
      <div style={{ 
        fontSize: 11, 
        color: C.forest, 
        letterSpacing: "0.12em", 
        fontWeight: 700, 
        marginBottom: 20 
      }}>
        HEAD-TO-HEAD COMPARISON
      </div>
      
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <select 
          value={a} 
          onChange={e => setA(e.target.value)} 
          style={{
            background: C.forest, 
            color: "#fff", 
            border: "none",
            borderRadius: 8, 
            padding: "10px 16px", 
            fontSize: 14,
            fontFamily: 'var(--font-space-grotesk)',
            cursor: "pointer",
            minWidth: 140,
          }}
        >
          {scored.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        
        <div style={{ display: "flex", alignItems: "center", color: "#999", fontSize: 15, fontWeight: 600 }}>vs</div>
        
        <select 
          value={b} 
          onChange={e => setB(e.target.value)} 
          style={{
            background: C.forest, 
            color: "#fff", 
            border: "none",
            borderRadius: 8, 
            padding: "10px 16px", 
            fontSize: 14,
            fontFamily: 'var(--font-space-grotesk)',
            cursor: "pointer",
            minWidth: 140,
          }}
        >
          {scored.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {DIMS.map(d => {
        const va = pA[d.key], vb = pB[d.key];
        const winner = d.key === "R" ? (va < vb ? "A" : "B") : (va > vb ? "A" : "B");
        
        return (
          <div key={d.key} style={{ marginBottom: 16 }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              fontSize: 12, 
              marginBottom: 6, 
              color: "#666" 
            }}>
              <span style={{ 
                color: winner === "A" ? pA.color : "#888", 
                fontWeight: winner === "A" ? 700 : 500 
              }}>
                {va.toFixed(1)}
              </span>
              <span style={{ letterSpacing: "0.05em", fontWeight: 500 }}>{d.label}</span>
              <span style={{ 
                color: winner === "B" ? pB.color : "#888", 
                fontWeight: winner === "B" ? 700 : 500 
              }}>
                {vb.toFixed(1)}
              </span>
            </div>
            <div style={{ display: "flex", height: 7, gap: 3 }}>
              <div style={{
                flex: va, 
                background: pA.color, 
                borderRadius: "3px 0 0 3px",
                opacity: winner === "A" ? 1 : 0.35,
                transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              }} />
              <div style={{
                flex: vb, 
                background: pB.color, 
                borderRadius: "0 3px 3px 0",
                opacity: winner === "B" ? 1 : 0.35,
                transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              }} />
            </div>
          </div>
        );
      })}

      <div style={{ 
        marginTop: 28, 
        display: "flex", 
        justifyContent: "space-between", 
        padding: "20px 0", 
        borderTop: "1px solid #D5D0C6",
        alignItems: "center"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: 30, 
            fontWeight: 900, 
            color: pA.color, 
            fontFamily: 'var(--font-space-grotesk)',
            lineHeight: 1
          }}>
            {pA.score.toFixed(1)}
          </div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{pA.name} LQ</div>
        </div>
        
        <div style={{ 
          textAlign: "center", 
          fontSize: 13, 
          color: "#777", 
          maxWidth: 180,
          lineHeight: 1.4
        }}>
          {pA.score > pB.score ? (
            <><span style={{ color: pA.color, fontWeight: 700 }}>{pA.name}</span> leads by <strong>{(pA.score - pB.score).toFixed(1)}</strong> pts</>
          ) : (
            <><span style={{ color: pB.color, fontWeight: 700 }}>{pB.name}</span> leads by <strong>{(pB.score - pA.score).toFixed(1)}</strong> pts</>
          )}
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: 30, 
            fontWeight: 900, 
            color: pB.color, 
            fontFamily: 'var(--font-space-grotesk)',
            lineHeight: 1
          }}>
            {pB.score.toFixed(1)}
          </div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{pB.name} LQ</div>
        </div>
      </div>
    </div>
  );
}

// ─── WEIGHT TUNER ───────────────────────────
function WeightTuner() {
  const [weights, setWeights] = useState({ ...WEIGHTS });
  const [ranking, setRanking] = useState(scored);

  const recalc = (w: typeof WEIGHTS) => {
    const newScored = [...PRODUCTS]
      .map(p => ({
        ...p,
        score: (
          w.CE * p.CE + w.EB * p.EB + w.ES * p.ES + w.EE * p.EE +
          w.SF * p.SF + w.BV * p.BV + w.HP * p.HP - w.R * p.R
        ) * 10
      }))
      .sort((a, b) => b.score - a.score);
    setRanking(newScored);
  };

  const setW = (key: keyof typeof WEIGHTS, val: number) => {
    const nw = { ...weights, [key]: val };
    setWeights(nw);
    recalc(nw);
  };

  return (
    <div style={{ 
      background: C.cream, 
      borderRadius: 16, 
      padding: 24, 
      border: "1.5px solid #D5D0C6" 
    }}>
      <div style={{ 
        fontSize: 11, 
        color: C.forest, 
        letterSpacing: "0.12em", 
        fontWeight: 700, 
        marginBottom: 6 
      }}>
        WEIGHT TUNER — ADJUST THE EQUATION
      </div>
      <div style={{ fontSize: 13, color: "#666", marginBottom: 24, lineHeight: 1.5 }}>
        Move the sliders to reprioritize what matters most to you. The ranking updates live.
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
        gap: 20 
      }}>
        {DIMS.map(d => (
          <div key={d.key}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              fontSize: 12, 
              marginBottom: 6,
              alignItems: "center"
            }}>
              <span style={{ color: "#444", fontWeight: 600 }}>
                {d.key} {d.key === "R" && <span style={{ color: "#ff6b6b", fontSize: 11 }}>(penalty)</span>}
              </span>
              <span style={{ 
                fontWeight: 800, 
                color: d.key === "R" ? "#ff6b6b" : C.forest,
                fontSize: 13,
                minWidth: 42,
                textAlign: 'right'
              }}>
                {(weights[d.key] * 100).toFixed(0)}%
              </span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={0.4} 
              step={0.01}
              value={weights[d.key]}
              onChange={e => setW(d.key, parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: C.teal }}
            />
            <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>{d.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{ 
          fontSize: 11, 
          color: "#666", 
          marginBottom: 14,
          letterSpacing: "0.5px",
          fontWeight: 600
        }}>
          YOUR CUSTOM RANKING (LIVE)
        </div>
        
        {ranking.map((p, i) => (
          <div key={p.id} style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 14, 
            marginBottom: 10,
            background: i < 3 ? 'rgba(0, 201, 167, 0.06)' : 'transparent',
            padding: i < 3 ? '6px 10px' : '4px 10px',
            borderRadius: 8
          }}>
            <span style={{ 
              fontFamily: 'var(--font-space-grotesk)', 
              fontWeight: 900, 
              fontSize: 20, 
              color: p.color, 
              minWidth: 32,
              textAlign: 'center'
            }}>
              {i + 1}
            </span>
            <span style={{ 
              fontSize: 15, 
              color: C.carbon, 
              flex: 1,
              fontWeight: 600
            }}>
              {p.name}
            </span>
            <div style={{ flex: 1, maxWidth: 180 }}>
              <ScoreBar value={p.score} color={p.color} animate={false} />
            </div>
            <span style={{ 
              fontSize: 14, 
              color: p.color, 
              fontWeight: 800, 
              minWidth: 46,
              textAlign: 'right'
            }}>
              {p.score.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────
export default function Elite8Page() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState<"ranking" | "compare" | "tune">("ranking");

  return (
    <div style={{
      background: C.cream, 
      minHeight: "100vh",
      color: C.carbon,
    }}>
      {/* Hero */}
      <div style={{
        background: C.forest,
        padding: "72px 24px 56px",
        textAlign: "center",
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(0,201,167,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          fontSize: 11, 
          letterSpacing: "0.25em", 
          color: C.teal, 
          fontWeight: 700, 
          marginBottom: 18,
          position: 'relative'
        }}>
          LONGEVITY SCIENCE · EVIDENCE-BASED RANKING
        </div>
        
        <div style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: "clamp(52px, 9vw, 104px)",
          fontWeight: 900, 
          lineHeight: 0.88,
          color: "#fff", 
          marginBottom: 12,
          letterSpacing: "-0.025em",
          position: 'relative'
        }}>
          THE<br /><span style={{ color: C.amber }}>ELITE 8</span>
        </div>
        
        <div style={{ 
          fontSize: 15, 
          color: "#8BA99A", 
          marginTop: 24, 
          maxWidth: 620, 
          margin: "24px auto 0",
          lineHeight: 1.6,
          position: 'relative'
        }}>
          Eight longevity interventions ranked by the <strong style={{ color: "#fff" }}>Longevity Quotient</strong> equation —<br />
          a weighted, evidence-calibrated score across clinical rigor, epigenetic impact, safety, and evolutionary depth.
        </div>
        
        <div style={{
          marginTop: 36, 
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: C.teal + "1A", 
          border: `1px solid ${C.teal}44`,
          borderRadius: 999,
          padding: "10px 24px",
          fontSize: 12, 
          color: C.teal, 
          letterSpacing: "0.06em",
          fontWeight: 600,
          position: 'relative'
        }}>
          FOR RESEARCH &amp; EDUCATIONAL PURPOSES ONLY · NOT MEDICAL ADVICE
        </div>
      </div>

      {/* Equation */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "56px 24px 0" }}>
        <EquationBlock />
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 980, margin: "40px auto 0", padding: "0 24px" }}>
        <div style={{ 
          display: "inline-flex", 
          gap: 4, 
          background: C.mist, 
          borderRadius: 12, 
          padding: 5,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
        }}>
          {[
            { key: "ranking" as const, label: "Elite 8 Ranking" },
            { key: "compare" as const, label: "Head-to-Head" },
            { key: "tune" as const, label: "Tune Weights" },
          ].map(t => (
            <button 
              key={t.key} 
              onClick={() => setTab(t.key)} 
              style={{
                padding: "10px 26px", 
                borderRadius: 9, 
                border: "none",
                background: tab === t.key ? C.forest : "transparent",
                color: tab === t.key ? "#fff" : "#666",
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 14, 
                fontWeight: 700, 
                cursor: "pointer",
                letterSpacing: '-0.2px'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 980, margin: "28px auto 100px", padding: "0 24px" }}>
        {tab === "ranking" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {scored.map((p, i) => (
              <ProductCard
                key={p.id} 
                product={p} 
                rank={i + 1}
                expanded={expanded === p.id}
                onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
              />
            ))}
          </div>
        )}
        
        {tab === "compare" && <CompareTool />}
        
        {tab === "tune" && <WeightTuner />}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", 
        padding: "32px 24px 48px",
        fontSize: 12, 
        color: "#888", 
        borderTop: "1px solid #E0DDD5",
        lineHeight: 1.75,
        maxWidth: 720,
        margin: "0 auto"
      }}>
        Scores derived from peer-reviewed literature synthesis. All dimension scores assigned by expert review; not algorithmic ground truth.<br />
        This interactive tool is for educational and research purposes only. Consult a qualified physician before using any supplement or pharmaceutical.<br />
        LQ equation and weights may be revised as new evidence emerges. Built for <span style={{ color: C.forest, fontWeight: 600 }}>tnic.help</span>.
      </div>
    </div>
  );
}
