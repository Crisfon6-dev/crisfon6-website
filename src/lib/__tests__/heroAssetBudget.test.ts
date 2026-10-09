import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { HERO_ASSET_BUDGET, checkHeroAssets, toolsAvailable } from '../heroAssetBudget';

const hasTools = toolsAvailable();

let dir = '';
beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'hero-assets-'));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const put = (name: string, bytes: number) =>
  writeFileSync(path.join(dir, name), Buffer.alloc(bytes));

function makeVideo(name: string, extra: string[], gop: number) {
  execFileSync(
    'ffmpeg',
    [
      '-v',
      'error',
      '-y',
      '-f',
      'lavfi',
      '-i',
      'testsrc=size=64x64:rate=12:duration=2',
      ...(extra.includes('audio') ? ['-f', 'lavfi', '-i', 'sine=frequency=440:duration=2'] : []),
      '-c:v',
      'libx264',
      '-g',
      String(gop),
      '-pix_fmt',
      'yuv420p',
      ...(extra.includes('audio') ? ['-c:a', 'aac'] : ['-an']),
      ...(extra.includes('tag') ? ['-metadata', 'title=leak'] : ['-map_metadata', '-1']),
      '-fflags',
      '+bitexact',
      '-flags:v',
      '+bitexact',
      path.join(dir, name),
    ],
    { stdio: 'ignore' }
  );
}

describe('HERO_ASSET_BUDGET', () => {
  it('is expressed in bytes', () => {
    expect(HERO_ASSET_BUDGET).toEqual({ video: 8_000_000, poster: 200_000, still: 150_000 });
  });
});

describe('checkHeroAssets: sizes and names (always on)', () => {
  it('passes a compliant set', () => {
    put('hero-v1-desktop.mp4', 1_000);
    put('hero-v1-poster.webp', 20_000);
    put('hero-v1-compute.webp', 30_000);
    const result = checkHeroAssets(dir, { probe: false });
    expect(result.violations).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it('fails when the video is one byte over 8,000,000', () => {
    put('hero-v1-desktop.mp4', HERO_ASSET_BUDGET.video + 1);
    const result = checkHeroAssets(dir, { probe: false });
    expect(result.ok).toBe(false);
    expect(result.violations.join('\n')).toMatch(/hero-v1-desktop\.mp4.*8000001.*8000000/);
  });

  it('accepts a video of exactly 8,000,000 bytes', () => {
    put('hero-v1-desktop.mp4', HERO_ASSET_BUDGET.video);
    expect(checkHeroAssets(dir, { probe: false }).ok).toBe(true);
  });

  it('fails an oversized poster and an oversized still', () => {
    put('hero-v1-poster.webp', HERO_ASSET_BUDGET.poster + 1);
    put('hero-v1-data.webp', HERO_ASSET_BUDGET.still + 1);
    const text = checkHeroAssets(dir, { probe: false }).violations.join('\n');
    expect(text).toMatch(/hero-v1-poster\.webp/);
    expect(text).toMatch(/hero-v1-data\.webp/);
  });

  it('fails any mobile video', () => {
    put('hero-v1-mobile.mp4', 1_000);
    expect(checkHeroAssets(dir, { probe: false }).violations.join('\n')).toMatch(/mobile/i);
  });

  it('fails files without a version suffix', () => {
    put('hero-desktop.mp4', 1_000);
    expect(checkHeroAssets(dir, { probe: false }).violations.join('\n')).toMatch(/version/i);
  });

  it('fails unexpected file types', () => {
    put('hero-v1-notes.txt', 10);
    expect(checkHeroAssets(dir, { probe: false }).violations.join('\n')).toMatch(/type/i);
  });

  it('fails a file name containing a denylisted term', () => {
    put('hero-v1-aphrodite.webp', 10);
    expect(checkHeroAssets(dir, { probe: false }).violations.join('\n')).toMatch(/denylist/i);
  });

  it('fails a file name containing a term from the extra denylist', () => {
    put('hero-v1-acmebank.webp', 10);
    const result = checkHeroAssets(dir, { probe: false, extraDenylist: ['AcmeBank'] });
    expect(result.violations.join('\n')).toMatch(/denylist/i);
  });

  it('fails when the directory does not exist', () => {
    const result = checkHeroAssets(path.join(dir, 'missing'), { probe: false });
    expect(result.ok).toBe(false);
    expect(result.violations.join('\n')).toMatch(/not found|does not exist/i);
  });
});

describe.skipIf(!hasTools)('checkHeroAssets: stream properties (needs ffmpeg and ffprobe)', () => {
  it('passes an all-intra video with no audio and no tags', () => {
    makeVideo('hero-v1-desktop.mp4', [], 1);
    const result = checkHeroAssets(dir, { probe: true });
    expect(result.violations).toEqual([]);
  });

  it('fails a video that is not all-intra', () => {
    makeVideo('hero-v1-desktop.mp4', [], 12);
    expect(checkHeroAssets(dir, { probe: true }).violations.join('\n')).toMatch(/intra/i);
  });

  it('fails a video with an audio stream', () => {
    makeVideo('hero-v1-desktop.mp4', ['audio'], 1);
    expect(checkHeroAssets(dir, { probe: true }).violations.join('\n')).toMatch(/audio/i);
  });

  it('fails a video carrying a metadata tag', () => {
    makeVideo('hero-v1-desktop.mp4', ['tag'], 1);
    expect(checkHeroAssets(dir, { probe: true }).violations.join('\n')).toMatch(/tag/i);
  });
});

describe('the shipped assets in public/hero', () => {
  it('satisfy every budget and rule', () => {
    const result = checkHeroAssets(path.join(process.cwd(), 'public', 'hero'), {
      probe: hasTools,
      extraDenylist: (process.env.CONFIDENTIAL_DENYLIST ?? '')
        .split(',')
        .map((term) => term.trim())
        .filter(Boolean),
    });
    expect(result.violations).toEqual([]);
  });
});
