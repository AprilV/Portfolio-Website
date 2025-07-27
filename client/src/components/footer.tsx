import { Linkedin, Github } from "lucide-react";
import WorldClock from "@/components/world-clock";

const Footer = () => {
  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const professionalFocus = [
    "Assistant Project Manager",
    "Technical Project Coordinator",
    "IT Project Management",
    "Infrastructure Operations",
    "Team Leadership",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">April V. Sykes</h3>
            <p className="text-gray-400 mb-4">
              Transforming IT expertise into project management excellence. 
              Ready to drive your next project to success.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/aprilsykes" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/AprilV"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Professional Focus</h4>
            <ul className="space-y-2 text-gray-400">
              {professionalFocus.map((focus, index) => (
                <li key={index}>{focus}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-center md:text-left">
              <p>© 2024 April V. Sykes. Professional portfolio showcasing transition from IT infrastructure to project management.</p>
              <p className="text-sm mt-1 text-gray-500">Designed collaboratively by April V. Sykes & Claude AI</p>
            </div>
            <WorldClock />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
