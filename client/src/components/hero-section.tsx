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
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/30"></div>
      <div className="absolute inset-0 bg-vibrant-gradient opacity-5"></div>
      
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
              <div className="flex items-center gap-2 bg-gradient-to-r from-success-green/15 to-success-green/5 px-4 py-2 rounded-xl border border-success-green/30 hover-glow-teal transition-all duration-300 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-sm font-semibold text-success-green">CAPM Candidate 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-accent/15 to-purple-accent/5 px-4 py-2 rounded-xl border border-purple-accent/30 hover-glow-purple transition-all duration-300 backdrop-blur-sm">
                <GraduationCap className="h-5 w-5 text-purple-accent" />
                <span className="text-sm font-semibold text-purple-accent">Senior BAS-IS Student</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-coral/15 to-coral/5 px-4 py-2 rounded-xl border border-coral/30 hover-glow-coral transition-all duration-300 backdrop-blur-sm">
                <Briefcase className="h-5 w-5 text-coral" />
                <span className="text-sm font-semibold text-coral">20+ Years IT Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-teal/15 to-teal/5 px-4 py-2 rounded-xl border border-teal/30 hover-glow-teal transition-all duration-300 backdrop-blur-sm">
                <Users className="h-5 w-5 text-teal" />
                <span className="text-sm font-semibold text-teal">6 Years Team Leadership</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-vibrant-gradient text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover-glow-teal"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                size="lg"
                className="font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 border-2 border-teal/40 text-teal hover:bg-teal/10 hover-glow-teal backdrop-blur-sm"
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
                <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-purple-accent/5 to-coral/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-teal/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">3.94</div>
                  <div className="text-sm text-muted-foreground">GPA</div>
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
