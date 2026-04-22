'use client';

import Link from 'next/link';
import { FileText, Zap, Sparkles, Database } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import { Pipeline, type PipelineNode } from '@/components/primitives/Pipeline';

const ICONS = [
  <FileText key="s3" className="h-4 w-4" />,
  <Zap key="lambda" className="h-4 w-4" />,
  <Sparkles key="claude" className="h-4 w-4" />,
  <Database key="pg" className="h-4 w-4" />,
];

export function AutomationSection() {
  const { t } = useLanguage();

  const nodes: PipelineNode[] = t.pipeline.nodes.map((n, i) => ({
    icon: ICONS[i] ?? null,
    label: n.label,
    sub: n.sub,
  }));

  return (
    <section
      data-testid="automation"
      className="mx-auto max-w-6xl px-sp-5 py-sp-8"
      aria-labelledby="automation-title"
    >
      <Kicker>{t.automation.sectionTitle}</Kicker>
      <div className="mt-sp-5 grid gap-sp-7 rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-6 lg:grid-cols-2">
        {/* Left: title + metrics + CTA */}
        <div className="flex flex-col gap-sp-5">
          <div className="flex flex-wrap items-center gap-sp-3">
            <Chip variant="live">{t.automation.live}</Chip>
            <Chip variant="outline">{t.automation.edition}</Chip>
          </div>
          <h2
            id="automation-title"
            className="font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontWeight: 600,
            }}
          >
            {t.automation.title}
          </h2>
          <p className="text-warm-fg-muted">{t.automation.description}</p>

          <dl className="grid grid-cols-2 gap-sp-3">
            <div className="rounded-sp-md border border-warm-border bg-warm-bg p-sp-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-warm-fg-faint">
                {t.automation.infraCost}
              </dt>
              <dd className="mt-1 metric-value text-warm-fg" style={{ fontSize: '24px' }}>
                {t.automation.infraCostValue}
              </dd>
            </div>
            <div className="rounded-sp-md border border-warm-border bg-warm-bg p-sp-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-warm-fg-faint">
                {t.automation.timeSaved}
              </dt>
              <dd className="mt-1 metric-value text-warm-fg" style={{ fontSize: '24px' }}>
                {t.automation.timeSavedValue}
              </dd>
            </div>
          </dl>

          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {t.automation.value}
          </p>

          <Link
            href="/automations"
            data-testid="automation-cta"
            className="inline-flex w-fit items-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t.automation.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Right: Pipeline visual */}
        <div className="flex items-center">
          <Pipeline nodes={nodes} className="w-full !grid-cols-1 sm:!grid-cols-2" />
        </div>
      </div>
    </section>
  );
}
