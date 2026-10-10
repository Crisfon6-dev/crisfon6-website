import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const PAGES = {
  about: 'AboutContent.tsx',
  experience: 'ExperienceContent.tsx',
  projects: 'ProjectsContent.tsx',
  automations: 'AutomationsContent.tsx',
  blog: 'BlogContent.tsx',
  newsletter: 'NewsletterContent.tsx',
  work: 'WorkWithMeContent.tsx',
} as const;

const read = (file: string) =>
  readFileSync(path.join(process.cwd(), 'src', 'components', 'pages', file), 'utf8');

describe('every subpage carries its own film still', () => {
  it.each(Object.entries(PAGES))('%s passes plate="%s" to its header', (id, file) => {
    expect(read(file)).toContain(`plate="${id}"`);
  });

  it('draws no dark SaaS panel on any page: panels are slabs (dark buttons are fine)', () => {
    // a panel is a block with panel padding; buttons carry text-sm and tighter padding
    const darkPanel = /class(?:Name)?="[^"]*\bbg-warm-fg\b[^"]*\b(?:py-sp-8|p-sp-5|p-sp-6)\b/;
    for (const file of Object.values(PAGES)) {
      expect(read(file), file).not.toMatch(darkPanel);
    }
  });
});
