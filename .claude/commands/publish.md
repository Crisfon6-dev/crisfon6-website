---
description: Write a blog post, verify it, and push to production
arguments:
  - name: topic
    description: The topic to write about
    required: true
---

# Publish a Blog Post

Full pipeline: write → verify → commit → push.

## Steps

1. **Write the post** using the `content-writer` agent:
   - Topic: $ARGUMENTS
   - Agent generates MDX with correct frontmatter
   - Saves to `content/blog/`

2. **Verify the post**:
   - Run `npm run build` to confirm MDX parses correctly
   - Run `npm run type-check` to catch any issues
   - Check that the post appears in the build output

3. **Quality check**:
   - Run `npm run lint` (must pass with 0 errors)
   - Run `npm run test` (all unit tests must pass)
   - Scan for secrets in all changed files

4. **Commit and push**:
   - Stage only the new/modified content files
   - Commit with descriptive message
   - Push to main
   - Report the commit hash

5. **Update llms.txt** (automatic — the route handler reads all posts dynamically)

If any step fails, stop and report the issue. Do not push broken code.
