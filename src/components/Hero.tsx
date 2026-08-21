"use client";

import React, { useRef } from "react";
import { ArrowDown, Shield, Layers, Sparkles } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useMounted } from "@/components/motion/ScrollReveal";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked cinematic exit: as the hero scrolls away, its content
  // drifts up, fades, and gently scales down — mirroring lv8tech.ai.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Only apply scroll-driven styles after mount so SSR HTML matches the
  // first client render (prevents a hydration mismatch on inline style).
  const scrollStyle = reduceMotion || !mounted ? undefined : { y, opacity, scale };


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 20 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
          style={scrollStyle}
        >

          {/* Monospace Eyebrow Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E8B54D]/10 border border-[#E8B54D]/30 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D] animate-pulse" />
            <span className="font-mono text-xs text-[#E8B54D] uppercase tracking-wider font-semibold">
              SC.01 · HIGH-SCALE FINTECH &amp; DISTRIBUTED SYSTEMS
            </span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1 variants={item} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.08]">
            Architecting <span className="text-gold-gradient">high-throughput</span>{" "}
            microservices &amp; resilient fintech platforms.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={item} className="text-base sm:text-xl text-[#8E939F] leading-relaxed max-w-3xl mb-10 font-normal">
            Full Stack Engineer with <strong className="text-neutral-200 font-semibold">4+ years</strong> of experience specializing in{" "}
            <span className="text-neutral-100">Node.js microservices</span> serving{" "}
            <span className="text-[#E8B54D] font-mono">2,500+ TPS</span>, RBI-compliant OTP/TOTP authentication, and enterprise{" "}
            <span className="text-neutral-100">React/Next.js</span> dashboards for tier-1 banking workflows.
          </motion.p>

          {/* Capability Badges Row */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2.5 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
              <Shield className="w-3.5 h-3.5 text-[#4FD188]" />
              RBI-Compliant RFC 6238
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
              <Layers className="w-3.5 h-3.5 text-[#8fc0ff]" />
              GCP &amp; AWS ECS Fargate
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-[#E8B54D]" />
              React / Next.js Batch Topper
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono text-sm font-bold bg-[#E8B54D] text-[#08090C] hover:bg-[#F5C86C] active:scale-95 transition-all shadow-[0_0_30px_rgba(232,181,77,0.3)]"
            >
              Explore 6 Case Files
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — fades out as you begin scrolling */}
      {!reduceMotion && (
        <motion.div
          style={mounted ? { opacity } : undefined}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#565C6B]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#E8B54D]/60 to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
