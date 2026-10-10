'use client';

/* The portrait is a pre-optimized WebP served from /public, so Next's image optimizer would only
   re-encode it: a plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import {
  CREDENTIALS,
  PROFILE,
  ROLES,
  STACK_GROUPS,
  formatRolePeriod,
  sortRoles,
} from '@/data/career';
import { PORTRAIT } from './whoIAmAssets';

export const WHO_CREDENTIALS_MAX = 3;
export const WHO_STACK_GROUPS = 4;
export const WHO_STACK_ITEMS = 3;

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-sp-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed text-warm-fg">{children}</dd>
    </div>
  );
}

/** The introduction: who the owner is, from existing data only. Sits in a slab over the footage. */
export function WhoIAm() {
  const { t, locale } = useLanguage();
  const now = sortRoles(ROLES).find((r) => r.kind === 'employment' && r.end === null);
  const credentials = CREDENTIALS.slice(0, WHO_CREDENTIALS_MAX);
  const stack = STACK_GROUPS.slice(0, WHO_STACK_GROUPS).map((g) => ({
    group: g.group,
    items: g.items.slice(0, WHO_STACK_ITEMS),
  }));

  return (
    <section
      id="who-i-am"
      data-testid="who-i-am"
      aria-labelledby="who-i-am-title"
      className="mx-auto max-w-6xl px-sp-5 pb-sp-7"
    >
      <div className="slab slab-glass grid gap-sp-6 p-sp-5 sm:p-sp-6 lg:grid-cols-12">
        <div className="mx-auto w-full max-w-[280px] lg:col-span-4 lg:-mb-sp-6 lg:max-w-none lg:self-end">
          <img
            src={PORTRAIT.src}
            width={PORTRAIT.width}
            height={PORTRAIT.height}
            alt={t.whoIAm.photoAlt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>

        <div className="lg:col-span-8">
          <Kicker>{t.whoIAm.kicker}</Kicker>
          <h2
            id="who-i-am-title"
            className="mt-sp-3 font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              fontWeight: 600,
            }}
          >
            {t.about.intro1}
          </h2>
          <p className="mt-sp-3 max-w-[60ch] text-base leading-relaxed text-warm-fg-muted">
            {t.about.businessAngle}
          </p>

          <dl className="mt-sp-5 grid gap-sp-4">
            {now ? (
              <Fact label={t.whoIAm.now}>
                {now.title[locale]} · {now.employer[locale]} ·{' '}
                {formatRolePeriod(now, locale, t.experience.present)}
                <span className="block text-warm-fg-muted">{now.clientLine[locale]}</span>
              </Fact>
            ) : null}
            <Fact label={t.whoIAm.based}>{PROFILE.location[locale]}</Fact>
            <Fact label={t.whoIAm.credentials}>
              <span className="flex flex-wrap gap-sp-2">
                {credentials.map((c) => (
                  <span
                    key={c.name.en}
                    data-testid="who-credential"
                    className="rounded-sp-sm border border-warm-border bg-warm-bg-subtle px-sp-3 py-sp-2 text-[13px] leading-snug text-warm-fg"
                  >
                    {c.name[locale]}
                    <span className="text-warm-fg-muted"> · {c.issuer}</span>
                  </span>
                ))}
              </span>
            </Fact>
            <Fact label={t.whoIAm.stack}>
              <ul className="grid gap-1">
                {stack.map((g) => (
                  <li key={g.group} data-testid="who-stack-group">
                    <span className="font-medium">{g.group}</span>
                    <span className="text-warm-fg-muted"> — {g.items.join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </Fact>
          </dl>

          <div className="mt-sp-5 flex flex-wrap gap-x-sp-5">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
            >
              {t.whoIAm.fullStory} <span aria-hidden>→</span>
            </Link>
            <Link
              href="/experience"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
            >
              {t.whoIAm.workHistory} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
