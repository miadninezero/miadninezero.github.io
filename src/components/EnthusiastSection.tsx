import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { Brain, Code2, Clapperboard, Gamepad2, BookOpen, Sparkles } from "lucide-react";

const enthusiasms = [
  {
    icon: Brain,
    title: "AI & Automation",
    description: "Fascinated by how machines learn and create. I spend hours experimenting with AI tools, building prompts, and imagining what's next.",
    accent: "from-primary/30 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Clapperboard,
    title: "Anime & Manga",
    description: "Stories that feel bigger than reality — from Naruto's resolve to Death Note's mind games. Anime shaped how I think about storytelling.",
    accent: "from-rose-500/30 to-rose-500/5",
    iconColor: "text-rose-400",
  },
  {
    icon: Code2,
    title: "Web Building",
    description: "There's something magical about turning code into something visual. I love the moment a design comes alive in the browser.",
    accent: "from-blue-500/30 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "From open-world adventures to competitive matches — gaming is where I unwind, strategize, and sometimes rage-quit.",
    accent: "from-violet-500/30 to-violet-500/5",
    iconColor: "text-violet-400",
  },
  {
    icon: BookOpen,
    title: "Learning",
    description: "Always a student at heart. Whether it's a new framework, a random Wikipedia rabbit hole, or a YouTube deep-dive at 3AM.",
    accent: "from-amber-500/30 to-amber-500/5",
    iconColor: "text-amber-400",
  },
  {
    icon: Sparkles,
    title: "Creative Experiments",
    description: "I like making things just to see what happens — mixing AI with design, testing weird ideas, and breaking things to learn.",
    accent: "from-emerald-500/30 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
];

const EnthusiastSection = () => {
  return (
    <section id="enthusiast" className="relative py-24 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Cinematic horizontal rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="relative z-10 px-6 md:px-16 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/60 block mb-4">
              What Drives Me
            </span>
            <h2 className="font-display font-black uppercase text-foreground" style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: "0.9",
              letterSpacing: "-0.02em",
            }}>
              Things I'm
              <br />
              <span className="text-gradient-fade">Enthusiastic About</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {enthusiasms.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <div className="glass-card glow-hover rounded-xl p-6 h-full group transition-all duration-500 hover:-translate-y-1">
                  {/* Icon + gradient bar */}
                  <div className={`w-full h-0.5 rounded-full bg-gradient-to-r ${item.accent} mb-5`} />
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 ${item.iconColor} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnthusiastSection;
