import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cristhian Fonseca — Technical Lead & AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0b1120",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Blueprint grid dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(109,159,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Green dot */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#34d399",
          marginBottom: 24,
        }}
      />

      {/* Name */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#f1f5f9",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        Cristhian Fonseca
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 28,
          color: "#94a3b8",
          lineHeight: 1.4,
          marginBottom: 32,
        }}
      >
        Technical Lead & AI Builder
      </div>

      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#6d9fff",
            fontWeight: 600,
          }}
        >
          PowerAI
        </div>
        <div style={{ fontSize: 18, color: "#475569" }}>·</div>
        <div
          style={{
            fontSize: 18,
            color: "#475569",
            fontFamily: "monospace",
          }}
        >
          crisfon6.com
        </div>
      </div>
    </div>,
    { ...size },
  );
}
