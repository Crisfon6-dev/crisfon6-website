import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The Builder's Blueprint — A free weekly automation template with architecture diagrams, deployment guides, cost breakdowns, and working code.",
};

const benefits = [
  {
    title: "Architecture Diagrams",
    description:
      "Visual breakdowns of every automation so you understand the full system before deploying.",
  },
  {
    title: "Deployment Guides",
    description:
      "Step-by-step instructions to go from zero to production. No guessing, no gaps.",
  },
  {
    title: "Cost Breakdowns",
    description:
      "Real infrastructure costs at different scales. Know exactly what you're paying.",
  },
  {
    title: "Working Code",
    description:
      "Every template comes with a GitHub repo you can clone and deploy today.",
  },
];

const sampleTopics = [
  "AI-Powered Document Processor ($12/mo at 1K docs)",
  "Slack to Notion Meeting Summarizer",
  "Automated Lead Scoring Pipeline",
  "MCP Agent: Code Review Assistant",
  "Invoice Processing Automation",
  "Content Repurposing Engine",
];

const audiences = [
  {
    who: "Engineers",
    desc: "who want to add AI automation to their toolkit without weeks of research.",
  },
  {
    who: "Founders & CTOs",
    desc: "looking for production-ready templates to hand to their team and deploy in days.",
  },
  {
    who: "Builders",
    desc: "who believe in learning by doing — real blueprints with real cost numbers.",
  },
];

export default function Newsletter() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">
        The Builder&apos;s Blueprint
      </h1>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl leading-relaxed">
        A free AI automation template every week. Architecture diagrams,
        deployment guides, cost breakdowns, and working code — no fluff, just
        blueprints you can deploy.
      </p>

      {/* Email capture */}
      <div className="border border-accent-dim rounded-xl p-8 blueprint-grid mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green pulse-subtle" />
          <p className="text-[10px] font-mono text-text-muted tracking-widest">
            FREE — DELIVERED EVERY WEEK
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@company.com"
            className="flex-1 bg-surface-2 border border-border-emphasis rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            readOnly
          />
          <a
            href="https://crisfon6.beehiiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors text-center whitespace-nowrap"
          >
            Subscribe for free
          </a>
        </div>
        <p className="text-xs text-text-muted mt-3">
          No spam — just weekly blueprints. Unsubscribe anytime.
        </p>
      </div>

      {/* What you get */}
      <section className="mb-16">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          WHAT YOU GET EVERY WEEK
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="border border-border rounded-xl p-5 bg-surface-1/30"
            >
              <h3 className="text-sm font-medium text-text-primary mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-text-tertiary leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample topics */}
      <section className="mb-16">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          RECENT &amp; UPCOMING TEMPLATES
        </h2>
        <div className="space-y-2">
          {sampleTopics.map((topic, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border border-border rounded-lg px-5 py-3 bg-surface-1/20"
            >
              <span className="text-[10px] font-mono text-text-muted w-12 shrink-0 tracking-widest">
                W{i + 1}
              </span>
              <p className="text-sm text-text-secondary">{topic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who is this for */}
      <section className="mb-16">
        <h2 className="text-xs font-mono text-text-muted tracking-widest mb-6">
          WHO IS THIS FOR
        </h2>
        <div className="space-y-3">
          {audiences.map((a) => (
            <p key={a.who} className="text-sm text-text-secondary leading-relaxed">
              <span className="text-text-primary font-medium">{a.who}</span>{" "}
              {a.desc}
            </p>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border border-border rounded-xl p-8 bg-surface-1/30 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
          Stop building from scratch.
        </h2>
        <p className="text-text-secondary mb-6 max-w-lg mx-auto">
          Get a tested, production-ready AI automation template delivered to your
          inbox every week.
        </p>
        <a
          href="https://crisfon6.beehiiv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent hover:bg-accent-light text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
        >
          Subscribe to The Builder&apos;s Blueprint
        </a>
        <p className="text-xs text-text-muted mt-4">
          Free forever. Unsubscribe anytime.
        </p>
      </section>
    </div>
  );
}
