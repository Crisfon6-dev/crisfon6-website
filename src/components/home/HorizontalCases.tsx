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
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          data-testid="cases-track"
          style={
            {
              '--cases-progress': progress,
              transform: 'translateX(min(0px, calc(var(--cases-progress) * (100vw - 100%))))',
            } as CSSProperties
          }
          className="flex w-max items-stretch gap-sp-5 px-sp-5 will-change-transform"
        >
          <div className="flex w-[min(420px,36vw)] shrink-0 flex-col justify-center pr-sp-5">
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
              className="mt-sp-5 font-mono text-[12px] uppercase tracking-[0.14em] text-warm-fg-muted hover:text-accent"
            >
              {t.cta.viewAll} →
            </Link>
          </div>
          {cases.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              data-testid="case-card"
              className="group flex w-[min(520px,78vw)] shrink-0 flex-col gap-sp-4 rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-6 transition-colors hover:border-warm-border-strong"
            >
              <Chip variant="outline">{c.tag}</Chip>
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
              <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {c.result}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
