---
description: Run full quality gate then commit and push to production
arguments:
  - name: message
    description: Commit message (optional — will be auto-generated if not provided)
    required: false
---

# Deploy to Production

Full quality gate → commit → push pipeline.

## Steps

1. **Check for changes**: Run `git status`. If nothing to commit, report and stop.

2. **Quality gate** (all must pass):
   - Secret scan on all changed files
   - `npm run lint` (0 errors)
   - `npm run type-check` (0 errors)
   - `npm run test` (all pass)
   - `npm run test:e2e` (all pass)

3. **If all pass**:
   - Show the user what will be committed (`git diff --stat`)
   - Ask for confirmation
   - Commit with message: $ARGUMENTS (or auto-generate from changes)
   - Push to main

4. **If any check fails**:
   - Report which check failed and why
   - Ask user if they want to fix the issues
   - Do NOT push broken code

5. **Post-push**: Report the commit hash and link to GitHub Actions.

## Important

- ALWAYS scan for secrets before committing
- NEVER force push
- NEVER push if tests fail
- Ask for confirmation before pushing
