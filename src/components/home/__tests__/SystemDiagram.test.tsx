import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { messages } from '@/i18n/messages';
import { SystemDiagram } from '../SystemDiagram';

const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;

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

function scrollTo(section: HTMLElement, top: number, height = 800) {
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

const offsets = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('svg path[data-draw]')).map((p) =>
    Number(p.getAttribute('stroke-dashoffset'))
  );

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.removeItem('cf6.lang');
});

describe('SystemDiagram', () => {
  it('renders an SVG with an accessible label and a kicker, in EN', () => {
    stubMatchMedia(false);
    const { container } = render(wrap(<SystemDiagram />));
    expect(screen.getByText(messages.en.systemDiagram.kicker)).toBeTruthy();
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe(messages.en.systemDiagram.label);
  });

  it('uses the Spanish kicker and label when the language is ES', () => {
    stubMatchMedia(false);
    window.localStorage.setItem('cf6.lang', 'es');
    const { container } = render(wrap(<SystemDiagram />));
    expect(screen.getByText(messages.es.systemDiagram.kicker)).toBeTruthy();
    expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe(
      messages.es.systemDiagram.label
    );
  });

  it('contains no text elements and introduces no figures', () => {
    stubMatchMedia(false);
    const { container } = render(wrap(<SystemDiagram />));
    expect(container.querySelectorAll('svg text, svg tspan').length).toBe(0);
    expect(container.querySelector('svg')!.textContent).toBe('');
  });

  it('draws every path with a normalised dash length', () => {
    stubMatchMedia(false);
    const { container } = render(wrap(<SystemDiagram />));
    const paths = container.querySelectorAll('svg path[data-draw]');
    expect(paths.length).toBeGreaterThanOrEqual(5);
    for (const path of Array.from(paths)) {
      expect(path.getAttribute('pathLength')).toBe('1');
      expect(path.getAttribute('stroke-dasharray')).toBe('1');
    }
  });

  it('hides every path at the start of the pass and draws them all by the end', () => {
    stubMatchMedia(false);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<SystemDiagram />));
    const section = screen.getByTestId('system-diagram');
    scrollTo(section, 1000); // top below the start line: progress 0
    expect(offsets(container).every((o) => o === 1)).toBe(true);
    scrollTo(section, -5000); // fully past: progress 1
    expect(offsets(container).every((o) => o === 0)).toBe(true);
  });

  it('draws the lines in order: earlier paths are further along than later ones', () => {
    stubMatchMedia(false);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<SystemDiagram />));
    const section = screen.getByTestId('system-diagram');
    scrollTo(section, 300, 800); // somewhere in the middle of the pass
    const o = offsets(container);
    expect(o[0]).toBeLessThan(o[o.length - 1]);
    for (let i = 1; i < o.length; i++) expect(o[i]).toBeGreaterThanOrEqual(o[i - 1] - 1e-9);
  });

  it('renders fully drawn for reduced motion', () => {
    stubMatchMedia(true);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(wrap(<SystemDiagram />));
    scrollTo(screen.getByTestId('system-diagram'), 1000);
    expect(offsets(container).every((o) => o === 0)).toBe(true);
  });

  it('is fully drawn in the server render', () => {
    const html = renderToString(wrap(<SystemDiagram />));
    expect(html).not.toMatch(/stroke-dashoffset="1"/);
    expect(html).toMatch(/stroke-dashoffset="0"/);
  });
});
