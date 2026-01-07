import { ArrowRight, Download, CheckCircle, GraduationCap, Briefcase, Users, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "/attached_assets/april_sykes_profile.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/attached_assets/April_Sykes_Assistant_Project_Manager_Resume_1753385857678.docx';
    link.download = 'April_Sykes_Assistant_Project_Manager_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSkills = () => {
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="pt-16 min-h-[85vh] flex items-center relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300"
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-teal-blue/5 dark:from-teal-blue/10 dark:via-transparent dark:to-primary-blue/10"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          <div className="space-y-8 animate-slide-in-left lg:order-1 w-full lg:w-auto text-center lg:text-left">
            <div className="space-y-4">
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-charcoal-black dark:text-white leading-tight transition-colors duration-300 text-center"
                itemProp="name"
              >
                April V. Sykes
              </h1>
              <h2 
                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-teal-blue dark:text-teal-blue font-semibold transition-colors duration-300 leading-snug text-center"
                itemProp="jobTitle"
              >
                <span className="block sm:inline">Assistant Project Manager</span>
                <span className="hidden xs:inline sm:inline"> | </span>
                <span className="block xs:inline sm:inline">IT Project Management</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline">CAPM Candidate (2025)</span>
                <span className="hidden md:inline"> | </span>
                <span className="block md:inline">Extensive IT Background</span>
              </h2>
              <p 
                className="text-base sm:text-lg text-cool-gray dark:text-gray-300 max-w-xl leading-relaxed transition-colors duration-300 mx-auto"
                itemProp="description"
              >
                IT professional with 20+ years infrastructure experience transitioning to IT Assistant Project Manager roles. 
                Currently completing bachelor's degree and seeking internships for Winter/Spring 2026. Combining deep technical expertise 
                with formal project management education and CAPM certification pursuit.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 leading-relaxed justify-center">
              <div 
                className="professional-badge badge-progress flex items-center gap-2 hover-scale transition-all duration-200" 
                title="Preparing for Certified Associate in Project Management exam"
                aria-label="CAPM Candidate 2025 - Preparing for Certified Associate in Project Management exam"
              >
                <CheckCircle className="h-4 w-4" />
                <span>CAPM Candidate 2025</span>
              </div>
              <div 
                className="professional-badge badge-academic flex items-center gap-2 hover-scale transition-all duration-200"
                title="Bachelor of Applied Science in Information Systems student"
                aria-label="Senior BAS-IS Student"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Senior BAS-IS Student</span>
              </div>
              <div 
                className="professional-badge badge-experience flex items-center gap-2 hover-scale transition-all duration-200"
                title="Enterprise systems, infrastructure, and technical support expertise"
                aria-label="Extensive IT Experience in enterprise systems and infrastructure"
              >
                <Briefcase className="h-4 w-4" />
                <span>Enterprise IT Expertise</span>
              </div>
              <div 
                className="professional-badge badge-mixed flex items-center gap-2 hover-scale transition-all duration-200"
                title="Led teams of up to 12 people in healthcare IT operations"
                aria-label="6 Years Team Leadership managing up to 12 people"
              >
                <Users className="h-4 w-4" />
                <span>6 Years Team Leadership</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-primary-blue dark:bg-primary-blue text-white dark:text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-2xl dark:hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.4)] hover:border-teal-blue dark:hover:border-teal-blue transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-teal-blue focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                aria-label="Navigate to contact section to get in touch"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                size="lg"
                className="font-semibold px-8 py-3 rounded-lg border-2 border-teal-blue text-teal-blue dark:text-teal-blue dark:border-teal-blue hover:border-primary-blue dark:hover:border-primary-blue transition-all duration-300 shadow-lg hover:shadow-2xl dark:hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.4)] transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                aria-label="Download April Sykes' Assistant Project Manager resume"
              >
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                Download Resume
              </Button>
            </div>
            
            {/* Professional LinkedIn Link */}
            <div className="flex items-center gap-4 pt-4 justify-center">
              <span className="text-sm text-cool-gray font-medium">Connect with me:</span>
              <a 
                href="https://www.linkedin.com/in/aprilsykes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-primary-blue dark:text-primary-blue border border-primary-blue/30 dark:border-primary-blue/50 rounded-lg transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:ring-offset-2"
                aria-label="Connect with April V. Sykes on LinkedIn - Opens in new tab"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="animate-slide-in-right animation-delay-200 lg:order-0">
            <div className="relative inline-block">
              <div className="w-72 sm:w-80 h-72 sm:h-80 rounded-2xl shadow-2xl overflow-hidden relative mx-auto">
                <img 
                  src={profilePhoto} 
                  alt="April V. Sykes - Professional headshot photo showing a confident IT professional and Assistant Project Manager candidate" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/8 via-transparent to-teal-blue/8"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
