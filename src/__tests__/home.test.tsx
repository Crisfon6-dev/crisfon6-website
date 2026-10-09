import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { KEY_FACTS } from '@/data/career';

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

test('renders stats labels from career.ts key facts', () => {
  render(<Home />);
  expect(screen.getByText(KEY_FACTS[0].label.en)).toBeDefined();
  expect(screen.getByText(KEY_FACTS[1].label.en)).toBeDefined();
});

test('renders the featured automation card with CTA and no edition number', () => {
  render(<Home />);
  expect(screen.getByText('FEATURED AUTOMATION')).toBeDefined();
  expect(screen.queryByText('#06')).toBeNull();
  expect(screen.getByText('AI-Powered Document Processor')).toBeDefined();
});

test('renders contact email CTA (mailto link)', () => {
  render(<Home />);
  const emailCta = screen.getByTestId('contact-cta-email');
  expect(emailCta.getAttribute('href')).toMatch(/mailto:crisfon6@crisfon6\.com/);
});

test('places the film stage right after the hero and before the stats', () => {
  const { container } = render(<Home />);
  const order = Array.from(container.querySelectorAll('[data-testid]'))
    .map((el) => el.getAttribute('data-testid'))
    .filter((id) => id === 'hero' || id === 'hero-film' || id === 'stats');
  expect(order).toEqual(['hero', 'hero-film', 'stats']);
});
