import { getAllPosts, getPost } from "@/lib/blog";

export function GET() {
  const posts = getAllPosts();

  const sections = posts.map((post) => {
    const full = getPost(post.slug);
    const content = full?.content ?? "";

    return `---
title: ${post.title}
url: https://crisfon6.com/blog/${post.slug}
date: ${post.date}
tag: ${post.tag}
---

${content}`;
  });

  const body = `# crisfon6.com — Full Content

> This file contains the complete text of all published blog posts on crisfon6.com.
> Author: Cristhian Fonseca (Technical Lead & AI Builder)
> Site: https://crisfon6.com
> Newsletter: PowerAI — https://crisfon6.com/newsletter

${sections.join("\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
