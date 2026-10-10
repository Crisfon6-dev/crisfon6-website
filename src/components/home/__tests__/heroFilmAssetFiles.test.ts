import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { HERO_FILM_ASSETS, HERO_FILM_ASSETS_NIGHT } from '../heroFilmAssets';

const PUBLIC = path.join(process.cwd(), 'public');
const MAX_VIDEO_BYTES = 20 * 1024 * 1024;
const MAX_IMAGE_BYTES = 200 * 1024;

const files = (set: typeof HERO_FILM_ASSETS | typeof HERO_FILM_ASSETS_NIGHT) => [
  set.video,
  set.poster,
  ...set.stills.map((s) => s.src),
];

describe.each([
  ['light', HERO_FILM_ASSETS],
  ['night', HERO_FILM_ASSETS_NIGHT],
])('%s hero film files', (_name, set) => {
  it('exist under /public, so no theme can ship a broken film', () => {
    for (const file of files(set)) {
      expect(existsSync(path.join(PUBLIC, file)), file).toBe(true);
    }
  });

  it('stay light enough to load: video under 20 MB, images under 200 KB', () => {
    expect(statSync(path.join(PUBLIC, set.video)).size).toBeLessThan(MAX_VIDEO_BYTES);
    for (const file of [set.poster, ...set.stills.map((s) => s.src)]) {
      expect(statSync(path.join(PUBLIC, file)).size, file).toBeLessThan(MAX_IMAGE_BYTES);
    }
  });
});
