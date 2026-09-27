'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { KEY_FACTS } from '@/data/career';

export function StatsSection() {
  const { locale } = useLanguage();

  return (
    <section
      data-testid="stats"
      aria-label="Production stats"
      className="mx-auto max-w-6xl px-sp-5 py-sp-7"
    >
      <ul className="grid grid-cols-2 divide-x divide-warm-border border-y border-warm-border sm:grid-cols-4">
        {KEY_FACTS.map((fact) => (
          <li key={fact.label.en} className="flex flex-col gap-sp-2 px-sp-5 py-sp-6">
            <span
              className="metric-value font-heading text-warm-fg"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              {fact.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
              {fact.label[locale]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
