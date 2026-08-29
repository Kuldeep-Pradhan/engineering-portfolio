"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent, useMotionValue, MotionValue } from "framer-motion";
import { useReducedMotionSafe, useMounted } from "@/components/motion/ScrollReveal";

const FILM_SECONDS = 15.13;

/**
 * Whether this visitor should get the animated film at all. Serves a still
 * poster (zero video bytes) for: prefers-reduced-motion, viewports under
 * 640px (sidesteps phones — most iOS Safari scripted `currentTime` seeking is
 * unreliable), Data Saver / slow effectiveType, and low deviceMemory.
 *
 * Returns false during SSR and the first client render so the server markup
 * matches; eligibility is computed on the post-mount render instead. useMounted
 * flips to true after mount and forces a re-render, so the value never depends
 * on an effect calling setState (react-hooks/set-state-in-effect).
 */
function useFilmEligible(reduceMotion: boolean) {
  const mounted = useMounted();
  if (reduceMotion || !mounted) return false;

  const viewportOk = window.innerWidth >= 640;
  return viewportOk;
}

export default function ScrubFilm({ trackId = "top" }: { trackId?: string }) {
  const reduceMotion = useReducedMotionSafe();
  const filmEligible = useFilmEligible(reduceMotion);
  const filmActive = !reduceMotion && filmEligible;
  const fwdRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  const progress = useMotionValue(0);

  // Hide the poster once the video has data ready. Runs again when the film
  // activates after mount (the video element is only mounted then).
  useEffect(() => {
    const fwdEl = fwdRef.current;
    if (!fwdEl) return;

    const hidePoster = () => {
      if (posterRef.current) posterRef.current.style.opacity = "0";
    };

    if (fwdEl.readyState >= 2) hidePoster();
    else fwdEl.addEventListener("loadeddata", hidePoster, { once: true });

    return () => fwdEl.removeEventListener("loadeddata", hidePoster);
  }, [filmActive]);

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

      {filmActive && (
        <>
          <video
            ref={fwdRef}
            src="/film/hero-fwd.mp4?v=4"
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 1 }}
          />
          <ScrubLogic fwdRef={fwdRef} trackId={trackId} layerRef={layerRef} progress={progress} />
        </>
      )}
    </div>
  );
}

function ScrubLogic({ 
  fwdRef, 
  trackId, 
  layerRef,
  progress
}: { 
  fwdRef: React.RefObject<HTMLVideoElement | null>; 
  trackId: string; 
  layerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
}) {
  const { scrollY } = useScroll();
  const targetRef = useRef(0);
  const busyRef = useRef(false);

  // Sync scroll with targetTime WITHOUT setting currentTime synchronously
  useMotionValueEvent(scrollY, "change", () => {
    const track = document.getElementById(trackId);
    if (!track || !fwdRef.current || !layerRef.current) return;
    
    const vh = window.innerHeight;
    const travel = Math.max(1, track.offsetHeight - vh);
    const top = track.getBoundingClientRect().top;
    
    const p = Math.max(0, Math.min(1, -top / travel));
    progress.set(p); 
    
    const duration = Number.isFinite(fwdRef.current.duration) && fwdRef.current.duration > 0 ? fwdRef.current.duration : FILM_SECONDS;
    targetRef.current = p * duration;
    
    const past = -top - travel;
    const fade = past <= 0 ? 1 : 1 - Math.max(0, Math.min(1, past / (vh * 0.5)));
    layerRef.current.style.opacity = fade.toFixed(3);
  });

  // Dedicated unblocked rAF loop for seeking
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
