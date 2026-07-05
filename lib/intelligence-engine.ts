/**
 * TNiC Compound Intelligence Engine
 *
 * Parses natural-language health goals into ranked compound recommendations
 * with evidence tiers, hallmark coverage, synergy notes, and product links.
 * Runs entirely client-side — no API call, no latency.
 */

import { compounds } from './data';
import { hallmarkLibrary } from './hallmarks-library';
import type { Compound } from './types';

// ── Intent taxonomy ──────────────────────────────────────────────────────────

export type HealthIntent =
  | 'energy'
  | 'inflammation'
  | 'brain'
  | 'longevity'
  | 'metabolic'
  | 'mitochondria'
  | 'antioxidant'
  | 'senescence'
  | 'sleep'
  | 'gut'
  | 'heart'
  | 'muscle'
  | 'dna'
  | 'epigenetic';

const INTENT_KEYWORDS: Record<HealthIntent, string[]> = {
  energy: ['energy', 'fatigue', 'tired', 'exhausted', 'nad', 'atp', 'mitochondria', 'stamina', 'vitality', 'performance'],
  inflammation: ['inflammation', 'inflammatory', 'crp', 'cytokine', 'nf-kb', 'chronic', 'pain', 'joint', 'aches', 'nrf2'],
  brain: ['brain', 'cognitive', 'memory', 'focus', 'mental', 'fog', 'clarity', 'alzheimer', 'dementia', 'neurological'],
  longevity: ['longevity', 'lifespan', 'aging', 'anti-aging', 'healthspan', 'biological age', 'hallmarks', 'live longer'],
  metabolic: ['metabolic', 'glucose', 'insulin', 'blood sugar', 'diabetes', 'ampk', 'mtor', 'weight', 'fat', 'obesity'],
  mitochondria: ['mitochondria', 'mitochondrial', 'energy', 'coq10', 'nad', 'atp', 'electron transport', 'mito'],
  antioxidant: ['antioxidant', 'oxidative', 'stress', 'free radical', 'glutathione', 'gsh', 'reactive oxygen'],
  senescence: ['senescence', 'senescent', 'zombie cells', 'sasp', 'fisetin', 'quercetin', 'senolytic', 'cellular aging'],
  sleep: ['sleep', 'insomnia', 'circadian', 'melatonin', 'rest', 'recovery', 'deep sleep'],
  gut: ['gut', 'microbiome', 'digestion', 'dysbiosis', 'leaky gut', 'probiotic', 'butyrate'],
  heart: ['heart', 'cardiovascular', 'cholesterol', 'ldl', 'hdl', 'blood pressure', 'omega', 'epa', 'dha'],
  muscle: ['muscle', 'sarcopenia', 'strength', 'lean mass', 'exercise', 'recovery', 'protein'],
  dna: ['dna', 'genomic', 'repair', 'mutation', 'telomere', 'parp', 'strand break'],
  epigenetic: ['epigenetic', 'methylation', 'histone', 'sirt', 'sirtuin', 'clock', 'dnmt', 'tet'],
};

// ── Compound → intent relevance scores ──────────────────────────────────────

