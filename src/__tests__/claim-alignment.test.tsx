import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { HomeContent } from '@/components/pages/HomeContent';
import { AboutContent } from '@/components/pages/AboutContent';
import { ProjectsContent } from '@/components/pages/ProjectsContent';
import { ExperienceContent } from '@/components/pages/ExperienceContent';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const FORBIDDEN = [
  'millions of users',
  'millones de usuarios',
  '1M+',
  '4+ years',
  '4+ años',
  'First LATAM cohort',
  'Primera cohorte LATAM',
];

const PAGES = [
  { name: 'Home', Component: HomeContent },
  { name: 'About', Component: AboutContent },
  { name: 'Projects', Component: ProjectsContent },
  { name: 'Experience', Component: ExperienceContent },
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
      const text = container.textContent ?? '';
      for (const phrase of FORBIDDEN) {
        expect(text, `${name} should not contain "${phrase}"`).not.toContain(phrase);
      }
    });

    it(`${name} (ES) contains none of the forbidden claims`, () => {
      window.localStorage.setItem('cf6.lang', 'es');
      const { container } = render(
        <LanguageProvider>
          <Component />
        </LanguageProvider>
      );
      const text = container.textContent ?? '';
      for (const phrase of FORBIDDEN) {
        expect(text, `${name} should not contain "${phrase}"`).not.toContain(phrase);
      }
      window.localStorage.removeItem('cf6.lang');
    });
  }
});
