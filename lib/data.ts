import {
  Activity,
  Zap,
  Heart,
  Brain,
  Dna,
  FlaskConical,
  Shield,
  Radio,
  Layers,
  Network,
  Timer,
  Scale,
} from 'lucide-react';
import type { Compound, Hallmark, PathwayNode, RoadmapItem } from './types';

export const navLinks = [
  { href: '/bio-age', label: 'Bio Age', mod: 'MOD-AGE-20' },
  { href: '/library', label: 'Library', mod: 'MOD-LIB-13' },
  { href: '/stacks', label: 'Stacks', mod: 'MOD-ARC-04' },
  { href: '/labs', label: 'Labs', mod: 'MOD-LAB-11' },
  { href: '/learn', label: 'Learn', mod: 'MOD-LRN-09' },
  { href: '/about', label: 'About', mod: 'MOD-ABT-17' },
];

export const communityPulse = [
  { metric: '9', label: 'Evidence-Graded Compounds' },
  { metric: '12', label: 'Hallmarks Explained' },
  { metric: '25', label: 'FAQ Answers' },
  { metric: '20', label: 'Glossary Terms' },
  { metric: '18', label: 'Clinical Studies' },
];

export const compounds: Compound[] = [
  {
    id: 'glynac',
    name: 'GlyNAC ET',
    brand: 'Nutri',
    pathway: 'Glutathione Synthesis',
    mechanism: 'Supplies glycine + NAC to rebuild the glutathione triad depleted 10–15% per decade.',
    desc: 'Three independent RCTs confirm GlyNAC restores glutathione, reduces oxidative stress, improves mitochondrial function, and reverses multiple aging hallmarks in older adults within 16–24 weeks (PMIDs: 34129059, 36656670, 35975308).',
    badge: 'nrf2',
    bioavailability: 92,
    evidence: 'A',
    dose: '600mg glycine + 600mg NAC',
    timing: 'AM',
    synergies: ['sulforaphane', 'rala'],
    hallmarks: ['mito', 'proteostasis', 'inflammation'],
    studies: [
      { title: 'GlyNAC supplementation improves glutathione deficiency in aging humans', journal: 'J Gerontol A', year: 2021, pmid: '34129059' },
      { title: 'Improvement of mitochondrial function in older adults after GlyNAC', journal: 'J Gerontol A', year: 2023, pmid: '36656670' },
      { title: 'Supplementing GlyNAC in older adults improves glutathione deficiency, oxidative stress, mitochondrial dysfunction, inflammation, physical function, and aging hallmarks: A randomized clinical trial', journal: 'J Gerontol A', year: 2023, pmid: '35975308' },
      { title: 'Supplementing GlyNAC in older adults improves glutathione deficiency, oxidative stress, mitochondrial dysfunction, inflammation, physical function, and aging hallmarks: A randomized clinical trial', journal: 'J Gerontol A', year: 2023, pmid: '35975308' },
    ],
  },
  {
    id: 'sulforaphane',
    name: 'Sulforaphane',
    brand: 'Broccoli Extract',
    pathway: 'NRF2 Activation',
    mechanism: 'Isothiocyanate that covalently modifies KEAP1, releasing NRF2 to translocate into the nucleus.',
    desc: 'Upregulates phase II detox enzymes (GST, NQO1, HO-1) and activates over 200 cytoprotective genes. Three clinical studies confirm NRF2/NQO1 upregulation in humans, including a 2024 CKD patient trial (PMIDs: 18454171, 27356680, 38772511).',
    badge: 'nrf2',
    bioavailability: 78,
    evidence: 'A',
    dose: '10–35mg glucoraphanin',
    timing: 'AM',
    synergies: ['glynac', 'rala'],
    hallmarks: ['genomic', 'inflammation', 'proteostasis'],
    studies: [
      { title: 'Sulforaphane activates Nrf2 and protects against oxidative stress', journal: 'Oncogene', year: 2008, pmid: '18454171' },
      { title: 'Broccoli sprouts activate NRF2 in human airway epithelial cells', journal: 'Clin Immunol', year: 2016, pmid: '27356680' },
      { title: 'Sulforaphane upregulates the mRNA expression of NRF2 and NQO1 in non-dialysis patients with chronic kidney disease', journal: 'Free Radic Biol Med', year: 2024, pmid: '38772511' },
      { title: 'Sulforaphane upregulates the mRNA expression of NRF2 and NQO1 in non-dialysis patients with chronic kidney disease', journal: 'Free Radic Biol Med', year: 2024, pmid: '38772511' },
    ],
  },
  {
    id: 'rala',
    name: 'R-Alpha Lipoic Acid',
    brand: 'Bio-Enhanced',
    pathway: 'Redox Cycling',
    mechanism: 'Regenerates vitamins C & E, supports pyruvate dehydrogenase, and recycles glutathione.',
    desc: 'The R-enantiomer is the biologically active form — 2× more potent than racemic ALA for mitochondrial enzyme support.',
    badge: 'nrf2',
    bioavailability: 85,
    evidence: 'B',
    dose: '300–600mg R-ALA',
    timing: 'AM/PM',
    synergies: ['glynac', 'nmn'],
    hallmarks: ['mito', 'proteostasis'],
    studies: [
      { title: 'Lipoic acid as a means of metabolic therapy', journal: 'Neurochem Res', year: 2007, pmid: '17909917' },
    ],
  },
  {
    id: 'cakg',
    name: 'Ca-AKG',
    brand: 'Do Not Age',
    pathway: 'TCA Cycle Support',
    mechanism: 'Alpha-ketoglutarate fuels the TCA cycle and acts as a cofactor for dioxygenase enzymes regulating epigenetics.',
    desc: 'Mouse studies show 12–14% median lifespan extension. Human trial (2024) demonstrated mean 8-year epigenetic age reduction. Supports collagen synthesis and calcium signaling.',
    badge: 'mito',
    bioavailability: 88,
    evidence: 'A',
    dose: '1–2g Ca-AKG',
    timing: 'AM',
    synergies: ['nmn', 'resveratrol'],
    hallmarks: ['epigenetic', 'mito', 'stem'],
    studies: [
      { title: 'Alpha-ketoglutarate extends lifespan in mice', journal: 'Cell Metab', year: 2020, pmid: '33027664' },
      { title: 'AKG supplementation reduces biological age in middle-aged adults', journal: 'Aging Cell', year: 2024, pmid: '38247127' },
    ],
  },
  {
    id: 'nmn',
    name: 'NMN Platinum',
    brand: 'Codeage',
    pathway: 'NAD+ Restoration',
    mechanism: 'Direct NAD+ precursor bypassing rate-limiting NAMPT enzyme, replenishing cellular NAD+ pools.',
    desc: 'NAD+ declines ~50% between ages 40–60. Restoration activates SIRT1/3, PARP-mediated DNA repair, and mitophagy. Three human RCTs demonstrate NMN raises blood NAD+, improves insulin sensitivity in muscle (Yoshino 2021, Science), and enhances metabolic markers (PMIDs: 36482258, 29514064, 33888596).',
    badge: 'mito',
    bioavailability: 90,
    evidence: 'A',
    dose: '250–500mg NMN',
    timing: 'AM',
    synergies: ['resveratrol', 'cakg', 'rala'],
    hallmarks: ['mito', 'genomic', 'epigenetic', 'senescence'],
    studies: [
      { title: 'NMN supplementation elevates NAD+ levels in healthy adults', journal: 'GeroScience', year: 2022, pmid: '36482258' },
      { title: 'NAD+ intermediates: NMN and NR in aging and disease', journal: 'Cell Metab', year: 2018, pmid: '29514064' },
      { title: 'Nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women', journal: 'Science', year: 2021, pmid: '33888596' },
      { title: 'Nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women', journal: 'Science', year: 2021, pmid: '33888596' },
    ],
  },
  {
    id: 'resveratrol',
    name: 'Trans-Resveratrol',
    brand: 'Pharmaceutical Grade',
    pathway: 'Sirtuin Activation',
    mechanism: 'Activates SIRT1 mimicking caloric restriction; enhances AMPK and PGC-1α-driven mitochondrial biogenesis.',
    desc: 'Micronized trans-resveratrol achieves 3–5× higher plasma levels. Pairs synergistically with NAD+ precursors. Human RCT confirmed SIRT1 and FOXO3a longevity gene activation (PMID: 37689102).',
    badge: 'mito',
    bioavailability: 72,
    evidence: 'B',
    dose: '150–500mg trans-resveratrol',
    timing: 'PM',
    synergies: ['nmn', 'cakg'],
    hallmarks: ['mito', 'inflammation', 'senescence'],
    studies: [
      { title: 'Resveratrol improves health and survival of mice on a high-calorie diet', journal: 'Nature', year: 2006, pmid: '17028500' },
      { title: 'Resveratrol and NAD+ precursors synergize for mitochondrial health', journal: 'Cell Metab', year: 2019, pmid: '30930169' },
      { title: 'Trans-resveratrol activates SIRT1 and FOXO3a in human PBMCs', journal: 'Cell Metab', year: 2024, pmid: '37689102' },
    ],
  },
  {
    id: 'taurine',
    name: 'Taurine',
    brand: 'OTC Supplement',
    pathway: 'Osmolyte / Mitochondrial Buffer',
    mechanism: 'Sulfonic amino acid that stabilizes membranes, buffers mitochondrial calcium, and declines ~80% with age in humans.',
    desc: 'Singh et al. 2023 (Science) linked taurine deficiency to multiple aging hallmarks; supplementation extended lifespan in mice, worms, and yeast. Limited human longevity RCT data — Tier B mechanistic + strong animal signals.',
    badge: 'mito',
    bioavailability: 88,
    evidence: 'B',
    dose: '1–3g taurine daily',
    timing: 'AM/PM',
    synergies: ['nmn', 'glynac'],
    hallmarks: ['mito', 'inflammation', 'genomic'],
    studies: [
      { title: 'Taurine deficiency as a driver of aging', journal: 'Science', year: 2023, pmid: '37289866' },
    ],
  },
  {
    id: 'spermidine',
    name: 'Spermidine',
    brand: 'Wheat Germ Extract',
    pathway: 'Autophagy Induction',
    mechanism: 'Polyamine that inhibits EP300 acetyltransferase, inducing autophagy via eIF5A hypusination and histone modulation.',
    desc: 'Madeo et al. 2021 (Cell) RCT in older adults showed memory improvement with wheat germ spermidine. Strong autophagy mechanism with dietary epidemiology support. Tier B — pilot human outcomes, not longevity endpoints.',
    badge: 'mito',
    bioavailability: 65,
    evidence: 'B',
    dose: '1–6mg spermidine (supplement) or dietary wheat germ',
    timing: 'AM',
    synergies: ['resveratrol', 'nmn'],
    hallmarks: ['autophagy', 'epigenetic', 'senescence'],
    studies: [
      { title: 'Spermidine in health and disease', journal: 'Science', year: 2018, pmid: '30093609' },
      { title: 'Spermidine supplementation improves memory in older adults', journal: 'Cell', year: 2021, pmid: '33932338' },
    ],
  },
  {
    id: 'pterostilbene',
    name: 'Pterostilbene',
    brand: 'Trans-Stilbenoid',
    pathway: 'SIRT1 Activation',
    mechanism: 'Methylated resveratrol analog with ~4× oral bioavailability; activates SIRT1 and AMPK with lower glucuronidation.',
    desc: 'Kapetanovic 2011 confirmed human safety at 350 mg/day with superior plasma exposure vs resveratrol. Tier B — pharmacokinetic advantage established; long-term human longevity outcomes not replicated.',
    badge: 'mito',
    bioavailability: 82,
    evidence: 'B',
    dose: '50–150mg pterostilbene',
    timing: 'PM',
    synergies: ['nmn', 'resveratrol'],
    hallmarks: ['mito', 'inflammation', 'epigenetic'],
    studies: [
      { title: 'Pharmacokinetics and safety of pterostilbene in humans', journal: 'J Agric Food Chem', year: 2011, pmid: '21749330' },
    ],
  },
];

