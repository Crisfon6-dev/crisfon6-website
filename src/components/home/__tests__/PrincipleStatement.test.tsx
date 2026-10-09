import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { PRINCIPLES } from '@/data/career';
import { PrincipleStatement } from '../PrincipleStatement';

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
    for (const value of o) expect(value).toBeCloseTo(0.15, 5);
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
    expect(html).not.toMatch(/opacity:0\.15/);
    expect(html).toMatch(/opacity:1/);
  });
});
