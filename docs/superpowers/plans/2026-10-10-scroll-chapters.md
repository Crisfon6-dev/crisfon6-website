# Scroll Chapters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the six home-film chapter captions into scroll-driven Problem / Decision / Result dossiers whose content comes only from `career.ts`.

**Architecture:** A pure scroll-math module (`chapterBeats.ts`) maps film progress to per-chapter beat visibility. `homeChapters.ts` gains a `chapterDossier()` selector that assembles a chapter's text from career data. `ChapterPlate` renders beats (always in the DOM, visibility via a `data-visible` attribute and a CSS transition) and `HeroFilm` passes each chapter's local progress; the stills layout passes `null` so every beat is visible.

**Tech Stack:** Next.js (App Router, client components), React 19, TypeScript, Tailwind v4 + `globals.css`, Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-10-scroll-chapters-design.md`

## Global Constraints

- Every figure and line shown is read from `src/data/career.ts` or `src/i18n/messages.ts`; nothing is hardcoded in a component.
- English and Spanish both ship. No English text may appear when the locale is `es`.
- Beat reveal animates `transform` and `opacity` only, about 280ms; it is not scrubbed to scroll.
- Beat text is always in the DOM; only `data-visible` changes. Reduced motion and the stills layout show all beats.
- Reveal thresholds: Problem `0.08`, Decision `0.35`, Result `0.62` (spec).
- Existing test IDs are preserved: `chapter-{id}`, `chapter-{id}-value`, `chapter-{id}-label`, `film-chapter`, `film-chapter-value`.
- Contrast stays at 4.5:1 or better in light and dark; touch targets stay at 44px.
- Conventional commits, no attribution trailers. Commit message body lines under 100 chars.
- `FILM_TRAVEL_VH` stays `7`. No new media assets in this plan (Phase 2 is separate).
- Count-up of the result number is **deferred**: `CountUp` renders `0` until an observer fires and replaces the text, which would break exact-text tests and the no-JS read. The number enters via the beat transition instead.

## Review Focus

- Non-finite, negative or >1 progress (NaN, -Infinity, 9): must read as a clamped chapter progress, never throw, never show a beat that should be hidden at 0. (Task 2)
- Progress exactly on a threshold (0.08, 0.35, 0.62): the beat is visible at the boundary (`>=`). (Task 2)
- A case without a `decision` (credit-marketplace): exactly two beats render, with no empty label or empty box. (Tasks 3 and 4)
- Spanish locale: every beat label and text is Spanish, with no English leak. (Task 4)
- Hidden beats must stay in the DOM so assistive tech and the no-JS/stills layout read the full content. (Task 4)

---

### Task 1: Add the short decision line to the case data

**Files:**

- Modify: `src/data/career.ts` (type at ~line 23-55; cases `aws-cost-audit`, `analytics-platform`, `ai-orchestration-harness`)
- Test: `src/data/__tests__/career.test.ts`

**Interfaces:**

- Produces: `CaseStudy.decision?: L` (bilingual short line), present on the three cases below and absent on `credit-marketplace`.

- [ ] **Step 1: Write the failing test**

Append inside the existing top-level `describe` in `src/data/__tests__/career.test.ts` (add `CASE_STUDIES` to the existing import from `'../career'` if it is not there):

```ts
describe('case decision lines', () => {
  const withDecision = ['aws-cost-audit', 'analytics-platform', 'ai-orchestration-harness'];

  it.each(withDecision)('%s has a short bilingual decision line', (id) => {
    const study = CASE_STUDIES.find((c) => c.id === id)!;
    expect(study.decision, id).toBeDefined();
    for (const locale of ['en', 'es'] as const) {
      const line = study.decision![locale];
      expect(line.length, `${id} ${locale}`).toBeGreaterThan(20);
      expect(line.length, `${id} ${locale} stays one line`).toBeLessThanOrEqual(200);
    }
  });

  it('leaves credit-marketplace without a decision rather than inventing one', () => {
    expect(CASE_STUDIES.find((c) => c.id === 'credit-marketplace')!.decision).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/__tests__/career.test.ts`
Expected: FAIL (`decision` does not exist on the type / is undefined).

- [ ] **Step 3: Implement**

In the `CaseStudy` type, add after `context?: L;`:

```ts
  /** One line: the choice that shows judgment. Shown as the middle beat of a home chapter. */
  decision?: L;
```

Then add a `decision` property directly after the `context: {...},` block of each case:

`aws-cost-audit`:

```ts
    decision: {
      en: 'Refused a tempting downsize: the production cluster averaged 12.7% CPU, but its p99 was 97.5%.',
      es: 'Rechacé una reducción tentadora: el clúster de producción promediaba 12,7% de CPU, pero su p99 era 97,5%.',
    },
```

`analytics-platform`:

```ts
    decision: {
      en: "Reused the product's existing tenant scoping instead of rebuilding it in a BI tool, and proved parity on seven months of production data before retiring the old service.",
      es: 'Reutilicé el aislamiento por cliente existente en vez de reconstruirlo en una herramienta de BI, y demostré paridad con siete meses de datos de producción antes de retirar el servicio anterior.',
    },
```

`ai-orchestration-harness`:

```ts
    decision: {
      en: 'Two blind judges review every branch independently; a separate fixer applies only confirmed defects.',
      es: 'Dos jueces ciegos revisan cada rama de forma independiente; un corrector aparte aplica solo los defectos confirmados.',
    },
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/__tests__/career.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/career.ts src/data/__tests__/career.test.ts
git commit -m "feat(data): add one-line decision to the three chapter cases"
```

---

### Task 2: Beat timing (pure functions)

**Files:**

- Create: `src/components/home/chapterBeats.ts`
- Test: `src/components/home/__tests__/chapterBeats.test.ts`

**Interfaces:**

- Produces:
  - `BEAT_THRESHOLDS: { readonly problem: 0.08; readonly decision: 0.35; readonly result: 0.62 }`
  - `type BeatVisibility = { problem: boolean; decision: boolean; result: boolean }`
  - `ALL_BEATS_VISIBLE: BeatVisibility`
  - `chapterProgress(progress: number, chapter: { from: number; to: number }): number`
  - `beatVisibility(p: number, hasDecision: boolean): BeatVisibility`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import {
  ALL_BEATS_VISIBLE,
  BEAT_THRESHOLDS,
  beatVisibility,
  chapterProgress,
} from '../chapterBeats';

describe('chapterProgress', () => {
  const chapter = { from: 0.4, to: 0.6 };

  it('is 0 at the start and 1 at the end of the window', () => {
    expect(chapterProgress(0.4, chapter)).toBe(0);
    expect(chapterProgress(0.6, chapter)).toBe(1);
  });

  it('is linear inside the window', () => {
    expect(chapterProgress(0.5, chapter)).toBeCloseTo(0.5, 10);
  });

  it('clamps outside the window', () => {
    expect(chapterProgress(0, chapter)).toBe(0);
    expect(chapterProgress(9, chapter)).toBe(1);
  });

  it('reads non-finite progress and empty windows as 0', () => {
    expect(chapterProgress(Number.NaN, chapter)).toBe(0);
    expect(chapterProgress(Number.NEGATIVE_INFINITY, chapter)).toBe(0);
    expect(chapterProgress(0.5, { from: 0.5, to: 0.5 })).toBe(0);
    expect(chapterProgress(0.5, { from: 0.6, to: 0.4 })).toBe(0);
  });
});

describe('beatVisibility', () => {
  it('hides everything at the very start', () => {
    expect(beatVisibility(0, true)).toEqual({ problem: false, decision: false, result: false });
  });

  it('reveals the beats in order as progress grows', () => {
    expect(beatVisibility(0.2, true)).toEqual({ problem: true, decision: false, result: false });
    expect(beatVisibility(0.5, true)).toEqual({ problem: true, decision: true, result: false });
    expect(beatVisibility(0.9, true)).toEqual({ problem: true, decision: true, result: true });
  });

  it('shows a beat exactly on its threshold', () => {
    expect(beatVisibility(BEAT_THRESHOLDS.problem, true).problem).toBe(true);
    expect(beatVisibility(BEAT_THRESHOLDS.decision, true).decision).toBe(true);
    expect(beatVisibility(BEAT_THRESHOLDS.result, true).result).toBe(true);
    expect(beatVisibility(BEAT_THRESHOLDS.result - 0.001, true).result).toBe(false);
  });

  it('never shows a decision when the case has none', () => {
    expect(beatVisibility(1, false)).toEqual({ problem: true, decision: false, result: true });
  });

  it('treats non-finite progress as the start', () => {
    expect(beatVisibility(Number.NaN, true)).toEqual({
      problem: false,
      decision: false,
      result: false,
    });
  });

  it('exposes an all-visible value for reduced motion and stills', () => {
    expect(ALL_BEATS_VISIBLE).toEqual({ problem: true, decision: true, result: true });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/chapterBeats.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Write minimal implementation**

```ts
/** Where in a chapter (0..1) each beat appears. The tail after `result` holds everything visible. */
export const BEAT_THRESHOLDS = { problem: 0.08, decision: 0.35, result: 0.62 } as const;

export type BeatVisibility = { problem: boolean; decision: boolean; result: boolean };

export const ALL_BEATS_VISIBLE: BeatVisibility = { problem: true, decision: true, result: true };

/** Progress through one chapter's window, clamped to [0, 1]; invalid input or windows read as 0. */
export function chapterProgress(progress: number, chapter: { from: number; to: number }): number {
  if (!Number.isFinite(progress)) return 0;
  const span = chapter.to - chapter.from;
  if (!(span > 0)) return 0;
  return Math.min(1, Math.max(0, (progress - chapter.from) / span));
}

/** Which beats are on screen at a chapter-local progress. A case without a decision never shows one. */
export function beatVisibility(p: number, hasDecision: boolean): BeatVisibility {
  const safe = Number.isFinite(p) ? p : 0;
  return {
    problem: safe >= BEAT_THRESHOLDS.problem,
    decision: hasDecision && safe >= BEAT_THRESHOLDS.decision,
    result: safe >= BEAT_THRESHOLDS.result,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/__tests__/chapterBeats.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/home/chapterBeats.ts src/components/home/__tests__/chapterBeats.test.ts
git commit -m "feat(home): add chapter beat timing"
```

---

### Task 3: Chapter dossier selector

**Files:**

- Modify: `src/components/home/homeChapters.ts`
- Test: `src/components/home/__tests__/homeChapters.test.ts`

**Interfaces:**

- Consumes: `CaseStudy.decision` (Task 1).
- Produces:
  - `HomeChapter.supportOutcome: number | null` (index into the case's `outcomes`)
  - `type Dossier = { problem: string | null; decision: string | null; support: string | null; recap: ReadonlyArray<{ value: string; label: string }> | null }`
  - `chapterDossier(chapter: HomeChapter, locale: 'en' | 'es'): Dossier`

- [ ] **Step 1: Write the failing test**

Append to `src/components/home/__tests__/homeChapters.test.ts` (extend the import to include `chapterDossier`):

```ts
describe('chapterDossier: every line comes from career data', () => {
  const study = (id: string) => CASE_STUDIES.find((c) => c.id === id)!;

  it.each([
    ['compute', 'aws-cost-audit', 1],
    ['data', 'analytics-platform', 0],
    ['agents', 'ai-orchestration-harness', 2],
    ['delivery', 'credit-marketplace', 1],
  ])('%s reads context, decision and a supporting outcome from %s', (id, caseId, supportIndex) => {
    for (const locale of ['en', 'es'] as const) {
      const dossier = chapterDossier(byId(id), locale);
      expect(dossier.problem).toBe(study(caseId).context![locale]);
      expect(dossier.decision).toBe(study(caseId).decision?.[locale] ?? null);
      expect(dossier.support).toBe(study(caseId).outcomes[supportIndex][locale]);
      expect(dossier.recap).toBeNull();
    }
  });

  it('gives credit-marketplace no decision, so it stays a two-beat chapter', () => {
    expect(chapterDossier(byId('delivery'), 'en').decision).toBeNull();
  });

  it('gives the blueprint chapter no case content', () => {
    expect(chapterDossier(byId('blueprint'), 'en')).toEqual({
      problem: null,
      decision: null,
      support: null,
      recap: null,
    });
  });

  it('recaps the other three key facts on the last chapter, in both languages', () => {
    for (const locale of ['en', 'es'] as const) {
      expect(chapterDossier(byId('reveal'), locale).recap).toEqual(
        KEY_FACTS.slice(1).map((f) => ({ value: f.value, label: f.label[locale] }))
      );
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/homeChapters.test.ts`
Expected: FAIL (`chapterDossier` is not exported).

- [ ] **Step 3: Write minimal implementation**

In `homeChapters.ts`: add to the `HomeChapter` type, after `href: string | null;`:

```ts
/** Index into the case's `outcomes` shown as the supporting line under the figure. */
supportOutcome: number | null;
```

Replace the `HOME_CHAPTERS` array with:

```ts
export const HOME_CHAPTERS: readonly HomeChapter[] = [
  { id: 'blueprint', from: 0, to: shot(2), fact: null, href: null, supportOutcome: null },
  {
    id: 'compute',
    from: shot(2),
    to: shot(3),
    fact: { kind: 'key', index: 2 },
    href: '/projects#aws-cost-audit',
    supportOutcome: 1,
  },
  {
    id: 'data',
    from: shot(3),
    to: shot(4),
    fact: { kind: 'key', index: 3 },
    href: '/projects#analytics-platform',
    supportOutcome: 0,
  },
  {
    id: 'agents',
    from: shot(4),
    to: shot(5),
    fact: { kind: 'case', caseId: 'ai-orchestration-harness', value: '13 → 11' },
    href: '/projects#ai-orchestration-harness',
    supportOutcome: 2,
  },
  {
    id: 'delivery',
    from: shot(5),
    to: shot(6),
    fact: { kind: 'key', index: 1 },
    href: '/projects#credit-marketplace',
    supportOutcome: 1,
  },
  {
    id: 'reveal',
    from: shot(6),
    to: 1,
    fact: { kind: 'key', index: 0 },
    href: 'mailto:crisfon6@crisfon6.com',
    supportOutcome: null,
  },
];
```

Append at the end of the file:

```ts
export type Dossier = {
  problem: string | null;
  decision: string | null;
  support: string | null;
  recap: ReadonlyArray<{ value: string; label: string }> | null;
};

const EMPTY_DOSSIER: Dossier = { problem: null, decision: null, support: null, recap: null };

/** The prose beats of a chapter, read from career data. The figure itself comes from `chapterFact`. */
export function chapterDossier(chapter: HomeChapter, locale: 'en' | 'es'): Dossier {
  if (chapter.id === 'reveal') {
    return {
      ...EMPTY_DOSSIER,
      recap: KEY_FACTS.slice(1).map((fact) => ({ value: fact.value, label: fact.label[locale] })),
    };
  }
  const caseId = chapter.href?.startsWith('/projects#')
    ? chapter.href.slice('/projects#'.length)
    : null;
  const study = caseId ? CASE_STUDIES.find((c) => c.id === caseId) : undefined;
  if (!study) return EMPTY_DOSSIER;
  return {
    problem: study.context?.[locale] ?? null,
    decision: study.decision?.[locale] ?? null,
    support:
      chapter.supportOutcome === null
        ? null
        : (study.outcomes[chapter.supportOutcome]?.[locale] ?? null),
    recap: null,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/__tests__/homeChapters.test.ts`
Expected: PASS (existing tests unchanged and green)

- [ ] **Step 5: Commit**

```bash
git add src/components/home/homeChapters.ts src/components/home/__tests__/homeChapters.test.ts
git commit -m "feat(home): select chapter dossier lines from career data"
```

---

### Task 4: Render the beats in ChapterPlate

**Files:**

- Modify: `src/i18n/messages.ts` (`chapters` block in both locales, ~lines 39-69 and 348-380)
- Modify: `src/components/home/ChapterPlate.tsx`
- Modify: `src/app/globals.css` (after the `.chapter-in` rules)
- Test: create `src/components/home/__tests__/ChapterPlate.test.tsx`

**Interfaces:**

- Consumes: `beatVisibility`, `ALL_BEATS_VISIBLE` (Task 2); `chapterDossier`, `chapterFact` (Task 3).
- Produces: `ChapterPlate({ chapter, testId, localProgress }: { chapter: HomeChapter; testId: string; localProgress?: number | null })`. `null` or omitted shows every beat. Each beat is `<div data-testid="{testId}-beat-{problem|decision|result}" data-visible="true|false" class="beat">`.

- [ ] **Step 1: Write the failing test** (`src/components/home/__tests__/ChapterPlate.test.tsx`)

```tsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { ChapterPlate } from '../ChapterPlate';
import { HOME_CHAPTERS } from '../homeChapters';
import { CASE_STUDIES, KEY_FACTS } from '@/data/career';
import { messages } from '@/i18n/messages';

afterEach(() => window.localStorage.removeItem('cf6.lang'));

const chapter = (id: string) => HOME_CHAPTERS.find((c) => c.id === id)!;
const study = (id: string) => CASE_STUDIES.find((c) => c.id === id)!;

const renderPlate = (id: string, localProgress: number | null) =>
  render(
    <LanguageProvider>
      <ChapterPlate chapter={chapter(id)} testId="t" localProgress={localProgress} />
    </LanguageProvider>
  );

const visible = (beat: string) => screen.getByTestId(`t-beat-${beat}`).getAttribute('data-visible');

describe('ChapterPlate beats', () => {
  it('reveals problem, then decision, then result as chapter progress grows', () => {
    const { unmount } = renderPlate('compute', 0);
    expect([visible('problem'), visible('decision'), visible('result')]).toEqual([
      'false',
      'false',
      'false',
    ]);
    unmount();
    const second = renderPlate('compute', 0.5);
    expect([visible('problem'), visible('decision'), visible('result')]).toEqual([
      'true',
      'true',
      'false',
    ]);
    second.unmount();
    renderPlate('compute', 0.9);
    expect([visible('problem'), visible('decision'), visible('result')]).toEqual([
      'true',
      'true',
      'true',
    ]);
  });

  it('shows every beat when no local progress is given (stills, reduced motion)', () => {
    renderPlate('compute', null);
    expect([visible('problem'), visible('decision'), visible('result')]).toEqual([
      'true',
      'true',
      'true',
    ]);
  });

  it('keeps hidden beats in the DOM so the full text is always readable', () => {
    renderPlate('compute', 0);
    const context = study('aws-cost-audit').context!.en;
    expect(screen.getByTestId('t-beat-problem').textContent).toContain(context);
  });

  it('reads the problem, decision and support text from career data', () => {
    renderPlate('compute', null);
    const aws = study('aws-cost-audit');
    expect(screen.getByTestId('t-beat-problem').textContent).toContain(aws.context!.en);
    expect(screen.getByTestId('t-beat-decision').textContent).toContain(aws.decision!.en);
    expect(screen.getByTestId('t-beat-result').textContent).toContain(aws.outcomes[1].en);
  });

  it('keeps the result figure and label test ids and values', () => {
    renderPlate('compute', null);
    expect(screen.getByTestId('t-value').textContent).toBe(KEY_FACTS[2].value);
    expect(screen.getByTestId('t-label').textContent).toBe(KEY_FACTS[2].label.en);
  });

  it('renders no decision beat for a case without one', () => {
    renderPlate('delivery', null);
    expect(screen.queryByTestId('t-beat-decision')).toBeNull();
    expect(screen.getByTestId('t-beat-problem')).toBeTruthy();
    expect(screen.getByTestId('t-beat-result')).toBeTruthy();
  });

  it('speaks Spanish in labels and text, with no English leak', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    renderPlate('compute', null);
    const aws = study('aws-cost-audit');
    expect(screen.getByTestId('t-beat-problem').textContent).toContain(
      messages.es.chapters.beats.problem
    );
    expect(screen.getByTestId('t-beat-problem').textContent).toContain(aws.context!.es);
    expect(screen.getByTestId('t-beat-decision').textContent).toContain(aws.decision!.es);
    expect(screen.getByTestId('t-beat-decision').textContent).not.toContain(aws.decision!.en);
  });

  it('asks the two opening questions on the blueprint chapter, with no figure', () => {
    renderPlate('blueprint', null);
    expect(screen.getByTestId('t-beat-problem').textContent).toContain(
      messages.en.chapters.beats.whoHurts
    );
    expect(screen.getByTestId('t-beat-decision').textContent).toContain(
      messages.en.chapters.beats.whatCosts
    );
    expect(screen.queryByTestId('t-value')).toBeNull();
    expect(screen.queryByTestId('t-beat-result')).toBeNull();
  });

  it('recaps the other three key facts on the last chapter', () => {
    renderPlate('reveal', null);
    const result = screen.getByTestId('t-beat-result').textContent!;
    for (const fact of KEY_FACTS.slice(1)) {
      expect(result).toContain(fact.value);
      expect(result).toContain(fact.label.en);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/ChapterPlate.test.tsx`
Expected: FAIL (`beats` missing on messages / no beat test ids).

- [ ] **Step 3: Write the implementation**

(a) `messages.ts`, English `chapters` block, add after `hire: 'Hiring? Email me',`:

```ts
      beats: {
        problem: 'Problem',
        decision: 'Decision',
        result: 'Result',
        whoHurts: 'Who does it hurt?',
        whatCosts: 'What does it cost?',
      },
```

Spanish `chapters` block, add after `hire: '¿Contratas? Escríbeme',`:

```ts
      beats: {
        problem: 'Problema',
        decision: 'Decisión',
        result: 'Resultado',
        whoHurts: '¿A quién le duele?',
        whatCosts: '¿Cuánto cuesta?',
      },
```

(b) `globals.css`, after the `.chapter-in` reduced-motion block:

```css
/* Chapter beats: always in the DOM, revealed by a short rise-and-fade (transform + opacity only). */
.beat {
  transition:
    opacity 280ms var(--ease-out),
    transform 280ms var(--ease-out);
}
.beat[data-visible='false'] {
  opacity: 0;
  transform: translateY(10px);
}
@media (prefers-reduced-motion: reduce) {
  .beat {
    transition: none;
  }
}
```

(c) Replace `ChapterPlate.tsx` with:

```tsx
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
  children,
}: {
  id: string;
  name: 'problem' | 'decision' | 'result';
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={`${id}-beat-${name}`}
      data-visible={visible ? 'true' : 'false'}
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
}: {
  chapter: HomeChapter;
  testId: string;
  localProgress?: number | null;
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

      {isBlueprint ? (
        <>
          <Beat id={testId} name="problem" visible={show.problem}>
            <p className="font-heading text-xl text-warm-fg">{t.chapters.beats.whoHurts}</p>
          </Beat>
          <Beat id={testId} name="decision" visible={show.decision}>
            <p className="font-heading text-xl text-warm-fg">{t.chapters.beats.whatCosts}</p>
          </Beat>
        </>
      ) : null}

      {dossier.problem ? (
        <Beat id={testId} name="problem" visible={show.problem}>
          <BeatLabel>{t.chapters.beats.problem}</BeatLabel>
          <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-warm-fg">
            {dossier.problem}
          </p>
        </Beat>
      ) : null}

      {dossier.decision ? (
        <Beat id={testId} name="decision" visible={show.decision}>
          <BeatLabel>{t.chapters.beats.decision}</BeatLabel>
          <p className="mt-1 max-w-[52ch] text-[15px] font-medium leading-relaxed text-warm-fg">
            {dossier.decision}
          </p>
        </Beat>
      ) : null}

      {fact ? (
        <Beat id={testId} name="result" visible={show.result}>
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
              <p className="mt-sp-2 text-[15px] leading-relaxed text-warm-fg-muted">
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx tsc --noEmit && npx vitest run src/components/home src/i18n src/__tests__/copyVoice.test.ts`
Expected: PASS. If `HeroFilm.test.tsx` asserts on text that moved, update only the assertion and state why in the commit body.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/messages.ts src/components/home/ChapterPlate.tsx src/components/home/__tests__/ChapterPlate.test.tsx src/app/globals.css
git commit -m "feat(home): render chapters as problem, decision, result beats"
```

---

### Task 5: Drive the beats from the film scroll

**Files:**

- Modify: `src/components/home/HeroFilm.tsx` (plate block ~lines 222-236; imports)
- Test: `src/components/home/__tests__/HeroFilm.test.tsx`

**Interfaces:**

- Consumes: `chapterProgress` (Task 2); `ChapterPlate localProgress` (Task 4).
- Produces: in film mode the plate gets `localProgress`; in stills mode `StillsGrid` leaves it `null`. Chapter panels alternate sides by index.

- [ ] **Step 1: Write the failing test**

Append a `describe` to `HeroFilm.test.tsx`, reusing its existing helpers (`setEnv`, `render`, `wrap`, `scrollTo`). The film is `7 * 800 = 5600` px of travel at the test's 800px viewport:

```tsx
describe('HeroFilm: chapter beats follow the scroll', () => {
  it('reveals a chapter beat by beat as the page scrolls through its window', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    // chapter "data" spans progress 3/7..4/7 (0.4286..0.5714); 0.4286 + 0.1429 * 0.2 = ~0.4571
    scrollTo(0.4571 * 5600);
    const flag = (name: string) =>
      screen.getByTestId(`film-chapter-beat-${name}`).getAttribute('data-visible');
    expect([flag('problem'), flag('decision'), flag('result')]).toEqual(['true', 'false', 'false']);
    scrollTo(0.5 * 5600);
    expect([flag('problem'), flag('decision'), flag('result')]).toEqual(['true', 'true', 'false']);
    scrollTo(0.56 * 5600);
    expect([flag('problem'), flag('decision'), flag('result')]).toEqual(['true', 'true', 'true']);
  });

  it('shows every beat in the stills layout', () => {
    setEnv({ width: 400 });
    render(wrap(<HeroFilm />));
    for (const chapter of HOME_CHAPTERS.filter((c) => c.id === 'compute')) {
      expect(
        screen.getByTestId(`chapter-${chapter.id}-beat-result`).getAttribute('data-visible')
      ).toBe('true');
    }
  });

  it('keeps the plate inside the page column while it alternates sides', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0.5 * 5600);
    expect(screen.getByTestId('film-chapter').closest('.max-w-6xl')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/HeroFilm.test.tsx`
Expected: FAIL (`film-chapter-beat-problem` not found, or visible flags all `true`).

- [ ] **Step 3: Write the implementation**

In `HeroFilm.tsx`: add `import { chapterProgress } from './chapterBeats';` and replace the plate block with:

```tsx
{
  plate > 0 ? (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-sp-7 z-10"
      style={{ opacity: plate }}
    >
      <div
        className={`mx-auto flex max-w-6xl px-sp-5 ${
          HOME_CHAPTERS.indexOf(chapter) % 2 === 1 ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className="pointer-events-auto w-full max-w-xl">
          <ChapterPlate
            key={chapter.id}
            chapter={chapter}
            testId="film-chapter"
            localProgress={chapterProgress(progress, chapter)}
          />
        </div>
      </div>
    </div>
  ) : null;
}
```

`StillsGrid` already renders `<ChapterPlate chapter={chapter} testId=... />` with no `localProgress`, which defaults to `null` (all beats visible); leave it unchanged.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx tsc --noEmit && npx vitest run src/components/home src/__tests__`
Expected: PASS apart from the pre-existing `confidential.test.ts` failures (they need `CONFIDENTIAL_DENYLIST` and fail on files this plan does not touch).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HeroFilm.tsx src/components/home/__tests__/HeroFilm.test.tsx
git commit -m "feat(home): drive chapter beats from film scroll, alternate panel side"
```

---

### Task 6: Verify in a real browser, then run the judge loop

**Files:** none (verification only). Fix findings in the file the judge names, then re-run.

- [ ] **Step 1: Static gates**

Run: `npx prettier --write src && npx tsc --noEmit && npx eslint src && npx next build`
Expected: all clean; build succeeds.

- [ ] **Step 2: Unit and e2e**

Run: `npx vitest run src/components src/__tests__ src/i18n src/data` then `npx playwright test`
Expected: all pass except the pre-existing `confidential.test.ts`. e2e needs `npx playwright install chromium` if the browser is missing.

- [ ] **Step 3: Look at it (cannot be unit-tested)**

Start the dev server (`npx next dev -p 3417`) and, with the browser tool, scroll through chapters II to VI at 1440x900 and 1280x640 and at 375, light and dark. Confirm: panel never clips the Result or the "Read the case" link at 640px height; text over the film is legible; chapters alternate sides; beats appear in order; chapter V shows two beats; chapter I shows two questions; chapter VI shows the recap and the hiring link.

- [ ] **Step 4: Judge loop**

Dispatch the same three independent judges used for PR #28 (visual finish-gate, skeptical-CTO persona, accessibility), read-only, each on a freshly restarted server and a clean browser profile. Approve only at: visual light and dark >= 8, CTO >= 8, accessibility zero P0/P1 incl. computed contrast of every beat over the film in both themes. Fix every P0/P1 and the cheap P2s, then repeat until all three approve. Record whether the judges say the footage itself is now the limiting factor; if yes, open Phase 2 (new footage) per the spec, which requires a Higgsfield balance check and cost quote before generating.

- [ ] **Step 5: Commit any fixes and push**

```bash
git add -A
git commit -m "fix(home): address chapter dossier review findings"
git push -u origin feat/scroll-chapters
```
