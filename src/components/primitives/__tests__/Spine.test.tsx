import { describe, it, expect, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Spine } from '../Spine';

function setPage({
  scrollY,
  scrollHeight,
  reduced = false,
}: {
  scrollY: number;
  scrollHeight: number;
  reduced?: boolean;
}) {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  });
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

afterEach(() => {
  document.documentElement.style.removeProperty('--spine');
});

describe("Spine: the film's coral line, down the page margin", () => {
  it('is decorative: hidden from assistive tech and from small screens', () => {
    setPage({ scrollY: 0, scrollHeight: 5000 });
    render(<Spine />);
    const spine = screen.getByTestId('spine');
    expect(spine.getAttribute('aria-hidden')).toBe('true');
    expect(spine.className).toMatch(/\bhidden\b/);
    expect(spine.className).toMatch(/xl:block/);
    expect(spine.className).toMatch(/pointer-events-none/);
  });

  it('fills with the page scroll', () => {
    setPage({ scrollY: 2100, scrollHeight: 5000 });
    render(<Spine />);
    expect(screen.getByTestId('spine').style.getPropertyValue('--spine')).toBe('0.5');
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 4200, configurable: true, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByTestId('spine').style.getPropertyValue('--spine')).toBe('1');
  });

  it('with reduced motion it is fully drawn and has no travelling dot', () => {
    setPage({ scrollY: 0, scrollHeight: 5000, reduced: true });
    render(<Spine />);
    expect(screen.getByTestId('spine').style.getPropertyValue('--spine')).toBe('1');
    expect(screen.queryByTestId('spine-dot')).toBeNull();
  });
});
