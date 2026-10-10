# Home Introduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home page introduce the person first (hero, then "Who I am", then proof, then contact), turn the film into a backdrop behind the first three sections, move the case decision lines into the case cards, and delete the chapter system.

**Architecture:** `HeroFilm` becomes a wrapper that takes the first three home sections as children and keeps the footage pinned behind them; playback follows the wrapper's measured height (`filmTravelPx`, `filmProgressOver`, `veilOpacityOver`, pure and tested). A new `WhoIAm` component reads every fact from `career.ts` and `messages.ts`. The chapter code (`ChapterPlate`, `homeChapters`, `chapterBeats`, the stills grid, the sr-only list, the plate) is deleted once nothing uses it.

**Tech Stack:** Next.js App Router (client components), React 19, TypeScript, Tailwind v4 + `globals.css`, next-themes, Vitest + Testing Library, Playwright, Python/PIL + ffmpeg for the portrait asset.

**Spec:** `docs/superpowers/specs/2026-10-10-home-introduction-design.md`

## Global Constraints

- Branch `feat/home-introduction`, created from `main` at the merge of PR #30. Worktree `.claude/worktrees/ux-overhaul`.
- No new copy about the owner: every sentence and fact is read from `career.ts` or existing `messages.ts` keys. New translation keys are UI labels only (`whoIAm.*`, `cta.seeCase`).
- English and Spanish both ship. No English may appear in the `es` locale.
- Visual language unchanged: same type, warm-black and coral palette, `.slab` card. Text over the footage must sit on a `.slab` (near-opaque) or under the hero shade.
- Contrast stays at 4.5:1 or better; tap targets stay at 44px.
- Conventional commits, no attribution trailers, body lines under 100 chars.
- `.superpowers/` is excluded locally via `.git/info/exclude`; never `git add -A`, add explicit paths.
- **Before every push run the whole unit suite the way CI does: `CONFIDENTIAL_DENYLIST= npx vitest run`** (this includes `src/lib`, which a previous CI failure came from), plus `npx tsc --noEmit`, `npm run lint`, `npx next build`, `npx playwright test`.
- Any file added under `public/hero/` must satisfy `src/lib/__tests__/heroAssetBudget.test.ts` (video under 15,000,000 bytes, format tags limited to container brand fields). The portrait goes to `public/people/`, not `public/hero/`.
- The portrait source is the owner's photo at `/private/tmp/claude-501/-Users-crisfon6-Work-NextGol-projects-crisfon6-website/902a92da-4360-48cb-aba7-a3cad6494de5/images/4.png` (1500x2000). The face is never retouched.

## Review Focus

- **Spanish locale in `WhoIAm`:** every label and fact is Spanish, no English leak (labels that are identical in both languages, such as "STACK", are exempt). (Task 4)
- **No wrapper height, no `ResizeObserver`, non-finite scroll:** film progress is 0, the veil is its minimum, nothing throws. (Tasks 1 and 5)
- **A case without a decision line:** the card renders no empty element. (Task 2)
- **No JavaScript or server render:** all three introduction sections are in the HTML, no media is requested, and there is no empty film spacer. (Task 5)
- **Mode flips after hydration (pending -> film -> stills on resize):** the children are not remounted, so their state survives. (Task 5)

---

### Task 1: Film progress over a measured height

**Files:**

- Modify: `src/components/home/heroFilmLogic.ts` (append)
- Test: `src/components/home/__tests__/heroFilmLogic.test.ts`

**Interfaces:**

- Produces:
  - `filmTravelPx(wrapperHeight: number, viewportHeight: number): number`
  - `filmProgressOver(scrollY: number, travelPx: number): number`
  - `veilOpacityOver(scrollY: number, viewportHeight: number, travelPx: number): number`
    (The old `filmProgress`, `veilOpacity`, `plateOpacity` stay until Task 6, so the code keeps compiling.)

- [ ] **Step 1: Write the failing test**

In `heroFilmLogic.test.ts`, extend the import to add `filmTravelPx, filmProgressOver, veilOpacityOver`, then append:

```ts
describe('filmTravelPx (the scroll distance the film plays over)', () => {
  it('is the wrapper height minus one viewport, since the film is fixed behind the sections', () => {
    expect(filmTravelPx(2400, 800)).toBe(1600);
  });

  it('is 0 when the wrapper is not taller than the viewport', () => {
    expect(filmTravelPx(800, 800)).toBe(0);
    expect(filmTravelPx(300, 800)).toBe(0);
  });

  it('is 0 for non-finite input', () => {
    expect(filmTravelPx(Number.NaN, 800)).toBe(0);
    expect(filmTravelPx(2400, Number.POSITIVE_INFINITY)).toBe(0);
  });
});

describe('filmProgressOver', () => {
  it('is 0 at the top and 1 once the whole travel has been scrolled', () => {
    expect(filmProgressOver(0, 1600)).toBe(0);
    expect(filmProgressOver(1600, 1600)).toBe(1);
  });

  it('is linear in between and clamps outside the range', () => {
    expect(filmProgressOver(800, 1600)).toBe(0.5);
    expect(filmProgressOver(-40, 1600)).toBe(0);
    expect(filmProgressOver(99999, 1600)).toBe(1);
  });

  it('is 0 when there is no travel or the input is invalid', () => {
    expect(filmProgressOver(100, 0)).toBe(0);
    expect(filmProgressOver(100, -5)).toBe(0);
    expect(filmProgressOver(Number.NaN, 1600)).toBe(0);
    expect(filmProgressOver(100, Number.NaN)).toBe(0);
  });
});

describe('veilOpacityOver', () => {
  it('stays at the minimum while the film plays', () => {
    expect(veilOpacityOver(0, 800, 1600)).toBe(VEIL_MIN);
    expect(veilOpacityOver(1600, 800, 1600)).toBe(VEIL_MIN);
  });

  it('ramps to the maximum over VEIL_RAMP_VH viewports after the travel ends', () => {
    const mid = veilOpacityOver(1600 + (VEIL_RAMP_VH / 2) * 800, 800, 1600);
    expect(mid).toBeCloseTo((VEIL_MIN + VEIL_MAX) / 2, 5);
    expect(veilOpacityOver(1600 + VEIL_RAMP_VH * 800, 800, 1600)).toBeCloseTo(VEIL_MAX, 5);
  });

  it('is the minimum for invalid input', () => {
    expect(veilOpacityOver(Number.NaN, 800, 1600)).toBe(VEIL_MIN);
    expect(veilOpacityOver(100, 0, 1600)).toBe(VEIL_MIN);
    expect(veilOpacityOver(100, 800, Number.NaN)).toBe(VEIL_MIN);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/heroFilmLogic.test.ts`
Expected: FAIL (`filmTravelPx is not a function` or similar).

- [ ] **Step 3: Write minimal implementation** (append to `heroFilmLogic.ts`)

