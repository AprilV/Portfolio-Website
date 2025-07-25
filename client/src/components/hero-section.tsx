import { ArrowRight, Download, CheckCircle, GraduationCap, Briefcase, Users } from "lucide-react";
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

  return (
    <section id="home" className="pt-16 min-h-[85vh] flex items-center relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-teal-blue/5"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-charcoal-black leading-tight">
                April V. Sykes
              </h1>
              <h2 className="text-xl lg:text-2xl text-teal-blue font-semibold">
                Aspiring Assistant Project Manager | Senior BAS-IS Student | CAPM Candidate (2025)
              </h2>
              <p className="text-lg text-cool-gray max-w-xl leading-relaxed">
                Two decades of progressive leadership experience in IT infrastructure, team management, and project coordination, 
                now transitioning into formal project management. Combining deep operational knowledge with formal 
                project leadership training and modern technical tools.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="professional-badge badge-progress flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>CAPM Candidate 2025</span>
              </div>
              <div className="professional-badge badge-academic flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Senior BAS-IS Student</span>
              </div>
              <div className="professional-badge badge-experience flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>20+ Years IT Experience</span>
              </div>
              <div className="professional-badge badge-mixed flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>6 Years Team Leadership</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue-hover text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                size="lg"
                className="font-semibold px-8 py-3 rounded-lg border-2 border-teal-blue text-teal-blue hover:bg-teal-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="relative inline-block">
              <div className="w-80 h-80 rounded-2xl shadow-2xl overflow-hidden relative">
                <img 
                  src={profilePhoto} 
                  alt="April V. Sykes - Professional Photo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/8 via-transparent to-teal-blue/8"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card-background shadow-lg p-4 border border-divider-gray rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-blue">3.94</div>
                  <div className="text-sm text-cool-gray font-medium">GPA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
