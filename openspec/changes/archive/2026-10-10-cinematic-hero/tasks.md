## 1. Preflight

- [x] 1.1 Confirm the Higgsfield MCP tools are callable (load schemas via ToolSearch); if not, STOP and report
- [x] 1.2 Report the Higgsfield credit balance (951.5 credits, plus plan, single private workspace)
- [x] 1.3 Confirm `ffmpeg` and `ffprobe` are installed and record their versions (8.0.1 both; libx264 yes, libwebp NO, so WebP goes through `sharp` 0.34.5 already in node_modules)
- [x] 1.4 Branch strategy: owner chose commit-first. Credibility work committed as 62f6c8c on feat/portfolio-credibility-aphrodite (not pushed); this work lives on feat/cinematic-hero in .claude/worktrees/cinematic-hero
- [x] 1.5 Out-of-repo assets directory: ~/Work/NextGol/projects/crisfon6-hero-assets/{raw,stills,clips,master,delivery}

## 2. Visual Story (GATE)

- [x] 2.1 Write the Visual Story in `openspec/changes/cinematic-hero/visual-story.md`: 7-shot list per the design, scroll-pacing plan in viewport-heights, proposed film length, fact-to-shot overlay map using only `KEY_FACTS` entries
- [x] 2.2 Add the credit estimate (stills + clips + allowed regenerations) and ask the owner for a credit cap (real get_cost preflight: still 0.25, Wan 3.0 4s 1080p 14, Seedance 2.5 4s 1080p 48 / 480p draft 12)
- [x] 2.3 GATE passed: owner approved the Visual Story as written. Decisions: 28 s film, credit cap 400, Wan 3.0 first with Seedance 2.5 as fallback, shot 5 stays without overlay (D-1 default)

## 3. Establishing Still (GATE)

- [x] 3.1 Generate ONE establishing still (done in 2 rounds x 3 variants, files in the assets dir stills/est-1..6.png): abstract blueprint plane, `#fafaf7` ground, 24px dot grid, a single coral `#d97757` line; no text, logos, people or hands
- [x] 3.2 Inspect against the content rules. Round 1 (est-1..3) rejected: all read as a residential villa (pool, trees, stairs), wrong concept. Round 2 (est-4..6): abstract layered architecture diagram; no text, logos, people or hands in any of them. Palette note: all three add slate-blue (and est-4/est-6 also green) beyond the single coral accent
- [x] 3.3 GATE passed: owner approved est-5 as is (muted slate-blue + beige + coral line). It is the style reference and the film's frame 0 / hero poster

## 4. Hero film code, test-first

- [x] 4.1 Write failing tests for `progressToTime` (endpoints, clamping, mid-values) and `activeOverlay` (in-range, boundaries, gap with no overlay) in `src/components/home/__tests__/`
- [x] 4.2 Implement the pure helpers until 4.1 passes
- [x] 4.3 Write failing tests that every overlay resolves to a `KEY_FACTS` entry and that overlay text equals the fact text in EN and ES
- [x] 4.4 Implement the overlay configuration until 4.3 passes
- [x] 4.5 Write failing tests for `chooseFilmMode({ reducedMotion, width, saveData })`: stills for reduced motion, for width <= 768, for saveData; film otherwise
- [x] 4.6 Implement `chooseFilmMode` until 4.5 passes
- [x] 4.7 Write failing component tests for `HeroFilm`: stills mode shows the poster plus four captioned stills (captions equal the `KEY_FACTS` entries in EN and ES) and no `video`; film mode requests nothing until the stage nears the viewport, then sets the poster first and the video source after the poster loads; media is `aria-hidden`; overlays follow progress
- [x] 4.8 Implement `HeroFilm` (client component, sticky stage 8vh tall, rAF easing of `currentTime`, lazy poster, deferred source, stills mode) until 4.7 passes
- [x] 4.9 Compose `HeroFilm` directly after `HeroSection` in `HomeContent` (test: order hero, film, stats); keep existing home tests green
- [x] 4.10 Write a failing byte-budget check for `public/hero/` (bytes only; versioned names; poster/still/video limits; no mobile video; ffprobe checks for all-intra, no audio and no format tags run when ffprobe exists); implement the check until it passes against fixtures and fails on violations
- [x] 4.11 Add a static test that no file outside the home film module references `/hero/`
- [x] 4.12 Run targeted tests, `npm run lint`, `npm run type-check`

## 5. Clip Generation (chained)

- [x] 5.1 Generate clip 1 from the approved establishing still; export its last frame (Wan 3.0, 4 s, 1080p/30fps, 14 credits; frame 0 matches est-5; last frame exported as full-res PNG in the assets dir)
- [x] 5.2 For each next shot, generate from the previous clip's last frame (Wan 3.0 cannot also take the establishing still as a reference; style is preserved by chaining plus a palette-drift check, see F-6). Shot 7 pins end_image to est-5. Progress: all 7 shots generated and accepted (see F-7 to F-15). Credits spent: 141.5 of the 400 cap (1.5 stills + 10 clips x 14)
- [x] 5.3 After each clip, review frame by frame (see the honest review-method note in F-16); reject dissolves, morphing geometry, impossible structure, text, logos, people, hands; regenerate at most twice per shot
- [x] 5.4 GATE not triggered: no shot failed three times (shots 2, 5 and 6 each needed one regeneration)
- [x] 5.5 Within the owner's credit cap: 141.5 of 400 spent

