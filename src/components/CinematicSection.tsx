import { ReactNode, useMemo } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

interface CinematicSectionProps {
  children: (progress: number) => ReactNode;
  className?: string;
  scrollMultiplier?: number;
  id?: string;
}

/**
 * A section that pins at the top and exposes scroll progress (0-1) to children.
 * The wrapper is tall (100vh × scrollMultiplier) and the content is sticky.
 */
const CinematicSection = ({
  children,
  className = "",
  scrollMultiplier = 2,
  id,
}: CinematicSectionProps) => {
  const { wrapperRef, progress } = useScrollProgress(scrollMultiplier);

  return (
    <div
      ref={wrapperRef}
      id={id}
      style={{ height: `${100 * scrollMultiplier}vh` }}
      className="relative"
    >
      <div className={`sticky top-0 h-screen overflow-hidden ${className}`}>
        {children(progress)}
      </div>
    </div>
  );
};

export default CinematicSection;

/* ─── Helper: Word-by-word reveal ─── */

interface WordRevealProps {
  text: string;
  progress: number;
  startAt?: number;
  endAt?: number;
  className?: string;
  highlightClass?: string;
}

/**
 * Reveals text word-by-word based on scroll progress.
 * Each word fades in and slides up with a stagger.
 */
export const WordReveal = ({
  text,
  progress,
  startAt = 0,
  endAt = 1,
  className = "",
  highlightClass,
}: WordRevealProps) => {
  const words = useMemo(() => text.split(" "), [text]);
  const range = endAt - startAt;
  const localProgress = Math.max(0, Math.min(1, (progress - startAt) / range));

  return (
    <span className={className}>
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        const wordProgress = Math.max(
          0,
          Math.min(1, (localProgress - wordStart) / (wordEnd - wordStart))
        );

        // Check if this word should be highlighted
        const isHighlight = highlightClass && (
          word.toLowerCase().includes("miad") ||
          word.toLowerCase().includes("computer") ||
          word.toLowerCase().includes("science") ||
          word.toLowerCase().includes("engineering")
        );

        return (
          <span
            key={`${word}-${i}`}
            className={`inline-block ${isHighlight ? highlightClass : ""}`}
            style={{
              opacity: wordProgress,
              transform: `translateY(${(1 - wordProgress) * 25}px)`,
              filter: `blur(${(1 - wordProgress) * 4}px)`,
              transition: "none",
              marginRight: "0.3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

/* ─── Helper: Gradient shimmer text ─── */

interface GradientShimmerProps {
  children: ReactNode;
  progress: number;
  startAt?: number;
  endAt?: number;
  className?: string;
}

/**
 * Applies an animated gradient shimmer over text based on scroll progress.
 */
export const GradientShimmer = ({
  children,
  progress,
  startAt = 0.5,
  endAt = 0.75,
  className = "",
}: GradientShimmerProps) => {
  const range = endAt - startAt;
  const localProgress = Math.max(0, Math.min(1, (progress - startAt) / range));

  // Scale effect
  const scale = 1 + localProgress * 0.04;

  // Gradient position sweeps across
  const gradientPos = -100 + localProgress * 300;

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale})`,
        transition: "none",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        {children}
        {/* Shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, transparent ${gradientPos - 30}%, hsl(72 100% 50% / 0.12) ${gradientPos}%, transparent ${gradientPos + 30}%)`,
            pointerEvents: "none",
            mixBlendMode: "screen",
            borderRadius: "inherit",
          }}
        />
      </div>
    </div>
  );
};

/* ─── Helper: Phase-based opacity/transform ─── */

interface PhaseAnimateProps {
  children: ReactNode;
  progress: number;
  className?: string;
}

/**
 * Handles the full 4-phase lifecycle:
 * Phase 1 (0-20%):    Fade in, scale from 1.1 to 1
 * Phase 2 (20-50%):   Content visible (children control their own reveal)
 * Phase 3 (50-75%):   Enhancement phase (children control shimmer)
 * Phase 4 (75-100%):  Fade out, move up, scale to 1.1
 */
export const PhaseAnimate = ({
  children,
  progress,
  className = "",
}: PhaseAnimateProps) => {
  // Phase 1: Fade in (0 → 0.2)
  let opacity: number;
  let translateY: number;
  let scale: number;
  let blur: number;

  if (progress <= 0.2) {
    // Phase 1: Enter
    const p = progress / 0.2;
    opacity = p;
    translateY = 0;
    scale = 1.08 - p * 0.08;
    blur = (1 - p) * 8;
  } else if (progress <= 0.75) {
    // Phase 2 & 3: Fully visible
    opacity = 1;
    translateY = 0;
    scale = 1;
    blur = 0;
  } else {
    // Phase 4: Exit
    const p = (progress - 0.75) / 0.25;
    opacity = 1 - p;
    translateY = -p * 40;
    scale = 1 + p * 0.08;
    blur = p * 6;
  }

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        transition: "none",
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
};