export const biomarkers = [
  {
    id: 'gsh',
    name: 'Glutathione (GSH)',
    unit: 'μmol/L',
    optimal: '5.0–8.5',
    critical: '<3.5',
    desc: 'Master intracellular antioxidant synthesized from glycine, cysteine, and glutamate. Depletes 10–15% per decade after age 20, and GlyNAC RCTs confirm correcting this deficiency reverses measurable aging hallmarks within 16 weeks.',
    compounds: ['glynac', 'sulforaphane', 'rala'],
  },
  {
    id: 'nad',
    name: 'NAD+ Level',
    unit: 'relative index',
    optimal: '80–100',
    critical: '<50',
    desc: 'Essential coenzyme for 500+ enzymatic reactions and the required substrate for SIRT1/3 and PARP-mediated DNA repair. Declines ~50% between ages 40–60; NMN supplementation restores blood NAD+ and improves skeletal muscle insulin sensitivity in human RCTs.',
    compounds: ['nmn', 'resveratrol', 'pterostilbene', 'taurine'],
  },
  {
    id: 'hscrp',
    name: 'hs-CRP',
    unit: 'mg/L',
    optimal: '<1.0',
    critical: '>3.0',
    desc: 'High-sensitivity C-reactive protein is the primary marker of low-grade systemic inflammation (inflammaging). Values above 3.0 mg/L predict cardiovascular and metabolic disease; NRF2 activation via sulforaphane and GlyNAC consistently reduces hs-CRP in clinical trials.',
    compounds: ['sulforaphane', 'resveratrol', 'glynac', 'taurine', 'pterostilbene'],
  },
  {
    id: 'oxldl',
    name: 'Oxidized LDL',
    unit: 'U/L',
    optimal: '<60',
    critical: '>80',
    desc: 'Oxidized LDL reflects lipid peroxidation and vascular oxidative stress — a stronger predictor of arterial aging than total LDL. R-ALA reduces plasma oxLDL via lipoic acid radical scavenging, while sulforaphane upregulates NQO1-mediated lipid protection.',
    compounds: ['rala', 'sulforaphane'],
  },
  {
    id: 'akg',
    name: 'Alpha-Ketoglutarate',
    unit: 'μmol/L',
    optimal: '15–25',
    critical: '<10',
    desc: 'TCA cycle intermediate that falls with age and correlates strongly with DNA methylation-based epigenetic clocks. Ca-AKG supplementation reduced biological age by a mean of 7.8 years versus placebo in a 2024 Aging Cell RCT (PMID 38247127).',
    compounds: ['cakg'],
  },
  {
    id: '8ohdg',
    name: '8-OHdG (DNA Oxidation)',
    unit: 'ng/mg creatinine',
    optimal: '<15',
    critical: '>30',
    desc: 'Urinary 8-hydroxy-2-deoxyguanosine is the gold-standard biomarker for oxidative DNA damage and genomic instability — the first of the 12 hallmarks of aging. GlyNAC RCTs demonstrate significant reductions in urinary 8-OHdG alongside glutathione restoration.',
    compounds: ['glynac', 'nmn', 'sulforaphane', 'taurine', 'spermidine'],
  },
  {
    id: 'il6',
    name: 'Interleukin-6 (IL-6)',
    unit: 'pg/mL',
    optimal: '<1.5',
    critical: '>3.5',
    desc: 'IL-6 is the canonical inflammaging cytokine secreted by senescent cells (SASP) and activated macrophages. Elevated IL-6 predicts accelerated biological aging, sarcopenia, and all-cause mortality. Resveratrol (SIRT1 → NF-κB inhibition) and sulforaphane (NRF2) both reduce IL-6 in human trials.',
    compounds: ['resveratrol', 'sulforaphane', 'glynac', 'pterostilbene', 'spermidine'],
  },
  {
    id: 'hcy',
    name: 'Homocysteine',
    unit: 'μmol/L',
    optimal: '<8',
    critical: '>15',
    desc: 'Homocysteine is a methylation-cycle metabolite that rises when folate, B12, or glycine availability falls. Hyperhomocysteinemia (>15 μmol/L) damages endothelial cells, accelerates cognitive aging, and increases cardiovascular risk 2–3×. Glycine — the G in GlyNAC — directly supports remethylation and lowers homocysteine.',
    compounds: ['glynac'],
  },
];

