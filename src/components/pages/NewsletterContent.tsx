'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SubscribeForm } from '@/components/SubscribeForm';
import { useLanguage } from '@/i18n/LanguageProvider';

const benefits = [
  {
    title: 'Anthropic-Certified Patterns',
    description:
      'Every template is built with Anthropic-certified AI engineering standards — production-grade, architecture-first, cost-conscious.',
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
];

const sampleTopics = [
  'AI-Powered Document Processor ($12/mo at 1K docs)',
  'Slack to Notion Meeting Summarizer',
  'Automated Lead Scoring Pipeline',
  'MCP Agent: Code Review Assistant',
  'Invoice Processing Automation',
  'Content Repurposing Engine',
];

const audiences = [
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
];

export function NewsletterContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">
        {t.newsletter.heading}
      </h1>
      <p className="text-lg text-text-secondary mb-3 max-w-2xl leading-relaxed">
        {t.newsletter.description}
      </p>
      <p className="text-sm text-text-tertiary mb-12 font-mono tracking-wide">
        {t.newsletter.authority}
      </p>

      {/* Email capture */}
      <Card className="card-shadow border-accent-dim blueprint-grid mb-16">
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green pulse-subtle" />
            <p className="text-[10px] font-mono text-text-muted tracking-widest">
              {t.newsletter.joinBuilders}
            </p>
          </div>
          <SubscribeForm />
        </CardContent>
      </Card>

      <Separator className="mb-16" />

      {/* What you get */}
      <section className="mb-16">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          {t.newsletter.whatYouGet}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <Card key={b.title} className="card-shadow">
              <CardContent>
                <h3 className="text-sm font-medium text-text-primary mb-2">{b.title}</h3>
                <p className="text-sm text-text-tertiary leading-relaxed">{b.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Sample topics */}
      <section className="mb-16">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          {t.newsletter.recentTemplates}
        </h2>
        <div className="space-y-2">
          {sampleTopics.map((topic, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border border-border rounded-lg px-5 py-3 bg-surface-1/20"
            >
              <Badge variant="outline" className="font-mono text-[10px] tracking-widest shrink-0">
                W{i + 1}
              </Badge>
              <p className="text-sm text-text-secondary">{topic}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Who is this for */}
      <section className="mb-16">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          {t.newsletter.whoIsThisFor}
        </h2>
        <div className="space-y-3">
          {audiences.map((a) => (
            <p key={a.who} className="text-sm text-text-secondary leading-relaxed">
              <span className="text-text-primary font-medium">{a.who}</span> {a.desc}
            </p>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Final CTA */}
      <Card className="card-shadow">
        <CardContent className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
            {t.newsletter.finalCtaHeading}
          </h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            {t.newsletter.finalCtaDescription}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent-light text-white px-8 py-3.5 h-auto"
          >
            <a href="https://crisfon6.beehiiv.com" target="_blank" rel="noopener noreferrer">
              {t.cta.subscribeZTP}
            </a>
          </Button>
          <p className="text-xs text-text-muted mt-4">{t.cta.freeForever}</p>
        </CardContent>
      </Card>
    </div>
  );
}
