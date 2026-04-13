import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import madara from "@/assets/anime/madara.png";
import obito from "@/assets/anime/obito.png";
import itachi from "@/assets/anime/itachi.png";
import naruto from "@/assets/anime/naruto.png";
import sasuke from "@/assets/anime/sasuke.png";

const characters = [
  { name: "Madara", src: madara, color: "#dc2626", quote: "Wake up to reality... nothing ever goes as planned in this accursed world." },
  { name: "Obito", src: obito, color: "#f97316", quote: "Those who abandon their friends are worse than scum." },
  { name: "Itachi", src: itachi, color: "#ef4444", quote: "People live their lives bound by what they accept as correct and true." },
  { name: "Naruto", src: naruto, color: "#f59e0b", quote: "I'm not gonna run away. I never go back on my word!" },
  { name: "Sasuke", src: sasuke, color: "#8b5cf6", quote: "I have long since closed my eyes... my only goal is in the darkness." },
];

const AnimeCharacterGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setActiveColor } = useThemeColor();


  return (
    <div className="w-full rounded-xl overflow-hidden glass-card glow-hover border border-white/10 relative">
      {/* Subtle gradient floor */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

      {/* Character name display */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span
          className="font-display text-sm uppercase tracking-[0.3em] transition-all duration-500"
          style={{
            color: hoveredIndex !== null ? characters[hoveredIndex].color : "hsl(var(--muted-foreground))",
            opacity: hoveredIndex !== null ? 1 : 0.5,
            textShadow: hoveredIndex !== null ? `0 0 20px ${characters[hoveredIndex].color}40` : "none",
          }}
        >
          {hoveredIndex !== null ? characters[hoveredIndex].name : "Hover to Reveal"}
        </span>
      </div>

      {/* Characters row */}
      <div className="flex items-end justify-center h-[420px] px-2 pt-10 pb-4 relative">
        {characters.map((char, index) => {
          const isHovered = hoveredIndex === index;
          const someoneIsHovered = hoveredIndex !== null;
          const isDimmed = someoneIsHovered && !isHovered;

          return (
            <div
              key={char.name}
              className="relative flex-1 flex items-end justify-center transition-all duration-500 ease-out"
              style={{
                zIndex: isHovered ? 20 : 1,
                transform: isHovered
                  ? "scale(1.15) translateY(-12px)"
                  : isDimmed
                  ? "scale(0.92)"
                  : "scale(1)",
                filter: isDimmed
                  ? "brightness(0.35) saturate(0.5)"
                  : isHovered
                  ? "brightness(1.15) saturate(1.1)"
                  : "brightness(0.7)",
                marginLeft: index === 0 ? "0" : "-20px",
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setActiveColor(char.color);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setActiveColor(null);
              }}
            >
              {/* Glow behind character on hover */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full transition-all duration-500 pointer-events-none"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle, ${char.color}30 0%, transparent 70%)`
                    : "transparent",
                  filter: "blur(20px)",
                  transform: isHovered ? "scale(2.5)" : "scale(0)",
                }}
              />

              {/* Quote bubble — positioned inside card bounds */}
              <div
                className="absolute top-8 w-64 text-center pointer-events-none transition-all duration-500 z-30 drop-shadow-2xl"
                style={{
                  left: "50%",
                  transform: `translateX(${
                    index === 0 ? "-20%" 
                    : index === characters.length - 1 ? "-80%" 
                    : "-50%"
                  })${isHovered ? "" : " translateY(12px)"}`,
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <div
                  className="px-5 py-4 rounded-xl border font-display uppercase tracking-[0.1em] leading-relaxed relative overflow-hidden"
                  style={{
                    backgroundColor: "hsl(var(--background))",
                    backgroundImage: `linear-gradient(to bottom, transparent, ${char.color}15)`,
                    borderColor: `${char.color}60`,
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: "0.85rem",
                    boxShadow: `0 20px 40px -10px rgba(0,0,0,0.9), 0 0 20px -5px ${char.color}50, inset 0 0 20px ${char.color}20`
                  }}
                >
                  <span className="text-xl leading-none font-bold align-text-bottom mr-1" style={{ color: char.color, textShadow: `0 0 10px ${char.color}` }}>"</span>
                  <span style={{ textShadow: `0 0 8px ${char.color}40` }}>{char.quote}</span>
                  <span className="text-xl leading-none font-bold align-text-bottom ml-1" style={{ color: char.color, textShadow: `0 0 10px ${char.color}` }}>"</span>
                </div>
                {/* Arrow */}
                <div
                  className="w-4 h-4 mx-auto mt-[-9px] rotate-45 border-r border-b relative z-10"
                  style={{ 
                    backgroundColor: "hsl(var(--background))",
                    borderColor: `${char.color}60`,
                  }}
                />
              </div>

              <img
                src={char.src}
                alt={char.name}
                className="relative h-[340px] w-auto object-contain drop-shadow-2xl transition-all duration-500 cursor-pointer select-none"
                draggable={false}
                style={{
                  filter: isHovered ? `drop-shadow(0 0 15px ${char.color}60)` : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <span className="font-body text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
          Character Select
        </span>
      </div>
    </div>
  );
};

export default AnimeCharacterGallery;
