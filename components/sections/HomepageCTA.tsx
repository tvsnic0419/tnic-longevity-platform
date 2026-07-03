import Link from 'next/link';
import { ArrowRight, BookOpen, LayoutDashboard, ShoppingBag } from 'lucide-react';

const paths = [
  {
    icon: BookOpen,
    title: 'Library',
    desc: 'Explore hallmarks, compounds, and evidence-backed interventions.',
    href: '/library',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    desc: 'Build your stack, track labs, and monitor your protocols.',
    href: '/dashboard',
  },
  {
    icon: ShoppingBag,
    title: 'Shop',
    desc: 'Verified supplement sourcing and quality assurance.',
    href: '/shop',
  },
];

export function HomepageCTA() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container-page max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            All the tools to understand, track, and optimize your longevity protocol.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {paths.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="group border border-border rounded-lg p-6 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all"
            >
              <path.icon className="w-6 h-6 mb-3 text-accent-cyan" aria-hidden="true" />
              <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-cyan transition-colors">
                {path.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {path.desc}
              </p>
              <div className="inline-flex items-center gap-2 text-accent-cyan text-sm font-semibold group-hover:gap-3 transition-all">
                Get started
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="border border-border rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto bg-muted/20">
          <h3 className="text-3xl font-black mb-3">
            Free. Local. Yours.
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            No accounts required. All your health data stays in your browser.
          </p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-cyan text-black font-semibold hover:bg-accent-cyan/90 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}