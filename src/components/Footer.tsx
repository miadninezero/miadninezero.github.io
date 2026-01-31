const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-terminal-dim font-mono text-sm">
          <span className="text-primary">{'>'}</span> © {currentYear} AI Specialist Portfolio
        </p>
        <p className="text-muted-foreground text-xs mt-2">
          Built with passion for AI & technology
        </p>
      </div>
    </footer>
  );
};

export default Footer;
