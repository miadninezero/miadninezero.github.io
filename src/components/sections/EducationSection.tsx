import { GraduationCap } from "lucide-react";
import SectionTitle from "../SectionTitle";
import TerminalCard from "../TerminalCard";

const education = [
  {
    institution: "Daffodil International University",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "Since 2026",
    gpa: null,
  },
  {
    institution: "Agricultural University College",
    degree: "HSC Batch-25",
    period: "Completed",
    gpa: "4.83",
  },
  {
    institution: "Chandipahsa Govt High School",
    degree: "SSC Batch-23",
    period: "Completed",
    gpa: "5.00",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>education</SectionTitle>
        
        <div className="grid gap-4">
          {education.map((edu, index) => (
            <TerminalCard key={edu.institution} delay={index * 100}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/30 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {edu.institution}
                      </h3>
                      <p className="text-secondary-foreground text-sm">
                        {edu.degree}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-sm text-terminal-dim font-mono">
                        {edu.period}
                      </span>
                      {edu.gpa && (
                        <p className="text-primary font-mono text-sm">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TerminalCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
