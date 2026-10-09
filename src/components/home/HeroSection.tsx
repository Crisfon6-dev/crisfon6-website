'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section data-testid="hero" className="relative mx-auto max-w-6xl px-sp-5 pt-sp-8 pb-sp-7">
      {/* Kicker row: LATAM + shimmering cert badge */}
      <div className="flex flex-wrap items-center gap-sp-3">
        <Kicker dot>
          <span>{t.hero.kicker}</span>
        </Kicker>
        <span className="inline-flex items-center rounded-sp-sm border border-accent/30 bg-accent-weak px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {t.hero.cert}
        </span>
      </div>

      {/* Brand wordmark */}
      <h1
        className="mt-sp-5 font-heading text-warm-fg"
        style={{
          fontSize: 'clamp(64px, 14vw, 200px)',
          letterSpacing: '-0.055em',
          lineHeight: '0.88',
          fontWeight: 700,
        }}
      >
        crisfon<span className="text-accent">6</span>
      </h1>

      {/* Headline with typewriter */}
      <p
        data-testid="hero-headline"
        className="mt-sp-5 text-warm-fg"
        style={{
          fontSize: 'clamp(28px, 3.6vw, 44px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          fontWeight: 500,
        }}
      >
        {t.hero.headlinePrefix} <span className="text-accent">{t.hero.headlineAccent}</span>
      </p>

      {/* Blurb */}
      <p className="mt-sp-5 max-w-[520px] text-base leading-relaxed text-warm-fg-muted">
        {t.hero.description}
      </p>
      <p
        data-testid="hero-business-angle"
        className="mt-sp-3 max-w-[520px] border-l-2 border-accent pl-sp-3 text-[15px] leading-relaxed text-warm-fg"
      >
        {t.hero.businessAngle}
      </p>

      {/* CTAs */}
      <div className="mt-sp-6 flex flex-wrap items-center gap-sp-3">
        <Link
          href="/newsletter"
          data-testid="hero-cta-primary"
          className="group inline-flex items-center gap-2 rounded-sp-xl bg-warm-fg px-sp-5 py-sp-3 text-sm font-medium text-warm-bg transition-transform hover:-translate-y-0.5"
        >
          {t.hero.cta1}
          <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
            →
          </span>
        </Link>
        <Link
          href="/projects"
          data-testid="hero-cta-secondary"
          className="group inline-flex items-center gap-2 rounded-sp-xl border border-warm-border bg-warm-bg px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong hover:bg-warm-bg-subtle"
        >
          {t.hero.cta2}
          <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
            →
          </span>
        </Link>
      </div>

      {/* Who, and that he is open to US contracts */}
      <p
        data-testid="hero-availability"
        className="mt-sp-5 flex flex-wrap items-center gap-x-sp-3 gap-y-1 text-[15px] text-warm-fg"
      >
        <span>
          <span data-testid="hero-name" className="font-semibold">
            {t.hero.name}
          </span>
          {' · '}
          {t.hero.availability}
        </span>
        <a href="mailto:crisfon6@crisfon6.com" className="font-medium text-accent hover:underline">
          {t.cta.emailMe} →
        </a>
      </p>

      {/* Bridge into the film */}
      <p
        data-testid="hero-bridge"
        className="mt-sp-3 font-mono text-[13px] tracking-[0.02em] text-warm-fg-muted"
      >
        {t.hero.bridge}
      </p>
      <Link
        href="/experience"
        data-testid="hero-full-work-history"
        className="mt-sp-2 inline-block text-sm font-medium text-accent hover:underline"
      >
        {t.hero.fullWorkHistory}
      </Link>

      {/* Meta links row */}
      <ul className="mt-sp-5 flex flex-wrap gap-sp-4 font-mono text-[12px] uppercase tracking-[0.14em] text-warm-fg-muted">
        <li>
          <a
            href="https://linkedin.com/in/crisfon6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href="mailto:crisfon6@crisfon6.com" className="hover:text-accent">
            Email
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Crisfon6-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/crisfon6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Instagram
          </a>
        </li>
      </ul>
    </section>
  );
}
