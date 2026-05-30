'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Full structured data from your Anti-Aging Stack XML
const compounds = [
  {
    id: 'nmn',
    name: 'NMN (Nicotinamide Mononucleotide)',
    tier: 'Tier 1 — Foundational',
    evidence: 'Human RCTs + Strong Mechanistic',
    dose: '500–1000 mg/day, morning with food',
    mechanisms: 'NAD+ precursor, sirtuin activation, mitochondrial biogenesis, DNA repair support',
    synergies: 'Pairs powerfully with TMG (methyl donor) and R-ALA. Enhances spermidine and fisetin effects on autophagy.',
    clinical: 'Improved insulin sensitivity, reduced fatigue, better vascular function in human trials.',
    why: 'Core NAD+ restoration compound. Addresses multiple hallmarks: genomic instability, mitochondrial dysfunction, and cellular senescence indirectly.'
  },
  {
    id: 'urolithin-a',
    name: 'Urolithin A',
    tier: 'Tier 1 — Foundational',
    evidence: 'Human RCTs (mitophagy)',
    dose: '500–1000 mg/day, with or without food',
    mechanisms: 'Mitophagy inducer, mitochondrial quality control, reduces dysfunctional mitochondria',
    synergies: 'Excellent with NMN and spermidine. Enhances overall mitochondrial turnover when stacked with Ca-AKG.',
    clinical: 'Improved muscle endurance and mitochondrial health biomarkers in older adults.',
    why: 'Directly targets mitochondrial dysfunction hallmark. One of the few compounds with clear human mitophagy data.'
  },
  {
    id: 'fisetin',
    name: 'Fisetin',
    tier: 'Tier 2 — Senolytic',
    evidence: 'Strong preclinical + emerging human',
    dose: '20 mg/kg/day for 3 consecutive days per month (senolytic pulse)',
    mechanisms: 'Senolytic, PI3K/Akt inhibition, antioxidant, anti-inflammatory',
    synergies: 'Works synergistically with quercetin in senolytic protocols. Enhanced by spermidine and NMN.',
    clinical: 'Reduced senescence markers in human studies when used in pulse protocols.',
    why: 'Key senolytic for clearing senescent cells — one of the strongest natural compounds for this purpose.'
  },
  {
    id: 'quercetin',
    name: 'Quercetin',
    tier: 'Tier 2 — Senolytic + Antioxidant',
    evidence: 'Human data + strong mechanistic',
    dose: '500–1000 mg/day during senolytic pulse (3 days/month) or daily low dose',
    mechanisms: 'Senolytic, zinc ionophore, antioxidant, anti-inflammatory, mast cell stabilizer',
    synergies: 'Classic pairing with fisetin for senolytic effect. Works well with vitamin C and zinc.',
    clinical: 'Used in many longevity protocols; supports immune modulation and reduces oxidative stress.',
    why: 'Broad-spectrum support with proven senolytic activity when pulsed at higher doses.'
  },
  {
    id: 'pterostilbene',
    name: 'Pterostilbene',
    tier: 'Tier 2 — Sirtuin + Antioxidant',
    evidence: 'Strong mechanistic + some human',
    dose: '100–250 mg/day',
    mechanisms: 'Sirtuin activator (stronger than resveratrol), antioxidant, anti-inflammatory, PPAR-alpha agonist',
    synergies: 'Complements NMN and fisetin. Good alternative or addition to resveratrol in stacks.',
    clinical: 'Improved cognitive function and reduced oxidative stress markers in studies.',
    why: 'More bioavailable sirtuin activator than resveratrol with better tissue penetration.'
  },
  {
    id: 'egcg',
    name: 'EGCG (Epigallocatechin Gallate)',
    tier: 'Tier 2 — NRF2 + Antioxidant',
    evidence: 'Extensive human data',
    dose: '200–400 mg/day (standardized green tea extract)',
    mechanisms: 'NRF2 activator, potent antioxidant, anti-inflammatory, supports glutathione, anti-angiogenic',
    synergies: 'Excellent with sulforaphane or other NRF2 activators. Supports overall antioxidant defense.',
    clinical: 'Well-studied for metabolic health, inflammation reduction, and longevity pathways.',
    why: 'Reliable NRF2 pathway support with decades of safety data.'
  },
  {
    id: 'spermidine',
    name: 'Spermidine',
    tier: 'Tier 1 — Autophagy',
    evidence: 'Human observational + strong mechanistic',
    dose: '10–20 mg/day (or wheat germ extract equivalent)',
    mechanisms: 'Autophagy inducer, mitophagy support, histone deacetylase inhibition, longevity gene expression',
    synergies: 'Works beautifully with NMN, urolithin A, and fisetin. Core of many advanced longevity stacks.',
    clinical: 'Associated with lower mortality and improved cardiovascular health in population studies.',
    why: 'One of the most important autophagy inducers with human longevity correlation data.'
  },
  {
    id: 'ca-akg',
    name: 'Ca-AKG (Calcium Alpha-Ketoglutarate)',
    tier: 'Tier 2 — Mitochondrial + Epigenetic',
    evidence: 'Strong animal + emerging human',
    dose: '1000–2000 mg/day',
    mechanisms: 'Alpha-ketoglutarate replenishment, epigenetic modulation, mitochondrial support, anti-inflammatory',
    synergies: 'Pairs well with NMN and urolithin A for mitochondrial health. Supports spermidine effects.',
    clinical: 'Improved healthspan markers in animal models; human trials ongoing for frailty and inflammation.',
    why: 'Addresses mitochondrial dysfunction and epigenetic alterations hallmarks directly.'
  },
  {
    id: 'apigenin',
    name: 'Apigenin',
    tier: 'Tier 3 — Supportive',
    evidence: 'Mechanistic + some human',
    dose: '50–100 mg/day (often from chamomile extract)',
    mechanisms: 'CD38 inhibitor (supports NAD+), antioxidant, anti-inflammatory, GABA receptor modulator',
    synergies: 'Helpful addition for NAD+ preservation and sleep quality support.',
    clinical: 'Used for anxiety/sleep; emerging longevity interest for CD38 inhibition.',
    why: 'Supportive compound that helps preserve NAD+ and adds calming effects.'
  },
  {
    id: 'tmg',
    name: 'TMG (Trimethylglycine / Betaine)',
    tier: 'Tier 1 — Foundational Support',
    evidence: 'Strong human data (methylation)',
    dose: '1000–2000 mg/day, split or with NMN',
    mechanisms: 'Methyl donor, homocysteine reduction, supports NMN metabolism, osmotic protection',
    synergies: 'Essential pairing with NMN to prevent methyl depletion. Also supports liver and cardiovascular health.',
    clinical: 'Well-established for methylation support and cardiovascular risk reduction.',
    why: 'Critical cofactor for NMN users. Prevents potential side effects from NAD+ precursor supplementation.'
  }
];

