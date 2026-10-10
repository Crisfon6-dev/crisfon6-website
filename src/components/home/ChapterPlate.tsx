'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { chapterFact, HOME_CHAPTERS, type HomeChapter } from './homeChapters';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'] as const;

/**
 * One chapter of the story: claim first, then the one verified figure, then the way into the case.
 * Used over the film on desktop and under each still on small screens, so both tell the same story.
 */
export function ChapterPlate({ chapter, testId }: { chapter: HomeChapter; testId: string }) {
  const { t, locale } = useLanguage();
  const copy = t.chapters.items[chapter.id];
  const fact = chapterFact(chapter, locale);
  const numeral = NUMERALS[HOME_CHAPTERS.indexOf(chapter)];
  const linkLabel = chapter.id === 'reveal' ? t.chapters.hire : t.chapters.seeCase;

  return (
    <article
      data-testid={testId}
      data-chapter={chapter.id}
      className="slab chapter-in p-sp-5 sm:p-sp-6"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
        {t.chapters.label} {numeral}
      </p>
      <h2
        className="mt-sp-2 font-heading text-warm-fg"
        style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        {copy.title}
      </h2>
      <p className="mt-sp-2 max-w-[44ch] text-[15px] leading-relaxed text-warm-fg-muted">
        {copy.claim}
      </p>
      {fact ? (
        <div className="mt-sp-4 border-t border-warm-border pt-sp-4">
          <p
            data-testid={`${testId}-value`}
            className="metric-value font-heading text-warm-fg"
            style={{ fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            {fact.value}
          </p>
          <p
            data-testid={`${testId}-label`}
            className="mt-sp-2 text-balance font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg"
          >
            {fact.label}
          </p>
        </div>
      ) : null}
      {chapter.href ? (
        chapter.href.startsWith('mailto:') ? (
          <a
            href={chapter.href}
            className="mt-sp-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
          >
            {linkLabel}
            <span aria-hidden>→</span>
          </a>
        ) : (
          <Link
            href={chapter.href}
            className="mt-sp-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
          >
            {linkLabel}
            <span aria-hidden>→</span>
          </Link>
        )
      ) : null}
    </article>
  );
}
