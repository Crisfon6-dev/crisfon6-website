import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config';

type Rule = { source: string; headers: { key: string; value: string }[] };

async function rules(): Promise<Rule[]> {
  const resolve = (nextConfig as { headers?: () => Promise<Rule[]> }).headers;
  return resolve ? await resolve() : [];
}

const cacheControl = (rule: Rule) =>
  rule.headers.find((header) => header.key.toLowerCase() === 'cache-control')?.value;

describe('next.config headers', () => {
  it('caches versioned hero assets for a year, immutable', async () => {
    const hero = (await rules()).find((rule) => rule.source === '/hero/:path*');
    expect(hero, 'a rule for /hero/:path*').toBeDefined();
    expect(cacheControl(hero!)).toBe('public, max-age=31536000, immutable');
  });

  it('never applies the immutable policy to the HTML routes', async () => {
    const broad = (await rules()).filter(
      (rule) => rule.source === '/' || rule.source === '/:path*' || rule.source === '/(.*)'
    );
    for (const rule of broad) {
      expect(cacheControl(rule) ?? '').not.toMatch(/immutable/);
    }
  });
});