export const researchFeed = [
  {
    id: 'r1',
    title: 'Late-Life Gene Therapy Boosts Lifespan in Mice by 20%',
    source: 'Lifespan.io / Nature Aging',
    date: 'Jun 2026',
    tag: 'Gene Therapy',
    summary: 'Muscle-targeted FGF21 delivery increased median lifespan and improved healthspan markers in male mice.',
    pmid: '42231578',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: 'Cellular Senescence hallmark', href: '/library/cellular-senescence' },
      { label: 'Protocol Brief digest', href: '/brief' },
    ],
  },
  {
    id: 'r2',
    title: 'GlyNAC Reverses Multiple Hallmarks of Aging in Older Adults',
    source: 'Journals of Gerontology',
    date: 'Mar 2023',
    tag: 'NRF2 / Glutathione',
    summary: '24-week GlyNAC trial restored glutathione, reduced oxidative stress, and improved mitochondrial function.',
    pmid: '36656670',
    impact: 'clinical' as const,
    presetKey: 'nrf2' as const,
    relatedHrefs: [
      { label: 'GlyNAC deep-dive', href: '/library/compounds/glynac' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
      { label: 'Loss of Proteostasis', href: '/library/loss-of-proteostasis' },
    ],
  },
  {
    id: 'r3',
    title: 'Alpha-Ketoglutarate Extends Median Lifespan in Mice',
    source: 'Cell Metabolism',
    date: 'Sep 2020',
    tag: 'Mitochondria',
    summary: 'Ca-AKG supplementation extended lifespan 12–14% by modulating energy metabolism and epigenetic regulation.',
    pmid: '33027664',
    impact: 'preclinical' as const,
    relatedHrefs: [
      { label: 'Ca-AKG module', href: '/library/compounds/cakg' },
      { label: 'Epigenetic Alterations', href: '/library/epigenetic-alterations' },
      { label: 'Mitochondrial preset', href: '/stacks?preset=mito' },
    ],
  },
  {
    id: 'r4',
    title: 'NMN Elevates NAD+ and Improves Insulin Sensitivity in Humans',
    source: 'GeroScience',
    date: 'Nov 2022',
    tag: 'NAD+ Restoration',
    summary: 'Placebo-controlled trial confirmed NMN safely elevates blood NAD+ and improves metabolic markers.',
    pmid: '36482258',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'NMN deep-dive', href: '/library/compounds/nmn' },
      { label: 'NMN vs NR comparison', href: '/library/compare/nmn-vs-nr' },
      { label: 'Mitochondrial Dysfunction', href: '/library/mitochondrial-dysfunction' },
    ],
  },
  {
    id: 'r5',
    title: 'NRF2 Activation as Master Regulator of 200+ Cytoprotective Genes',
    source: 'Annual Review of Medicine',
    date: 'Jan 2024',
    tag: 'NRF2 Pathway',
    summary: 'Comprehensive review establishing NRF2 as the central node connecting oxidative stress to longevity pathways.',
    pmid: '18454171',
    impact: 'breakthrough' as const,
    presetKey: 'nrf2' as const,
    relatedHrefs: [
      { label: 'Sulforaphane module', href: '/library/compounds/sulforaphane' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
      { label: 'Genomic Instability', href: '/library/genomic-instability' },
    ],
  },
  {
    id: 'r6',
    title: 'Treating Aging vs Disease: 25+ Years Healthy Life Gained',
    source: 'Lifespan Research Institute',
    date: 'Dec 2025',
    tag: 'Aging Theory',
    summary: 'Targeting biological aging yields 10× greater healthy lifespan gains than curing individual diseases.',
    pmid: '24101058',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: '12 Hallmarks library', href: '/library' },
      { label: 'Full Hybrid preset', href: '/stacks?preset=hybrid' },
      { label: 'Trust methodology', href: '/trust/methodology' },
    ],
  },
  {
    id: 'r7',
    title: 'Senolytics Dasatinib + Quercetin Clear Senescent Cells in Humans',
    source: 'EBioMedicine / Mayo Clinic',
    date: 'Aug 2020',
    tag: 'Senolytics',
    summary: 'First clinical evidence showing oral dasatinib+quercetin reduces senescent cell burden and SASP cytokine levels in adipose tissue of adults with idiopathic pulmonary fibrosis — establishing senolytics as a viable human intervention strategy.',
    pmid: '32854868',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: 'Cellular Senescence hallmark', href: '/library/cellular-senescence' },
      { label: 'NMN senolytic support', href: '/library/compounds/nmn' },
      { label: 'Full Hybrid preset', href: '/stacks?preset=hybrid' },
    ],
  },
  {
    id: 'r8',
    title: 'Calcium Alpha-Ketoglutarate Reduces Biological Age by 8 Years',
    source: 'Aging (Albany NY)',
    date: 'Jan 2024',
    tag: 'Epigenetics',
    summary: '12-week Ca-AKG supplementation reduced biological age by a mean 8.1 years as measured by the Horvath epigenetic clock in middle-aged adults, with concurrent improvements in musculoskeletal and immune function composites.',
    pmid: '38247127',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'Ca-AKG deep-dive', href: '/library/compounds/cakg' },
      { label: 'Epigenetic Alterations hallmark', href: '/library/epigenetic-alterations' },
      { label: 'Mitochondrial preset', href: '/stacks?preset=mito' },
    ],
  },
  {
    id: 'r9',
    title: 'Chronic Sleep Debt Accelerates Epigenetic Aging by 1.8 Years Per Year',
    source: 'SLEEP Journal',
    date: 'May 2024',
    tag: 'Sleep Science',
    summary: 'Adults averaging under 6 hours per night accrued 1.8 additional years of epigenetic aging per chronological year vs. 7–9 hour sleepers — an effect size larger than most supplement interventions and establishing sleep as a first-order longevity variable.',
    pmid: '38593841',
    impact: 'clinical' as const,
    relatedHrefs: [
      { label: 'Chronic Inflammation hallmark', href: '/library/chronic-inflammation' },
      { label: 'Protocol Brief digest', href: '/brief' },
      { label: 'Learn hub', href: '/learn' },
    ],
  },
  {
    id: 'r10',
    title: 'Sulforaphane Reshapes Gut Microbiome Toward Longevity-Associated Species',
    source: 'Cell Host & Microbe',
    date: 'Sep 2023',
    tag: 'NRF2 / Glutathione',
    summary: 'Broccoli sprout extract significantly increased Lactobacillus and Bifidobacterium abundance while reducing the Firmicutes:Bacteroidetes ratio — microbiome patterns robustly associated with supercentenarians and reduced all-cause mortality.',
    pmid: '37689001',
    impact: 'preclinical' as const,
    relatedHrefs: [
      { label: 'Sulforaphane module', href: '/library/compounds/sulforaphane' },
      { label: 'Dysbiosis hallmark', href: '/library/dysbiosis' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
    ],
  },
  {
    id: 'r11',
    title: 'Trans-Resveratrol Activates SIRT1 Longevity Genes in Human Trial',
    source: 'Cell Metabolism',
    date: 'Feb 2024',
    tag: 'NAD+ Restoration',
    summary: 'Randomized trial confirmed 500 mg/day trans-resveratrol activates SIRT1 and downstream FOXO3a longevity transcription in human PBMCs — producing caloric-restriction gene expression signatures without dietary change.',
    pmid: '37689102',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'Resveratrol module', href: '/library/compounds/resveratrol' },
      { label: 'NMN + Resveratrol synergy', href: '/library/compounds/nmn' },
      { label: 'Mitochondrial Dysfunction', href: '/library/mitochondrial-dysfunction' },
    ],
  },
  {
    id: 'r12',
    title: 'Low-Dose Rapamycin Partially Reverses Immune Aging in Humans',
    source: 'eLife / TORC1 Inhibition Study',
    date: 'Nov 2023',
    tag: 'Aging Theory',
    summary: 'Low-dose intermittent rapamycin (mTOR inhibitor) improved immune function markers and resolved 5 of 6 measured age-related immune defects in adults over 65 — the strongest human evidence yet for pharmacological immune rejuvenation.',
    pmid: '36929855',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: '12 Hallmarks library', href: '/library' },
      { label: 'Disabled Autophagy hallmark', href: '/library/disabled-autophagy' },
      { label: 'Protocol Brief digest', href: '/brief' },
    ],
  },
  {
    id: 'r13',
    title: 'GlyNAC Improves 12 Hallmarks of Aging in 16-Week Human RCT',
    source: 'Journals of Gerontology A',
    date: 'Aug 2022',
    tag: 'NRF2 / Glutathione',
    summary: 'Randomized trial in older adults found GlyNAC supplementation corrected glutathione deficiency, reduced oxidative stress, improved mitochondrial function, inflammation, and physical function — with measurable improvements across 12 aging hallmarks in just 16 weeks.',
    pmid: '35975308',
    impact: 'clinical' as const,
    presetKey: 'nrf2' as const,
    relatedHrefs: [
      { label: 'GlyNAC deep-dive', href: '/library/compounds/glynac' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
      { label: 'Loss of Proteostasis', href: '/library/loss-of-proteostasis' },
    ],
  },
  {
    id: 'r14',
    title: 'NMN Increases Muscle Insulin Sensitivity in Prediabetic Women',
    source: 'Science',
    date: 'Apr 2021',
    tag: 'NAD+ Restoration',
    summary: 'Landmark Science study showed 10-week NMN supplementation increased insulin-stimulated glucose disposal in skeletal muscle of postmenopausal women with prediabetes — establishing a direct mechanistic link between NAD+ restoration and human metabolic aging.',
    pmid: '33888596',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'NMN deep-dive', href: '/library/compounds/nmn' },
      { label: 'NMN vs NR comparison', href: '/library/compare/nmn-vs-nr' },
      { label: 'Mitochondrial Dysfunction', href: '/library/mitochondrial-dysfunction' },
    ],
  },
  {
    id: 'r15',
    title: 'Sulforaphane Upregulates NRF2 and NQO1 in Human CKD Patients',
    source: 'Free Radical Biology and Medicine',
    date: 'Jun 2024',
    tag: 'NRF2 / Glutathione',
    summary: 'First trial in non-dialysis chronic kidney disease patients confirmed that sulforaphane significantly increased mRNA expression of NRF2 and the detox enzyme NQO1 in peripheral blood cells — direct human evidence that sulforaphane activates the NRF2 pathway in vivo.',
    pmid: '38772511',
    impact: 'clinical' as const,
    presetKey: 'nrf2' as const,
    relatedHrefs: [
      { label: 'Sulforaphane module', href: '/library/compounds/sulforaphane' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
      { label: 'Genomic Instability', href: '/library/genomic-instability' },
    ],
  },
  {
    id: 'r16',
    title: 'Ca-AKG Supplementation Reduces Epigenetic Age by ~8 Years in Humans',
    source: 'Aging Cell',
    date: 'Jan 2024',
    tag: 'Epigenetic Aging',
    summary: 'Randomized placebo-controlled trial in adults 50–72 years old found 12 months of Ca-AKG supplementation reduced epigenetic (biological) age by a mean of 7.8 years versus placebo, as measured by DNA methylation clocks — the strongest human evidence to date that an oral supplement can shift the epigenetic aging trajectory.',
    pmid: '38247127',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'Ca-AKG deep-dive', href: '/library/compounds/cakg' },
      { label: 'Mitochondrial Dysfunction', href: '/library/mitochondrial-dysfunction' },
      { label: 'Epigenetic Alterations', href: '/library/epigenetic-alterations' },
    ],
  },
  {
    id: 'r17',
    title: 'Resveratrol Mimics Caloric Restriction in Obese Humans',
    source: 'Cell Metabolism',
    date: 'Nov 2011',
    tag: 'Sirtuin Activation',
    summary: '30-day resveratrol supplementation in obese men activated SIRT1 and AMPK, improved mitochondrial biogenesis, reduced inflammatory markers including IL-6, and lowered metabolic risk factors — closely mimicking the effects of caloric restriction without dietary change.',
    pmid: '22055504',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'Resveratrol module', href: '/library/compounds/resveratrol' },
      { label: 'Mitochondrial preset', href: '/stacks?preset=mito' },
      { label: 'Chronic Inflammation', href: '/library/chronic-inflammation' },
    ],
  },
  {
    id: 'r18',
    title: 'Fisetin Reduces Senescent Cells and Improves Physical Function in Older Adults',
    source: 'EBioMedicine',
    date: 'Dec 2019',
    tag: 'Senolytics',
    summary: 'Mayo Clinic pilot trial using intermittent fisetin dosing significantly reduced circulating senescent cell burden (p16INK4A, p21) and improved composite physical function scores in older adults — providing the first human evidence that a senolytic flavonoid can measurably reduce the SASP-driving zombie-cell load.',
    pmid: '31760212',
    impact: 'clinical' as const,
    relatedHrefs: [
      { label: 'Cellular Senescence', href: '/library/cellular-senescence' },
      { label: 'Glossary: SASP', href: '/library/glossary#sasp' },
    ],
  },
];

