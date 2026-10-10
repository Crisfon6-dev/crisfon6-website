'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { PRINCIPLES } from '@/data/career';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { wordOpacity } from '@/lib/scrollMath';

/** Unrevealed words stay readable (4.5:1 against the dark background), so a pause mid-reveal is safe. */
export const PRINCIPLE_DIM_OPACITY = 0.72;

type WordsProps = { words: string[]; offset: number; total: number; progress: number };

function Words({ words, offset, total, progress }: WordsProps) {
  return (
    <>
      {words.map((word, i) => (
        <span
          key={`${offset + i}-${word}`}
          data-word
          style={{ opacity: wordOpacity(offset + i, total, progress, PRINCIPLE_DIM_OPACITY) }}
          className="transition-opacity duration-150"
        >
          {word}{' '}
        </span>
      ))}
    </>
  );
}

/** Full-screen statement: the first principle from career.ts, revealed word by word on scroll. */
export function PrincipleStatement() {
  const { locale } = useLanguage();
  const { ref, progress } = useScrollProgress<HTMLElement>({ centerFrom: 0.8, centerTo: 0.45 });
  const principle = PRINCIPLES[0];
  const title = principle.title[locale].split(' ');
  const proof = principle.proof[locale].split(' ');
  const total = title.length + proof.length;

  return (
    <section
      ref={ref}
      data-testid="principle-statement"
      className="mx-auto max-w-6xl px-sp-5 py-sp-8"
    >
      <div
        data-testid="principle-band"
        className="rounded-sp-xl bg-warm-fg px-sp-6 py-sp-9 text-warm-bg sm:px-sp-8"
      >
        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(36px, 5.4vw, 76px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            fontWeight: 600,
          }}
        >
          <Words words={title} offset={0} total={total} progress={progress} />
        </h2>
        <p className="mt-sp-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
          <Words words={proof} offset={title.length} total={total} progress={progress} />
        </p>
      </div>
    </section>
  );
}
