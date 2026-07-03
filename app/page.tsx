import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HallmarkProblemTiles } from '@/components/sections/HallmarkProblemTiles';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.home();

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <HallmarkProblemTiles />
        <HomepageCTA />
      </main>
      <Footer />
    </div>
  );
}
