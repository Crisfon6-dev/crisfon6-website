'use client';

import { KEY_FACTS } from '@/data/career';
import { useLanguage } from '@/i18n/LanguageProvider';

/** Four verified numbers between the hero and the film, so proof arrives before the scroll story. */
export function ProofStrip() {
  const { locale } = useLanguage();

  return (
    <section
      data-testid="proof-strip"
      aria-label={locale === 'es' ? 'Resultados' : 'Results'}
      className="relative mx-auto max-w-6xl px-sp-5 pb-sp-7"
    >
      <ul className="grid grid-cols-2 gap-sp-3 lg:grid-cols-4">
        {KEY_FACTS.map((fact) => (
          <li
            key={fact.label.en}
            className="rounded-sp-lg border border-warm-border bg-warm-bg px-sp-4 py-sp-4"
          >
            <p className="font-heading text-3xl font-semibold tracking-tight text-warm-fg">
              {fact.value}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-warm-fg-muted">{fact.label[locale]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
