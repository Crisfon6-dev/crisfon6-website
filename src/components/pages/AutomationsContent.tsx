'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/i18n/LanguageProvider';

const automations = [
  {
    title: 'AI-Powered Document Processor',
    description:
      'Ingest PDFs, extract structured data with Claude API, and store results in PostgreSQL. Deployed on AWS Lambda with S3 triggers — fully serverless.',
    stack: ['Claude API', 'AWS Lambda', 'S3', 'PostgreSQL', 'Python'],
    cost: '$12',
    costUnit: '/mo at 1K docs',
    timeSaved: '15h',
    timeUnit: '/week',
    difficulty: 'Intermediate',
    difficultyColor: 'text-amber bg-amber-dim',
    week: 1,
    certifiedStack: true,
  },
  {
    title: 'Slack to Notion Meeting Summarizer',
    description:
      'Captures Slack threads, summarizes discussions with an LLM, and creates structured Notion pages with action items and owners.',
    stack: ['Claude API', 'Slack API', 'Notion API', 'Python', 'Lambda'],
    cost: '$5',
    costUnit: '/mo',
    timeSaved: '8h',
    timeUnit: '/week',
    difficulty: 'Beginner',
    difficultyColor: 'text-green bg-green-dim',
    week: 2,
    certifiedStack: true,
  },
  {
    title: 'Automated Lead Scoring Pipeline',
    description:
      'Ingests form submissions, enriches with public data, scores leads using AI, and routes high-intent prospects to your CRM automatically.',
    stack: ['Claude API', 'n8n', 'PostgreSQL', 'REST APIs', 'Python'],
    cost: '$18',
    costUnit: '/mo',
    timeSaved: '10h',
    timeUnit: '/week',
    difficulty: 'Intermediate',
    difficultyColor: 'text-amber bg-amber-dim',
    week: 3,
    certifiedStack: true,
  },
  {
    title: 'MCP Agent: Code Review Assistant',
    description:
      'An MCP-powered agent that reviews pull requests, flags security issues, suggests improvements, and posts inline comments — triggered by GitHub webhooks.',
    stack: ['MCP Protocol', 'Claude API', 'GitHub API', 'TypeScript', 'Lambda'],
    cost: '$8',
    costUnit: '/mo',
    timeSaved: '12h',
    timeUnit: '/week',
    difficulty: 'Advanced',
    difficultyColor: 'text-red bg-red-dim',
    week: 4,
    certifiedStack: true,
  },
  {
    title: 'Invoice Processing Automation',
    description:
      'Extract line items, totals, and vendor info from invoice PDFs. Validates against PO data and flags discrepancies before auto-filing.',
    stack: ['Claude API', 'S3', 'DynamoDB', 'Lambda', 'Python'],
    cost: '$10',
    costUnit: '/mo at 500 invoices',
    timeSaved: '20h',
    timeUnit: '/week',
    difficulty: 'Intermediate',
    difficultyColor: 'text-amber bg-amber-dim',
    week: 5,
    certifiedStack: true,
  },
  {
    title: 'Content Repurposing Engine',
    description:
      'Takes a long-form blog post and generates LinkedIn posts, X threads, email snippets, and social cards — all on-brand and ready to publish.',
    stack: ['Claude API', 'n8n', 'Markdown', 'Python', 'S3'],
    cost: '$6',
    costUnit: '/mo',
    timeSaved: '6h',
    timeUnit: '/week',
    difficulty: 'Beginner',
    difficultyColor: 'text-green bg-green-dim',
    week: 6,
    certifiedStack: true,
  },
];

export function AutomationsContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">
        {t.automations.heading}
      </h1>
      <p className="text-text-secondary mb-4 max-w-2xl text-lg leading-relaxed">
        {t.automations.description}
      </p>
      <p className="text-sm text-text-muted mb-14">
        {t.automations.subscribeTo}{' '}
        <Link href="/newsletter" className="text-accent-light hover:text-accent transition-colors">
          PowerAI
        </Link>{' '}
        {t.automations.toGetDelivered}
      </p>

      <div className="space-y-5">
        {automations.map((auto) => (
          <Card key={auto.title} className="card-shadow card-hover bg-surface-1/30 border-border">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px] tracking-widest">
                  WEEK {auto.week}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`font-mono text-[10px] tracking-widest ${auto.difficultyColor}`}
                >
                  {auto.difficulty}
                </Badge>
                {auto.certifiedStack && (
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] tracking-widest text-violet border-violet/30 bg-violet-dim"
                  >
                    ANTHROPIC CERTIFIED
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl font-bold text-text-primary tracking-tight">
                {auto.title}
              </CardTitle>
              <CardDescription className="text-text-secondary leading-relaxed text-sm">
                {auto.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <Separator className="bg-border-emphasis" />

              {/* Metrics */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                    INFRA COST
                  </p>
                  <p className="text-2xl font-bold text-green metric-value">
                    {auto.cost}
                    <span className="text-sm text-text-tertiary font-normal">{auto.costUnit}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                    TIME SAVED
                  </p>
                  <p className="text-2xl font-bold text-accent-light metric-value">
                    {auto.timeSaved}
                    <span className="text-sm text-text-tertiary font-normal">{auto.timeUnit}</span>
                  </p>
                </div>
              </div>

              <Separator className="bg-border-emphasis" />

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {auto.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs text-text-muted bg-surface-2 font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* GitHub Section */}
      <Card className="mt-10 card-shadow bg-surface-1/30 border-border">
        <CardContent className="flex flex-col sm:flex-row sm:items-center gap-6 py-6">
          <div className="flex-1">
            <p className="text-[10px] font-mono text-text-muted tracking-widest mb-2">
              {t.automations.githubLabel}
            </p>
            <h2 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
              {t.automations.githubHeading}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.automations.githubDescription}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0">
            <a href="https://github.com/Crisfon6-dev" target="_blank" rel="noopener noreferrer">
              {t.automations.githubCta}
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="mt-6 border-accent-dim blueprint-grid card-shadow">
        <CardContent className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green pulse-subtle" />
            <p className="text-[10px] font-mono text-text-muted tracking-widest">
              {t.automations.ctaLabel}
            </p>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
            {t.automations.ctaHeading}
          </h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            {t.automations.ctaDescription}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent-light text-white px-8 py-3 h-auto font-medium"
          >
            <Link href="/newsletter">{t.cta.subscribeZTP}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