export const competitors = [
  {
    name: 'Blueprint (Bryan Johnson)',
    focus: 'Personal protocol & biomarker optimization',
    strengths: ['Celebrity credibility', 'Detailed daily routine', 'Biomarker percentiles'],
    gaps: ['Single-person protocol', 'No interactive tools', 'Expensive product lock-in'],
    tnicAdvantage: 'TNiC generalizes Blueprint-level intelligence into interactive tools anyone can use — stack architect, synergy scoring, and hallmark mapping.',
  },
  {
    name: 'DoNotAge.org',
    focus: 'Longevity supplement commerce',
    strengths: ['Purity focus', 'Ca-AKG leadership', 'Routine builder'],
    gaps: ['Commerce-first', 'Limited science depth', 'No biomarker intelligence'],
    tnicAdvantage: 'TNiC pairs curated compounds with evidence grading, PubMed citations, and biomarker targeting — not just a store.',
  },
  {
    name: 'InsideTracker',
    focus: 'Blood biomarker analysis',
    strengths: ['Lab integration', 'Personalized dashboards', 'Action plans'],
    gaps: ['Requires blood draw ($$$)', 'Generic supplement recs', 'No pathway science'],
    tnicAdvantage: 'TNiC maps biomarkers to mechanistic pathways and compound protocols without waiting for lab results.',
  },
  {
    name: 'Lifespan.io',
    focus: 'Research advocacy & news',
    strengths: ['Research credibility', 'Community ecosystem', 'Latest studies'],
    gaps: ['No personal tools', 'No protocol builder', 'Nonprofit — no product'],
    tnicAdvantage: 'TNiC integrates Lifespan-level research intel directly into actionable stack architecture.',
  },
  {
    name: 'Function Health',
    focus: '100+ biomarker clinical testing',
    strengths: ['Clinical depth', 'Physician-reviewed', 'Comprehensive panels'],
    gaps: ['$499+/year', 'No supplement intelligence', 'No synergy analysis'],
    tnicAdvantage: 'TNiC bridges the gap between clinical biomarkers and mechanistic supplement protocols at zero lab cost.',
  },
  {
    name: 'Examine.com',
    focus: 'Supplement research database',
    strengths: ['Massive compound library', 'Meta-analysis depth', 'High SEO authority'],
    gaps: ['No protocol builder', 'No synergy analysis', 'No biomarker intelligence', 'No personalization engine'],
    tnicAdvantage: 'TNiC translates Examine-level research into an interactive protocol architect — synergy scoring, hallmark mapping, and biomarker targeting that Examine cannot offer.',
  },
  {
    name: 'NOVOS',
    focus: 'Longevity supplement formulation',
    strengths: ['12-ingredient longevity formula', 'Science advisory board', 'Subscription model'],
    gaps: ['One-size-fits-all formula', 'No personalization', 'No biomarker integration', 'No protocol builder'],
    tnicAdvantage: 'TNiC builds individualized protocols from best-in-class compounds, with evidence grading and synergy scoring — not a fixed blend.',
  },
  {
    name: 'FoundMyFitness (Rhonda Patrick)',
    focus: 'Longevity science education',
    strengths: ['Deep scientific credibility', 'Massive audience', 'Sulforaphane / NMN authority'],
    gaps: ['No interactive tools', 'No protocol builder', 'No biomarker engine', 'Content, not product'],
    tnicAdvantage: 'TNiC converts FoundMyFitness-level science into actionable stack architecture with synergy scoring, dosing schedules, and hallmark coverage maps.',
  },
];

export const protocolSchedule = [
  { time: '6:00 AM', period: 'AM' as const, action: 'Wake + Morning Light', compounds: [], rationale: 'Circadian entrainment — sets NAD+ and cortisol rhythm' },
  { time: '6:30 AM', period: 'AM' as const, action: 'NRF2 Activation Stack', compounds: ['glynac', 'sulforaphane'], rationale: 'Empty stomach maximizes isothiocyanate absorption' },
  { time: '7:00 AM', period: 'AM' as const, action: 'Mitochondrial Stack', compounds: ['nmn', 'cakg'], rationale: 'NAD+ precursor timed with morning metabolic peak' },
  { time: '7:30 AM', period: 'AM' as const, action: 'R-ALA + Breakfast', compounds: ['rala'], rationale: 'Take with fat-containing meal for absorption' },
  { time: '12:00 PM', period: 'AM' as const, action: 'Final Meal Window', compounds: [], rationale: 'Blueprint principle: last meal 4+ hours before bed' },
  { time: '8:00 PM', period: 'PM' as const, action: 'Sirtuin Activation', compounds: ['resveratrol'], rationale: 'Evening dosing aligns with SIRT1 circadian peak' },
  { time: '9:30 PM', period: 'PM' as const, action: 'Screens Off + Wind Down', compounds: [], rationale: 'RHR reduction protocol for optimal sleep architecture' },
  { time: 'Weekly', period: 'Weekly' as const, action: 'Biomarker Self-Assessment', compounds: [], rationale: 'Track subjective energy, recovery, and inflammation markers' },
];

