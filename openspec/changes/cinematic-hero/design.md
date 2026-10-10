## Context

`HeroSection` (`src/components/home/HeroSection.tsx`) is a client component (it uses `useLanguage()`), but Next.js still renders it to HTML on the server, so the heading and CTAs are in the initial document. The site's visual language is the warm light theme: `#fafaf7` page, coral `#d97757` accent, Geist, a 24px blueprint dot grid (`Atmosphere`). Motion is already gated by `prefers-reduced-motion` in `src/app/globals.css`.

Verified figures live in `src/data/career.ts` (`KEY_FACTS`, already bilingual). `openspec/config.yaml` sets `strict_tdd: true`, so every behavior below is tested before it is implemented.

Constraints that shape every decision: figures must be verified, generated media must contain no text, logos, people or client/Aphrodite identifiers, and the hero must never wait on the film.

## Goals / Non-Goals

**Goals:**

- A scroll-scrubbed film on the home hero that makes the "blueprint to running system" idea memorable in the first seconds.
- Hero heading, subtitle and CTAs paint immediately and independently of the film.
- Overlays show only verified facts, in EN and ES.
- A real fallback (stills) for reduced motion, no-JS, slow or data-saver connections.
- A production pipeline with approval gates so credits are never spent before sign-off.

**Non-Goals:**

- No video on any route other than `/`.
- No new brand, palette or typeface; no new claims, figures or copy beyond the existing `KEY_FACTS`.
- No audio, no autoplay loop, no person or likeness (no Soul ID).
- No merge, no deploy, no CMS for media.

## Decisions

### D1. Scrub with a `<video>` and `currentTime`, not an image sequence

Use one muted, `playsInline`, `preload="none"` video; a `requestAnimationFrame` loop eases `currentTime` toward a target derived from scroll progress.

- _Alternative: WebP/canvas frame sequence._ Smoothest scrubbing, but a 20–30 s film at 24 fps is roughly 500–700 frames, far over the repo and transfer budget. Rejected.
- _Alternative: CSS scroll-driven animations._ They cannot drive `video.currentTime`. Rejected.
- _Alternative: GSAP ScrollTrigger._ Adds a dependency for something ~40 lines of code does. Rejected unless D1 fails the performance floor.

Scrub smoothness depends on the encode: all-intra (`-g 1`) so any time can be decoded without seeking back to a keyframe.

### D2. Pin with CSS `position: sticky`

