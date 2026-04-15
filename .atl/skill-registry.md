# Skill Registry — crisfon6-website

Generated: 2026-04-15
Project: crisfon6-website (Next.js 16, React 19, TypeScript, Tailwind v4, Vitest, Playwright)

## Convention Files

| File                                 | Purpose                                                         |
| ------------------------------------ | --------------------------------------------------------------- |
| `CLAUDE.md`                          | Project instructions: architecture, commands, patterns, gotchas |
| `AGENTS.md`                          | Agent rules: Next.js 16 breaking changes warning                |
| `.claude/skills/create-blog-post.md` | Project-local: blog post creation workflow                      |

## User Skills — Trigger Table

> Match by **code context** (files/extensions touched) AND **task context** (what you're doing).

### Frontend & UI

| Skill                    | Trigger Contexts                                                                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontend-design`        | Building web components, pages, landing pages, dashboards, React components, HTML/CSS layouts, styling/beautifying web UI                                                                       |
| `ui-ux-pro-max`          | UI/UX design — websites, landing pages, dashboards, SaaS, portfolio, blog. Glassmorphism, dark mode, responsive, minimalism. Elements: button, modal, navbar, sidebar, card, table, form, chart |
| `interface-design`       | Dashboards, admin panels, apps, tools, interactive products (NOT marketing landing pages)                                                                                                       |
| `web-design-guidelines`  | Reviewing UI code for accessibility, design best practices, UX audit                                                                                                                            |
| `shadcn-ui`              | Installing shadcn/ui components, forms with React Hook Form + Zod, customizing themes                                                                                                           |
| `tailwind-design-system` | Building design systems with Tailwind v4, design tokens, component libraries                                                                                                                    |

### React / Next.js

| Skill                         | Trigger Contexts                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `vercel-react-best-practices` | Writing/reviewing/refactoring React/Next.js code — components, data fetching, bundle optimization, performance |
| `typescript-advanced-types`   | Complex TypeScript types, generics, conditional types, mapped types, type-safe utilities                       |

### Testing

| Skill                     | Trigger Contexts                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `webapp-testing`          | Testing local web apps with Playwright — UI verification, screenshots, browser logs |
| `python-testing-patterns` | Python pytest, fixtures, mocking (not applicable here — use for Python work)        |

### Git & Project Management

| Skill            | Trigger Contexts                                                      |
| ---------------- | --------------------------------------------------------------------- |
| `git-commit`     | Committing changes, conventional commit messages, intelligent staging |
| `branch-pr`      | Creating branches, pull requests, PR descriptions                     |
| `issue-creation` | Creating GitHub issues from bugs, features, or tasks                  |

### Content & Marketing

| Skill                  | Trigger Contexts                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `marketing-psychology` | Applying psychological principles to copy/marketing, persuasion, social proof, loss aversion |
| `brainstorming`        | BEFORE any creative work — creating features, building components, adding functionality      |

### Design Assets

| Skill               | Trigger Contexts                                           |
| ------------------- | ---------------------------------------------------------- |
| `logo-design-guide` | Logo design, brand identity, app icons, AI logo generation |

### SDD Workflow

| Skill          | Trigger                                                  |
| -------------- | -------------------------------------------------------- |
| `sdd-init`     | Bootstrap SDD context for a project                      |
| `sdd-explore`  | Investigate an idea, read codebase, compare approaches   |
| `sdd-new`      | Start a new change (meta-command)                        |
| `sdd-ff`       | Fast-forward planning: proposal → specs → design → tasks |
| `sdd-propose`  | Architectural proposal for a change                      |
| `sdd-spec`     | Write Given/When/Then specifications                     |
| `sdd-design`   | Detailed design + sequence diagrams                      |
| `sdd-tasks`    | Break specs into hierarchical tasks                      |
| `sdd-apply`    | Implement tasks in batches (Strict TDD mode)             |
| `sdd-verify`   | Validate implementation against specs                    |
| `sdd-archive`  | Close change, persist final state                        |
| `sdd-continue` | Run next dependency-ready phase                          |
| `sdd-onboard`  | End-to-end SDD walkthrough                               |

### Utilities

| Skill           | Trigger Contexts                                    |
| --------------- | --------------------------------------------------- |
| `find-skills`   | User asks "is there a skill for X", "how do I do X" |
| `skill-creator` | Creating new skills for the agent system            |
| `judgment-day`  | Code/architecture review, quality assessment        |

## Project-Local Skills

| Skill              | Location                             | Purpose                                                                 |
| ------------------ | ------------------------------------ | ----------------------------------------------------------------------- |
| `create-blog-post` | `.claude/skills/create-blog-post.md` | Create new MDX blog posts with correct frontmatter for crisfon6-website |

## Compact Rules for Injection

### crisfon6-website Core Patterns

```
FILE STRUCTURE: app/*/page.tsx (server + Metadata) → components/pages/*Content.tsx (client + i18n)
EXPORTS: Named exports only. No default exports.
CLIENT BOUNDARY: 'use client' only when needed. Push boundary down to leaf components.
I18N: All UI text in src/i18n/messages.ts (both EN and ES keys). Access via useLanguage() hook.
TAILWIND: v4 — tokens in globals.css via @theme inline. No tailwind.config.js.
NEXT16: All request APIs async — await cookies(), await headers(), await params().
BLOG: Posts in content/blog/*.mdx. published: false excludes from listings/RSS/sitemap.
SHADCN: Components in src/components/ui/. Add via npx shadcn@latest add.
IMPORTS: @/* alias maps to ./src/*.
TESTING: Vitest (unit/integration) + Playwright (E2E). Tests in src/**/__tests__/. Strict TDD active.
QUALITY: Before done → npm run type-check && npm run lint.
```

### Strict TDD Rules (active)

```
TDD ORDER: Tests FIRST → implementation → refactor. Never skip.
TEST LOCATION: src/**/__tests__/**/*.test.{ts,tsx} or src/components/__tests__/*.
UNIT: Use vitest + @testing-library/react + jsdom.
E2E: Use playwright, tests in tests/e2e/. Run with npm run test:e2e.
NO COVERAGE TOOL: @vitest/coverage-v8 not installed — don't run coverage commands.
```
