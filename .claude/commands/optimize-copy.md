---
description: Optimize copy on a specific page for authority and conversion
arguments:
  - name: page
    description: The page to optimize (home, about, newsletter, work-with-me, automations, projects, blog)
    required: true
---

# Optimize Copy

Launch the `copy-optimizer` agent on a specific page.

## Steps

1. **Launch the copy-optimizer agent** with the target page: $ARGUMENTS

2. The agent will:
   - Read the current copy from `src/i18n/messages.ts`
   - Read the corresponding `*Content.tsx` component
   - Propose before/after improvements with marketing psychology rationale
   - Ask for approval before making changes
   - Update both EN and ES translations

3. **After optimization**: Run `npm run type-check` to verify nothing broke.

## Valid pages
- `home` → HomeContent.tsx + hero/cta/stats in messages.ts
- `about` → AboutContent.tsx + about section in messages.ts
- `newsletter` → NewsletterContent.tsx + newsletter section in messages.ts
- `work-with-me` → WorkWithMeContent.tsx + workWithMe section in messages.ts
- `automations` → AutomationsContent.tsx + automations section in messages.ts
- `projects` → ProjectsContent.tsx + projects section in messages.ts
- `blog` → BlogContent.tsx + blog section in messages.ts
