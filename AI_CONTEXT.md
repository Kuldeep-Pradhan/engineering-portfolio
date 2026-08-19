# AI Agent Context & Project Guidelines

This file is intended for any AI coding assistant or agent working on this repository to quickly understand the project's state, strict constraints, and UI/UX design language. Read this before making modifications.

## Project Overview
- **Author:** Kuldeep Pradhan
- **Role:** Full Stack Engineer (Node.js / MERN, Fintech Systems, Microservices)
- **Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lenis (for smooth scrolling).

## STRICT Brand & Content Guidelines
- **Name Usage:** ALWAYS use the full name "KULDEEP PRADHAN". NEVER use initials like "KP" or any brand prefix like "KP · KULDEEP PRADHAN".
- **Banking Partners:** You may freely use "IPPB" alongside other banking partners like "NSDL", "Kotak", and "CSC" in case studies and documentation.
- **Hero Section:** Do not include a personal photo. Do not include "Telemetry Widget" or "Live Telemetry console" buttons. Do not include "2.5k TPS Ready" badges.
- **Contact:** The Contact section includes a `mailto:` powered form. Keep it lightweight without requiring backend servers.

## UI/UX Design Language
- **Theme:** Obsidian Gold & Dark Luxe theme. Backgrounds are very dark (e.g., `#08090C`, `#0E1015`) with subtle gold accents (`#E8B54D`) and glassmorphism panels.
- **Typography:** The project uses the **Inter** font for a clean, enterprise-level look, paired with `JetBrains Mono` for technical badges and metadata.
- **Scrolling:** The site uses **Lenis** for cinematic smooth scrolling. Do NOT add `scroll-smooth` to the HTML tag, as native CSS smooth scrolling breaks Lenis momentum scrolling.
- **Advanced Scroll Animations:** The user specifically wants scroll-triggered reveal and parallax animations mirroring the cinematic effects seen on `https://lv8tech.ai/`. Future agents should utilize `framer-motion` (e.g., `useScroll`, `useTransform`, and `motion.div`) integrated with Lenis to achieve these heavy scroll-driven typography reveals and image parallax effects.
- **Icons:** We use `lucide-react` for standard icons, and custom SVG components in `src/components/Icons.tsx` for GitHub and LinkedIn.

## File Structure & State
- **Data Layer:** Content is separated from UI. Edit `src/data/projects.ts`, `src/data/skills.ts`, and `src/data/experience.ts` to update case studies and history without touching UI components.
- **Components:** Modular components exist in `src/components/`.
- **Assets:** The user's resume is stored in `public/resume.pdf` and is linked directly via the navbar document icon.

## Work Completed
- Initialized Next.js 15 project with Tailwind v4.
- Built all major sections: Navbar (with icon links), Hero, Selected Work (with Case File Modals), Skills Matrix, Experience Timeline, and Contact.
- Applied the dark luxe visual theme and integrated Lenis smooth scrolling.
- Addressed specific user revisions: Swapped to an enterprise font (Inter), removed telemetry UI, and added FDE certification.

*Note for future agents: Always adhere to the strict brand and content guidelines listed above.*
