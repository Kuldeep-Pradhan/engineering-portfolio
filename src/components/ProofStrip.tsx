"use client";

import React from "react";
import { Trophy, Medal, Activity, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/ScrollReveal";

/**
 * ProofStrip — surfaces the recognitions that are otherwise buried inside the
 * experience timeline: Batch Topper, Employee of the Month, and a production
 * availability number. Sits between Experience and Contact.
 */
const items: { icon: LucideIcon; title: string; source: string; detail: string }[] = [
  {
    icon: Trophy,
    title: "Batch Topper",
    source: "iServeu React / Next.js Academy",
    detail: "Top score in cohort — built a full-featured SSR application.",
  },
  {
    icon: Medal,
    title: "Employee of the Month ×2",
    source: "MAGTAPP Technology",
    detail: "January & February 2023 — outstanding productivity & delivery.",
  },
  {
    icon: Activity,
    title: "99.99% Availability",
    source: "Production Banking Systems",
    detail: "Maintained through critical banking settlement windows.",
  },
];

export default function ProofStrip() {
  return (
    <section className="relative py-16 scroll-mt-24" aria-label="Recognitions and proof">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="rounded-3xl border border-[#E8B54D]/20 bg-gradient-to-r from-[#E8B54D]/10 via-[#0E1015] to-transparent p-8 sm:p-10">
          <div className="mb-7 flex items-center gap-2 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8B54D]" />
            SC.06 · RECOGNITIONS &amp; PROOF
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal
                  key={i}
                  delay={i * 0.1}
                  className="flex items-start gap-4 p-5 rounded-2xl glass-card border border-white/5"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#E8B54D]/15 border border-[#E8B54D]/30 flex items-center justify-center text-[#E8B54D]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-white">{it.title}</div>
                    <div className="font-mono text-[11px] text-[#E8B54D] mb-1.5">{it.source}</div>
                    <p className="text-xs text-[#8E939F] leading-relaxed">{it.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
