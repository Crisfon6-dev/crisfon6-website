---
description: Show project status — roadmap progress, recent commits, content stats, and CI health
---

# Project Status

Gather and present a concise status overview.

## Steps

1. **Roadmap progress**: Read `docs/ROADMAP.md` and summarize completed vs pending items.

2. **Recent activity**: Run `git log --oneline -10` to show recent commits.

3. **Content stats**:
   - Count published posts: `ls content/blog/*.mdx | wc -l`
   - List post titles and dates

4. **CI status**: Check if the last push succeeded (look at git log for any revert or fix commits).

5. **Build health**: Run `npm run type-check` as a quick sanity check.

## Output Format

```
## Project Status — crisfon6.com

### Roadmap
- Phase 1 (Foundation): DONE (9/9 items)
- Phase 2 (Authority): DONE (5/5 items)
- Phase 3 (Discoverability): X/3 items done
- Phase 4 (Social Proof): 0/3 items
- Phase 5 (Monetization): 0/3 items

### Content
- Published posts: X
- Latest: "Title" (date)

### Recent Commits
[last 10 commits]

### Health
- Type check: PASS/FAIL
- Build: assumed OK (last CI run)
```
