import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { HallmarkIcon } from '@/components/library/HallmarkIcon';

export function HallmarkProblemTiles() {
  return (
    <section id="hallmark-targets" className="py-20 md:py-28 border-t border-border">
      <div className="container-page max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Twelve hallmarks of aging
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore the biological processes that drive aging. Each hallmark has interventions backed by human clinical evidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hallmarkLibrary.map((h) => (
            <Link
              key={h.id}
              href={`/library/${h.slug}`}
              className="group border border-border rounded-lg p-5 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <HallmarkIcon type={h.visual} size={24} />
                <span className="text-xs font-mono text-muted-foreground">#{String(h.number).padStart(2, '0')}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-accent-cyan transition-colors">
                {h.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {h.tagline}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-accent-cyan font-mono">{h.coverage}% coverage</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-accent-cyan transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore full library
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/stacks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-cyan text-black font-semibold hover:bg-accent-cyan/90 transition-colors"
          >
            Build a stack
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
