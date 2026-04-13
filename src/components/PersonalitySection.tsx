import { ScrollReveal } from "@/hooks/use-scroll-animation";
import CinematicSection, { WordReveal, PhaseAnimate } from "@/components/CinematicSection";
import AnimeCharacterGallery from "@/components/AnimeCharacterGallery";

const animeList = [
  { title: "Naruto", desc: "The ninja who never gives up" },
  { title: "Jujutsu Kaisen", desc: "Cursed energy battles" },
  { title: "Scissor Seven", desc: "Underrated comedic assassin" },
  { title: "Nichijou", desc: "Everyday absurdity at its finest" },
  { title: "One Punch Man", desc: "Hero for fun, bored of winning" },
  { title: "Sakamoto Days", desc: "Retired hitman, still lethal" },
  { title: "To Be Hero X", desc: "Surreal Chinese animation gem" },
  { title: "Death Note", desc: "The god complex thriller" },
];

const PersonalitySection = () => {
  return (
    <section id="personality" className="relative">
      {/* Cinematic pinned "Beyond The Code" block */}
      <CinematicSection scrollMultiplier={2.5} className="bg-primary relative">
        {(progress) => (
          <div className="h-full flex items-center justify-center relative overflow-hidden">
            {/* Decorative diagonal lines */}
            <div className="absolute inset-0 opacity-[0.08]">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)",
                  color: "hsl(var(--primary-foreground))",
                }}
              />
            </div>

            <PhaseAnimate progress={progress} className="text-center px-6 md:px-16 relative z-10">
              <h2
                className="font-display font-black uppercase text-primary-foreground"
                style={{
                  fontSize: "clamp(3rem, 10vw, 8rem)",
                  lineHeight: "0.9",
                  letterSpacing: "-0.02em",
                }}
              >
                <WordReveal
                  text="BEYOND THE CODE"
                  progress={progress}
                  startAt={0.2}
                  endAt={0.42}
                  className="text-primary-foreground"
                />
              </h2>
              <p className="mt-6 font-body text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
                <WordReveal
                  text="I'm someone who gets lost in ideas more than routines. When I'm not coding or thinking about AI, I'm usually watching anime or reading manga — stories that feel like they're bigger than reality itself."
                  progress={progress}
                  startAt={0.32}
                  endAt={0.58}
                />
              </p>
            </PhaseAnimate>
          </div>
        )}
      </CinematicSection>

      {/* Anime / manga showcase — regular scroll reveal */}
      <div className="bg-grid py-20 px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal>
            <div>
              <h3 className="font-display uppercase text-3xl md:text-5xl font-bold text-foreground mb-8">
                Worlds I Live In
              </h3>
              <div className="flex flex-wrap gap-2">
                {animeList.map((anime, index) => (
                  <div key={anime.title} className="group relative">
                    <span
                      className="inline-block border border-border text-foreground font-body text-sm px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-primary/10 opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.06}s` }}
                    >
                      {anime.title}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20">
                      <span className="font-body text-xs text-muted-foreground">
                        {anime.desc}
                      </span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45 -mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-body text-muted-foreground leading-relaxed">
                I also read the manga versions whenever I can — it feels like stepping deeper
                into those worlds. There's something about static frames telling dynamic stories
                that really speaks to me.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <AnimeCharacterGallery />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PersonalitySection;
