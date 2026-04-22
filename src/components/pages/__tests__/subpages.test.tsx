import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { AboutContent } from '../AboutContent';
import { ProjectsContent } from '../ProjectsContent';
import { AutomationsContent } from '../AutomationsContent';
import { WorkWithMeContent } from '../WorkWithMeContent';
import { NewsletterContent } from '../NewsletterContent';
import { BlogContent } from '../BlogContent';
import { messages } from '@/i18n/messages';
import type { BlogPost } from '@/lib/blog';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;

describe('AboutContent', () => {
  it('renders SubpageHeader "02 · ABOUT"', () => {
    render(wrap(<AboutContent />));
    expect(screen.getByText(/02 · ABOUT/)).toBeTruthy();
  });

  it('renders an Anthropic credential card', () => {
    render(wrap(<AboutContent />));
    expect(screen.getByTestId('anthropic-card')).toBeTruthy();
  });

  it('renders Timeline with 4 items from i18n', () => {
    const { container } = render(wrap(<AboutContent />));
    const ol = container.querySelectorAll('ol');
    const hasTimeline = Array.from(ol).some(
      (el) => el.querySelectorAll('li').length === messages.en.about.timeline.length
    );
    expect(hasTimeline).toBe(true);
  });

  it('renders primary CTA to /work-with-me', () => {
    render(wrap(<AboutContent />));
    expect(screen.getByTestId('about-cta-primary').getAttribute('href')).toBe('/work-with-me');
  });
});

describe('ProjectsContent', () => {
  it('renders SubpageHeader "03 · PROJECTS"', () => {
    render(wrap(<ProjectsContent />));
    expect(screen.getByText(/03 · PROJECTS/)).toBeTruthy();
  });

  it('renders 7 project cards with exactly one featured', () => {
    const { container } = render(wrap(<ProjectsContent />));
    const cards = container.querySelectorAll('[data-testid="project-card"]');
    expect(cards.length).toBe(7);
    const featured = Array.from(cards).filter((c) => c.getAttribute('data-featured') === 'true');
    expect(featured.length).toBe(1);
  });

  it('renders a CTA to /newsletter', () => {
    render(wrap(<ProjectsContent />));
    expect(screen.getByTestId('projects-cta').getAttribute('href')).toBe('/newsletter');
  });
});

describe('AutomationsContent', () => {
  it('renders SubpageHeader "04 · AUTOMATIONS"', () => {
    render(wrap(<AutomationsContent />));
    expect(screen.getByText(/04 · AUTOMATIONS/)).toBeTruthy();
  });

  it('renders 6 automation cards', () => {
    const { container } = render(wrap(<AutomationsContent />));
    expect(container.querySelectorAll('[data-testid="automation-card"]').length).toBe(6);
  });

  it('renders a GitHub CTA linking to the repo', () => {
    render(wrap(<AutomationsContent />));
    const cta = screen.getByTestId('automations-github');
    expect(cta.getAttribute('href')).toContain('github.com');
  });
});

describe('WorkWithMeContent', () => {
  it('renders SubpageHeader "06 · WORK WITH ME"', () => {
    render(wrap(<WorkWithMeContent />));
    expect(screen.getByText(/06 · WORK WITH ME/)).toBeTruthy();
  });

  it('renders one service card per i18n service entry', () => {
    const { container } = render(wrap(<WorkWithMeContent />));
    const cards = container.querySelectorAll('[data-testid="service-card"]');
    expect(cards.length).toBe(messages.en.workWithMe.services.length);
  });

  it('renders a sticky contact card with mailto CTA', () => {
    render(wrap(<WorkWithMeContent />));
    expect(screen.getByTestId('contact-card')).toBeTruthy();
    expect(screen.getByTestId('contact-card-email').getAttribute('href')).toMatch(/^mailto:/);
  });
});

describe('NewsletterContent', () => {
  it('renders SubpageHeader "07 · POWERAI"', () => {
    render(wrap(<NewsletterContent />));
    expect(screen.getByText(/07 · POWERAI/)).toBeTruthy();
  });

  it('renders the dark panel with SubscribeForm', () => {
    const { container } = render(wrap(<NewsletterContent />));
    expect(screen.getByTestId('newsletter-dark-panel')).toBeTruthy();
    expect(container.querySelector('form')).not.toBeNull();
    expect(container.querySelector('input[type="email"]')).not.toBeNull();
  });

  it('renders archive CTA linking externally', () => {
    render(wrap(<NewsletterContent />));
    expect(screen.getByTestId('newsletter-archive-cta').getAttribute('href')).toContain(
      'beehiiv.com'
    );
  });
});

describe('BlogContent', () => {
  const samplePosts: BlogPost[] = [
    {
      slug: 'a',
      title: 'Test A',
      excerpt: 'one',
      date: '2026-04-01',
      readTime: '5 min',
      tag: 'Automation',
      tagColor: 'text-green bg-green-dim',
      published: true,
    },
    {
      slug: 'b',
      title: 'Test B',
      excerpt: 'two',
      date: '2026-03-01',
      readTime: '8 min',
      tag: 'Architecture',
      tagColor: 'text-violet bg-violet-dim',
      published: true,
    },
  ];

  it('renders SubpageHeader "05 · BLOG"', () => {
    render(wrap(<BlogContent publishedPosts={samplePosts} />));
    expect(screen.getByText(/05 · BLOG/)).toBeTruthy();
  });

  it('renders one row per published post', () => {
    const { container } = render(wrap(<BlogContent publishedPosts={samplePosts} />));
    expect(container.querySelectorAll('[data-testid="blog-row"]').length).toBe(2);
  });

  it('links each row to its slug', () => {
    const { container } = render(wrap(<BlogContent publishedPosts={samplePosts} />));
    const rows = container.querySelectorAll('[data-testid="blog-row"] a');
    expect((rows[0] as HTMLAnchorElement).getAttribute('href')).toBe('/blog/a');
    expect((rows[1] as HTMLAnchorElement).getAttribute('href')).toBe('/blog/b');
  });

  it('renders newsletter CTA', () => {
    render(wrap(<BlogContent publishedPosts={samplePosts} />));
    expect(screen.getByTestId('blog-cta').getAttribute('href')).toBe('/newsletter');
  });
});
