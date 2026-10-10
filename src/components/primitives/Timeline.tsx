'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useScrollProgress } from '@/lib/useScrollProgress';

export type TimelineItem = {
  year: string;
  title: ReactNode;
  description?: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function Timeline({ items, className = '' }: TimelineProps) {
  const { ref, progress } = useScrollProgress<HTMLOListElement>();
  return (
    <ol
      ref={ref}
      style={{ '--timeline-progress': progress } as CSSProperties}
      className={`timeline-progress relative ml-sp-4 border-l border-warm-border pl-sp-5 ${className}`.trim()}
    >
      {items.map((item, i) => (
        <li key={`${item.year}-${i}`} className="relative pb-sp-6 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-[29px] top-1 inline-block h-2 w-2 rounded-full bg-accent ring-4 ring-warm-bg"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
            {item.year}
          </p>
          <h3 className="mt-1 text-base font-medium text-warm-fg">{item.title}</h3>
          {item.description ? (
            <p className="mt-1 text-sm leading-relaxed text-warm-fg-muted">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
