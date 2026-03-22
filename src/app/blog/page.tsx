import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  {
    title: "How I Architect Cloud-Native FinTech Platforms on AWS",
    excerpt:
      "A deep dive into the infrastructure patterns I use to build financial platforms that serve millions — CDK, Lambda, RDS, and the decisions behind each choice.",
    tag: "Architecture",
    tagColor: "text-violet bg-violet-dim",
    date: "Coming soon",
    readTime: "12 min",
  },
  {
    title: "Building MCP Agents That Actually Work in Production",
    excerpt:
      "Most MCP tutorials stop at 'hello world.' Here's how I build agents that handle errors, retry gracefully, and run 24/7 on AWS Lambda.",
    tag: "AI / MCP",
    tagColor: "text-accent-light bg-accent-dim",
    date: "Coming soon",
    readTime: "10 min",
  },
  {
    title: "The $12/mo Document Processor: Claude API + Lambda + S3",
    excerpt:
      "Step-by-step breakdown of my AI-powered document processing pipeline. Architecture diagram, full code, cost analysis, and deployment guide.",
    tag: "Automation",
    tagColor: "text-green bg-green-dim",
    date: "Coming soon",
    readTime: "8 min",
  },
  {
    title: "Why I Stopped Charging by the Hour",
    excerpt:
      "The shift from hourly billing to value-based pricing changed everything. Here's the framework I use and how to make the transition.",
    tag: "Business",
    tagColor: "text-amber bg-amber-dim",
    date: "Coming soon",
    readTime: "7 min",
  },
  {
    title: "Optimizing 2M+ Record Queries Without Bigger Instances",
    excerpt:
      "When your dashboard takes 30 seconds to load, the answer isn't always more hardware. How I cut query times by 90% with indexing, caching, and query redesign.",
    tag: "Performance",
    tagColor: "text-red bg-red-dim",
    date: "Coming soon",
    readTime: "9 min",
  },
  {
    title: "My Full CI/CD Setup for FinTech: Push to Production",
    excerpt:
      "Automated testing, multi-environment deployments, rollback strategies, and security scanning — the full pipeline for financial-grade software.",
    tag: "DevOps",
    tagColor: "text-cyan bg-cyan-dim",
    date: "Coming soon",
    readTime: "11 min",
  },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">
        Lessons from the trenches.
      </h1>
      <p className="text-text-secondary mb-12 max-w-2xl text-lg leading-relaxed">
        Technical deep dives, architecture breakdowns, and business lessons from
        building FinTech platforms and AI automations in production.
      </p>

      {/* Coming soon */}
      <div className="border border-border rounded-lg px-5 py-4 mb-12 text-center">
        <p className="text-sm text-text-tertiary">
          Blog launching soon.{" "}
          <Link
            href="/newsletter"
            className="text-accent-light hover:text-accent transition-colors"
          >
            Subscribe
          </Link>{" "}
          to get notified.
        </p>
      </div>

      {/* Posts — editorial layout */}
      <div className="space-y-0 divide-y divide-border">
        {posts.map((post) => (
          <article key={post.title} className="py-6 first:pt-0 last:pb-0 group">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded tracking-wide ${post.tagColor}`}
              >
                {post.tag}
              </span>
              <span className="text-xs text-text-muted">{post.readTime}</span>
              <span className="text-xs text-text-muted font-mono ml-auto">
                {post.date}
              </span>
            </div>
            <h2 className="text-lg font-bold text-text-primary mb-1.5 tracking-tight group-hover:text-accent-light transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-text-tertiary leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
          Don&apos;t miss a post
        </h2>
        <p className="text-text-tertiary mb-6 text-sm">
          Get every article and automation template delivered to your inbox.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Subscribe to The Builder&apos;s Blueprint
        </Link>
      </section>
    </div>
  );
}
