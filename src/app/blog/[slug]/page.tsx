import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import { GiscusComments } from '@/components/GiscusComments';
import { JsonLd } from '@/components/JsonLd';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';

const components = getMDXComponents();

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <main className="page-in relative">
      <Atmosphere grid={false} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: frontmatter.title,
          description: frontmatter.excerpt,
          datePublished: frontmatter.date,
          author: {
            '@type': 'Person',
            name: 'Cristhian Fonseca',
            url: 'https://crisfon6.com',
          },
          publisher: {
            '@type': 'Person',
            name: 'Cristhian Fonseca',
            url: 'https://crisfon6.com',
          },
          url: `https://crisfon6.com/blog/${slug}`,
          mainEntityOfPage: `https://crisfon6.com/blog/${slug}`,
          keywords: [frontmatter.tag],
        }}
      />

      {/* Header */}
      <header className="mx-auto max-w-3xl px-sp-5 pt-sp-8 pb-sp-6">
        <Kicker>
          <span>05 · BLOG</span>
        </Kicker>
        <div className="mt-sp-4 flex flex-wrap items-center gap-sp-3">
          <Chip variant="outline">{frontmatter.tag}</Chip>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
            {frontmatter.date}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
            {frontmatter.readTime}
          </span>
        </div>
        <h1
          className="mt-sp-5 font-heading text-warm-fg"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            fontWeight: 600,
          }}
        >
          {frontmatter.title}
        </h1>
        <p className="mt-sp-4 text-lg leading-relaxed text-warm-fg-muted">{frontmatter.excerpt}</p>
      </header>

      {/* MDX Content */}
      <article className="prose-custom mx-auto max-w-3xl px-sp-5 py-sp-6">
        <MDXRemote source={content} components={components} />
      </article>

      {/* Comments */}
      <section className="mx-auto max-w-3xl px-sp-5 py-sp-7">
        <Kicker>COMMENTS</Kicker>
        <div className="mt-sp-5">
          <GiscusComments />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-sp-5 py-sp-8">
        <div className="rounded-sp-xl border border-warm-border bg-warm-bg-subtle p-sp-6 text-center">
          <h2
            className="font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            Get more like this every week
          </h2>
          <p className="mx-auto mt-sp-3 max-w-md text-sm text-warm-fg-muted">
            Architecture diagrams, deployment guides, cost breakdowns, and working code.
          </p>
          <div className="mt-sp-5 flex flex-wrap justify-center gap-sp-3">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Subscribe to PowerAI <span aria-hidden>→</span>
            </Link>
            <Link
              href="/work-with-me"
              className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong"
            >
              Work with me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
