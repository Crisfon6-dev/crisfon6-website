import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { AboutContent } from '../AboutContent';
import { ProjectsContent } from '../ProjectsContent';
import { ExperienceContent } from '../ExperienceContent';
import { AutomationsContent } from '../AutomationsContent';
import { WorkWithMeContent } from '../WorkWithMeContent';
import { NewsletterContent } from '../NewsletterContent';
import { BlogContent } from '../BlogContent';
import { messages } from '@/i18n/messages';
import { ROLES, CREDENTIALS } from '@/data/career';
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

describe('ExperienceContent', () => {
  afterEach(() => {
    window.localStorage.removeItem('cf6.lang');
  });

  it('renders SubpageHeader "CV · EXPERIENCE"', () => {
    render(wrap(<ExperienceContent />));
    expect(screen.getByText(/CV · EXPERIENCE/)).toBeTruthy();
  });

  it('renders 6 roles: 5 under Work history, 1 under Founder work', () => {
    const { container } = render(wrap(<ExperienceContent />));
    const roles = container.querySelectorAll('[data-testid="role"]');
    expect(roles.length).toBe(6);

    const history = container.querySelector('[data-testid="work-history"]');
    const founder = container.querySelector('[data-testid="founder-work"]');
    expect(history?.querySelectorAll('[data-testid="role"]').length).toBe(5);
    expect(founder?.querySelectorAll('[data-testid="role"]').length).toBe(1);
  });

  it('gives each role article an id equal to the role id', () => {
    const { container } = render(wrap(<ExperienceContent />));
    for (const role of ROLES) {
      expect(container.querySelector(`#${role.id}[data-testid="role"]`)).toBeTruthy();
    }
  });

  it('shows exactly 2 "Current" chips, and none on the founder role', () => {
    const { container } = render(wrap(<ExperienceContent />));
    expect(container.querySelectorAll('[data-testid="current-chip"]').length).toBe(2);
    const founder = container.querySelector('#founder[data-testid="role"]');
    expect(founder?.querySelector('[data-testid="current-chip"]')).toBeNull();
  });

  it('renders a verify section with LinkedIn, GitHub and a mailto reference link', () => {
    const { container } = render(wrap(<ExperienceContent />));
    const verify = container.querySelector('[data-testid="verify"]');
    expect(verify).toBeTruthy();
    const hrefs = Array.from(verify?.querySelectorAll('a') ?? []).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs.some((h) => h?.includes('linkedin.com/in/crisfon6'))).toBe(true);
    expect(hrefs.some((h) => h?.includes('github.com/Crisfon6-dev'))).toBe(true);
    expect(hrefs.some((h) => h?.startsWith('mailto:'))).toBe(true);
  });

  it('renders a certificate Verify link only when verifyUrl is defined', () => {
    const { container } = render(wrap(<ExperienceContent />));
    const verifyLinks = container.querySelectorAll('[data-testid="cert-verify"]');
    expect(verifyLinks.length).toBe(CREDENTIALS.filter((c) => c.verifyUrl).length);
  });

  it('renders in Spanish when the stored locale is es', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    render(wrap(<ExperienceContent />));
    expect(screen.getByText(/CV · EXPERIENCIA/)).toBeTruthy();
  });

  it('calls window.print when "Save as PDF" is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(wrap(<ExperienceContent />));
    fireEvent.click(screen.getByTestId('print-button'));
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('hides the Writing section (no entry has a url yet)', () => {
    const { container } = render(wrap(<ExperienceContent />));
    expect(container.querySelector('[data-testid="writing-section"]')).toBeNull();
  });

  it('hides the Testimonials section (empty)', () => {
    const { container } = render(wrap(<ExperienceContent />));
    expect(container.querySelector('[data-testid="testimonials-section"]')).toBeNull();
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
