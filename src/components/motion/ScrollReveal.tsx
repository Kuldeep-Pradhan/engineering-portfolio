"use client";

import React, { useRef, useState, ReactNode } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion,
    useMotionValueEvent,
    type MotionStyle,
    type MotionValue,
    type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

/* ------------------------------------------------------------------ */
/* Shared easing — a smooth, slightly cinematic curve                 */
/* ------------------------------------------------------------------ */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const emptySubscribe = () => () => {};

/**
 * useMounted — returns false during SSR and the first client render, then
 * true after mount. Used to gate scroll-driven motion-value styles so the
 * server-rendered HTML matches the initial client render (no hydration
 * mismatch). Scroll transforms are applied only once we're safely on the
 * client and can actually measure scroll position.
 */
export function useMounted() {
    return React.useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

/**
 * useReducedMotionSafe — SSR-safe `prefers-reduced-motion`.
 *
 * framer-motion's `useReducedMotion()` returns false during SSR (there is no
 * `matchMedia` on the server) but the REAL value on the client's very first
 * render. So any component that branches on it *during render* emits different
 * markup on the server than on the client, and React reports a hydration
 * failure. It only reproduces on machines that actually have the OS setting
 * enabled, which makes it very easy to ship by accident.
 *
 * This returns false until after mount, so the first client render always
 * matches the server. Reduced-motion visitors get the static treatment one
 * render later — imperceptible, and it costs nothing.
 *
 * Use THIS, not `useReducedMotion()`, anywhere the value affects what you
 * render. The raw hook is fine inside effects and event handlers.
 */
export function useReducedMotionSafe() {
    const mounted = useMounted();
    const reduce = useReducedMotion();
    return mounted ? !!reduce : false;
}


type Direction = "up" | "down" | "left" | "right" | "none";

function getOffset(direction: Direction, distance: number) {
    switch (direction) {
        case "up":
            return { x: 0, y: distance };
        case "down":
            return { x: 0, y: -distance };
        case "left":
            return { x: distance, y: 0 };
        case "right":
            return { x: -distance, y: 0 };
        case "none":
        default:
            return { x: 0, y: 0 };
    }
}

/* ================================================================== */
/* Reveal                                                             */
/* A single scroll-triggered reveal: fades + slides (+ optional blur) */
/* into place the first time it enters the viewport.                  */
/* ================================================================== */
interface RevealProps {
    children: ReactNode;
    className?: string;
    direction?: Direction;
    /** Pixels to translate from. */
    distance?: number;
    /** Seconds before the animation starts (good for manual sequencing). */
    delay?: number;
    duration?: number;
    /** Apply a subtle blur-in for extra depth. */
    blur?: boolean;
    /** Replay every time it enters the viewport instead of only once. */
    once?: boolean;
    /** Render as a different element (e.g. "li", "span", "section"). */
    as?: keyof typeof motion;
}

export function Reveal({
    children,
    className,
    direction = "up",
    distance = 32,
    delay = 0,
    duration = 0.7,
    blur = false,
    once = true,
    as = "div",
}: RevealProps) {
    const reduceMotion = useReducedMotionSafe();
    const MotionTag = motion[as] as typeof motion.div;

    if (reduceMotion) {
        const StaticTag = as as React.ElementType;
        return <StaticTag className={className}>{children}</StaticTag>;
    }

    const offset = getOffset(direction, distance);

    return (
        <MotionTag
            className={className}
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y,
                filter: blur ? "blur(10px)" : "blur(0px)",
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
            }}
            viewport={{ once, margin: "-80px" }}
            transition={{ duration, delay, ease: EASE_OUT }}
        >
            {children}
        </MotionTag>
    );
}

/* ================================================================== */
/* Stagger + StaggerItem                                              */
/* A container that reveals its <StaggerItem> children one after      */
/* another as the group scrolls into view.                            */
/* ================================================================== */
interface StaggerProps {
    children: ReactNode;
    className?: string;
    /** Delay between each child, in seconds. */
    stagger?: number;
    /** Delay before the first child starts. */
    delayChildren?: number;
    once?: boolean;
}

export function Stagger({
    children,
    className,
    stagger = 0.12,
    delayChildren = 0,
    once = true,
}: StaggerProps) {
    const reduceMotion = useReducedMotionSafe();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const container: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: stagger,
                delayChildren,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once, margin: "-80px" }}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    direction?: Direction;
    distance?: number;
    as?: keyof typeof motion;
}

