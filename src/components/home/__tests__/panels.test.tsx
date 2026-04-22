import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { AutomationSection } from '../AutomationSection';
import { FeaturedProjectsSection } from '../FeaturedProjectsSection';
import { NewsletterPanel } from '../NewsletterPanel';
import { ContactPanel } from '../ContactPanel';
import { messages } from '@/i18n/messages';

const wrap = (node: React.ReactNode) => <LanguageProvider>{node}</LanguageProvider>;

describe('AutomationSection', () => {
  it('renders title, description, Live chip, and metrics', () => {
    render(wrap(<AutomationSection />));
    expect(screen.getByText(messages.en.automation.title)).toBeTruthy();
    expect(screen.getByText(messages.en.automation.description)).toBeTruthy();
    expect(screen.getByText(messages.en.automation.live)).toBeTruthy();
    expect(screen.getByText(messages.en.automation.infraCostValue)).toBeTruthy();
    expect(screen.getByText(messages.en.automation.timeSavedValue)).toBeTruthy();
    expect(screen.getByText(messages.en.automation.value)).toBeTruthy();
  });

  it('wraps a Pipeline of 4 nodes', () => {
    const { container } = render(wrap(<AutomationSection />));
    const pipeline = container.querySelector('[aria-label="pipeline"]');
    expect(pipeline).not.toBeNull();
    expect(pipeline!.querySelectorAll('li').length).toBe(4);
  });

  it('has CTA linking to /automations', () => {
    render(wrap(<AutomationSection />));
    const cta = screen.getByTestId('automation-cta');
    expect(cta.getAttribute('href')).toBe('/automations');
  });
});

describe('FeaturedProjectsSection', () => {
  it('renders 3 project cards', () => {
    const { container } = render(wrap(<FeaturedProjectsSection />));
    expect(container.querySelectorAll('ul > li').length).toBe(3);
  });

  it('marks only the first card as featured (data-featured="true")', () => {
    const { container } = render(wrap(<FeaturedProjectsSection />));
    const featured = container.querySelectorAll('[data-featured="true"]');
    expect(featured.length).toBe(1);
  });

  it('gives the first card col-span-12 class at lg breakpoint', () => {
    const { container } = render(wrap(<FeaturedProjectsSection />));
    const items = container.querySelectorAll('ul > li');
    expect(items[0].className).toMatch(/lg:col-span-12/);
    expect(items[1].className).toMatch(/lg:col-span-6/);
    expect(items[2].className).toMatch(/lg:col-span-6/);
  });
});

describe('NewsletterPanel', () => {
  it('wraps the SubscribeForm', () => {
    const { container } = render(wrap(<NewsletterPanel />));
    expect(container.querySelector('form')).not.toBeNull();
    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
  });

  it('renders the weekly blueprints kicker', () => {
    render(wrap(<NewsletterPanel />));
    expect(screen.getByText(messages.en.cta.weeklyBlueprints)).toBeTruthy();
  });
});

describe('ContactPanel', () => {
  it('renders primary and email CTAs', () => {
    render(wrap(<ContactPanel />));
    expect(screen.getByTestId('contact-cta-primary').getAttribute('href')).toBe('/work-with-me');
    expect(screen.getByTestId('contact-cta-email').getAttribute('href')).toMatch(/^mailto:/);
  });

  it('renders the lets-talk kicker', () => {
    render(wrap(<ContactPanel />));
    expect(screen.getByText(messages.en.cta.letsTalk)).toBeTruthy();
  });
});
