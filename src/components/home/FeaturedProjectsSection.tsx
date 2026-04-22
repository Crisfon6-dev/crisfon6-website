'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';

type Project = {
  title: string;
  description: string;
  result: string;
  tag: string;
  href: string;
};

const PROJECTS: readonly Project[] = [
  {
    title: 'AI Automation Templates',
    description:
      'Open-source AI automation blueprints — architecture diagrams, cost breakdowns, and working code. New drop weekly.',
    result: 'New template weekly',
    tag: 'AI · OPEN SOURCE',
    href: '/automations',
  },
  {
    title: 'FinTech Credit Marketplace',
    description:
      'Digital credit marketplace in a major telecom Super App. Zero-paperwork loans across LATAM.',
    result: 'Millions of users served',
    tag: 'FINTECH',
    href: '/projects',
  },
  {
    title: 'Enterprise Banking Platform',
    description:
      'End-to-end banking modules for a major institution. Regulatory compliance baked in.',
    result: '3+ years in production',
    tag: 'BANKING',
    href: '/projects',
  },
];

export function FeaturedProjectsSection() {
  const { t } = useLanguage();

  return (
    <section
      data-testid="featured-projects"
      className="mx-auto max-w-6xl px-sp-5 py-sp-8"
      aria-labelledby="featured-projects-title"
    >
      <div className="mb-sp-6 flex items-end justify-between gap-sp-5">
        <div>
          <Kicker>{t.featuredProjects}</Kicker>
          <h2
            id="featured-projects-title"
            className="mt-sp-3 font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              fontWeight: 600,
            }}
          >
            {t.projects.heading}
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden font-mono text-[12px] uppercase tracking-[0.14em] text-warm-fg-muted hover:text-accent sm:inline-flex"
        >
          {t.cta.viewAll} →
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-sp-5 lg:grid-cols-12">
        {PROJECTS.map((p, i) => {
          const featured = i === 0;
          return (
            <li key={p.title} className={featured ? 'lg:col-span-12' : 'lg:col-span-6'}>
              <Link
                href={p.href}
                data-featured={featured ? 'true' : 'false'}
                className="group relative flex h-full flex-col gap-sp-4 overflow-hidden rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-6 transition-all hover:-translate-y-0.5 hover:border-warm-border-strong hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgb(from var(--c-accent) r g b / 0.18) 0%, transparent 60%)',
                  }}
                />
                <Chip variant="outline">{p.tag}</Chip>
                <h3
                  className="font-heading text-warm-fg"
                  style={{
                    fontSize: featured ? 'clamp(24px, 3vw, 36px)' : 'clamp(20px, 2.2vw, 26px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-warm-fg-muted">{p.description}</p>
                <div className="mt-auto flex items-center justify-between gap-sp-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {p.result}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block text-xl text-warm-fg-faint transition-transform duration-300 group-hover:-rotate-45 group-hover:text-accent"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