const COMPOUND_INTENT_SCORES: Record<string, Partial<Record<HealthIntent, number>>> = {
  glynac:       { antioxidant: 10, inflammation: 9, mitochondria: 8, energy: 7, dna: 6, longevity: 8 },
  sulforaphane: { antioxidant: 10, inflammation: 9, dna: 8, longevity: 7, brain: 6, epigenetic: 5 },
  rala:         { antioxidant: 9, mitochondria: 9, energy: 8, inflammation: 7, brain: 7, metabolic: 6 },
  cakg:         { longevity: 10, epigenetic: 10, mitochondria: 8, energy: 7, metabolic: 7 },
  nmn:          { energy: 10, mitochondria: 10, longevity: 9, dna: 8, brain: 7, epigenetic: 7 },
  resveratrol:  { longevity: 9, epigenetic: 8, mitochondria: 7, heart: 8, inflammation: 7, brain: 6 },
  taurine:      { longevity: 9, mitochondria: 8, heart: 8, brain: 7, muscle: 7, energy: 6 },
  spermidine:   { longevity: 9, epigenetic: 8, brain: 8, gut: 6, dna: 7, senescence: 6 },
  pterostilbene:{ brain: 9, antioxidant: 8, metabolic: 8, inflammation: 7, longevity: 7 },
  berberine:    { metabolic: 10, gut: 8, heart: 8, inflammation: 7, longevity: 7 },
  urolithina:   { mitochondria: 10, muscle: 9, longevity: 9, senescence: 7, energy: 8 },
  fisetin:      { senescence: 10, brain: 9, inflammation: 8, longevity: 8, dna: 6 },
  coq10:        { mitochondria: 10, heart: 9, energy: 9, antioxidant: 8, brain: 6 },
  omega3:       { heart: 10, inflammation: 10, brain: 9, gut: 7, longevity: 7 },
};

// ── Synergy notes (shown when 2+ compounds are recommended together) ─────────

const SYNERGY_NOTES: Record<string, string> = {
  'glynac+sulforaphane': 'Dual NRF2 amplification — GlyNAC restores GSH substrate while sulforaphane activates NRF2-driven phase-II enzymes.',
  'glynac+rala':         'Triple antioxidant recycling — R-ALA reduces oxidized glutathione back to GSH, amplifying GlyNAC\'s synthesis.',
  'nmn+resveratrol':     'SIRT1 dual activation — NMN provides the NAD+ substrate; resveratrol activates the SIRT1 enzyme directly.',
  'nmn+cakg':            'Epigenetic + NAD+ synergy — Ca-AKG drives TET/JMJ demethylation while NMN fuels SIRT1/PARP.',
  'urolithina+coq10':    'Mitophagy + electron transport — urolithin A clears damaged mitochondria; CoQ10 powers the healthy ones.',
  'fisetin+spermidine':  'Senolytic + autophagy — fisetin clears senescent cells; spermidine upregulates autophagy to remove debris.',
  'berberine+omega3':    'AMPK + resolution — berberine activates AMPK for metabolic control; omega-3 SPMs resolve chronic inflammation.',
};

function getSynergyNote(ids: string[]): string | null {
  for (const [key, note] of Object.entries(SYNERGY_NOTES)) {
    const parts = key.split('+');
    if (parts.every((p) => ids.includes(p))) return note;
  }
  return null;
}

// ── Query parsing ────────────────────────────────────────────────────────────

export interface ParsedIntent {
  intents: HealthIntent[];
  confidence: number; // 0–1
  rawQuery: string;
}

export function parseQuery(query: string): ParsedIntent {
  const q = query.toLowerCase().trim();
  const intentScores: Partial<Record<HealthIntent, number>> = {};

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS) as [HealthIntent, string[]][]) {
    for (const kw of keywords) {
      if (q.includes(kw)) {
        intentScores[intent] = (intentScores[intent] ?? 0) + (kw.length > 5 ? 2 : 1);
      }
    }
  }

  const sorted = (Object.entries(intentScores) as [HealthIntent, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([intent]) => intent);

  const totalScore = Object.values(intentScores).reduce((s, v) => s + v, 0);
  const confidence = Math.min(1, totalScore / 8);

  return {
    intents: sorted.length > 0 ? sorted : ['longevity'],
    confidence,
    rawQuery: query,
  };
}

// ── Recommendation result ────────────────────────────────────────────────────

export interface CompoundRecommendation {
  compound: Compound;
  relevanceScore: number;
  matchedIntents: HealthIntent[];
  primaryReason: string;
  hallmarkNames: string[];
  synergyNote: string | null;
  productUrl: string;
  libraryUrl: string;
  leadPmid: string;
}

export interface IntelligenceResult {
  query: string;
  parsed: ParsedIntent;
  recommendations: CompoundRecommendation[];
  synergyNote: string | null;
  hallmarksCovered: string[];
  suggestedQuery: string | null;
}

