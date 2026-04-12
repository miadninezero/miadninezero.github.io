import { ScrollReveal } from "@/hooks/use-scroll-animation";

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-grid py-32 overflow-hidden">
      <div className="px-8 md:px-16 max-w-5xl">
        <ScrollReveal>
          <p className="font-display uppercase text-hero-sub font-bold text-foreground leading-tight">
            I'm <span className="text-primary">Miad</span> — from Mymensingh, Bangladesh.
            Currently studying{" "}
            <span className="text-muted-foreground">Computer Science & Engineering</span>{" "}
            at Daffodil International University.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-12 font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            I build things with AI just for fun — like I'm experimenting with ideas in my own
            little world, trying to turn curiosity into creations.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