export function StaggerItem({
    children,
    className,
    direction = "up",
    distance = 28,
    as = "div",
}: StaggerItemProps) {
    const reduceMotion = useReducedMotionSafe();
    const MotionTag = motion[as] as typeof motion.div;

    if (reduceMotion) {
        const StaticTag = as as React.ElementType;
        return <StaticTag className={className}>{children}</StaticTag>;
    }

    const offset = getOffset(direction, distance);

    const item: Variants = {
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.6, ease: EASE_OUT },
        },
    };

    return (
        <MotionTag className={className} variants={item}>
            {children}
        </MotionTag>
    );
}

/* ================================================================== */
/* Parallax                                                           */
/* Translates children along an axis as the element scrolls through   */
/* the viewport, creating depth. `speed` > 0 moves slower than scroll  */
/* (background feel); negative values move against the scroll.         */
/* ================================================================== */
interface ParallaxProps {
    children: ReactNode;
    className?: string;
    /** Max translation in pixels across the full scroll range. */
    speed?: number;
    axis?: "x" | "y";
}

export function Parallax({
    children,
    className,
    speed = 60,
    axis = "y",
}: ParallaxProps) {
    const reduceMotion = useReducedMotionSafe();
    const mounted = useMounted();
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Move from +speed to -speed as the element travels through the viewport.
    const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
    const value = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

    if (reduceMotion) {
        // The ref must still be attached even though nothing moves: useScroll
        // above is holding it as its target, and an unattached target ref makes
        // framer-motion warn "Target ref is defined but not hydrated".
        return (
            <div ref={ref} className={className}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            // Only bind the scroll-driven value after mount to avoid a
            // server/client hydration mismatch on the inline style.
            style={
                mounted
                    ? axis === "y"
                        ? { y: value }
                        : { x: value }
                    : undefined
            }
        >
            {children}
        </motion.div>
    );
}


/* ================================================================== */
/* WordReveal                                                         */
/* Heavy scroll-driven typography: each word fades from dim -> bright  */
/* as the block scrolls through the viewport, mirroring the cinematic  */
/* headline reveals on lv8tech.ai.                                     */
/* ================================================================== */
interface WordRevealProps {
    text: string;
    className?: string;
    /** Tailwind color class for the fully-revealed state. */
    highlightClassName?: string;
}

export function WordReveal({
    text,
    className,
    highlightClassName = "text-white",
}: WordRevealProps) {
    const reduceMotion = useReducedMotionSafe();
    const ref = useRef<HTMLParagraphElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = text.split(" ");

    if (reduceMotion) {
        // ref stays attached — see the note in Parallax.
        return (
            <p ref={ref} className={cn(highlightClassName, className)}>
                {text}
            </p>
        );
    }

    return (
        <p ref={ref} className={cn("flex flex-wrap", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word
                        key={i}
                        progress={scrollYProgress}
                        range={[start, end]}
                        highlightClassName={highlightClassName}
                    >
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

function Word({
    children,
    progress,
    range,
    highlightClassName,
}: {
    children: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
    range: [number, number];
    highlightClassName: string;
}) {
    const opacity = useTransform(progress, range, [0.35, 1]);
    return (
        <span className="relative mt-[0.1em]">
            {/*
              opacity goes through --beat-opacity, not the style prop directly:
              a scroll-linked opacity MotionValue is accelerated to WAAPI and in
              this setup sticks on its first keyframe forever (see globals.css
              .beat-fade for the full write-up). Custom properties are never
              accelerated, so framer-motion writes them every frame.
              The trailing {children} {" "} space is real text, not CSS margin —
              words spaced purely by margin collapse to one word for screen
              readers and crawlers.
            */}
            <motion.span
                className={cn("beat-fade", highlightClassName)}
                style={{ "--beat-opacity": opacity } as MotionStyle}
            >
                {children}
            </motion.span>
            <span style={{ whiteSpace: "pre" }}> </span>
        </span>
    );
}

/* ================================================================== */
/* ScrollLine                                                         */
/* One line of display type for a scroll-choreographed sequence.      */
/* Rises out of a mask ON LOAD, then exits SIDEWAYS on scroll.        */
/* ================================================================== */
/**
 * Why the entrance is on load and not scroll-linked:
 *
 * Scroll progress is 0 at the top of the page, so a scroll-driven rise would
 * leave the headline hidden until the visitor scrolled. lv8tech.ai hit exactly
 * this and their source comments record the fix — the first heading plays on
 * load; only later beats are keyed to scroll. We do the same.
 *
 * Why two nested elements:
 *
 * The mask that makes the rise look good would CLIP a sideways exit. So the
 * mask lives on the OUTER element and that is what slides — an element's own
 * overflow never clips its own travel — while the INNER element does the
 * vertical rise inside it.
 */
interface ScrollLineProps {
    children: ReactNode;
    /** Usually `scrollYProgress` of the hero track. */
    progress: MotionValue<number>;
    /** [start, end] of the sideways exit, in progress units. */
    exitRange: [number, number];
    /** Pixels travelled on exit. Negative goes left. */
    exitX?: number;
    /** Seconds before this line's entrance starts, for staggering. */
    delay?: number;
    className?: string;
}

export function ScrollLine({
    children,
    progress,
    exitRange,
    exitX = -300,
    delay = 0,
    className,
}: ScrollLineProps) {
    const reduceMotion = useReducedMotionSafe();
    const mounted = useMounted();

    const x = useTransform(progress, exitRange, [0, exitX]);
    const opacity = useTransform(progress, exitRange, [1, 0]);

    // Scroll-linked styles bind only after mount, per AI_CONTEXT.md.
    const bind = !reduceMotion && mounted;

    const isVideoReady = useAppStore((state) => state.isVideoReady);

    return (
        <motion.span
            // The .2em of slack under the baseline is not optional: without it
            // an overflow mask shears the tails off g, y and p.
            // beat-fade reads opacity from --beat-opacity — see globals.css for
            // why opacity cannot be set directly here.
            className={cn("block overflow-clip pb-[0.2em] mb-[-0.2em]", bind && "beat-fade", className)}
            style={bind ? ({ x, "--beat-opacity": opacity } as MotionStyle) : undefined}
        >
            <motion.span
                initial={reduceMotion ? { y: 0 } : { y: "110%" }}
                animate={isVideoReady ? { y: 0 } : { y: "110%" }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: delay,
                }}
                className="block"
            >
                {children}
            </motion.span>
        </motion.span>
    );
}

/* ================================================================== */
/* ScrollBeat                                                         */
/* A block that appears and disappears over a window of scroll        */
/* progress — used to swap the hero's statements in and out.          */
/* ================================================================== */
interface ScrollBeatProps {
    children: ReactNode;
    progress: MotionValue<number>;
    /**
     * [start, end] over which the block rises and fades in. OMIT this if the
     * block should already be visible at progress 0.
     *
     * Do NOT try to fake that with a negative range like [-0.05, 0]. Every stop
     * must lie within [0, 1]: framer-motion hands scroll-linked transforms to
     * the Web Animations API as scroll-driven animations, where the input range
     * becomes keyframe OFFSETS. A negative offset makes Element.animate() throw
     * "Offsets must be monotonically non-decreasing", which takes down the whole
     * React tree — the page renders as a blank body with no error boundary hit.
     */
    inRange?: [number, number];
    /** [start, end] over which it lifts and fades out. Omit to stay put. */
    outRange?: [number, number];
    /** Pixels it rises from on entry, and lifts to on exit. */
    y?: number;
    className?: string;
    /** Emitted as `data-beat`, so tests can assert this beat's visibility
     *  window without depending on brittle CSS selectors. */
    dataBeat?: string;
}

export function ScrollBeat({
    children,
    progress,
    inRange,
    outRange,
    y = 34,
    className,
    dataBeat,
}: ScrollBeatProps) {
    const reduceMotion = useReducedMotionSafe();
    const mounted = useMounted();

    let stops: number[];
    let opacityStops: number[];
    let yStops: number[];

    if (inRange && outRange) {
        stops = [inRange[0], inRange[1], outRange[0], outRange[1]];
        opacityStops = [0, 1, 1, 0];
        yStops = [y, 0, 0, -y];
    } else if (inRange) {
        stops = [inRange[0], inRange[1]];
        opacityStops = [0, 1];
        yStops = [y, 0];
    } else if (outRange) {
        stops = [outRange[0], outRange[1]];
        opacityStops = [1, 0];
        yStops = [0, -y];
    } else {
        stops = [0, 1];
        opacityStops = [1, 1];
        yStops = [0, 0];
    }

    const opacity = useTransform(progress, stops, opacityStops);
    const yv = useTransform(progress, stops, yStops);

    const [interactive, setInteractive] = useState(true);
    useMotionValueEvent(opacity, "change", (o) => {
        const next = o >= 0.05;
        setInteractive((prev) => (prev === next ? prev : next));
    });

    const bind = !reduceMotion && mounted;
    
    // Server / pre-hydration state: if it fades in on scroll, it should start hidden.
    const ssrOpacity = inRange ? 0 : 1;
    const ssrY = inRange ? y : 0;
    
    const isPointerEventsNone = bind ? !interactive : ssrOpacity === 0;

    return (
        <motion.div
            className={cn(className, "beat-fade", isPointerEventsNone && "pointer-events-none")}
            data-beat={dataBeat}
            style={
                bind
                    ? ({ y: yv, "--beat-opacity": opacity } as MotionStyle)
                    : ({ "--beat-opacity": ssrOpacity, transform: `translateY(${ssrY}px)` } as React.CSSProperties)
            }
        >
            {children}
        </motion.div>
    );
}
