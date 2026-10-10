import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { KEY_FACTS } from '@/data/career';
import { messages } from '@/i18n/messages';
import { HeroFilm } from '../HeroFilm';
import { HERO_FILM_ASSETS, FILM_TRAVEL_VH } from '../heroFilmAssets';
import { VEIL_MIN, VEIL_MAX, VEIL_RAMP_VH } from '../heroFilmLogic';
import { HOME_CHAPTERS, chapterFact } from '../homeChapters';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;

type Env = { width: number; reduced?: boolean; saveData?: boolean };

function setEnv({ width, reduced = false, saveData = false }: Env) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true });
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
  Object.defineProperty(navigator, 'connection', {
    value: { saveData },
    configurable: true,
  });
}

let ioCallback: IntersectionObserverCallback | null = null;
class FakeIO {
  constructor(cb: IntersectionObserverCallback) {
    ioCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

function stageNearViewport() {
  act(() => {
    ioCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

beforeEach(() => {
  ioCallback = null;
  vi.stubGlobal('IntersectionObserver', FakeIO);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.localStorage.removeItem('cf6.lang');
});

describe('HeroFilm: stills mode', () => {
  it('on a small screen tells the six chapters with the poster and five stills, and no video', () => {
    setEnv({ width: 390 });
    const { container } = render(wrap(<HeroFilm />));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelectorAll('img').length).toBe(7);
    expect(container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`)).toBeTruthy();
    for (const still of HERO_FILM_ASSETS.stills) {
      expect(container.querySelector(`img[src="${still.src}"]`), still.id).toBeTruthy();
    }
    for (const chapter of HOME_CHAPTERS) {
      expect(screen.getByTestId(`chapter-${chapter.id}`), chapter.id).toBeTruthy();
    }
  });

  it('puts a faint poster behind the first screen so small screens open on the film, not flat cream', () => {
    setEnv({ width: 390 });
    const { container } = render(wrap(<HeroFilm />));
    const backdrop = screen.getByTestId('film-poster-backdrop');
    expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    expect(backdrop.className).toMatch(/pointer-events-none/);
    const img = backdrop.querySelector('img')!;
    expect(img.getAttribute('src')).toBe(HERO_FILM_ASSETS.poster);
    expect(img.getAttribute('alt')).toBe('');
    expect(container.querySelector('video')).toBeNull();
  });

  it('shows each chapter title, claim and verified figure in English', () => {
    setEnv({ width: 390 });
    render(wrap(<HeroFilm />));
    for (const chapter of HOME_CHAPTERS) {
      const plate = screen.getByTestId(`chapter-${chapter.id}`);
      const copy = messages.en.chapters.items[chapter.id];
      expect(plate.textContent).toContain(copy.title);
      expect(plate.textContent).toContain(copy.claim);
      const fact = chapterFact(chapter, 'en');
      if (fact) {
        expect(screen.getByTestId(`chapter-${chapter.id}-value`).textContent).toBe(fact.value);
        expect(screen.getByTestId(`chapter-${chapter.id}-label`).textContent).toBe(fact.label);
      } else {
        expect(screen.queryByTestId(`chapter-${chapter.id}-value`)).toBeNull();
      }
    }
  });

  it('shows the chapters in Spanish when the language is ES', () => {
    setEnv({ width: 390 });
    window.localStorage.setItem('cf6.lang', 'es');
    render(wrap(<HeroFilm />));
    for (const chapter of HOME_CHAPTERS) {
      const plate = screen.getByTestId(`chapter-${chapter.id}`);
      expect(plate.textContent).toContain(messages.es.chapters.items[chapter.id].title);
      const fact = chapterFact(chapter, 'es');
      if (fact) {
        expect(screen.getByTestId(`chapter-${chapter.id}-label`).textContent).toBe(fact.label);
      }
    }
  });

  it('links each chapter to its case and the last one to the hiring email', () => {
    setEnv({ width: 390 });
    render(wrap(<HeroFilm />));
    const href = (id: string) =>
      screen.getByTestId(`chapter-${id}`).querySelector('a')?.getAttribute('href');
    expect(href('compute')).toBe('/projects#aws-cost-audit');
    expect(href('reveal')).toBe('mailto:crisfon6@crisfon6.com');
    expect(screen.getByTestId('chapter-reveal').textContent).toContain(messages.en.chapters.hire);
    expect(href('blueprint')).toBeUndefined();
  });

  it('is used when the user prefers reduced motion, even on a wide screen', () => {
    setEnv({ width: 1440, reduced: true });
    const { container } = render(wrap(<HeroFilm />));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(container.querySelector('video')).toBeNull();
  });

  it('is used when the data saver hint is on', () => {
    setEnv({ width: 1440, saveData: true });
    const { container } = render(wrap(<HeroFilm />));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(container.querySelector('video')).toBeNull();
  });

  it('keeps all media decorative: empty alt and aria-hidden', () => {
    setEnv({ width: 390 });
    const { container } = render(wrap(<HeroFilm />));
    for (const img of Array.from(container.querySelectorAll('img'))) {
      expect(img.getAttribute('alt')).toBe('');
      expect(img.getAttribute('aria-hidden')).toBe('true');
    }
  });
});

describe('HeroFilm: film mode', () => {
  it('requests nothing until the stage nears the viewport', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm />));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('film');
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('video')?.getAttribute('src')).toBeNull();
  });

  it('loads the poster first and assigns the video source only after the poster loaded', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm />));
    stageNearViewport();
    const poster = container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`);
    expect(poster).toBeTruthy();
    expect(container.querySelector('video')?.getAttribute('src')).toBeNull();
    fireEvent.load(poster!);
    expect(container.querySelector('video')?.getAttribute('src')).toBe(HERO_FILM_ASSETS.video);
  });

  it('keeps the poster and video decorative', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm />));
    stageNearViewport();
    const poster = container.querySelector('img')!;
    expect(poster.getAttribute('alt')).toBe('');
    expect(poster.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelector('video')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('shows the chapter for the scroll position, with its verified figure', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    stageNearViewport();
    // viewport 800px, 7 screens of travel: 5600px of scroll covers the whole film
    scrollTo(0.5 * 5600); // shot 4: data
    expect(screen.getByTestId('film-chapter').getAttribute('data-chapter')).toBe('data');
    expect(screen.getByTestId('film-chapter-value').textContent).toBe(KEY_FACTS[3].value);

    scrollTo(0.1 * 5600); // shot 1: blueprint, no figure
    expect(screen.getByTestId('film-chapter').getAttribute('data-chapter')).toBe('blueprint');
    expect(screen.queryByTestId('film-chapter-value')).toBeNull();

    scrollTo(0.93 * 5600); // shot 7: reveal
    expect(screen.getByTestId('film-chapter').getAttribute('data-chapter')).toBe('reveal');
    expect(screen.getByTestId('film-chapter-value').textContent).toBe(KEY_FACTS[0].value);
  });

  it('removes the chapter plate once the film is over so it never covers later sections', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(5600 + 800);
    expect(screen.queryByTestId('film-chapter')).toBeNull();
  });

  it('does not add the still poster backdrop in film mode: the film itself is the backdrop', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    expect(screen.queryByTestId('film-poster-backdrop')).toBeNull();
  });

  it('is the page background: a fixed, full-viewport layer behind the content', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    const backdrop = screen.getByTestId('film-backdrop');
    expect(backdrop.className).toMatch(/\bfixed\b/);
    expect(backdrop.className).toMatch(/\binset-0\b/);
    expect(backdrop.className).toMatch(/-z-10/);
    expect(backdrop.querySelector('video')).toBeTruthy();
  });

  it('reserves the whole film travel so no later section reaches the screen before the film ends', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    expect(screen.getByTestId('hero-film').style.height).toBe(`${FILM_TRAVEL_VH * 100}vh`);
  });

