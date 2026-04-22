import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Marquee } from '../Marquee';

describe('Marquee', () => {
  it('duplicates children for a seamless loop', () => {
    const { container } = render(
      <Marquee>
        <span data-testid="chip">chip</span>
      </Marquee>
    );
    const chips = container.querySelectorAll('[data-testid="chip"]');
    expect(chips.length).toBe(2);
  });

  it('marks the second copy as aria-hidden', () => {
    const { container } = render(<Marquee>x</Marquee>);
    const copies = container.querySelectorAll('.marquee-track > div');
    expect(copies.length).toBe(2);
    expect(copies[1].getAttribute('aria-hidden')).toBe('true');
  });

  it('renders a role="region" with aria-label when provided', () => {
    const { container } = render(<Marquee ariaLabel="stack">x</Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('role')).toBe('region');
    expect(root.getAttribute('aria-label')).toBe('stack');
  });

  it('uses marquee-track animation class', () => {
    const { container } = render(<Marquee>x</Marquee>);
    expect(container.querySelector('.marquee-track')).not.toBeNull();
  });
});
