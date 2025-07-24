import { ArrowRight, Download, CheckCircle, GraduationCap, Briefcase } from "lucide-react";
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
      <div className="absolute inset-0 bg-hero-gradient opacity-15"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/70"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                April V. <span className="text-navy">Sykes</span>
              </h1>
              <h2 className="text-xl lg:text-2xl text-dark-gray font-medium">
                Aspiring Assistant Project Manager | Senior BAS-IS Student | CAPM Candidate (2025)
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Two decades of progressive leadership experience in IT infrastructure, team management, and project coordination, 
                now transitioning into formal project management. Combining deep operational knowledge with formal 
                project leadership training and modern technical tools.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-success-green/10 to-success-green/5 px-4 py-2 rounded-lg border border-success-green/20">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-sm font-medium">CAPM Candidate 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-accent/10 to-purple-accent/5 px-4 py-2 rounded-lg border border-purple-accent/20">
                <GraduationCap className="h-5 w-5 text-purple-accent" />
                <span className="text-sm font-medium">Senior BAS-IS Student</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-accent/10 to-orange-accent/5 px-4 py-2 rounded-lg border border-orange-accent/20">
                <Briefcase className="h-5 w-5 text-orange-accent" />
                <span className="text-sm font-medium">20+ Years IT Experience & Leadership</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-primary-gradient text-white hover:opacity-90 px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                className="border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white px-8 py-3 transition-all duration-300"
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
