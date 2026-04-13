import { useState, useEffect, useRef } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Phase 0: black, geometry starts
  // Phase 1: geometry intensifies, name fades in
  // Phase 2: tagline appears
  // Phase 3: everything converges
  // Phase 4: wipe out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Canvas geometry animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let startTime = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const primaryColor = { r: 200, g: 255, b: 0 }; // lime green

    const drawPolygon = (
      cx: number,
      cy: number,
      radius: number,
      sides: number,
      rotation: number,
      alpha: number,
      lineWidth: number
    ) => {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = (i * 2 * Math.PI) / sides + rotation;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawCircle = (
      cx: number,
      cy: number,
      radius: number,
      alpha: number,
      lineWidth: number,
      dashOffset?: number
    ) => {
      if (!ctx) return;
      ctx.beginPath();
      if (dashOffset !== undefined) {
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = dashOffset;
      } else {
        ctx.setLineDash([]);
      }
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number,
      lineWidth: number
    ) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawDot = (x: number, y: number, radius: number, alpha: number) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`;
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const elapsed = (Date.now() - startTime) / 1000;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const maxR = Math.min(w, h) * 0.4;
      const progress = Math.min(elapsed / 3.5, 1);

      // Outer rotating hexagon
      drawPolygon(cx, cy, maxR * (0.6 + progress * 0.4), 6, elapsed * 0.3, 0.08 + progress * 0.06, 1);

      // Inner rotating triangle
      drawPolygon(cx, cy, maxR * 0.35 * (0.5 + progress * 0.5), 3, -elapsed * 0.5, 0.1 + progress * 0.08, 1);

      // Rotating square
      drawPolygon(cx, cy, maxR * 0.5 * (0.4 + progress * 0.6), 4, elapsed * 0.4 + Math.PI / 4, 0.06 + progress * 0.05, 0.8);

      // Rotating pentagon
      drawPolygon(cx, cy, maxR * 0.75 * (0.3 + progress * 0.7), 5, -elapsed * 0.25, 0.04 + progress * 0.04, 0.6);

      // Dashed orbit circles
      drawCircle(cx, cy, maxR * 0.28, 0.06 + progress * 0.06, 0.5, elapsed * 30);
      drawCircle(cx, cy, maxR * 0.55, 0.04 + progress * 0.05, 0.5, -elapsed * 20);
      drawCircle(cx, cy, maxR * 0.82, 0.03 + progress * 0.04, 0.5, elapsed * 15);

      // Solid inner circle (pulsing)
      const pulse = Math.sin(elapsed * 3) * 0.02 + 0.08;
      drawCircle(cx, cy, maxR * 0.15, pulse + progress * 0.05, 1);

      // Cross-hairs
      const crossAlpha = 0.04 + progress * 0.03;
      const crossLen = maxR * (0.3 + progress * 0.7);
      drawLine(cx - crossLen, cy, cx + crossLen, cy, crossAlpha, 0.5);
      drawLine(cx, cy - crossLen, cx, cy + crossLen, crossAlpha, 0.5);

      // Diagonal lines
      const diagLen = maxR * 0.5 * (0.2 + progress * 0.8);
      drawLine(cx - diagLen, cy - diagLen, cx + diagLen, cy + diagLen, crossAlpha * 0.7, 0.5);
      drawLine(cx + diagLen, cy - diagLen, cx - diagLen, cy + diagLen, crossAlpha * 0.7, 0.5);

      // Orbiting dots
      const dotCount = 8;
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + elapsed * 0.8;
        const orbitR = maxR * 0.45;
        const dx = cx + orbitR * Math.cos(angle);
        const dy = cy + orbitR * Math.sin(angle);
        drawDot(dx, dy, 1.5 + progress, 0.15 + progress * 0.15);
      }

      // Secondary orbiting dots (opposite direction)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - elapsed * 0.5;
        const orbitR = maxR * 0.7;
        const dx = cx + orbitR * Math.cos(angle);
        const dy = cy + orbitR * Math.sin(angle);
        drawDot(dx, dy, 1 + progress * 0.5, 0.08 + progress * 0.1);
      }

      // Corner geometry — small rotating squares
      const corners = [
        [w * 0.12, h * 0.15],
        [w * 0.88, h * 0.15],
        [w * 0.12, h * 0.85],
        [w * 0.88, h * 0.85],
      ];
      corners.forEach(([x, y], i) => {
        const r = 20 + progress * 15;
        const rot = elapsed * (i % 2 === 0 ? 0.6 : -0.6);
        drawPolygon(x, y, r, 4, rot, 0.06 + progress * 0.04, 0.5);
      });

      // Scanning line (horizontal, sweeping)
      const scanY = cy + Math.sin(elapsed * 1.5) * maxR * 0.6;
      drawLine(cx - maxR, scanY, cx + maxR, scanY, 0.03 + progress * 0.02, 0.5);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background transition-all duration-700 ${
        phase >= 4 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Canvas geometry */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none film-grain z-10" />

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Full name: MIAD */}
        <div className="overflow-hidden">
          <h1
            className={`font-display font-black uppercase tracking-[0.15em] transition-all duration-700 ease-out ${
              phase >= 1
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              lineHeight: 1,
              background: "linear-gradient(135deg, hsl(72 100% 50%), hsl(72 80% 65%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MIAD
          </h1>
        </div>

        {/* Tagline */}
        <div
          className={`mt-4 transition-all duration-600 ease-out ${
            phase >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground/50">
            Built for curiosity
          </span>
        </div>

        {/* Loading bar */}
        <div
          className={`mt-8 w-40 h-px bg-muted/20 overflow-hidden rounded-full transition-opacity duration-500 ${
            phase >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full bg-primary/60 rounded-full transition-all ease-out"
            style={{
              width:
                phase === 0
                  ? "0%"
                  : phase === 1
                  ? "25%"
                  : phase === 2
                  ? "55%"
                  : phase === 3
                  ? "85%"
                  : "100%",
              transitionDuration: phase === 0 ? "0ms" : "700ms",
            }}
          />
        </div>
      </div>

      {/* Ambient central glow */}
      <div
        className={`absolute w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl transition-all duration-1000 z-0 ${
          phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      />
    </div>
  );
};

export default LoadingScreen;
