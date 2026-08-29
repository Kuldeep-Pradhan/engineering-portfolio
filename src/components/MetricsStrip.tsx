"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Zap, Users, ShieldCheck, TrendingDown } from "lucide-react";
import { animate, useInView } from "framer-motion";
import { Stagger, StaggerItem, useReducedMotionSafe } from "@/components/motion/ScrollReveal";

/** Split a metric string into "2,500+" -> { prefix:"", number:2500, suffix:"+" }. */
function parseMetric(value: string) {
  const m = value.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
  if (!m) return { prefix: "", number: 0, suffix: value };
  return { prefix: m[1], number: parseInt(m[2].replace(/,/g, ""), 10), suffix: m[3] };
}

/**
 * Animated metric number. Counts 0 -> target once when the strip scrolls into
 * view. Reduced-motion visitors get the static value with no animation.
 */
function MetricValue({ value, delay }: { value: string; delay: number }) {
  const reduceMotion = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = useMemo(() => parseMetric(value), [value]);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduceMotion || !inView || started.current) return;
    started.current = true;
    const controls = animate(0, parsed.number, {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, parsed, value, delay]);

  const display = reduceMotion
    ? value
    : `${parsed.prefix}${n.toLocaleString("en-US")}${parsed.suffix}`;

  return (
    <span
      ref={ref}
      className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums"
    >
      {display}
    </span>
  );
}

export default function MetricsStrip() {

  const metrics = [
    {
      value: "5+",
      unit: "Banks",
      label: "Client & Merchant Onboarding",
      subtext: "KYC validation, Auth & Notification partners",
      icon: ShieldCheck,
      color: "#E8B54D",
    },
    {
      value: "300K+",
      unit: "Users",
      label: "Onboarded per Partner",
      subtext: "KYC state machines · Aadhaar / PAN",
      icon: Users,
      color: "#8fc0ff",
    },
    {
      value: "18ms",
      unit: "OTP",
      label: "Stateless Verification",
      subtext: "RFC 6238 HMAC · zero DB I/O",
      icon: Zap,
      color: "#4FD188",
    },
    {
      value: "60%",
      unit: "Faster",
      label: "OTP Auth Latency",
      subtext: "Stateless TOTP enables horizontal auto-scaling",
      icon: TrendingDown,
      color: "#4FD188",
    },
  ];

  return (
    <section className="py-12 border-y border-[#2D3139]/60 bg-[#0E1015]/40 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          stagger={0.1}
        >
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <StaggerItem
                key={idx}
                className="p-6 rounded-2xl glass-card border border-white/5 hover:border-[#E8B54D]/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#8E939F] uppercase tracking-wider">
                    0{idx + 1} · Metric
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#E8B54D] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <MetricValue value={m.value} delay={idx * 0.12} />
                  <span className="font-mono text-sm font-semibold text-[#E8B54D]">
                    {m.unit}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-neutral-200 mb-1">
                  {m.label}
                </h3>
                <p className="text-xs text-[#8E939F] font-normal">
                  {m.subtext}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
