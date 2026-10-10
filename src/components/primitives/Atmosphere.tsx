type AtmosphereProps = {
  className?: string;
  grid?: boolean;
  'data-print-hide'?: boolean;
};

export function Atmosphere({ className = '', grid = true, ...rest }: AtmosphereProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`.trim()}
      {...rest}
    >
      {grid ? <div className="blueprint-grid absolute inset-0 opacity-60" /> : null}
    </div>
  );
}
