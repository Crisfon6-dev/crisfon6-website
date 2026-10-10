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

  it('states the promise in a static headline with the accent on the claim', () => {
    renderHero();
    const headline = screen.getByTestId('hero-headline');
    expect(headline.textContent).toBe(
      `${messages.en.hero.headlinePrefix} ${messages.en.hero.headlineAccent}`
    );
    expect(headline.querySelector('span.text-accent-text')?.textContent).toBe(
      messages.en.hero.headlineAccent
    );
  });

  it('drops the SaaS tells: no shimmer badge, no gradient 6, no blinking cursor', () => {
    const { container } = renderHero();
    expect(container.querySelector('.shimmer-sweep')).toBeNull();
    expect(container.querySelector('.gradient-text')).toBeNull();
    expect(container.querySelector('.cursor-blink')).toBeNull();
  });

  it('renders the hiring action first, the cases second and the newsletter as a quiet link', () => {
    renderHero();
    expect(screen.getByTestId('hero-cta-primary').getAttribute('href')).toBe(
      'mailto:crisfon6@crisfon6.com'
    );
    expect(screen.getByTestId('hero-cta-secondary').getAttribute('href')).toBe('/projects');
    expect(screen.getByTestId('hero-cta-newsletter').getAttribute('href')).toBe('/newsletter');
  });

  it('renders the business-angle subtitle under the description', () => {
    renderHero();
    expect(screen.getByTestId('hero-business-angle').textContent).toBe(
      messages.en.hero.businessAngle
    );
  });

  it('has the headline claim in both languages and no rotating typewriter words', () => {
    expect(messages.en.hero.headlineAccent).toBe('run in production.');
    expect(messages.es.hero.headlineAccent).toBe('corren en producción.');
    expect('typewords' in messages.en.hero).toBe(false);
  });

  it('does not repeat the certification line inside the paragraph; the badge carries it', () => {
    expect(messages.en.hero.description).not.toMatch(/Certified by Anthropic/);
    expect(messages.es.hero.description).not.toMatch(/Certificado por Anthropic/);
  });

  it('says who he is and that he is open to US contracts', () => {
    renderHero();
    const line = screen.getByTestId('hero-availability');
    expect(line.textContent).toContain('Cristhian Fonseca');
    expect(screen.getByTestId('hero-name').textContent).toBe(messages.en.hero.name);
    expect(screen.getByTestId('hero-name').className).toMatch(/font-semibold/);
    expect(line.textContent).toContain('US teams');
    expect(line.textContent).toContain('CT/ET');
    expect(line.querySelector('a')).toBeNull();
    expect(messages.es.hero.availability).toContain('EE. UU.');
    expect(messages.es.hero.availability).toContain('CT/ET');
  });

  it('makes the hiring action the primary button, in both languages', () => {
    renderHero();
    const primary = screen.getByTestId('hero-cta-primary');
    expect(primary.textContent).toContain(messages.en.hero.ctaHire);
    expect(primary.className).toMatch(/bg-warm-fg/);
    expect(messages.es.hero.ctaHire).toBe('¿Contratas? Escríbeme');
    expect(screen.getByTestId('hero-cta-newsletter').className).not.toMatch(/bg-warm-fg/);
  });

  it('opens with the brand line, product and business before code', () => {
    expect(messages.en.hero.businessAngle).toBe(
      'I start with who it hurts and what it costs. The code comes last.'
    );
    expect(messages.es.hero.businessAngle).toBe(
      'Empiezo por a quién le duele y cuánto cuesta. El código va al final.'
    );
  });

  it('keeps the secondary button readable over the film with an opaque fill', () => {
    renderHero();
    expect(screen.getByTestId('hero-cta-secondary').className).toMatch(/(^|\s)bg-warm-bg(\s|$)/);
  });

  it('leaves the social links to the footer so the hero keeps one clear read', () => {
    renderHero();
    expect(screen.queryByRole('link', { name: /linkedin/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /instagram/i })).toBeNull();
  });
});

describe('HeroSection legibility over bright night footage', () => {
  it('does not point at a film chapter story that no longer exists', () => {
    renderHero();
    expect(screen.queryByTestId('hero-bridge')).toBeNull();
    expect(screen.queryByText(/chapters/i)).toBeNull();
  });

  it('brightens the quiet newsletter link in dark mode so it holds 4.5:1 over the footage', () => {
    renderHero();
    expect(screen.getByTestId('hero-cta-newsletter').className).toContain('dark:text-warm-fg');
  });
});
