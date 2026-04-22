'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Kicker } from '@/components/primitives/Kicker';

export function WorkWithMeContent() {
  const { t } = useLanguage();

  return (
    <main className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        number="06"
        label="WORK WITH ME"
        title={t.workWithMe.heading}
        description={t.workWithMe.description}
      />

      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <div className="grid gap-sp-6 lg:grid-cols-[1fr_320px]">
          {/* Services list */}
          <ul className="space-y-sp-4">
            {t.workWithMe.services.map((svc, i) => (
              <li key={svc.title} data-testid="service-card">
                <article className="group flex items-start gap-sp-4 rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-5 transition-transform hover:translate-x-1 hover:border-warm-border-strong">
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h2
                      className="font-heading text-warm-fg"
                      style={{
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        letterSpacing: '-0.01em',
                        fontWeight: 600,
                      }}
                    >
                      {svc.title}
                    </h2>
                    <p className="mt-sp-3 text-sm leading-relaxed text-warm-fg-muted">
                      {svc.description}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="self-center text-xl text-warm-fg-faint transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </article>
              </li>
            ))}
          </ul>

          {/* Sticky contact card */}
          <aside data-testid="contact-card" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-sp-lg bg-warm-fg p-sp-5 text-warm-bg">
              <Kicker accent dot>
                <span>{t.workWithMe.proofHeading}</span>
              </Kicker>
              <h3
                className="mt-sp-4 font-heading"
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 28px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  fontWeight: 600,
                }}
              >
                {t.workWithMe.stayConnected}
              </h3>
              <p className="mt-sp-3 text-sm leading-relaxed opacity-80">
                {t.workWithMe.stayConnectedDescription}
              </p>
              <ul className="mt-sp-5 space-y-sp-3">
                <li>
                  <a
                    href="https://linkedin.com/in/crisfon6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-sp-3 rounded-sp-sm border border-warm-bg/15 px-sp-4 py-sp-3 text-sm transition-colors hover:border-accent hover:bg-accent-weak"
                  >
                    <span className="font-medium">{t.workWithMe.contact.linkedinLabel}</span>
                    <span className="font-mono text-[12px] opacity-70">
                      {t.workWithMe.contact.linkedinSub}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:crisfon6@crisfon6.com"
                    data-testid="contact-card-email"
                    className="flex items-center justify-between gap-sp-3 rounded-sp-sm border border-warm-bg/15 px-sp-4 py-sp-3 text-sm transition-colors hover:border-accent hover:bg-accent-weak"
                  >
                    <span className="font-medium">{t.workWithMe.contact.emailLabel}</span>
                    <span className="font-mono text-[12px] opacity-70">
                      {t.workWithMe.contact.emailSub}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/crisfon6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-sp-3 rounded-sp-sm border border-warm-bg/15 px-sp-4 py-sp-3 text-sm transition-colors hover:border-accent hover:bg-accent-weak"
                  >
                    <span className="font-medium">{t.workWithMe.contact.githubLabel}</span>
                    <span className="font-mono text-[12px] opacity-70">
                      {t.workWithMe.contact.githubSub}
                    </span>
                  </a>
                </li>
              </ul>
              <Link
                href="/newsletter"
                className="mt-sp-5 inline-flex w-full items-center justify-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                {t.cta.subscribeZTP}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
