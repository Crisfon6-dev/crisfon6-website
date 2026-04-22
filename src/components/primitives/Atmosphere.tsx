type AtmosphereProps = {
  className?: string;
  grid?: boolean;
};

export function Atmosphere({ className = '', grid = true }: AtmosphereProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`.trim()}
    >
      {/* Orb A — accent, top-left */}
      <div
        className="orb-a absolute"
        style={{
          top: '-15%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle at center, rgb(from var(--c-accent) r g b / 0.12) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Orb B — accent-soft, bottom-right */}
      <div
        className="orb-b absolute"
        style={{
          bottom: '-20%',
          right: '-12%',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle at center, rgb(from var(--c-accent-soft) r g b / 0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      {grid ? <div className="blueprint-grid absolute inset-0 opacity-60" /> : null}
    </div>
  );
}