```ts
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The scroll distance the film plays over. The film is fixed behind the sections it wraps, so it
 * has played through once the wrapper's bottom reaches the bottom of the viewport.
 */
export function filmTravelPx(wrapperHeight: number, viewportHeight: number): number {
  if (![wrapperHeight, viewportHeight].every(Number.isFinite)) return 0;
  return Math.max(0, wrapperHeight - viewportHeight);
}

/** Film progress for a travel in pixels; no travel (or invalid input) reads as the first frame. */
export function filmProgressOver(scrollY: number, travelPx: number): number {
  if (![scrollY, travelPx].every(Number.isFinite) || travelPx <= 0) return 0;
  return clamp01(scrollY / travelPx);
}

/** Page-colour veil over the film for a travel in pixels: minimal while it plays, closing after. */
export function veilOpacityOver(scrollY: number, viewportHeight: number, travelPx: number): number {
  if (![scrollY, viewportHeight, travelPx].every(Number.isFinite) || viewportHeight <= 0) {
    return VEIL_MIN;
  }
  const t = clamp01((scrollY - travelPx) / (viewportHeight * VEIL_RAMP_VH));
  return VEIL_MIN + (VEIL_MAX - VEIL_MIN) * t;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/__tests__/heroFilmLogic.test.ts`
Expected: PASS (the older describes still pass too).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/heroFilmLogic.ts src/components/home/__tests__/heroFilmLogic.test.ts
git commit -m "feat(home): film progress over a measured height"
```

---

### Task 2: Decision line in the case cards, and the "Read the case" label

**Files:**

- Modify: `src/components/home/featuredCaseData.ts`, `src/components/home/FeaturedProjectsSection.tsx`, `src/components/home/HorizontalCases.tsx`, `src/i18n/messages.ts` (`cta` block, both locales)
- Test: create `src/components/home/__tests__/featuredCaseData.test.ts`; modify `src/components/home/__tests__/FeaturedCases.test.tsx`

**Interfaces:**

- Consumes: `CaseStudy.decision?: L` (already in `career.ts`).
- Produces: `FeaturedCase.decision: string | null`; `t.cta.seeCase` (replaces `t.chapters.seeCase` in the cards); card element `data-testid="case-decision"`.

- [ ] **Step 1: Write the failing tests**

Create `featuredCaseData.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { CASE_STUDIES } from '@/data/career';
import { FEATURED_IDS, getFeaturedCases } from '../featuredCaseData';

