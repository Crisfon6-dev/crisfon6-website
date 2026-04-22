import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { HeroSection } from '../HeroSection';
import { messages } from '@/i18n/messages';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const renderHero = () =>
  render(
    <LanguageProvider>
      <HeroSection />
    </LanguageProvider>
  );

describe('HeroSection', () => {
  it('renders the kicker text', () => {
    renderHero();
    expect(screen.getByText(messages.en.hero.kicker)).toBeTruthy();
  });

  it('renders the cert badge with accent styling', () => {
    renderHero();
    expect(screen.getByText(messages.en.hero.cert)).toBeTruthy();
  });

  it('renders the brand wordmark in an h1', () => {
    renderHero();
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/crisfon6/);
  });

  it('wraps the typewriter words with accent styling', () => {
    const { container } = renderHero();
    // Typewriter renders an initially-empty <span class="text-accent">
    const accentSpan = container.querySelector('span.text-accent');
    expect(accentSpan).not.toBeNull();
  });

  it('renders both CTAs with the correct hrefs', () => {
    renderHero();
    expect(screen.getByTestId('hero-cta-primary').getAttribute('href')).toBe('/newsletter');
    expect(screen.getByTestId('hero-cta-secondary').getAttribute('href')).toBe('/projects');
  });

  it('renders the proof mono line', () => {
    renderHero();
    expect(screen.getByText(messages.en.hero.proof)).toBeTruthy();
  });

  it('renders all four meta links', () => {
    renderHero();
    expect(screen.getByRole('link', { name: /linkedin/i }).getAttribute('href')).toContain(
      'linkedin.com'
    );
    expect(screen.getByRole('link', { name: /^email$/i }).getAttribute('href')).toMatch(/mailto:/);
    expect(screen.getByRole('link', { name: /github/i }).getAttribute('href')).toContain(
      'github.com'
    );
    expect(screen.getByRole('link', { name: /instagram/i }).getAttribute('href')).toContain(
      'instagram.com'
    );
  });
});
