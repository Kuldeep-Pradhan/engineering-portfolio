"use client";

import React, { useRef, useState } from "react";
import { ArrowDown, Shield, Layers, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionStyle } from "framer-motion";
import {
  useMounted,
  useReducedMotionSafe,
  ScrollLine,
  ScrollBeat,
} from "@/components/motion/ScrollReveal";

/**
 * Hero
 * ----
 * A tall scroll TRACK with a sticky holder, choreographed as a sequence of
 * BEATS rather than one static block of copy.
 *
 * The track (#top) also drives the scrub film in ScrubFilm.tsx: film time is
 * `-track.top / (track.height - viewportHeight)`. So the four acts of the film
 * and the beats below are two views of the same scroll position.
 *
 *   progress   film act        copy
 *   --------   -------------   -----------------------------------------------
 *   0.00       1 INGEST        eyebrow + headline land (on LOAD, not scroll)
 *   0.20-0.30                  eyebrow leaves
 *   0.24-0.38  2 FRACTURE      headline lines exit sideways: left, right, left
 *   0.40-0.50  3 ROUTE         sub-headline + capability badges arrive
 *   0.62-0.72                  they lift away
 *   0.74-1.00  4 CORE          film finishes alone, CTA returns
 *
 * Things worth not breaking:
 *
 *  - The track must NOT get `overflow: hidden`. On an ancestor of a sticky
 *    element that creates a scroll container and the pin silently stops
 *    working. Use `clip` if you ever need it.
 *  - Every beat must finish before 0.79, which is where the holder unpins
 *    ((480vh - 100vh) / 480vh). Anything still visible then slides away with
 *    the section instead of leaving on its own terms.
 *  - The two message beats are STACKED in one grid cell so the sub-headline
 *    lands in the slot the headline vacated. Under reduced motion that becomes
 *    a plain column, because stacking would overlap when nothing fades.
 */
