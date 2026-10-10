'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import { getFeaturedCases } from './featuredCaseData';

export function FeaturedProjectsSection() {
  const { t, locale } = useLanguage();

  const PROJECTS = getFeaturedCases(locale);

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
          className="hidden font-mono text-[12px] uppercase tracking-[0.14em] text-warm-fg-muted hover:text-accent-text sm:inline-flex"
        >
          {t.cta.viewAll} →
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-sp-5 lg:grid-cols-12">
        {PROJECTS.map((p, i) => {
          const featured = i === 0;
          return (
            <li key={p.title} className={featured ? 'lg:col-span-12' : 'lg:col-span-4'}>
              <Link
                href={p.href}
                data-featured={featured ? 'true' : 'false'}
                className="slab group relative flex h-full flex-col gap-sp-4 p-sp-6 transition-transform duration-200 hover:-translate-y-0.5"
              >
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
                {p.proof ? (
                  <span
                    data-testid="case-proof"
                    className="self-start rounded-sp-sm border border-warm-border bg-warm-bg px-2 py-0.5 font-mono text-[11px] text-warm-fg-muted"
                  >
                    {p.proof}
                  </span>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-warm-fg">
                  {t.chapters.seeCase}
                  <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
