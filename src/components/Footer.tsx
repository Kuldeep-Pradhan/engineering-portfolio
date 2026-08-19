"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-12 border-t border-[#2D3139]/80 bg-[#060709] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/5">
          <div className="md:col-span-2">
            <h3 className="font-mono text-base font-bold text-white tracking-wider uppercase mb-2">
              KULDEEP PRADHAN
            </h3>
            <p className="text-xs text-[#8E939F] max-w-sm leading-relaxed mb-6 font-normal">
              Full Stack Engineer specializing in Node.js microservices, high-throughput fintech infrastructure (2,500+ TPS), and enterprise React/Next.js applications.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#4FD188]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FD188] animate-ping" />
              <span>Available for Senior Engineering Roles</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[#8E939F]">
              <li>
                <a href="#telemetry" className="hover:text-[#E8B54D] transition-colors">
                  01 · Telemetry Console
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#E8B54D] transition-colors">
                  02 · Selected Work (6 Cases)
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#E8B54D] transition-colors">
                  03 · Skills Universe
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#E8B54D] transition-colors">
                  04 · Work History
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E8B54D] transition-colors">
                  05 · Contact &amp; Connect
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              CHANNELS
            </h4>
            <div className="space-y-2.5 font-mono text-xs text-[#8E939F]">
              <a
                href="mailto:kuldeeppradhan9@gmail.com"
                className="flex items-center gap-2 hover:text-[#E8B54D] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <a
                href="https://linkedin.com/in/kuldeep-pradhan-557b00229"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E8B54D] transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Kuldeep-Pradhan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E8B54D] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E939F]">
          <p>© {new Date().getFullYear()} Kuldeep Pradhan. All rights reserved.</p>
          <p className="text-neutral-500">
            Engineered with Next.js 15, TypeScript &amp; Tailwind CSS
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[#E8B54D] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Monumental Watermark Typography */}
        <div
          className="mt-16 text-center select-none pointer-events-none opacity-[0.03] font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl text-white uppercase overflow-hidden whitespace-nowrap"
          aria-hidden="true"
        >
          KULDEEP PRADHAN
        </div>
      </div>
    </footer>
  );
}