const dailySchedule = [
  { time: 'Morning (with breakfast)', items: 'NMN 500-1000mg + TMG 1000mg + EGCG 200-400mg' },
  { time: 'Midday / With lunch', items: 'Ca-AKG 1000mg + Pterostilbene 100-250mg + Apigenin 50mg (optional)' },
  { time: 'Evening (away from food if possible)', items: 'Spermidine 10-20mg + Urolithin A 500-1000mg' },
  { time: 'Senolytic Pulse (3 consecutive days/month)', items: 'Fisetin 20mg/kg + Quercetin 500-1000mg (higher dose pulse)' }
];

const biomarkerFramework = [
  'Oxidative stress markers (8-OHdG, MDA)',
  'Mitochondrial function (lactate, CK, CoQ10 levels)',
  'Inflammation (hs-CRP, IL-6, TNF-α)',
  'NAD+ related (if available) or indirect via energy/fatigue scores',
  'Metabolic health (HbA1c, fasting insulin, lipids)',
  'Kidney & liver function (for safety monitoring)'
];

export default function LongevityStackPage() {
  const [selectedCompound, setSelectedCompound] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'pulse' | 'biomarkers'>('overview');

  return (
    <div className="bg-[#0A1628] text-white">
      {/* Hero for the Stack */}
      <div className="border-b border-white/10 bg-[#0A1628]">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="text-emerald-400 text-xs tracking-[4px] font-medium mb-3">FLAGSHIP PROTOCOL</div>
          <h1 className="text-7xl md:text-8xl font-semibold tracking-[-4px] leading-none mb-6">High-Powered<br />Anti-Aging Stack</h1>
          <p className="max-w-2xl text-xl text-white/75">A coherent, evidence-mapped system targeting all 12 Hallmarks of Aging with precision compounds, optimal dosing, and synergistic timing.</p>
          <div className="mt-8 flex gap-3">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === 'overview' ? 'bg-white text-[#0A1628]' : 'border border-white/30 hover:bg-white/5'}`}>Compounds</button>
            <button onClick={() => setActiveTab('schedule')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === 'schedule' ? 'bg-white text-[#0A1628]' : 'border border-white/30 hover:bg-white/5'}`}>Daily Schedule</button>
            <button onClick={() => setActiveTab('pulse')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === 'pulse' ? 'bg-white text-[#0A1628]' : 'border border-white/30 hover:bg-white/5'}`}>Senolytic Pulse</button>
            <button onClick={() => setActiveTab('biomarkers')} className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === 'biomarkers' ? 'bg-white text-[#0A1628]' : 'border border-white/30 hover:bg-white/5'}`}>Biomarkers</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Overview Tab - Compound Cards with Depth */}
        {activeTab === 'overview' && (
          <>
            <div className="mb-8 text-white/70 text-sm tracking-widest">10 COMPOUNDS • TIERED BY IMPACT • FULLY MAPPED</div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compounds.map((compound, index) => (
                <motion.div 
                  key={compound.id}
                  whileHover={{ y: -8, scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => setSelectedCompound(compound)}
                  className="card group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.015] p-8 hover:border-white/20 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-xs tracking-[2px] text-emerald-400 font-medium mb-1.5">{compound.tier}</div>
                      <h3 className="text-2xl font-semibold tracking-[-1px] leading-tight pr-4 group-hover:text-emerald-400 transition-colors">{compound.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/50 mb-1">DOSE</div>
                      <div className="text-white/90 font-medium">{compound.dose}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/50 mb-1">EVIDENCE LEVEL</div>
                      <div className="text-white/80 text-sm">{compound.evidence}</div>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-sm text-white/70 line-clamp-3">
                      {compound.why}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 text-xs tracking-widest text-emerald-400 group-hover:text-emerald-300 flex items-center gap-2">
                    VIEW FULL DETAILS <span className="text-lg leading-none">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Daily Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold tracking-[-2px] mb-8">Daily Timing Schedule</h2>
            <div className="space-y-6">
              {dailySchedule.map((slot, i) => (
                <div key={i} className="flex gap-8 border-l-2 border-emerald-400/30 pl-8 py-1">
                  <div className="w-48 shrink-0 text-sm font-medium text-emerald-400 pt-1">{slot.time}</div>
                  <div className="text-lg text-white/90">{slot.items}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-white/60 max-w-md">This schedule is designed for synergy, bioavailability, and practical daily adherence while minimizing interactions.</p>
          </div>
        )}

        {/* Senolytic Pulse Tab */}
        {activeTab === 'pulse' && (
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold tracking-[-2px] mb-6">Monthly Senolytic Pulse Protocol</h2>
            <div className="prose prose-invert text-white/80">
              <p className="text-xl">For 3 consecutive days each month:</p>
              <ul className="mt-6 space-y-3 text-lg">
                <li><strong>Fisetin</strong> — 20 mg/kg body weight per day</li>
                <li><strong>Quercetin</strong> — 500–1000 mg per day</li>
              </ul>
              <p className="mt-8">This pulse approach is used to clear senescent cells while minimizing continuous exposure. Many users report improved energy and reduced inflammation in the days following the pulse.</p>
              <p className="text-sm mt-6 text-white/60">Always consult a physician before beginning any senolytic protocol, especially if you have existing health conditions.</p>
            </div>
          </div>
        )}

        {/* Biomarkers Tab */}
        {activeTab === 'biomarkers' && (
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold tracking-[-2px] mb-8">Biomarker Tracking Framework</h2>
            <p className="text-xl text-white/80 mb-8">Track these key markers to objectively measure the impact of the stack over 3–6 months:</p>
            <div className="grid gap-4">
              {biomarkerFramework.map((marker, i) => (
                <div key={i} className="flex items-start gap-4 border-l-2 border-emerald-400/40 pl-6 py-1 text-lg">
                  {marker}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Compound Detail Modal - Professional Depth */}
      <AnimatePresence>
        {selectedCompound && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6" onClick={() => setSelectedCompound(null)}>
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="modal bg-[#0A1628] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto p-10"
            >
              <button onClick={() => setSelectedCompound(null)} className="float-right text-white/50 hover:text-white text-3xl leading-none">&times;</button>
              
              <div className="text-emerald-400 text-xs tracking-[3px] font-medium mb-2">{selectedCompound.tier}</div>
              <h2 className="text-5xl font-semibold tracking-[-2px] pr-12 mb-6">{selectedCompound.name}</h2>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
                <div>
                  <div className="uppercase tracking-widest text-xs text-white/50 mb-2">RECOMMENDED DOSE</div>
                  <div className="text-xl font-medium text-white/90">{selectedCompound.dose}</div>
                </div>
                <div>
                  <div className="uppercase tracking-widest text-xs text-white/50 mb-2">EVIDENCE LEVEL</div>
                  <div className="text-white/90">{selectedCompound.evidence}</div>
                </div>
                
                <div className="md:col-span-2 border-t border-white/10 pt-8">
                  <div className="uppercase tracking-widest text-xs text-white/50 mb-3">PRIMARY MECHANISMS</div>
                  <p className="text-lg text-white/90 leading-relaxed">{selectedCompound.mechanisms}</p>
                </div>

                <div className="md:col-span-2">
                  <div className="uppercase tracking-widest text-xs text-white/50 mb-3">SYNERGIES WITH OTHER COMPOUNDS</div>
                  <p className="text-lg text-white/90 leading-relaxed">{selectedCompound.synergies}</p>
                </div>

                <div className="md:col-span-2">
                  <div className="uppercase tracking-widest text-xs text-white/50 mb-3">CLINICAL HIGHLIGHTS</div>
                  <p className="text-lg text-white/90 leading-relaxed">{selectedCompound.clinical}</p>
                </div>

                <div className="md:col-span-2 pt-4 border-t border-white/10">
                  <div className="uppercase tracking-widest text-xs text-white/50 mb-3">WHY THIS COMPOUND MATTERS</div>
                  <p className="text-xl text-white/90 leading-relaxed">{selectedCompound.why}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 text-xs text-white/50">
                This information is for educational purposes. Always work with a qualified healthcare provider when implementing advanced longevity protocols.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
