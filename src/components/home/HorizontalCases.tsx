'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import { pinnedProgress } from '@/lib/scrollMath';
import { CASES_TRAVEL_VH } from './casesLayout';
import { getFeaturedCases } from './featuredCaseData';

/** Desktop only: the featured case studies scroll sideways while the section is pinned. */
export function HorizontalCases() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setProgress(pinnedProgress(rect.top, rect.height, window.innerHeight));
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  const cases = getFeaturedCases(locale);

  return (
    <section
      ref={ref}
      data-testid="horizontal-cases"
      aria-labelledby="horizontal-cases-title"
      style={{ height: `${(1 + CASES_TRAVEL_VH) * 100}vh` }}
    >
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] items-center overflow-hidden">
        <div
          data-testid="cases-track"
          style={
            {
              '--cases-progress': progress,
              transform: 'translateX(min(0px, calc(var(--cases-progress) * (100vw - 100%))))',
            } as CSSProperties
          }
          className="flex w-max items-stretch gap-sp-5 px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] will-change-transform"
        >
          <div
            data-testid="cases-intro"
            className="flex w-[min(420px,36vw)] shrink-0 flex-col justify-center pr-sp-5"
            style={{ opacity: Math.min(1, Math.max(0, 1 - progress * 12)) }}
          >
            <Kicker>{t.featuredProjects}</Kicker>
            <h2
              id="horizontal-cases-title"
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
            <Link
              href="/projects"
              className="mt-sp-5 font-mono text-[12px] uppercase tracking-[0.14em] text-warm-fg-muted hover:text-accent-text"
            >
              {t.cta.viewAll} →
            </Link>
          </div>
          {cases.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              data-testid="case-card"
              className="slab group flex min-h-[26rem] w-[min(520px,78vw)] shrink-0 flex-col gap-sp-4 p-sp-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Chip variant="outline" className="self-start">
                {c.tag}
              </Chip>
              <h3
                className="font-heading text-warm-fg"
                style={{
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  fontWeight: 600,
                }}
              >
                {c.title}
              </h3>
              <p className="text-warm-fg-muted">{c.description}</p>
              {c.proof ? (
                <span
                  data-testid="case-proof"
                  className="self-start rounded-sp-sm border border-warm-border bg-warm-bg px-2 py-0.5 font-mono text-[11px] text-warm-fg-muted"
                >
                  {c.proof}
                </span>
              ) : null}
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-warm-fg">
                {t.chapters.seeCase}
                <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
