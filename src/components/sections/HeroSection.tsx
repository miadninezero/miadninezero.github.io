import { Mail, MapPin, Globe, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Terminal prompt */}
        <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <span className="text-terminal-dim font-mono text-sm">
            {'>'} initializing portfolio...
          </span>
        </div>
        
        {/* Name */}
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-display mb-4 text-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          <span className="text-primary text-glow">AI</span> Specialist
        </h1>
        
        {/* Tagline */}
        <p 
          className="text-lg md:text-xl text-terminal-dim font-mono mb-8 opacity-0 animate-fade-in cursor-blink"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          Building intelligent systems that learn and adapt
        </p>
        
        {/* Contact info */}
        <div 
          className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm opacity-0 animate-fade-in-up"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <a 
            href="mailto:miadninezero@gmail.com"
            className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>miadninezero@gmail.com</span>
          </a>
          
          <a 
            href="tel:+8801608229699"
            className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+880 1608229699</span>
          </a>
          
          <a 
            href="https://miadninezero.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>miadninezero.me</span>
          </a>
          
          <span className="flex items-center gap-2 text-secondary-foreground">
            <MapPin className="w-4 h-4" />
            <span>Dhaka, Bangladesh</span>
          </span>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="mt-16 opacity-0 animate-fade-in"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <a href="#about" className="inline-block">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1 hover:border-primary transition-colors">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
