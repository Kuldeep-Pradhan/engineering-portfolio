import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ScrubFilm from "@/components/ScrubFilm";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kuldeeppradhan.in"),
  title: "Kuldeep Pradhan | Full Stack Engineer — Node.js & Fintech Systems",
  description:
    "Full Stack Engineer with 4+ years of experience specializing in Node.js microservices, 2,500+ TPS fintech systems, and React/Next.js frontends.",
  keywords: [
    "Kuldeep Pradhan",
    "Full Stack Engineer",
    "Node.js",
    "React.js",
    "Next.js",
    "Microservices",
    "Fintech Systems",
    "AWS",
    "GCP",
    "TypeScript",
  ],
  authors: [{ name: "Kuldeep Pradhan" }],
  openGraph: {
    title: "Kuldeep Pradhan | Full Stack Engineer — Node.js & Fintech Systems",
    description:
      "Engineering 2,500+ TPS microservices, RBI-compliant authentication, and enterprise React/Next.js dashboards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#08090C] text-[#F2F2F5] min-h-screen relative antialiased`}
        suppressHydrationWarning
      >
        {/*
          Hero scrub film — a fixed layer whose playhead is the scroll position.
          Mounted here rather than inside Hero so it is never trapped by an
          ancestor transform: Hero animates its content with a motion.div, and
          a transformed element becomes the containing block for position:fixed
          descendants, which would make the film scroll away with the copy.
          It fades itself out once the #top track is spent.
        */}
        <ScrubFilm trackId="top" />

        {/* Background Film Grain */}
        <div
          className="fixed inset-0 pointer-events-none z-50 noise-overlay opacity-40"
          aria-hidden="true"
        />

        {/* Ambient Top Glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] ambient-gold-radial pointer-events-none z-0"
          aria-hidden="true"
        />

        {children}
      </body>
    </html>
  );
}
