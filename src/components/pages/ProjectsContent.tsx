'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Chip } from '@/components/primitives/Chip';

type Project = {
  title: string;
  description: string;
  stack: readonly string[];
  highlights: readonly string[];
  result: string;
  tag: string;
  status: string;
  featured?: boolean;
};

const PROJECTS: readonly Project[] = [
  {
    title: 'AI Automation Library',
    description:
      'Open-source production-ready AI automation blueprints on Anthropic-certified patterns. Architecture diagrams, deployment guides, cost breakdowns, working code.',
    stack: ['Claude API', 'MCP Protocol', 'AWS Lambda', 'Python', 'n8n'],
    highlights: [
      'Anthropic-certified AI engineering patterns',
      'Real cost analysis + deployment guides',
      'New template every week',
      'All code open source',
    ],
    result: 'New template weekly',
    tag: 'AI · OPEN SOURCE',
    status: 'Active',
    featured: true,
  },
  {
    title: 'FinTech Credit Marketplace',
    description:
      "Digital credit marketplace integrated into a major telecom's Super App. Zero-paperwork loans serving millions of underbanked users across LATAM.",
    stack: ['AWS CDK', 'Lambda', 'RDS', 'Cognito', 'ElastiCache', 'FastAPI', 'Angular'],
    highlights: [
      'Multi-env infra via AWS CDK',
      '2M+ records optimized analytics',
      'End-to-end CI/CD, DevOps-first',
      'Zero-paperwork digital loan flow',
    ],
    result: 'Millions of users — LATAM',
    tag: 'FINTECH',
    status: 'In Production',
  },
  {
    title: 'Enterprise Banking Platform',
    description:
      'End-to-end modules for a major financial institution. Regulatory compliance baked into every layer, high-performance core banking systems.',
    stack: ['Java', 'Spring Boot', 'Angular', 'Oracle', 'REST APIs'],
    highlights: [
      'Regulatory compliance enforced',
      'Dynamic banking interfaces',
      'Cross-team product + QA collaboration',
    ],
    result: '3+ years in production',
    tag: 'BANKING',
    status: 'In Production',
  },
  {
    title: 'Government Services Platform',
    description:
      'Cross-platform mobile + web for government-backed services. Led the dev team on architecture, sprint planning, and technical decisions.',
    stack: ['Flutter', 'Dart', 'REST APIs', 'CI/CD'],
    highlights: [
      'Led development team + architecture',
      'Flutter cross-platform delivery',
      'Sprint planning end-to-end',
    ],
    result: 'Delivered for government services',
    tag: 'GOVTECH',
    status: 'Delivered',
  },
  {
    title: 'US Cloud Platform',
    description:
      'Serverless AWS infra for a US-based platform. High-availability configurations, automated data flows across multiple services.',
    stack: ['AWS Lambda', 'Chalice', 'EC2', 'Route 53', 'API Gateway', 'Python'],
    highlights: [
      'Serverless architectures automating data flows',
      'High-availability infra configuration',
      'Full AWS service orchestration',
    ],
    result: 'Deployed on AWS',
    tag: 'CLOUD · SAAS',
    status: 'Delivered',
  },
  {
    title: 'MCP Server Starter',
    description:
      'Boilerplate to spin up a Model Context Protocol server with TypeScript, examples, and local debug tooling.',
    stack: ['TypeScript', 'MCP SDK', 'Zod'],
    highlights: [
      'Ready-to-deploy scaffold',
      'Typed tool + resource definitions',
      'Local inspector',
    ],
    result: 'Open source · MIT',
    tag: 'AI · OPEN SOURCE',
    status: 'Active',
  },
  {
    title: 'LLM Cost Calculator',
    description:
      'Quick-math tool for comparing monthly LLM infra cost across Claude / OpenAI / self-host given volume and latency constraints.',
    stack: ['Next.js', 'TypeScript', 'Turbopack'],
    highlights: ['Live cost diff across providers', 'Shareable URL with inputs', 'No-login MVP'],
    result: 'Public tool',
    tag: 'AI · TOOLS',
    status: 'Active',
  },
];

export function ProjectsContent() {
  const { t } = useLanguage();

  return (
    <main className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        number="03"
        label="PROJECTS"
        title={t.projects.heading}
        description={t.projects.description}
      />

      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <ul className="grid grid-cols-1 gap-sp-5 lg:grid-cols-12">
          {PROJECTS.map((p) => (
            <li
              key={p.title}
              className={p.featured ? 'lg:col-span-12' : 'lg:col-span-6'}
              data-testid="project-card"
              data-featured={p.featured ? 'true' : 'false'}
            >
              <article className="group relative flex h-full flex-col gap-sp-4 overflow-hidden rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-6 transition-all hover:-translate-y-0.5 hover:border-warm-border-strong">
                <div className="flex flex-wrap items-center gap-sp-2">
                  <Chip variant="outline">{p.tag}</Chip>
                  <Chip variant={p.status === 'Active' ? 'accent' : 'default'}>{p.status}</Chip>
                </div>
                <h2
                  className="font-heading text-warm-fg"
                  style={{
                    fontSize: p.featured ? 'clamp(24px, 3vw, 36px)' : 'clamp(20px, 2.2vw, 26px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h2>
                <p className="text-warm-fg-muted">{p.description}</p>
                <ul className="space-y-1 text-sm text-warm-fg-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-sp-2">
                      <span className="text-warm-fg-faint">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-sp-3 border-t border-warm-border pt-sp-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sp-sm border border-warm-border bg-warm-bg px-2 py-0.5 text-[11px] font-mono text-warm-fg-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {p.result}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="rounded-sp-xl bg-warm-fg px-sp-6 py-sp-8 text-center text-warm-bg">
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.projects.ctaHeading}
          </h2>
          <p className="mx-auto mt-sp-3 max-w-xl text-sm opacity-80">{t.projects.ctaDescription}</p>
          <Link
            href="/newsletter"
            data-testid="projects-cta"
            className="mt-sp-5 inline-flex items-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t.cta.subscribeZTP} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
