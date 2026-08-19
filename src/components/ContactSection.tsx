"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, Phone, Copy, Check, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", subject: "", message: "" });
  const email = "kuldeeppradhan9@gmail.com";
  const phone = "+91 8117012315";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#E8B54D", "#4FD188"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Kuldeep,%0D%0A%0D%0A${formData.message.replace(/\n/g, '%0D%0A')}%0D%0A%0D%0AFrom:%0D%0A${formData.name}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 scroll-mt-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-[#2D3139] bg-gradient-to-b from-[#12151D] via-[#0E1015] to-[#08090C] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8B54D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
                CONNECT &amp; COLLABORATE
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                Let&apos;s engineer something{" "}
                <span className="text-gold-gradient">scalable</span> together.
              </h2>

              <p className="text-base sm:text-lg text-[#8E939F] mb-10 leading-relaxed max-w-md">
                Open to high-impact full-time Senior Full Stack / Backend Engineering roles, fintech microservices consulting, or architectural advisory.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#E8B54D]/30 transition-all flex flex-col justify-between group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#8E939F]">DIRECT EMAIL</span>
                    <Mail className="w-4 h-4 text-[#E8B54D]" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="font-mono text-sm font-semibold text-white group-hover:text-[#E8B54D] transition-colors truncate"
                    >
                      {email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors shrink-0"
                      title="Copy Email"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#4FD188]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#E8B54D]/30 transition-all flex flex-col justify-between group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#8E939F]">PHONE / WHATSAPP</span>
                    <Phone className="w-4 h-4 text-[#4FD188]" />
                  </div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="font-mono text-sm font-semibold text-white group-hover:text-[#4FD188] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://linkedin.com/in/kuldeep-pradhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:border-[#E8B54D]/40"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#8fc0ff]" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/Kuldeep-Pradhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:border-[#E8B54D]/40"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex-1 lg:max-w-md w-full bg-[#08090C]/50 p-6 sm:p-8 rounded-2xl border border-white/5 relative z-10">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-[#8E939F] mb-1.5">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E8B54D]/50 focus:ring-1 focus:ring-[#E8B54D]/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-[#8E939F] mb-1.5">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E8B54D]/50 focus:ring-1 focus:ring-[#E8B54D]/50 transition-all"
                    placeholder="Opportunity Discussion"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-[#8E939F] mb-1.5">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E8B54D]/50 focus:ring-1 focus:ring-[#E8B54D]/50 transition-all resize-none"
                    placeholder="Hello Kuldeep..."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-sm font-bold bg-[#E8B54D] text-[#08090C] hover:bg-[#F5C86C] transition-all shadow-[0_0_20px_rgba(232,181,77,0.2)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Mail App</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