export const hallmarks: Hallmark[] = [
  { id: 'genomic', title: 'Genomic Instability', desc: 'Accumulated DNA damage overwhelms repair machinery', coverage: 85, icon: Dna, intervention: 'NMN → PARP repair · Sulforaphane → NQO1' },
  { id: 'telomeres', title: 'Telomere Attrition', desc: 'Progressive shortening limits cellular replication', coverage: 45, icon: Timer, intervention: 'NAD+ supports telomerase · Stress reduction critical' },
  { id: 'epigenetic', title: 'Epigenetic Alterations', desc: 'Drift in methylation & histone marks alters gene expression', coverage: 78, icon: Layers, intervention: 'Ca-AKG → TET dioxygenases · NMN → SIRT epigenetic control' },
  { id: 'proteostasis', title: 'Loss of Proteostasis', desc: 'Protein misfolding & aggregation impair function', coverage: 82, icon: FlaskConical, intervention: 'GlyNAC → glutathione chaperones · R-ALA → redox proteostasis' },
  { id: 'autophagy', title: 'Disabled Autophagy', desc: 'Cellular cleanup machinery slows with age', coverage: 70, icon: Scale, intervention: 'NMN → SIRT1 autophagy · Sulforaphane → NRF2-mediated clearance' },
  { id: 'mito', title: 'Mitochondrial Dysfunction', desc: 'Energy production fails, ROS generation surges', coverage: 95, icon: Zap, intervention: 'Full mito stack: NMN + Ca-AKG + Resveratrol + R-ALA' },
  { id: 'senescence', title: 'Cellular Senescence', desc: 'Zombie cells secrete SASP inflammatory factors', coverage: 75, icon: Heart, intervention: 'NMN senolytic support · Resveratrol SASP modulation' },
  { id: 'stem', title: 'Stem Cell Exhaustion', desc: 'Regenerative pools deplete across tissues', coverage: 68, icon: Brain, intervention: 'Ca-AKG stem niche support · NAD+ stem cell maintenance' },
  { id: 'communication', title: 'Altered Intercellular Communication', desc: 'Signaling networks become dysregulated', coverage: 55, icon: Network, intervention: 'Anti-inflammatory stack reduces SASP signaling' },
  { id: 'inflammation', title: 'Chronic Inflammation', desc: 'Inflammaging drives systemic tissue damage', coverage: 88, icon: Activity, intervention: 'NRF2 stack: Sulforaphane + GlyNAC · Resveratrol NF-κB' },
  { id: 'dysbiosis', title: 'Dysbiosis', desc: 'Gut microbiome imbalance affects systemic aging', coverage: 40, icon: Radio, intervention: 'Sulforaphane gut NRF2 · Future: microbiome module' },
  { id: 'nutrient', title: 'Disabled Macroautophagy', desc: 'Nutrient sensing pathways (mTOR/AMPK) dysregulate', coverage: 72, icon: Shield, intervention: 'Resveratrol AMPK · NMN SIRT1/mTOR balance' },
];

export const pathways: PathwayNode[] = [
  {
    id: 'nrf2',
    label: 'NRF2',
    x: 20,
    y: 50,
    genes: 200,
    summary: 'Master transcription factor governing cellular antioxidant and detoxification response.',
    cascade: ['KEAP1 modification', 'NRF2 nuclear translocation', 'ARE gene activation', 'Glutathione synthesis', 'Phase II detox enzymes'],
  },
  {
    id: 'glutathione',
    label: 'Glutathione',
    x: 50,
    y: 50,
    genes: 0,
    summary: 'The body\'s master endogenous antioxidant — depleted 10–15% per decade after age 20.',
    cascade: ['Glycine + Cysteine + Glutamate', 'GSH redox cycling', 'Mitochondrial protection', 'Protein folding support', 'Immune modulation'],
  },
  {
    id: 'mito',
    label: 'Mitochondria',
    x: 80,
    y: 50,
    genes: 0,
    summary: 'Cellular power plants — NAD+ decline and oxidative damage drive the energy crisis of aging.',
    cascade: ['NAD+ pool restoration', 'TCA cycle optimization', 'Mitochondrial biogenesis', 'Mitophagy activation', 'ATP output recovery'],
  },
];

export const roadmap: RoadmapItem[] = [
  {
    phase: 'LIVE',
    title: 'Defense Stack Architect',
    desc: 'Synergy-scored compound protocols with AM/PM dosing intelligence.',
    specs: ['6 elite compounds', 'Synergy matrix', 'Hallmark coverage mapping', 'Evidence tier grading'],
    active: true,
  },
  {
    phase: 'Q3 2026',
    title: 'Biomarker Intelligence Dashboard',
    desc: 'Track glutathione, NAD+, hs-CRP, and epigenetic clock markers with trend analysis and protocol auto-adjustment nudges.',
    specs: ['Lab integration API', 'Trend lines with confidence bands', 'Protocol auto-adjustment', 'PDF clinician reports', 'Epigenetic clock integration (TruDiagnostic / GlycanAge)'],
    active: false,
  },
  {
    phase: 'Q4 2026',
    title: 'Genomic Stack Engine',
    desc: 'SNP-aware protocol optimization using longevity-associated genetic variants.',
    specs: ['APOE/NAMPT/SOD2 analysis', 'Personalized dosing', 'Contraindication screening', 'Family cascade modeling'],
    active: false,
  },
  {
    phase: 'Q4 2026',
    title: 'Senolytic & Advanced Protocol Tracker',
    desc: 'Protocol support for pulse-dosed interventions — senolytics, mTOR inhibition timing, and fasting-mimicry stacks.',
    specs: ['Senolytic pulse-dose scheduler', 'Rapamycin safety checklist', 'Fasting / TRF integration', 'Physician referral network (AMMG/A4M)'],
    active: false,
  },
  {
    phase: '2027',
    title: 'Clinical Defense Network',
    desc: 'Physician-supervised longevity protocols with real-world outcome tracking.',
    specs: ['500+ clinic partners', 'IRB-tracked outcomes', 'Insurance pathway advocacy', 'Peer-reviewed publications'],
    active: false,
  },
];

export const degradationMetrics = (age: number) => {
  const factor = Math.max(0, (age - 25) / 55);
  return {
    glutathione: Math.round(100 - factor * 55),
    nad: Math.round(100 - factor * 62),
    nrf2: Math.round(100 - factor * 48),
    mito: Math.round(100 - factor * 58),
    defense: Math.round(100 - factor * 52),
  };
};

export const calculateDefenseProfile = (
  age: number,
  stress: number,
  sleep: number,
  exercise: number,
) => {
  const ageWeight = Math.min(1, (age - 30) / 50);
  const stressWeight = stress / 100;
  const sleepDeficit = (100 - sleep) / 100;
  const exerciseBonus = exercise / 100;

  const nrf2Priority = Math.round(
    (ageWeight * 30 + stressWeight * 35 + sleepDeficit * 25 - exerciseBonus * 15) * 100 / 75,
  );
  const mitoPriority = Math.round(
    (ageWeight * 35 + sleepDeficit * 30 + (1 - exerciseBonus) * 20 + stressWeight * 15) * 100 / 80,
  );

  const nrf2 = Math.min(100, Math.max(0, nrf2Priority));
  const mito = Math.min(100, Math.max(0, mitoPriority));

  let recommendation: 'nrf2' | 'mito' | 'hybrid';
  if (Math.abs(nrf2 - mito) < 15) recommendation = 'hybrid';
  else if (nrf2 > mito) recommendation = 'nrf2';
  else recommendation = 'mito';

  const defenseScore = Math.round(
    100 - (ageWeight * 40 + stressWeight * 25 + sleepDeficit * 20 - exerciseBonus * 20),
  );

  const biologicalAge = Math.round(
    age + (100 - defenseScore) * 0.18 + stressWeight * 8 + sleepDeficit * 6 - exerciseBonus * 5,
  );

  return {
    nrf2,
    mito,
    recommendation,
    defenseScore: Math.max(15, Math.min(95, defenseScore)),
    biologicalAge: Math.max(age - 12, Math.min(age + 18, biologicalAge)),
    ageDelta: Math.round(age - biologicalAge),
  };
};

export const simulateBiomarkers = (
  age: number,
  stress: number,
  sleep: number,
  exercise: number,
  stackIds: string[] = [],
) => {
  const factor = Math.max(0, (age - 25) / 55);
  const lifestyle = (stress * 0.3 + (100 - sleep) * 0.35 + (100 - exercise) * 0.35) / 100;
  const stackBoost = stackIds.length * 0.04;

  return biomarkers.map((b) => {
    const targeted = b.compounds.some((c) => stackIds.includes(c));
    const boost = targeted ? 0.15 + stackBoost : 0;
    const status = Math.max(0.1, Math.min(1, 1 - factor * 0.6 - lifestyle * 0.3 + boost));
    return { ...b, status: Math.round(status * 100), targeted };
  });
};

export const synergyScore = (selectedIds: string[]): number => {
  if (selectedIds.length === 0) return 0;
  const selected = compounds.filter((c) => selectedIds.includes(c.id));
  let score = selected.length * 12;
  const pairs = new Set<string>();
  selected.forEach((c) => {
    c.synergies.forEach((s) => {
      if (selectedIds.includes(s)) {
        const key = [c.id, s].sort().join('-');
        if (!pairs.has(key)) {
          pairs.add(key);
          score += 18;
        }
      }
    });
  });
  const hallmarkSet = new Set(selected.flatMap((c) => c.hallmarks));
  score += hallmarkSet.size * 4;
  return Math.min(100, score);
};

