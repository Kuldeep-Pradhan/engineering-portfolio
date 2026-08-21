"use client";

import React from "react";
import { Zap, Users, TrendingDown, Server } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/ScrollReveal";

export default function MetricsStrip() {

  const metrics = [
    {
      value: "2,500+",
      unit: "TPS",
      label: "Peak Transaction Throughput",
      subtext: "Microservices on GCP Kubernetes",
      icon: Zap,
      color: "#E8B54D",
    },
    {
      value: "4+",
      unit: "Years",
      label: "Engineering Experience",
      subtext: "High-scale MERN & Fintech Systems",
      icon: Server,
      color: "#4FD188",
    },
    {
      value: "300K+",
      unit: "Users",
      label: "Active Users / Partner",
      subtext: "Kotak, NSDL & CSC Merchant Portals",
      icon: Users,
      color: "#8fc0ff",
    },
    {
      value: "~60%",
      unit: "Faster",
      label: "Auth Latency Reduction",
      subtext: "Stateless RFC 6238 HMAC Tokens",
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
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {m.value}
                  </span>
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
