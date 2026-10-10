import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, act } from '@testing-library/react';
import { Typewriter } from '../Typewriter';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
  // Flush any zero-ms phase-transition timers that were scheduled
  // during the advance but not yet consumed.
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
};

describe('Typewriter', () => {
  it('renders empty on first paint', () => {
    const { container } = render(<Typewriter words={['hello', 'world']} />);
    expect(container.textContent).toBe('');
  });

  it('types the first word one char per typeSpeed (60ms default)', async () => {
    const { container } = render(<Typewriter words={['abc']} />);
    await advance(60);
    expect(container.textContent).toBe('a');
    await advance(60);
    expect(container.textContent).toBe('ab');
    await advance(60);
    expect(container.textContent).toBe('abc');
  });

  it('pauses at full word for `pause` ms, then starts deleting at deleteSpeed', async () => {
    const { container } = render(
      <Typewriter words={['ab']} typeSpeed={10} deleteSpeed={5} pause={200} />
    );
    await advance(10);
    await advance(10);
    expect(container.textContent).toBe('ab');
    await advance(200);
    // now in deleting phase
    await advance(5);
    expect(container.textContent).toBe('a');
    await advance(5);
    expect(container.textContent).toBe('');
  });

  it('cycles to the next word after deleting', async () => {
    const { container } = render(
      <Typewriter words={['a', 'b']} typeSpeed={10} deleteSpeed={5} pause={50} />
    );
    await advance(10);
    expect(container.textContent).toBe('a');
    await advance(50);
    await advance(5);
    expect(container.textContent).toBe('');
    await advance(10);
    expect(container.textContent).toBe('b');
  });

  it('wraps around to the first word after the last', async () => {
    const { container } = render(
      <Typewriter words={['x', 'y']} typeSpeed={5} deleteSpeed={5} pause={10} />
    );
    // type x → pause → delete → type y → pause → delete → type x again
    await advance(5); // x
    await advance(10); // pause
    await advance(5); // delete x
    await advance(5); // type y
    expect(container.textContent).toBe('y');
    await advance(10); // pause
    await advance(5); // delete y
    await advance(5); // type x
    expect(container.textContent).toBe('x');
  });

  it('accepts custom className on the wrapping span', () => {
    const { container } = render(<Typewriter words={['a']} className="hero-type" />);
    const span = container.firstElementChild as HTMLElement;
    expect(span.tagName).toBe('SPAN');
    expect(span.classList.contains('hero-type')).toBe(true);
  });

  it('cleans up timers on unmount (no state updates after)', async () => {
    const { unmount, container } = render(<Typewriter words={['abcdef']} />);
    await advance(60);
    unmount();
    // advancing after unmount should not throw or update
    expect(() => vi.advanceTimersByTime(5000)).not.toThrow();
    expect(container.textContent).toBe('');
  });
});

describe('Typewriter reserved space (no layout shift)', () => {
  it('exposes the longest word as the ghost used to reserve space', () => {
    const { container } = render(
      <Typewriter words={['short', 'the longest phrase here', 'mid size']} />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('data-ghost')).toBe('the longest phrase here');
  });

  it('keeps the ghost out of the DOM text, so text content only has what is typed', async () => {
    const { container } = render(<Typewriter words={['abc', 'a much longer word']} />);
    expect(container.textContent).toBe('');
    await advance(60);
    expect(container.textContent).toBe('a');
  });

  it('has an empty ghost when there are no words', () => {
    const { container } = render(<Typewriter words={[]} />);
    expect((container.firstElementChild as HTMLElement).getAttribute('data-ghost')).toBe('');
  });

  it('styles the ghost as invisible text that still takes up space, sharing one grid cell', () => {
    // comments are removed first so they cannot end up inside a selector
    const css = readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8').replace(
      /\/\*[\s\S]*?\*\//g,
      ''
    );
    // every rule whose selector list mentions the selector, with all its declarations joined
    const declarations = (selector: string) => {
      const bodies: string[] = [];
      for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        const selectors = match[1].split(',').map((part) => part.trim());
        if (selectors.includes(selector)) bodies.push(match[2]);
      }
      expect(bodies.length, `a rule for ${selector}`).toBeGreaterThan(0);
      return bodies.join(' ');
    };
    expect(declarations('.typewriter')).toMatch(/display:\s*inline-grid/);
    const ghost = declarations('.typewriter::after');
    expect(ghost).toMatch(/content:\s*attr\(data-ghost\)/);
    expect(ghost).toMatch(/visibility:\s*hidden/);
    expect(ghost).toMatch(/grid-area:\s*1\s*\/\s*1/);
  });
});
