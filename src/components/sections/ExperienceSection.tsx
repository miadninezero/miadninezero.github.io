import { Briefcase } from "lucide-react";
import SectionTitle from "../SectionTitle";
import TerminalCard from "../TerminalCard";

const experiences = [
  {
    role: "AI Model Trainer & Researcher",
    company: "Hugging Face / Independent",
    period: "2024 - Present",
    tasks: [
      "Trained and fine-tuned custom Large Language Models (LLMs) on specific datasets to improve output accuracy",
      "Deployed functional AI models to Hugging Face and conducted rigorous testing of various open-source AI tools",
    ],
  },
  {
    role: "AI Workflow & Automation Specialist",
    company: "Self-Employed",
    period: "2023 - Present",
    tasks: [
      "Designed advanced automation pipelines using n8n and ComfyUI to integrate generative AI into real-world applications",
      "Managed GitHub repositories to version-control custom Python scripts and share workflow configurations",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>experience</SectionTitle>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <TerminalCard key={exp.role} delay={index * 150}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/30 flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-primary font-mono">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-terminal-dim mb-4 text-sm">
                    @ {exp.company}
                  </p>
                  
                  <ul className="space-y-2">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-secondary-foreground text-sm">
                        <span className="text-primary mt-1">→</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TerminalCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
