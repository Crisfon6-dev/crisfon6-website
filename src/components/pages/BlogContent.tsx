'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import type { BlogPost } from '@/lib/blog';

const UPCOMING = [
  {
    title: 'How I Architect Cloud-Native FinTech Platforms on AWS',
    tag: 'Architecture',
    readTime: '12 min',
  },
  {
    title: 'Building MCP Agents That Actually Work in Production',
    tag: 'AI · MCP',
    readTime: '10 min',
  },
  {
    title: 'The $12/mo Document Processor: Claude API + Lambda + S3',
    tag: 'Automation',
    readTime: '8 min',
  },
  {
    title: 'Why I Stopped Charging by the Hour',
    tag: 'Business',
    readTime: '7 min',
  },
  {
    title: 'Optimizing 2M+ Record Queries Without Bigger Instances',
    tag: 'Performance',
    readTime: '9 min',
  },
  {
    title: 'My Full CI/CD Setup for FinTech: Push to Production',
    tag: 'DevOps',
    readTime: '11 min',
  },
] as const;

type Props = {
  publishedPosts: BlogPost[];
};

export function BlogContent({ publishedPosts }: Props) {
  const { t } = useLanguage();

  return (
    <main className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        number="05"
        label="BLOG"
        title={t.blog.heading}
        description={t.blog.description}
      />

      {/* Published list */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-7">
        {publishedPosts.length > 0 ? (
          <ul className="divide-y divide-warm-border border-y border-warm-border">
            {publishedPosts.map((post) => (
              <li key={post.slug} data-testid="blog-row">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-wrap items-center gap-sp-4 py-sp-5 transition-transform hover:translate-x-3"
                >
                  <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
                    {post.date}
                  </span>
                  <Chip variant="outline" className="shrink-0">
                    {post.tag}
                  </Chip>
                  <h2
                    className="flex-1 font-heading text-warm-fg transition-colors group-hover:text-accent"
                    style={{
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.25,
                      fontWeight: 500,
                    }}
                  >
                    {post.title}
                  </h2>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
                    {post.readTime}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-warm-fg-faint transition-colors group-hover:text-accent"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Upcoming */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <Kicker>{t.blog.comingNext}</Kicker>
        <ul className="mt-sp-5 divide-y divide-warm-border border-y border-warm-border opacity-60">
          {UPCOMING.map((post) => (
            <li key={post.title}>
              <div className="flex flex-wrap items-center gap-sp-4 py-sp-5">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
                  In progress
                </span>
                <Chip variant="outline" className="shrink-0">
                  {post.tag}
                </Chip>
                <h3
                  className="flex-1 font-heading text-warm-fg"
                  style={{
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    letterSpacing: '-0.015em',
                    fontWeight: 500,
                  }}
                >
                  {post.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-faint">
                  {post.readTime}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="rounded-sp-xl border border-warm-border bg-warm-bg-subtle p-sp-6 text-center">
          <h2
            className="font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.blog.ctaHeading}
          </h2>
          <p className="mx-auto mt-sp-3 max-w-xl text-sm text-warm-fg-muted">
            {t.blog.ctaDescription}
          </p>
          <Link
            href="/newsletter"
            data-testid="blog-cta"
            className="mt-sp-5 inline-flex items-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t.cta.subscribeZTP} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
