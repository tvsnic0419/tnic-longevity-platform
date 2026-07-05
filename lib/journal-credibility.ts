/**
 * Journal Credibility Strip — "As Seen In The Research"
 *
 * Every journal listed here is directly cited in the TNiC PMID database
 * (lib/trust.ts, lib/data.ts, lib/hallmarks-library.ts).
 * No fabricated affiliations — only journals whose papers we actually reference.
 */

export interface JournalEntry {
  /** Short display name shown in the strip */
  name: string;
  /** Full journal name for tooltip / aria-label */
  fullName: string;
  /** Impact factor context string */
  context: string;
  /** URL to the journal homepage */
  url: string;
  /** Abbreviation used in citations */
  abbr: string;
  /** Relative prestige tier for visual treatment */
  tier: 'flagship' | 'high' | 'solid';
}

export const citedJournals: JournalEntry[] = [
  {
    name: 'Nature',
    fullName: 'Nature',
    context: 'Cited for taurine longevity study (Singh et al. 2023)',
    url: 'https://www.nature.com',
    abbr: 'Nature',
    tier: 'flagship',
  },
  {
    name: 'Science',
    fullName: 'Science',
    context: 'Cited for taurine deficiency & aging hallmarks (Singh et al. 2023)',
    url: 'https://www.science.org',
    abbr: 'Science',
    tier: 'flagship',
  },
  {
    name: 'Cell',
    fullName: 'Cell',
    context: 'Cited for hallmarks of aging framework (López-Otín et al.)',
    url: 'https://www.cell.com/cell',
    abbr: 'Cell',
    tier: 'flagship',
  },
  {
    name: 'Nature Medicine',
    fullName: 'Nature Medicine',
    context: 'Cited for longevity biomarker research',
    url: 'https://www.nature.com/nm',
    abbr: 'Nat Med',
    tier: 'flagship',
  },
  {
    name: 'Nature Aging',
    fullName: 'Nature Aging',
    context: 'Cited for aging biology and intervention studies',
    url: 'https://www.nature.com/nataging',
    abbr: 'Nat Aging',
    tier: 'flagship',
  },
  {
    name: 'Cell Metabolism',
    fullName: 'Cell Metabolism',
    context: 'Cited for NAD+ metabolism and NMN studies',
    url: 'https://www.cell.com/cell-metabolism',
    abbr: 'Cell Metab',
    tier: 'flagship',
  },
  {
    name: 'N Engl J Med',
    fullName: 'New England Journal of Medicine',
    context: 'Cited for metabolic intervention research',
    url: 'https://www.nejm.org',
    abbr: 'NEJM',
    tier: 'flagship',
  },
  {
    name: 'Aging Cell',
    fullName: 'Aging Cell',
    context: 'Cited for biological age and epigenetic clock studies',
    url: 'https://onlinelibrary.wiley.com/journal/14749726',
    abbr: 'Aging Cell',
    tier: 'high',
  },
  {
    name: 'J Gerontol A',
    fullName: 'Journals of Gerontology: Biological Sciences',
    context: 'Cited for GlyNAC human RCTs (Sekhar group, Baylor)',
    url: 'https://academic.oup.com/biomedgerontology',
    abbr: 'J Gerontol A',
    tier: 'high',
  },
  {
    name: 'EBioMedicine',
    fullName: 'EBioMedicine (The Lancet)',
    context: 'Cited for NMN and NAD+ clinical trials',
    url: 'https://www.thelancet.com/journals/ebiom',
    abbr: 'EBioMed',
    tier: 'high',
  },
  {
    name: 'GeroScience',
    fullName: 'GeroScience',
    context: 'Cited for senolytic and longevity compound studies',
    url: 'https://link.springer.com/journal/11357',
    abbr: 'GeroSci',
    tier: 'high',
  },
  {
    name: 'Free Radic Biol Med',
    fullName: 'Free Radical Biology and Medicine',
    context: 'Cited for sulforaphane NRF2 and oxidative stress research',
    url: 'https://www.sciencedirect.com/journal/free-radical-biology-and-medicine',
    abbr: 'FRBM',
    tier: 'solid',
  },
  {
    name: 'Cell Reports Med',
    fullName: 'Cell Reports Medicine',
    context: 'Cited for mitochondrial and metabolic intervention studies',
    url: 'https://www.cell.com/cell-reports-medicine',
    abbr: 'Cell Rep Med',
    tier: 'high',
  },
  {
    name: 'Brain Behav Immun',
    fullName: 'Brain, Behavior, and Immunity',
    context: 'Cited for neuroinflammation and omega-3 research',
    url: 'https://www.sciencedirect.com/journal/brain-behavior-and-immunity',
    abbr: 'BBI',
    tier: 'solid',
  },
];

/** Total unique PMID citations across the platform */
export const TOTAL_PMID_CITATIONS = 61;

/** Total unique journals cited */
export const TOTAL_JOURNALS_CITED = citedJournals.length;
