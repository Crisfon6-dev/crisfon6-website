import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Timeline, type TimelineItem } from '../Timeline';

const items: TimelineItem[] = [
  { year: '2024', title: 'Shipped agent platform', description: 'LATAM at scale.' },
  { year: '2023', title: 'Led credit marketplace' },
  { year: '2020', title: 'Started in FinTech' },
];

describe('Timeline', () => {
  it('renders one <li> per item', () => {
    const { container } = render(<Timeline items={items} />);
    expect(container.querySelectorAll('li').length).toBe(3);
  });

  it('renders year, title, and description text', () => {
    const { getByText } = render(<Timeline items={items} />);
    expect(getByText('2024')).toBeTruthy();
    expect(getByText('Shipped agent platform')).toBeTruthy();
    expect(getByText('LATAM at scale.')).toBeTruthy();
  });

  it('omits description element when not provided', () => {
    const { container } = render(<Timeline items={[{ year: '2020', title: 'x' }]} />);
    const li = container.querySelector('li');
    expect(li?.querySelector('p.text-warm-fg-muted')).toBeNull();
  });

  it('wraps items in an <ol>', () => {
    const { container } = render(<Timeline items={items} />);
    expect(container.firstElementChild?.tagName).toBe('OL');
  });

  it('renders a dot marker per item', () => {
    const { container } = render(<Timeline items={items} />);
    const dots = container.querySelectorAll('li > span[aria-hidden]');
    expect(dots.length).toBe(3);
  });
});

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

function rect(top: number, height: number): DOMRect {
  return {
    top,
    height,
    bottom: top + height,
    left: 0,
    right: 100,
    width: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  };
}

describe('Timeline line draw', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is fully drawn in the server render, so no-JS visitors see the whole line', () => {
    const html = renderToString(<Timeline items={items} />);
    expect(html).toContain('--timeline-progress:1');
  });

  it('sets the line progress from the scroll position', () => {
    stubMatchMedia(false);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(<Timeline items={items} />);
    const list = container.querySelector('ol') as HTMLOListElement;
    // viewport 1000, list 1000 tall, top at 100: halfway through its pass
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(rect(100, 1000));
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(list.style.getPropertyValue('--timeline-progress')).toBe('0.5');
  });

  it('stays fully drawn when the user prefers reduced motion', () => {
    stubMatchMedia(true);
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
      writable: true,
    });
    const { container } = render(<Timeline items={items} />);
    const list = container.querySelector('ol') as HTMLOListElement;
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(rect(1200, 1000));
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(list.style.getPropertyValue('--timeline-progress')).toBe('1');
  });

  it('keeps the same items, order and markup roles', () => {
    stubMatchMedia(false);
    const { container } = render(<Timeline items={items} />);
    expect(Array.from(container.querySelectorAll('li h3')).map((el) => el.textContent)).toEqual([
      'Shipped agent platform',
      'Led credit marketplace',
      'Started in FinTech',
    ]);
  });
});
