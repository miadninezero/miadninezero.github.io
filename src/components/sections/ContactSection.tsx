import { Mail, Phone, Globe, MapPin, Github } from "lucide-react";
import SectionTitle from "../SectionTitle";
import TerminalCard from "../TerminalCard";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>contact</SectionTitle>
        
        <TerminalCard delay={100}>
          <div className="text-center mb-8">
            <p className="text-secondary-foreground text-lg">
              <span className="text-primary">{'>'}</span> Ready to collaborate on AI projects?
            </p>
            <p className="text-terminal-dim mt-2">
              Let's build something intelligent together.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <a 
              href="mailto:miadninezero@gmail.com"
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 group"
            >
              <div className="p-2 bg-primary/10 rounded border border-primary/30 group-hover:border-primary/50 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-terminal-dim uppercase tracking-wide">Email</p>
                <p className="text-foreground group-hover:text-primary transition-colors text-sm">
                  miadninezero@gmail.com
                </p>
              </div>
            </a>
            
            <a 
              href="tel:+8801608229699"
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 group"
            >
              <div className="p-2 bg-primary/10 rounded border border-primary/30 group-hover:border-primary/50 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-terminal-dim uppercase tracking-wide">Phone</p>
                <p className="text-foreground group-hover:text-primary transition-colors text-sm">
                  +880 1608229699
                </p>
              </div>
            </a>
            
            <a 
              href="https://miadninezero.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 group"
            >
              <div className="p-2 bg-primary/10 rounded border border-primary/30 group-hover:border-primary/50 transition-colors">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-terminal-dim uppercase tracking-wide">Website</p>
                <p className="text-foreground group-hover:text-primary transition-colors text-sm">
                  miadninezero.me
                </p>
              </div>
            </a>
            
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 group"
            >
              <div className="p-2 bg-primary/10 rounded border border-primary/30 group-hover:border-primary/50 transition-colors">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-terminal-dim uppercase tracking-wide">GitHub</p>
                <p className="text-foreground group-hover:text-primary transition-colors text-sm">
                  Open Source Projects
                </p>
              </div>
            </a>
          </div>
          
          <div className="mt-6 text-center">
            <p className="flex items-center justify-center gap-2 text-terminal-dim text-sm">
              <MapPin className="w-4 h-4" />
              Changaund, Ashulia, Savar, Dhaka, Bangladesh
            </p>
          </div>
        </TerminalCard>
      </div>
    </section>
  );
};

export default ContactSection;
