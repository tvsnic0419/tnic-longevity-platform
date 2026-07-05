'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

/* ── Geometry ──────────────────────────────────────────────────── */
const CX = 450;
const CY = 270;
const ORBIT_R = 175;
const toRad = (deg: number) => (deg * Math.PI) / 180;

type AccentKey = 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';

interface Node {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  r: number;
  accent: AccentKey;
  href: string;
  deg: number;
}

const NODES: Node[] = [
  { id: 'nmn',          label: 'NMN',          sub: 'NAD⁺ precursor',   deg: -60,  r: 26, accent: 'emerald', href: '/library/compounds/nmn'          },
  { id: 'sulforaphane', label: 'Sulforaphane',  sub: 'NRF2 activator',   deg: 0,    r: 23, accent: 'cyan',    href: '/library/compounds/sulforaphane'  },
  { id: 'quercetin',    label: 'Quercetin',     sub: 'Senolytic',         deg: 55,   r: 21, accent: 'rose',    href: '/library/compounds/quercetin'     },
  { id: 'berberine',    label: 'Berberine',     sub: 'AMPK activator',   deg: 110,  r: 21, accent: 'amber',   href: '/library/compounds/berberine'     },
  { id: 'glynac',       label: 'GlyNAC',        sub: 'Glutathione',       deg: 165,  r: 23, accent: 'violet',  href: '/library/compounds/glynac'        },
  { id: 'spermidine',   label: 'Spermidine',    sub: 'Autophagy flux',   deg: 215,  r: 21, accent: 'cyan',    href: '/library/compounds/spermidine'    },
  { id: 'coq10',        label: 'CoQ10',         sub: 'ETC Complex I–IV', deg: 265,  r: 23, accent: 'emerald', href: '/library/compounds/coq10'         },
  { id: 'resveratrol',  label: 'Resveratrol',   sub: 'SIRT1 activator',  deg: 305,  r: 21, accent: 'violet',  href: '/library/compounds/resveratrol'   },
].map((n) => ({
  ...n,
  x: CX + ORBIT_R * Math.cos(toRad(n.deg)),
  y: CY + ORBIT_R * Math.sin(toRad(n.deg)),
}));

/* Synergy arcs between satellite nodes (shared pathways) */
const SYNERGIES: [string, string][] = [
  ['nmn',          'resveratrol'],
  ['nmn',          'coq10'],
  ['sulforaphane', 'glynac'],
  ['quercetin',    'berberine'],
  ['spermidine',   'berberine'],
  ['coq10',        'spermidine'],
];

/* ── Color palette ─────────────────────────────────────────────── */
const COLORS: Record<AccentKey, { hex: string; glow: string; faint: string }> = {
  emerald: { hex: '#34d399', glow: 'rgba(52,211,153,0.5)',  faint: 'rgba(52,211,153,0.08)'  },
  cyan:    { hex: '#22d3ee', glow: 'rgba(34,211,238,0.5)',  faint: 'rgba(34,211,238,0.08)'  },
  violet:  { hex: '#a78bfa', glow: 'rgba(167,139,250,0.5)', faint: 'rgba(167,139,250,0.08)' },
  amber:   { hex: '#fbbf24', glow: 'rgba(251,191,36,0.5)',  faint: 'rgba(251,191,36,0.08)'  },
  rose:    { hex: '#fb7185', glow: 'rgba(251,113,133,0.5)', faint: 'rgba(251,113,133,0.08)' },
};

const LABEL_ACCENT: Record<AccentKey, string> = {
  emerald: 'text-accent-emerald',
  cyan:    'text-accent-cyan',
  violet:  'text-accent-violet',
  amber:   'text-accent-amber',
  rose:    'text-accent-rose',
};

/* Particle traveling along a line: animates cx/cy from node → center looping */
function TravelParticle({ node, delay }: { node: Node; delay: number }) {
  const c = COLORS[node.accent];
  return (
    <motion.circle
      r={2.5}
      fill={c.hex}
      style={{ filter: `drop-shadow(0 0 4px ${c.glow})` }}
      animate={{
        cx: [node.x, CX],
        cy: [node.y, CY],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.8,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'easeInOut',
      }}
    />
  );
}

