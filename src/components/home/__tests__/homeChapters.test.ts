import { describe, it, expect } from 'vitest';
import { CASE_STUDIES, KEY_FACTS } from '@/data/career';
import { messages } from '@/i18n/messages';
import { HOME_CHAPTERS, activeChapter, chapterFact } from '../homeChapters';

const byId = (id: string) => HOME_CHAPTERS.find((chapter) => chapter.id === id)!;

describe('HOME_CHAPTERS: the film as six chapters', () => {
  it('has six chapters in story order', () => {
    expect(HOME_CHAPTERS.map((chapter) => chapter.id)).toEqual([
      'blueprint',
      'compute',
      'data',
      'agents',
      'delivery',
      'reveal',
    ]);
  });

  it('covers the whole film with contiguous windows, no gaps and no overlaps', () => {
    expect(HOME_CHAPTERS[0].from).toBe(0);
    expect(HOME_CHAPTERS[HOME_CHAPTERS.length - 1].to).toBe(1);
    for (let i = 1; i < HOME_CHAPTERS.length; i += 1) {
      expect(HOME_CHAPTERS[i].from).toBeCloseTo(HOME_CHAPTERS[i - 1].to, 10);
    }
  });

  it('follows the film shots: the blueprint chapter holds shots 1 and 2, the rest one shot each', () => {
    expect(byId('blueprint').to).toBeCloseTo(2 / 7, 10);
    expect(byId('compute').from).toBeCloseTo(2 / 7, 10);
    expect(byId('reveal').from).toBeCloseTo(6 / 7, 10);
  });
});

describe('activeChapter', () => {
  it('returns the chapter whose window holds the progress', () => {
    expect(activeChapter(0).id).toBe('blueprint');
    expect(activeChapter(0.2).id).toBe('blueprint');
    expect(activeChapter(0.35).id).toBe('compute');
    expect(activeChapter(0.5).id).toBe('data');
    expect(activeChapter(0.65).id).toBe('agents');
    expect(activeChapter(0.8).id).toBe('delivery');
    expect(activeChapter(0.93).id).toBe('reveal');
  });

  it('keeps the last chapter at progress 1 and clamps out-of-range or invalid progress', () => {
    expect(activeChapter(1).id).toBe('reveal');
    expect(activeChapter(7).id).toBe('reveal');
    expect(activeChapter(-3).id).toBe('blueprint');
    expect(activeChapter(Number.NaN).id).toBe('blueprint');
  });
});

describe('chapterFact: every figure comes from career data, never from this file', () => {
  it.each([
    ['compute', 2],
    ['data', 3],
    ['delivery', 1],
    ['reveal', 0],
  ])('%s shows exactly the KEY_FACTS entry %i in both languages', (id, index) => {
    for (const locale of ['en', 'es'] as const) {
      expect(chapterFact(byId(id), locale)).toEqual({
        value: KEY_FACTS[index].value,
        label: KEY_FACTS[index].label[locale],
      });
    }
  });

  it('shows the agents result straight from the case study outcome', () => {
    const outcome = CASE_STUDIES.find((c) => c.id === 'ai-orchestration-harness')!.outcomes[0];
    for (const locale of ['en', 'es'] as const) {
      const fact = chapterFact(byId('agents'), locale)!;
      expect(fact.label).toBe(outcome[locale]);
      expect(fact.value).toBe('13 → 11');
    }
  });

  it('has no figure in the blueprint chapter', () => {
    expect(chapterFact(byId('blueprint'), 'en')).toBeNull();
  });
});

describe('chapter hand-offs', () => {
  it('points every case chapter at a case study that exists', () => {
    for (const id of ['compute', 'data', 'agents', 'delivery']) {
      const href = byId(id).href!;
      expect(href).toMatch(/^\/projects#/);
      expect(CASE_STUDIES.some((c) => c.id === href.replace('/projects#', ''))).toBe(true);
    }
  });

  it('sends the last chapter to the conversion page and the first to nowhere', () => {
    expect(byId('reveal').href).toBe('/work-with-me');
    expect(byId('blueprint').href).toBeNull();
  });

  it('maps each figure to the case that actually contains it', () => {
    expect(byId('compute').href).toBe('/projects#aws-cost-audit');
    expect(byId('data').href).toBe('/projects#analytics-platform');
    expect(byId('agents').href).toBe('/projects#ai-orchestration-harness');
    expect(byId('delivery').href).toBe('/projects#credit-marketplace');
  });
});

describe('chapter copy', () => {
  it.each(['en', 'es'] as const)('exists for every chapter in %s', (locale) => {
    const copy = messages[locale].chapters;
    for (const chapter of HOME_CHAPTERS) {
      const entry = copy.items[chapter.id];
      expect(entry.title.length, `${locale} ${chapter.id} title`).toBeGreaterThan(0);
      expect(entry.claim.length, `${locale} ${chapter.id} claim`).toBeGreaterThan(0);
    }
    expect(copy.seeCase.length).toBeGreaterThan(0);
  });

  it('keeps every English claim short enough to read in one breath', () => {
    for (const chapter of HOME_CHAPTERS) {
      const words = messages.en.chapters.items[chapter.id].claim.split(/\s+/).length;
      expect(words, chapter.id).toBeLessThanOrEqual(14);
    }
  });

  it('puts no digits in any claim: figures only ever come from the fact line', () => {
    for (const locale of ['en', 'es'] as const) {
      for (const chapter of HOME_CHAPTERS) {
        expect(
          messages[locale].chapters.items[chapter.id].claim,
          `${locale} ${chapter.id}`
        ).not.toMatch(/\d/);
      }
    }
  });
});
