import { Github, Mail, Facebook, Phone } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const socialLinks = [
  {
    href: "mailto:miadninezero@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "tel:+8801608229699",
    icon: Phone,
    label: "Phone",
  },
  {
    href: "https://github.com/miadninezero",
    icon: Github,
    label: "GitHub",
    external: true,
  },
  {
    href: "https://facebook.com/profile.php?id=61577385089134",
    icon: Facebook,
    label: "Facebook",
    external: true,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/40 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 cinematic-divider" />

      {/* Decorative circles */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]">
        <div className="absolute inset-0 rounded-full border border-foreground" />
        <div className="absolute inset-10 rounded-full border border-foreground" />
        <div className="absolute inset-20 rounded-full border border-foreground" />
      </div>

      <div className="relative z-10 px-6 md:px-16 text-center">
        <ScrollReveal>
          <h2 className="font-display font-black uppercase text-hero-sub text-foreground">
            Let's Connect
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 font-body text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            This website is just a small space I built for fun — shaped with curiosity, AI,
            and a bit of imagination. If you want to talk about AI, anime, or building cool stuff — reach out.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:miadninezero@gmail.com"
              className="flex items-center gap-3 bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail size={18} />
              Email Me
            </a>
            <a
              href="tel:+8801608229699"
              className="flex items-center gap-3 border border-border text-foreground font-display text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={18} />
              Call Me
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex items-center justify-center gap-8">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group relative text-muted-foreground hover:text-primary transition-all duration-300"
                  aria-label={link.label}
                >
                  {/* Glow ring */}
                  <div className="absolute inset-0 -m-3 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 scale-0 group-hover:scale-100" />
                  <Icon size={22} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
