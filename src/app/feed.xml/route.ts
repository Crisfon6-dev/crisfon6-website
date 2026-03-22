import { getAllPosts } from "@/lib/blog";

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://crisfon6.com/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://crisfon6.com/blog/${post.slug}</guid>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zero to Production</title>
    <link>https://crisfon6.com</link>
    <description>Free AI automation templates — architecture diagrams, deployment guides, cost breakdowns, and working code. By Cristhian Fonseca.</description>
    <language>en-us</language>
    <atom:link href="https://crisfon6.com/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
