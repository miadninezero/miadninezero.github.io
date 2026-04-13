import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EnthusiastSection from "@/components/EnthusiastSection";
import PersonalitySection from "@/components/PersonalitySection";
import GamesSection from "@/components/GamesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative z-10 transition-all">
      <AmbientBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EnthusiastSection />
      <PersonalitySection />
      <GamesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
