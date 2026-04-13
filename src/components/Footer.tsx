import { ArrowUp, Github, Mail, Facebook, Phone } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border px-6 md:px-16 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="font-display text-foreground text-lg font-bold uppercase tracking-wider">
          <span className="text-primary">M</span>IAD
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:miadninezero@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="tel:+8801608229699"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Phone"
          >
            <Phone size={18} />
          </a>
          <a
            href="https://github.com/miadninezero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://facebook.com/profile.php?id=61577385089134"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
        </div>

        {/* Copyright + Back to top */}
        <div className="flex items-center gap-4">
          <p className="font-body text-muted-foreground text-sm">
            © 2026 Miad. Built with curiosity & AI.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
