'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { PROFILE } from '@/data/career';

export function ContactPanel() {
  const { t } = useLanguage();

  return (
    <section
      data-testid="contact-panel"
      className="mx-auto max-w-6xl px-sp-5 py-sp-8"
      aria-labelledby="contact-panel-title"
    >
      <div className="slab px-sp-6 py-sp-8 sm:px-sp-8 sm:py-sp-9">
        <div className="grid items-center gap-sp-7 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Kicker>{t.cta.letsTalk}</Kicker>
            <h2
              id="contact-panel-title"
              className="mt-sp-4 font-heading text-warm-fg"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                fontWeight: 600,
              }}
            >
              {t.cta.buildingSomething}
            </h2>
            <p className="mt-sp-4 text-[15px] leading-relaxed text-warm-fg-muted">{t.cta.openTo}</p>
            <div className="mt-sp-5 flex flex-wrap gap-sp-3">
              <a
                href="mailto:crisfon6@crisfon6.com"
                data-testid="contact-cta-primary"
                className="group inline-flex items-center gap-2 rounded-sp-xl bg-warm-fg px-sp-5 py-sp-3 text-sm font-medium text-warm-bg transition-transform hover:-translate-y-0.5"
              >
                {t.cta.emailMe}
                <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
                  →
                </span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-cta-linkedin"
                className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong hover:bg-warm-bg-elev"
              >
                {t.cta.connectLinkedIn} <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
          <ul
            data-testid="contact-facts"
            className="space-y-sp-3 border-t border-warm-border pt-sp-5 font-mono text-[12px] uppercase tracking-[0.12em] text-warm-fg lg:border-l lg:border-t-0 lg:pl-sp-6 lg:pt-0"
          >
            {t.cta.contactFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
