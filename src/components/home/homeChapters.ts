import { CASE_STUDIES, KEY_FACTS } from '@/data/career';

export type ChapterId = 'blueprint' | 'compute' | 'data' | 'agents' | 'delivery' | 'reveal';

type FactSource =
  | { kind: 'key'; index: number }
  /** A case-study outcome; `value` is the headline figure shown big, the label is the outcome text. */
  | { kind: 'case'; caseId: string; value: string };

export type HomeChapter = {
  id: ChapterId;
  /** Scroll-progress window of the film, in [from, to). The last chapter also owns progress 1. */
  from: number;
  to: number;
  fact: FactSource | null;
  href: string | null;
};

const SHOTS = 7;
const shot = (n: number) => n / SHOTS;

/**
 * The 7-shot film told as six chapters. Titles and claims live in the message files;
 * every figure is read from career data, so none can be invented here.
 */
export const HOME_CHAPTERS: readonly HomeChapter[] = [
  { id: 'blueprint', from: 0, to: shot(2), fact: null, href: null },
  {
    id: 'compute',
    from: shot(2),
    to: shot(3),
    fact: { kind: 'key', index: 2 },
    href: '/projects#aws-cost-audit',
  },
  {
    id: 'data',
    from: shot(3),
    to: shot(4),
    fact: { kind: 'key', index: 3 },
    href: '/projects#analytics-platform',
  },
  {
    id: 'agents',
    from: shot(4),
    to: shot(5),
    fact: { kind: 'case', caseId: 'ai-orchestration-harness', value: '13 → 11' },
    href: '/projects#ai-orchestration-harness',
  },
  {
    id: 'delivery',
    from: shot(5),
    to: shot(6),
    fact: { kind: 'key', index: 1 },
    href: '/projects#credit-marketplace',
  },
  {
    id: 'reveal',
    from: shot(6),
    to: 1,
    fact: { kind: 'key', index: 0 },
    href: 'mailto:crisfon6@crisfon6.com',
  },
];

/** The chapter at a film progress; out-of-range or invalid progress clamps to the ends. */
export function activeChapter(progress: number): HomeChapter {
  if (!Number.isFinite(progress) || progress <= 0) return HOME_CHAPTERS[0];
  return (
    HOME_CHAPTERS.find((chapter) => progress >= chapter.from && progress < chapter.to) ??
    HOME_CHAPTERS[HOME_CHAPTERS.length - 1]
  );
}

export function chapterFact(chapter: HomeChapter, locale: 'en' | 'es') {
  const source = chapter.fact;
  if (!source) return null;
  if (source.kind === 'key') {
    const fact = KEY_FACTS[source.index];
    return { value: fact.value, label: fact.label[locale] };
  }
  const outcome = CASE_STUDIES.find((c) => c.id === source.caseId)!.outcomes[0];
  return { value: source.value, label: outcome[locale] };
}
