import { getAllPosts } from '@/lib/blog';

export function GET() {
  const posts = getAllPosts();

  const postList = posts
    .map((post) => `- [${post.title}](https://crisfon6.com/blog/${post.slug}): ${post.excerpt}`)
    .join('\n');

  const content = `# crisfon6.com

> Personal site and AI automation portfolio of Cristhian Fonseca — Technical Lead & AI Builder.

## About

Cristhian Fonseca is a Technical Lead who builds FinTech products serving millions of users and publishes open-source AI automation blueprints. He specializes in AWS cloud architecture (CDK, Lambda, serverless), Claude API integrations, MCP agents, and full-stack TypeScript/Python development.

## Newsletter: PowerAI

A free weekly newsletter with production-ready AI automation templates. Each issue includes architecture diagrams, deployment guides, cost breakdowns, and working code.

- [Subscribe](https://crisfon6.com/newsletter)

## Blog Posts

${postList}

## Key Pages

- [Home](https://crisfon6.com/): Overview, featured projects, and stats
- [About](https://crisfon6.com/about): Background, experience, and tech stack
- [Projects](https://crisfon6.com/projects): FinTech and AI projects portfolio
- [Automations](https://crisfon6.com/automations): AI automation templates with costs
- [Blog](https://crisfon6.com/blog): Technical articles and tutorials
- [Newsletter](https://crisfon6.com/newsletter): Weekly AI automation blueprints

## Contact

- Email: crisfon6@crisfon6.com
- LinkedIn: https://www.linkedin.com/in/crisfon6/
- GitHub: https://github.com/Crisfon6-dev

## Full Content

For the complete text content of all blog posts, see [/llms-full.txt](https://crisfon6.com/llms-full.txt).
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
