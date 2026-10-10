import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { FeaturedProjectsSection } from '../FeaturedProjectsSection';
import { NewsletterPanel } from '../NewsletterPanel';
import { ContactPanel } from '../ContactPanel';
import { messages } from '@/i18n/messages';

const wrap = (node: React.ReactNode) => <LanguageProvider>{node}</LanguageProvider>;

describe('FeaturedProjectsSection', () => {
  it('renders 4 project cards with the orchestration harness second', () => {
    const { container } = render(wrap(<FeaturedProjectsSection />));
    const items = container.querySelectorAll('ul > li');
    expect(items.length).toBe(4);
    expect(items[1].querySelector('a')?.getAttribute('href')).toBe(
      '/projects#ai-orchestration-harness'
    );
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
    expect(items[1].className).toMatch(/lg:col-span-4/);
    expect(items[2].className).toMatch(/lg:col-span-4/);
    expect(items[3].className).toMatch(/lg:col-span-4/);
  });
});

describe('NewsletterPanel', () => {
  it('wraps the SubscribeForm', () => {
    const { container } = render(wrap(<NewsletterPanel />));
    expect(container.querySelector('form')).not.toBeNull();
    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
  });

  it('is a slab with no dark gradient block', () => {
    const { container } = render(wrap(<NewsletterPanel />));
    expect(screen.getByTestId('newsletter-panel').querySelector('.slab')).toBeTruthy();
    expect(container.querySelector('[style*="radial-gradient"]')).toBeNull();
  });

  it('renders the production blueprints kicker', () => {
    render(wrap(<NewsletterPanel />));
    expect(screen.getByText(messages.en.cta.productionBlueprints)).toBeTruthy();
  });
});

describe('ContactPanel', () => {
  it('renders the email and LinkedIn actions, LinkedIn opening safely in a new tab', () => {
    render(wrap(<ContactPanel />));
    expect(screen.getByTestId('contact-cta-primary').getAttribute('href')).toMatch(/^mailto:/);
    const linkedin = screen.getByTestId('contact-cta-linkedin');
    expect(linkedin.getAttribute('href')).toBe('https://www.linkedin.com/in/crisfon6/');
    expect(linkedin.getAttribute('target')).toBe('_blank');
    expect(linkedin.getAttribute('rel')).toMatch(/noopener/);
  });

  it('renders the lets-talk kicker', () => {
    render(wrap(<ContactPanel />));
    expect(screen.getByText(messages.en.cta.letsTalk)).toBeTruthy();
  });

  it('speaks to the person hiring, in both languages', () => {
    expect(messages.en.cta.buildingSomething).toBe(
      'Hiring a senior engineer for a US team? Email me.'
    );
    expect(messages.es.cta.buildingSomething).toBe(
      '¿Buscas un ingeniero senior para un equipo en EE. UU.? Escríbeme.'
    );
  });

  it('fills the right side with the three facts a hiring manager needs, in both languages', () => {
    render(wrap(<ContactPanel />));
    const items = screen.getByTestId('contact-facts').querySelectorAll('li');
    expect(Array.from(items).map((li) => li.textContent)).toEqual([
      ...messages.en.cta.contactFacts,
    ]);
    expect(messages.es.cta.contactFacts.length).toBe(3);
  });

  it('makes email the primary button, as its headline says, and LinkedIn the quiet one', () => {
    render(wrap(<ContactPanel />));
    const email = screen.getByTestId('contact-cta-primary');
    expect(email.getAttribute('href')).toMatch(/^mailto:/);
    expect(email.className).toMatch(/bg-warm-fg/);
    const linkedin = screen.getByTestId('contact-cta-linkedin');
    expect(linkedin.getAttribute('href')).toContain('linkedin.com');
    expect(linkedin.className).not.toMatch(/bg-warm-fg/);
  });

  it('is a slab, not a grey SaaS block', () => {
    render(wrap(<ContactPanel />));
    expect(screen.getByTestId('contact-panel').querySelector('.slab')).toBeTruthy();
  });
});

describe('the closing panels over the film', () => {
  it('frost the contact and newsletter slabs so the film shows through', () => {
    const contact = render(wrap(<ContactPanel />));
    expect(contact.container.querySelector('.slab')?.className).toMatch(/\bslab-glass\b/);
    contact.unmount();
    const newsletter = render(wrap(<NewsletterPanel />));
    expect(newsletter.container.querySelector('.slab')?.className).toMatch(/\bslab-glass\b/);
  });
});
