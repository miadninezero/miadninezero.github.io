import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EnthusiastSection from "@/components/EnthusiastSection";
import PersonalitySection from "@/components/PersonalitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EnthusiastSection />
      <PersonalitySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
