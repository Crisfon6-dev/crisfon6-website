'use client';

/* The film and stills are pre-optimized WebP/MP4 served from /public with versioned names,
   so Next's image optimizer would only re-encode them: plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { chooseFilmMode, type FilmMode } from './heroFilmMode';
import { activeOverlay, progressToTime, scrollProgress } from './heroFilmLogic';
import { HERO_FILM_OVERLAYS, overlayText } from './heroFilmOverlays';
import {
  FILM_DURATION_SECONDS,
  FILM_FRAME,
  FILM_TRAVEL_VH,
  HERO_FILM_ASSETS,
} from './heroFilmAssets';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function readMode(): FilmMode {
  const reducedMotion =
    typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return chooseFilmMode({
    reducedMotion,
    width: window.innerWidth,
    saveData: Boolean(connection?.saveData),
  });
}

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  const query = typeof window.matchMedia === 'function' ? window.matchMedia(REDUCED_MOTION) : null;
  query?.addEventListener?.('change', onChange);
  return () => {
    window.removeEventListener('resize', onChange);
    query?.removeEventListener?.('change', onChange);
  };
}

/** `null` on the server and during hydration, so the first paint never guesses the mode. */
const getServerMode = (): FilmMode | null => null;

function FrameImage({ src, lazy = true }: { src: string; lazy?: boolean }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={FILM_FRAME.width}
      height={FILM_FRAME.height}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      className="h-auto w-full rounded-sp-lg border border-warm-border"
    />
  );
}

function StillsGrid() {
  const { locale } = useLanguage();
  return (
    <ul className="mx-auto grid max-w-6xl gap-sp-5 px-sp-5 py-sp-8 sm:grid-cols-2">
      <li>
        <figure>
          <FrameImage src={HERO_FILM_ASSETS.poster} />
        </figure>
      </li>
      {HERO_FILM_ASSETS.stills.map((still) => {
        const { value, label } = overlayText(
          { factIndex: still.factIndex, from: 0, to: 1 },
          locale
        );
        return (
          <li key={still.id}>
            <figure>
              <FrameImage src={still.src} />
              <figcaption data-testid={`still-caption-${still.id}`} className="mt-sp-3">
                <span className="metric-value text-warm-fg" style={{ fontSize: '28px' }}>
                  {value}
                </span>
                <span className="ml-sp-3 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
                  {label}
                </span>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

function FilmStage() {
  const { locale } = useLanguage();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef(0);
  const kickRef = useRef<() => void>(() => {});
  const [near, setNear] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete'
  );
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Film assets wait for the page load, so the hero text paints first.
  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);

  // ... and for the stage to come within one viewport of the visible area.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px 100% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll position -> progress (state for overlays, ref for the easing loop).
  useEffect(() => {
    const read = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = scrollProgress(rect.top, rect.height, window.innerHeight);
      progressRef.current = next;
      setProgress(next);
      kickRef.current();
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  // Ease video.currentTime toward the scroll target; stops itself once settled.
  useEffect(() => {
    if (!posterLoaded) return;
    const video = videoRef.current;
    if (!video) return;
    let frame = 0;
    let running = false;
    let current = 0;
    const tick = () => {
      const duration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : FILM_DURATION_SECONDS;
      const target = progressToTime(progressRef.current, duration);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.002) current = target;
      if (video.readyState >= 2 && Math.abs(video.currentTime - current) > 0.004) {
        video.currentTime = current;
      }
      if (current === target) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    kickRef.current = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    kickRef.current();
    return () => {
      cancelAnimationFrame(frame);
      kickRef.current = () => {};
    };
  }, [posterLoaded]);

  const active = near && pageLoaded;
  const overlay = activeOverlay(progress, HERO_FILM_OVERLAYS);
  const text = overlay ? overlayText(overlay, locale) : null;

  return (
    <section
      ref={wrapperRef}
      data-testid="hero-film"
      data-mode="film"
      style={{ height: `${(1 + FILM_TRAVEL_VH) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-warm-bg">
        {active ? (
          <img
            src={HERO_FILM_ASSETS.poster}
            alt=""
            aria-hidden="true"
            decoding="async"
            onLoad={() => setPosterLoaded(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <video
          ref={videoRef}
          src={posterLoaded ? HERO_FILM_ASSETS.video : undefined}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {text ? (
          <div
            data-testid="film-overlay"
            className="absolute bottom-sp-7 left-sp-5 max-w-sm rounded-sp-lg border border-warm-border bg-warm-bg/90 px-sp-5 py-sp-4 backdrop-blur-sm sm:left-sp-8"
          >
            <p className="metric-value text-warm-fg" style={{ fontSize: '40px' }}>
              {text.value}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
              {text.label}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function HeroFilm() {
  const mode = useSyncExternalStore(subscribe, readMode, getServerMode);

  if (mode === 'film') return <FilmStage />;
  if (mode === 'stills') {
    return (
      <section data-testid="hero-film" data-mode="stills">
        <StillsGrid />
      </section>
    );
  }
  // Pending (server render, hydration, no JS): no media requested; no-JS visitors get the stills.
  return (
    <section data-testid="hero-film" data-mode="pending" className="min-h-[40vh]">
      <noscript>
        <StillsGrid />
      </noscript>
    </section>
  );
}
