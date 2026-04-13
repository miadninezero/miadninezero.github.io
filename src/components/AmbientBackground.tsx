import { useEffect, useRef } from "react";

const AmbientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // We use a spring-like smooth follow mechanism
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      // Get position relative to the scroll state and viewport
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      // Ease current position towards mouse position
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      container.style.setProperty("--x", `${currentX}px`);
      container.style.setProperty("--y", `${currentY}px`);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 
        The ambient glow. We use multiple layers for a richer "cinematic" effect.
        The first layer is a large faint glow, the second is a smaller intense glow.
      */}
      <div 
        ref={containerRef}
        className="absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(
              800px circle at var(--x, 50%) var(--y, 50%), 
              rgba(0, 255, 120, 0.15), 
              transparent 40%
            ),
            radial-gradient(
              400px circle at var(--x, 50%) var(--y, 50%), 
              rgba(0, 255, 120, 0.1), 
              transparent 50%
            )
          `
        }}
      />
    </div>
  );
};

export default AmbientBackground;
