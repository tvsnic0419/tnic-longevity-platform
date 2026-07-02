import Link from 'next/link';
import {
  Dna,
  Shield,
  BookOpen,
  Layers,
  FlaskConical,
  Library,
  LayoutDashboard,
  HelpCircle,
  GraduationCap,
  Rocket,
} from 'lucide-react';
import { POPULAR_GUIDE_LINKS } from '@/lib/index-priority';
import { citationRegistry } from '@/lib/trust';

const hubLinks = [
  { href: '/dashboard', label: 'My Longevity OS', icon: LayoutDashboard },
  { href: '/quiz', label: '3-Min Quiz', icon: HelpCircle },
  { href: '/library', label: 'Anti-Aging Library', icon: Library },
  { href: '/learn', label: 'Learn Hub', icon: GraduationCap },
  { href: '/stacks', label: 'Stacks & Protocols', icon: Layers },
  { href: '/labs', label: 'Lab Analysis Hub', icon: FlaskConical },
];

const resourceLinks = [
  { href: '/shop', label: 'Protocol Shop', icon: BookOpen },
  { href: '/brief', label: 'Protocol Brief', icon: BookOpen },
  { href: '/labs#lab-partner-oauth', label: 'Lab Partner OAuth', icon: FlaskConical },
  { href: '/contact', label: 'Contact', icon: HelpCircle },
  { href: '/library/compare', label: 'Comparisons', icon: BookOpen },
  { href: '/#hallmark-targets', label: 'Hallmark Targets', icon: Dna },
  { href: '/#next-up', label: "What's Next", icon: Rocket },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/trust', label: 'Trust & Transparency', icon: Shield },
  { href: '/trust/methodology', label: 'Methodology', icon: BookOpen },
  { href: '/trust/disclaimers', label: 'Disclaimers', icon: BookOpen },
  { href: '/trust/updates', label: 'Update History', icon: BookOpen },
  { href: '/site-map', label: 'Site Map', icon: BookOpen },
];

export function Footer() {
  return (
    <footer className="relative py-14 md:py-20 footer-aurora border-t border-border/50" role="contentinfo">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      <div className="container-page">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="focus-ring inline-flex items-center gap-2.5 mb-4 rounded-lg group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-emerald flex items-center justify-center logo-glow group-hover:scale-105 transition-transform">
                <Dna className="w-4 h-4 text-black" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg">
                TN<span className="shimmer-text">i</span>C
              </span>
            </Link>
            <p className="text-body-sm max-w-xs">
              Independent longevity intelligence. Evidence-graded compounds,
              transparent methodology, and consumer safety at the center of every recommendation.
            </p>
          </div>

          <div>
            <p className="text-label mb-4">Hubs</p>
            <ul className="space-y-3">
              {hubLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring interactive flex items-center gap-2 text-body-sm hover:text-accent-cyan rounded-md"
                  >
                    <link.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-4">Popular Guides</p>
            <ul className="space-y-3">
              {POPULAR_GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring interactive text-body-sm hover:text-accent-cyan rounded-md"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-4">Resources</p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-ring interactive flex items-center gap-2 text-body-sm hover:text-accent-cyan rounded-md"
                  >
                    <link.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-4">Important Notice</p>
            <p className="text-body-sm mb-3">
              TNiC is educational — not a medical provider. Biological age
              and biomarker projections are modeled estimates, not lab diagnostics.
            </p>
            <p className="text-caption">
              Consult a physician before starting any protocol.{' '}
              <a href="/trust/disclaimers" className="text-accent-cyan hover:underline focus-ring rounded">
                Transparency Pledge
              </a>
            </p>
          </div>
        </div>

        <div className="relative pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-emerald/30 to-transparent" />
          <p className="text-caption font-mono">© 2026 TNiC · Independent · Evidence-First</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="tier-badge-a">Tier A · 4 compounds</span>
            <span className="tier-badge-b">Tier B · 2 compounds</span>
            <span className="text-caption font-mono">{citationRegistry.length} indexed PMIDs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}