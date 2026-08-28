# AI Agent Context & Project Guidelines

This file is intended for any AI coding assistant or agent working on this repository to quickly understand the project's state, strict constraints, and UI/UX design language. Read this before making modifications.

## Project Overview
- **Author:** Kuldeep Pradhan
- **Role:** Full Stack Engineer (Node.js / MERN, Fintech Systems, Microservices)
- **Tech Stack:** Next.js 16.3.1 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Framer Motion, Lenis (for smooth scrolling). Playwright + ffmpeg-static are dev-only, for the hero film.

## STRICT Brand & Content Guidelines
- **Name Usage:** ALWAYS use the full name "KULDEEP PRADHAN". NEVER use initials like "KP" or any brand prefix like "KP · KULDEEP PRADHAN".
- **Banking Partners:** You may freely use "IPPB" alongside other banking partners like "NSDL", "Kotak", and "CSC" in case studies and documentation.
- **Hero Section:** Do not include a personal photo. Do not include "Telemetry Widget" or "Live Telemetry console" buttons. Do not include "2.5k TPS Ready" badges.
- **Contact:** The Contact section form sends real email via **EmailJS** (`@emailjs/browser`), client-side with no backend. Keys live in `.env.local` as `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (template vars: `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{to_email}}`). Fields are Your Email ID / Subject / Body; the button is "Send Email". Keep it backend-free. Contact channels also include Email, Phone, and WhatsApp (+91 9090569556); LinkedIn/GitHub render as reflective black square tiles via the `.social-tile` class in `globals.css`.

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
- Built a cinematic scroll-animation system (lv8tech.ai-style) — see below.

## Scroll Animation System
- **Reusable primitives** live in `src/components/motion/ScrollReveal.tsx`:
  - `Reveal` — fade/slide (+ optional `blur`) reveal on scroll-in; supports `direction`, `delay`, `duration`, `as`.
  - `Stagger` + `StaggerItem` — cascade children into view (used by `MetricsStrip`).
  - `Parallax` — depth translation driven by `useScroll`/`useSpring` (used by the Footer watermark).
  - `WordReveal` — scroll-linked word-by-word typography reveal for heavy headlines.
  - `useMounted` — gates scroll-driven `style` bindings until after mount to prevent SSR/client hydration mismatches. **Any new scroll-linked motion value applied via `style` must be gated with this hook.**
- **`SmoothScrollProvider`** is the backbone: it runs Lenis, routes in-page `#anchor` clicks through Lenis momentum scroll (offset -96px for the fixed navbar), exposes the instance on `window.__lenis`, and fully disables itself when `prefers-reduced-motion` is set.
- **Accessibility:** every primitive and the Hero respect `useReducedMotion`; `globals.css` also disables ambient/CSS animation under `prefers-reduced-motion`.
- **CSS:** `globals.css` intentionally omits `scroll-behavior: smooth` (it breaks Lenis) and includes the recommended Lenis baseline classes.

*Note for future agents: Always adhere to the strict brand and content guidelines listed above. For any new scroll animation, reuse the primitives in `src/components/motion/ScrollReveal.tsx` rather than re-implementing `useScroll` logic, and remember to gate motion-value `style` props with `useMounted`.*

## Hero Scrub Film

The hero background is a **video whose playhead is the scroll position** — the lv8tech.ai technique. Scroll does not *trigger* the animation, it *is* the animation.

### Pieces
- **`scripts/film/scene.html`** — the film's source, drawn on a 2D canvas in **four acts** (see the act map below). **Open this file in a browser to scrub and tune it with a slider** — it names the active act as you drag.
- **`scripts/generate-film.mjs`** (`npm run film`, or `npm run film:fast` to iterate) — renders `scene.html` in headless Chromium and encodes `public/film/{hero-fwd,hero-rev}.mp4` + `hero-poster.jpg`.
- **`src/components/ScrubFilm.tsx`** — the fixed film layer. Mounted in `layout.tsx`, driven by the `#top` track.
- **`src/components/Hero.tsx`** — a `240vh` / `480vh` (md) track with a sticky `100svh` holder, choreographed as beats. `#top` is what ScrubFilm measures.
- **`npm run verify:film`** / **`npm run diagnose:frames`** — Playwright checks (needs a server running).

### The film's four acts

`drawFrame(t)` composites four act renderers, crossfading in the overlaps via `actWeight()`. The story is: work arrives → the monolith breaks up → traffic scales through the fabric → everything settles into a secure core.

| Act | `t` | Draws |
|---|---|---|
| 1 · INGEST | 0.00–0.26 | Paper records drift in from the edges, some carrying OTP codes; a dim monolith sits centre |
| 2 · FRACTURE | 0.22–0.48 | The monolith cracks, splits, and its shards fly out and shrink into service nodes |
| 3 · ROUTE | 0.44–0.78 | Packets travel the lanes, traffic ramps, nodes replicate behind themselves |
| 4 · CORE | 0.74–1.00 | Feed traces converge into a die that lights up pin by pin; a lock seals; emerald confirmations pulse |

