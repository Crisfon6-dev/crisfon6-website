import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";
import { GiscusComments } from "@/components/GiscusComments";
import { JsonLd } from "@/components/JsonLd";

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
    <div className="mx-auto max-w-3xl px-6 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: frontmatter.title,
          description: frontmatter.excerpt,
          datePublished: frontmatter.date,
          author: {
            "@type": "Person",
            name: "Cristhian Fonseca",
            url: "https://crisfon6.com",
          },
          publisher: {
            "@type": "Person",
            name: "Cristhian Fonseca",
            url: "https://crisfon6.com",
          },
          url: `https://crisfon6.com/blog/${slug}`,
          mainEntityOfPage: `https://crisfon6.com/blog/${slug}`,
          keywords: [frontmatter.tag],
        }}
      />
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant="secondary"
            className={`text-[10px] font-mono tracking-wide ${frontmatter.tagColor}`}
          >
            {frontmatter.tag}
          </Badge>
          <span className="text-xs text-text-muted">
            {frontmatter.readTime}
          </span>
          <span className="text-xs text-text-muted font-mono">
            {frontmatter.date}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          {frontmatter.excerpt}
        </p>
      </div>

      <Separator className="mb-10" />

      {/* MDX Content */}
      <article className="prose-custom">
        <MDXRemote source={content} components={components} />
      </article>

      <Separator className="my-10" />

      {/* Comments */}
      <section className="mb-10">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          COMMENTS
        </h2>
        <GiscusComments />
      </section>

      <Separator className="mb-10" />

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
          Get more like this every week
        </h2>
        <p className="text-text-tertiary mb-6 text-sm">
          Architecture diagrams, deployment guides, cost breakdowns, and working
          code.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent hover:bg-accent-light text-white px-6 h-auto py-2.5"
        >
          <Link href="/newsletter">Subscribe to PowerAI</Link>
        </Button>
      </section>
    </div>
  );
}
