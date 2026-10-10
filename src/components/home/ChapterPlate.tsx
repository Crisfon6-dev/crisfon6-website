'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { ALL_BEATS_VISIBLE, beatVisibility } from './chapterBeats';
import { chapterDossier, chapterFact, HOME_CHAPTERS, type HomeChapter } from './homeChapters';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'] as const;

function Beat({
  id,
  name,
  visible,
  collapse,
  children,
}: {
  id: string;
  name: 'problem' | 'decision' | 'result';
  visible: boolean;
  /** In the film panel an unrevealed beat takes no room, so the card builds up instead of showing a void. */
  collapse: boolean;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={`${id}-beat-${name}`}
      data-visible={visible ? 'true' : 'false'}
      data-collapse={collapse ? 'true' : undefined}
      className="beat mt-sp-4"
    >
      {children}
    </div>
  );
}

function BeatLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
      {children}
    </p>
  );
}

/**
 * One chapter of the story as a short dossier: problem, decision, result, then the way into the case.
 * `localProgress` is the position inside this chapter (0..1); `null` shows every beat at once, which
 * is what the stills layout and reduced motion use. Hidden beats stay in the DOM.
 */
export function ChapterPlate({
  chapter,
  testId,
  localProgress = null,
  compact = false,
  showLink = true,
  linkFocusable = true,
}: {
  chapter: HomeChapter;
  testId: string;
  localProgress?: number | null;
  /** The fixed film panel: on short viewports the claim and supporting line give way so it fits. */
  compact?: boolean;
  /** `false` omits the way into the case (the screen-reader-only copy of the story). */
  showLink?: boolean;
  /** `false` keeps the link out of the tab order (the visual-only film panel). */
  linkFocusable?: boolean;
}) {
  const { t, locale } = useLanguage();
  const copy = t.chapters.items[chapter.id];
  const fact = chapterFact(chapter, locale);
  const dossier = chapterDossier(chapter, locale);
  const numeral = NUMERALS[HOME_CHAPTERS.indexOf(chapter)];
  const linkLabel = chapter.id === 'reveal' ? t.chapters.hire : t.chapters.seeCase;
  const isBlueprint = chapter.id === 'blueprint';
  const hasDecision = isBlueprint || dossier.decision !== null;
  const show =
    localProgress === null ? ALL_BEATS_VISIBLE : beatVisibility(localProgress, hasDecision);
  // The last chapter has no problem or decision to wait for, so its result is there on entry.
  const resultVisible = show.result || (!isBlueprint && dossier.problem === null);
  const cut = compact ? '[@media(max-height:760px)]:hidden' : '';
  const tight = compact ? '[@media(max-height:760px)]:sm:p-sp-5' : '';

  return (
    <article
      data-testid={testId}
      data-chapter={chapter.id}
      className={`slab chapter-in p-sp-5 sm:p-sp-6 ${tight}`.trim()}
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
      <p
        className={`mt-sp-2 max-w-[44ch] text-[15px] leading-relaxed text-warm-fg-muted ${cut}`.trim()}
      >
        {copy.claim}
      </p>

      {isBlueprint ? (
        <>
          <Beat id={testId} name="problem" visible={show.problem} collapse={compact}>
            <p className="font-heading text-xl text-warm-fg">{t.chapters.beats.whoHurts}</p>
          </Beat>
          <Beat id={testId} name="decision" visible={show.decision} collapse={compact}>
            <p className="font-heading text-xl text-warm-fg">{t.chapters.beats.whatCosts}</p>
          </Beat>
        </>
      ) : null}

      {dossier.problem ? (
        <Beat id={testId} name="problem" visible={show.problem} collapse={compact}>
          <BeatLabel>{t.chapters.beats.problem}</BeatLabel>
          <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-warm-fg">
            {dossier.problem}
          </p>
        </Beat>
      ) : null}

      {dossier.decision ? (
        <Beat id={testId} name="decision" visible={show.decision} collapse={compact}>
          <BeatLabel>{t.chapters.beats.decision}</BeatLabel>
          <p className="mt-1 max-w-[52ch] text-[15px] font-medium leading-relaxed text-warm-fg">
            {dossier.decision}
          </p>
        </Beat>
      ) : null}

      {fact ? (
        <Beat id={testId} name="result" visible={resultVisible} collapse={compact}>
          <div className="border-t border-warm-border pt-sp-4">
            <BeatLabel>{t.chapters.beats.result}</BeatLabel>
            <p
              data-testid={`${testId}-value`}
              className="metric-value mt-1 font-heading text-warm-fg"
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {fact.value}
            </p>
            <p
              data-testid={`${testId}-label`}
              className="mt-sp-2 text-balance font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg"
            >
              {fact.label}
            </p>
            {dossier.support ? (
              <p className={`mt-sp-2 text-[15px] leading-relaxed text-warm-fg-muted ${cut}`.trim()}>
                {dossier.support}
              </p>
            ) : null}
            {dossier.recap ? (
              <ul className="mt-sp-3 grid gap-sp-2">
                {dossier.recap.map((item) => (
                  <li key={item.label} className="flex items-baseline gap-sp-3">
                    <span className="font-heading text-lg text-warm-fg">{item.value}</span>
                    <span className="text-[13px] leading-snug text-warm-fg-muted">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Beat>
      ) : null}

      {showLink && chapter.href ? (
        chapter.href.startsWith('mailto:') ? (
          <a
            href={chapter.href}
            tabIndex={linkFocusable ? undefined : -1}
            className="mt-sp-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
          >
            {linkLabel}
            <span aria-hidden>→</span>
          </a>
        ) : (
          <Link
            href={chapter.href}
            tabIndex={linkFocusable ? undefined : -1}
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
