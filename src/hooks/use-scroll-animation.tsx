import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bidirectional: show when entering, hide when leaving
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

type SlideDirection = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: SlideDirection;
  blur?: boolean;
}

const directionOffset: Record<SlideDirection, { x: string; y: string }> = {
  up: { x: "0", y: "30px" },
  down: { x: "0", y: "-30px" },
  left: { x: "30px", y: "0" },
  right: { x: "-30px", y: "0" },
};

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = true,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const offset = directionOffset[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : blur ? "blur(6px)" : "blur(0px)",
        transform: isVisible
          ? "translate(0, 0)"
          : `translate(${offset.x}, ${offset.y})`,
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
};
