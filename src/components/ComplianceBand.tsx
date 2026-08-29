"use client";

import React from "react";
import { ShieldCheck, Lock, Fingerprint, FileCheck, Activity, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/ScrollReveal";

/**
 * ComplianceBand — a slim strip of the compliance / reliability credentials
 * that distinguish a fintech backend engineer. Sits directly below the
 * metrics strip so the "what" is immediately followed by the "prove it".
 */
const items: { icon: LucideIcon; label: string; color: string }[] = [
  { icon: ShieldCheck, label: "RBI 2FA Compliant", color: "text-[#4FD188]" },
  { icon: Lock, label: "RFC 6238 TOTP", color: "text-[#E8B54D]" },
  { icon: Fingerprint, label: "Stateless HMAC Auth", color: "text-[#8fc0ff]" },
  { icon: FileCheck, label: "Audit-Grade Trails", color: "text-[#4FD188]" },
  { icon: Activity, label: "99.99% Uptime", color: "text-[#E8B54D]" },
];

export default function ComplianceBand() {
  return (
    <div className="relative z-10 pb-14 pt-2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Stagger
          className="flex flex-wrap items-center justify-center gap-2.5"
          stagger={0.06}
        >
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <StaggerItem
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] text-[#8E939F]"
              >
                <Icon className={`h-3.5 w-3.5 ${it.color}`} />
                {it.label}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
}
