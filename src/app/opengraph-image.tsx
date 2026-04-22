import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Cristhian Fonseca — AI Systems Engineer · LATAM';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#0e0e0c';
const BG_ELEV = '#171714';
const FG = '#f5f4ef';
const FG_MUTED = '#a8a69f';
const FG_FAINT = '#6b6a64';
const BORDER = '#262623';
const ACCENT = '#d97757';
const ACCENT_SOFT = '#f4c9b8';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        position: 'relative',
        fontFamily: 'Geist, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          left: '-140px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${ACCENT}40 0%, transparent 65%)`,
          filter: 'blur(40px)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-240px',
          right: '-160px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${ACCENT_SOFT}2E 0%, transparent 65%)`,
          filter: 'blur(40px)',
          display: 'flex',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontFamily: 'Geist Mono, ui-monospace, monospace',
          fontSize: 18,
          letterSpacing: '0.16em',
          color: FG_MUTED,
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: ACCENT,
            boxShadow: `0 0 16px ${ACCENT}`,
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex' }}>AI Systems Engineer · LATAM</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            fontSize: 200,
            fontWeight: 700,
            letterSpacing: '-0.055em',
            lineHeight: 0.88,
            color: FG,
          }}
        >
          <div style={{ display: 'flex' }}>crisfon</div>
          <div
            style={{
              display: 'flex',
              backgroundImage: `linear-gradient(135deg, ${ACCENT_SOFT} 0%, ${ACCENT} 100%)`,
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            6
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: FG_MUTED,
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          I build AI systems that run in production.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          paddingTop: 24,
          borderTop: `1px solid ${BORDER}`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 18px',
            borderRadius: 999,
            background: BG_ELEV,
            border: `1px solid ${BORDER}`,
            fontSize: 18,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: ACCENT,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <div style={{ display: 'flex', fontWeight: 600, color: FG }}>Anthropic Certified</div>
            <div
              style={{
                display: 'flex',
                fontSize: 13,
                color: FG_FAINT,
                fontFamily: 'Geist Mono, ui-monospace, monospace',
              }}
            >
              AI Engineering
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 18,
            color: FG_FAINT,
            fontFamily: 'Geist Mono, ui-monospace, monospace',
          }}
        >
          crisfon6.com
        </div>
      </div>
    </div>,
    { ...size }
  );
}
