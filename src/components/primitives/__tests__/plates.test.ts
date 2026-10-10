import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { PLATES, type PlateId } from '../plates';

const STILL_BUDGET_BYTES = 150_000;
const DENYLIST = ['aphrodite', 'nsfw', 'adult', 'stealth'];
const ROUTES: PlateId[] = [
  'about',
  'experience',
  'projects',
  'automations',
  'blog',
  'newsletter',
  'work',
];

const fileOf = (src: string) => path.join(process.cwd(), 'public', src);

describe('PLATES: one film still per page', () => {
  it('has a still for every page', () => {
    expect(Object.keys(PLATES).sort()).toEqual([...ROUTES].sort());
  });

  it('gives each page its own still, so no two headers look the same', () => {
    expect(new Set(Object.values(PLATES)).size).toBe(ROUTES.length);
  });

  it.each(ROUTES)(
    '%s: the file exists, is a versioned WebP and fits the 150,000 byte budget',
    (id) => {
      const src = PLATES[id];
      expect(src).toMatch(/^\/plates\/plate-[a-z]+-v\d+\.webp$/);
      expect(existsSync(fileOf(src)), src).toBe(true);
      expect(statSync(fileOf(src)).size).toBeLessThanOrEqual(STILL_BUDGET_BYTES);
    }
  );

  it('carries no client or product identifier in any file name', () => {
    for (const src of Object.values(PLATES)) {
      for (const term of DENYLIST) expect(src.toLowerCase()).not.toContain(term);
    }
  });
});