  it('covers the film with the page colour only after the film has played', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MIN, 5);
    scrollTo(5600 + VEIL_RAMP_VH * 800);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MAX, 5);
  });

  it('shades the left side for the hero text at the top and removes it by one screen down', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(1);
    scrollTo(800);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(0);
  });

  it('lets each plate take the height of its content, anchored to the bottom, with no dead space', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0.5 * 5600);
    const wrapper = screen.getByTestId('film-chapter').parentElement!;
    expect(wrapper.className).not.toMatch(/min-h/);
  });

  it('aligns the chapter plate to the page column', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0.5 * 5600);
    const plate = screen.getByTestId('film-chapter');
    expect(plate.className).toMatch(/\bslab\b/);
    expect(plate.closest('.max-w-6xl')).toBeTruthy();
  });
});

describe('HeroFilm: server render', () => {
  it('renders a pending shell with a no-JS stills fallback and no video or poster request', () => {
    setEnv({ width: 1440 });
    const html = renderToString(wrap(<HeroFilm />));
    expect(html).toContain('data-mode="pending"');
    expect(html).toContain('<noscript>');
    expect(html).toContain(HERO_FILM_ASSETS.stills[0].src);
    expect(html).not.toContain('<video');
  });
});

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

describe('HeroFilm: the chapter story is reachable without the visual panel', () => {
  it('renders all six chapters for assistive tech at any scroll position, with no links', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0);
    for (const chapter of HOME_CHAPTERS) {
      const copy = screen.getByTestId(`sr-chapter-${chapter.id}`);
      expect(copy.textContent).toContain(messages.en.chapters.items[chapter.id].title);
      expect(copy.querySelector('a')).toBeNull();
    }
    expect(screen.getByTestId('film-chapters-sr').className).toContain('sr-only');
  });

  it('hides the visual panel from assistive tech and keeps its link out of the tab order', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0.5 * 5600);
    const plate = screen.getByTestId('film-chapter');
    expect(plate.closest('[aria-hidden="true"]')).toBeTruthy();
    expect(plate.querySelector('a')!.getAttribute('tabindex')).toBe('-1');
  });

  it('stops the nearly invisible panel from catching clicks while it fades', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0.5 * 800); // plate opacity about 0.125
    expect(screen.getByTestId('film-chapter').parentElement!.className).toContain(
      'pointer-events-none'
    );
    scrollTo(0.5 * 5600);
    expect(screen.getByTestId('film-chapter').parentElement!.className).toContain(
      'pointer-events-auto'
    );
  });
});
