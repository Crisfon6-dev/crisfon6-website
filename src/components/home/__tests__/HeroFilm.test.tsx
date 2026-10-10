import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { useState, type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { HeroFilm } from '../HeroFilm';
import { HERO_FILM_ASSETS, HERO_FILM_ASSETS_NIGHT } from '../heroFilmAssets';
import { VEIL_MIN, VEIL_MAX, VEIL_RAMP_VH } from '../heroFilmLogic';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const kid = <p data-testid="kid">introduction</p>;
const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;
const wrapDark = (node: ReactNode) => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <LanguageProvider>{node}</LanguageProvider>
  </ThemeProvider>
);

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
  Object.defineProperty(navigator, 'connection', { value: { saveData }, configurable: true });
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

let roCallback: (() => void) | null = null;
class FakeRO {
  constructor(cb: () => void) {
    roCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
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

const realOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')!;
let wrapperHeight = 0;
function setWrapperHeight(height: number) {
  wrapperHeight = height;
}

beforeEach(() => {
  ioCallback = null;
  roCallback = null;
  wrapperHeight = 0;
  vi.stubGlobal('IntersectionObserver', FakeIO);
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return (this as HTMLElement).getAttribute('data-testid') === 'hero-film' ? wrapperHeight : 0;
    },
  });
  scrollTo(0);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', realOffsetHeight);
  window.localStorage.removeItem('cf6.lang');
});

describe('HeroFilm: wraps the introduction', () => {
  it.each([
    ['film', 1440, 'film'],
    ['stills (small screen)', 390, 'stills'],
  ])('renders its children in %s mode', (_name, width, mode) => {
    setEnv({ width });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe(mode);
    expect(screen.getByTestId('kid')).toBeTruthy();
  });

  it('server-renders the children with no media and no empty film spacer', () => {
    setEnv({ width: 1440 });
    const html = renderToString(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(html).toContain('data-mode="pending"');
    expect(html).toContain('introduction');
    expect(html).not.toContain('<video');
    expect(html).not.toContain('<img');
    expect(html).not.toMatch(/height:\s*\d+vh/);
  });

  it('keeps the children mounted when the mode changes, so their state survives', () => {
    setEnv({ width: 1440 });
    function Counter() {
      const [n, setN] = useState(0);
      return (
        <button data-testid="counter" onClick={() => setN(n + 1)}>
          {n}
        </button>
      );
    }
    render(
      wrap(
        <HeroFilm>
          <Counter />
        </HeroFilm>
      )
    );
    fireEvent.click(screen.getByTestId('counter'));
    expect(screen.getByTestId('counter').textContent).toBe('1');
    setEnv({ width: 390 });
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(screen.getByTestId('counter').textContent).toBe('1');
  });
});

describe('HeroFilm: film mode', () => {
  it('requests nothing until the stage nears the viewport', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('video')?.getAttribute('src')).toBeNull();
  });

  it('loads the poster first and assigns the video source only after the poster loaded', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    stageNearViewport();
    const poster = container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`);
    expect(poster).toBeTruthy();
    expect(container.querySelector('video')?.getAttribute('src')).toBeNull();
    fireEvent.load(poster!);
    expect(container.querySelector('video')?.getAttribute('src')).toBe(HERO_FILM_ASSETS.video);
  });

  it('keeps the poster and video decorative', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    stageNearViewport();
    const poster = container.querySelector('img')!;
    expect(poster.getAttribute('alt')).toBe('');
    expect(poster.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelector('video')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('is the page background: a fixed, full-viewport layer behind the content', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    const backdrop = screen.getByTestId('film-backdrop');
    expect(backdrop.className).toMatch(/\bfixed\b/);
    expect(backdrop.className).toMatch(/\binset-0\b/);
    expect(backdrop.className).toMatch(/-z-10/);
    expect(screen.queryByTestId('film-poster-backdrop')).toBeNull();
  });

  it('does not reserve a fixed number of screens: the wrapper is as tall as its content', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('style') ?? '').not.toMatch(/height/);
  });

  it('covers the film with the page colour only after the wrapper has been scrolled through', () => {
    setEnv({ width: 1440 });
    setWrapperHeight(2400); // 800px viewport: the film plays over 1600px of scroll
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    scrollTo(0);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MIN, 5);
    scrollTo(1600);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MIN, 5);
    scrollTo(1600 + VEIL_RAMP_VH * 800);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MAX, 5);
  });

  it('re-reads the travel when the content height changes (fonts, language, images)', () => {
    setEnv({ width: 1440 });
    vi.stubGlobal('ResizeObserver', FakeRO);
    setWrapperHeight(2400);
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    scrollTo(1600 + VEIL_RAMP_VH * 800);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MAX, 5);
    setWrapperHeight(4000); // taller content: the same scroll position is now mid-film
    act(() => roCallback?.());
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeLessThan(VEIL_MAX);
  });

  it('does not throw with no measurable height or no ResizeObserver, and reads the first frame', () => {
    setEnv({ width: 1440 });
    setWrapperHeight(0);
    expect(() => render(wrap(<HeroFilm>{kid}</HeroFilm>))).not.toThrow();
    scrollTo(500);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeGreaterThanOrEqual(VEIL_MIN);
  });

  it('shades the left side for the hero text while it is on screen, then fades it out', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    scrollTo(0);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(1);
    scrollTo(0.3 * 800);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(1);
    scrollTo(800);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(0);
  });
});

describe('HeroFilm: stills mode', () => {
  it('puts a faint poster behind the first screen and requests no video', () => {
    setEnv({ width: 390 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    const backdrop = screen.getByTestId('film-poster-backdrop');
    expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    expect(backdrop.className).toMatch(/pointer-events-none/);
    const img = backdrop.querySelector('img')!;
    expect(img.getAttribute('src')).toBe(HERO_FILM_ASSETS.poster);
    expect(img.getAttribute('alt')).toBe('');
    expect(container.querySelector('video')).toBeNull();
  });

  it('also stills with reduced motion on a wide screen, and with data saver', () => {
    setEnv({ width: 1440, reduced: true });
    const first = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(first.container.querySelector('video')).toBeNull();
    first.unmount();
    setEnv({ width: 1440, saveData: true });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
  });
});

describe('HeroFilm: night footage in dark mode', () => {
  it('loads the night poster, then the night video, and does not dim it with a CSS filter', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrapDark(<HeroFilm>{kid}</HeroFilm>));
    stageNearViewport();
    const poster = container.querySelector(`img[src="${HERO_FILM_ASSETS_NIGHT.poster}"]`)!;
    expect(poster).toBeTruthy();
    expect(container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`)).toBeNull();
    expect(poster.className).not.toContain('brightness');
    fireEvent.load(poster);
    const video = container.querySelector('video')!;
    expect(video.getAttribute('src')).toBe(HERO_FILM_ASSETS_NIGHT.video);
    expect(video.className).not.toContain('brightness');
  });

  it('uses the night poster, lowered, as the stills backdrop', () => {
    setEnv({ width: 390 });
    render(wrapDark(<HeroFilm>{kid}</HeroFilm>));
    const img = screen.getByTestId('film-poster-backdrop').querySelector('img')!;
    expect(img.getAttribute('src')).toBe(HERO_FILM_ASSETS_NIGHT.poster);
    expect(img.className).toContain('dark:opacity-35');
  });
});
