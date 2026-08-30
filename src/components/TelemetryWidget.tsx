"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, Cpu, Zap, Terminal, Radio } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "AUTH" | "KYC" | "PUBSUB" | "mATM" | "SECRETS" | "AUDIT";
  message: string;
  status: "success" | "info" | "warn";
}

const initialLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "15:42:01.104",
    level: "AUTH",
    message: "RFC 6238 TOTP verified · Stateless HMAC token generated (18ms)",
    status: "success",
  },
  {
    id: "2",
    timestamp: "15:42:01.428",
    level: "KYC",
    message: "State machine transition Tier-1 Partner -> Verified",
    status: "success",
  },
  {
    id: "3",
    timestamp: "15:42:02.012",
    level: "PUBSUB",
    message: "GCP event dispatched to 300K+ merchant alert topics via Novu",
    status: "info",
  },
  {
    id: "4",
    timestamp: "15:42:02.680",
    level: "mATM",
    message: "Hierarchical device heartbeat synced · 5,142 active mATM terminals",
    status: "info",
  },
  {
    id: "5",
    timestamp: "15:42:03.119",
    level: "AUDIT",
    message: "PostgreSQL multi-tenant KYC ledger sealed for banking compliance",
    status: "success",
  },
];

const mockEventPool: Omit<LogEntry, "id" | "timestamp">[] = [
  {
    level: "AUTH",
    message: "Stateless HMAC authentication handshake completed without DB I/O (16ms)",
    status: "success",
  },
  {
    level: "KYC",
    message: "State machine transition Tier-1 Partner -> Document biometric verified",
    status: "success",
  },
  {
    level: "PUBSUB",
    message: "GCP Pub/Sub queue rate-limiter balanced · 2,548 transactions/sec",
    status: "info",
  },
  {
    level: "mATM",
    message: "Banking correspondent routing map refreshed for 5,000+ POS devices",
    status: "info",
  },
  {
    level: "SECRETS",
    message: "AWS S3 .env.production cryptographic keys dynamically validated",
    status: "success",
  },
  {
    level: "KYC",
    message: "Tier-1 Sponsor Bank onboarding state machine reached final settlement status",
    status: "success",
  },
];

export default function TelemetryWidget() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [currentTps, setCurrentTps] = useState(2542);
  const [activeNodes, setActiveNodes] = useState(5142);
  const [isLive, setIsLive] = useState(true);

  // Live real-time telemetry simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Fluctuate TPS slightly around 2,500+ TPS
      const randomTps = 2500 + Math.floor(Math.random() * 85);
      setCurrentTps(randomTps);

      const randomNodes = 5120 + Math.floor(Math.random() * 35);
      setActiveNodes(randomNodes);

      // Add a fresh log item
      const now = new Date();
      const timeStr = `${now.toTimeString().split(" ")[0]}.${Math.floor(
        Math.random() * 900 + 100
      )}`;

      const randomEvent =
        mockEventPool[Math.floor(Math.random() * mockEventPool.length)];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: timeStr,
        ...randomEvent,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <section id="telemetry" className="relative py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
              SC.02 · LIVE BACKEND TELEMETRY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Production Systems Telemetry
            </h2>
            <p className="text-sm text-[#8E939F] mt-1 max-w-xl">
              Live simulation of microservices metrics, high-throughput message queues, and cryptographic authentication logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs border border-white/10 glass-panel hover:border-white/20 text-neutral-300 transition-colors"
            >
              <Radio
                className={`w-3.5 h-3.5 ${
                  isLive ? "text-[#4FD188] animate-pulse" : "text-[#8E939F]"
                }`}
              />
              <span>{isLive ? "Streaming Live" : "Stream Paused"}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Console Frame */}
        <div className="rounded-2xl border border-[#2D3139] bg-[#0E1015]/90 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="px-5 py-3.5 bg-[#151820] border-b border-[#2D3139] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                <Terminal className="w-3.5 h-3.5 text-[#E8B54D]" />
                <span>CLUSTER-FINTECH-PROD-01</span>
                <span className="text-white/30">/</span>
                <span className="text-[#4FD188]">healthy</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-[#8E939F]">
              <span>GCP Kubernetes Engine</span>
              <span>•</span>
              <span>AWS ECS Fargate</span>
            </div>
          </div>

          {/* Metrics Status Gauges */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-[#2D3139]/80 bg-black/20">
            {/* Metric 1: TPS */}
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8E939F] font-mono text-xs mb-2">
                <span>THROUGHPUT</span>
                <Zap className="w-4 h-4 text-[#E8B54D]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-[#E8B54D]">
                  {currentTps.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-neutral-400">TPS</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#4FD188]/10 text-[#4FD188] border border-[#4FD188]/20 ml-auto">
                  Live
                </span>
              </div>
            </div>

            {/* Metric 2: Latency */}
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8E939F] font-mono text-xs mb-2">
                <span>AUTH LATENCY</span>
                <Cpu className="w-4 h-4 text-[#4FD188]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-white">
                  18ms
                </span>
                <span className="font-mono text-xs text-[#4FD188] font-semibold">
                  -60% vs DB I/O
                </span>
              </div>
            </div>

            {/* Metric 3: Active mATM Devices */}
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8E939F] font-mono text-xs mb-2">
                <span>mATM NETWORK</span>
                <Activity className="w-4 h-4 text-[#8fc0ff]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-white">
                  {activeNodes.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-neutral-400">Nodes</span>
              </div>
            </div>

            {/* Metric 4: Uptime & Security */}
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8E939F] font-mono text-xs mb-2">
                <span>SLA UPTIME</span>
                <ShieldCheck className="w-4 h-4 text-[#4FD188]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-[#4FD188]">
                  99.99%
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  RBI 2FA Validated
                </span>
              </div>
            </div>
          </div>

          {/* Live Log Stream Feed */}
          <div className="p-5 sm:p-6 bg-[#08090C]/90 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-[#8E939F]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4FD188] animate-ping" />
                TRANSACTION &amp; MICROSERVICES EVENT STREAM
              </span>
              <span className="text-[11px] text-neutral-500">Auto-refresh: 2.8s</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 py-1.5 px-2.5 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-colors animate-in fade-in slide-in-from-top-1 duration-300"
                >
                  <span className="text-neutral-500 text-[11px] shrink-0">
                    {log.timestamp}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide w-fit shrink-0 ${
                      log.level === "AUTH"
                        ? "bg-[#E8B54D]/15 text-[#E8B54D] border border-[#E8B54D]/30"
                        : log.level === "KYC"
                        ? "bg-[#4FD188]/15 text-[#4FD188] border border-[#4FD188]/30"
                        : log.level === "PUBSUB"
                        ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                        : log.level === "SECRETS"
                        ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                        : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    [{log.level}]
                  </span>

                  <span className="text-neutral-200 break-words flex-1">
                    {log.message}
                  </span>

                  <span className="text-[#4FD188] text-[11px] font-mono shrink-0 hidden md:inline">
                    [verified ✓]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

