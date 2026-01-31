import SectionTitle from "../SectionTitle";
import TerminalCard from "../TerminalCard";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>about_me</SectionTitle>
        
        <TerminalCard delay={100}>
          <div className="space-y-4">
            <p className="text-secondary-foreground leading-relaxed text-lg">
              <span className="text-primary">{'>'}</span> I am a creative and self-motivated student with a strong focus on{' '}
              <span className="text-primary">AI</span> and technology. I have practical experience working with{' '}
              <span className="text-terminal-bright">AI agent workflows</span>,{' '}
              <span className="text-terminal-bright">Large Language Models (LLMs)</span>, and{' '}
              <span className="text-terminal-bright">adaptive systems</span>.
            </p>
            
            <p className="text-secondary-foreground leading-relaxed text-lg">
              <span className="text-primary">{'>'}</span> Driven by a{' '}
              <span className="text-primary font-semibold">'learning-by-doing'</span> approach, I am eager to apply my technical skills to real-world projects and push the boundaries of what's possible with artificial intelligence.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-3 text-sm text-terminal-dim">
              <span className="border border-border px-3 py-1 rounded">// AI Research</span>
              <span className="border border-border px-3 py-1 rounded">// Digital Art</span>
              <span className="border border-border px-3 py-1 rounded">// Photography</span>
              <span className="border border-border px-3 py-1 rounded">// Badminton</span>
              <span className="border border-border px-3 py-1 rounded">// Travelling</span>
            </div>
          </div>
        </TerminalCard>
      </div>
    </section>
  );
};

export default AboutSection;
