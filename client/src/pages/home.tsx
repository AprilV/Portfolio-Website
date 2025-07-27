import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ATSResumeGenerator from "@/components/ats-resume-generator";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import TableOfContents from "@/components/table-of-contents";
const Home = () => {
  const portfolioSections = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume Builder' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <TableOfContents sections={portfolioSections} />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ATSResumeGenerator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
