import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  delay?: number;
}

const TerminalCard = ({ children, className, title, delay = 0 }: TerminalCardProps) => {
  return (
    <div 
      className={cn(
        "relative bg-card border border-border rounded-lg p-6 card-glow transition-all duration-300 opacity-0 animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {title && (
        <div className="absolute -top-3 left-4 px-2 bg-background">
          <span className="text-primary text-sm font-mono">
            {'<'}{title}{' />'}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default TerminalCard;
