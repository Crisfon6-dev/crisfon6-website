import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { messages } from '@/i18n/messages';
import { CASE_STUDIES } from '@/data/career';
import { FeaturedCases } from '../FeaturedCases';
import { chooseCasesLayout, CASES_MIN_WIDTH } from '../casesLayout';
import { FEATURED_IDS } from '../featuredCaseData';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;

function setEnv(width: number, reduced = false) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true, writable: true });
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduced : false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

function scrollPinned(section: HTMLElement, progress: number, height = 2250) {
  const travel = height - 900;
  vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
    top: -progress * travel,
    height,
    bottom: height - progress * travel,
    left: 0,
    right: 1440,
    width: 1440,
    x: 0,
    y: -progress * travel,
    toJSON: () => ({}),
  });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.removeItem('cf6.lang');
});

describe('chooseCasesLayout', () => {
  it('uses the horizontal track from 1024px up with motion allowed', () => {
    expect(CASES_MIN_WIDTH).toBe(1024);
    expect(chooseCasesLayout({ width: 1024, reducedMotion: false })).toBe('track');
    expect(chooseCasesLayout({ width: 1023, reducedMotion: false })).toBe('grid');
  });

  it('uses the grid for reduced motion at any width', () => {
    expect(chooseCasesLayout({ width: 1920, reducedMotion: true })).toBe('grid');
  });
});

describe('FeaturedCases: track layout (desktop, motion allowed)', () => {
  it('renders the four featured case studies as cards in one horizontal track, in order', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    expect(screen.queryByTestId('featured-projects')).toBeNull();
    const cards = screen.getAllByTestId('case-card');
    expect(cards.map((card) => card.getAttribute('href'))).toEqual(
      FEATURED_IDS.map((id) => `/projects#${id}`)
    );
  });

  it('shows each card title and tag from career.ts (EN); the outcome lives in the case page', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const cards = screen.getAllByTestId('case-card');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      expect(cards[i].textContent).toContain(cs.title.en);
      expect(cards[i].textContent).toContain(cs.tag);
    });
  });

  it('shows the Spanish titles when the language is ES', () => {
    setEnv(1440);
    window.localStorage.setItem('cf6.lang', 'es');
    render(wrap(<FeaturedCases />));
    const cards = screen.getAllByTestId('case-card');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      expect(cards[i].textContent).toContain(cs.title.es);
    });
  });

  it('hands off with a read-the-case cue and repeats no figure from the chapters', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const cards = screen.getAllByTestId('case-card');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      expect(cards[i].textContent).toContain(messages.en.cta.seeCase);
      expect(cards[i].textContent).not.toContain(cs.outcomes[0].en);
    });
  });

  it("draws the cards as slabs, the film's glass-and-thickness surface", () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    for (const card of screen.getAllByTestId('case-card')) {
      expect(card.className).toMatch(/\bslab\b/);
    }
  });

  it('does not use the low-contrast accent text color for the result labels', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    for (const card of screen.getAllByTestId('case-card')) {
      expect(card.querySelectorAll('.text-accent-text').length).toBe(0);
    }
  });

  it('fades the heading out as it pans away, so no half-clipped words slide under the spine', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const section = screen.getByTestId('horizontal-cases');
    const intro = screen.getByTestId('cases-intro');
    scrollPinned(section, 0);
    expect(Number(intro.style.opacity)).toBe(1);
    scrollPinned(section, 0.5);
    expect(Number(intro.style.opacity)).toBe(0);
  });

  it('draws tall cards so the pinned screen is not two empty bands around a thin strip', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    for (const card of screen.getAllByTestId('case-card')) {
      expect(card.className).toMatch(/min-h-\[26rem\]/);
    }
  });

  it('maps the pinned scroll progress linearly to the track position', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const section = screen.getByTestId('horizontal-cases');
    const track = screen.getByTestId('cases-track');
    scrollPinned(section, 0);
    expect(track.style.getPropertyValue('--cases-progress')).toBe('0');
    scrollPinned(section, 0.5);
    expect(track.style.getPropertyValue('--cases-progress')).toBe('0.5');
    scrollPinned(section, 1);
    expect(track.style.getPropertyValue('--cases-progress')).toBe('1');
  });
});

describe('FeaturedCases: fallback to the existing vertical grid', () => {
  it('on screens narrower than 1024px', () => {
    setEnv(800);
    render(wrap(<FeaturedCases />));
    expect(screen.getByTestId('featured-projects')).toBeTruthy();
    expect(screen.queryByTestId('horizontal-cases')).toBeNull();
  });

  it('with reduced motion', () => {
    setEnv(1440, true);
    render(wrap(<FeaturedCases />));
    expect(screen.getByTestId('featured-projects')).toBeTruthy();
    expect(screen.queryByTestId('horizontal-cases')).toBeNull();
  });

  it('keeps every card linked to /projects#id in the grid too', () => {
    setEnv(800);
    const { container } = render(wrap(<FeaturedCases />));
    for (const id of FEATURED_IDS) {
      expect(container.querySelector(`a[href="/projects#${id}"]`), id).toBeTruthy();
    }
  });

  it('is what the server renders, so no-JS visitors get the grid', () => {
    const html = renderToString(wrap(<FeaturedCases />));
    expect(html).toContain('data-testid="featured-projects"');
    expect(html).not.toContain('horizontal-cases');
  });
});

describe('decision line on the cards', () => {
  it('shows it on a track card that has one and renders no empty element on one that does not', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const cards = screen.getAllByTestId('case-card');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      const line = cards[i].querySelector('[data-testid="case-decision"]');
      if (cs.decision) expect(line?.textContent, id).toBe(cs.decision.en);
      else expect(line, id).toBeNull();
    });
  });

  it('does the same in the vertical grid layout', () => {
    setEnv(800);
    render(wrap(<FeaturedCases />));
    const items = screen.getByTestId('featured-projects').querySelectorAll('li');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      const line = items[i].querySelector('[data-testid="case-decision"]');
      if (cs.decision) expect(line?.textContent, id).toBe(cs.decision.en);
      else expect(line, id).toBeNull();
    });
  });

  it('speaks Spanish in the decision line', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const aws = CASE_STUDIES.find((c) => c.id === 'aws-cost-audit')!;
    const idx = FEATURED_IDS.indexOf('aws-cost-audit');
    const cards = screen.getAllByTestId('case-card');
    expect(cards[idx].querySelector('[data-testid="case-decision"]')?.textContent).toBe(
      aws.decision!.es
    );
  });
});
