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

test('renders newsletter panel with weekly blueprints kicker', () => {
  render(<Home />);
  expect(screen.getByText(/WEEKLY BLUEPRINTS/i)).toBeDefined();
});

test('renders stats labels', () => {
  render(<Home />);
  expect(screen.getByText('Years shipping products')).toBeDefined();
  expect(screen.getByText('Users served')).toBeDefined();
});

test('renders automation of the week card with CTA', () => {
  render(<Home />);
  expect(screen.getByText('AUTOMATION OF THE WEEK')).toBeDefined();
  expect(screen.getByText('AI-Powered Document Processor')).toBeDefined();
});

test('renders contact email CTA (mailto link)', () => {
  render(<Home />);
  const emailCta = screen.getByTestId('contact-cta-email');
  expect(emailCta.getAttribute('href')).toMatch(/mailto:crisfon6@crisfon6\.com/);
});
