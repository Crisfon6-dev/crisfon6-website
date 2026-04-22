'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Typewriter } from '@/components/primitives/Typewriter';
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
        <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-sp-sm border border-accent/30 bg-accent-weak px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          <span
            aria-hidden
            className="shimmer-sweep pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgb(from var(--c-accent) r g b / 0.28) 50%, transparent 100%)',
            }}
          />
          <span aria-hidden className="relative">
            ✦
          </span>
          <span className="relative">{t.hero.cert}</span>
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
        <span>crisfon</span>
        <span className="gradient-text">6</span>
        <span aria-hidden className="cursor-blink ml-1 text-accent">
          |
        </span>
      </h1>

      {/* Headline with typewriter */}
      <p
        className="mt-sp-5 text-warm-fg"
        style={{
          fontSize: 'clamp(28px, 3.6vw, 44px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          fontWeight: 500,
        }}
      >
        {t.hero.headlinePrefix} <Typewriter words={[...t.hero.typewords]} className="text-accent" />
      </p>

      {/* Blurb */}
      <p className="mt-sp-5 max-w-[520px] text-base leading-relaxed text-warm-fg-muted">
        {t.hero.description}
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
          className="group inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong hover:bg-warm-bg-subtle"
        >
          {t.hero.cta2}
          <span aria-hidden className="transition-transform group-hover:translate-x-[3px]">
            →
          </span>
        </Link>
      </div>

      {/* Proof */}
      <p className="mt-sp-5 font-mono text-[13px] tracking-[0.02em] text-warm-fg-faint">
        {t.hero.proof}
      </p>

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
            href="https://github.com/crisfon6"
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
