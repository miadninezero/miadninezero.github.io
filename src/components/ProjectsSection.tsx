import { Github, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const projects = [
  {
    title: "Cinematic Curiosity",
    description:
      "This very portfolio — a personal space built with AI, designed to reflect who I am. Dark-themed, grid-backed, and lime-accented. My first real project, and the start of something bigger.",
    tags: ["React", "Tailwind", "Vite", "AI-Generated"],
    github: "https://github.com/miadninezero",
    live: "#",
    featured: true,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-0 right-0 cinematic-divider" />

      <div className="relative z-10 px-6 md:px-16 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/60 block mb-4">
              My Work
            </span>
            <h2 className="font-display font-black uppercase text-foreground" style={{
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.01em",
            }}>
              Things I've Built
            </h2>
            <p className="mt-4 font-body text-muted-foreground text-lg max-w-xl">
              Every journey starts somewhere. This is my first build — more are on the way.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div
                className={`glass-card glow-hover rounded-xl p-6 h-full flex flex-col group transition-all duration-500 ${
                  project.featured ? "gradient-border" : ""
                }`}
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="mb-3">
                    <span className="inline-block bg-primary/10 text-primary font-body text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                      ★ Featured
                    </span>
                  </div>
                )}

                {/* Project title */}
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-body text-muted-foreground text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs text-muted-foreground border border-border px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github size={16} />
                      <span>Source</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