## 6. Master and Delivery Files

- [x] 6.1 Concatenate clips with ffmpeg into a 1080p master (kept outside the repo); check there is no discontinuity at clip boundaries
- [x] 6.2 Encode the desktop MP4 (all-intra, no audio, metadata stripped) to <= 8 MB (1280x720, 24 fps, crf 30 = 7.79 MiB = 8.17 MB decimal, so over 8 MB decimal; crf 31 = 6.85 MiB = 7.19 MB decimal fits both readings; budget unit to be fixed in bytes, see F-18)
- [x] 6.3 Mobile MP4: superseded by owner decision (small screens get stills, no mobile video); the 540p crf 32 test encode is not shipped
- [x] 6.4 Extract poster and shot-boundary frames as PNG with ffmpeg, convert to WebP with `sharp` (ffmpeg here has no libwebp); poster <= 200 KB
- [x] 6.5 Run the byte-budget check from 4.10 over the delivery files and fix any violation
- [x] 6.6 Review each accepted clip at 0.5 s intervals (8 frames per 4 s clip, 7 contact sheets) and record anything missed by the earlier 5-frame sheets (found F-19: tier layout and floor change between shot 1 and shot 2; shots 3 to 7 clean)

## 7. Media integration and delivery hygiene

- [x] 7.1 Create the versioned deliverables from the assets dir: desktop crf 31 as `hero-v1-desktop.mp4` (all-intra, no audio, stripped), poster as `hero-v1-poster.webp`, stills from shots 3, 4, 6 and 7 as `hero-v1-compute.webp`, `hero-v1-data.webp`, `hero-v1-delivery.webp`, `hero-v1-reveal.webp`; copy only these into `public/hero/`
- [x] 7.2 Write a failing test, then add the EN/ES AI-generated-media note to the footer
- [x] 7.3 Write a failing test for `next.config` headers (`/hero/:path*` immutable one-year cache, none for HTML), then add them
- [x] 7.4 Add any new neutral UI labels to `src/i18n/messages.ts` in EN and ES (so far: footer.aiMedia)

## 8. Scroll sections, test-first

- [x] 8.1 `Timeline` line-draw: failing tests (items unchanged, progress line fills, reduced motion fully filled), then implement; used by About
- [x] 8.2 `SystemDiagram` section: failing tests (progress to dash offset, reduced motion fully drawn, no `text` elements, no unverified copy), then implement
- [x] 8.3 `PrincipleStatement` section: failing tests (text equals `PRINCIPLES[0]` in EN and ES, words reveal with progress, reduced motion shows all), then implement
- [x] 8.4 `HorizontalCases` section: failing tests (desktop track of the 4 featured cards with progress to translation, links `/projects#id` preserved, fallback to the vertical grid under 1024px or reduced motion), then implement
- [x] 8.5 Compose the sections into `HomeContent` in a sensible order; extend the claim-alignment test to the new sections

## 9. Verification

- [x] 9.1 Run targeted tests for everything touched, then the full lint, type-check and build (35 files, 311 tests, lint, tsc and production build clean)
- [x] 9.2 Start the production server, screenshot the home page at 1440px and 390px in EN and ES with the film at several scroll positions; fix layout issues first
- [x] 9.3 Verify reduced-motion, small viewport and no-JS show stills and no video request
- [x] 9.4 Run Lighthouse on `/` (a11y 96/96, LCP 676/908 ms, CLS 0.00/0.00; official performance score not obtainable with the available tool, see F-26) for desktop and mobile; report LCP, CLS and total weight; confirm performance >= 90, accessibility >= 95, CLS <= 0.01; if missed, shorten or compress the film
- [x] 9.5 Confirm other routes request nothing under `public/hero/` and that the other existing sections still work
- [x] 9.6 Re-run the content denylist checks (including `CONFIDENTIAL_DENYLIST`) over the rendered pages and the asset names and metadata

## 10. Report and pull request

- [x] 10.1 Commit in logical conventional commits (no co-author trailers) on feat/cinematic-hero
- [x] 10.2 Push the branch(es) and open a PR against main with summary, before and after screenshots, page weight and Higgsfield credits used; note that the branch also contains the credibility commit it is based on. No merge, no deploy (done by PR #27, merged 2026-10-10; closed out at archive time)
- [x] 10.3 Report in plain language: what was done, what was found, credits spent against the cap, what is next (closed as superseded at archive time, not verified as written: PR #31 later rebuilt the film as a page backdrop and removed the chapters this change designed)
