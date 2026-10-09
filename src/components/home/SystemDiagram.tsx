'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { segmentProgress } from '@/lib/scrollMath';
import { DIAGRAM_ELEMENTS, DIAGRAM_STEPS, DIAGRAM_VIEWBOX } from './systemDiagramShape';

const STROKE = {
  plane: { stroke: 'var(--c-warm-border-strong)', strokeWidth: 1.5 },
  node: { stroke: 'var(--c-warm-fg-muted)', strokeWidth: 1.25 },
  line: { stroke: 'var(--c-accent)', strokeWidth: 2.5 },
} as const;

export function SystemDiagram() {
  const { t } = useLanguage();
  const { ref, progress } = useScrollProgress<HTMLElement>({ centerFrom: 0.85, centerTo: 0.5 });

  return (
    <section ref={ref} data-testid="system-diagram" className="mx-auto max-w-6xl px-sp-5 py-sp-8">
      <Kicker>{t.systemDiagram.kicker}</Kicker>
      <svg
        viewBox={DIAGRAM_VIEWBOX}
        role="img"
        aria-label={t.systemDiagram.label}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto mt-sp-6 h-auto w-full max-w-2xl"
      >
        {DIAGRAM_ELEMENTS.map((el) => (
          <path
            key={el.id}
            data-draw
            d={el.d}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - segmentProgress(progress, el.step, DIAGRAM_STEPS)}
            {...STROKE[el.kind]}
          />
        ))}
      </svg>
    </section>
  );
}
