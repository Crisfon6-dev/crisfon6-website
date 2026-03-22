import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Automations" };

const automations = [
  {
    title: "AI-Powered Document Processor",
    description:
      "Ingest PDFs, extract structured data with Claude API, and store results in PostgreSQL. Deployed on AWS Lambda with S3 triggers — fully serverless.",
    stack: ["Claude API", "AWS Lambda", "S3", "PostgreSQL", "Python"],
    cost: "$12/mo at 1K docs",
    timeSaved: "~15 hrs/week",
    difficulty: "Intermediate",
    week: "Week 1",
  },
  {
    title: "Slack → Notion Meeting Summarizer",
    description:
      "Automatically captures Slack threads, summarizes discussions with an LLM, and creates structured Notion pages with action items and owners.",
    stack: ["Claude API", "Slack API", "Notion API", "Python", "Lambda"],
    cost: "$5/mo",
    timeSaved: "~8 hrs/week",
    difficulty: "Beginner",
    week: "Week 2",
  },
  {
    title: "Automated Lead Scoring Pipeline",
    description:
      "Ingests form submissions, enriches with public data, scores leads using an AI model, and routes high-intent prospects to your CRM automatically.",
    stack: ["Claude API", "n8n", "PostgreSQL", "REST APIs", "Python"],
    cost: "$18/mo",
    timeSaved: "~10 hrs/week",
    difficulty: "Intermediate",
    week: "Week 3",
  },
  {
    title: "MCP Agent: Code Review Assistant",
    description:
      "An MCP-powered agent that reviews pull requests, flags security issues, suggests improvements, and posts inline comments — all triggered by GitHub webhooks.",
    stack: ["MCP Protocol", "Claude API", "GitHub API", "TypeScript", "Lambda"],
    cost: "$8/mo",
    timeSaved: "~12 hrs/week",
    difficulty: "Advanced",
    week: "Week 4",
  },
  {
    title: "Invoice Processing Automation",
    description:
      "Extract line items, totals, and vendor info from invoice PDFs. Validates against PO data and flags discrepancies for review before auto-filing.",
    stack: ["Claude API", "S3", "DynamoDB", "Lambda", "Python"],
    cost: "$10/mo at 500 invoices",
    timeSaved: "~20 hrs/week",
    difficulty: "Intermediate",
    week: "Week 5",
  },
  {
    title: "Content Repurposing Engine",
    description:
      "Takes a long-form blog post or newsletter and generates LinkedIn posts, X threads, email snippets, and social cards — all on-brand and ready to publish.",
    stack: ["Claude API", "n8n", "Markdown", "Python", "S3"],
    cost: "$6/mo",
    timeSaved: "~6 hrs/week",
    difficulty: "Beginner",
    week: "Week 6",
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: "text-green-400 bg-green-400/10",
  Intermediate: "text-yellow-400 bg-yellow-400/10",
  Advanced: "text-red-400 bg-red-400/10",
};

export default function Automations() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-sm text-blue-400 mb-4">// Automations</p>
      <h1 className="text-4xl font-bold text-white mb-4">
        AI automations you can steal.
      </h1>
      <p className="text-slate-400 mb-4 max-w-2xl text-lg">
        Every week I publish a new production-ready automation template.
        Architecture diagrams, deployment guides, cost breakdowns, and working code included.
      </p>
      <p className="text-sm text-slate-500 mb-12">
        Subscribe to{" "}
        <Link href="/newsletter" className="text-blue-400 hover:text-blue-300 transition-colors">
          The Builder&apos;s Blueprint
        </Link>{" "}
        to get each one delivered to your inbox.
      </p>

      <div className="space-y-6">
        {automations.map((auto) => (
          <div
            key={auto.title}
            className="border border-slate-700 rounded-xl p-8 bg-slate-800/20 card-hover"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                {auto.week}
              </span>
              <span
                className={`text-xs font-mono px-2 py-1 rounded ${
                  difficultyColors[auto.difficulty] || ""
                }`}
              >
                {auto.difficulty}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mb-3">{auto.title}</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">{auto.description}</p>

            <div className="flex flex-wrap gap-6 mb-6">
              <div>
                <p className="text-xs text-slate-500 font-mono mb-1">INFRA COST</p>
                <p className="text-sm text-green-400 font-medium">{auto.cost}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-mono mb-1">TIME SAVED</p>
                <p className="text-sm text-blue-400 font-medium">{auto.timeSaved}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {auto.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 border border-dashed border-blue-500/30 rounded-xl p-8 bg-blue-600/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-sm font-mono text-slate-400">NEW TEMPLATE EVERY WEEK</p>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Get the blueprint before everyone else
        </h2>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">
          Architecture diagrams, deployment guides, cost breakdowns, and working code.
          Delivered to your inbox every week. Free.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Subscribe to The Builder&apos;s Blueprint
        </Link>
      </section>
    </div>
  );
}
