"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, AlertCircle, Layers, Cpu, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { ProjectCaseStudy } from "@/data/projects";

interface CaseFileModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onSelectProject: (p: ProjectCaseStudy) => void;
  allProjects: ProjectCaseStudy[];
}

export default function CaseFileModal({
  project,
  onClose,
  onSelectProject,
  allProjects,
}: CaseFileModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop blur veil */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Dialog Sheet */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1015] border border-[#2D3139] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#151820] border-b border-[#2D3139] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#E8B54D] bg-[#E8B54D]/10 px-2.5 py-1 rounded border border-[#E8B54D]/25">
              CASE FILE · {project.index}
            </span>
            <span className="font-mono text-xs text-[#8E939F] hidden sm:inline-block">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Title & Status */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#4FD188]/10 text-[#4FD188] border border-[#4FD188]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FD188] animate-pulse" />
                {project.status}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {project.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {project.title}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              {project.hook}
            </p>
          </div>

          {/* Key Metric Highlight Card */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-[#E8B54D]/10 via-[#151820] to-transparent border border-[#E8B54D]/25 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-[#E8B54D] uppercase tracking-wider block mb-1">
                KEY PERFORMANCE IMPACT
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {project.heroMetric.value}
              </span>
              <span className="text-xs text-[#8E939F] ml-2 font-mono">
                {project.heroMetric.label}
              </span>
            </div>
            <Cpu className="w-8 h-8 text-[#E8B54D] shrink-0 opacity-80" />
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#12141A] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-[#8E939F] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#12141A] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#4FD188]" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#8E939F] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Highlights */}
          <div>
            <h3 className="text-sm font-bold font-mono uppercase text-[#E8B54D] tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Architecture Highlights &amp; System Design
            </h3>
            <ul className="space-y-3">
              {project.architectureHighlights.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-neutral-300"
                >
                  <span className="font-mono text-xs text-[#E8B54D] font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantifiable Outcomes */}
          <div>
            <h3 className="text-sm font-bold font-mono uppercase text-[#4FD188] tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Verified Production Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.outcomes.map((out, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-black/40 border border-[#4FD188]/20 text-xs text-neutral-300 leading-relaxed"
                >
                  <span className="text-[#4FD188] font-bold block mb-1 font-mono">
                    Outcome ✓
                  </span>
                  {out}
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase text-neutral-400 tracking-wider mb-3">
              TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar & Navigation */}
        <div className="px-6 py-4 bg-[#12141A] border-t border-[#2D3139] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all w-full sm:w-auto"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            )}
          </div>

          {/* Prev / Next Case File Navigation */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {prevProject && (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#8E939F] hover:text-white hover:bg-white/5 transition-colors"
              >
                ← Prev File
              </button>
            )}
            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#E8B54D] hover:bg-[#E8B54D]/10 transition-colors inline-flex items-center gap-1"
              >
                <span>Next File</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
