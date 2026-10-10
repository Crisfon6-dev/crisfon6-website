'use client';

/* The film and stills are pre-optimized WebP/MP4 served from /public with versioned names,
   so Next's image optimizer would only re-encode them: plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { chooseFilmMode, type FilmMode } from './heroFilmMode';
import { prefersReducedMotion, subscribeViewport } from './viewportEnv';
import {
  VEIL_MIN,
  filmProgress,
  heroShadeOpacity,
  plateOpacity,
  progressToTime,
  veilOpacity,
} from './heroFilmLogic';
import { ChapterPlate } from './ChapterPlate';
import { chapterProgress } from './chapterBeats';
import { HOME_CHAPTERS, activeChapter } from './homeChapters';
import {
  FILM_DURATION_SECONDS,
  FILM_FRAME,
  FILM_TRAVEL_VH,
  heroFilmAssetsFor,
} from './heroFilmAssets';

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
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);
  const imageFor = (id: string) =>
    id === 'blueprint' ? assets.poster : assets.stills.find((still) => still.id === id)!.src;
  return (
    <ol className="mx-auto grid max-w-6xl gap-sp-7 px-sp-5 py-sp-8 md:grid-cols-2">
      {HOME_CHAPTERS.map((chapter) => (
        <li key={chapter.id} className="flex flex-col gap-sp-4">
          <FrameImage src={imageFor(chapter.id)} />
          <ChapterPlate chapter={chapter} testId={`chapter-${chapter.id}`} />
        </li>
      ))}
    </ol>
  );
}

function FilmStage() {
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);
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
  const [veil, setVeil] = useState(VEIL_MIN);
  const [heroShade, setHeroShade] = useState(1);
  const [plate, setPlate] = useState(0);

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

  // Page scroll -> progress (state for overlays and veil, ref for the easing loop).
  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const next = filmProgress(y, vh, FILM_TRAVEL_VH);
      progressRef.current = next;
      setProgress(next);
      setVeil(veilOpacity(y, vh, FILM_TRAVEL_VH));
      setHeroShade(heroShadeOpacity(y, vh));
      setPlate(plateOpacity(y, vh, FILM_TRAVEL_VH));
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
  const chapter = activeChapter(progress);

  return (
    <section
      ref={wrapperRef}
      data-testid="hero-film"
      data-mode="film"
      style={{ height: `${FILM_TRAVEL_VH * 100}vh` }}
    >
      {/* The film is the page's surface: fixed behind everything, content scrolls over it. */}
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
      {/* The same story for assistive tech at any scroll position: the visual panel below only
          exists while the film is on screen. Case links live in the sections that follow. */}
      <ol data-testid="film-chapters-sr" className="sr-only">
        {HOME_CHAPTERS.map((item) => (
          <li key={item.id}>
            <ChapterPlate chapter={item} testId={`sr-chapter-${item.id}`} showLink={false} />
          </li>
        ))}
      </ol>
      {plate > 0 ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-sp-7 z-10 [@media(max-height:760px)]:bottom-sp-4"
          style={{ opacity: plate }}
        >
          <div
            className={`mx-auto flex max-w-6xl px-sp-5 ${
              HOME_CHAPTERS.indexOf(chapter) % 2 === 1 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`${plate < 0.3 ? 'pointer-events-none' : 'pointer-events-auto'} w-full max-w-xl`}
            >
              <ChapterPlate
                key={chapter.id}
                chapter={chapter}
                testId="film-chapter"
                localProgress={chapterProgress(progress, chapter)}
                compact
                linkFocusable={false}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function HeroFilm() {
  const mode = useSyncExternalStore(subscribeViewport, readMode, getServerMode);
  const { resolvedTheme } = useTheme();
  const assets = heroFilmAssetsFor(resolvedTheme);

  if (mode === 'film') return <FilmStage />;
  if (mode === 'stills') {
    return (
      <section data-testid="hero-film" data-mode="stills">
        {/* Small screens and reduced motion get no film, so the first screen borrows its poster. */}
        <div
          data-testid="film-poster-backdrop"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden"
        >
          <img
            src={assets.poster}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="h-full w-full object-cover opacity-45 dark:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-bg/70 via-transparent to-warm-bg" />
        </div>
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
