import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

test('renders the brand wordmark in an h1', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading.textContent).toMatch(/crisfon6/);
});

test('renders Featured Projects section kicker', () => {
  render(<Home />);
  expect(screen.getByText('Featured Projects')).toBeDefined();
});

test('renders newsletter panel with production blueprints kicker', () => {
  render(<Home />);
  expect(screen.getByText('PRODUCTION BLUEPRINTS')).toBeDefined();
});

test('no longer carries the stats row, the marquee, the automation card or the diagram', () => {
  render(<Home />);
  for (const id of ['stats', 'stack-marquee', 'automation', 'system-diagram']) {
    expect(screen.queryByTestId(id), id).toBeNull();
  }
  expect(screen.queryByText('FEATURED AUTOMATION')).toBeNull();
});

test('renders contact email CTA (mailto link)', () => {
  render(<Home />);
  const emailCta = screen.getByTestId('contact-cta-email');
  expect(emailCta.getAttribute('href')).toMatch(/mailto:crisfon6@crisfon6\.com/);
});

test('lays out the story in order: hero, film, cases, principle, contact, then the newsletter', () => {
  const { container } = render(<Home />);
  const wanted = new Set([
    'hero',
    'hero-film',
    'featured-projects',
    'horizontal-cases',
    'principle-statement',
    'contact-panel',
    'newsletter-panel',
  ]);
  const order = Array.from(container.querySelectorAll('[data-testid]'))
    .map((el) => el.getAttribute('data-testid') as string)
    .filter((id) => wanted.has(id))
    // the featured cases are either the vertical grid or the horizontal track
    .map((id) => (id === 'featured-projects' || id === 'horizontal-cases' ? 'cases' : id));
  expect(order).toEqual([
    'hero',
    'hero-film',
    'cases',
    'principle-statement',
    'contact-panel',
    'newsletter-panel',
  ]);
});
