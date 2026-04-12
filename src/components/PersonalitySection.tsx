import collageImage from "@/assets/creative-collage.jpg";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const animeList = [
  "Naruto",
  "Jujutsu Kaisen",
  "Scissor Seven",
  "Nichijou",
  "One Punch Man",
  "Sakamoto Days",
  "To Be Hero X",
  "Death Note",
];

const PersonalitySection = () => {
  return (
    <section id="personality" className="relative overflow-hidden">
      {/* Lime accent block */}
      <div className="bg-primary py-20 px-8 md:px-16">
        <ScrollReveal>
          <h2 className="font-display font-black uppercase text-massive text-primary-foreground text-center">
            BEYOND
            <br />
            THE CODE
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-6 font-body text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto text-center leading-relaxed">
            I'm someone who gets lost in ideas more than routines. When I'm not coding or
            thinking about AI, I'm usually watching anime or reading manga — stories that feel
            like they're bigger than reality itself.
          </p>
        </ScrollReveal>
      </div>

      {/* Anime / manga showcase */}
      <div className="bg-grid py-16 px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <ScrollReveal>
            <div>
              <h3 className="font-display uppercase text-3xl md:text-5xl font-bold text-foreground mb-8">
                Worlds I Live In
              </h3>
              <div className="flex flex-wrap gap-2">
                {animeList.map((title) => (
                  <span
                    key={title}
                    className="border border-border text-foreground font-body text-sm px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {title}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-body text-muted-foreground leading-relaxed">
                I also read the manga versions whenever I can — it feels like stepping deeper
                into those worlds.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="rounded-lg overflow-hidden">
              <img
                src={collageImage}
                alt="Creative collage of anime and code"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PersonalitySection;
