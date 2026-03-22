import Link from "next/link";

const techStack = [
  "AWS", "CDK", "Lambda", "Claude API", "MCP Protocol", "Next.js",
  "Python", "FastAPI", "TypeScript", "Angular", "Node.js", "PostgreSQL",
];

const projects = [
  {
    title: "FinTech Credit Marketplace",
    description: "Digital credit marketplace integrated into a major telecom's Super App, serving millions of underbanked users at national scale. Zero-paperwork loan processing.",
    stack: ["AWS CDK", "Lambda", "RDS", "Cognito", "FastAPI", "Angular"],
    result: "Millions of users served",
    tag: "FinTech",
  },
  {
    title: "Enterprise Banking Platform",
    description: "End-to-end banking modules for a major financial institution. Dynamic interfaces, regulatory compliance, and high-performance backend systems.",
    stack: ["Java", "Spring Boot", "Angular", "Thymeleaf", "Oracle"],
    result: "3+ years in production",
    tag: "Banking",
  },
  {
    title: "AI Automation Templates",
    description: "Open-source collection of production-ready AI automation blueprints. Architecture diagrams, deployment guides, and cost breakdowns included.",
    stack: ["Claude API", "MCP", "AWS Lambda", "Python", "n8n"],
    result: "New template weekly",
    tag: "AI / Open Source",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 relative">
          <div className="max-w-3xl">
            <p className="font-mono text-sm text-blue-400 mb-4">// Technical Lead &amp; AI Builder</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              I ship FinTech at scale{" "}
              <span className="gradient-text">and build AI automations</span>{" "}
              you can steal.
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Technical Lead building a national-scale credit marketplace by day.
              AI automation builder sharing blueprints, templates, and architecture breakdowns in public.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/newsletter"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get the weekly template
              </Link>
              <Link
                href="/projects"
                className="border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                See my projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK BAR */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-6 overflow-x-auto">
            <span className="text-xs text-slate-600 font-mono whitespace-nowrap">STACK //</span>
            {techStack.map((tech) => (
              <span key={tech} className="text-xs text-slate-500 font-mono whitespace-nowrap">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "4+", label: "Years shipping products" },
              { number: "2M+", label: "Records optimized" },
              { number: "10+", label: "AWS services in prod" },
              { number: "Millions", label: "Users served" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">{stat.number}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATION OF THE WEEK */}
      <section className="py-16 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <h2 className="text-sm font-mono text-slate-400">AUTOMATION OF THE WEEK</h2>
          </div>
          <div className="border border-slate-700 rounded-xl p-8 glow card-hover bg-slate-800/30">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex-1 min-w-[280px]">
                <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Document Processor</h3>
                <p className="text-slate-400 mb-6">
                  Ingest PDFs, extract structured data with Claude API, store in PostgreSQL.
                  Deployed on AWS Lambda with S3 triggers.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-xs text-slate-500 font-mono mb-1">INFRA COST</p>
                    <p className="text-sm text-green-400 font-medium">$12/mo at 1K docs</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono mb-1">TIME SAVED</p>
                    <p className="text-sm text-blue-400 font-medium">~15 hrs/week</p>
                  </div>
                </div>
              </div>
              <Link
                href="/automations"
                className="bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 text-blue-400 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                View blueprint →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-16 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
            <Link href="/projects" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="border border-slate-700 rounded-xl p-6 bg-slate-800/20 card-hover">
                <span className="inline-block text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded mb-4">
                  {project.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-green-400">{project.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get a free automation template every week
            </h2>
            <p className="text-slate-400 mb-8">
              Architecture diagrams, deployment guides, cost breakdowns, and working code.
              No fluff. Just blueprints you can deploy.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
            >
              Subscribe to The Builder&apos;s Blueprint
            </Link>
            <p className="text-xs text-slate-600 mt-4">Join for free. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
