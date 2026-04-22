import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { Reveal } from '../Reveal';

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

let callbacks: IOCallback[] = [];
let observedEls: Element[] = [];
let disconnectCount = 0;
let lastOptions: IntersectionObserverInit | undefined;

class FakeIO {
  cb: IOCallback;
  constructor(cb: IOCallback, opts?: IntersectionObserverInit) {
    this.cb = cb;
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

const fireIntersect = (el: Element, isIntersecting = true) => {
  callbacks.forEach((cb) =>
    cb([{ target: el, isIntersecting } as unknown as IntersectionObserverEntry])
  );
};

beforeEach(() => {
  callbacks = [];
  observedEls = [];
  disconnectCount = 0;
  lastOptions = undefined;
  // @ts-expect-error override test mock
  global.IntersectionObserver = FakeIO;
});

afterEach(() => {
  callbacks = [];
  observedEls = [];
});

describe('Reveal', () => {
  it('renders children wrapped with reveal class', () => {
    const { container } = render(
      <Reveal>
        <p>hi</p>
      </Reveal>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.classList.contains('reveal')).toBe(true);
    expect(wrapper.textContent).toBe('hi');
  });

  it('observes itself with threshold 0.12 and rootMargin -40px', () => {
    render(<Reveal>x</Reveal>);
    expect(observedEls).toHaveLength(1);
    expect(lastOptions?.threshold).toBe(0.12);
    expect(lastOptions?.rootMargin).toBe('-40px 0px');
  });

  it('sets data-revealed="true" when element intersects', () => {
    const { container } = render(<Reveal>x</Reveal>);
    const el = container.firstElementChild as HTMLElement;
    fireIntersect(el);
    expect(el.getAttribute('data-revealed')).toBe('true');
  });

  it('applies staggered transition-delay when delay prop is provided', () => {
    const { container } = render(<Reveal delay={3}>x</Reveal>);
    const el = container.firstElementChild as HTMLElement;
    fireIntersect(el);
    expect(el.style.transitionDelay).toBe('240ms');
  });

  it('does not apply transition-delay when delay is 0 or undefined', () => {
    const { container } = render(<Reveal>x</Reveal>);
    const el = container.firstElementChild as HTMLElement;
    fireIntersect(el);
    expect(el.style.transitionDelay).toBe('');
  });

  it('renders with custom element tag via `as` prop', () => {
    const { container } = render(<Reveal as="section">x</Reveal>);
    expect(container.firstElementChild?.tagName).toBe('SECTION');
  });

  it('forwards arbitrary props + className merges with reveal', () => {
    const { container } = render(
      <Reveal className="extra" id="foo" aria-label="bar">
        x
      </Reveal>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.classList.contains('reveal')).toBe(true);
    expect(el.classList.contains('extra')).toBe(true);
    expect(el.id).toBe('foo');
    expect(el.getAttribute('aria-label')).toBe('bar');
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<Reveal>x</Reveal>);
    unmount();
    expect(disconnectCount).toBe(1);
  });
});
