"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Menu, X, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Active section for the scrollspy — "" means we're in the hero.
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: the active section is the last one whose top is above ~40% of
  // the viewport. rAF-throttled so we only read positions once per frame.
  useEffect(() => {
    const ids = ["work", "skills", "experience", "contact"];
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const probe = window.innerHeight * 0.4;
        let current = "";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= probe) current = id;
        }
        setActive((prev) => (prev === current ? prev : current));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
            aria-current={active === "work" ? "true" : undefined}
            className={`transition-colors duration-200 ${
              active === "work" ? "text-[#E8B54D]" : "hover:text-[#E8B54D]"
            }`}
          >
            Selected Work
          </a>
          <a
            href="#skills"
            aria-current={active === "skills" ? "true" : undefined}
            className={`transition-colors duration-200 ${
              active === "skills" ? "text-[#E8B54D]" : "hover:text-[#E8B54D]"
            }`}
          >
            Skills
          </a>
          <a
            href="#experience"
            aria-current={active === "experience" ? "true" : undefined}
            className={`transition-colors duration-200 ${
              active === "experience" ? "text-[#E8B54D]" : "hover:text-[#E8B54D]"
            }`}
          >
            Experience
          </a>
          <a
            href="#contact"
            aria-current={active === "contact" ? "true" : undefined}
            className={`transition-colors duration-200 ${
              active === "contact" ? "text-[#E8B54D]" : "hover:text-[#E8B54D]"
            }`}
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
              aria-current={active === "work" ? "true" : undefined}
              className={`py-2 px-3 rounded-lg hover:bg-white/5 hover:text-[#E8B54D] ${
                active === "work" ? "text-[#E8B54D] bg-white/5" : "text-neutral-300"
              }`}
            >
              Selected Work
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={active === "skills" ? "true" : undefined}
              className={`py-2 px-3 rounded-lg hover:bg-white/5 hover:text-[#E8B54D] ${
                active === "skills" ? "text-[#E8B54D] bg-white/5" : "text-neutral-300"
              }`}
            >
              Technical Skills Matrix
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={active === "experience" ? "true" : undefined}
              className={`py-2 px-3 rounded-lg hover:bg-white/5 hover:text-[#E8B54D] ${
                active === "experience" ? "text-[#E8B54D] bg-white/5" : "text-neutral-300"
              }`}
            >
              Work History &amp; Recognitions
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={active === "contact" ? "true" : undefined}
              className={`py-2 px-3 rounded-lg hover:bg-white/5 hover:text-[#E8B54D] ${
                active === "contact" ? "text-[#E8B54D] bg-white/5" : "text-neutral-300"
              }`}
            >
              Get In Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
