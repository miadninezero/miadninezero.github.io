const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
      <div className="font-display text-foreground text-xl font-bold uppercase tracking-wider">
        <span className="text-primary">M</span>IAD
      </div>
      <div className="hidden md:flex items-center gap-10 font-body text-sm tracking-widest uppercase text-muted-foreground">
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#personality" className="hover:text-foreground transition-colors">Personality</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      <a
        href="#contact"
        className="hidden md:block bg-primary text-primary-foreground font-display text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:brightness-110 transition-all"
      >
        Get In Touch
      </a>
    </nav>
  );
};

export default Navbar;
