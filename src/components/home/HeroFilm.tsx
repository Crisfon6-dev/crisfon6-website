'use client';

/* The film and poster are pre-optimized WebP/MP4 served from /public with versioned names,
   so Next's image optimizer would only re-encode them: plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from 'react';
import { useTheme } from 'next-themes';
import { chooseFilmMode, type FilmMode } from './heroFilmMode';
import { prefersReducedMotion, subscribeViewport } from './viewportEnv';
import {
  VEIL_MIN,
  filmProgressOver,
  filmTravelPx,
  heroShadeOpacity,
  progressToTime,
  veilOpacityOver,
} from './heroFilmLogic';
import { FILM_DURATION_SECONDS, heroFilmAssetsFor } from './heroFilmAssets';

function readMode(): FilmMode {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return chooseFilmMode({
    reducedMotion: prefersReducedMotion(),
    width: window.innerWidth,
    saveData: Boolean(connection?.saveData),
  });
}

/** `null` on the server and during hydration, so the first paint never guesses the mode. */
const getServerMode = (): FilmMode | null => null;

/** The pinned film: fixed behind the page, played by the scroll distance of the wrapper's content. */
function FilmBackdrop({ wrapperRef }: { wrapperRef: RefObject<HTMLElement | null> }) {
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef(0);
  const kickRef = useRef<() => void>(() => {});
  const [near, setNear] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete'
  );
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [veil, setVeil] = useState(VEIL_MIN);
  const [heroShade, setHeroShade] = useState(1);

  // Film assets wait for the page load, so the hero text paints first.
  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);

  // ... and for the wrapper to come within one viewport of the visible area.
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
  }, [wrapperRef]);

  // Page scroll -> film progress over the wrapper's measured height.
  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const travel = filmTravelPx(wrapperRef.current?.offsetHeight ?? 0, vh);
      progressRef.current = filmProgressOver(y, travel);
      setVeil(veilOpacityOver(y, vh, travel));
      setHeroShade(heroShadeOpacity(y, vh));
      kickRef.current();
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    // The content height changes after fonts and images load and when the language switches.
    const el = wrapperRef.current;
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && el ? new ResizeObserver(read) : null;
    if (el) resizeObserver?.observe(el);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      resizeObserver?.disconnect();
    };
  }, [wrapperRef]);

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

  return (
    <div
      data-testid="film-backdrop"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-warm-bg"
    >
      {active ? (
        <img
          src={assets.poster}
          alt=""
          aria-hidden="true"
          decoding="async"
          onLoad={() => setPosterLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <video
        ref={videoRef}
        src={posterLoaded ? assets.video : undefined}
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
      <div
        data-testid="film-hero-shade"
        className="absolute inset-0 bg-gradient-to-r from-warm-bg/90 via-warm-bg/45 to-transparent max-md:via-warm-bg/80 max-md:to-warm-bg/65 dark:from-warm-bg/95 dark:via-warm-bg/75"
        style={{ opacity: heroShade }}
      />
      <div
        data-testid="film-veil"
        className="absolute inset-0 bg-warm-bg"
        style={{ opacity: veil }}
      />
    </div>
  );
}

/** Small screens, reduced motion and data saver get no film: the first screen borrows the poster. */
function PosterBackdrop({ src }: { src: string }) {
  return (
    <div
      data-testid="film-poster-backdrop"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden"
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="h-full w-full object-cover opacity-45 dark:opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-warm-bg/70 via-transparent to-warm-bg" />
    </div>
  );
}

/**
 * Wraps the sections the footage plays behind. The sections render on the server and without
 * JavaScript; only the media is client-side. The backdrop slot comes first and the children keep
 * their position in every mode, so a mode change never remounts them.
 */
export function HeroFilm({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribeViewport, readMode, getServerMode);
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);
  const wrapperRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={wrapperRef}
      data-testid="hero-film"
      data-mode={mode ?? 'pending'}
      className="relative"
    >
      {mode === 'film' ? (
        <FilmBackdrop wrapperRef={wrapperRef} />
      ) : mode === 'stills' ? (
        <PosterBackdrop src={assets.poster} />
      ) : null}
      {children}
    </section>
  );
}
