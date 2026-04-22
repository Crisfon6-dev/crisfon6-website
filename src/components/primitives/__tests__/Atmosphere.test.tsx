import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Atmosphere } from '../Atmosphere';

describe('Atmosphere', () => {
  it('renders two orbs (orb-a + orb-b)', () => {
    const { container } = render(<Atmosphere />);
    expect(container.querySelector('.orb-a')).not.toBeNull();
    expect(container.querySelector('.orb-b')).not.toBeNull();
  });

  it('renders blueprint-grid by default', () => {
    const { container } = render(<Atmosphere />);
    expect(container.querySelector('.blueprint-grid')).not.toBeNull();
  });

  it('omits blueprint-grid when grid={false}', () => {
    const { container } = render(<Atmosphere grid={false} />);
    expect(container.querySelector('.blueprint-grid')).toBeNull();
  });

  it('is aria-hidden and non-interactive', () => {
    const { container } = render(<Atmosphere />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('aria-hidden')).toBe('true');
    expect(root.className).toMatch(/pointer-events-none/);
  });
});
