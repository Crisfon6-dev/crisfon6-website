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

describe('ChapterPlate on short viewports', () => {
  it('drops the claim and the supporting line first, so the panel fits under the nav', () => {
    renderPlate('compute', null);
    const claim = screen.getByText(messages.en.chapters.items.compute.claim);
    const support = screen.getByText(study('aws-cost-audit').outcomes[1].en);
    expect(claim.className).toContain('[@media(max-height:760px)]:hidden');
    expect(support.className).toContain('[@media(max-height:760px)]:hidden');
  });
});
