import { compounds, hallmarks } from '@/lib/data';
import { citationRegistry } from '@/lib/trust';
import type { Compound } from '@/lib/types';

/**
 * Single source of truth for every number shown on the landing page.
 *
 * All values are derived from the real data layer at build time — never
 * hardcoded — so the homepage can never advertise a count the catalog
 * doesn't actually back. Add a compound to `lib/data.ts` and the hero,
 * feature cards, and hallmark tiles all update themselves.
 */

/** Maps a hallmark id (as tagged on compounds) to its published page slug. */
const HALLMARK_SLUGS: Record<string, string> = {
  genomic: 'genomic-instability',
  telomeres: 'telomere-attrition',
  epigenetic: 'epigenetic-alterations',
  proteostasis: 'loss-of-proteostasis',
  autophagy: 'disabled-autophagy',
  mito: 'mitochondrial-dysfunction',
  senescence: 'cellular-senescence',
  stem: 'stem-cell-exhaustion',
  communication: 'altered-intercellular-communication',
  inflammation: 'chronic-inflammation',
  dysbiosis: 'dysbiosis',
  nutrient: 'disabled-macroautophagy',
};

function compoundsForHallmark(id: string): number {
  return compounds.filter((c) => c.hallmarks?.includes(id)).length;
}

export interface HallmarkTile {
  id: string;
  title: string;
  slug: string;
  href: string;
  count: number;
}

export const hallmarkTiles: HallmarkTile[] = hallmarks.map((h) => {
  const slug = HALLMARK_SLUGS[h.id] ?? h.id;
  return {
    id: h.id,
    title: h.title,
    slug,
    href: `/hallmarks/${slug}`,
    count: compoundsForHallmark(h.id),
  };
});

export interface FeaturedCompound {
  id: string;
  name: string;
  pathway: string;
  dose: string;
  pmid: string;
}

/**
 * A handful of real Tier-A compounds for the homepage "featured" strip —
 * first four Tier-A entries in catalog order, each with its lead PMID.
 * Pulled straight from `compounds`, so it can never drift from the library.
 */
export const featuredCompounds: FeaturedCompound[] = compounds
  .filter((c: Compound) => c.evidence === 'A')
  .slice(0, 4)
  .map((c) => ({
    id: c.id,
    name: c.name,
    pathway: c.pathway,
    dose: c.dose,
    pmid: c.studies[0]?.pmid ?? '',
  }));

export const homeStats = {
  /** Total compounds in the evidence-graded catalog. */
  compoundCount: compounds.length,
  /** Compounds backed by Tier-A (multiple human RCT) evidence. */
  tierACount: compounds.filter((c) => c.evidence === 'A').length,
  /** Hallmarks of aging with a published mechanism page. */
  hallmarkCount: hallmarks.length,
  /** Traceable PMID citations across the registry. */
  citationCount: citationRegistry.length,
} as const;
