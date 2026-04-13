import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";

// Default primary color in HSL components
const DEFAULT_HSL = { h: 72, s: 100, l: 50 };

// Convert a hex color like "#dc2626" to { h, s, l }
function hexToHslObj(hex: string): { h: number; s: number; l: number } {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToString(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

// Lerp with shortest-path hue interpolation
function lerpHsl(
  from: { h: number; s: number; l: number },
  to: { h: number; s: number; l: number },
  t: number
): { h: number; s: number; l: number } {
  // Shortest-path hue interpolation
  let dh = to.h - from.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;

  return {
    h: ((from.h + dh * t) % 360 + 360) % 360,
    s: from.s + (to.s - from.s) * t,
    l: from.l + (to.l - from.l) * t,
  };
}

// Ease-out cubic
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface ThemeColorContextType {
  activeColor: string | null;
  setActiveColor: (color: string | null) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType>({
  activeColor: null,
  setActiveColor: () => {},
});

export const useThemeColor = () => useContext(ThemeColorContext);

const ANIMATION_DURATION = 600; // ms

export const ThemeColorProvider = ({ children }: { children: ReactNode }) => {
  const [activeColor, setActiveColorState] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<number>(0);
  const currentHslRef = useRef<{ h: number; s: number; l: number }>({ ...DEFAULT_HSL });

  const setActiveColor = useCallback((color: string | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (color) {
      setActiveColorState(color);
    } else {
      // Small delay to prevent flicker when moving between characters
      timeoutRef.current = setTimeout(() => {
        setActiveColorState(null);
      }, 80);
    }
  }, []);

  // Animate the CSS custom properties smoothly via rAF interpolation
  useEffect(() => {
    const root = document.documentElement;
    const targetHsl = activeColor ? hexToHslObj(activeColor) : { ...DEFAULT_HSL };
    const startHsl = { ...currentHslRef.current };
    const startTime = performance.now();

    // Cancel any ongoing animation
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / ANIMATION_DURATION, 1);
      const t = easeOutCubic(rawT);

      const current = lerpHsl(startHsl, targetHsl, t);
      currentHslRef.current = current;

      const hslStr = hslToString(Math.round(current.h), Math.round(current.s), Math.round(current.l));
      root.style.setProperty("--primary", hslStr);
      root.style.setProperty("--accent", hslStr);
      root.style.setProperty("--ring", hslStr);
      root.style.setProperty("--sidebar-primary", hslStr);
      root.style.setProperty("--sidebar-ring", hslStr);

      if (rawT < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [activeColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <ThemeColorContext.Provider value={{ activeColor, setActiveColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
