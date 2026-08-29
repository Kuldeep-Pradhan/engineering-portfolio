"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent, useMotionValue, MotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe, useMounted } from "@/components/motion/ScrollReveal";
import { useAppStore } from "@/store/useAppStore";

const FILM_SECONDS = 15.13;

type Tier = "desktop" | "tablet" | "phone" | "poster";

/**
 * Determine which rendering tier to use based on device capabilities.
 * - Desktop (≥1024px, ≥4 cores): MP4 video scrubbing
 * - Tablet (768–1023px): Canvas frame sequence (720p WebP, 121 frames)
 * - Phone  (<768px):     Canvas frame sequence (480p WebP, 76 frames)
 * - Data Saver / low memory / reduced motion: static poster only
 */
function useRenderTier(reduceMotion: boolean): Tier {
  const mounted = useMounted();
  if (!mounted || reduceMotion) return "poster";

  // Check for Data Saver / Save-Data
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "poster";

  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 2;

  if (w >= 1024 && cores >= 4) return "desktop";
  if (w >= 768) return "tablet";
  return "phone";
}

/* ─── Main component ─────────────────────────────────────────── */
export default function ScrubFilm({ trackId = "top" }: { trackId?: string }) {
  const reduceMotion = useReducedMotionSafe();
  const tier = useRenderTier(reduceMotion);
  const layerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const progress = useMotionValue(0);

  return (
    <div
      ref={layerRef}
      className="film-layer film-grade fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        src="/film/hero-poster.jpg?v=3"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        draggable={false}
      />

      {(tier === "desktop" || tier === "tablet" || tier === "phone") && (
        <VideoScrub
          src={tier === "desktop" ? "/film/hero-fwd.mp4?v=5" : "/film/hero-mobile.mp4?v=1"}
          trackId={trackId}
          layerRef={layerRef}
          posterRef={posterRef}
          progress={progress}
        />
      )}

      {/* poster-only tier: nothing extra to mount */}
    </div>
  );
}

/* ─── MP4 video scrubbing ─────────── */
function VideoScrub({
  src,
  trackId,
  layerRef,
  posterRef,
  progress,
}: {
  src: string;
  trackId: string;
  layerRef: React.RefObject<HTMLDivElement | null>;
  posterRef: React.RefObject<HTMLImageElement | null>;
  progress: MotionValue<number>;
}) {
  const fwdRef = useRef<HTMLVideoElement>(null);

  // Hide poster once video is ready and trigger global loader
  useEffect(() => {
    const fwdEl = fwdRef.current;
    if (!fwdEl) return;

    const hidePosterAndReady = () => {
      if (posterRef.current) posterRef.current.style.opacity = "0";
      useAppStore.getState().setVideoReady(true);
    };

    if (fwdEl.readyState >= 3) hidePosterAndReady();
    else fwdEl.addEventListener("canplaythrough", hidePosterAndReady, { once: true });

    return () => fwdEl.removeEventListener("canplaythrough", hidePosterAndReady);
  }, [posterRef]);

  return (
    <>
      <video
        ref={fwdRef}
        src={src}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 1 }}
      />
      <VideoScrubLogic
        fwdRef={fwdRef}
        trackId={trackId}
        layerRef={layerRef}
        progress={progress}
      />
    </>
  );
}

function VideoScrubLogic({
  fwdRef,
  trackId,
  layerRef,
  progress,
}: {
  fwdRef: React.RefObject<HTMLVideoElement | null>;
  trackId: string;
  layerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
}) {
  const { scrollY } = useScroll();
  const targetRef = useRef(0);
  const busyRef = useRef(false);

  // Instead of jumping directly to scroll progress, we smooth it for fluid scrubbing
  const smoothProgress = useSpring(progress, {
    stiffness: 200,
    damping: 35,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", () => {
    const track = document.getElementById(trackId);
    if (!track || !fwdRef.current || !layerRef.current) return;

    const vh = window.innerHeight;
    const travel = Math.max(1, track.offsetHeight - vh);
    const top = track.getBoundingClientRect().top;

    const p = Math.max(0, Math.min(1, -top / travel));
    progress.set(p);

    const past = -top - travel;
    const fade = past <= 0 ? 1 : 1 - Math.max(0, Math.min(1, past / (vh * 0.5)));
    layerRef.current.style.opacity = fade.toFixed(3);
  });

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const duration =
      Number.isFinite(fwdRef.current?.duration) && (fwdRef.current?.duration ?? 0) > 0
        ? fwdRef.current!.duration
        : FILM_SECONDS;
    targetRef.current = p * duration;
  });

  useEffect(() => {
    const fwdEl = fwdRef.current;
    if (!fwdEl) return;

    let rafId: number;

    const onSeeked = () => {
      busyRef.current = false;
    };
    fwdEl.addEventListener("seeked", onSeeked);

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      if (!fwdEl.currentSrc) return;
      if (busyRef.current) return;

      const target = targetRef.current;
      if (Math.abs(fwdEl.currentTime - target) > 0.02) {
        busyRef.current = true;
        try {
          fwdEl.currentTime = target;
        } catch {
          busyRef.current = false;
        }
      }
    };

    loop();
    return () => {
      cancelAnimationFrame(rafId);
      fwdEl.removeEventListener("seeked", onSeeked);
    };
  }, [fwdRef]);

  return null;
}

