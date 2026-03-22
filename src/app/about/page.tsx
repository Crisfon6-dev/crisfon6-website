import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cristhian Fonseca — Technical Lead with 4+ years building cloud-native FinTech platforms at scale and AI automation systems.",
};

const experience = [
  {
    role: "Technical Lead",
    company: "Prosperas",
    period: "2025 — Present",
    accent: "bg-green",
    points: [
      "Leading architecture of a FinTech credit marketplace inside a major telecom Super App",
      "Serving millions of underbanked users at national scale with zero-paperwork loans",
      "Multi-environment cloud-native infra using AWS CDK (RDS, S3, Lambda, Cognito, ElastiCache)",
      "Optimized analytical queries across 2M+ records — cut dashboard load times and costs",
      "End-to-end CI/CD pipelines and DevOps-first engineering culture",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "eSoluzion (Banking Consulting)",
    period: "2022 — Present",
    accent: "bg-accent",
    points: [
      "Architected end-to-end modules for enterprise banking systems with regulatory compliance",
      "Built dynamic, responsive banking interfaces improving usability across core modules",
      "Cross-functional collaboration with product owners and QA engineers",
    ],
  },
  {
    role: "Lead Developer",
    company: "ImkGlobal",
    period: "2024 — 2025",
    accent: "bg-violet",
    points: [
      "Led development team driving technical decisions, architecture, and sprint planning",
      "Cross-platform mobile/web applications using Flutter for government-backed services",
    ],
  },
  {
    role: "Software Engineer",
    company: "Dualboot Partners",
    period: "2022 — 2023",
    accent: "bg-cyan",
    points: [
      "Designed and deployed cloud services on AWS for a US-based platform",
      "Serverless architectures using AWS Lambda and Chalice, automating data flows",
      "High-availability infrastructure: EC2, Route 53, API Gateway",
    ],
  },
  {
    role: "Data Analyst / Full-Stack Developer",
    company: "Accenture",
    period: "2021 — 2022",
    accent: "bg-amber",
    points: [
      "Interactive Power BI dashboards integrating SQL Oracle and MongoDB sources",
      "Java (Spring Boot) backend services for banking infrastructure",
      "Full-stack features using the MEAN stack",
    ],
  },
];

const stackCategories = [
  {
    title: "Cloud & DevOps",
    items:
      "AWS (CDK, Lambda, RDS, S3, Cognito, CloudWatch, EC2, SES, SNS, API Gateway, Route 53, ElastiCache), Docker, CI/CD, Nginx",
  },
  {
    title: "AI & Automation",
    items:
      "LLMs, Claude API, MCP Protocol & Agents, Prompt Engineering, Generative AI, Neural Networks, Workflow Automation",
  },
  {
    title: "Full Stack",
    items:
      "Python, TypeScript, JavaScript, Java — FastAPI, Angular, Django, Spring Boot, NestJS, Node.js, Flutter — PostgreSQL, MongoDB, Redis",
  },
];

const certs = [
  {
    name: "B.Eng. Systems Engineering",
    org: "Universidad Autonoma de Bucaramanga (UNAB)",
  },
  { name: "Claude Code in Action", org: "Anthropic (2026)" },
  {
    name: "Neural Networks and Deep Learning",
    org: "Coursera / deeplearning.ai",
  },
  {
    name: "AWS Partner: Accreditation (Technical)",
    org: "Amazon Web Services",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {/* INTRO */}
      <div className="mb-20">
        <h1 className="text-4xl font-bold text-text-primary mb-6 tracking-tight">
          I build FinTech at scale.
          <br />
          <span className="text-text-tertiary">
            And AI automations on the side.
          </span>
        </h1>
        <div className="text-text-secondary space-y-4 max-w-3xl text-lg leading-relaxed">
          <p>
            I&apos;m Cristhian Fonseca — a Technical Lead and Full Stack
            Engineer with 4+ years architecting and shipping cloud-native
            FinTech platforms at scale.
          </p>
          <p>
            Right now I&apos;m leading a digital credit marketplace integrated
            into a major telecom&apos;s Super App, reaching millions of
            underbanked users across Colombia. Cloud-native infrastructure,
            fully automated provisioning, zero-paperwork loan processing.
          </p>
          <p>
            At the same time, I&apos;m deep into AI-driven development —
            building MCP agents, agentic workflows, and automation systems. I
            share the blueprints publicly: architectures, templates, and lessons
            learned.
          </p>
          <p className="text-text-primary font-medium">
            I believe the best engineers don&apos;t just write code — they build
            systems that compound.
          </p>
        </div>
      </div>

      <Separator className="mb-20" />

      {/* STACK */}
      <section className="mb-20">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          CORE STACK
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stackCategories.map((cat) => (
            <Card
              key={cat.title}
              className="card-shadow bg-surface-1/30 border-border"
            >
              <CardContent>
                <h3 className="text-sm font-medium text-text-primary mb-3">
                  {cat.title}
                </h3>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  {cat.items}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-20" />

      {/* EXPERIENCE */}
      <section className="mb-20">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-8">
          EXPERIENCE
        </h2>
        <div className="space-y-10">
          {experience.map((exp) => (
            <div
              key={exp.role + exp.company}
              className="border-l border-border pl-6 relative"
            >
              <div
                className={`absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full ${exp.accent}`}
              />
              <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                <h3 className="text-base font-bold text-text-primary">
                  {exp.role}
                </h3>
                <span className="text-sm text-text-tertiary">
                  {exp.company}
                </span>
              </div>
              <p className="text-xs font-mono text-text-muted mb-3">
                {exp.period}
              </p>
              <ul className="space-y-1.5">
                {exp.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary leading-relaxed flex gap-2"
                  >
                    <span className="text-text-muted mt-0.5 shrink-0">
                      &middot;
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-20" />

      {/* EDUCATION */}
      <section className="mb-20">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          EDUCATION &amp; CERTIFICATIONS
        </h2>
        <div className="flex flex-wrap gap-3">
          {certs.map((cert) => (
            <Badge
              key={cert.name}
              variant="secondary"
              className="px-3 py-1.5 h-auto text-sm"
            >
              <span className="font-medium text-text-primary">{cert.name}</span>
              <span className="text-text-muted mx-1.5">&mdash;</span>
              <span className="text-text-tertiary font-normal">{cert.org}</span>
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="mb-20" />

      {/* CTA */}
      <Card className="card-shadow bg-surface-1/30 border-border text-center">
        <CardContent className="py-4">
          <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
            Fellow builder? Let&apos;s connect.
          </h2>
          <p className="text-text-tertiary mb-6 text-sm">
            Always open to connecting with founders, CTOs, and builders shipping
            interesting things.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="default" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/crisfon6/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/newsletter">Subscribe to newsletter</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
