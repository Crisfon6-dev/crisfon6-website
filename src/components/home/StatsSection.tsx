'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { CountUp } from '@/components/primitives/CountUp';

type StatEntry = {
  end: number;
  suffix: string;
  labelKey: 'years' | 'records' | 'aws' | 'users';
};

const STATS: readonly StatEntry[] = [
  { end: 4, suffix: '+', labelKey: 'years' },
  { end: 2, suffix: 'M+', labelKey: 'records' },
  { end: 10, suffix: '+', labelKey: 'aws' },
  { end: 1, suffix: 'M+', labelKey: 'users' },
];

export function StatsSection() {
  const { t } = useLanguage();

  return (
    <section
      data-testid="stats"
      aria-label="Production stats"
      className="mx-auto max-w-6xl px-sp-5 py-sp-7"
    >
      <ul className="grid grid-cols-2 divide-x divide-warm-border border-y border-warm-border sm:grid-cols-4">
        {STATS.map((stat) => (
          <li key={stat.labelKey} className="flex flex-col gap-sp-2 px-sp-5 py-sp-6">
            <span
              className="metric-value font-heading text-warm-fg"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              <CountUp end={stat.end} suffix={stat.suffix} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
              {t.stats[stat.labelKey]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