describe('getFeaturedCases: decision line', () => {
  it.each(['en', 'es'] as const)('reads the decision from career data in %s', (locale) => {
    for (const card of getFeaturedCases(locale)) {
      const cs = CASE_STUDIES.find((c) => c.id === card.id)!;
      expect(card.decision, card.id).toBe(cs.decision?.[locale] ?? null);
    }
  });

  it('has a decision for the cases that define one and null for the rest', () => {
    const byId = Object.fromEntries(getFeaturedCases('en').map((c) => [c.id, c.decision]));
    expect(byId['aws-cost-audit']).toBeTruthy();
    expect(byId['ai-orchestration-harness']).toBeTruthy();
    expect(byId['credit-marketplace']).toBeNull();
    expect(FEATURED_IDS.length).toBe(getFeaturedCases('en').length);
  });
});
```

In `FeaturedCases.test.tsx`: change `messages.en.chapters.seeCase` to `messages.en.cta.seeCase` (line ~105), and add this block at the end of the file:

```tsx
describe('decision line on the cards', () => {
  it('shows it on a track card that has one and renders no empty element on one that does not', () => {
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const cards = screen.getAllByTestId('case-card');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      const line = cards[i].querySelector('[data-testid="case-decision"]');
      if (cs.decision) expect(line?.textContent, id).toBe(cs.decision.en);
      else expect(line, id).toBeNull();
    });
  });

  it('does the same in the vertical grid layout', () => {
    setEnv(800);
    render(wrap(<FeaturedCases />));
    const items = screen.getByTestId('featured-projects').querySelectorAll('li');
    FEATURED_IDS.forEach((id, i) => {
      const cs = CASE_STUDIES.find((c) => c.id === id)!;
      const line = items[i].querySelector('[data-testid="case-decision"]');
      if (cs.decision) expect(line?.textContent, id).toBe(cs.decision.en);
      else expect(line, id).toBeNull();
    });
  });

  it('speaks Spanish in the decision line', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    setEnv(1440);
    render(wrap(<FeaturedCases />));
    const aws = CASE_STUDIES.find((c) => c.id === 'aws-cost-audit')!;
    const idx = FEATURED_IDS.indexOf('aws-cost-audit');
    const cards = screen.getAllByTestId('case-card');
    expect(cards[idx].querySelector('[data-testid="case-decision"]')?.textContent).toBe(
      aws.decision!.es
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/home/__tests__/featuredCaseData.test.ts src/components/home/__tests__/FeaturedCases.test.tsx`
Expected: FAIL (`decision` undefined; `messages.en.cta.seeCase` undefined).

- [ ] **Step 3: Write the implementation**

`featuredCaseData.ts`: change the `proof` comment to `/** A second outcome from the case, shown as proof under the description. */`, add `decision: string | null;` to the `FeaturedCase` type, and `decision: cs.decision?.[locale] ?? null,` in the returned object.

`messages.ts` (python, with asserts):

```python
p='src/i18n/messages.ts'
s=open(p).read()
for old,new in [("      viewAll: 'View all',\n","      viewAll: 'View all',\n      seeCase: 'Read the case',\n"),
                ("      viewAll: 'Ver todos',\n","      viewAll: 'Ver todos',\n      seeCase: 'Leer el caso',\n")]:
    assert s.count(old)==1, old
    s=s.replace(old,new)
open(p,'w').write(s)
```

In both cards replace `{t.chapters.seeCase}` with `{t.cta.seeCase}`, and add under the description paragraph (before the `proof` block), using `p.decision` in `FeaturedProjectsSection` and `c.decision` in `HorizontalCases`:

```tsx
{
  c.decision ? (
    <p
      data-testid="case-decision"
      className="border-l-2 border-accent pl-sp-3 text-[15px] font-medium leading-relaxed text-warm-fg"
    >
      {c.decision}
    </p>
  ) : null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx tsc --noEmit && npx vitest run src/components/home/__tests__/featuredCaseData.test.ts src/components/home/__tests__/FeaturedCases.test.tsx src/i18n`
Expected: PASS. (The existing assertion that cards use no `.text-accent-text` still holds: the decision line uses `text-warm-fg`.)

- [ ] **Step 5: Commit**

```bash
git add src/components/home/featuredCaseData.ts src/components/home/FeaturedProjectsSection.tsx src/components/home/HorizontalCases.tsx src/i18n/messages.ts src/components/home/__tests__/featuredCaseData.test.ts src/components/home/__tests__/FeaturedCases.test.tsx
git commit -m "feat(home): decision line on the case cards"
```

---

### Task 3: The portrait asset

**Files:**

- Create: `src/components/home/whoIAmAssets.ts`, `public/people/cristhian-v1.webp`
- Test: `src/components/home/__tests__/whoIAmPortrait.test.ts`

**Interfaces:**

- Produces: `PORTRAIT = { src: '/people/cristhian-v1.webp', width: 800, height: 1000 } as const`.

- [ ] **Step 1: Write the failing test** (`whoIAmPortrait.test.ts`)

```ts
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
```

- [ ] **Step 2: Create the constants module and run the test to verify it fails**

`src/components/home/whoIAmAssets.ts`:

```ts
/** The owner's portrait: cropped to head and shoulders, background removed, face untouched. */
export const PORTRAIT = { src: '/people/cristhian-v1.webp', width: 800, height: 1000 } as const;
```

Run: `npx vitest run src/components/home/__tests__/whoIAmPortrait.test.ts`
Expected: FAIL (`existsSync` is false: the file is not there yet).

- [ ] **Step 3: Produce the asset**

1. Crop to a 4:5 head-and-shoulders box and save to the scratchpad (outside the repo):

```bash
SCR=/private/tmp/claude-501/-Users-crisfon6-Work-NextGol-projects-crisfon6-website/902a92da-4360-48cb-aba7-a3cad6494de5/scratchpad/portrait; mkdir -p $SCR
python3 -I - <<'EOF'
from PIL import Image
src='/private/tmp/claude-501/-Users-crisfon6-Work-NextGol-projects-crisfon6-website/902a92da-4360-48cb-aba7-a3cad6494de5/images/4.png'
SCR='/private/tmp/claude-501/-Users-crisfon6-Work-NextGol-projects-crisfon6-website/902a92da-4360-48cb-aba7-a3cad6494de5/scratchpad/portrait'
im=Image.open(src).convert('RGB')
im.crop((340,470,1340,1720)).resize((800,1000),Image.LANCZOS).save(f'{SCR}/crop.png')
EOF
```

Open `crop.png` with the Read tool and confirm: the head has room above it, the shirt fills the bottom, no second person's face is in frame. Adjust the box if not.

2. Remove the background with Higgsfield: load `mcp__claude_ai_higgsfield__remove_background` with ToolSearch, upload `crop.png` (`media_upload`, `curl -X PUT`, `media_confirm`), run the tool, check the balance before and after and report the credit delta, download the result as `cutout.png`.
3. Check the cutout: composite it on `#0e0e0c` and on `#fafaf7` into one image and Read it. Look at the hair edge, the ear, and the collar. **If the edge is rough, stop and ask the owner** to choose between a softer edge and a plain dark backdrop (spec, Photo section). Do not retouch the face.
4. Save as lossy WebP with alpha, target under 120 KB:

```bash
mkdir -p public/people
python3 -I - <<'EOF'
from PIL import Image
SCR='/private/tmp/claude-501/-Users-crisfon6-Work-NextGol-projects-crisfon6-website/902a92da-4360-48cb-aba7-a3cad6494de5/scratchpad/portrait'
im=Image.open(f'{SCR}/cutout.png').convert('RGBA').resize((800,1000),Image.LANCZOS)
im.save('public/people/cristhian-v1.webp','WEBP',quality=82,method=6,exact=True)
EOF
stat -f "%z bytes" public/people/cristhian-v1.webp
```

If it is over 120,000 bytes, lower `quality` in steps of 4 and re-check the edge.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/__tests__/whoIAmPortrait.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add public/people/cristhian-v1.webp src/components/home/whoIAmAssets.ts src/components/home/__tests__/whoIAmPortrait.test.ts
git commit -m "feat(home): portrait asset for the introduction"
```

---

### Task 4: The "Who I am" section

**Files:**

- Create: `src/components/home/WhoIAm.tsx`
- Modify: `src/i18n/messages.ts` (new `whoIAm` block in both locales), `src/components/home/index.ts` (export)
- Test: `src/components/home/__tests__/WhoIAm.test.tsx`

**Interfaces:**

- Consumes: `PORTRAIT` (Task 3), `t.about.intro1`, `t.about.businessAngle`, `t.experience.present`, `ROLES`, `sortRoles`, `formatRolePeriod`, `PROFILE`, `CREDENTIALS`, `STACK_GROUPS`.
- Produces: `WhoIAm()` rendering `<section data-testid="who-i-am">`; constants `WHO_CREDENTIALS_MAX = 3`, `WHO_STACK_GROUPS = 4`, `WHO_STACK_ITEMS = 3`; `t.whoIAm.{kicker, now, based, credentials, stack, fullStory, workHistory, photoAlt}`.

- [ ] **Step 1: Write the failing test** (`WhoIAm.test.tsx`)

```tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { messages } from '@/i18n/messages';
import {
  CREDENTIALS,
  PROFILE,
  ROLES,
  STACK_GROUPS,
  formatRolePeriod,
  sortRoles,
} from '@/data/career';
import { WhoIAm, WHO_CREDENTIALS_MAX, WHO_STACK_GROUPS, WHO_STACK_ITEMS } from '../WhoIAm';
import { PORTRAIT } from '../whoIAmAssets';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

afterEach(() => window.localStorage.removeItem('cf6.lang'));

const renderSection = () =>
  render(
    <LanguageProvider>
      <WhoIAm />
    </LanguageProvider>
  );

const current = sortRoles(ROLES).find((r) => r.kind === 'employment' && r.end === null)!;

describe('WhoIAm', () => {
  it('leads with the About intro and the business angle, read from the messages', () => {
    renderSection();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(messages.en.about.intro1);
    expect(screen.getByText(messages.en.about.businessAngle)).toBeTruthy();
  });

  it('shows the current role from career data', () => {
    renderSection();
    const text = screen.getByTestId('who-i-am').textContent!;
    expect(text).toContain(current.title.en);
    expect(text).toContain(current.employer.en);
    expect(text).toContain(formatRolePeriod(current, 'en', messages.en.experience.present));
    expect(text).toContain(current.clientLine.en);
  });

  it('shows the location from the profile', () => {
    renderSection();
    expect(screen.getByTestId('who-i-am').textContent).toContain(PROFILE.location.en);
  });

  it('shows at most three credentials, in the data order', () => {
    renderSection();
    const shown = CREDENTIALS.slice(0, WHO_CREDENTIALS_MAX);
    expect(WHO_CREDENTIALS_MAX).toBe(3);
    const text = screen.getByTestId('who-i-am').textContent!;
    for (const c of shown) expect(text).toContain(c.name.en);
    for (const c of CREDENTIALS.slice(WHO_CREDENTIALS_MAX)) {
      expect(text, c.name.en).not.toContain(c.name.en);
    }
    expect(screen.getAllByTestId('who-credential').map((el) => el.textContent)).toEqual(
      shown.map((c) => expect.stringContaining(c.name.en))
    );
  });

  it('shows four stack groups with the first three items of each, in the data order', () => {
    renderSection();
    expect([WHO_STACK_GROUPS, WHO_STACK_ITEMS]).toEqual([4, 3]);
    const rows = screen.getAllByTestId('who-stack-group');
    expect(rows).toHaveLength(WHO_STACK_GROUPS);
    STACK_GROUPS.slice(0, WHO_STACK_GROUPS).forEach((g, i) => {
      expect(rows[i].textContent).toContain(g.group);
      for (const item of g.items.slice(0, WHO_STACK_ITEMS)) {
        expect(rows[i].textContent).toContain(item);
      }
      for (const item of g.items.slice(WHO_STACK_ITEMS)) {
        expect(rows[i].textContent, item).not.toContain(item);
      }
    });
  });

  it('links to the full story and the work history', () => {
    renderSection();
    expect(
      screen
        .getByRole('link', { name: new RegExp(messages.en.whoIAm.fullStory) })
        .getAttribute('href')
    ).toBe('/about');
    expect(
      screen
        .getByRole('link', { name: new RegExp(messages.en.whoIAm.workHistory) })
        .getAttribute('href')
    ).toBe('/experience');
  });

  it('shows the portrait with localized alt text and the reserved size', () => {
    renderSection();
    const img = screen.getByAltText(messages.en.whoIAm.photoAlt);
    expect(img.getAttribute('src')).toBe(PORTRAIT.src);
    expect(img.getAttribute('width')).toBe(String(PORTRAIT.width));
    expect(img.getAttribute('height')).toBe(String(PORTRAIT.height));
  });

  it('sits in a slab, so text contrast does not depend on the footage behind it', () => {
    renderSection();
    expect(screen.getByTestId('who-i-am').querySelector('.slab')).toBeTruthy();
  });

  it('speaks Spanish with no English leak in the labels or the facts', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    renderSection();
    const text = screen.getByTestId('who-i-am').textContent!;
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(messages.es.about.intro1);
    expect(text).toContain(PROFILE.location.es);
    expect(text).toContain(current.clientLine.es);
    for (const key of Object.keys(messages.en.whoIAm) as (keyof typeof messages.en.whoIAm)[]) {
      // photoAlt is an attribute, not text; labels identical in both languages cannot leak
      if (key === 'photoAlt' || messages.en.whoIAm[key] === messages.es.whoIAm[key]) continue;
      expect(text, key).not.toContain(messages.en.whoIAm[key]);
      expect(text, key).toContain(messages.es.whoIAm[key]);
    }
    expect(screen.getByAltText(messages.es.whoIAm.photoAlt)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/WhoIAm.test.tsx`
Expected: FAIL (module `../WhoIAm` not found).

- [ ] **Step 3: Write the implementation**

(a) `messages.ts`: insert a `whoIAm` block before each `featuredProjects:` key (the first occurrence is English, the second Spanish):

```python
p='src/i18n/messages.ts'
s=open(p).read()
en="""    whoIAm: {
      kicker: 'WHO I AM',
      now: 'NOW',
      based: 'BASED',
      credentials: 'CREDENTIALS',
      stack: 'STACK',
      fullStory: 'Full story',
      workHistory: 'Work history',
      photoAlt: 'Portrait of Cristhian Fonseca',
    },
"""
es="""    whoIAm: {
      kicker: 'QUIÉN SOY',
      now: 'AHORA',
      based: 'UBICACIÓN',
      credentials: 'CREDENCIALES',
      stack: 'STACK',
      fullStory: 'Mi historia completa',
      workHistory: 'Historia laboral',
      photoAlt: 'Retrato de Cristhian Fonseca',
    },
"""
key="    featuredProjects:"
assert s.count(key)==2, s.count(key)
i=s.index(key); s=s[:i]+en+s[i:]
j=s.index(key,i+len(en)+len(key)); s=s[:j]+es+s[j:]
open(p,'w').write(s)
```

(b) `src/components/home/WhoIAm.tsx`:

```tsx
'use client';

/* The portrait is a pre-optimized WebP served from /public, so Next's image optimizer would only
   re-encode it: a plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import {
  CREDENTIALS,
  PROFILE,
  ROLES,
  STACK_GROUPS,
  formatRolePeriod,
  sortRoles,
} from '@/data/career';
import { PORTRAIT } from './whoIAmAssets';

export const WHO_CREDENTIALS_MAX = 3;
export const WHO_STACK_GROUPS = 4;
export const WHO_STACK_ITEMS = 3;

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-sp-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed text-warm-fg">{children}</dd>
    </div>
  );
}

/** The introduction: who the owner is, from existing data only. Sits in a slab over the footage. */
export function WhoIAm() {
  const { t, locale } = useLanguage();
  const now = sortRoles(ROLES).find((r) => r.kind === 'employment' && r.end === null);
  const credentials = CREDENTIALS.slice(0, WHO_CREDENTIALS_MAX);
  const stack = STACK_GROUPS.slice(0, WHO_STACK_GROUPS).map((g) => ({
    group: g.group,
    items: g.items.slice(0, WHO_STACK_ITEMS),
  }));

  return (
    <section
      id="who-i-am"
      data-testid="who-i-am"
      aria-labelledby="who-i-am-title"
      className="mx-auto max-w-6xl px-sp-5 pb-sp-7"
    >
      <div className="slab grid gap-sp-6 p-sp-5 sm:p-sp-6 md:grid-cols-12 md:items-center">
        <div className="mx-auto w-full max-w-[280px] md:col-span-4 md:max-w-none">
          <img
            src={PORTRAIT.src}
            width={PORTRAIT.width}
            height={PORTRAIT.height}
            alt={t.whoIAm.photoAlt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>

        <div className="md:col-span-8">
          <Kicker>{t.whoIAm.kicker}</Kicker>
          <h2
            id="who-i-am-title"
            className="mt-sp-3 font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              fontWeight: 600,
            }}
          >
            {t.about.intro1}
          </h2>
          <p className="mt-sp-3 max-w-[60ch] text-base leading-relaxed text-warm-fg-muted">
            {t.about.businessAngle}
          </p>

          <dl className="mt-sp-5 grid gap-sp-4">
            {now ? (
              <Fact label={t.whoIAm.now}>
                {now.title[locale]} · {now.employer[locale]} ·{' '}
                {formatRolePeriod(now, locale, t.experience.present)}
                <span className="block text-warm-fg-muted">{now.clientLine[locale]}</span>
              </Fact>
            ) : null}
            <Fact label={t.whoIAm.based}>{PROFILE.location[locale]}</Fact>
            <Fact label={t.whoIAm.credentials}>
              <span className="flex flex-wrap gap-sp-2">
                {credentials.map((c) => (
                  <Chip
                    key={c.name.en}
                    data-testid="who-credential"
                    variant="default"
                    className="px-sp-3 py-sp-2 text-[12px] normal-case"
                  >
                    {c.name[locale]} · {c.issuer}
                  </Chip>
                ))}
              </span>
            </Fact>
            <Fact label={t.whoIAm.stack}>
              <ul className="grid gap-1">
                {stack.map((g) => (
                  <li key={g.group} data-testid="who-stack-group">
                    <span className="font-medium">{g.group}</span>
                    <span className="text-warm-fg-muted"> — {g.items.join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </Fact>
          </dl>

          <div className="mt-sp-5 flex flex-wrap gap-x-sp-5">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
            >
              {t.whoIAm.fullStory} <span aria-hidden>→</span>
            </Link>
            <Link
              href="/experience"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
            >
              {t.whoIAm.workHistory} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

(c) `src/components/home/index.ts`: add `export { WhoIAm } from './WhoIAm';` after the `HeroSection` export.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx prettier --write src/components/home src/i18n && npx tsc --noEmit && npx vitest run src/components/home/__tests__/WhoIAm.test.tsx src/i18n`
Expected: PASS. If a "not.toContain" assertion fails on a short name that is a substring of something else on the page (for example a stack item like `S3`, or a credential whose name contains another's), tighten that assertion to the specific element's text (the `who-credential` chips or the `who-stack-group` row) instead of the whole section. The assertion is about _which items are shown_, not about the rest of the page.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/WhoIAm.tsx src/components/home/index.ts src/i18n/messages.ts src/components/home/__tests__/WhoIAm.test.tsx
git commit -m "feat(home): who I am section from existing data"
```

---

### Task 5: The film becomes a backdrop behind the first three sections

**Files:**

- Modify: `src/components/home/HeroFilm.tsx` (rewrite), `src/components/pages/HomeContent.tsx`, `src/components/home/HeroSection.tsx` (remove the bridge line), `src/components/home/__tests__/HeroFilm.test.tsx` (rewrite), `src/components/home/__tests__/HeroSection.test.tsx`, `src/__tests__/home.test.tsx`

**Interfaces:**

- Consumes: `filmTravelPx`, `filmProgressOver`, `veilOpacityOver`, `heroShadeOpacity`, `progressToTime`, `VEIL_MIN` (Task 1); `WhoIAm` (Task 4); `heroFilmAssetsFor`.
- Produces: `HeroFilm({ children }: { children: ReactNode })` rendering `<section data-testid="hero-film" data-mode="film|stills|pending">`; children are always rendered, in every mode, in the same position (no remount on mode change).

- [ ] **Step 1: Write the failing tests**

Replace the whole of `src/components/home/__tests__/HeroFilm.test.tsx` with:

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { useState, type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { HeroFilm } from '../HeroFilm';
import { HERO_FILM_ASSETS, HERO_FILM_ASSETS_NIGHT } from '../heroFilmAssets';
import { VEIL_MIN, VEIL_MAX, VEIL_RAMP_VH } from '../heroFilmLogic';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const kid = <p data-testid="kid">introduction</p>;
const wrap = (node: ReactNode) => <LanguageProvider>{node}</LanguageProvider>;
const wrapDark = (node: ReactNode) => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <LanguageProvider>{node}</LanguageProvider>
  </ThemeProvider>
);

type Env = { width: number; reduced?: boolean; saveData?: boolean };

function setEnv({ width, reduced = false, saveData = false }: Env) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true });
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduced : false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  Object.defineProperty(navigator, 'connection', { value: { saveData }, configurable: true });
}

let ioCallback: IntersectionObserverCallback | null = null;
class FakeIO {
  constructor(cb: IntersectionObserverCallback) {
    ioCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

let roCallback: (() => void) | null = null;
class FakeRO {
  constructor(cb: () => void) {
    roCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

function stageNearViewport() {
  act(() => {
    ioCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

const realOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')!;
let wrapperHeight = 0;
function setWrapperHeight(height: number) {
  wrapperHeight = height;
}

beforeEach(() => {
  ioCallback = null;
  roCallback = null;
  wrapperHeight = 0;
  vi.stubGlobal('IntersectionObserver', FakeIO);
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return (this as HTMLElement).getAttribute('data-testid') === 'hero-film' ? wrapperHeight : 0;
    },
  });
  scrollTo(0);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', realOffsetHeight);
  window.localStorage.removeItem('cf6.lang');
});

describe('HeroFilm: wraps the introduction', () => {
  it.each([
    ['film', 1440, 'film'],
    ['stills (small screen)', 390, 'stills'],
  ])('renders its children in %s mode', (_name, width, mode) => {
    setEnv({ width });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe(mode);
    expect(screen.getByTestId('kid')).toBeTruthy();
  });

  it('server-renders the children with no media and no empty film spacer', () => {
    setEnv({ width: 1440 });
    const html = renderToString(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(html).toContain('data-mode="pending"');
    expect(html).toContain('introduction');
    expect(html).not.toContain('<video');
    expect(html).not.toContain('<img');
    expect(html).not.toMatch(/height:\s*\d+vh/);
  });

  it('keeps the children mounted when the mode changes, so their state survives', () => {
    setEnv({ width: 1440 });
    function Counter() {
      const [n, setN] = useState(0);
      return (
        <button data-testid="counter" onClick={() => setN(n + 1)}>
          {n}
        </button>
      );
    }
    render(
      wrap(
        <HeroFilm>
          <Counter />
        </HeroFilm>
      )
    );
    fireEvent.click(screen.getByTestId('counter'));
    expect(screen.getByTestId('counter').textContent).toBe('1');
    setEnv({ width: 390 });
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(screen.getByTestId('counter').textContent).toBe('1');
  });
});

describe('HeroFilm: film mode', () => {
  it('requests nothing until the stage nears the viewport', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('video')?.getAttribute('src')).toBeNull();
  });

  it('loads the poster first and assigns the video source only after the poster loaded', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    stageNearViewport();
    const poster = container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`);
    expect(poster).toBeTruthy();
    expect(container.querySelector('video')?.getAttribute('src')).toBeNull();
    fireEvent.load(poster!);
    expect(container.querySelector('video')?.getAttribute('src')).toBe(HERO_FILM_ASSETS.video);
  });

  it('keeps the poster and video decorative', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    stageNearViewport();
    const poster = container.querySelector('img')!;
    expect(poster.getAttribute('alt')).toBe('');
    expect(poster.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelector('video')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('is the page background: a fixed, full-viewport layer behind the content', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    const backdrop = screen.getByTestId('film-backdrop');
    expect(backdrop.className).toMatch(/\bfixed\b/);
    expect(backdrop.className).toMatch(/\binset-0\b/);
    expect(backdrop.className).toMatch(/-z-10/);
    expect(screen.queryByTestId('film-poster-backdrop')).toBeNull();
  });

  it('does not reserve a fixed number of screens: the wrapper is as tall as its content', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('style') ?? '').not.toMatch(/height/);
  });

  it('covers the film with the page colour only after the wrapper has been scrolled through', () => {
    setEnv({ width: 1440 });
    setWrapperHeight(2400); // 800px viewport: the film plays over 1600px of scroll
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    scrollTo(0);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MIN, 5);
    scrollTo(1600);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MIN, 5);
    scrollTo(1600 + VEIL_RAMP_VH * 800);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MAX, 5);
  });

  it('re-reads the travel when the content height changes (fonts, language, images)', () => {
    setEnv({ width: 1440 });
    vi.stubGlobal('ResizeObserver', FakeRO);
    setWrapperHeight(2400);
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    scrollTo(1600 + VEIL_RAMP_VH * 800);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeCloseTo(VEIL_MAX, 5);
    setWrapperHeight(4000); // taller content: the same scroll position is now mid-film
    act(() => roCallback?.());
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeLessThan(VEIL_MAX);
  });

  it('does not throw with no measurable height or no ResizeObserver, and reads the first frame', () => {
    setEnv({ width: 1440 });
    setWrapperHeight(0);
    expect(() => render(wrap(<HeroFilm>{kid}</HeroFilm>))).not.toThrow();
    scrollTo(500);
    expect(Number(screen.getByTestId('film-veil').style.opacity)).toBeGreaterThanOrEqual(VEIL_MIN);
  });

  it('shades the left side for the hero text while it is on screen, then fades it out', () => {
    setEnv({ width: 1440 });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    scrollTo(0);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(1);
    scrollTo(0.3 * 800);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(1);
    scrollTo(800);
    expect(Number(screen.getByTestId('film-hero-shade').style.opacity)).toBe(0);
  });
});

describe('HeroFilm: stills mode', () => {
  it('puts a faint poster behind the first screen and requests no video', () => {
    setEnv({ width: 390 });
    const { container } = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    const backdrop = screen.getByTestId('film-poster-backdrop');
    expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    expect(backdrop.className).toMatch(/pointer-events-none/);
    const img = backdrop.querySelector('img')!;
    expect(img.getAttribute('src')).toBe(HERO_FILM_ASSETS.poster);
    expect(img.getAttribute('alt')).toBe('');
    expect(container.querySelector('video')).toBeNull();
  });

  it('also stills with reduced motion on a wide screen, and with data saver', () => {
    setEnv({ width: 1440, reduced: true });
    const first = render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
    expect(first.container.querySelector('video')).toBeNull();
    first.unmount();
    setEnv({ width: 1440, saveData: true });
    render(wrap(<HeroFilm>{kid}</HeroFilm>));
    expect(screen.getByTestId('hero-film').getAttribute('data-mode')).toBe('stills');
  });
});

describe('HeroFilm: night footage in dark mode', () => {
  it('loads the night poster, then the night video, and does not dim it with a CSS filter', () => {
    setEnv({ width: 1440 });
    const { container } = render(wrapDark(<HeroFilm>{kid}</HeroFilm>));
    stageNearViewport();
    const poster = container.querySelector(`img[src="${HERO_FILM_ASSETS_NIGHT.poster}"]`)!;
    expect(poster).toBeTruthy();
    expect(container.querySelector(`img[src="${HERO_FILM_ASSETS.poster}"]`)).toBeNull();
    expect(poster.className).not.toContain('brightness');
    fireEvent.load(poster);
    const video = container.querySelector('video')!;
    expect(video.getAttribute('src')).toBe(HERO_FILM_ASSETS_NIGHT.video);
    expect(video.className).not.toContain('brightness');
  });

  it('uses the night poster, lowered, as the stills backdrop', () => {
    setEnv({ width: 390 });
    render(wrapDark(<HeroFilm>{kid}</HeroFilm>));
    const img = screen.getByTestId('film-poster-backdrop').querySelector('img')!;
    expect(img.getAttribute('src')).toBe(HERO_FILM_ASSETS_NIGHT.poster);
    expect(img.className).toContain('dark:opacity-35');
  });
});
```

In `HeroSection.test.tsx`, delete the test `bridges into the film instead of repeating its figures` and the test `brightens the bridge line in dark mode too…`, and add:

```tsx
it('does not point at a film chapter story that no longer exists', () => {
  renderHero();
  expect(screen.queryByTestId('hero-bridge')).toBeNull();
  expect(screen.queryByText(/chapters/i)).toBeNull();
});
```

In `src/__tests__/home.test.tsx`, replace the order test with:

```tsx
test('lays out the introduction first: hero, who I am, proof, then cases, principle, contact, newsletter', () => {
  const { container } = render(<Home />);
  const wanted = new Set([
    'hero-film',
    'hero',
    'who-i-am',
    'proof-strip',
    'featured-projects',
    'horizontal-cases',
    'principle-statement',
    'contact-panel',
    'newsletter-panel',
  ]);
  const order = Array.from(container.querySelectorAll('[data-testid]'))
    .map((el) => el.getAttribute('data-testid') as string)
    .filter((id) => wanted.has(id))
    // the featured cases are either the vertical grid or the horizontal track
    .map((id) => (id === 'featured-projects' || id === 'horizontal-cases' ? 'cases' : id));
  expect(order).toEqual([
    'hero-film',
    'hero',
    'who-i-am',
    'proof-strip',
    'cases',
    'principle-statement',
    'contact-panel',
    'newsletter-panel',
  ]);
});

test('puts the owner introduction on the home page', () => {
  render(<Home />);
  expect(screen.getByText(messages.en.about.intro1)).toBeDefined();
});
```

(add `import { messages } from '@/i18n/messages';` to that file if it is not imported).

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/home/__tests__/HeroFilm.test.tsx src/components/home/__tests__/HeroSection.test.tsx src/__tests__/home.test.tsx`
Expected: FAIL (HeroFilm takes no children, the bridge still renders, `who-i-am` is not in the page).

- [ ] **Step 3: Write the implementation**

Replace `src/components/home/HeroFilm.tsx` with:

```tsx
'use client';

/* The film and poster are pre-optimized WebP/MP4 served from /public with versioned names,
   so Next's image optimizer would only re-encode them: plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from 'react';
import { useTheme } from 'next-themes';
import { chooseFilmMode, type FilmMode } from './heroFilmMode';
import { prefersReducedMotion, subscribeViewport } from './viewportEnv';
import {
  VEIL_MIN,
  filmProgressOver,
  filmTravelPx,
  heroShadeOpacity,
  progressToTime,
  veilOpacityOver,
} from './heroFilmLogic';
import { FILM_DURATION_SECONDS, heroFilmAssetsFor } from './heroFilmAssets';

function readMode(): FilmMode {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return chooseFilmMode({
    reducedMotion: prefersReducedMotion(),
    width: window.innerWidth,
    saveData: Boolean(connection?.saveData),
  });
}

/** `null` on the server and during hydration, so the first paint never guesses the mode. */
const getServerMode = (): FilmMode | null => null;

/** The pinned film: fixed behind the page, played by the scroll distance of the wrapper's content. */
function FilmBackdrop({ wrapperRef }: { wrapperRef: RefObject<HTMLElement | null> }) {
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef(0);
  const kickRef = useRef<() => void>(() => {});
  const [near, setNear] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete'
  );
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [veil, setVeil] = useState(VEIL_MIN);
  const [heroShade, setHeroShade] = useState(1);

  // Film assets wait for the page load, so the hero text paints first.
  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);

  // ... and for the wrapper to come within one viewport of the visible area.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px 100% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [wrapperRef]);

  // Page scroll -> film progress over the wrapper's measured height.
  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const travel = filmTravelPx(wrapperRef.current?.offsetHeight ?? 0, vh);
      progressRef.current = filmProgressOver(y, travel);
      setVeil(veilOpacityOver(y, vh, travel));
      setHeroShade(heroShadeOpacity(y, vh));
      kickRef.current();
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    // The content height changes after fonts and images load and when the language switches.
    const el = wrapperRef.current;
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && el ? new ResizeObserver(read) : null;
    if (el) resizeObserver?.observe(el);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      resizeObserver?.disconnect();
    };
  }, [wrapperRef]);

  // Ease video.currentTime toward the scroll target; stops itself once settled.
  useEffect(() => {
    if (!posterLoaded) return;
    const video = videoRef.current;
    if (!video) return;
    let frame = 0;
    let running = false;
    let current = 0;
    const tick = () => {
      const duration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : FILM_DURATION_SECONDS;
      const target = progressToTime(progressRef.current, duration);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.002) current = target;
      if (video.readyState >= 2 && Math.abs(video.currentTime - current) > 0.004) {
        video.currentTime = current;
      }
      if (current === target) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    kickRef.current = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    kickRef.current();
    return () => {
      cancelAnimationFrame(frame);
      kickRef.current = () => {};
    };
  }, [posterLoaded]);

  const active = near && pageLoaded;

  return (
    <div
      data-testid="film-backdrop"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-warm-bg"
    >
      {active ? (
        <img
          src={assets.poster}
          alt=""
          aria-hidden="true"
          decoding="async"
          onLoad={() => setPosterLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <video
        ref={videoRef}
        src={posterLoaded ? assets.video : undefined}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
        onLoadedData={() => setVideoReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        data-testid="film-hero-shade"
        className="absolute inset-0 bg-gradient-to-r from-warm-bg/90 via-warm-bg/45 to-transparent max-md:via-warm-bg/80 max-md:to-warm-bg/65 dark:from-warm-bg/95 dark:via-warm-bg/75"
        style={{ opacity: heroShade }}
      />
      <div
        data-testid="film-veil"
        className="absolute inset-0 bg-warm-bg"
        style={{ opacity: veil }}
      />
    </div>
  );
}

/** Small screens, reduced motion and data saver get no film: the first screen borrows the poster. */
function PosterBackdrop({ src }: { src: string }) {
  return (
    <div
      data-testid="film-poster-backdrop"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden"
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="h-full w-full object-cover opacity-45 dark:opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-warm-bg/70 via-transparent to-warm-bg" />
    </div>
  );
}

/**
 * Wraps the sections the footage plays behind. The sections render on the server and without
 * JavaScript; only the media is client-side. The backdrop slot comes first and the children keep
 * their position in every mode, so a mode change never remounts them.
 */
export function HeroFilm({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribeViewport, readMode, getServerMode);
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);
  const wrapperRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={wrapperRef}
      data-testid="hero-film"
      data-mode={mode ?? 'pending'}
      className="relative"
    >
      {mode === 'film' ? (
        <FilmBackdrop wrapperRef={wrapperRef} />
      ) : mode === 'stills' ? (
        <PosterBackdrop src={assets.poster} />
      ) : null}
      {children}
    </section>
  );
}
```

`src/components/pages/HomeContent.tsx`: import `WhoIAm` and compose:

```tsx
'use client';

import {
  HeroSection,
  HeroFilm,
  WhoIAm,
  ProofStrip,
  FeaturedCases,
  PrincipleStatement,
  NewsletterPanel,
  ContactPanel,
} from '@/components/home';
import { Atmosphere } from '@/components/primitives/Atmosphere';

export function HomeContent() {
  return (
    <div className="page-in relative">
      <Atmosphere />
      <HeroFilm>
        <HeroSection />
        <WhoIAm />
        <ProofStrip />
      </HeroFilm>
      <FeaturedCases />
      <PrincipleStatement />
      <ContactPanel />
      <NewsletterPanel />
    </div>
  );
}
```

`HeroSection.tsx`: delete the `{/* Bridge into the film */}` block (the `<p data-testid="hero-bridge">…</p>`), keeping the "Full work history" link that follows it.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx prettier --write src && npx tsc --noEmit && npx vitest run src/components/home src/__tests__/home.test.tsx`
Expected: PASS for the rewritten HeroFilm tests, the hero test and the home test. Old chapter tests (`ChapterPlate`, `homeChapters`, `chapterBeats`) still pass because those modules still exist; Task 6 removes them. If `home.test.tsx` fails on a jsdom `IntersectionObserver` is-not-defined error, the component guards `typeof IntersectionObserver`; check the test did not remove that guard.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HeroFilm.tsx src/components/pages/HomeContent.tsx src/components/home/HeroSection.tsx src/components/home/__tests__/HeroFilm.test.tsx src/components/home/__tests__/HeroSection.test.tsx src/__tests__/home.test.tsx
git commit -m "feat(home): film as a backdrop behind the introduction"
```

---

### Task 6: Delete the chapter system

**Files:**

- Delete: `src/components/home/ChapterPlate.tsx`, `src/components/home/homeChapters.ts`, `src/components/home/chapterBeats.ts`, `src/components/home/__tests__/ChapterPlate.test.tsx`, `src/components/home/__tests__/homeChapters.test.ts`, `src/components/home/__tests__/chapterBeats.test.ts`
- Modify: `src/components/home/heroFilmLogic.ts` and its test (remove `filmProgress`, `veilOpacity`, `plateOpacity`), `src/components/home/heroFilmAssets.ts` (remove `FILM_TRAVEL_VH`, `FILM_FRAME`), `src/i18n/messages.ts` (remove `chapters` block and `hero.bridge` in both locales), `src/app/globals.css` (remove the `.beat` rules), `tests/e2e/home.spec.ts`, `tests/e2e/hero-film.spec.ts`

**Interfaces:**

- Consumes: nothing from earlier tasks beyond what Task 5 already switched off the chapter code.
- Produces: no references to the removed identifiers anywhere in `src/` or `tests/`.

- [ ] **Step 1: Write the failing guard test**

Create `src/__tests__/noChapterCode.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/__tests__/noChapterCode.test.ts`
Expected: FAIL, listing every file that still mentions a removed identifier.

- [ ] **Step 3: Delete and clean up**

```bash
git rm src/components/home/ChapterPlate.tsx src/components/home/homeChapters.ts src/components/home/chapterBeats.ts \
  src/components/home/__tests__/ChapterPlate.test.tsx src/components/home/__tests__/homeChapters.test.ts \
  src/components/home/__tests__/chapterBeats.test.ts
```

- `heroFilmLogic.ts`: delete `filmProgress`, `veilOpacity`, `plateOpacity` (keep `progressToTime`, the `scrollProgress` re-export, `VEIL_*`, `HERO_SHADE_HOLD_VH`, `heroShadeOpacity`, and the three new functions). Move the `clamp01` helper above its first use if the build complains.
- `heroFilmLogic.test.ts`: delete the `filmProgress`, `veilOpacity` and `plateOpacity` describes and their imports; the `progressToTime`, `heroShadeOpacity` and new describes stay.
- `heroFilmAssets.ts`: delete the `FILM_FRAME` and `FILM_TRAVEL_VH` exports and their comments.
- `messages.ts` (python, with asserts): remove the `chapters: { … },` block and the `bridge: '…',` line from `hero` in both locales. Use brace matching so the block is removed whole:

```python
import re
p='src/i18n/messages.ts'
s=open(p).read()
def drop_block(s, start_pat):
    out=[]; i=0; n=0
    while True:
        m=re.search(start_pat, s[i:], re.M)
        if not m: out.append(s[i:]); break
        a=i+m.start(); out.append(s[i:a])
        depth=0; j=s.index('{',a)
        while True:
            c=s[j]
            if c=='{': depth+=1
            elif c=='}':
                depth-=1
                if depth==0: break
            j+=1
        j+=1
        if s[j]==',': j+=1
        if s[j]=='\n': j+=1
        i=j; n+=1
    return ''.join(out), n
s,n=drop_block(s, r'^    chapters: \{')
assert n==2, n
s,m=re.subn(r"^      bridge: '[^\n]*',\n", '', s, flags=re.M)
assert m==2, m
open(p,'w').write(s)
```

- `globals.css`: delete the `/* Chapter beats … */` rule group (`.beat`, `.beat[data-visible='false']`, the `[data-collapse='true']` rules and the reduced-motion `.beat` rule) and the `.chapter-in` keyframes and rules that only `ChapterPlate` used (search for each class in `src` first; keep any still referenced).
- `tests/e2e/home.spec.ts`: replace the `bridges into the film…` test with:

```ts
test('introduces the person right after the hero, in both languages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('who-i-am')).toContainText('Technical Lead');
  await expect(page.getByTestId('who-i-am')).toContainText('WHO I AM');
  await expect(page.getByTestId('stats')).toHaveCount(0);
  await expect(page.getByTestId('stack-marquee')).toHaveCount(0);
});

test('speaks Spanish in the introduction', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('cf6.lang', 'es'));
  await page.goto('/');
  await expect(page.getByTestId('who-i-am')).toContainText('QUIÉN SOY');
});
```

- `tests/e2e/hero-film.spec.ts`: replace the whole file with:

```ts
import { test, expect } from '@playwright/test';

const videoReady = () => {
  const video = document.querySelector<HTMLVideoElement>('[data-testid="hero-film"] video');
  return !!video && video.readyState >= 2 && video.duration > 0;
};

test.describe('Hero film: desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('the video time follows the scroll across the introduction sections', async ({ page }) => {
    await page.goto('/');
    const film = page.getByTestId('hero-film');
    await expect(film).toHaveAttribute('data-mode', 'film');
    await expect(film.locator('video')).toHaveAttribute('src', /hero-v2-desktop\.mp4/);
    await page.waitForFunction(videoReady);

    // halfway through the wrapper's scroll travel, a 28 s film is at about 14 s
    const travel = await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>('[data-testid="hero-film"]')!;
      return el.offsetHeight - window.innerHeight;
    });
    await page.evaluate((y) => window.scrollTo(0, y), travel / 2);
    await expect
      .poll(() => film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(13);
    const time = await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
    expect(time).toBeLessThan(15);
  });

  test('plays the night footage in dark mode', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('theme', 'dark'));
    await page.goto('/');
    await expect(page.getByTestId('hero-film').locator('video')).toHaveAttribute(
      'src',
      /hero-night-v1-desktop\.mp4/
    );
  });
});

test.describe('Hero film: poster instead of video', () => {
  test('on a small screen there is no video and no MP4 request, and the introduction is there', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const mp4: string[] = [];
    page.on('request', (request) => {
      if (request.url().endsWith('.mp4')) mp4.push(request.url());
    });
    await page.goto('/');
    await expect(page.getByTestId('hero-film')).toHaveAttribute('data-mode', 'stills');
    await expect(page.locator('video')).toHaveCount(0);
    await expect(page.getByTestId('who-i-am')).toBeAttached();
    expect(mp4).toEqual([]);
  });

  test.describe('with reduced motion on a wide screen', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('shows the poster and never requests the MP4', async ({ page }) => {
      const mp4: string[] = [];
      page.on('request', (request) => {
        if (request.url().endsWith('.mp4')) mp4.push(request.url());
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await expect(page.getByTestId('hero-film')).toHaveAttribute('data-mode', 'stills');
      await expect(page.locator('video')).toHaveCount(0);
      expect(mp4).toEqual([]);
    });
  });
});
```

- [ ] **Step 4: Run to verify everything passes**

Run: `npx prettier --write src tests && npx tsc --noEmit && npm run lint && CONFIDENTIAL_DENYLIST= npx vitest run`
Expected: tsc and lint clean; **the whole unit suite passes** (the guard test now passes; `confidential.test.ts` is skipped without the env var, as in CI).

- [ ] **Step 5: Commit**

```bash
git add -A src tests
git status --short | head
git commit -m "refactor(home): remove the chapter system

The chapters are replaced by the introduction; the film is a backdrop. Delete
ChapterPlate, homeChapters, chapterBeats, the old film logic and constants, the
chapters and hero bridge translations, and update the e2e specs."
```

(`git add -A src tests` is limited to those two directories, so the untracked workspace is never staged.)

---

### Task 7: Verify in a real browser, run the judges, open the PR

**Files:** none (verification); fixes go in the file a finding names, test-first.

- [ ] **Step 1: Full CI-equivalent gates**

Run, in this order, and read every result:

```bash
CONFIDENTIAL_DENYLIST= npx vitest run
npx tsc --noEmit
npm run lint
npx next build
npx playwright test
```

Expected: all pass. The `Hydration failed` line from `next dev`/e2e that exists on `main` is pre-existing; note it, do not chase it.

- [ ] **Step 2: Look at it**

Start `npx next dev -p 3417`. With the browser tool, at 1440x900, 1280x640 and 375x812, in light and dark (dark via `localStorage theme=dark` then reload), scroll from the top through to the contact panel and confirm: hero, then the "Who I am" card with the portrait and facts, then the proof strip, then the cases (with decision lines on the AWS and agents cards), then contact; the footage plays behind the first three sections and the page colour takes over after; the portrait edge looks clean on both card themes; no text sits on bright footage outside a card or the hero shade; switching language changes the card without a jump in the film; nothing overflows horizontally at 375.

- [ ] **Step 3: Judge loop**

Dispatch the three independent judges (visual finish-gate, skeptical-CTO persona, accessibility), read-only, each in its own browser context on a freshly restarted server, with dark forced through `localStorage 'theme'`. Brief each with the spec path and what changed. Visual and CTO: approve at 8 or above with no open P0/P1; the CTO question is "do I now learn who this person is in 10 seconds?". Accessibility: pixel-sampled contrast behind every text element in the first three sections over the footage (light and dark, 1440 and 375), the portrait alt text, heading order (one `h1`, then `h2`s), tab order, reduced motion, no flashing. Fix every P0/P1 test-first, re-run, and repeat until all three approve. Do not argue a judge's finding down by assertion: measure it.

- [ ] **Step 4: Push and open the PR**

```bash
git push -u origin feat/home-introduction
gh pr create --base main --head feat/home-introduction --title "feat(home): introduce the person first" --body "<what changed, verification, judge results, decisions left for the owner>"
```

Then watch the checks with `gh pr checks <n> --watch` in the background and report the real result. If CI fails, read the failing log first and reproduce it locally before changing anything.
