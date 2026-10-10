'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Kicker } from '@/components/primitives/Kicker';
import { SubscribeForm } from '@/components/SubscribeForm';

const BENEFITS = [
  {
    title: 'Architecture-First Patterns',
    description:
      'Every template is built architecture-first: production-grade, cost-conscious, nothing you have to untangle later.',
  },
  {
    title: 'Architecture Diagrams',
    description:
      'Visual breakdowns of every automation so you understand the full system before deploying.',
  },
  {
    title: 'Deployment Guides',
    description: 'Step-by-step instructions to go from zero to production. No guessing, no gaps.',
  },
  {
    title: 'Cost Breakdowns',
    description: "Real infrastructure costs at different scales. Know exactly what you're paying.",
  },
  {
    title: 'Working Code',
    description: 'Every template comes with a GitHub repo you can clone and deploy today.',
  },
] as const;

const SHIPPED_TEMPLATES = ['AI-Powered Document Processor · $12/mo @ 1K docs'] as const;

const AUDIENCES = [
  {
    who: 'Engineers',
    desc: 'who want to add AI automation to their toolkit without weeks of research.',
  },
  {
    who: 'Founders & CTOs',
    desc: 'looking for production-ready templates to hand to their team and deploy in days.',
  },
  {
    who: 'Technical decision-makers',
    desc: 'who need to evaluate AI tooling fast and want real cost data, not vendor demos.',
  },
  {
    who: 'Builders',
    desc: 'who believe in learning by doing — real blueprints with real cost numbers.',
  },
] as const;

export function NewsletterContent() {
  const { t } = useLanguage();

  return (
    <div className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        plate="newsletter"
        number="07"
        label="POWERAI"
        title={t.newsletter.heading}
        description={t.newsletter.description}
      />

      {/* Signup panel */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <div
          data-testid="newsletter-signup-panel"
          className="slab px-sp-6 py-sp-8 sm:px-sp-8 sm:py-sp-9"
        >
          <div className="relative mx-auto max-w-2xl">
            <Kicker dot>
              <span>{t.newsletter.joinBuilders}</span>
            </Kicker>
            <h2
              className="mt-sp-4 font-heading text-warm-fg"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                fontWeight: 600,
              }}
            >
              {t.newsletter.finalCtaHeading}
            </h2>
            <p className="mt-sp-4 text-sm leading-relaxed text-warm-fg-muted">
              {t.newsletter.authority}
            </p>
            <div className="mt-sp-5">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.newsletter.whatYouGet}</Kicker>
        <ul className="mt-sp-5 grid gap-sp-4 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <li
              key={b.title}
              data-testid="benefit-card"
              className={`slab p-sp-5 ${i === 0 ? 'sm:col-span-2' : ''}`.trim()}
            >
              <h3 className="text-sm font-semibold text-warm-fg">{b.title}</h3>
              <p className="mt-sp-3 text-sm leading-relaxed text-warm-fg-muted">{b.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent templates */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.newsletter.recentTemplates}</Kicker>
        <ul className="mt-sp-5 divide-y divide-warm-border border-y border-warm-border">
          {SHIPPED_TEMPLATES.map((topic) => (
            <li key={topic} className="flex items-center gap-sp-4 py-sp-4">
              <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
                {t.newsletter.templateShipped}
              </span>
              <p className="text-sm text-warm-fg">{topic}</p>
            </li>
          ))}
          <li className="py-sp-4 text-sm text-warm-fg-muted">{t.newsletter.templateMore}</li>
        </ul>
      </section>

      {/* Who is this for */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.newsletter.whoIsThisFor}</Kicker>
        <ul className="mt-sp-5 space-y-sp-3">
          {AUDIENCES.map((a) => (
            <li key={a.who} className="text-base leading-relaxed text-warm-fg-muted">
              <span className="font-medium text-warm-fg">{a.who}</span> {a.desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="slab p-sp-6 text-center">
          <h2
            className="font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.newsletter.finalCtaDescription}
          </h2>
          <Link
            href="https://crisfon6.beehiiv.com"
            data-testid="newsletter-archive-cta"
            className="mt-sp-5 inline-flex items-center gap-2 rounded-sp-xl bg-accent-fill px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.subscribeZTP} <span aria-hidden>→</span>
          </Link>
          <p className="mt-sp-3 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
            {t.cta.freeForever}
          </p>
          <a
            href="mailto:crisfon6@crisfon6.com"
            data-testid="newsletter-hiring-link"
            className="mt-sp-4 inline-block text-sm font-medium text-warm-fg underline-offset-4 hover:underline"
          >
            {t.newsletter.hiring} →
          </a>
        </div>
      </section>
    </div>
  );
}
