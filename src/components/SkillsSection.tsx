import { ScrollReveal } from "@/hooks/use-scroll-animation";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    description: "Exploring the frontier of artificial intelligence",
    skills: [
      { name: "ChatGPT / GPT APIs", level: "Advanced" },
      { name: "Prompt Engineering", level: "Advanced" },
      { name: "Lovable AI", level: "Intermediate" },
      { name: "AI-Powered Tools", level: "Advanced" },
      { name: "Python (ML)", level: "Learning" },
    ],
    accent: "from-primary/20 to-primary/5",
  },
  {
    title: "Web Development",
    description: "Building modern, responsive interfaces",
    skills: [
      { name: "React", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Vite", level: "Intermediate" },
      { name: "HTML / CSS", level: "Advanced" },
    ],
    accent: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Tools & Workflow",
    description: "Everyday tools that power my work",
    skills: [
      { name: "Git & GitHub", level: "Intermediate" },
      { name: "VS Code", level: "Advanced" },
      { name: "Figma", level: "Learning" },
      { name: "Terminal / CLI", level: "Intermediate" },
      { name: "Vercel / Netlify", level: "Intermediate" },
    ],
    accent: "from-purple-500/20 to-purple-500/5",
  },
];

const levelColors: Record<string, string> = {
  Advanced: "text-primary",
  Intermediate: "text-blue-400",
  Learning: "text-purple-400",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative bg-grid py-24 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 cinematic-divider" />

      <div className="px-6 md:px-16 max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/60 block mb-4">
              My Toolkit
            </span>
            <h2 className="font-display font-black uppercase text-foreground" style={{
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.01em",
            }}>
              What I Work With
            </h2>
            <p className="mt-4 font-body text-muted-foreground text-lg max-w-xl">
              Always learning, always experimenting. Here's my current toolkit —
              from AI exploration to web development.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.title} delay={catIndex * 0.12}>
              <div className="glass-card glow-hover rounded-xl p-6 h-full">
                {/* Category header */}
                <div
                  className={`w-full h-1 rounded-full bg-gradient-to-r ${category.accent} mb-5`}
                />
                <h3 className="font-display text-xl font-bold uppercase text-foreground mb-1">
                  {category.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  {category.description}
                </p>

                {/* Skills list */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between group"
                    >
                      <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <span
                        className={`font-body text-xs uppercase tracking-wider ${
                          levelColors[skill.level] || "text-muted-foreground"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
