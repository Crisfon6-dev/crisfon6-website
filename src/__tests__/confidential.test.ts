import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render } from '@testing-library/react';
import { createElement } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { ExperienceContent } from '@/components/pages/ExperienceContent';
import { ProjectsContent } from '@/components/pages/ProjectsContent';
import { AboutContent } from '@/components/pages/AboutContent';
import { HomeContent } from '@/components/pages/HomeContent';
import { metadata as experienceMetadata } from '@/app/experience/page';
import { metadata as projectsMetadata } from '@/app/projects/page';
import { metadata as aboutMetadata } from '@/app/about/page';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const rawDenylist = process.env.CONFIDENTIAL_DENYLIST;
const denylist = rawDenylist
  ?.split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const describeOrSkip = denylist && denylist.length > 0 ? describe : describe.skip;

if (!denylist || denylist.length === 0) {
  console.warn(
    'CONFIDENTIAL_DENYLIST is not set — skipping confidentiality guard test. ' +
      'Source it locally (see openspec/changes/2026-09-27-verifiable-portfolio/spec.md R7) before trusting this suite.'
  );
}

const PAGES = [
  { name: 'Experience', Component: ExperienceContent },
  { name: 'Projects', Component: ProjectsContent },
  { name: 'About', Component: AboutContent },
  { name: 'Home', Component: HomeContent },
] as const;

function findViolation(text: string): string | undefined {
  const lower = text.toLowerCase();
  return denylist!.find((term) => lower.includes(term.toLowerCase()));
}

describeOrSkip('R7: confidentiality guard', () => {
  for (const { name, Component } of PAGES) {
    for (const locale of ['en', 'es'] as const) {
      it(`${name} (${locale}) contains no denylisted term`, () => {
        if (locale === 'es') window.localStorage.setItem('cf6.lang', 'es');
        const { container } = render(
          createElement(LanguageProvider, null, createElement(Component))
        );
        const violation = findViolation(container.textContent ?? '');
        window.localStorage.removeItem('cf6.lang');
        expect(
          violation,
          `${name} (${locale}) rendered output contains a denylisted term`
        ).toBeUndefined();
      });
    }
  }

  const sourceFiles = [
    'src/data/career.ts',
    'src/i18n/messages.ts',
    'src/app/experience/page.tsx',
    'src/app/projects/page.tsx',
    'src/app/about/page.tsx',
  ];

  for (const file of sourceFiles) {
    it(`${file} contains no denylisted term`, () => {
      const text = readFileSync(path.resolve(process.cwd(), file), 'utf-8');
      const violation = findViolation(text);
      expect(violation, `${file} contains a denylisted term`).toBeUndefined();
    });
  }

  it('page metadata contains no denylisted term', () => {
    const combined = JSON.stringify([experienceMetadata, projectsMetadata, aboutMetadata]);
    const violation = findViolation(combined);
    expect(violation, 'page metadata contains a denylisted term').toBeUndefined();
  });
});
