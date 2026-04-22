import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { CountUp } from '../CountUp';

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

let callbacks: IOCallback[] = [];
let observedEls: Element[] = [];
let disconnectCount = 0;
let lastOptions: IntersectionObserverInit | undefined;

class FakeIO {
  constructor(cb: IOCallback, opts?: IntersectionObserverInit) {
    lastOptions = opts;
    callbacks.push(cb);
  }
  observe(el: Element) {
    observedEls.push(el);
  }
  unobserve() {}
  disconnect() {
    disconnectCount++;
  }
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = '';
  thresholds = [];
}

const fireIntersect = (el: Element) => {
  callbacks.forEach((cb) =>
    cb([{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry])
  );
};

beforeEach(() => {
  callbacks = [];
  observedEls = [];
  disconnectCount = 0;
  lastOptions = undefined;
  vi.useFakeTimers();
  // @ts-expect-error override mock
  global.IntersectionObserver = FakeIO;
  // mock matchMedia to default (motion enabled)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
});

afterEach(() => {
  vi.useRealTimers();
  callbacks = [];
});

describe('CountUp', () => {
  it('renders 0 initially (before IO fires)', () => {
    const { container } = render(<CountUp end={100} />);
    expect(container.textContent).toBe('0');
  });

  it('observes the element with threshold 0.4', () => {
    render(<CountUp end={100} />);
    expect(observedEls).toHaveLength(1);
    expect(lastOptions?.threshold).toBe(0.4);
  });

  it('renders suffix in a separate span when provided', () => {
    const { container } = render(<CountUp end={42} suffix="+" suffixClassName="text-accent" />);
    const suffixSpan = container.querySelector('span.text-accent');
    expect(suffixSpan?.textContent).toBe('+');
  });

  it('animates to `end` value over the duration after intersecting', async () => {
    const { container } = render(<CountUp end={1000} duration={200} />);
    const el = observedEls[0];
    await act(async () => {
      fireIntersect(el);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });
    expect(container.textContent).toContain('1000');
  });

  it('does not re-trigger animation if intersect fires again', async () => {
    const { container } = render(<CountUp end={50} duration={100} />);
    const el = observedEls[0];
    await act(async () => {
      fireIntersect(el);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(container.textContent).toContain('50');
    // second fire is ignored (already completed)
    await act(async () => {
      fireIntersect(el);
    });
    expect(container.textContent).toContain('50');
  });

  it('respects prefers-reduced-motion by jumping to end immediately', async () => {
    (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (query: string) => ({
        matches: query.includes('reduce'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        onchange: null,
      })
    );
    const { container } = render(<CountUp end={999} duration={5000} />);
    const el = observedEls[0];
    await act(async () => {
      fireIntersect(el);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(container.textContent).toContain('999');
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<CountUp end={1} />);
    unmount();
    expect(disconnectCount).toBe(1);
  });
});
