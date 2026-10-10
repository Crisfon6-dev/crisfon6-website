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

const renderPlate = (
  id: string,
  localProgress: number | null,
  extra: { compact?: boolean; showLink?: boolean; linkFocusable?: boolean } = {}
) =>
  render(
    <LanguageProvider>
      <ChapterPlate chapter={chapter(id)} testId="t" localProgress={localProgress} {...extra} />
    </LanguageProvider>
  );

const visible = (beat: string) => screen.getByTestId(`t-beat-${beat}`).getAttribute('data-visible');

describe('ChapterPlate beats', () => {
  it('reveals problem, then decision, then result as chapter progress grows', () => {
    const { unmount } = renderPlate('compute', 0);
    expect([visible('problem'), visible('decision'), visible('result')]).toEqual([
      'true',
      'false',
      'false',
    ]);
    unmount();
    const second = renderPlate('compute', 0.4);
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

describe('ChapterPlate on short viewports', () => {
  it('drops the claim and the supporting line first when compact, so the film panel fits under the nav', () => {
    renderPlate('compute', null, { compact: true });
    const claim = screen.getByText(messages.en.chapters.items.compute.claim);
    const support = screen.getByText(study('aws-cost-audit').outcomes[1].en);
    expect(claim.className).toContain('[@media(max-height:760px)]:hidden');
    expect(support.className).toContain('[@media(max-height:760px)]:hidden');
  });

  it('keeps the claim and the supporting line in the stills layout, which flows and never needs the cut', () => {
    renderPlate('compute', null);
    const claim = screen.getByText(messages.en.chapters.items.compute.claim);
    const support = screen.getByText(study('aws-cost-audit').outcomes[1].en);
    expect(claim.className).not.toContain('max-height');
    expect(support.className).not.toContain('max-height');
  });
});

describe('ChapterPlate reveal chapter and links', () => {
  it('shows the last chapter result immediately, since it has no problem or decision to wait for', () => {
    renderPlate('reveal', 0);
    expect(visible('result')).toBe('true');
  });

  it('can omit the link, for the screen-reader-only copy of the story', () => {
    renderPlate('compute', null, { showLink: false });
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('can take its link out of the tab order, for the visual-only film panel', () => {
    renderPlate('compute', null, { linkFocusable: false });
    expect(screen.getByRole('link').getAttribute('tabindex')).toBe('-1');
  });

  it('keeps the link focusable by default', () => {
    renderPlate('compute', null);
    expect(screen.getByRole('link').getAttribute('tabindex')).toBeNull();
  });
});

describe('ChapterPlate unrevealed beats', () => {
  it('collapses hidden beats in the film panel, so the card builds up instead of showing a void', () => {
    renderPlate('compute', 0, { compact: true });
    for (const beat of ['problem', 'decision', 'result']) {
      expect(screen.getByTestId(`t-beat-${beat}`).getAttribute('data-collapse'), beat).toBe('true');
    }
  });

  it('does not collapse beats in the stills layout, where everything is visible anyway', () => {
    renderPlate('compute', null);
    for (const beat of ['problem', 'decision', 'result']) {
      expect(screen.getByTestId(`t-beat-${beat}`).getAttribute('data-collapse'), beat).toBeNull();
    }
  });
});
