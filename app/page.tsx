import dynamic from 'next/dynamic';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { ToolsDock } from '@/components/ToolsDock';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomepagePersonalizedRail } from '@/components/sections/HomepagePersonalizedRail';
import { HomepageTrustStrip } from '@/components/sections/HomepageTrustStrip';
import { HomepageOSFunnel } from '@/components/sections/HomepageOSFunnel';
import { SiteGuide } from '@/components/SiteGuide';
import { HallmarkProblemTiles } from '@/components/sections/HallmarkProblemTiles';
import { TrustBanner } from '@/components/TrustBanner';
import { seoRoutes } from '@/lib/seo-routes';

// Lower-fold sections — lazy loaded so they don't inflate the initial bundle
const LibraryHighlights = dynamic(() =>
  import('@/components/sections/LibraryHighlights').then((m) => ({ default: m.LibraryHighlights }))
);
const HomepageCompareRow = dynamic(() =>
  import('@/components/sections/HomepageCompareRow').then((m) => ({ default: m.HomepageCompareRow }))
);
const ResearchIntel = dynamic(() =>
  import('@/components/sections/ResearchIntel').then((m) => ({ default: m.ResearchIntel }))
);
const HomepageBriefRail = dynamic(() =>
  import('@/components/sections/HomepageBriefRail').then((m) => ({ default: m.HomepageBriefRail }))
);
const CompetitiveEdge = dynamic(() =>
  import('@/components/sections/CompetitiveEdge').then((m) => ({ default: m.CompetitiveEdge }))
);
const HomepageProductRail = dynamic(() =>
  import('@/components/sections/HomepageProductRail').then((m) => ({ default: m.HomepageProductRail }))
);
const HomepageTrust = dynamic(() =>
  import('@/components/sections/HomepageTrust').then((m) => ({ default: m.HomepageTrust }))
);
const HomepageCTA = dynamic(() =>
  import('@/components/sections/HomepageCTA').then((m) => ({ default: m.HomepageCTA }))
);
const NextUpSection = dynamic(() =>
  import('@/components/sections/NextUpSection').then((m) => ({ default: m.NextUpSection }))
);

export const metadata = seoRoutes.home();

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {/* Above-fold — statically imported for fastest LCP */}
        <HeroSection />
        <HomepagePersonalizedRail />
        <HomepageTrustStrip />
        <HomepageOSFunnel />
        <SiteGuide />
        <HallmarkProblemTiles />
        <TrustBanner />
        {/* Below-fold — dynamically imported to reduce initial bundle */}
        <LibraryHighlights />
        <HomepageCompareRow />
        <ResearchIntel />
        <HomepageBriefRail />
        <CompetitiveEdge />
        <HomepageProductRail />
        <HomepageTrust />
        <HomepageCTA />
        <NextUpSection />
      </main>
      <ToolsDock />
      <Footer />
    </div>
  );
}
