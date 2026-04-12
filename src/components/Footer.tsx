const Footer = () => {
  return (
    <footer className="border-t border-border px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-display text-foreground text-lg font-bold uppercase tracking-wider">
        <span className="text-primary">M</span>IAD
      </div>
      <p className="font-body text-muted-foreground text-sm">
        © 2026 Miad. Built with curiosity & AI.
      </p>
    </footer>
  );
};

export default Footer;
