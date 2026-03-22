import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.frontmatter.title ?? "Blog Post";
  const tag = post?.frontmatter.tag ?? "";
  const date = post?.frontmatter.date ?? "";
  const readTime = post?.frontmatter.readTime ?? "";

  return new ImageResponse(
    <div
      style={{
        background: "#0b1120",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
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

      {/* Top section: tag + metadata */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#22c55e",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "monospace",
          }}
        >
          {tag}
        </div>
        {date && (
          <>
            <div style={{ fontSize: 16, color: "#475569" }}>·</div>
            <div
              style={{
                fontSize: 16,
                color: "#64748b",
                fontFamily: "monospace",
              }}
            >
              {date}
            </div>
          </>
        )}
        {readTime && (
          <>
            <div style={{ fontSize: 16, color: "#475569" }}>·</div>
            <div
              style={{
                fontSize: 16,
                color: "#64748b",
                fontFamily: "monospace",
              }}
            >
              {readTime}
            </div>
          </>
        )}
      </div>

      {/* Middle section: title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
      </div>

      {/* Bottom section: author + brand */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#34d399",
            }}
          />
          <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 500 }}>
            Cristhian Fonseca
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 18, color: "#6d9fff", fontWeight: 600 }}>
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
      </div>
    </div>,
    { ...size },
  );
}
