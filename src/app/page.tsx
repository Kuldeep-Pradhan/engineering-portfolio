"use client";

import React, { useState } from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import MetricsStrip from "@/components/MetricsStrip";
import ProjectCard from "@/components/ProjectCard";
import CaseFileModal from "@/components/CaseFileModal";
import SkillsMatrix from "@/components/SkillsMatrix";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { projectsData, ProjectCaseStudy } from "@/data/projects";
import { Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/ScrollReveal";

export default function Home() {
  const [selectedProject, setSelectedProject] =
    useState<ProjectCaseStudy | null>(null);

  return (
    <SmoothScrollProvider>
      {/*
        No background colour here on purpose. The fixed hero film in layout.tsx
        sits at z-0, and an opaque wrapper painted straight over it. `body`
        already carries bg-[#08090C], so the page still has its floor; z-10
        keeps all content unambiguously above the film.
      */}
      <div className="relative z-10 min-h-screen text-[#F2F2F5]">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Removed Telemetry Console Widget */}

        {/* Performance Metrics Strip */}
        <MetricsStrip />

        {/* SC.03: Selected Work / 6 Case Files */}
        <section id="work" className="py-24 scroll-mt-24 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <Reveal>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
                  SC.03 · FLAGSHIP SYSTEMS &amp; ARCHITECTURES
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  Selected Case Files
                </h2>
                <p className="text-sm sm:text-base text-[#8E939F] mt-2 max-w-2xl leading-relaxed">
                  Real-world microservices, high-throughput banking integrations, and cloud infrastructure engineered for resilience and speed.
                </p>
              </Reveal>

              <Reveal
                direction="left"
                delay={0.15}
                className="flex items-center gap-2 font-mono text-xs text-[#8E939F] bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 w-fit"
              >
                <ShieldCheck className="w-4 h-4 text-[#4FD188]" />
                <span>6 Production &amp; Open Source Files</span>
              </Reveal>
            </div>

            {/* 6 Case Files Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onOpenCaseFile={(p) => setSelectedProject(p)}
                />
              ))}
            </div>

            {/* Bottom Callout Banner */}
            <Reveal
              blur
              className="mt-12 p-6 rounded-2xl glass-panel border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8B54D]/15 border border-[#E8B54D]/30 flex items-center justify-center text-[#E8B54D] shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Need custom architecture review or technical advisory?
                  </h4>
                  <p className="text-xs text-[#8E939F]">
                    Deep dive into system topology, data isolation, and low-latency auth protocols.
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#E8B54D]/40 transition-all shrink-0"
              >
                <span>Discuss System Design</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* SC.04: Skills Matrix */}
        <SkillsMatrix />

        {/* SC.05: Experience Timeline */}
        <ExperienceTimeline />

        {/* SC.06: Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Interactive Case Study Detail Modal */}
        <CaseFileModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
          allProjects={projectsData}
        />
      </div>
    </SmoothScrollProvider>
  );
}
