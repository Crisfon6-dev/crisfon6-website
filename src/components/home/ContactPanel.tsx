'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';

export function ContactPanel() {
  const { t } = useLanguage();

  return (
    <section
      data-testid="contact-panel"
      className="mx-auto max-w-6xl px-sp-5 py-sp-8"
      aria-labelledby="contact-panel-title"
    >
      <div className="relative overflow-hidden rounded-sp-xl border border-warm-border bg-warm-bg-subtle px-sp-6 py-sp-8 sm:px-sp-8 sm:py-sp-9">
        <div className="relative max-w-2xl">
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
            <Link
              href="/work-with-me"
              data-testid="contact-cta-primary"
              className="group inline-flex items-center gap-2 rounded-sp-xl bg-warm-fg px-sp-5 py-sp-3 text-sm font-medium text-warm-bg transition-transform hover:-translate-y-0.5"
            >
              {t.cta.connectLinkedIn}
              <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
                →
              </span>
            </Link>
            <a
              href="mailto:crisfon6@crisfon6.com"
              data-testid="contact-cta-email"
              className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong hover:bg-warm-bg-elev"
            >
              {t.cta.emailMe}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