Act 2's shard targets come from the **mid fabric layer's lanes**, so by the time Act 2 crossfades into Act 3 the shards have already landed where the routed nodes live. Don't decouple those or the transition stops reading.

### The hero's beat map

Progress is `scrollYProgress` of the `#top` track. **The holder unpins at 0.79** (`(480−100)/480`), so every beat must be finished before then — anything still visible slides away with the section instead of leaving on its own terms.

| progress | what happens |
|---|---|
| on load | eyebrow + headline land (entrance is on LOAD, not scroll — see below) |
| 0.20–0.30 | eyebrow leaves |
| 0.24–0.38 | headline's three lines exit sideways: left, right, left |
| 0.40–0.50 | sub-headline + capability badges arrive in the slot the headline vacated |
| 0.62–0.72 | they lift away |
| 0.74–1.00 | film's Act 4 plays alone; CTA returns |

CTA is visible on load, fades out `0.18–0.26`, returns `0.66–0.74`.

**Why the headline's entrance is on load and not scroll-linked:** scroll progress is 0 at the top of the page, so a scroll-driven rise leaves the headline invisible until the visitor scrolls. lv8tech.ai hit exactly this and their source comments record the fix.

### Reusable primitives added for this

Both live in `src/components/motion/ScrollReveal.tsx` and both use `useMounted()` / `useReducedMotionSafe()`:

- **`ScrollLine`** — one line of display type. Rises out of a mask on load, exits sideways on scroll. **Two nested elements**: the mask is on the OUTER element and that is what slides (an element's own overflow never clips its own travel), while the INNER one rises inside it. The `pb-[0.2em] mb-[-0.2em]` pair is required — without it the mask shears the tails off `g`/`y`/`p`.
- **`ScrollBeat`** — a block that appears and disappears over a window of progress. Emits `data-beat` for tests. Sets `pointer-events: none` when faded, or an invisible CTA stays clickable.

### Things that will bite you
- **`drawFrame(t)` in scene.html must stay a PURE function of `t`.** No accumulated state, no `Math.random()` at draw time — scroll maps directly onto `t`, so scrubbing backwards has to reproduce earlier frames exactly.
- **Never put `overflow: hidden` on the `#top` track or any ancestor.** It creates a scroll container and the sticky pin silently stops working. Use `clip`.
- **Never mount ScrubFilm inside Hero.** Hero animates its content with a `motion.div`, and a transformed element becomes the containing block for `position: fixed` descendants — the film would scroll away with the copy.
- **`FILM_SECONDS` in ScrubFilm.tsx must match `SECONDS` in generate-film.mjs.**
- **The encode needs `-g 6 -keyint_min 6 -sc_threshold 0` together.** `-g` alone is not enough; scene-change detection inserts extra keyframes and seek cost becomes unpredictable. Short GOP is the whole reason the scrub feels attached to the wheel.
- **ffmpeg honours only the LAST `-vf`** on a command line — don't put a filter in the shared encoder args or each pass's own filter gets silently dropped.
- **`page.tsx`'s wrapper must stay background-less** (`relative z-10`, no `bg-*`). An opaque wrapper paints straight over the film. `body` carries the page floor.

### Performance — measured, not guessed
`backdrop-filter` over the moving film is the most expensive thing on the page: median frame 33.3ms with it vs 16.8ms without. **`Navbar.tsx` therefore carries no `backdrop-blur`** and uses a more opaque background instead.

Do not try to fix this from CSS: `backdrop-filter: none` is the property's *initial value*, so lightningcss strips the declaration from the production bundle as a no-op — even with `!important`. And no substitute value helps, because any `backdrop-filter` still forces the backdrop snapshot. The fix has to be in the markup.

`.noise-overlay` carries `transform: translateZ(0)` to force compositor promotion; without it the static grain layer was forcing repaints of the film beneath it.

Current stress-test figures (`npm run verify:film`, which drags the playhead across the whole track at ~960px/s — harder than any real scroll):

| renderer | median frame | p90 |
|---|---|---|
| headless Chromium, software (SwiftShader) | 16.7ms | 33.4ms |
| headless Chromium, real GPU | 16.7ms | 16.7ms |
| headed Chromium | 7.0ms | 20.8ms |

**Measure with a GPU.** Headless Chromium defaults to SwiftShader, which roughly doubles p90 and makes a healthy scrub look like it is dropping frames — `verify-film.mjs` passes GPU flags for exactly this reason.

### Accessibility / low-end
`ScrubFilm` classifies each visitor and serves a **still poster with zero video bytes** for: `prefers-reduced-motion`, viewports under 900px, `saveData`, slow `effectiveType`, or `deviceMemory <= 2`. The 900px gate also sidesteps iOS Safari's unreliable handling of scripted `currentTime`. Reduced motion additionally collapses the track to `100svh` via `.hero-track`.
