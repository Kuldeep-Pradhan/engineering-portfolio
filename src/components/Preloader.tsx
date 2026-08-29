"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const LOG_MESSAGES = [
  "INITIALIZING DISTRIBUTED SYSTEMS...",
  "ALLOCATING VRAM SECRETS...",
  "VERIFYING JWT PROTOCOLS...",
  "DECODING NEURAL ASSETS...",
  "ESTABLISHING SECURE WEBSOCKETS...",
  "COMPILING MICROSERVICES...",
  "ACHIEVING 2500 TPS...",
  "READY."
];

export default function Preloader({ className }: { className?: string }) {
  const isVideoReady = useAppStore((state) => state.isVideoReady);
  const [logs, setLogs] = useState<string[]>([]);

  // Fallback timeout in case video fails to load or fires events strangely
  useEffect(() => {
    const timer = setTimeout(() => {
      useAppStore.getState().setVideoReady(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate logs
  useEffect(() => {
    if (isVideoReady) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < LOG_MESSAGES.length - 1) {
        setLogs((prev) => {
          const next = [...prev, LOG_MESSAGES[currentIndex]];
          if (next.length > 4) next.shift(); // keep only last 4
          return next;
        });
        currentIndex++;
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isVideoReady]);

  return (
    <AnimatePresence>
      {!isVideoReady && (
        <motion.div
          key="preloader-inline"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className={className}
        >
          <div className="flex flex-col items-center justify-center">
            
            {/* --- Advanced Tech Core --- */}
            <div className="relative flex items-center justify-center w-48 h-48 mb-8">
              
              {/* Outer Dashed Ring (Slow Clockwise) */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#E8B54D" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>

              {/* Middle Track Ring (Fast Counter-Clockwise) */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite_reverse] opacity-70" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E8B54D" strokeWidth="1" strokeDasharray="20 15 5 15" />
              </svg>

              {/* Inner Solid Frame */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="32" fill="none" stroke="#E8B54D" strokeWidth="0.25" />
              </svg>
              
              {/* Central Glowing Chip */}
              <div className="relative z-10 flex items-center justify-center bg-[#08090C] rounded-xl p-4 shadow-[0_0_40px_rgba(232,181,77,0.15)] border border-[#E8B54D]/20">
                <Cpu className="w-16 h-16 text-[#E8B54D] animate-pulse" strokeWidth={1} />
              </div>
              
              {/* Hex Data Blips */}
              <div className="absolute top-0 right-0 text-[#E8B54D] opacity-50 font-mono text-[8px] animate-pulse">
                SYS.INIT
              </div>
              <div className="absolute bottom-2 left-0 text-[#E8B54D] opacity-50 font-mono text-[8px] animate-pulse" style={{ animationDelay: '500ms' }}>
                0x00F8A
              </div>

            </div>

            {/* --- Terminal Logs --- */}
            <div className="h-20 w-72 flex flex-col justify-end text-center font-mono text-[10px] text-[#E8B54D]/70 overflow-hidden">
              {logs.map((log, i) => (
                <motion.div
                  key={log + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-1.5 uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span className="text-[#E8B54D] opacity-50">&gt;</span>
                  {log}
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
