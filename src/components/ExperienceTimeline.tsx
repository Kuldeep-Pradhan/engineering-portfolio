"use client";

import React from "react";
import { experienceData, educationData } from "@/data/experience";
import { Briefcase, Award, GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 scroll-mt-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
            SC.05 · CAREER JOURNEY &amp; PROOF
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Experience
          </h2>
          <p className="text-sm text-[#8E939F] mt-1 max-w-xl">
            A track record of engineering scalable fintech products, high-throughput microservices, and leading full-stack implementations.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-6 before:w-px before:bg-gradient-to-b before:from-[#E8B54D]/50 before:via-[#2D3139] before:to-transparent">
          {experienceData.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex items-start gap-6 sm:gap-10 group"
            >
              {/* Timeline Marker Node */}
              <div className="w-7 sm:w-12 h-7 sm:h-12 rounded-full bg-[#0E1015] border-2 border-[#E8B54D] flex items-center justify-center text-[#E8B54D] shrink-0 z-10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(232,181,77,0.4)] transition-all">
                <Briefcase className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
              </div>

              {/* Experience Card */}
              <div className="flex-1 p-6 sm:p-8 rounded-2xl glass-card border border-white/10 hover:border-[#E8B54D]/30 transition-all duration-300">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {item.role}
                      </h3>
                      {item.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#4FD188]/15 text-[#4FD188] border border-[#4FD188]/30">
                          Current Role
                        </span>
                      )}
                    </div>
                    <div className="text-base font-semibold text-[#E8B54D]">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-[#8E939F]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-neutral-300 mb-6 leading-relaxed font-normal">
                  {item.summary}
                </p>

                {/* Achievements List */}
                <div className="space-y-2.5 mb-6">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8E939F] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#4FD188] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Recognitions / Awards Banner */}
                {item.recognitions && item.recognitions.length > 0 && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#E8B54D]/15 via-black/40 to-transparent border border-[#E8B54D]/30 mb-6 flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#E8B54D] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-xs font-bold text-[#E8B54D] uppercase tracking-wider block mb-0.5">
                        KEY RECOGNITION &amp; HONORS
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-200">
                        {item.recognitions[0]}
                      </p>
                    </div>
                  </div>
                )}

                {/* Stack Used */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {item.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Academic Honors */}
        <div className="mt-16 pt-12 border-t border-[#2D3139]/60">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            ACADEMIC FOUNDATION &amp; CERTIFICATIONS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#8E939F] block mb-1">
                    {edu.period}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-[#E8B54D] font-mono mb-4">
                    {edu.institution} · {edu.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {edu.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 text-neutral-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
