import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DEAD = [
  'ChapterPlate',
  'homeChapters',
  'chapterBeats',
  'plateOpacity',
  'FILM_TRAVEL_VH',
  'FILM_FRAME',
  'film-chapter',
  'sr-chapter',
  't.chapters',
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return name === 'node_modules' ? [] : files(full);
    return /\.(ts|tsx|css)$/.test(name) ? [full] : [];
  });
}

describe('the chapter system is gone', () => {
  it('no source or test file refers to a removed chapter identifier', () => {
    const self = path.join(ROOT, 'src/__tests__/noChapterCode.test.ts');
    const hits = [...files(path.join(ROOT, 'src')), ...files(path.join(ROOT, 'tests'))]
      .filter((file) => file !== self)
      .flatMap((file) => {
        const text = readFileSync(file, 'utf8');
        return DEAD.filter((word) => text.includes(word)).map(
          (word) => `${path.relative(ROOT, file)}: ${word}`
        );
      });
    expect(hits).toEqual([]);
  });

  it('the translations carry no chapters block and no hero bridge line', () => {
    const text = readFileSync(path.join(ROOT, 'src/i18n/messages.ts'), 'utf8');
    expect(text).not.toMatch(/^\s{4}chapters:/m);
    expect(text).not.toMatch(/^\s{6}bridge:/m);
  });
});
