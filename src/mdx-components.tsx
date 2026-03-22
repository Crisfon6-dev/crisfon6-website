import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-text-primary mb-6 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-text-primary mt-8 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-text-secondary leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="space-y-2 mb-6 ml-4 list-decimal">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-text-secondary leading-relaxed flex gap-2">
        <span className="text-text-muted shrink-0">&middot;</span>
        <span>{children}</span>
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent-light hover:text-accent transition-colors underline underline-offset-2"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="text-sm font-mono bg-surface-2 text-accent-light px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-surface-1 border border-border rounded-lg p-4 mb-6 overflow-x-auto text-sm font-mono">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-4 my-6 text-text-tertiary italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-border my-8" />,
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left text-text-primary font-medium pb-2 border-b border-border pr-4">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="text-text-secondary py-2 border-b border-border/50 pr-4">
        {children}
      </td>
    ),
    ...components,
  };
}
