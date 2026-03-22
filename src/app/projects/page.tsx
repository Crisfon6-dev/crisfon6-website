import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Projects" };

const projects = [
  {
    title: "FinTech Credit Marketplace",
    description:
      "Digital credit marketplace integrated into a major telecom's Super App. Zero-paperwork loan processing serving millions of underbanked users at national scale. Cloud-native infrastructure with fully automated provisioning.",
    stack: [
      "AWS CDK",
      "Lambda",
      "RDS",
      "Cognito",
      "ElastiCache",
      "FastAPI",
      "Angular",
      "PostgreSQL",
    ],
    highlights: [
      "Multi-environment infrastructure via AWS CDK",
      "Optimized analytical queries across 2M+ records",
      "End-to-end CI/CD pipelines with DevOps-first culture",
      "Zero-paperwork digital loan processing flow",
    ],
    result: "Millions of users served at national scale",
    tag: "FINTECH",
    status: "In Production",
    statusColor: "text-green bg-green-dim",
    accent: "border-l-green",
  },
  {
    title: "Enterprise Banking Platform",
    description:
      "End-to-end modules for a major financial institution. Dynamic, responsive interfaces with regulatory compliance baked into every layer. High-performance backend systems handling core banking operations.",
    stack: ["Java", "Spring Boot", "Angular", "Thymeleaf", "Oracle", "REST APIs"],
    highlights: [
      "Architected modules ensuring regulatory compliance",
      "Built dynamic banking interfaces improving usability",
      "Cross-functional collaboration with product and QA teams",
    ],
    result: "3+ years in production",
    tag: "BANKING",
    status: "In Production",
    statusColor: "text-green bg-green-dim",
    accent: "border-l-accent",
  },
  {
    title: "Government Services Platform",
    description:
      "Cross-platform mobile and web applications for government-backed services. Led the development team driving technical decisions, architecture discussions, and sprint planning.",
    stack: ["Flutter", "Dart", "REST APIs", "CI/CD"],
    highlights: [
      "Led development team and technical architecture",
      "Cross-platform mobile/web with Flutter",
      "Sprint planning and technical decision-making",
    ],
    result: "Delivered for government services",
    tag: "GOVTECH",
    status: "Delivered",
    statusColor: "text-accent-light bg-accent-dim",
    accent: "border-l-cyan",
  },
  {
    title: "US Cloud Platform",
    description:
      "Serverless cloud services for a US-based platform. Designed and deployed AWS infrastructure with high-availability configurations and automated data flows.",
    stack: ["AWS Lambda", "Chalice", "EC2", "Route 53", "API Gateway", "Python"],
    highlights: [
      "Serverless architectures automating data flows",
      "High-availability infrastructure configuration",
      "Full AWS service orchestration",
    ],
    result: "Deployed on AWS",
    tag: "CLOUD / SAAS",
    status: "Delivered",
    statusColor: "text-accent-light bg-accent-dim",
    accent: "border-l-amber",
  },
  {
    title: "AI Automation Templates",
    description:
      "Open-source collection of production-ready AI automation blueprints. Each template includes architecture diagrams, deployment guides, cost breakdowns, and working code you can deploy today.",
    stack: ["Claude API", "MCP Protocol", "AWS Lambda", "Python", "n8n"],
    highlights: [
      "Production-ready blueprints with real cost analysis",
      "Architecture diagrams and deployment guides included",
      "New template published every week",
      "Building in public — all code open source",
    ],
    result: "New template every week",
    tag: "AI / OPEN SOURCE",
    status: "Active",
    statusColor: "text-amber bg-amber-dim",
    accent: "border-l-violet",
  },
];

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">
        Things I&apos;ve built.
      </h1>
      <p className="text-text-secondary mb-14 max-w-2xl text-lg leading-relaxed">
        A mix of FinTech platforms serving millions, cloud infrastructure for US
        startups, and AI automation templates I share in public.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className={`border border-border rounded-xl p-8 bg-surface-1/30 card-hover card-accent-left ${project.accent}`}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] font-mono text-text-muted tracking-widest">
                {project.tag}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${project.statusColor}`}
              >
                {project.status}
              </span>
            </div>

            <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
              {project.title}
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="mb-6">
              <ul className="space-y-1.5">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-tertiary flex gap-2"
                  >
                    <span className="text-text-muted mt-0.5 shrink-0">
                      &middot;
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-text-muted bg-surface-2 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-green metric-value">
                {project.result}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 border border-border rounded-xl p-8 bg-surface-1/30 text-center blueprint-grid-dense">
        <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
          Want the blueprints?
        </h2>
        <p className="text-text-tertiary mb-6 text-sm">
          Every week I publish a new AI automation template with architecture
          diagrams, deployment guides, and working code.
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
