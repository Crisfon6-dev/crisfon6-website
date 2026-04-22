'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Chip } from '@/components/primitives/Chip';
import { Kicker } from '@/components/primitives/Kicker';

type Automation = {
  num: string;
  title: string;
  description: string;
  stack: readonly string[];
  cost: string;
  costUnit: string;
  timeSaved: string;
  timeUnit: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  live?: boolean;
};

const AUTOMATIONS: readonly Automation[] = [
  {
    num: '01',
    title: 'AI-Powered Document Processor',
    description:
      'Ingest PDFs, extract structured data with Claude API, store in PostgreSQL. Serverless on AWS Lambda with S3 triggers.',
    stack: ['Claude API', 'AWS Lambda', 'S3', 'PostgreSQL', 'Python'],
    cost: '$12',
    costUnit: '/mo @ 1K docs',
    timeSaved: '15h',
    timeUnit: '/week',
    difficulty: 'Intermediate',
    live: true,
  },
  {
    num: '02',
    title: 'Slack to Notion Meeting Summarizer',
    description:
      'Captures Slack threads, summarizes discussions with an LLM, and creates structured Notion pages with action items.',
    stack: ['Claude API', 'Slack API', 'Notion API', 'Python', 'Lambda'],
    cost: '$5',
    costUnit: '/mo',
    timeSaved: '8h',
    timeUnit: '/week',
    difficulty: 'Beginner',
  },
  {
    num: '03',
    title: 'Automated Lead Scoring Pipeline',
    description:
      'Ingest form submissions, enrich with public data, score leads with AI, route high-intent prospects to your CRM.',
    stack: ['Claude API', 'n8n', 'PostgreSQL', 'REST APIs', 'Python'],
    cost: '$18',
    costUnit: '/mo',
    timeSaved: '10h',
    timeUnit: '/week',
    difficulty: 'Intermediate',
  },
  {
    num: '04',
    title: 'MCP Agent: Code Review Assistant',
    description:
      'MCP agent reviews PRs, flags security issues, posts inline comments — triggered by GitHub webhooks.',
    stack: ['MCP Protocol', 'Claude API', 'GitHub API', 'TypeScript', 'Lambda'],
    cost: '$8',
    costUnit: '/mo',
    timeSaved: '12h',
    timeUnit: '/week',
    difficulty: 'Advanced',
  },
  {
    num: '05',
    title: 'Invoice Processing Automation',
    description:
      'Extract line items, totals, and vendor info from invoice PDFs. Validates against PO data before auto-filing.',
    stack: ['Claude API', 'S3', 'DynamoDB', 'Lambda', 'Python'],
    cost: '$10',
    costUnit: '/mo @ 500 invoices',
    timeSaved: '20h',
    timeUnit: '/week',
    difficulty: 'Intermediate',
  },
  {
    num: '06',
    title: 'Content Repurposing Engine',
    description:
      'Takes a long-form blog post and generates LinkedIn posts, X threads, email snippets, and social cards.',
    stack: ['Claude API', 'n8n', 'Markdown', 'Python', 'S3'],
    cost: '$6',
    costUnit: '/mo',
    timeSaved: '6h',
    timeUnit: '/week',
    difficulty: 'Beginner',
  },
];

export function AutomationsContent() {
  const { t } = useLanguage();

  return (
    <main className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        number="04"
        label="AUTOMATIONS"
        title={t.automations.heading}
        description={t.automations.description}
      />

      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <ul className="grid grid-cols-1 gap-sp-5 md:grid-cols-2">
          {AUTOMATIONS.map((auto) => (
            <li key={auto.num} data-testid="automation-card">
              <article className="group flex h-full flex-col gap-sp-4 rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-5 transition-all hover:-translate-y-0.5 hover:border-warm-border-strong">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] tracking-[0.14em] text-warm-fg-faint">
                    #{auto.num}
                  </span>
                  <div className="flex gap-sp-2">
                    {auto.live ? <Chip variant="live">{t.automation.live}</Chip> : null}
                    <Chip
                      variant={
                        auto.difficulty === 'Beginner'
                          ? 'accent'
                          : auto.difficulty === 'Intermediate'
                            ? 'default'
                            : 'outline'
                      }
                    >
                      {auto.difficulty}
                    </Chip>
                  </div>
                </div>
                <h2
                  className="font-heading text-warm-fg"
                  style={{
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    fontWeight: 600,
                  }}
                >
                  {auto.title}
                </h2>
                <p className="text-sm leading-relaxed text-warm-fg-muted">{auto.description}</p>

                <dl className="grid grid-cols-2 gap-sp-3">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-warm-fg-faint">
                      {t.automation.infraCost}
                    </dt>
                    <dd className="metric-value mt-1 text-xl text-warm-fg">
                      {auto.cost}
                      <span className="ml-1 text-sm font-normal text-warm-fg-muted">
                        {auto.costUnit}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-warm-fg-faint">
                      {t.automation.timeSaved}
                    </dt>
                    <dd className="metric-value mt-1 text-xl text-accent">
                      {auto.timeSaved}
                      <span className="ml-1 text-sm font-normal text-warm-fg-muted">
                        {auto.timeUnit}
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-warm-border pt-sp-4">
                  {auto.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sp-sm border border-warm-border bg-warm-bg px-2 py-0.5 text-[11px] font-mono text-warm-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* GitHub panel */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <div className="flex flex-col items-start gap-sp-5 rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <Kicker>{t.automations.githubLabel}</Kicker>
            <h2
              className="mt-sp-3 font-heading text-warm-fg"
              style={{
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                letterSpacing: '-0.02em',
                fontWeight: 600,
              }}
            >
              {t.automations.githubHeading}
            </h2>
            <p className="mt-sp-3 text-sm leading-relaxed text-warm-fg-muted">
              {t.automations.githubDescription}
            </p>
          </div>
          <a
            href="https://github.com/Crisfon6-dev"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="automations-github"
            className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong hover:bg-warm-bg-subtle"
          >
            {t.automations.githubCta} <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="rounded-sp-xl bg-warm-fg px-sp-6 py-sp-8 text-center text-warm-bg">
          <Kicker accent dot>
            <span>{t.automations.ctaLabel}</span>
          </Kicker>
          <h2
            className="mt-sp-4 font-heading"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.automations.ctaHeading}
          </h2>
          <p className="mx-auto mt-sp-3 max-w-xl text-sm opacity-80">
            {t.automations.ctaDescription}
          </p>
          <Link
            href="/newsletter"
            data-testid="automations-cta"
            className="mt-sp-5 inline-flex items-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t.cta.subscribeZTP} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
