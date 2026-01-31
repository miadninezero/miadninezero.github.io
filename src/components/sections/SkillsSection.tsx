import SectionTitle from "../SectionTitle";
import TerminalCard from "../TerminalCard";
import SkillBadge from "../SkillBadge";

const hardSkills = [
  "Python Programming",
  "Prompt Engineering",
  "Generative AI Workflows",
  "Large Language Models",
  "AI Agent Systems",
  "n8n Automation",
  "ComfyUI",
  "Hugging Face",
  "Illustration",
  "UI/UX Design",
];

const softSkills = [
  "Communication",
  "Problem Solving",
  "Adaptability",
  "Continuous Learning",
  "Creative Thinking",
  "Team Collaboration",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>skills</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-6">
          <TerminalCard title="hard_skills" delay={100}>
            <div className="flex flex-wrap gap-2 pt-2">
              {hardSkills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </TerminalCard>
          
          <TerminalCard title="soft_skills" delay={200}>
            <div className="flex flex-wrap gap-2 pt-2">
              {softSkills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </TerminalCard>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
