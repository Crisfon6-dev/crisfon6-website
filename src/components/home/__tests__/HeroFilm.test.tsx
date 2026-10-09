import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { KEY_FACTS } from '@/data/career';
import { HeroFilm } from '../HeroFilm';
import { HERO_FILM_ASSETS, FILM_TRAVEL_VH } from '../heroFilmAssets';
import { VEIL_MIN, VEIL_MAX, VEIL_RAMP_VH } from '../heroFilmLogic';

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

const FACT_FOR_STILL = { compute: 2, data: 3, delivery: 1, reveal: 0 } as const;

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
  it('on a small screen shows the poster and four captioned stills, and no video', () => {
    setEnv({ width: 390 });
    const { container } = render(wrap(<HeroFilm />));
    const stage = screen.getByTestId('hero-film');
    expect(stage.getAttribute('data-mode')).toBe('stills');
    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelectorAll('img').length).toBe(5);
    expect(container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`)).toBeTruthy();
    for (const still of HERO_FILM_ASSETS.stills) {
      expect(container.querySelector(`img[src="${still.src}"]`), still.id).toBeTruthy();
    }
  });

  it('captions each still with exactly its KEY_FACTS value and label (EN)', () => {
    setEnv({ width: 390 });
    render(wrap(<HeroFilm />));
    for (const still of HERO_FILM_ASSETS.stills) {
      const fact = KEY_FACTS[FACT_FOR_STILL[still.id]];
      const caption = screen.getByTestId(`still-caption-${still.id}`);
      expect(caption.textContent).toContain(fact.value);
      expect(caption.textContent).toContain(fact.label.en);
    }
  });

  it('captions each still in Spanish when the language is ES', () => {
    setEnv({ width: 390 });
    window.localStorage.setItem('cf6.lang', 'es');
    render(wrap(<HeroFilm />));
    for (const still of HERO_FILM_ASSETS.stills) {
      const fact = KEY_FACTS[FACT_FOR_STILL[still.id]];
      expect(screen.getByTestId(`still-caption-${still.id}`).textContent).toContain(fact.label.es);
    }
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

  it('shows the verified overlay for the shot at the scroll position and nothing in gaps', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    stageNearViewport();
    // viewport 800px, 7 screens of travel: 5600px of scroll covers the whole film
    const at = (progress: number) => {
      scrollTo(progress * 5600);
    };

    at(0.5); // shot 4 (data): 30x
    expect(screen.getByTestId('film-overlay').textContent).toContain(KEY_FACTS[3].value);

    at(0.1); // shot 1: no overlay
    expect(screen.queryByTestId('film-overlay')).toBeNull();

    at(0.93); // shot 7 (reveal): 5+
    expect(screen.getByTestId('film-overlay').textContent).toContain(KEY_FACTS[0].value);
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

  it('shows overlay figures as page typography, not as a card', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm />));
    scrollTo(0.5 * 5600);
    const overlay = screen.getByTestId('film-overlay');
    expect(overlay.outerHTML).not.toMatch(/backdrop-blur|bg-warm-bg\/90|rounded-sp-lg/);
    expect(overlay.querySelector('.max-w-6xl')).toBeTruthy();
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
