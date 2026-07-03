import Link from 'next/link';
import { ArrowRight, ClipboardList, LayoutDashboard } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { getHeroPersonalization } from '@/lib/homepage-personalization';

export function HeroSection() {
  const { quizResult } = usePlatform();
  const hero = getHeroPersonalization(quizResult);

  return (
    <section
      id="hero"
      className="min-h-[80vh] md:min-h-[85vh] flex items-center pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="container-page w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            {hero.line1}
            <br />
            <span className="text-accent-cyan">{hero.line2}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero.subcopy}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href={hero.primary.href}
              className="inline-flex items-center gap-2 bg-accent-cyan text-black px-6 py-3 rounded-lg font-semibold hover:bg-accent-cyan/90 transition-colors"
            >
              <ClipboardList className="w-5 h-5" aria-hidden="true" />
              {hero.primary.label}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
              {hero.secondary.label}
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Educational only · Not medical advice · Data stays local
          </p>
        </div>
      </div>
    </section>
  );
}