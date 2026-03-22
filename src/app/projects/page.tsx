import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Projects" };

const projects = [
  {
    title: "FinTech Credit Marketplace",
    description:
      "Digital credit marketplace integrated into a major telecom's Super App. Zero-paperwork loan processing serving millions of underbanked users at national scale. Cloud-native infrastructure with fully automated provisioning.",
    stack: ["AWS CDK", "Lambda", "RDS", "Cognito", "ElastiCache", "FastAPI", "Angular", "PostgreSQL"],
    highlights: [
      "Multi-environment infrastructure via AWS CDK",
      "Optimized analytical queries across 2M+ records",
      "End-to-end CI/CD pipelines with DevOps-first culture",
      "Zero-paperwork digital loan processing flow",
    ],
    result: "Millions of users served at national scale",
    tag: "FinTech",
    status: "In Production",
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
    tag: "Banking",
    status: "In Production",
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
    tag: "GovTech",
    status: "Delivered",
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
    tag: "Cloud / SaaS",
    status: "Delivered",
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
    tag: "AI / Open Source",
    status: "Active",
  },
];

const statusColors: Record<string, string> = {
  "In Production": "text-green-400 bg-green-400/10",
  "Delivered": "text-blue-400 bg-blue-400/10",
  "Active": "text-yellow-400 bg-yellow-400/10",
};

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-sm text-blue-400 mb-4">// Projects</p>
      <h1 className="text-4xl font-bold text-white mb-4">
        Things I&apos;ve built.
      </h1>
      <p className="text-slate-400 mb-12 max-w-2xl text-lg">
        A mix of FinTech platforms serving millions, cloud infrastructure for US startups,
        and AI automation templates I share in public. No client names — just results.
      </p>

      <div className="space-y-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-slate-700 rounded-xl p-8 bg-slate-800/20 card-hover"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                {project.tag}
              </span>
              <span
                className={`text-xs font-mono px-2 py-1 rounded ${
                  statusColors[project.status] || "text-slate-400 bg-slate-400/10"
                }`}
              >
                {project.status}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">{project.description}</p>

            <div className="mb-6">
              <p className="text-xs font-mono text-slate-500 mb-3">KEY HIGHLIGHTS</p>
              <ul className="space-y-1.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-slate-400">
                    <span className="text-slate-600 mr-2">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-700/50">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-green-400">{project.result}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 border border-slate-700 rounded-xl p-8 bg-slate-800/20 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Want the blueprints?</h2>
        <p className="text-slate-400 mb-6 text-sm">
          Every week I publish a new AI automation template with architecture diagrams,
          deployment guides, and working code.
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
