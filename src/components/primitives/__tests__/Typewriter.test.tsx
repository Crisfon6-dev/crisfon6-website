import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
