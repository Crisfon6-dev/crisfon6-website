import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Kicker } from '../Kicker';

describe('Kicker', () => {
  it('renders children with mono + uppercase tracking classes', () => {
    const { container, getByText } = render(<Kicker>AI SYSTEMS · LATAM</Kicker>);
    expect(getByText('AI SYSTEMS · LATAM')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/font-mono/);
    expect(root.className).toMatch(/uppercase/);
    expect(root.className).toMatch(/tracking-/);
  });

  it('renders a pulse dot when `dot` prop is true', () => {
    const { container } = render(<Kicker dot>LIVE</Kicker>);
    const dot = container.querySelector('.pulse-dot');
    expect(dot).not.toBeNull();
    expect(dot?.getAttribute('aria-hidden')).toBe('true');
  });

  it('omits the dot when `dot` prop is false/default', () => {
    const { container } = render(<Kicker>hi</Kicker>);
    expect(container.querySelector('.pulse-dot')).toBeNull();
  });

  it('applies accent color when `accent` prop is true', () => {
    const { container } = render(<Kicker accent>x</Kicker>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/text-accent/);
  });

  it('merges custom className', () => {
    const { container } = render(<Kicker className="extra">x</Kicker>);
    expect((container.firstElementChild as HTMLElement).className).toMatch(/extra/);
  });
});
