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
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/8 via-light-blue/5 to-accent-blue/8"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-charcoal-black leading-tight">
                April V. <span className="text-primary-blue">Sykes</span>
              </h1>
              <h2 className="text-xl lg:text-2xl text-primary-blue font-semibold">
                Aspiring Assistant Project Manager | Senior BAS-IS Student | CAPM Candidate (2025)
              </h2>
              <p className="text-lg text-cool-gray max-w-xl leading-relaxed">
                Two decades of progressive leadership experience in IT infrastructure, team management, and project coordination, 
                now transitioning into formal project management. Combining deep operational knowledge with formal 
                project leadership training and modern technical tools.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-success-green/15 to-success-green/5 px-4 py-3 rounded-xl border border-success-green/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-sm font-semibold text-success-green">CAPM Candidate 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-primary-blue/15 to-primary-blue/5 px-4 py-3 rounded-xl border border-primary-blue/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <GraduationCap className="h-5 w-5 text-primary-blue" />
                <span className="text-sm font-semibold text-primary-blue">Senior BAS-IS Student</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-light-blue/15 to-light-blue/5 px-4 py-3 rounded-xl border border-light-blue/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <Briefcase className="h-5 w-5 text-light-blue" />
                <span className="text-sm font-semibold text-light-blue">20+ Years IT Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-accent-blue/15 to-accent-blue/5 px-4 py-3 rounded-xl border border-accent-blue/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <Users className="h-5 w-5 text-accent-blue" />
                <span className="text-sm font-semibold text-accent-blue">6 Years Team Leadership</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-professional-gradient text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                size="lg"
                className="font-semibold px-8 py-3 rounded-xl border-2 border-primary-blue/60 text-primary-blue hover:bg-primary-blue hover:text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/12 via-light-blue/8 to-accent-blue/12"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-primary-blue/20">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">3.94</div>
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
