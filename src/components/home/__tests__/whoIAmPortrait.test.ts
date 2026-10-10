import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { PORTRAIT } from '../whoIAmAssets';

const file = path.join(process.cwd(), 'public', PORTRAIT.src);
const MAX_BYTES = 120_000;

describe('portrait asset', () => {
  it('exists under /public and stays under the byte budget', () => {
    expect(existsSync(file)).toBe(true);
    expect(statSync(file).size).toBeLessThan(MAX_BYTES);
  });

  it('is a WebP with an alpha channel, so one file sits on the card in light and dark', () => {
    const b = readFileSync(file);
    expect(b.subarray(0, 4).toString('ascii')).toBe('RIFF');
    expect(b.subarray(8, 12).toString('ascii')).toBe('WEBP');
    expect(b.subarray(12, 16).toString('ascii')).toBe('VP8X');
    expect(b[20] & 0x10, 'alpha flag').toBe(0x10);
  });

  it('has the size the markup reserves, so the page does not shift when it loads', () => {
    const b = readFileSync(file);
    const width = 1 + (b[24] | (b[25] << 8) | (b[26] << 16));
    const height = 1 + (b[27] | (b[28] << 8) | (b[29] << 16));
    expect({ width, height }).toEqual({ width: PORTRAIT.width, height: PORTRAIT.height });
  });
});
