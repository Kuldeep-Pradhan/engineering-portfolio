"use client";

import React, { useRef, ReactNode } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

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
    const reduceMotion = useReducedMotion();
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
    const reduceMotion = useReducedMotion();

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
    const reduceMotion = useReducedMotion();
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
    const reduceMotion = useReducedMotion();
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
        return <div className={className}>{children}</div>;
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
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLParagraphElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = text.split(" ");

    if (reduceMotion) {
        return (
            <p className={cn(highlightClassName, className)}>{text}</p>
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
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <span className="relative mr-[0.25em] mt-[0.1em]">
            <motion.span style={{ opacity }} className={highlightClassName}>
                {children}
            </motion.span>
        </span>
    );
}
