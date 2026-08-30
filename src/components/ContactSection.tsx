"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Reveal } from "@/components/motion/ScrollReveal";

type SendStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const email = "kuldeeppradhan9@gmail.com";
  const phone = "+91 8117012315";
  const whatsapp = "+91 9090569556";
  const whatsappLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Guard: keys not configured yet.
    if (
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId.startsWith("your_") ||
      templateId.startsWith("your_") ||
      publicKey.startsWith("your_")
    ) {
      setStatus("error");
      setErrorMsg(
        "Email service isn't configured yet. Add your EmailJS keys to .env.local."
      );
      return;
    }

    try {
      setStatus("sending");
      setErrorMsg("");

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: email,
        },
        { publicKey }
      );

      setStatus("success");
      setFormData({ email: "", subject: "", message: "" });
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#E8B54D", "#4FD188", "#FFFFFF"],
      });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setErrorMsg("Something went wrong sending your email. Please try again or email me directly.");
    }
  };

  const isSending = status === "sending";

  return (
    <section id="contact" className="py-24 scroll-mt-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal blur className="rounded-3xl border border-[#2D3139] bg-gradient-to-b from-[#12151D] via-[#0E1015] to-[#08090C] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8B54D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl flex flex-col lg:flex-row gap-12">

            {/* Left Column: Info */}
            <Reveal direction="up" delay={0.1} className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs text-[#E8B54D] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B54D]" />
                CONNECT &amp; COLLABORATE
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                Let&apos;s engineer something{" "}
                <span className="text-gold-gradient">scalable</span> together.
              </h2>

              <p className="text-base sm:text-lg text-[#8E939F] mb-10 leading-relaxed max-w-md">
                Open to high-impact full-time Full-Stack / Backend Engineering roles, fintech microservices consulting, or architectural advisory.
              </p>

              {/* Contact channel cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {/* Email */}
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

                {/* Phone */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#E8B54D]/30 transition-all flex flex-col justify-between group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#8E939F]">PHONE / CALL</span>
                    <Phone className="w-4 h-4 text-[#4FD188]" />
                  </div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="font-mono text-sm font-semibold text-white group-hover:text-[#4FD188] transition-colors"
                  >
                    {phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#25D366]/40 transition-all flex flex-col justify-between group sm:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#8E939F]">WHATSAPP</span>
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>

              {/* Social icons — reflective black square boxes */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/kuldeep-pradhan-nodejs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="social-tile group"
                >
                  <LinkedinIcon className="w-6 h-6 text-[#8fc0ff] transition-transform duration-300 group-hover:scale-110" />
                </a>

                <a
                  href="https://github.com/Kuldeep-Pradhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="social-tile group"
                >
                  <GithubIcon className="w-6 h-6 text-neutral-100 transition-transform duration-300 group-hover:scale-110" />
                </a>
              </div>
            </Reveal>

            {/* Right Column: Send Email Form */}
            <Reveal direction="left" delay={0.25} className="flex-1 lg:max-w-md w-full bg-[#08090C]/50 p-6 sm:p-8 rounded-2xl border border-white/5 relative z-10">
              <h3 className="text-xl font-bold text-white mb-6">Send Email</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-[#8E939F] mb-1.5">Your Email ID</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E8B54D]/50 focus:ring-1 focus:ring-[#E8B54D]/50 transition-all"
                    placeholder="you@example.com"
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
                  <label htmlFor="message" className="block text-xs font-mono text-[#8E939F] mb-1.5">Body</label>
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

                {/* Status feedback */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#4FD188] bg-[#4FD188]/10 border border-[#4FD188]/30 rounded-lg px-3 py-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Email sent successfully — I&apos;ll get back to you soon!</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5736B] bg-[#F5736B]/10 border border-[#F5736B]/30 rounded-lg px-3 py-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-sm font-bold bg-[#E8B54D] text-[#08090C] hover:bg-[#F5C86C] transition-all shadow-[0_0_20px_rgba(232,181,77,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </form>
            </Reveal>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

