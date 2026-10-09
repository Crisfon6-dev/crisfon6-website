import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { PRINCIPLES } from '@/data/career';
import { PrincipleStatement, PRINCIPLE_DIM_OPACITY } from '../PrincipleStatement';

const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;
const normalise = (text: string | null) => (text ?? '').replace(/\s+/g, ' ').trim();

function stubMatchMedia(reduced: boolean) {
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

function scrollTo(section: HTMLElement, top: number, height = 900) {
  vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
    top,
    height,
    bottom: top + height,
    left: 0,
    right: 100,
    width: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

const opacities = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-word]')).map((el) =>
    Number((el as HTMLElement).style.opacity)
  );

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.removeItem('cf6.lang');
});

describe('PrincipleStatement dimmed state', () => {
  it('keeps unrevealed words readable: at least 4.5:1 for 20px text on the dark background', () => {
    // text #f5f4ef over background #141413 at opacity a: blend, then WCAG contrast
    const channel = (c: number) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (rgb: number[]) =>
      0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
    const fg = [0xf5, 0xf4, 0xef];
    const bg = [0x14, 0x14, 0x13];
    const a = PRINCIPLE_DIM_OPACITY;
    const blended = fg.map((c, i) => bg[i] + a * (c - bg[i]));
    const l1 = luminance(blended);
    const l2 = luminance(bg);
    expect((l1 + 0.05) / (l2 + 0.05)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('PrincipleStatement', () => {
  it('shows exactly the first principle (title and proof) in English, and nothing else', () => {
    stubMatchMedia(false);
    render(wrap(<PrincipleStatement />));
    const section = screen.getByTestId('principle-statement');
    expect(normalise(section.textContent)).toBe(
      `${PRINCIPLES[0].title.en} ${PRINCIPLES[0].proof.en}`
    );
  });

  it('shows exactly the first principle in Spanish when the language is ES', () => {
    stubMatchMedia(false);
    window.localStorage.setItem('cf6.lang', 'es');
    render(wrap(<PrincipleStatement />));
    expect(normalise(screen.getByTestId('principle-statement').textContent)).toBe(
      `${PRINCIPLES[0].title.es} ${PRINCIPLES[0].proof.es}`
    );
  });

  it('uses a heading for the title and a paragraph for the proof', () => {
    stubMatchMedia(false);
    render(wrap(<PrincipleStatement />));
    const heading = screen.getByRole('heading', { level: 2 });
    expect(normalise(heading.textContent)).toBe(PRINCIPLES[0].title.en);
    expect(
      normalise(screen.getByTestId('principle-statement').querySelector('p')?.textContent ?? '')
    ).toBe(PRINCIPLES[0].proof.en);
  });

  it('keeps every word in the DOM and dims them all at the start of the pass', () => {
    stubMatchMedia(false);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<PrincipleStatement />));
    scrollTo(screen.getByTestId('principle-statement'), 1000);
    const o = opacities(container);
    const wordCount = `${PRINCIPLES[0].title.en} ${PRINCIPLES[0].proof.en}`.split(' ').length;
    expect(o.length).toBe(wordCount);
    for (const value of o) expect(value).toBeCloseTo(PRINCIPLE_DIM_OPACITY, 5);
  });

  it('reveals every word by the end of the pass', () => {
    stubMatchMedia(false);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<PrincipleStatement />));
    scrollTo(screen.getByTestId('principle-statement'), -5000);
    expect(opacities(container).every((value) => value === 1)).toBe(true);
  });

  it('reveals left to right in between', () => {
    stubMatchMedia(false);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<PrincipleStatement />));
    scrollTo(screen.getByTestId('principle-statement'), 150);
    const o = opacities(container);
    expect(o[0]).toBeGreaterThan(o[o.length - 1]);
    for (let i = 1; i < o.length; i++) expect(o[i]).toBeLessThanOrEqual(o[i - 1] + 1e-9);
  });

  it('shows all words immediately for reduced motion', () => {
    stubMatchMedia(true);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<PrincipleStatement />));
    scrollTo(screen.getByTestId('principle-statement'), 1000);
    expect(opacities(container).every((value) => value === 1)).toBe(true);
  });

  it('is fully visible in the server render', () => {
    const html = renderToString(wrap(<PrincipleStatement />));
    expect(html).not.toMatch(new RegExp(`opacity:${PRINCIPLE_DIM_OPACITY}\\b`));
    expect(html).toMatch(/opacity:1/);
  });
});

describe('PrincipleStatement layout', () => {
  it('sits on the page column and fades in from the page instead of cutting in', () => {
    render(wrap(<PrincipleStatement />));
    const section = screen.getByTestId('principle-statement');
    expect(section.querySelector('.max-w-6xl')).toBeTruthy();
    expect(section.querySelector('[data-testid="principle-fade"]')).toBeTruthy();
    expect(section.className).not.toMatch(/min-h-screen/);
  });
});