A tall wrapper (height set in viewport-heights from the Visual Story's pacing plan) holds a sticky 100vh stage. No JS pinning, no layout shift, works with reduced motion by simply not rendering the video.

### D3. Keep the client boundary small

`HeroSection` stays the composition root and keeps the text/CTAs. A new client component `HeroFilm` owns the video, the rAF loop and the overlays. Pure logic lives in a separate module so it is unit-testable without jsdom video support:

- `progressToTime(progress, duration)` clamps and maps linearly.
- `activeOverlay(progress, overlays)` returns the overlay for a progress value or none.

### D4. Overlays are `KEY_FACTS` entries, nothing else

Each overlay is `{ factIndex, from, to }` referencing `KEY_FACTS[factIndex]` (value + bilingual label). A test asserts every overlay resolves to a real fact and that overlay text equals the fact text. This makes an unverified overlay structurally impossible. Shots with no fact have no overlay. Legibility over moving footage uses a soft scrim so text meets 4.5:1.

### D5. Fallback is stills, not a degraded video

Reduced motion, no-JS, `saveData`, or a video that cannot become playable within a timeout all render the poster plus a small set of stills extracted at shot boundaries (WebP). The poster doubles as the LCP image (`next/image`, `priority`), so the film never decides LCP.

### D6. Loading order protects LCP

1. Server HTML: heading, subtitle, CTAs, poster.
2. After the poster paints (and the stage is near the viewport), set the video `src` and `preload="auto"` for the right variant (desktop vs 720p mobile).
3. Never request video bytes for reduced-motion or `saveData` users.

### D7. Media pipeline is gated and chained

Generation happens through the Higgsfield MCP in this order: tools and credit check, Visual Story (STOP for approval), establishing still (STOP for approval), clips chained from the previous clip's last frame, ffmpeg concat to a 1080p master, frame-by-frame QA, delivery encodes. The establishing still is the style reference for every later still and clip. Each shot gets at most two regenerations before escalating to the user, so credits cannot run away.

Delivery encodes (starting point, tuned to hit budgets):

- desktop: `-c:v libx264 -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart -an -map_metadata -1`, scaled to fit <= 8 MB
- mobile: same flags at 720p, <= 4 MB
- poster and stills: WebP, poster <= 200 KB

Metadata is stripped so no tool name, path or project string leaks into assets.

### D8. Assets: only deliverables enter the repo

`public/hero/` holds delivery files only. Masters, raw clips and the Visual Story assets live outside the repo. A small script checks sizes and stream properties (keyframe interval, no audio, no metadata) and is run as a test, so budgets are enforced rather than remembered.

## Risks / Trade-offs

- **AI footage looks generic or uncanny** → Abstract, non-photoreal subject; frame-by-frame QA with explicit reject criteria; the Visual Story gate lets you cancel before any spend if the concept is weak.
- **Credits overrun** → Estimate approved before generation; two-regeneration cap per shot; balance checked first.
- **iOS Safari scrubbing is janky** → All-intra encode, 720p mobile file, and fall back to stills if the video is not playable in time.
- **Lighthouse regression** → Poster is LCP, video deferred, size budgets enforced by test; if the floor is missed, shorten or compress the film rather than lowering the bar.
- **Repo bloat** → Only compressed deliverables are committed; masters stay outside.
- **Confidentiality leak through assets** → Prompts forbid text, logos, people and brand terms; filenames and metadata checked; Aphrodite/client terms are in the content denylist test.
- **Pinned scroll annoys users** → Fixed, modest pacing; the page remains scrollable and readable at any point; reduced motion removes the pin's film entirely.

## Migration Plan

1. Work on a dedicated branch cut from the credibility branch state (see Open Questions).
2. Land the component and its tests with a placeholder poster first, so the structure ships safely before any media exists.
3. Add real delivery assets only after the gates pass.
4. Rollback: remove the `HeroFilm` import from `HeroSection` to restore the current hero; delete `public/hero/`. No data, schema or env changes.

## Open Questions

- Final film length (proposal: 20–30 s). The Visual Story will propose one with its credit estimate.
- Credit cap for the whole run. Needs your number before generation.
- Whether fallback stills are frames extracted from the master or separate generations (extracted is cheaper and guaranteed consistent; separate could be sharper).
- Which branch this builds on: the credibility branch is uncommitted, and the hero copy it changes is what this film sits next to.

## Amendments (plan v2)

### D9. Stills mode replaces the mobile video

Small viewports (768px and narrower), reduced motion, data saver and no-JS render the poster plus four captioned stills (compute, data, delivery, reveal), each caption being the matching `KEY_FACTS` entry. A pure function `chooseFilmMode({ reducedMotion, width, saveData })` returns `'film'` or `'stills'`, so the decision is unit-testable without a browser. This removes the narrow-crop problem measured on phones (a 390x844 stage shows only about 26% of a 16:9 frame) and the iOS video-scrubbing risk.

### D10. Film stage is its own section after the hero text

`HeroSection` stays untouched. A new `HeroFilm` section follows it in `HomeContent`. The poster is lazy (the LCP element stays the hero text), assets load when the stage is within one viewport of the visible area, and the video `src` is assigned only after the poster has loaded.

### D11. Image sequence stays a fallback, not the plan

Measured on the real master at 1280x720: AVIF frames about 11.7 KB each (about 7.7 MiB for 672 frames), WebP about 20.9 KB (about 13.7 MiB), against 6.85 MiB for the all-intra video. Sizes are comparable, so size is not the deciding factor; video scrubbing is kept because it is already encoded and checked, needs no decoded-frame cache and no 672 requests, and the iOS risk is gone with D9. If scrubbing feels rough in the browser test, a canvas sequence replaces it.

### D12. Scroll sections reuse existing primitives and data

No new animation dependency (Framer Motion already ships). Each section's scroll progress comes from a shared hook that maps an element's position to 0..1, with pure mapping functions covered by unit tests. Content comes only from `career.ts` and existing `messages.ts` keys; reduced motion renders the final state with no animation.

### D13. Delivery hygiene

Versioned file names (`-v1`) let `/hero/*` use `Cache-Control: public, max-age=31536000, immutable` set in `next.config` headers. A footer note (EN/ES) discloses that the hero imagery is AI-generated. The byte-budget check runs as a vitest test over `public/hero/`, with the ffprobe-based checks skipped when ffprobe is not installed and the file-size and file-name checks always on.
