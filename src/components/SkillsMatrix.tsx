"use client";

import React, { useState } from "react";
import { skillsData } from "@/data/skills";
import { Server, Layout, Database, Cloud, Shield, Check, Sparkles } from "lucide-react";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const iconsMap: Record<string, any> = {
    "backend-frameworks": Server,
    "frontend-technologies": Layout,
    "databases-caching": Database,
    "cloud-devops": Cloud,
    "security-testing": Shield,
  };

  const filteredCategories =
    selectedCategory === "all"
      ? skillsData
      : skillsData.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 scroll-mt-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
              SC.04 · TECHNICAL UNIVERSE &amp; DOMAINS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Skills &amp; Engineering Matrix
            </h2>
            <p className="text-sm text-[#8E939F] mt-1 max-w-xl">
              Specialized expertise in high-throughput backend microservices, distributed data architectures, and enterprise React/Next.js frontends.
            </p>
          </div>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "all"
                  ? "bg-[#E8B54D] text-[#08090C] font-bold shadow-[0_0_15px_rgba(232,181,77,0.2)]"
                  : "bg-white/5 text-[#8E939F] hover:text-white border border-white/5"
              }`}
            >
              All Domains
            </button>
            {skillsData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#E8B54D] text-[#08090C] font-bold shadow-[0_0_15px_rgba(232,181,77,0.2)]"
                    : "bg-white/5 text-[#8E939F] hover:text-white border border-white/5"
                }`}
              >
                {cat.category.split(" & ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = iconsMap[category.id] || Server;
            return (
              <div
                key={category.id}
                className="p-6 sm:p-7 rounded-2xl glass-card border border-white/10 hover:border-[#E8B54D]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#E8B54D]">
                      {category.code}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4 text-[#E8B54D]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {category.category}
                  </h3>

                  <p className="text-xs text-[#8E939F] leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Skills Badges Grid */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        skill.highlight
                          ? "bg-[#E8B54D]/10 text-white border-[#E8B54D]/30 font-medium"
                          : "bg-white/[0.03] text-neutral-300 border-white/5 hover:border-white/15"
                      }`}
                    >
                      {skill.highlight ? (
                        <Sparkles className="w-3 h-3 text-[#E8B54D] shrink-0" />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-neutral-500 shrink-0" />
                      )}
                      <span>{skill.name}</span>
                      {skill.tag && (
                        <span className="text-[10px] text-neutral-400 bg-white/5 px-1 rounded ml-0.5">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
