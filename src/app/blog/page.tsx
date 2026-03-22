import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  {
    title: "How I Architect Cloud-Native FinTech Platforms on AWS",
    excerpt:
      "A deep dive into the infrastructure patterns I use to build financial platforms that serve millions — CDK, Lambda, RDS, and the decisions behind each choice.",
    tag: "Architecture",
    date: "Coming soon",
    readTime: "12 min read",
  },
  {
    title: "Building MCP Agents That Actually Work in Production",
    excerpt:
      "Most MCP tutorials stop at 'hello world.' Here's how I build agents that handle errors, retry gracefully, and run 24/7 on AWS Lambda.",
    tag: "AI / MCP",
    date: "Coming soon",
    readTime: "10 min read",
  },
  {
    title: "The $12/mo Document Processor: Claude API + Lambda + S3",
    excerpt:
      "Step-by-step breakdown of my AI-powered document processing pipeline. Architecture diagram, full code, cost analysis, and deployment guide included.",
    tag: "Automation",
    date: "Coming soon",
    readTime: "8 min read",
  },
  {
    title: "Why I Stopped Charging by the Hour (And What I Do Instead)",
    excerpt:
      "The shift from hourly billing to value-based pricing changed everything. Here's the framework I use and how to make the transition without losing clients.",
    tag: "Business",
    date: "Coming soon",
    readTime: "7 min read",
  },
  {
    title: "Optimizing 2M+ Record Queries Without Throwing Money at Infrastructure",
    excerpt:
      "When your dashboard takes 30 seconds to load, the answer isn't always a bigger instance. Here's how I cut query times by 90% with indexing, caching, and query redesign.",
    tag: "Performance",
    date: "Coming soon",
    readTime: "9 min read",
  },
  {
    title: "My Full CI/CD Setup for FinTech: From Push to Production",
    excerpt:
      "Automated testing, multi-environment deployments, rollback strategies, and security scanning — the full pipeline I use for financial-grade software.",
    tag: "DevOps",
    date: "Coming soon",
    readTime: "11 min read",
  },
];

const tagColors: Record<string, string> = {
  Architecture: "text-purple-400 bg-purple-400/10",
  "AI / MCP": "text-blue-400 bg-blue-400/10",
  Automation: "text-green-400 bg-green-400/10",
  Business: "text-yellow-400 bg-yellow-400/10",
  Performance: "text-red-400 bg-red-400/10",
  DevOps: "text-cyan-400 bg-cyan-400/10",
};

export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-sm text-blue-400 mb-4">// Blog</p>
      <h1 className="text-4xl font-bold text-white mb-4">
        Lessons from the trenches.
      </h1>
      <p className="text-slate-400 mb-12 max-w-2xl text-lg">
        Technical deep dives, architecture breakdowns, and business lessons from building
        FinTech platforms and AI automations in production.
      </p>

      {/* Coming soon banner */}
      <div className="border border-dashed border-slate-700 rounded-xl p-6 bg-slate-800/10 mb-12 text-center">
        <p className="text-slate-400 text-sm">
          Blog launching soon. Subscribe to{" "}
          <Link href="/newsletter" className="text-blue-400 hover:text-blue-300 transition-colors">
            the newsletter
          </Link>{" "}
          to get notified when the first post drops.
        </p>
      </div>

      {/* Post previews */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.title}
            className="border border-slate-700 rounded-xl p-6 bg-slate-800/20 card-hover group"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className={`text-xs font-mono px-2 py-1 rounded ${
                  tagColors[post.tag] || "text-slate-400 bg-slate-400/10"
                }`}
              >
                {post.tag}
              </span>
              <span className="text-xs text-slate-600">{post.readTime}</span>
              <span className="text-xs text-slate-700 ml-auto font-mono">{post.date}</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Don&apos;t miss a post</h2>
        <p className="text-slate-400 mb-6 text-sm">
          Get every article, automation template, and architecture breakdown delivered to your inbox.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Subscribe to The Builder&apos;s Blueprint
        </Link>
      </section>
    </div>
  );
}
