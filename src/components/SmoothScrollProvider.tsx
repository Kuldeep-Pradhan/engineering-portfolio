"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider
 * --------------------
 * Wraps the app in Lenis cinematic smooth scrolling and wires it together with
 * the rest of the animation system:
 *
 *  - Drives Framer Motion's `useScroll` via a single shared rAF loop.
 *  - Intercepts in-page anchor clicks (e.g. `#work`) so navigation uses Lenis
 *    momentum scrolling instead of a native jump (which would break the feel).
 *  - Exposes the Lenis instance on `window.__lenis` so components like the
 *    Footer "Back to top" button can trigger momentum scrolls.
 *  - Fully respects `prefers-reduced-motion`: when set, Lenis is NOT started
 *    and we fall back to the browser's native scrolling.
 *
 * NOTE: Do not add `scroll-behavior: smooth` in CSS — it fights Lenis. See
 * the note in globals.css.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect accessibility preference — skip Lenis entirely.
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Route in-page anchor links through Lenis for momentum scrolling.
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -96, // clear the fixed navbar
        duration: 1.4,
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
