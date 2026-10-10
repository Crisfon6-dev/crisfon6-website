import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { HomeContent } from '@/components/pages/HomeContent';
import { AboutContent } from '@/components/pages/AboutContent';
import { ProjectsContent } from '@/components/pages/ProjectsContent';
import { ExperienceContent } from '@/components/pages/ExperienceContent';
import { NewsletterContent } from '@/components/pages/NewsletterContent';
import { AutomationsContent } from '@/components/pages/AutomationsContent';
import { WorkWithMeContent } from '@/components/pages/WorkWithMeContent';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const FORBIDDEN = [
  'millions of users',
  'millones de usuarios',
  '1M+',
  '4+ years',
  '4+ años',
  'First LATAM cohort',
  'Primera cohorte LATAM',
  // Unverified numbers and frequency promises the blog cannot back (2 posts).
  '15h',
  'every week',
  'weekly',
  'cada semana',
  'semanal',
  // The side product stays pre-launch and vertical-neutral.
  'stealth',
  'nsfw',
  'adult',
];

const PAGES = [
  { name: 'Home', Component: HomeContent },
  { name: 'About', Component: AboutContent },
  { name: 'Projects', Component: ProjectsContent },
  { name: 'Experience', Component: ExperienceContent },
  { name: 'Newsletter', Component: NewsletterContent },
  { name: 'Automations', Component: AutomationsContent },
  { name: 'WorkWithMe', Component: WorkWithMeContent },
] as const;

describe('R4: claim alignment', () => {
  afterEach(() => {
    window.localStorage.removeItem('cf6.lang');
  });

  for (const { name, Component } of PAGES) {
    it(`${name} (EN) contains none of the forbidden claims`, () => {
      const { container } = render(
        <LanguageProvider>
          <Component />
        </LanguageProvider>
      );
      const text = (container.textContent ?? '').toLowerCase();
      for (const phrase of FORBIDDEN) {
        expect(text, `${name} should not contain "${phrase}"`).not.toContain(phrase.toLowerCase());
      }
    });

    it(`${name} (ES) contains none of the forbidden claims`, () => {
      window.localStorage.setItem('cf6.lang', 'es');
      const { container } = render(
        <LanguageProvider>
          <Component />
        </LanguageProvider>
      );
      const text = (container.textContent ?? '').toLowerCase();
      for (const phrase of FORBIDDEN) {
        expect(text, `${name} should not contain "${phrase}"`).not.toContain(phrase.toLowerCase());
      }
      window.localStorage.removeItem('cf6.lang');
    });
  }
});