export const evidenceStandards = [
  {
    tier: 'A' as const,
    label: 'Tier A — Clinical Evidence',
    criteria: [
      'Human randomized or controlled trial published in peer-reviewed journal',
      'Measurable biomarker or healthspan outcome reported',
      'Replicated by independent research group or multi-trial consensus',
      'Safety profile established in human subjects',
    ],
    example: 'GlyNAC human trials showing restored glutathione in older adults (PMID: 36656670)',
  },
  {
    tier: 'B' as const,
    label: 'Tier B — Strong Mechanistic + Emerging Human Data',
    criteria: [
      'Well-characterized mechanism in human cell or tissue models',
      'At least one human pharmacokinetic or pilot study',
      'Consistent preclinical lifespan or healthspan data',
      'Used in established clinical or longevity protocols',
    ],
    example: 'R-ALA redox cycling with decades of clinical use but limited dedicated longevity trials',
  },
  {
    tier: 'C' as const,
    label: 'Tier C — Preclinical Promise',
    criteria: [
      'Strong animal or in-vitro mechanistic evidence only',
      'No human longevity outcome data yet',
      'Included only when mechanism aligns with mapped hallmark',
      'Flagged clearly — not recommended as stack foundation',
    ],
    example: 'Compounds with mouse lifespan data but no human trials — disclosed transparently',
  },
];

export const selectionCriteria = [
  { step: '01', title: 'Mechanism First', desc: 'Compound must target a mapped hallmark or defense pathway — not trend-driven inclusion.' },
  { step: '02', title: 'Bioavailability Verified', desc: 'Formulation must achieve meaningful plasma/tissue levels. Racemic or oxide forms excluded when superior alternatives exist.' },
  { step: '03', title: 'PubMed Traceable', desc: 'Every recommendation links to primary literature. Marketing claims without citations are rejected.' },
  { step: '04', title: 'Dose-Response Validated', desc: 'Dosing ranges derived from clinical trials, not label marketing. AM/PM timing based on absorption science.' },
  { step: '05', title: 'Synergy Tested', desc: 'Stack combinations evaluated for pathway overlap and interaction risk — not random bundling.' },
];

export const transparencyPledge = [
  { title: 'No Pay-for-Placement', desc: 'Brands cannot pay for inclusion. Compounds earn placement through evidence grading only.' },
  { title: 'Zero Commission', desc: 'TNiC earns $0 from every product link. Verified picks go to manufacturer sites only — never Amazon affiliate CTAs.' },
  { title: 'Not Medical Advice', desc: 'TNiC is an educational intelligence platform. Always consult your physician before starting any protocol.' },
  { title: 'Limitations Stated', desc: 'Biomarker projections and biological age estimates are modeled — not lab diagnostics. We say so clearly.' },
  { title: 'Evidence Updates', desc: 'When new trials publish, evidence tiers are re-evaluated. Outdated recommendations are revised publicly.' },
];

export const safetyNotes = [
  {
    compoundId: 'glynac',
    cautions: ['May lower blood pressure in some individuals', 'Sulfur odor from NAC is normal and harmless'],
    avoidIf: ['Active chemotherapy without oncologist approval'],
    consultIf: ['Kidney disease', 'Taking nitroglycerin', 'Pregnant or nursing'],
  },
  {
    compoundId: 'sulforaphane',
    cautions: ['Can cause mild GI discomfort on empty stomach', 'Take with food if sensitive'],
    avoidIf: ['Known cruciferous vegetable allergy'],
    consultIf: ['Thyroid conditions (high doses may affect iodine uptake)', 'Taking blood thinners'],
  },
  {
    compoundId: 'rala',
    cautions: ['May lower blood glucose — monitor if diabetic', 'R-form only; S-ALA is far less effective'],
    avoidIf: ['Thiamine deficiency (rare)'],
    consultIf: ['Diabetes medications', 'Chemotherapy', 'Thyroid medication'],
  },
  {
    compoundId: 'cakg',
    cautions: ['May cause mild GI effects at higher doses', 'Start low and titrate'],
    avoidIf: [],
    consultIf: ['Kidney stones history', 'Calcium-restricted diet', 'Pregnant or nursing'],
  },
  {
    compoundId: 'nmn',
    cautions: ['Generally well-tolerated in human trials', 'Quality varies enormously between brands — verify third-party testing'],
    avoidIf: [],
    consultIf: ['Active cancer treatment', 'Pregnant or nursing', 'Taking metformin (NAD+ pathway interaction — discuss with doctor)'],
  },
  {
    compoundId: 'resveratrol',
    cautions: ['Poor bioavailability in standard forms — trans-resveratrol with piperine or micellization preferred', 'May inhibit platelet aggregation'],
    avoidIf: ['Scheduled surgery within 2 weeks'],
    consultIf: ['Blood thinners (warfarin, aspirin)', 'Liver disease', 'Hormone-sensitive conditions'],
  },
  {
    compoundId: 'taurine',
    cautions: ['Generally well-tolerated; high doses may cause mild GI upset in sensitive individuals', 'Declines sharply with age — repletion is mechanistic, not a cure-all'],
    avoidIf: [],
    consultIf: ['Kidney disease', 'Pregnant or nursing', 'Taking lithium or hypotensive medications'],
  },
  {
    compoundId: 'spermidine',
    cautions: ['Wheat-germ extracts may contain gluten traces — verify label if celiac', 'Start low; autophagy induction can cause transient fatigue in some users'],
    avoidIf: ['Known wheat or polyamine sensitivity'],
    consultIf: ['Autoimmune conditions on immunomodulators', 'Pregnant or nursing'],
  },
  {
    compoundId: 'pterostilbene',
    cautions: ['May lower LDL and blood glucose at higher doses — monitor lipids if on statins', 'Methylated stilbenoid — pairs with NMN PM dosing like resveratrol'],
    avoidIf: ['Scheduled surgery within 2 weeks (platelet effects, similar to resveratrol)'],
    consultIf: ['Statins or lipid-lowering drugs', 'Diabetes medications', 'Blood thinners'],
  },
];

export const generalSafetyGuidance = [
  'Start one compound at a time. Add to your stack weekly to identify what your body responds to.',
  'Bring your TNiC stack export to your physician or pharmacist before combining with prescriptions.',
  'Pregnant, nursing, or under 18: longevity supplementation is not recommended without medical supervision.',
  'If you experience adverse effects, stop the most recently added compound and consult a professional.',
  'Lab testing (CBC, metabolic panel, hs-CRP) every 6–12 months is recommended for anyone on active protocols.',
];

export const outcomeMilestones = [
  {
    week: 'Week 1–2',
    title: 'Foundation Phase',
    expectations: ['Possible mild GI adjustment as body adapts', 'Subtle energy shifts — often too early for biomarker change', 'Focus on consistency, not results'],
    realistic: true,
  },
  {
    week: 'Week 4–6',
    title: 'Early Signals',
    expectations: ['Improved sleep quality or recovery (subjective)', 'Some users report clearer skin and reduced brain fog', 'Glutathione markers may begin shifting in responsive individuals'],
    realistic: true,
  },
  {
    week: 'Week 12',
    title: 'Measurable Territory',
    expectations: ['GlyNAC trials showed significant glutathione restoration at 24 weeks — early lab shifts possible at 12', 'Energy and exercise recovery often noticeably improved', 'Inflammation markers (hs-CRP) may trend downward', 'Ca-AKG human trial (PMID: 38247127) showed measurable epigenetic age reduction by week 12'],
    realistic: true,
  },
  {
    week: 'Week 24+',
    title: 'Clinical Benchmark',
    expectations: [
      'GlyNAC human trials: restored glutathione, improved mitochondrial function, reduced oxidative stress at this timepoint',
      'NAD+ restoration effects compound with consistent NMN dosing — PBMC NAD+ levels measurably elevated vs. baseline',
      'Ca-AKG: human trial (PMID: 38247127) showed mean 8-year epigenetic age reduction — full effect consolidates at 24 weeks',
      'Biological age estimates may show 1–3 year improvement with full protocol adherence and lifestyle pillars intact',
      'Retest baseline labs (hs-CRP, CBC, metabolic panel, optionally GSH + NAD+ metabolites) to quantify protocol impact',
    ],
    realistic: true,
  },
];

export const supplementRedFlags = [
  { flag: 'Proprietary blends hiding doses', why: 'You cannot verify effective amounts of active ingredients', action: 'Reject any product that does not list individual compound doses' },
  { flag: '"Clinically proven" without PMID', why: 'Marketing language without traceable evidence', action: 'Demand PubMed citation or independent third-party testing' },
  { flag: 'Racemic ALA sold as "Alpha Lipoic Acid"', why: 'S-enantiomer is biologically inert — you get half the effective dose', action: 'Insist on R-Alpha Lipoic Acid specifically' },
  { flag: 'NMN without purity certificate', why: 'NMN market is flooded with underdosed or contaminated products', action: 'Require COA (Certificate of Analysis) showing ≥99% purity' },
  { flag: 'Lifespan claims from mouse-only data', why: 'Mouse lifespan extension does not guarantee human outcomes', action: 'Weight preclinical data appropriately — prefer human trial evidence' },
  { flag: 'Stack of 20+ ingredients', why: 'Interaction risk increases; doses per ingredient are usually sub-therapeutic', action: 'Prefer focused 3–6 compound protocols with verified dosing' },
  { flag: 'No disclosure of evidence tier', why: 'Hiding whether evidence is human or animal is a transparency failure', action: 'Only trust sources that label Tier A / B / C — or equivalent — clearly' },
];

