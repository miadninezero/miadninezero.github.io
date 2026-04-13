import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Hook that calculates scroll progress (0-1) for a pinned section.
 * The section stays pinned while the tall wrapper scrolls past.
 */
export const useScrollProgress = (scrollMultiplier = 2) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const wrapperHeight = wrapperRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const stickyTravel = wrapperHeight - viewportHeight;

    if (stickyTravel <= 0) {
      setProgress(rect.top <= 0 ? 1 : 0);
      return;
    }

    // How far the wrapper has scrolled past the top
    const scrolled = -rect.top;

    if (scrolled <= 0) {
      setProgress(0);
    } else if (scrolled >= stickyTravel) {
      setProgress(1);
    } else {
      setProgress(scrolled / stickyTravel);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { wrapperRef, progress, scrollMultiplier };
};
