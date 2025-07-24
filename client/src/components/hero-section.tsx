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
    <section id="home" className="pt-16 min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                April V. <span className="text-primary">Sykes</span>
              </h1>
              <h2 className="text-xl lg:text-2xl text-foreground/90 font-medium">
                Aspiring Assistant Project Manager | Senior BAS-IS Student | CAPM Candidate (2025)
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Two decades of progressive leadership experience in IT infrastructure, team management, and project coordination, 
                now transitioning into formal project management. Combining deep operational knowledge with formal 
                project leadership training and modern technical tools.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-neon-green/15 to-success-green/10 px-4 py-2 rounded-xl border border-success-green/30 hover-glow-blue transition-all duration-300">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-sm font-semibold">CAPM Candidate 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-cyber-purple/15 to-purple-accent/10 px-4 py-2 rounded-xl border border-purple-accent/30 hover-glow-purple transition-all duration-300">
                <GraduationCap className="h-5 w-5 text-cyber-purple" />
                <span className="text-sm font-semibold">Senior BAS-IS Student</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-tech-orange/15 to-orange-accent/10 px-4 py-2 rounded-xl border border-tech-orange/30 hover-glow-orange transition-all duration-300">
                <Briefcase className="h-5 w-5 text-tech-orange" />
                <span className="text-sm font-semibold">20+ Years IT Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-electric-blue/15 to-accent-blue/10 px-4 py-2 rounded-xl border border-electric-blue/30 hover-glow-blue transition-all duration-300">
                <Users className="h-5 w-5 text-electric-blue" />
                <span className="text-sm font-semibold">6 Years Team Leadership</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="btn-electric text-white px-8 py-3 font-semibold tracking-wide"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-3 transition-all duration-300 hover-glow-blue"
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-accent/10 via-transparent to-orange-accent/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy">3.94</div>
                  <div className="text-sm text-gray-600">GPA</div>
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
