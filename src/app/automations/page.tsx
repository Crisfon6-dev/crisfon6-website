import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Automations" };

const automations = [
  {
    title: "AI-Powered Document Processor",
    description:
      "Ingest PDFs, extract structured data with Claude API, and store results in PostgreSQL. Deployed on AWS Lambda with S3 triggers — fully serverless.",
    stack: ["Claude API", "AWS Lambda", "S3", "PostgreSQL", "Python"],
    cost: "$12",
    costUnit: "/mo at 1K docs",
    timeSaved: "15h",
    timeUnit: "/week",
    difficulty: "Intermediate",
    difficultyColor: "text-amber bg-amber-dim",
    week: 1,
  },
  {
    title: "Slack to Notion Meeting Summarizer",
    description:
      "Captures Slack threads, summarizes discussions with an LLM, and creates structured Notion pages with action items and owners.",
    stack: ["Claude API", "Slack API", "Notion API", "Python", "Lambda"],
    cost: "$5",
    costUnit: "/mo",
    timeSaved: "8h",
    timeUnit: "/week",
    difficulty: "Beginner",
    difficultyColor: "text-green bg-green-dim",
    week: 2,
  },
  {
    title: "Automated Lead Scoring Pipeline",
    description:
      "Ingests form submissions, enriches with public data, scores leads using AI, and routes high-intent prospects to your CRM automatically.",
    stack: ["Claude API", "n8n", "PostgreSQL", "REST APIs", "Python"],
    cost: "$18",
    costUnit: "/mo",
    timeSaved: "10h",
    timeUnit: "/week",
    difficulty: "Intermediate",
    difficultyColor: "text-amber bg-amber-dim",
    week: 3,
  },
  {
    title: "MCP Agent: Code Review Assistant",
    description:
      "An MCP-powered agent that reviews pull requests, flags security issues, suggests improvements, and posts inline comments — triggered by GitHub webhooks.",
    stack: ["MCP Protocol", "Claude API", "GitHub API", "TypeScript", "Lambda"],
    cost: "$8",
    costUnit: "/mo",
    timeSaved: "12h",
    timeUnit: "/week",
    difficulty: "Advanced",
    difficultyColor: "text-red bg-red-dim",
    week: 4,
  },
  {
    title: "Invoice Processing Automation",
    description:
      "Extract line items, totals, and vendor info from invoice PDFs. Validates against PO data and flags discrepancies before auto-filing.",
    stack: ["Claude API", "S3", "DynamoDB", "Lambda", "Python"],
    cost: "$10",
    costUnit: "/mo at 500 invoices",
    timeSaved: "20h",
    timeUnit: "/week",
    difficulty: "Intermediate",
    difficultyColor: "text-amber bg-amber-dim",
    week: 5,
  },
  {
    title: "Content Repurposing Engine",
    description:
      "Takes a long-form blog post and generates LinkedIn posts, X threads, email snippets, and social cards — all on-brand and ready to publish.",
    stack: ["Claude API", "n8n", "Markdown", "Python", "S3"],
    cost: "$6",
    costUnit: "/mo",
    timeSaved: "6h",
    timeUnit: "/week",
    difficulty: "Beginner",
    difficultyColor: "text-green bg-green-dim",
    week: 6,
  },
];

export default function Automations() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">
        AI automations you can steal.
      </h1>
      <p className="text-text-secondary mb-4 max-w-2xl text-lg leading-relaxed">
        Every week I publish a production-ready automation template. Architecture
        diagrams, deployment guides, cost breakdowns, and working code.
      </p>
      <p className="text-sm text-text-muted mb-14">
        Subscribe to{" "}
        <Link
          href="/newsletter"
          className="text-accent-light hover:text-accent transition-colors"
        >
          The Builder&apos;s Blueprint
        </Link>{" "}
        to get each one delivered.
      </p>

      <div className="space-y-5">
        {automations.map((auto) => (
          <div
            key={auto.title}
            className="border border-border rounded-xl p-8 bg-surface-1/30 card-hover"
          >
            {/* Header row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] font-mono text-text-muted tracking-widest">
                WEEK {auto.week}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${auto.difficultyColor}`}
              >
                {auto.difficulty}
              </span>
            </div>

            <h2 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
              {auto.title}
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {auto.description}
            </p>

            {/* Metrics — LOUD */}
            <div className="flex flex-wrap gap-8 mb-6">
              <div>
                <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                  INFRA COST
                </p>
                <p className="text-2xl font-bold text-green metric-value">
                  {auto.cost}
                  <span className="text-sm text-text-tertiary font-normal">
                    {auto.costUnit}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                  TIME SAVED
                </p>
                <p className="text-2xl font-bold text-accent-light metric-value">
                  {auto.timeSaved}
                  <span className="text-sm text-text-tertiary font-normal">
                    {auto.timeUnit}
                  </span>
                </p>
              </div>
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5">
              {auto.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-text-muted bg-surface-2 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 border border-accent-dim rounded-xl p-8 blueprint-grid text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green pulse-subtle" />
          <p className="text-[10px] font-mono text-text-muted tracking-widest">
            NEW TEMPLATE EVERY WEEK
          </p>
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
          Get the blueprint before everyone else
        </h2>
        <p className="text-text-secondary mb-6 max-w-lg mx-auto">
          Architecture diagrams, deployment guides, cost breakdowns, and working
          code. Delivered every week. Free.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Subscribe to The Builder&apos;s Blueprint
        </Link>
      </section>
    </div>
  );
}
