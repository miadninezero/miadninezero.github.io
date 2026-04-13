import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const roles = ["AI Explorer", "Code Builder", "Anime Enthusiast", "CSE Student", "Creative Dev"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  const tick = useCallback(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      setDisplayText(currentRole.substring(0, displayText.length + 1));
      if (displayText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
    } else {
      setDisplayText(currentRole.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  // Floating particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <section className="relative min-h-screen bg-grid flex items-center justify-center overflow-hidden">
      {/* Cinematic vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(var(--background))_100%)] z-[1]" />

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[2] pointer-events-none film-grain" />

      {/* Radial accent glows */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl" />
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/20 z-[3]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Decorative concentric circles */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] z-[1]">
        <div className="absolute inset-0 rounded-full border border-foreground" />
        <div className="absolute inset-8 rounded-full border border-foreground" />
        <div className="absolute inset-16 rounded-full border border-foreground" />
        <div className="absolute inset-24 rounded-full border border-foreground" />
      </div>

      {/* Cinematic horizontal lines (letterbox feel) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-[3]" />

      {/* Main content — centered cinematic layout */}
      <div className="relative z-10 w-full px-6 md:px-16 text-center">
        {/* Eyebrow text */}
        <div
          className="opacity-0 animate-fade-in-up mb-6"
          style={{ animationDelay: "0s" }}
        >
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Portfolio of Miad — from Mymensingh, Bangladesh
          </span>
        </div>

        {/* Main heading — dramatic centered */}
        <h1
          className="font-display font-black uppercase text-foreground opacity-0 animate-fade-in-up py-1"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: "1",
            letterSpacing: "-0.03em",
            animationDelay: "0.15s",
          }}
        >
          BUILT FOR
        </h1>
        <h1
          className="font-display font-black uppercase opacity-0 animate-fade-in-up py-1"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: "1",
            letterSpacing: "-0.03em",
            animationDelay: "0.35s",
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(72 80% 65%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          CURIOSITY
        </h1>

        {/* Typing subtitle */}
        <div
          className="mt-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="font-body text-base md:text-xl text-muted-foreground">
            I'm Miad —{" "}
          </span>
          <span className="font-body text-base md:text-xl text-primary font-medium">
            {displayText}
          </span>
          <span
            className={`inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle transition-opacity duration-100 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-4 font-body text-sm md:text-base text-muted-foreground/60 max-w-md mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          CSE student · AI experimenter · anime enthusiast · building things for fun
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in-up z-10"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
          Scroll
        </span>
        <ChevronDown size={16} className="text-muted-foreground/50 animate-bounce-slow" />
      </div>
    </section>
  );
};

export default HeroSection;
