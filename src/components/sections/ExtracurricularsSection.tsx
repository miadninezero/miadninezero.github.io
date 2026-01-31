import { Users, Trophy, Github } from "lucide-react";
import SectionTitle from "../SectionTitle";
import TerminalCard from "../TerminalCard";

const activities = [
  {
    title: "Science Club Member",
    description: "Collaborated with peers on technology-focused projects and participated in science fairs to showcase innovative ideas.",
    icon: Users,
  },
  {
    title: "Sports Club Member",
    description: "Actively participated in team sports, fostering discipline, leadership, and strong teamwork skills.",
    icon: Trophy,
  },
  {
    title: "Open Source Contributor",
    description: "Maintained an active portfolio of code repositories, testing new AI tools and contributing to community discussions on GitHub.",
    icon: Github,
  },
];

const ExtracurricularsSection = () => {
  return (
    <section id="activities" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>activities</SectionTitle>
        
        <div className="grid md:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <TerminalCard key={activity.title} delay={index * 100}>
              <div className="text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-lg border border-primary/30 mb-4">
                  <activity.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {activity.title}
                </h3>
                
                <p className="text-secondary-foreground text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </TerminalCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtracurricularsSection;
