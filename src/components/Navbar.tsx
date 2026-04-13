import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Enthusiast", href: "#enthusiast" },
  { label: "Personality", href: "#personality" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-transparent backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-foreground text-xl font-bold uppercase tracking-wider hover:text-primary transition-colors"
        >
          <span className="text-primary">M</span>IAD
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={`transition-colors duration-200 ${
                activeSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="hidden md:block bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          Get In Touch
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 text-foreground hover:text-primary transition-colors p-1"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-1 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.href);
            }}
            className={`font-display text-3xl font-bold uppercase tracking-wider py-3 transition-all duration-300 ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            } ${
              activeSection === item.href.slice(1)
                ? "text-primary"
                : "text-foreground hover:text-primary"
            }`}
            style={{
              transitionDelay: isOpen ? `${i * 0.07}s` : "0s",
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className={`mt-6 bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:brightness-110 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isOpen ? `${navItems.length * 0.07}s` : "0s",
          }}
        >
          Get In Touch
        </a>
      </div>
    </>
  );
};

export default Navbar;
