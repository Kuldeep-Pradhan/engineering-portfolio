"use client";

import React from "react";
import { ArrowDown, Terminal, Shield, Zap, Layers, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Monospace Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E8B54D]/10 border border-[#E8B54D]/30 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D] animate-pulse" />
            <span className="font-mono text-xs text-[#E8B54D] uppercase tracking-wider font-semibold">
              SC.01 · HIGH-SCALE FINTECH &amp; DISTRIBUTED SYSTEMS
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.08]">
            Architecting <span className="text-gold-gradient">high-throughput</span>{" "}
            microservices &amp; resilient fintech platforms.
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl text-[#8E939F] leading-relaxed max-w-3xl mb-10 font-normal">
            Full Stack Engineer with <strong className="text-neutral-200 font-semibold">4+ years</strong> of experience specializing in{" "}
            <span className="text-neutral-100">Node.js microservices</span> serving{" "}
            <span className="text-[#E8B54D] font-mono">2,500+ TPS</span>, RBI-compliant OTP/TOTP authentication, and enterprise{" "}
            <span className="text-neutral-100">React/Next.js</span> dashboards for tier-1 banking workflows.
          </p>

          {/* Capability Badges Row */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
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
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono text-sm font-bold bg-[#E8B54D] text-[#08090C] hover:bg-[#F5C86C] active:scale-95 transition-all shadow-[0_0_30px_rgba(232,181,77,0.3)]"
            >
              Explore 6 Case Files
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
