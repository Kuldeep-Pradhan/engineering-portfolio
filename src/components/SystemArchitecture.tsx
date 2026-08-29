"use client";

import React from "react";
import {
  ArrowDown,
  Monitor,
  Users,
  Smartphone,
  Cloud,
  ShieldCheck,
  Layers,
  Zap,
  Database,
  Bell,
  MapPin,
  KeyRound,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/ScrollReveal";

/**
 * SystemArchitecture — SC.02. A living topology of the 2,500 TPS fintech
 * platform: Edge -> Gateway -> GKE services -> Data tier, with the stateless
 * TOTP path called out as the hero. Purely illustrative (the site's own
 * numbers), reduced-motion safe via the shared Reveal/Stagger primitives and
 * the global reduced-motion CSS that kills the pulsing dots.
 */

const edgeClients: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Monitor, label: "React Dashboards", sub: "Admin & merchant UIs" },
  { icon: Users, label: "Merchant Portals", sub: "300K+ active users" },
  { icon: Smartphone, label: "mATM Terminals", sub: "5,000+ devices" },
];

const services: { icon: LucideIcon; name: string; sub: string; gold?: boolean }[] = [
  { icon: ShieldCheck, name: "Auth & TOTP", sub: "Stateless HMAC · 18ms", gold: true },
  { icon: Layers, name: "KYC State Machine", sub: "Aadhaar · PAN · Biometric" },
  { icon: Bell, name: "Notification Engine", sub: "Novu · GCP Pub/Sub" },
  { icon: MapPin, name: "mATM Mapping", sub: "Hierarchy & device health" },
];

const dataTier: { icon: LucideIcon; name: string; sub: string }[] = [
  { icon: Database, name: "PostgreSQL", sub: "Audit · multi-tenant KYC" },
  { icon: Database, name: "MongoDB", sub: "Session · onboarding state" },
  { icon: Zap, name: "Redis", sub: "Cache · rate-limit queues" },
  { icon: Radio, name: "GCP Pub/Sub", sub: "Event bus · 2,500 TPS" },
  { icon: KeyRound, name: "S3 Secrets", sub: "AWS CDK runtime inject" },
];

/** Vertical flow arrow between lanes. */
function Connector() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <ArrowDown className="h-5 w-5 text-[#565C6B]" />
    </div>
  );
}

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-20 scroll-mt-24 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
            SC.02 · THE OPERATING SYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Production System Topology
          </h2>
          <p className="text-sm text-[#8E939F] mt-1 max-w-xl">
            The reference architecture behind the 2,500 TPS platform — stateless
            authentication, event-driven messaging, and audit-grade data.
          </p>
        </Reveal>

        {/* Edge lane */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4" stagger={0.08}>
          {edgeClients.map((c, i) => {
            const Icon = c.icon;
            return (
              <StaggerItem
                key={i}
                className="p-5 rounded-2xl glass-card border border-white/10 flex items-center gap-4"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8fc0ff]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-white">{c.label}</div>
                  <div className="font-mono text-[11px] text-[#8E939F]">{c.sub}</div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Connector />

        {/* Gateway lane */}
        <Reveal>
          <div className="flex items-center gap-4 p-5 rounded-2xl glass-card border border-white/10">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#8fc0ff]/10 border border-[#8fc0ff]/20 flex items-center justify-center text-[#8fc0ff]">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-white">GCP Cloud Load Balancer</div>
              <div className="font-mono text-[11px] text-[#8E939F]">
                CloudFront CDN · Route 53 · TLS termination
              </div>
            </div>
            <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-[#8E939F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4FD188] animate-pulse" />
              edge
            </span>
          </div>
        </Reveal>

        <Connector />

        {/* Service layer — GKE cluster */}
        <Reveal>
          <div className="rounded-2xl border border-[#2D3139] bg-[#0E1015]/70 overflow-hidden">
            <div className="px-5 py-3 bg-[#151820] border-b border-[#2D3139] flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#4FD188]" />
                GKE · CLUSTER-FINTECH-PROD-01
              </div>
              <span className="hidden sm:inline font-mono text-[10px] text-[#565C6B]">
                Node.js microservices · horizontal autoscaling
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className={`relative p-4 rounded-xl border transition-all ${
                      s.gold
                        ? "bg-[#E8B54D]/10 border-[#E8B54D]/40"
                        : "bg-black/30 border-white/10"
                    }`}
                  >
                    {s.gold && (
                      <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-[#E8B54D] px-2 py-0.5 font-mono text-[9px] font-bold text-[#08090C]">
                        <span className="h-1 w-1 rounded-full bg-[#08090C] animate-pulse" />
                        STATELESS
                      </span>
                    )}
                    <div
                      className={`w-9 h-9 mb-3 rounded-lg flex items-center justify-center ${
                        s.gold
                          ? "bg-[#E8B54D]/20 text-[#E8B54D]"
                          : "bg-white/5 text-neutral-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-xs font-bold text-white">{s.name}</div>
                    <div className="font-mono text-[10px] text-[#8E939F] mt-0.5">{s.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Connector />

        {/* Data tier */}
        <Reveal>
          <div className="rounded-2xl border border-[#2D3139] bg-[#0E1015]/70 overflow-hidden">
            <div className="px-5 py-3 bg-[#151820] border-b border-[#2D3139] flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#8fc0ff]" />
                DATA &amp; STATE TIER
              </div>
              <span className="hidden sm:inline font-mono text-[10px] text-[#565C6B]">
                audit-grade · multi-tenant isolation
              </span>
            </div>
            <div className="p-4 flex flex-wrap gap-3">
              {dataTier.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div
                    key={i}
                    className="flex-1 min-w-[150px] p-4 rounded-xl bg-black/30 border border-white/10"
                  >
                    <div className="w-8 h-8 mb-2 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-xs font-bold text-white">{d.name}</div>
                    <div className="font-mono text-[10px] text-[#8E939F] mt-0.5">{d.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Legend — the stateless path is the hero */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-[#E8B54D]/25 bg-gradient-to-r from-[#E8B54D]/10 via-[#0E1015] to-transparent p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E8B54D]">
              <span className="h-2 w-2 rounded-full bg-[#E8B54D] animate-pulse" />
              STATELESS TOTP PATH
            </span>
            <p className="text-xs text-[#8E939F] leading-relaxed">
              HMAC-SHA256 token verified <span className="text-neutral-200">directly in the auth pod</span> —
              18ms round-trip with <span className="text-neutral-200">zero PostgreSQL / MongoDB / Redis I/O</span>.
              Every other request flows to the state tier for audit-grade records.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
