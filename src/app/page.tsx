import Link from "next/link";

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
      "Digital credit marketplace in a major telecom Super App. Zero-paperwork loans at national scale.",
    result: "Millions of users served",
    tag: "FINTECH",
    accent: "border-l-green",
  },
  {
    title: "Enterprise Banking Platform",
    description:
      "End-to-end banking modules for a major financial institution. Regulatory compliance baked in.",
    result: "3+ years in production",
    tag: "BANKING",
    accent: "border-l-accent",
  },
  {
    title: "AI Automation Templates",
    description:
      "Open-source AI automation blueprints with architecture diagrams, cost breakdowns, and working code.",
    result: "New template weekly",
    tag: "AI / OPEN SOURCE",
    accent: "border-l-violet",
  },
];

const stats = [
  { value: "4+", label: "Years shipping products", emphasis: false },
  { value: "2M+", label: "Records optimized", emphasis: false },
  { value: "10+", label: "AWS services in prod", emphasis: false },
  { value: "M+", label: "Users served", emphasis: true },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-background" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 relative">
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-text-tertiary mb-5 tracking-wider">
              TECHNICAL LEAD &amp; AI BUILDER
            </p>
            <h1 className="text-4xl md:text-[3.5rem] font-bold text-text-primary leading-[1.1] mb-6 tracking-tight">
              I ship FinTech at scale{" "}
              <span className="gradient-text">
                and build AI automations
              </span>{" "}
              you can steal.
            </h1>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl leading-relaxed">
              Technical Lead building a national-scale credit marketplace by
              day. AI automation builder sharing blueprints and templates in
              public.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/newsletter"
                className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                Get the weekly blueprint
              </Link>
              <Link
                href="/projects"
                className="border border-border-emphasis hover:border-border-strong text-text-secondary hover:text-text-primary px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                See my work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <span className="text-[10px] text-text-muted font-mono whitespace-nowrap tracking-widest">
              STACK
            </span>
            <div className="w-px h-3 bg-border-emphasis" />
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

      {/* STATS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
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
        </div>
      </section>

      {/* AUTOMATION OF THE WEEK */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green pulse-subtle" />
            <h2 className="text-xs font-mono text-text-muted tracking-widest">
              AUTOMATION OF THE WEEK
            </h2>
          </div>
          <div className="border border-border-emphasis rounded-xl p-8 glow blueprint-grid-dense relative overflow-hidden">
            <div className="relative flex flex-wrap items-start justify-between gap-8">
              <div className="flex-1 min-w-[280px]">
                <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
                  AI-Powered Document Processor
                </h3>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  Ingest PDFs, extract structured data with Claude API, store in
                  PostgreSQL. Deployed on AWS Lambda with S3 triggers.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-[10px] text-text-muted font-mono mb-1 tracking-widest">
                      INFRA COST
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
                      TIME SAVED
                    </p>
                    <p className="text-2xl font-bold text-accent-light metric-value">
                      15h
                      <span className="text-sm text-text-tertiary font-normal">
                        /week
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/automations"
                className="border border-accent-dim hover:border-accent/30 text-accent-light hover:text-accent px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                View blueprint
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`border border-border rounded-xl p-6 bg-surface-1/50 card-hover card-accent-left ${project.accent}`}
              >
                <span className="inline-block text-[10px] font-mono text-text-muted tracking-widest mb-4">
                  {project.tag}
                </span>
                <h3 className="text-base font-bold text-text-primary mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-text-tertiary mb-5 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-sm font-medium text-green">
                  {project.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 border-t border-border blueprint-grid">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">
              Get a free automation blueprint every week
            </h2>
            <p className="text-text-secondary mb-8">
              Architecture diagrams, deployment guides, cost breakdowns, and
              working code. No fluff — just blueprints you can deploy.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-accent hover:bg-accent-light text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
            >
              Subscribe to The Builder&apos;s Blueprint
            </Link>
            <p className="text-xs text-text-muted mt-4">
              Free forever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