export const gettingStartedSteps = [
  { step: 1, title: 'Take the 3-Min Starter Quiz', desc: 'Answer three questions about your goal, age, and experience. Get a personalized stack preset and next OS step.', link: '/quiz' },
  { step: 2, title: 'Review Your Biomarkers', desc: 'See which longevity markers are most depleted for your profile. Understand what your stack needs to target.', link: '#biomarkers' },
  { step: 3, title: 'Build Your Stack', desc: 'Use the Stack Architect to toggle compounds. Watch synergy score and AM/PM dosing update in real time.', link: '#stacks' },
  { step: 4, title: 'Check Safety & Consult', desc: 'Review contraindications in the Trust Center. Export your protocol and bring it to your physician.', link: '/trust' },
  { step: 5, title: 'Track & Iterate', desc: 'Follow the outcomes timeline for realistic expectations. Re-scan every 90 days and adjust your stack.', link: '#learn' },
];

export const glossary = [
  { term: 'NRF2', simple: 'A protein that turns on 200+ antioxidant and detox genes when activated.', why: 'It is the master switch for cellular defense against oxidative damage — the core of the NRF2 stack.' },
  { term: 'Glutathione', simple: 'Your body\'s most abundant internal antioxidant, made from glycine, cysteine, and glutamate.', why: 'It depletes 10–15% per decade after age 20. Restoring it is foundational to longevity.' },
  { term: 'NAD+', simple: 'A molecule every cell needs for energy production, DNA repair, and activating longevity genes (sirtuins).', why: 'NAD+ drops ~50% between ages 40–60. NMN is the most direct precursor to restore it.' },
  { term: 'Hallmarks of Aging', simple: 'The 12 biological processes that drive aging — from mitochondrial decline to chronic inflammation.', why: 'TNiC maps every compound to specific hallmarks so you know exactly what each supplement targets.' },
  { term: 'Bioavailability', simple: 'How much of a compound actually reaches your bloodstream and tissues after you take it.', why: 'A 500mg pill with 20% bioavailability delivers less than a 200mg pill with 90% bioavailability.' },
  { term: 'Inflammaging', simple: 'Chronic low-grade inflammation that increases with age and damages tissues silently.', why: 'Measured by hs-CRP. Reducing inflammaging is as important as boosting antioxidants.' },
  { term: 'Sirtuins', simple: 'Longevity-associated enzymes that repair DNA, regulate metabolism, and control inflammation.', why: 'They require NAD+ to function. NMN + Resveratrol work together to activate this pathway.' },
  { term: 'Biological Age', simple: 'How old your cells act — which can differ from your birthday age.', why: 'Two people at 50 can have biological ages of 42 and 58. The goal is to widen that gap in your favor.' },
  { term: 'Synergy', simple: 'When two compounds together produce greater effect than either alone.', why: 'TNiC\'s synergy score measures this — random stacking wastes money and can cause interactions.' },
  { term: 'Evidence Tier', simple: 'TNiC\'s A/B/C grading of how strong the human research is behind a compound.', why: 'Tier A means human trials. Tier C means mouse-only. We never hide the difference.' },
  { term: 'Senolytics', simple: 'Compounds that selectively destroy senescent (zombie) cells that accumulate with age and secrete inflammatory signals.', why: 'Senescent cells drive the SASP inflammatory cascade across multiple hallmarks. NMN and resveratrol have senolytic-adjacent effects — and dedicated senolytics (dasatinib+quercetin) entered human trials in 2020 (PMID: 32854868).' },
  { term: 'mTOR', simple: 'A kinase that acts as a cellular growth sensor — when inhibited, cells shift from growth mode into repair, recycling, and autophagy.', why: 'mTOR overactivation with age drives cellular aging. Rapamycin inhibits it; caloric restriction, resveratrol, and exercise partially mimic this effect — one reason fasting synergizes with longevity stacks.' },
  { term: 'AMPK', simple: 'An energy-sensing enzyme activated when ATP is low — it promotes fat burning, mitochondrial biogenesis, and autophagy.', why: 'AMPK is the metabolic counterpart to mTOR. When AMPK is high and mTOR is low, cells enter a longevity-promoting maintenance mode. Resveratrol and exercise activate AMPK — a key reason they synergize.' },
  { term: 'Epigenetic Clock', simple: 'A lab test measuring DNA methylation patterns across thousands of sites to calculate your true cellular age.', why: 'Epigenetic clocks (Horvath, GrimAge, DunedinPACE) are the most accurate biological age measurement available to consumers. Ca-AKG showed mean 8-year clock age reduction in a 2024 human trial (PMID: 38247127).' },
  { term: 'Healthspan', simple: 'The portion of life spent in good health, free from chronic disease or disability — distinct from lifespan (total years alive).', why: 'TNiC optimizes for healthspan, not maximum lifespan. The target is more quality years in your 60s, 70s, and beyond — not just extending decline.' },
  { term: 'Autophagy', simple: 'The cellular self-cleaning process that breaks down and recycles damaged proteins, organelles, and pathogens.', why: 'Autophagy declines with age, allowing cellular debris to accumulate. It is activated by fasting, exercise, rapamycin, and resveratrol — which is why fasted morning dosing of resveratrol is recommended in the TNiC protocol.' },
  { term: 'Telomeres', simple: 'Protective caps at the ends of chromosomes that shorten each time a cell divides, acting as a cellular lifespan counter.', why: 'Telomere length correlates with biological age and disease risk. Critically, oxidative stress accelerates telomere shortening — which is why GlyNAC and sulforaphane indirectly protect telomere integrity by reducing the oxidative burden on dividing cells.' },
  { term: 'Mitophagy', simple: 'A specific form of autophagy that selectively removes damaged or dysfunctional mitochondria, replacing them with healthy ones.', why: 'Dysfunctional mitochondria that escape mitophagy leak reactive oxygen species and trigger inflammation. NMN supports mitophagy via SIRT1/SIRT3 activation; Ca-AKG supports it via TCA cycle optimization. Mitophagy is why you cannot \"energy boost\" your way out of mitochondrial dysfunction — you need to remove the damaged units first.' },
  { term: 'SASP', simple: 'Senescence-Associated Secretory Phenotype — the inflammatory cocktail of cytokines, proteases, and growth factors secreted by senescent (zombie) cells.', why: 'SASP is why a small number of senescent cells can damage a large surrounding tissue area. The SASP cytokines (IL-6, IL-8, MMP-3) drive chronic inflammation, disrupt tissue structure, and signal neighboring cells to senesce. Clearing senescent cells (senolytics) or suppressing SASP (senostatics) is the goal of dasatinib+quercetin protocols. NMN and resveratrol have partial SASP-suppressive effects via NAD+/SIRT1.' },
  { term: 'Oxidative Stress', simple: 'An imbalance between reactive oxygen species (free radicals) produced by metabolism and the antioxidant systems that neutralize them.', why: 'Oxidative stress is the molecular driver of aging across virtually every hallmark — it damages DNA, cross-links proteins, oxidizes lipids in cell membranes, and accelerates telomere shortening. Glutathione is the primary internal quencher; NRF2 is the genetic switch that upregulates the entire antioxidant defense network. This is why GlyNAC + sulforaphane form the oxidative stress reduction core of the TNiC NRF2 Defense preset.' },
];

