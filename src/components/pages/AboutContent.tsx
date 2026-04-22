'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Timeline } from '@/components/primitives/Timeline';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import { Atmosphere } from '@/components/primitives/Atmosphere';

const STACK_CATEGORIES = [
  {
    title: 'AI & Automation',
    items:
      'LLMs, Claude API, MCP Protocol & Agents, Agentic Workflows, Prompt Engineering, Generative AI, Neural Networks, Workflow Automation',
  },
  {
    title: 'Cloud & DevOps',
    items:
      'AWS (CDK, Lambda, RDS, S3, Cognito, CloudWatch, EC2, SES, SNS, API Gateway, Route 53, ElastiCache), Docker, CI/CD, Nginx',
  },
  {
    title: 'Full Stack',
    items:
      'Python, TypeScript, JavaScript, Java — FastAPI, Angular, Django, Spring Boot, NestJS, Node.js, Flutter — PostgreSQL, MongoDB, Redis',
  },
] as const;

const CERTS = [
  { name: 'Claude Code in Action', org: 'Anthropic (2026)' },
  { name: 'B.Eng. Systems Engineering', org: 'UNAB — Bucaramanga' },
  { name: 'Neural Networks and Deep Learning', org: 'Coursera / deeplearning.ai' },
  { name: 'AWS Partner: Technical Accreditation', org: 'Amazon Web Services' },
] as const;

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <main className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        number="02"
        label="ABOUT"
        title={
          <>
            {t.about.heading1} <span className="text-warm-fg-muted">{t.about.heading2}</span>
          </>
        }
      />

      {/* Intro paragraphs + Anthropic credential */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <div className="grid gap-sp-7 lg:grid-cols-[1fr_320px]">
          <div className="space-y-sp-4 text-base leading-relaxed text-warm-fg-muted">
            <p>{t.about.intro1}</p>
            <p>{t.about.intro2}</p>
            <p>{t.about.intro3}</p>
            <p className="font-medium text-warm-fg">{t.about.intro4}</p>
          </div>

          <aside
            data-testid="anthropic-card"
            className="glow relative overflow-hidden rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-5"
          >
            <span
              aria-hidden
              className="shimmer-sweep pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgb(from var(--c-accent) r g b / 0.2) 50%, transparent 100%)',
              }}
            />
            <Kicker accent dot>
              <span>{t.hero.cert}</span>
            </Kicker>
            <h3
              className="relative mt-sp-3 font-heading text-warm-fg"
              style={{ fontSize: '22px', letterSpacing: '-0.02em', fontWeight: 600 }}
            >
              Claude Code in Action
            </h3>
            <p className="relative mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
              Anthropic · Feb 2026
            </p>
          </aside>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.about.experience}</Kicker>
        <div className="mt-sp-6">
          <Timeline items={[...t.about.timeline]} />
        </div>
      </section>

      {/* Core Stack */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.about.coreStack}</Kicker>
        <div className="mt-sp-6 grid gap-sp-4 md:grid-cols-3">
          {STACK_CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className="rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-5"
            >
              <h3 className="text-sm font-semibold text-warm-fg">{cat.title}</h3>
              <p className="mt-sp-3 text-sm leading-relaxed text-warm-fg-muted">{cat.items}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why I Build in Public */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.about.whyBuildInPublicLabel}</Kicker>
        <div className="mt-sp-5 max-w-3xl space-y-sp-4 text-base leading-relaxed text-warm-fg-muted">
          <p>{t.about.whyPara1}</p>
          <p>{t.about.whyPara2}</p>
          <p className="font-medium text-warm-fg">{t.about.whyPara3}</p>
        </div>
      </section>

      {/* Education / Certifications */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-7">
        <Kicker>{t.about.education}</Kicker>
        <div className="mt-sp-5 flex flex-wrap gap-sp-2">
          {CERTS.map((cert) => (
            <Chip key={cert.name} variant="default" className="px-sp-3 py-sp-2 text-sm normal-case">
              <span className="font-medium text-warm-fg">{cert.name}</span>
              <span className="mx-1.5 text-warm-fg-faint">·</span>
              <span className="text-warm-fg-muted">{cert.org}</span>
            </Chip>
          ))}
        </div>
      </section>

      {/* Inline CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="rounded-sp-lg border border-warm-border bg-warm-bg-subtle p-sp-6 text-center">
          <h2
            className="font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.about.ctaHeading}
          </h2>
          <p className="mt-sp-3 text-warm-fg-muted">{t.about.ctaDescription}</p>
          <div className="mt-sp-5 flex flex-wrap justify-center gap-sp-3">
            <Link
              href="/work-with-me"
              data-testid="about-cta-primary"
              className="inline-flex items-center gap-2 rounded-sp-xl bg-warm-fg px-sp-5 py-sp-3 text-sm font-medium text-warm-bg transition-transform hover:-translate-y-0.5"
            >
              {t.nav.workWithMe} <span aria-hidden>→</span>
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong"
            >
              {t.cta.subscribeNewsletter}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
