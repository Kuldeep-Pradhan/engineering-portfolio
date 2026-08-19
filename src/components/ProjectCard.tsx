"use client";

import React from "react";
import { ArrowUpRight, Cpu } from "lucide-react";
import { ProjectCaseStudy } from "@/data/projects";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenCaseFile: (p: ProjectCaseStudy) => void;
}

export default function ProjectCard({
  project,
  onOpenCaseFile,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => onOpenCaseFile(project)}
      className="group relative p-6 sm:p-7 rounded-2xl glass-card border border-white/10 hover:border-[#E8B54D]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Glow Hover background effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#E8B54D]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Card Header Top Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-xs font-semibold text-[#8E939F] group-hover:text-[#E8B54D] transition-colors">
            {project.index}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border"
            style={{
              borderColor: `${project.statusColor}33`,
              color: project.statusColor,
              backgroundColor: `${project.statusColor}15`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: project.statusColor }}
            />
            {project.status}
          </span>
        </div>

        {/* Domain Category & Title */}
        <span className="font-mono text-xs text-[#E8B54D] uppercase tracking-wider block mb-1.5">
          {project.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#E8B54D] transition-colors mb-3">
          {project.title}
        </h3>

        {/* Hook */}
        <p className="text-xs sm:text-sm text-[#8E939F] leading-relaxed mb-6">
          {project.hook}
        </p>

        {/* Hero Metric Pill */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between mb-6 group-hover:border-[#E8B54D]/20 transition-colors">
          <div>
            <span className="font-mono text-xs text-[#8E939F] block">
              {project.heroMetric.label}
            </span>
            <span className="font-mono text-base font-bold text-white group-hover:text-[#E8B54D] transition-colors">
              {project.heroMetric.value}
            </span>
          </div>
          <Cpu className="w-5 h-5 text-neutral-500 group-hover:text-[#E8B54D] transition-colors" />
        </div>
      </div>

      <div>
        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Trigger Button Row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono">
          <span className="text-neutral-400 group-hover:text-white transition-colors">
            {project.badge}
          </span>
          <span className="text-[#E8B54D] inline-flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
            Open Case File
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
