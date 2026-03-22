"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

const techStack = [
  "AWS",
  "CDK",
  "Lambda",
  "Claude API",
  "MCP",
  "Next.js",
  "Python",
  "FastAPI",
  "TypeScript",
  "Angular",
  "Node.js",
  "PostgreSQL",
];

const projects = [
  {
    title: "FinTech Credit Marketplace",
    description:
      "Digital credit marketplace in a major telecom Super App. Zero-paperwork loans across LATAM.",
    result: "Millions of users served",
    tag: "FINTECH",
    accent: "border-l-green",
    badgeColor: "bg-green-dim text-green",
  },
  {
    title: "Enterprise Banking Platform",
    description:
      "End-to-end banking modules for a major financial institution. Regulatory compliance baked in.",
    result: "3+ years in production",
    tag: "BANKING",
    accent: "border-l-accent",
    badgeColor: "bg-amber-dim text-amber",
  },
  {
    title: "AI Automation Templates",
    description:
      "Open-source AI automation blueprints with architecture diagrams, cost breakdowns, and working code.",
    result: "New template weekly",
    tag: "AI / OPEN SOURCE",
    accent: "border-l-violet",
    badgeColor: "bg-violet-dim text-violet",
  },
];

export function HomeContent() {
  const { t } = useLanguage();

  const stats = [
    { value: "4+", label: t.stats.years, emphasis: false },
    { value: "2M+", label: t.stats.records, emphasis: false },
    { value: "10+", label: t.stats.aws, emphasis: false },
    { value: "M+", label: t.stats.users, emphasis: true },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-background" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 relative">
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-text-tertiary mb-5 tracking-wider">
              {t.hero.tagline}
            </p>
            <h1 className="text-4xl md:text-[3.5rem] font-bold text-text-primary leading-[1.1] mb-6 tracking-tight">
              {t.hero.heading1}{" "}
              <span className="gradient-text">{t.hero.heading2}</span>{" "}
              {t.hero.heading3}
            </h1>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="lg" asChild>
                <Link href="/newsletter">{t.hero.cta1}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">{t.hero.cta2}</Link>
              </Button>
            </div>
            <p className="text-sm text-text-tertiary mt-4">
              {t.hero.socialProof}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/crisfon6/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent-light transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-text-muted">·</span>
              <a
                href="mailto:crisfon6@crisfon6.com"
                className="text-sm text-text-muted hover:text-accent-light transition-colors"
              >
                crisfon6@crisfon6.com
              </a>
              <span className="text-text-muted">·</span>
              <a
                href="https://github.com/Crisfon6-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent-light transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <div className="mx-auto max-w-6xl px-6">
        <Separator />
      </div>
      <section>
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <span className="text-[10px] text-text-muted font-mono whitespace-nowrap tracking-widest">
              STACK
            </span>
            <Separator orientation="vertical" className="h-3" />
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs text-text-muted font-mono whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6">
        <Separator />
      </div>

      {/* STATS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <p
                    className={`text-3xl md:text-4xl font-bold mb-1 metric-value tracking-tight ${
                      stat.emphasis ? "text-green" : "text-text-primary"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted font-mono tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AUTOMATION OF THE WEEK */}
      <div className="mx-auto max-w-6xl px-6">
        <Separator />
      </div>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green pulse-subtle" />
            <h2 className="text-xs font-mono text-text-muted tracking-widest">
              {t.automation.sectionTitle}
            </h2>
          </div>
          <FadeIn delay={0.1}>
            <Card className="glow blueprint-grid-dense relative overflow-hidden border-border-emphasis bg-card p-0">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-8">
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                        {t.automation.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-green border-green/30"
                      >
                        Live
                      </Badge>
                    </div>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                      {t.automation.description}
                    </p>
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                          {t.automation.infraCost}
                        </p>
                        <p className="text-2xl font-bold text-green metric-value">
                          $12
                          <span className="text-sm text-text-tertiary font-normal">
                            /mo
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                          {t.automation.timeSaved}
                        </p>
                        <p className="text-2xl font-bold text-accent-light metric-value">
                          15h
                          <span className="text-sm text-text-tertiary font-normal">
                            /week
                          </span>
                        </p>
                        <p className="text-[10px] text-text-muted font-mono mt-1 tracking-wide">
                          {t.automation.devTimeValue}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/automations">{t.cta.viewBlueprint}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <div className="mx-auto max-w-6xl px-6">
        <Separator />
      </div>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {t.featuredProjects}
            </h2>
            <Button
              variant="link"
              asChild
              className="text-text-tertiary hover:text-text-secondary"
            >
              <Link href="/projects">{t.cta.viewAll}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <FadeIn key={project.title} delay={index * 0.1}>
                <Card
                  className={`card-hover card-accent-left card-shadow bg-surface-1/50 p-0 ${project.accent}`}
                >
                  <CardContent className="p-6">
                    <Badge
                      variant="secondary"
                      className={`mb-4 font-mono text-[10px] tracking-widest ${project.badgeColor}`}
                    >
                      {project.tag}
                    </Badge>
                    <h3 className="text-base font-bold text-text-primary mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-tertiary mb-5 leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-sm font-medium text-green">
                      {project.result}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL CTA — Newsletter + Contact */}
      <div className="mx-auto max-w-6xl px-6">
        <Separator />
      </div>
      <section className="py-20 blueprint-grid">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Newsletter CTA */}
              <Card className="card-shadow p-0">
                <CardContent className="p-8">
                  <p className="text-[10px] font-mono text-text-muted tracking-widest mb-4">
                    {t.cta.weeklyBlueprints}
                  </p>
                  <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                    {t.cta.getFreeTemplate}
                  </h2>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    {t.cta.noFluff}
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="w-full"
                  >
                    <Link href="/newsletter">{t.cta.dontMiss}</Link>
                  </Button>
                  <p className="text-xs text-text-muted mt-3 text-center">
                    {t.cta.freeForever}
                  </p>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card className="card-shadow p-0">
                <CardContent className="p-8">
                  <p className="text-[10px] font-mono text-text-muted tracking-widest mb-4">
                    {t.cta.letsTalk}
                  </p>
                  <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                    {t.cta.buildingSomething}
                  </h2>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    {t.cta.openTo}
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full"
                  >
                    <Link href="/work-with-me">{t.workWithMe.heading}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
