import type { ReactNode } from 'react';

export type PipelineNode = {
  icon: ReactNode;
  label: string;
  sub?: string;
};

type PipelineProps = {
  nodes: PipelineNode[];
  className?: string;
};

export function Pipeline({ nodes, className = '' }: PipelineProps) {
  return (
    <ol
      role="list"
      aria-label="pipeline"
      className={`grid gap-sp-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`.trim()}
    >
      {nodes.map((node, i) => (
        <li
          key={`${node.label}-${i}`}
          className="relative overflow-hidden rounded-sp-md border border-warm-border bg-warm-bg-elev p-sp-4"
        >
          <span
            aria-hidden
            className="flow-sweep pointer-events-none absolute inset-0"
            style={{
              animationDelay: `${i * 0.5}s`,
              background:
                'linear-gradient(90deg, transparent 0%, rgb(from var(--c-accent) r g b / 0.18) 50%, transparent 100%)',
            }}
          />
          <div className="relative flex items-center gap-sp-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sp-sm bg-accent-weak text-accent">
              {node.icon}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-warm-fg">{node.label}</p>
              {node.sub ? (
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-warm-fg-faint">
                  {node.sub}
                </p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
