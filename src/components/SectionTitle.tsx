import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: string;
  className?: string;
}

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <div className={cn("flex items-center gap-4 mb-8", className)}>
      <span className="text-primary text-lg">{'>'}</span>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display tracking-tight">
        {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
    </div>
  );
};

export default SectionTitle;
