import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
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

  it('shows each card title, tag and first outcome from career.ts (EN)', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const cards = screen.getAllByTestId('case-card');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      expect(cards[i].textContent).toContain(cs.title.en);
      expect(cards[i].textContent).toContain(cs.tag);
      expect(cards[i].textContent).toContain(cs.outcomes[0]?.en ?? cs.status.en);
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

  it('does not use the low-contrast accent text color for the result labels', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    for (const card of screen.getAllByTestId('case-card')) {
      expect(card.querySelectorAll('.text-accent').length).toBe(0);
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