export function SynergyConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 border-b border-border relative overflow-hidden bg-background"
      aria-label="Compound synergy network"
    >
      {/* Deep background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,_color-mix(in_srgb,_var(--accent-violet)_5%,_transparent),_transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-cyan/[0.04] blur-[120px]" />
      </div>

      <div className="relative container-page">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:w-80 xl:w-96 flex-shrink-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-accent-cyan/60" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-accent-cyan uppercase">Synergy Intelligence</span>
              <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-accent-cyan/60" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.05] mb-5">
              Eight compounds.
              <br />
              <span className="headline-gradient">One unified network.</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed text-sm mb-8">
              Every compound in the library is cross-mapped to pathways, hallmarks, and biomarker targets. Lines show confirmed mechanistic synergies — not marketing claims.
            </p>

            {/* Legend */}
            <div className="space-y-2 mb-8">
              {([
                ['Spoke lines', 'Compound → OS pathway integration'],
                ['Arc lines', 'Confirmed compound–compound synergy'],
                ['Pulse dots', 'Signal flow · evidence-grade weighted'],
              ] as const).map(([label, desc]) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet/70 mt-1.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-[11px] font-semibold text-foreground/80">{label}</span>
                    <span className="text-[11px] text-muted-foreground"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/library" className="focus-ring btn-gradient text-sm">
                Explore full library
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/stacks"
                className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-accent-violet hover:text-accent-violet/80 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Build your stack
              </Link>
            </div>
          </motion.div>

          {/* Right: SVG constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="flex-1 w-full"
          >
            <svg
              viewBox="0 0 900 540"
              className="w-full max-w-2xl mx-auto overflow-visible"
              aria-hidden="true"
            >
              <defs>
                {/* Glow filters per accent */}
                {(Object.entries(COLORS) as [AccentKey, typeof COLORS[AccentKey]][]).map(([key, c]) => (
                  <filter key={key} id={`glow-${key}`} x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="5" result="blur" in="SourceGraphic" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
                <filter id="glow-center" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="10" result="blur" in="SourceGraphic" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradient for center node */}
                <radialGradient id="center-grad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#34d399" />
                </radialGradient>
              </defs>

              {/* ── Synergy arcs between compound nodes ── */}
              {SYNERGIES.map(([aId, bId]) => {
                const a = NODES.find((n) => n.id === aId)!;
                const b = NODES.find((n) => n.id === bId)!;
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const curve = 40;
                const cpx = mx - (dy / len) * curve;
                const cpy = my + (dx / len) * curve;
                const isHov = hovered === aId || hovered === bId;
                return (
                  <motion.path
                    key={`${aId}-${bId}`}
                    d={`M ${a.x} ${a.y} Q ${cpx} ${cpy} ${b.x} ${b.y}`}
                    fill="none"
                    stroke="rgba(167,139,250,0.25)"
                    strokeWidth={isHov ? 2 : 1}
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: isHov ? 1 : 0.7 } : {}}
                    transition={{ duration: 1.2, delay: 0.9 + NODES.findIndex((n) => n.id === aId) * 0.05, ease: 'easeOut' }}
                    style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                  />
                );
              })}

              {/* ── Spoke lines: center → each node ── */}
              {NODES.map((node, i) => {
                const c = COLORS[node.accent];
                const isHov = hovered === node.id;
                return (
                  <g key={`spoke-${node.id}`}>
                    <motion.line
                      x1={CX} y1={CY}
                      x2={node.x} y2={node.y}
                      stroke={c.hex}
                      strokeWidth={isHov ? 2 : 1}
                      strokeOpacity={isHov ? 0.7 : 0.22}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
                      style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
                    />
                    {/* Traveling particle */}
                    {inView && (
                      <TravelParticle node={node} delay={0.8 + i * 0.35} />
                    )}
                  </g>
                );
              })}

              {/* ── Outer orbit ring ── */}
              <motion.circle
                cx={CX} cy={CY} r={ORBIT_R}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                strokeDasharray="2 8"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              />

              {/* ── Center node ── */}
              <g>
                {/* Pulse rings */}
                {[52, 42, 34].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx={CX} cy={CY} r={r}
                    fill="none"
                    stroke="url(#center-grad)"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? {
                      opacity: [0, 0.25, 0],
                      scale: [0.8, 1.4, 0.8],
                    } : {}}
                    transition={{
                      duration: 3,
                      delay: 0.5 + i * 0.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: `${CX}px ${CY}px` }}
                  />
                ))}
                {/* Core circle */}
                <motion.circle
                  cx={CX} cy={CY} r={30}
                  fill="url(#center-grad)"
                  filter="url(#glow-center)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                />
                <motion.text
                  x={CX} y={CY - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fontFamily="ui-monospace, monospace"
                  fill="#021a14"
                  letterSpacing="0.08em"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  LONGEVITY
                </motion.text>
                <motion.text
                  x={CX} y={CY + 8}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fontFamily="ui-monospace, monospace"
                  fill="#021a14"
                  letterSpacing="0.08em"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.55 }}
                >
                  OS
                </motion.text>
              </g>

              {/* ── Satellite compound nodes ── */}
              {NODES.map((node, i) => {
                const c = COLORS[node.accent];
                const isHov = hovered === node.id;
                // Label positioning — push labels outward from center
                const angle = toRad(node.deg);
                const labelDist = node.r + 18;
                const lx = node.x + labelDist * Math.cos(angle);
                const ly = node.y + labelDist * Math.sin(angle);
                const anchor = node.x > CX + 20 ? 'start' : node.x < CX - 20 ? 'end' : 'middle';
                const subLy = ly + 13;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => { window.location.href = node.href; }}
                    role="link"
                    aria-label={`${node.label} — ${node.sub}`}
                  >
                    {/* Hover glow halo */}
                    <motion.circle
                      cx={node.x} cy={node.y}
                      r={node.r + 10}
                      fill={c.faint}
                      animate={{ opacity: isHov ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Node circle */}
                    <motion.circle
                      cx={node.x} cy={node.y}
                      r={node.r}
                      fill={c.faint}
                      stroke={c.hex}
                      strokeWidth={isHov ? 2 : 1.5}
                      filter={`url(#glow-${node.accent})`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? {
                        scale: isHov ? 1.15 : 1,
                        opacity: 1,
                      } : {}}
                      transition={
                        inView && !isHov
                          ? { duration: 0.5, delay: 0.4 + i * 0.07, type: 'spring', stiffness: 200 }
                          : { duration: 0.15 }
                      }
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />

                    {/* Node icon text */}
                    <motion.text
                      x={node.x} y={node.y + 4}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="700"
                      fontFamily="ui-monospace, monospace"
                      fill={c.hex}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.07 }}
                    >
                      {node.id === 'sulforaphane' ? 'SFN' : node.label.slice(0, 4).toUpperCase()}
                    </motion.text>

                    {/* Labels */}
                    <motion.text
                      x={lx} y={ly}
                      textAnchor={anchor}
                      fontSize="11"
                      fontWeight="700"
                      fill={c.hex}
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: isHov ? 1 : 0.85 } : {}}
                      transition={{ delay: 0.65 + i * 0.07, duration: 0.2 }}
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.label}
                    </motion.text>
                    <motion.text
                      x={lx} y={subLy}
                      textAnchor={anchor}
                      fontSize="9"
                      fill="rgba(255,255,255,0.4)"
                      fontFamily="ui-monospace, monospace"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: isHov ? 0.9 : 0.5 } : {}}
                      transition={{ delay: 0.7 + i * 0.07, duration: 0.2 }}
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.sub}
                    </motion.text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>

        {/* Bottom stat row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-border/40"
        >
          {[
            { n: '8', label: 'Synergy pairs shown', color: 'text-accent-cyan' },
            { n: '50', label: 'Compounds in library', color: 'text-accent-emerald' },
            { n: '12', label: 'Hallmarks cross-mapped', color: 'text-accent-violet' },
            { n: '100%', label: 'PMID-cited evidence', color: 'text-accent-amber' },
          ].map(({ n, label, color }) => (
            <div key={n} className="text-center">
              <div className={`text-3xl font-black tracking-tight ${color}`}>{n}</div>
              <div className="text-[11px] font-mono text-muted-foreground/60 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