// ── Primary reasons by intent ────────────────────────────────────────────────

const INTENT_REASON: Record<HealthIntent, string> = {
  energy:       'Restores NAD+ and mitochondrial energy output',
  inflammation: 'Suppresses NF-κB and reduces inflammatory cytokines',
  brain:        'Crosses blood-brain barrier and supports neuronal health',
  longevity:    'Extends healthspan via multiple hallmark pathways',
  metabolic:    'Activates AMPK and improves insulin sensitivity',
  mitochondria: 'Directly supports mitochondrial biogenesis and function',
  antioxidant:  'Upregulates endogenous antioxidant defenses (NRF2/GSH)',
  senescence:   'Selectively clears senescent cells (senolytic activity)',
  sleep:        'Supports circadian rhythm and sleep quality',
  gut:          'Improves microbiome diversity and gut barrier integrity',
  heart:        'Reduces cardiovascular risk via lipid and inflammation pathways',
  muscle:       'Supports mitophagy and muscle protein synthesis',
  dna:          'Supports DNA repair via PARP/NAD+ and NRF2 activation',
  epigenetic:   'Modulates TET/DNMT enzymes and histone acetylation',
};

// ── Main engine ──────────────────────────────────────────────────────────────

export function runIntelligenceEngine(query: string): IntelligenceResult {
  const parsed = parseQuery(query);
  const { intents } = parsed;

  // Score every compound against the detected intents
  const scored = compounds.map((c) => {
    const intentMap = COMPOUND_INTENT_SCORES[c.id] ?? {};
    let score = 0;
    const matchedIntents: HealthIntent[] = [];

    for (const intent of intents) {
      const s = intentMap[intent] ?? 0;
      if (s > 0) {
        score += s * (intents.indexOf(intent) === 0 ? 1.5 : 1); // boost primary intent
        matchedIntents.push(intent);
      }
    }

    // Tier A compounds get a small boost for trust
    if (c.evidence === 'A') score += 2;

    const primaryIntent = matchedIntents[0] ?? intents[0];
    const hallmarkNames = c.hallmarks
      .map((hid) => hallmarkLibrary.find((h) => h.id === hid)?.title ?? hid)
      .filter(Boolean);

    return {
      compound: c,
      relevanceScore: score,
      matchedIntents,
      primaryReason: INTENT_REASON[primaryIntent] ?? 'Evidence-graded longevity compound',
      hallmarkNames,
      synergyNote: null as string | null,
      productUrl: `/products#${c.id}`,
      libraryUrl: `/library/compounds/${c.id}`,
      leadPmid: c.studies[0]?.pmid ?? '',
    };
  });

  // Top 5 by score
  const top = scored
    .filter((x) => x.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);

  // Fallback: if nothing matched, return top Tier-A compounds
  const recommendations = top.length >= 2 ? top : scored
    .filter((x) => x.compound.evidence === 'A')
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 4);

  const topIds = recommendations.map((r) => r.compound.id);
  const suiteNote = getSynergyNote(topIds);

  const hallmarksCovered = Array.from(
    new Set(recommendations.flatMap((r) => r.hallmarkNames)),
  ).slice(0, 6);

  // Suggest a related query if confidence is low
  const suggestedQuery =
    parsed.confidence < 0.3
      ? 'Try: "reduce inflammation and improve energy" or "support mitochondria and slow aging"'
      : null;

  return {
    query,
    parsed,
    recommendations,
    synergyNote: suiteNote,
    hallmarksCovered,
    suggestedQuery,
  };
}

// ── Preset example queries ───────────────────────────────────────────────────

export const INTELLIGENCE_EXAMPLE_QUERIES = [
  'I want more energy and less brain fog',
  'Reduce inflammation and slow aging',
  'Support mitochondria and improve metabolic health',
  'Clear senescent cells and improve longevity',
  'Antioxidant support and DNA repair',
  'Heart health and reduce chronic inflammation',
];
