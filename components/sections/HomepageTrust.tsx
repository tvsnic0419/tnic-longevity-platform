'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, FileCheck, Scale } from 'lucide-react';
import { platformStats, trustPillars } from '@/lib/homepage';

const pillarIcons = [Shield, Eye, FileCheck, Scale];

export function HomepageTrust() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-accent-emerald/[0.03] to-transparent border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="stat-card-v3 rounded-2xl p-5 text-center"
            >
              <p className="stat-value-emerald">{stat.value}</p>
              <p className="text-label mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="section-eyebrow section-eyebrow-emerald">
              <span className="dot-pulse dot-pulse-emerald" aria-hidden="true" />
              Why Trust TNiC
            </span>
          </div>
          <h2 className="heading-section-glow">
            Graded by evidence. Built for trust.
          </h2>
          <p className="text-body-sm mt-3 max-w-2xl mx-auto">
            We name the trial, the PMID, the year, and the effect size. We label every projection as modeled — not lab-measured. No black-box recommendations, no hidden affiliate pressure on evidence grading.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            return (
              <motion.a
                key={pillar.title}
                href={pillar.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-crystalline card-crystalline-hover glow-hover-emerald p-5 group block"
              >
                <div className="icon-badge-emerald-glow w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-accent-emerald" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-sm mb-2 group-hover:text-accent-emerald transition-colors">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.a>
            );
          })}
        </div>

        <p className="text-center text-caption mt-10 font-mono">
          TNiC is an educational platform — not a medical provider. Projections ≠ lab diagnostics. Consult your physician before any protocol.
        </p>
      </div>
    </section>
  );
}
