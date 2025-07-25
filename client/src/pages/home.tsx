import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ATSResumeGenerator from "@/components/ats-resume-generator";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ScrollNav from "@/components/scroll-nav";

const Home = () => {
  const portfolioSections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'experience', label: 'Experience & Leadership', icon: '💼' },
    { id: 'projects', label: 'Academic Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills & Certifications', icon: '⚡' },
    { id: 'ats-resume', label: 'ATS Resume Generator', icon: '📄' },
    { id: 'contact', label: 'Contact Me', icon: '📧' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <ScrollNav sections={portfolioSections} />
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
