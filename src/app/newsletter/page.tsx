import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The Builder's Blueprint — A free weekly automation template with architecture diagrams, deployment guides, cost breakdowns, and working code.",
};

const benefits = [
  {
    icon: "📐",
    title: "Architecture Diagrams",
    description: "Visual breakdowns of every automation so you understand the full system before deploying.",
  },
  {
    icon: "🚀",
    title: "Deployment Guides",
    description: "Step-by-step instructions to go from zero to production. No guessing, no gaps.",
  },
  {
    icon: "💰",
    title: "Cost Breakdowns",
    description: "Real infrastructure costs at different scales. Know exactly what you're paying before you start.",
  },
  {
    icon: "🧑‍💻",
    title: "Working Code",
    description: "Every template comes with a GitHub repo you can clone and deploy today.",
  },
];

const sampleTopics = [
  "AI-Powered Document Processor ($12/mo at 1K docs)",
  "Slack → Notion Meeting Summarizer",
  "Automated Lead Scoring Pipeline",
  "MCP Agent: Code Review Assistant",
  "Invoice Processing Automation",
  "Content Repurposing Engine",
];

export default function Newsletter() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm text-blue-400 mb-4">// Newsletter</p>
      <h1 className="text-4xl font-bold text-white mb-4">
        The Builder&apos;s Blueprint
      </h1>
      <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
        A free AI automation template every week. Architecture diagrams, deployment guides,
        cost breakdowns, and working code — no fluff, just blueprints you can deploy.
      </p>

      {/* Email capture placeholder */}
      <div className="border border-blue-500/30 rounded-xl p-8 bg-blue-600/5 mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-sm font-mono text-slate-400">FREE — DELIVERED EVERY WEEK</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@company.com"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            readOnly
          />
          <a
            href="https://crisfon6.beehiiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors text-center whitespace-nowrap"
          >
            Subscribe for free
          </a>
        </div>
        <p className="text-xs text-slate-600 mt-3">
          Join for free. Unsubscribe anytime. No spam — just weekly blueprints.
        </p>
      </div>

      {/* What you get */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-8">What you get every week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="border border-slate-700 rounded-xl p-5 bg-slate-800/20">
              <p className="text-2xl mb-3">{b.icon}</p>
              <h3 className="text-sm font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample topics */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Recent & upcoming templates</h2>
        <div className="space-y-3">
          {sampleTopics.map((topic, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-slate-700/50 rounded-lg px-5 py-3 bg-slate-800/10"
            >
              <span className="text-xs font-mono text-slate-600 w-16">Week {i + 1}</span>
              <p className="text-sm text-slate-300">{topic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who is this for */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-4">Who is this for?</h2>
        <div className="text-slate-400 space-y-3 text-sm leading-relaxed">
          <p>
            <span className="text-white font-medium">Engineers</span> who want to add AI automation
            to their toolkit without spending weeks researching architecture patterns.
          </p>
          <p>
            <span className="text-white font-medium">Founders & CTOs</span> looking for
            production-ready templates they can hand to their team and deploy in days, not months.
          </p>
          <p>
            <span className="text-white font-medium">Builders</span> who believe in learning by doing
            — and want real blueprints with real cost numbers instead of theoretical blog posts.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border border-slate-700 rounded-xl p-8 bg-slate-800/20 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Stop building from scratch.
        </h2>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">
          Get a tested, production-ready AI automation template delivered to your inbox every week.
        </p>
        <a
          href="https://crisfon6.beehiiv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
        >
          Subscribe to The Builder&apos;s Blueprint
        </a>
        <p className="text-xs text-slate-600 mt-4">Free forever. Unsubscribe anytime.</p>
      </section>
    </div>
  );
}
