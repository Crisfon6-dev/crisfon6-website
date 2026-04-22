import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
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
