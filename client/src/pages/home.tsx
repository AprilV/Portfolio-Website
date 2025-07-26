import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ATSResumeGenerator from "@/components/ats-resume-generator";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ATSResumeGenerator />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
