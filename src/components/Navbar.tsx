"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Menu, X, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadResume = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.15 },
      colors: ["#E8B54D", "#4FD188", "#FFFFFF"],
    });
    // Trigger download automatically
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Kuldeep_Pradhan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-4 px-4 sm:px-6 pointer-events-none transition-all duration-300">
      {/*
        No backdrop-blur here, deliberately. The navbar is fixed, so it sits
        over the hero scrub film for the whole hero. Profiling that
        (scripts/diagnose-frames.mjs) put backdrop-filter over the moving film
        at roughly half the frame rate — 33.3ms vs 16.8ms median.

        Trying to disable it from CSS only while the film is visible does NOT
        work: `backdrop-filter: none` is the property's initial value, so Next's
        minifier strips the declaration as a redundant no-op, even with
        !important. And no other value avoids the cost, because any
        backdrop-filter still forces the backdrop snapshot. So the blur is gone
        from the markup and the background opacity carries the contrast
        instead — the same trade lv8tech.ai made for the same reason.
      */}
      <div
        className={`nav-pill w-full max-w-6xl rounded-full px-5 sm:px-7 py-3 border transition-all duration-300 pointer-events-auto flex items-center justify-between shadow-2xl ${
          scrolled
            ? "bg-[#0E1015]/95 border-[#2D3139] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-[#0E1015]/82 border-white/10"
        }`}
      >
        {/* Brand Full Name */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-white transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-[#E8B54D] group-hover:scale-125 transition-transform" />
          <span className="font-semibold tracking-wider uppercase text-xs sm:text-sm text-neutral-100">
            KULDEEP PRADHAN
          </span>
          <span className="hidden lg:inline-block font-mono text-[11px] text-[#8E939F] border-l border-white/10 pl-2.5">
            Full Stack &amp; Fintech Systems
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#8E939F]">
          <a
            href="#work"
            className="hover:text-[#E8B54D] transition-colors duration-200"
          >
            Selected Work
          </a>
          <a
            href="#skills"
            className="hover:text-[#E8B54D] transition-colors duration-200"
          >
            Skills
          </a>
          <a
            href="#experience"
            className="hover:text-[#E8B54D] transition-colors duration-200"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="hover:text-[#E8B54D] transition-colors duration-200"
          >
            Contact
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          <a
            href="https://github.com/Kuldeep-Pradhan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8E939F] hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          
          <a
            href="https://www.linkedin.com/in/kuldeep-pradhan-nodejs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8E939F] hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          <button
            onClick={handleDownloadResume}
            className="text-[#8E939F] hover:text-[#E8B54D] transition-colors"
            aria-label="Download Resume"
            title="Download Resume"
          >
            <FileText className="w-5 h-5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-[#0E1015] border border-[#2D3139] rounded-2xl p-6 shadow-2xl pointer-events-auto flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 font-mono text-sm">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-[#E8B54D]"
            >
              Selected Work
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-[#E8B54D]"
            >
              Technical Skills Matrix
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-[#E8B54D]"
            >
              Work History &amp; Recognitions
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-[#E8B54D]"
            >
              Get In Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
