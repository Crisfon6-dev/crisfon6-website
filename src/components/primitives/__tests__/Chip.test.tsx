import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Chip } from '../Chip';

describe('Chip', () => {
  it('renders children inside a span with chip base classes', () => {
    const { container } = render(<Chip>hello</Chip>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('SPAN');
    expect(root.textContent).toContain('hello');
    expect(root.className).toMatch(/rounded-sp-sm/);
    expect(root.className).toMatch(/border/);
  });

  it('applies live variant classes + pulse dot', () => {
    const { container } = render(<Chip variant="live">LIVE</Chip>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/text-green/);
    expect(container.querySelector('.pulse-dot')).not.toBeNull();
  });

  it('applies outline variant when requested', () => {
    const { container } = render(<Chip variant="outline">n</Chip>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/border-warm-border/);
  });

  it('applies accent variant when requested', () => {
    const { container } = render(<Chip variant="accent">a</Chip>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/text-accent/);
  });

  it('default variant has no pulse dot', () => {
    const { container } = render(<Chip>x</Chip>);
    expect(container.querySelector('.pulse-dot')).toBeNull();
  });
});
