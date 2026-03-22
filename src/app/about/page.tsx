import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

const experience = [
  {
    role: "Technical Lead",
    company: "Prosperas",
    period: "2025 — Present",
    points: [
      "Leading architecture and full-stack development of a FinTech credit marketplace integrated into a major telecom's Super App",
      "Serving millions of underbanked users at national scale with zero-paperwork loan processing",
      "Designed multi-environment cloud-native infrastructure using AWS CDK (RDS, S3, Lambda, Cognito, ElastiCache)",
      "Optimized analytical queries across 2M+ records, cutting dashboard load times and infrastructure costs",
      "Implemented end-to-end CI/CD pipelines and cultivated a DevOps-first engineering culture",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "eSoluzion (Banking Consulting)",
    period: "2022 — Present",
    points: [
      "Architected end-to-end modules for enterprise banking systems ensuring regulatory compliance",
      "Built dynamic, responsive banking interfaces improving usability across core banking modules",
      "Collaborated cross-functionally with product owners and QA engineers",
    ],
  },
  {
    role: "Lead Developer",
    company: "ImkGlobal",
    period: "2024 — 2025",
    points: [
      "Led a development team driving technical decisions, architecture discussions, and sprint planning",
      "Developed cross-platform mobile/web applications using Flutter for government-backed services",
    ],
  },
  {
    role: "Software Engineer",
    company: "Dualboot Partners",
    period: "2022 — 2023",
    points: [
      "Designed and deployed cloud services on AWS for a US-based platform",
      "Built serverless architectures using AWS Lambda and Chalice, automating data flows",
      "Configured high-availability infrastructure: EC2, Route 53, API Gateway",
    ],
  },
  {
    role: "Data Analyst / Full-Stack Developer",
    company: "Accenture",
    period: "2021 — 2022",
    points: [
      "Created interactive Power BI dashboards integrating SQL Oracle and MongoDB sources",
      "Developed Java (Spring Boot) backend services for banking infrastructure",
      "Built full-stack features using the MEAN stack",
    ],
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* INTRO */}
      <p className="font-mono text-sm text-blue-400 mb-4">// About</p>
      <h1 className="text-4xl font-bold text-white mb-6">
        I build FinTech at scale.<br />
        <span className="text-slate-400">And AI automations on the side.</span>
      </h1>
      <div className="text-slate-400 space-y-4 mb-16 max-w-3xl text-lg leading-relaxed">
        <p>
          I&apos;m Cristhian Fonseca — a Technical Lead and Full Stack Engineer with 4+ years of experience
          architecting and shipping cloud-native FinTech platforms at scale.
        </p>
        <p>
          Right now I&apos;m leading the development of a digital credit marketplace integrated into a major
          telecom&apos;s Super App, reaching millions of underbanked users across Colombia. Cloud-native
          infrastructure, fully automated provisioning, zero-paperwork loan processing.
        </p>
        <p>
          At the same time, I&apos;m deep into AI-driven development — building MCP agents, agentic workflows,
          and automation systems that eliminate repetitive work. I share the blueprints publicly:
          architectures, templates, and lessons learned.
        </p>
        <p className="text-slate-300 font-medium">
          I believe the best engineers don&apos;t just write code — they build systems that compound.
        </p>
      </div>

      {/* STACK */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Core Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Cloud & DevOps",
              items: "AWS (CDK, Lambda, RDS, S3, Cognito, CloudWatch, EC2, SES, SNS, API Gateway, Route 53, ElastiCache), Docker, CI/CD, Nginx",
            },
            {
              title: "AI & Automation",
              items: "LLMs, Claude API, MCP Protocol & Agents, Prompt Engineering, Generative AI, Neural Networks, Workflow Automation",
            },
            {
              title: "Full Stack",
              items: "Python, TypeScript, JavaScript, Java — FastAPI, Angular, Django, Spring Boot, NestJS, Node.js, Flutter — PostgreSQL, MongoDB, Redis",
            },
          ].map((cat) => (
            <div key={cat.title} className="border border-slate-700 rounded-xl p-5 bg-slate-800/20">
              <h3 className="text-sm font-mono text-blue-400 mb-3">{cat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{cat.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-8">Experience</h2>
        <div className="space-y-10">
          {experience.map((exp) => (
            <div key={exp.role + exp.company} className="border-l-2 border-slate-700 pl-6 relative">
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-400" />
              <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <span className="text-sm text-slate-500">— {exp.company}</span>
              </div>
              <p className="text-xs font-mono text-slate-600 mb-3">{exp.period}</p>
              <ul className="space-y-1.5">
                {exp.points.map((point, i) => (
                  <li key={i} className="text-sm text-slate-400 leading-relaxed">
                    <span className="text-slate-600 mr-2">→</span>{point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Education & Certifications</h2>
        <div className="space-y-3">
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">B.Eng. Systems Engineering</span> — Universidad Autónoma de Bucaramanga (UNAB)
          </p>
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">Claude Code in Action</span> — Anthropic (2026)
          </p>
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">Neural Networks and Deep Learning</span> — Coursera / deeplearning.ai
          </p>
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">AWS Partner: Accreditation (Technical)</span> — Amazon Web Services
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border border-slate-700 rounded-xl p-8 bg-slate-800/20 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Want to work together?</h2>
        <p className="text-slate-400 mb-6 text-sm">
          I&apos;m always open to connecting with founders, CTOs, and builders shipping interesting things.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://linkedin.com/in/crisfon6" target="_blank" rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Connect on LinkedIn
          </a>
          <Link href="/newsletter"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Subscribe to newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
