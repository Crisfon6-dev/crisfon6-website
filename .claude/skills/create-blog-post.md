# Create Blog Post

Create a new blog post for the crisfon6-website.

## Process

1. Ask the user for the topic and key points they want to cover
2. Generate the frontmatter and MDX content
3. Write the file to `content/blog/`
4. Verify the post appears in the blog listing

## Frontmatter Template

Every blog post must have this frontmatter in `content/blog/{slug}.mdx`:

```yaml
---
title: 'Post Title Here'
excerpt: '1-2 sentence summary for the blog listing page and RSS feed'
date: 'YYYY-MM-DD'
readTime: 'X min read'
tag: 'Category'
tagColor: 'text-{color} bg-{color}-dim'
published: true
---
```

### Field Reference

| Field       | Required | Format           | Example                                                                                   |
| ----------- | -------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `title`     | Yes      | String           | `"The $12/mo Document Processor"`                                                         |
| `excerpt`   | Yes      | 1-2 sentences    | `"Step-by-step breakdown of my AI pipeline..."`                                           |
| `date`      | Yes      | `YYYY-MM-DD`     | `"2026-03-22"`                                                                            |
| `readTime`  | Yes      | `"N min read"`   | `"8 min read"`                                                                            |
| `tag`       | Yes      | Single category  | `"Automation"`, `"Architecture"`, `"AI / MCP"`, `"DevOps"`, `"Performance"`, `"Business"` |
| `tagColor`  | Yes      | Tailwind classes | See color table below                                                                     |
| `published` | Yes      | Boolean          | `true` to publish, `false` for draft                                                      |

### Tag Colors

| Tag          | tagColor                            |
| ------------ | ----------------------------------- |
| Automation   | `"text-green bg-green-dim"`         |
| Architecture | `"text-accent-light bg-accent-dim"` |
| AI / MCP     | `"text-violet bg-violet-dim"`       |
| DevOps       | `"text-amber bg-amber-dim"`         |
| Performance  | `"text-cyan bg-cyan-dim"`           |
| Business     | `"text-rose bg-rose-dim"`           |

### Slug Convention

The filename becomes the URL slug: `content/blog/my-post-title.mdx` → `/blog/my-post-title`

- Use lowercase kebab-case
- Keep it short but descriptive
- No special characters

## Content Writing Guidelines

### Voice & Tone

- First person, practical, builder-oriented
- "I built this" not "one should consider building"
- Direct and concise — no filler, no fluff
- Include real numbers (costs, performance, scale)

### Structure Pattern (for automation/technical posts)

```mdx
## The Problem

What pain point does this solve? Why should the reader care?

## Architecture

High-level overview with component descriptions.

## Implementation

Step-by-step walkthrough with code snippets.

## Cost Breakdown

Real infrastructure costs at different scales.

## Results

What was achieved — metrics, time saved, lessons learned.

## Try It Yourself

Link to repo or next steps.
```

### MDX Features Available

- Standard Markdown (headings, lists, bold, italic, links, images)
- Code blocks with syntax highlighting (use triple backticks with language)
- Tables
- Blockquotes
- All custom-styled via `src/mdx-components.tsx`

## Verification

After creating the post, run:

```bash
npm run build
```

This verifies the MDX parses correctly and the post is included in static generation.

## Example

To create a post about MCP agents:

```bash
# File: content/blog/building-mcp-agents.mdx
```

```yaml
---
title: 'Building MCP Agents That Actually Work in Production'
excerpt: 'Lessons from deploying Claude-powered MCP agents at scale — tool design, error handling, and the patterns that survived prod.'
date: '2026-03-25'
readTime: '12 min read'
tag: 'AI / MCP'
tagColor: 'text-violet bg-violet-dim'
published: true
---
```
