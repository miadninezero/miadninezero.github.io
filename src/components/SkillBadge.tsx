import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: string;
  className?: string;
}

const SkillBadge = ({ skill, className }: SkillBadgeProps) => {
  return (
    <span 
      className={cn(
        "inline-block px-3 py-1.5 text-sm font-mono",
        "bg-secondary border border-border rounded",
        "text-terminal-dim hover:text-primary hover:border-primary/50",
        "transition-all duration-200 hover:border-glow",
        "cursor-default",
        className
      )}
    >
      {skill}
    </span>
  );
};

export default SkillBadge;
