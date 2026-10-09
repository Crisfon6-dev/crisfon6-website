# crisfon6-website

My portfolio — verifiable production numbers, bilingual EN/ES. Live at **[crisfon6.com](https://crisfon6.com)**.

## Stack

Next.js 16 (App Router) · React · Tailwind CSS v4 · MDX blog · Vitest + Playwright

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run test    # unit/component tests
npm run build   # production build (also validates MDX + static generation)
```

Other useful scripts: `npm run lint`, `npm run type-check`, `npm run test:e2e`.

## Structure

- `src/app/` — routes (Server Components that render the page content)
- `src/components/pages/` — client page content with i18n
- `src/i18n/messages.ts` — all UI copy, EN + ES
- `content/blog/` — MDX posts (file name = slug)

See [`CLAUDE.md`](./CLAUDE.md) for architecture notes and conventions.
