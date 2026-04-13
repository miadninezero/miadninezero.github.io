import { useEffect, useRef, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef<CursorPosition>({ x: 0, y: 0 });
  const ringPos = useRef<CursorPosition>({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (no touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track hoverable elements
    const onElementEnter = () => setIsHovering(true);
    const onElementLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Observe interactive elements
    const interactiveSelectors = "a, button, [role='button'], input, textarea, select";
    const addListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener("mouseenter", onElementEnter);
        el.addEventListener("mouseleave", onElementLeave);
      });
    };

    // Initial + observe DOM changes
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth ring follow animation
    const animate = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [isVisible, isHovering]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-200 ${
            isHovering ? "w-2 h-2 opacity-100" : "w-1.5 h-1.5 opacity-90"
          }`}
        />
      </div>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovering
              ? "w-10 h-10 border-primary/60 bg-primary/5"
              : "w-7 h-7 border-primary/30"
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
