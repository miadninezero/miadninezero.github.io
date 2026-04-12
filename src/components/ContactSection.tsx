import { Github, Mail, Facebook } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-grid py-32 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]">
        <div className="absolute inset-0 rounded-full border border-foreground" />
        <div className="absolute inset-10 rounded-full border border-foreground" />
        <div className="absolute inset-20 rounded-full border border-foreground" />
      </div>

      <div className="relative z-10 px-8 md:px-16 text-center">
        <ScrollReveal>
          <h2 className="font-display font-black uppercase text-hero-sub text-foreground">
            Let's Connect
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 font-body text-muted-foreground text-lg max-w-lg mx-auto">
            This website is just a small space I built for fun — shaped with curiosity, AI,
            and a bit of imagination.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:miadninezero@gmail.com"
              className="flex items-center gap-3 bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:brightness-110 transition-all"
            >
              <Mail size={18} />
              Get In Touch
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex items-center justify-center gap-8">
            <a
              href="mailto:miadninezero@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
            <a
              href="https://github.com/miadninezero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://facebook.com/profile.php?id=61577385089134"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
