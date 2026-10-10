'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { SubscribeForm } from '@/components/SubscribeForm';

export function NewsletterPanel() {
  const { t } = useLanguage();

  return (
    <section
      data-testid="newsletter-panel"
      className="mx-auto max-w-6xl px-sp-5 py-sp-8"
      aria-labelledby="newsletter-panel-title"
    >
      <div className="slab slab-glass px-sp-6 py-sp-8 sm:px-sp-8 sm:py-sp-9">
        <div className="relative mx-auto max-w-2xl text-center">
          <Kicker>
            <span>{t.cta.productionBlueprints}</span>
          </Kicker>
          <h2
            id="newsletter-panel-title"
            className="mt-sp-4 font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontWeight: 600,
            }}
          >
            {t.cta.getFreeTemplate}
          </h2>
          <p className="mt-sp-4 text-[15px] leading-relaxed text-warm-fg-muted">{t.cta.noFluff}</p>
          <div className="mt-sp-5 text-left">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
