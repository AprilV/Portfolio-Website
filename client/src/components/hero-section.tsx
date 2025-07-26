import { ArrowRight, Download, CheckCircle, GraduationCap, Briefcase, Users, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@assets/april_sykes_profile.jpg";

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
      className="pt-16 min-h-[85vh] flex items-center relative overflow-hidden bg-hero-gradient"
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-teal-blue/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-charcoal-black leading-tight"
                itemProp="name"
              >
                April V. Sykes
              </h1>
              <h2 
                className="text-lg sm:text-xl lg:text-2xl text-teal-blue font-semibold"
                itemProp="jobTitle"
              >
                Assistant Project Manager | IT Project Management | CAPM Candidate (2025) | 20+ Years Experience
              </h2>
              <p 
                className="text-base sm:text-lg text-cool-gray max-w-xl leading-relaxed"
                itemProp="description"
              >
                Two decades of progressive leadership experience in IT infrastructure, team management, and project coordination, 
                now transitioning into formal project management. Combining deep operational knowledge with formal 
                project leadership training and modern technical tools.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 leading-relaxed">
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
                title="Bachelor of Applied Science in Information Systems student with 3.94 GPA"
                aria-label="Senior BAS-IS Student with 3.94 GPA"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Senior BAS-IS Student</span>
              </div>
              <div 
                className="professional-badge badge-experience flex items-center gap-2 hover-scale transition-all duration-200"
                title="Legacy systems, infrastructure, and enterprise support experience"
                aria-label="20+ Years IT Experience in legacy systems and infrastructure"
              >
                <Briefcase className="h-4 w-4" />
                <span>20+ Years IT Experience</span>
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue-hover text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                size="lg"
                className="font-semibold px-8 py-3 rounded-lg border-2 border-teal-blue text-teal-blue hover:bg-teal-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Download Resume
              </Button>
            </div>
            
            {/* Professional LinkedIn Link */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-cool-gray font-medium">Connect with me:</span>
              <a 
                href="https://www.linkedin.com/in/aprilsykes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-primary-blue hover:text-primary-blue-hover border border-primary-blue/30 hover:border-primary-blue rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105"
                aria-label="Connect with April V. Sykes on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="lg:text-right animate-slide-in-right animation-delay-200">
            <div className="relative inline-block">
              <div className="w-72 sm:w-80 h-72 sm:h-80 rounded-2xl shadow-2xl overflow-hidden relative mx-auto lg:mx-0">
                <img 
                  src={profilePhoto} 
                  alt="April V. Sykes - Professional Photo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/8 via-transparent to-teal-blue/8"></div>
              </div>
              <button
                onClick={scrollToSkills}
                className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-card-background shadow-lg p-3 sm:p-4 border border-divider-gray rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-primary-blue/5 cursor-pointer group"
                title="Click to view academic achievements and GPA details"
                aria-label="GPA 3.94 - Click to view academic achievements"
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-teal-blue group-hover:text-primary-blue transition-colors">3.94</div>
                  <div className="text-xs sm:text-sm text-cool-gray font-medium">GPA</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