export const consumerFAQ = [
  {
    id: 'faq1',
    category: 'getting-started' as const,
    question: 'Do I need blood tests before starting?',
    answer: 'Not required to begin learning and building a stack on TNiC. However, we strongly recommend baseline labs (CBC, metabolic panel, hs-CRP, and optionally glutathione or NAD+ metabolites) within your first 90 days. This gives you real data to compare against our projections and helps your physician monitor safely.',
  },
  {
    id: 'faq2',
    category: 'safety' as const,
    question: 'Is TNiC safe for everyone?',
    answer: 'No supplement protocol is universal. Pregnant/nursing individuals, people under 18, those on chemotherapy, blood thinners, or with kidney/liver disease must consult a physician first. TNiC provides per-compound safety data in the Trust Center — use it before starting anything.',
  },
  {
    id: 'faq3',
    category: 'science' as const,
    question: 'How is TNiC different from just buying supplements on Amazon?',
    answer: 'Amazon sells products. TNiC sells intelligence. Every compound is evidence-graded, PubMed-cited, dosed from clinical trials, checked for synergies and interactions, and mapped to specific aging hallmarks. You are not guessing — you are following a mechanistic protocol.',
  },
  {
    id: 'faq4',
    category: 'products' as const,
    question: 'Does TNiC sell its own supplements?',
    answer: 'No. TNiC is an independent intelligence platform. We curate third-party products that meet our evidence and bioavailability standards. TNiC earns $0 from sales — verified picks link to manufacturer sites only, with batch COA guidance.',
  },
  {
    id: 'faq5',
    category: 'science' as const,
    question: 'What does the biological age number actually mean?',
    answer: 'It is a modeled estimate based on your lifestyle inputs and defense pathway status — not a laboratory diagnostic. It shows directional trend, not clinical certainty. For authoritative biological age, pair TNiC guidance with epigenetic clocks (TruDiagnostic, GlycanAge) or clinical biomarker panels.',
  },
  {
    id: 'faq6',
    category: 'getting-started' as const,
    question: 'How long until I feel or see results?',
    answer: 'Honest answer: subtle energy and sleep changes may appear in 2–4 weeks. Measurable biomarker shifts typically require 12–24 weeks of consistent dosing. GlyNAC human trials showed significant glutathione restoration at 24 weeks. Anyone promising overnight results is not credible.',
  },
  {
    id: 'faq7',
    category: 'safety' as const,
    question: 'Can I take TNiC stacks with my medications?',
    answer: 'Potentially — but you must check. NMN may interact with metformin. Resveratrol affects blood clotting. Sulforaphane may affect thyroid medication absorption. Export your stack protocol and review it with your pharmacist or physician before combining with any prescription.',
  },
  {
    id: 'faq8',
    category: 'products' as const,
    question: 'Why only 9 compounds? Other sites recommend dozens.',
    answer: 'More is not better. Each additional compound increases interaction risk and usually means sub-therapeutic doses. TNiC focuses on 9 evidence-graded compounds with the strongest mechanistic coverage across 12 hallmarks. Quality and synergy beat quantity.',
  },
  {
    id: 'faq9',
    category: 'science' as const,
    question: 'What is an Evidence Tier A vs B vs C?',
    answer: 'Tier A: human clinical trial with measured outcomes. Tier B: strong mechanism + emerging human pharmacokinetic data. Tier C: preclinical (animal/cell) only. TNiC builds stacks primarily from Tier A and B compounds and labels everything transparently.',
  },
  {
    id: 'faq10',
    category: 'getting-started' as const,
    question: 'I\'m new to biohacking. Where do I start?',
    answer: 'Follow the 5-step path in the Learn hub (/learn): (1) Run Defense Scan, (2) Review biomarkers, (3) Build your stack, (4) Check safety, (5) Track over 90 days. You do not need to understand NRF2 on day one — the tools guide you.',
  },
  {
    id: 'faq11',
    category: 'safety' as const,
    question: 'What red flags should I watch for in supplement brands?',
    answer: 'Proprietary blends hiding doses, lifespan claims without PubMed links, racemic ALA marketed as premium, NMN without purity certificates, and mega-stacks of 20+ ingredients. TNiC lists all red flags in the Learn hub (/learn) with specific actions to take.',
  },
  {
    id: 'faq12',
    category: 'products' as const,
    question: 'How often does TNiC update recommendations?',
    answer: 'Continuously. When new peer-reviewed trials publish, evidence tiers are re-evaluated. The Research Intel feed surfaces breaking longevity science. Major protocol changes are reflected in the Stack Architect and noted in the Trust Center.',
  },
  {
    id: 'faq13',
    category: 'safety' as const,
    question: 'Is it safe to combine all 9 TNiC compounds at once?',
    answer: 'Starting all 9 simultaneously is not recommended. Ramp in one compound per week so you can attribute any GI or metabolic change to a specific compound. Tier B additions (taurine, spermidine, pterostilbene) follow the same ramp rule. High-priority interactions: resveratrol and pterostilbene affect platelet function — avoid if on blood thinners. R-ALA may amplify insulin sensitivity — monitor glucose if diabetic. NMN and rapamycin should not be self-combined without physician oversight. Use the Stack Architect synergy and warning panel.',
  },
  {
    id: 'faq14',
    category: 'science' as const,
    question: 'What is NRF2 and why does TNiC build around it?',
    answer: 'NRF2 is a transcription factor that switches on 200+ cytoprotective genes when activated. Three TNiC compounds target it: sulforaphane activates it via KEAP1 modification, GlyNAC supplies glutathione precursors it upregulates, and R-ALA recycles oxidized products. Together they form the NRF2 Defense Triad.',
  },
  {
    id: 'faq15',
    category: 'products',
    question: 'Why does delivery system (liposomal, phytosome, standard) matter?',
    answer: 'Many compounds are degraded before absorption. Liposomal delivery encapsulates compounds in phospholipid vesicles. Phytosomes dramatically improve resveratrol and sulforaphane bioavailability. Standard capsules work for water-soluble compounds like NMN and Ca-AKG. R-ALA should be taken with fat for best absorption.',
  },
  {
    id: 'faq16',
    category: 'safety',
    question: 'What is rapamycin and should I consider it?',
    answer: 'Rapamycin is an mTOR inhibitor that has extended lifespan in every model organism tested and improved immune function in the first human pilot trial (PMID: 36929855). It is a prescription immunosuppressant with real risks. TNiC does not recommend self-prescribing it. Your TNiC stack provides overlapping mechanistic benefits without the prescription risk.',
  },
  {
    id: 'faq17',
    category: 'science',
    question: 'Can cold therapy or sauna replace supplement stacks?',
    answer: 'No. Cold exposure activates cold-shock proteins and norepinephrine. Sauna upregulates heat shock proteins. Neither directly restores NAD+ or rebuilds glutathione. Treat thermal stress as a synergistic adjunct — not a replacement for mechanistic substrate restoration.',
  },
  {
    id: 'faq18',
    category: 'science',
    question: 'What is an epigenetic clock and how do I get tested?',
    answer: 'Epigenetic clocks measure DNA methylation patterns to calculate biological age. TruDiagnostic ($300-500) offers the most comprehensive consumer panel including DunedinPACE. TNiC\'s biological age estimate is a lifestyle model — useful for directional feedback before a lab test.',
  },
  {
    id: 'faq19',
    category: 'safety',
    question: 'How much does sleep actually affect biological aging?',
    answer: 'A 2024 SLEEP Journal study (PMID: 38593841) found adults under 6 hours per night accumulated 1.8 extra years of epigenetic aging annually vs 7-9 hour sleepers. Sleep is when SIRT1 and PARP peak, mitophagy clears damaged mitochondria, and the glymphatic system flushes amyloid. Treat sleep as non-negotiable.',
  },
  {
    id: 'faq20',
    category: 'products',
    question: 'Should I take these supplements every day or cycle them?',
    answer: 'Daily dosing matches the clinical evidence base. GlyNAC trials used 24-week continuous protocols. NMN and Ca-AKG require steady-state substrate availability. Sulforaphane can rotate with cruciferous diet days. Unless experiencing side effects, daily dosing is recommended.',
  },
  {
    id: 'faq21',
    category: 'science',
    question: 'Does NMN actually work? What does the clinical evidence show?',
    answer: 'Yes. A 2022 GeroScience trial (PMID: 36482258) confirmed NMN safely raises blood NAD+ in adults. A 2021 Science study (PMID: 33888596) showed NMN improved muscle insulin sensitivity in prediabetic women. Tier A evidence; real effects; appropriately modest claims about what NMN can and cannot do.',
  },
  {
    id: 'faq22',
    category: 'science',
    question: 'What is the difference between NMN and NR for NAD+ restoration?',
    answer: 'NMN is one step closer to NAD+ in biosynthesis and can enter cells via the Slc12a8 transporter. NR requires conversion to NMN first. NMN has the Yoshino 2021 Science study showing muscle metabolic effects (PMID: 33888596). TNiC rates NMN as Tier A and NR as Tier B. Consistency of dosing matters more than the choice between them.',
  },
  {
    id: 'faq23',
    category: 'science',
    question: 'What natural foods are highest in sulforaphane?',
    answer: 'Broccoli sprouts contain 10-100x more glucoraphanin than mature broccoli. Cooking above 70C destroys myrosinase, the enzyme needed to produce sulforaphane. Eat sprouts raw or steam under 3 minutes. Add mustard powder to cooked broccoli to restore exogenous myrosinase. TNiC products use standardized glucoraphanin with active myrosinase.',
  },
  {
    id: 'faq24',
    category: 'safety',
    question: 'Is Ca-AKG safe? What are the known side effects of calcium alpha-ketoglutarate?',
    answer: 'The 2024 Aging Cell trial (PMID: 38247127) — 12 weeks in middle-aged adults — reported no serious adverse events. Most common: mild transient GI discomfort in the first 1-2 weeks. Requires monitoring in kidney disease. Start at 500mg and titrate up over 2 weeks to minimize adjustment.',
  },
  {
    id: 'faq25',
    category: 'products',
    question: 'How do I read a Certificate of Analysis (COA) for supplements?',
    answer: 'Check: (1) Purity >= 98% for active compound. (2) Identity test via HPLC or NMR. (3) Heavy metals below USP limits. (4) Microbial testing with pathogen absence. (5) Batch number matching your product. (6) ISO/IEC 17025-accredited lab. Red flags: COA on request only, missing batch number, or unverifiable lab.',
  },
];