export default function Hero() {
  // SSR-safe variant. The raw framer-motion hook disagrees with the server on
  // the first client render, which fails hydration for anyone who actually has
  // prefers-reduced-motion set.
  const reduceMotion = useReducedMotionSafe();
  const mounted = useMounted();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /**
   * The CTA has a bespoke two-window curve — present on load, gone while the
   * copy swaps, back for the finale — so it is done inline rather than with
   * ScrollBeat, which models a single in/out window.
   */
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.18, 0.26, 0.66, 0.74], [1, 1, 0, 0, 1]);
  const ctaY = useTransform(scrollYProgress, [0, 0.18, 0.26, 0.66, 0.74], [0, 0, 20, 20, 0]);

  // An invisible button must not stay clickable. This is a CLASS toggle, not a
  // pointerEvents MotionValue in `style` — framer-motion binds style
  // MotionValues to WAAPI animations, and interpolating "auto" -> "none" throws
  // "Offsets must be monotonically non-decreasing" and takes the tree down.
  const [ctaHittable, setCtaHittable] = useState(true);
  useMotionValueEvent(ctaOpacity, "change", (o) => {
    const next = o >= 0.05;
    setCtaHittable((prev) => (prev === next ? prev : next));
  });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const bind = !reduceMotion && mounted;

  /** Load-in for the elements that are present at progress 0. */
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 20 },
    },
  };

  /* Stacked when animated, plain column when not. */
  const stageClass = reduceMotion
    ? "flex w-full flex-col items-center gap-8"
    : "grid w-full place-items-center";
  const slotClass = reduceMotion ? "w-full" : "col-start-1 row-start-1 w-full";

  return (
    <section
      ref={sectionRef}
      id="top"
      // hero-track collapses to one viewport under prefers-reduced-motion —
      // without the film moving, 480vh would just be a long empty scroll.
      className="hero-track relative h-[240vh] md:h-[480vh]"
    >
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* ---------- stacked message beats ---------- */}
            <div className={stageClass}>
              {/* BEAT 1 — eyebrow + headline */}
              {/* BEAT 1 — eyebrow + headline. No inRange: it is already fully
                  visible at progress 0 and only ever leaves. (A negative
                  inRange to fake that is a trap — see ScrollBeat's docs.) */}
              <ScrollBeat
                progress={scrollYProgress}
                outRange={[0.2, 0.3]}
                className={slotClass}
                dataBeat="headline"
              >
                <motion.div
                  variants={item}
                  initial="hidden"
                  animate="show"
                  className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#E8B54D]/30 bg-[#E8B54D]/10 px-4 py-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8B54D] animate-pulse" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E8B54D]">
                    SC.01 · HIGH-SCALE FINTECH &amp; DISTRIBUTED SYSTEMS
                  </span>
                </motion.div>

                {/*
                  Three explicit lines so each can leave in its own direction.
                  Still one <h1> and one sentence, so nothing changes for SEO.
                */}
                <h1 className="film-type text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
                  <ScrollLine
                    progress={scrollYProgress}
                    exitRange={[0.24, 0.34]}
                    exitX={-340}
                    delay={0.05}
                  >
                    Architecting <span className="text-gold-gradient">high-throughput</span>
                  </ScrollLine>
                  <ScrollLine
                    progress={scrollYProgress}
                    exitRange={[0.26, 0.36]}
                    exitX={340}
                    delay={0.14}
                  >
                    microservices &amp; resilient
                  </ScrollLine>
                  <ScrollLine
                    progress={scrollYProgress}
                    exitRange={[0.28, 0.38]}
                    exitX={-340}
                    delay={0.23}
                  >
                    fintech platforms.
                  </ScrollLine>
                </h1>
              </ScrollBeat>

              {/* BEAT 2 — sub-headline + capability badges */}
              <ScrollBeat
                progress={scrollYProgress}
                inRange={[0.4, 0.5]}
                outRange={[0.62, 0.72]}
                className={slotClass}
                dataBeat="sub"
              >
                <p className="film-type mx-auto mb-10 max-w-3xl text-base font-normal leading-relaxed text-[#8E939F] sm:text-xl">
                  Full Stack Engineer with{" "}
                  <strong className="font-semibold text-neutral-200">4+ years</strong> of experience
                  specializing in <span className="text-neutral-100">Node.js microservices</span>{" "}
                  serving <span className="font-mono text-[#E8B54D]">2,500+ TPS</span>,
                  RBI-compliant OTP/TOTP authentication, and enterprise{" "}
                  <span className="text-neutral-100">React/Next.js</span> dashboards for tier-1
                  banking workflows.
                </p>

                {/* No backdrop-blur here on purpose — blur over the moving film
                    halved the frame rate. See the note in globals.css. */}
                <div className="flex flex-wrap justify-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.07] px-3 py-1 font-mono text-xs text-neutral-300">
                    <Shield className="h-3.5 w-3.5 text-[#4FD188]" />
                    RBI-Compliant RFC 6238
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.07] px-3 py-1 font-mono text-xs text-neutral-300">
                    <Layers className="h-3.5 w-3.5 text-[#8fc0ff]" />
                    GCP &amp; AWS ECS Fargate
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.07] px-3 py-1 font-mono text-xs text-neutral-300">
                    <Sparkles className="h-3.5 w-3.5 text-[#E8B54D]" />
                    React / Next.js Batch Topper
                  </span>
                </div>
              </ScrollBeat>
            </div>

            {/* ---------- CTA, in its own row below the swapping copy ---------- */}
            <motion.div
              className={`mt-12 flex flex-wrap items-center justify-center gap-4${
                bind ? " beat-fade" : ""
              }${bind && !ctaHittable ? " pointer-events-none" : ""}`}
              data-beat="cta"
              style={bind ? ({ y: ctaY, "--beat-opacity": ctaOpacity } as MotionStyle) : undefined}
            >
              <motion.a
                variants={item}
                initial="hidden"
                animate="show"
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E8B54D] px-7 py-3.5 font-mono text-sm font-bold text-[#08090C] shadow-[0_0_30px_rgba(232,181,77,0.3)] transition-all hover:bg-[#F5C86C] active:scale-95"
              >
                Explore 6 Case Files
                <ArrowDown className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue — fades out as you begin scrolling */}
        {!reduceMotion && (
          <motion.div
            style={mounted ? { opacity: cueOpacity } : undefined}
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#565C6B]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-gradient-to-b from-[#E8B54D]/60 to-transparent"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
