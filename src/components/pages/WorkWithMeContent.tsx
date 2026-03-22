// TODO: i18n — extract all hardcoded strings into a `workWithMe` object in src/i18n/messages.ts
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/i18n/LanguageProvider";

const engagements = [
  {
    label: "01",
    title: "Strategic Conversations",
    description:
      "I enjoy meeting founders and CTOs navigating the intersection of FinTech and AI. If you're building something ambitious, let's talk.",
    ctaText: "Connect on LinkedIn",
    ctaHref: "https://www.linkedin.com/in/crisfon6/",
    external: true,
    accent: "border-l-accent",
  },
  {
    label: "02",
    title: "Open Source & Collaboration",
    description:
      "Every week I publish production-ready AI automation templates. If you're building in the AI/automation space, I'm open to collaborating on projects.",
    ctaText: "Browse Automations",
    ctaHref: "/automations",
    external: false,
    accent: "border-l-violet",
  },
  {
    label: "03",
    title: "Leadership Opportunities",
    description:
      "I'm selectively open to the right CTO or technical leadership opportunity — particularly at companies building AI-native products at scale.",
    ctaText: "Send me an email",
    ctaHref: "mailto:crisfon6@crisfon6.com",
    external: true,
    accent: "border-l-green",
  },
];

const stats = [
  { value: "4+", label: "YEARS BUILDING" },
  { value: "M+", label: "USERS SERVED" },
  { value: "10+", label: "AWS SERVICES" },
  { value: "Weekly", label: "TEMPLATES" },
];

export function WorkWithMeContent() {
  useLanguage(); // ready for i18n swap

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-background" />
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-20 relative">
          <FadeIn>
            <p className="font-mono text-xs text-text-tertiary mb-5 tracking-wider">
              WORK WITH ME
            </p>
            <h1 className="text-4xl md:text-[3.5rem] font-bold text-text-primary leading-[1.1] mb-6 tracking-tight">
              Let&apos;s build something{" "}
              <span className="gradient-text">together.</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              I&apos;m always looking to connect with ambitious founders, CTOs,
              and engineers shipping products at scale.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <Separator />
      </div>

      {/* ENGAGEMENT CARDS */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engagements.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <Card
                  className={`card-hover card-accent-left card-shadow bg-surface-1/50 p-0 h-full ${item.accent}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] tracking-widest mb-4 w-fit"
                    >
                      {item.label}
                    </Badge>
                    <h3 className="text-base font-bold text-text-primary mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-tertiary leading-relaxed mb-6 flex-1">
                      {item.description}
                    </p>
                    {item.external ? (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={item.ctaHref}
                          target={
                            item.ctaHref.startsWith("mailto:")
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            item.ctaHref.startsWith("mailto:")
                              ? undefined
                              : "noopener noreferrer"
                          }
                        >
                          {item.ctaText}
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.ctaHref}>{item.ctaText}</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <Separator />
      </div>

      {/* PROOF — STATS BAR */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="text-xs font-mono text-text-muted tracking-widest mb-8">
              TRACK RECORD
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <p
                    className={`text-3xl md:text-4xl font-bold mb-1 metric-value tracking-tight ${
                      stat.value === "M+" ? "text-green" : "text-text-primary"
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

      <div className="mx-auto max-w-4xl px-6">
        <Separator />
      </div>

      {/* FINAL CTA — NEWSLETTER */}
      <section className="py-20 blueprint-grid">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <Card className="card-shadow">
              <CardContent className="text-center">
                <p className="text-[10px] font-mono text-text-muted tracking-widest mb-4">
                  STAY CONNECTED
                </p>
                <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                  The best way to stay connected
                </h2>
                <p className="text-text-secondary mb-6 max-w-lg mx-auto text-sm leading-relaxed">
                  I share a production-ready AI automation template every week —
                  architecture diagrams, cost breakdowns, and working code. Join
                  the builders.
                </p>
                <Button variant="default" size="lg" asChild className="px-8">
                  <Link href="/newsletter">Subscribe to the newsletter</Link>
                </Button>
                <p className="text-xs text-text-muted mt-4">
                  Free forever. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
