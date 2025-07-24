import { ArrowRight, Download, CheckCircle, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    // In a real implementation, this would trigger a download of the resume PDF
    console.log("Download resume functionality would be implemented here");
    alert("Resume download would be implemented here with actual PDF file");
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-accent/15 via-accent-blue/10 to-orange-accent/10"></div>
      <div className="absolute inset-0 bg-white/85"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                April V. <span className="text-navy">Sykes</span>
              </h1>
              <h2 className="text-xl lg:text-2xl text-dark-gray font-medium">
                Aspiring Assistant Project Manager
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                IT Professional with 20+ years of experience transitioning into Project Management. 
                Bridging deep technical expertise with formal PM training and CAPM certification.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-success-green/10 to-success-green/5 px-4 py-2 rounded-lg border border-success-green/20">
                <CheckCircle className="h-5 w-5 text-success-green" />
                <span className="text-sm font-medium">CAPM Candidate 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-accent/10 to-purple-accent/5 px-4 py-2 rounded-lg border border-purple-accent/20">
                <GraduationCap className="h-5 w-5 text-purple-accent" />
                <span className="text-sm font-medium">BAS-IS Student</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-accent/10 to-orange-accent/5 px-4 py-2 rounded-lg border border-orange-accent/20">
                <Briefcase className="h-5 w-5 text-orange-accent" />
                <span className="text-sm font-medium">20+ Years IT Experience</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-navy text-white hover:bg-navy/90 px-8 py-3"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={downloadResume}
                className="border-navy text-navy hover:bg-navy hover:text-white px-8 py-3"
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="relative inline-block">
              <div className="w-80 h-80 bg-gradient-to-br from-purple-accent/20 via-accent-blue/15 to-orange-accent/20 rounded-2xl shadow-2xl flex items-center justify-center">
                {/* Professional headshot placeholder */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-navy/20 to-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-accent/30 to-orange-accent/30 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">Professional Photo</p>
                </div>
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
