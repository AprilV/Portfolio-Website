import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, GraduationCap, ArrowLeft, FileText, Zap, Eye } from "lucide-react";
import { Link } from "wouter";
import { generateATSResumeContent } from "@/lib/ats-resume-templates";

const PMInternshipResume = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadResume = async () => {
    setIsGenerating(true);
    
    const resumeContent = generateATSResumeContent('internship');
    
    const blob = new Blob([resumeContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'April_Sykes_PM_Internship_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsGenerating(false);
  };

  const keyFeatures = [
    "Growth mindset and learning agility",
    "Academic project management foundation", 
    "Extensive hands-on experience",
    "Professional development focus",
    "Mentorship and guidance receptive",
    "Real-world application readiness"
  ];

  const targetKeywords = [
    "PM Internship", "Entry Level", "Project Management Student",
    "Learning Opportunity", "Professional Development", "Academic Foundation",
    "Growth Potential", "Team Collaboration", "Process Learning"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="mb-8">
          <Link href="/resume" className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resume Builder
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary-blue/10">
                <GraduationCap className="h-8 w-8 text-primary-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-black dark:text-white">
                  PM Internship Resume
                </h1>
                <Badge className="text-primary-blue bg-primary-blue/10 border border-primary-blue/20 mt-2">
                  Growth Opportunity
                </Badge>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed for project management internships and learning opportunities that provide hands-on PM experience.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-blue" />
                  Internship Resume Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-black dark:text-white mb-2">Learning Focus Areas:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-charcoal-black dark:text-white mb-2">Unique Value Proposition:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Mature perspective with 20+ years experience</li>
                      <li>• Formal Project Management I & II coursework</li>
                      <li>• President's Scholar academic excellence</li>
                      <li>• Real-world team leadership experience</li>
                      <li>• Committed to PM career transition</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-blue" />
                  Internship Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Optimized for internship and entry-level PM positions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {targetKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="p-3 bg-primary-blue/5 rounded-lg border border-primary-blue/20">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      <strong>Internship Advantage:</strong> Your combination of extensive experience and formal PM education makes you an ideal intern who can contribute immediately while learning PM best practices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="professional-card border-primary-blue/20">
              <CardHeader>
                <CardTitle className="text-center">Internship Resume Ready</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="p-6 bg-gradient-to-br from-primary-blue/5 to-teal-blue/5 rounded-lg">
                    <GraduationCap className="h-12 w-12 text-primary-blue mx-auto mb-3" />
                    <h3 className="font-semibold text-charcoal-black dark:text-white">
                      Project Management Internship Resume
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Perfect for learning-focused PM opportunities
                    </p>
                  </div>
                  
                  <Button
                    onClick={downloadResume}
                    disabled={isGenerating}
                    size="lg"
                    className="w-full bg-primary-blue text-white hover:bg-primary-blue/90 transform hover:scale-105 transition-all duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {isGenerating ? 'Generating...' : 'Download Internship Resume'}
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm text-charcoal-black dark:text-white mb-2">Perfect For:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Project Management internships</li>
                    <li>• Entry-level PM trainee programs</li>
                    <li>• Academic PM practicum placements</li>
                    <li>• Corporate PM development programs</li>
                    <li>• Non-profit project coordination roles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary-blue" />
                  Internship Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Why Internships Work for You:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Provides structured PM learning environment</li>
                    <li>• Lower risk for employers = more opportunities</li>
                    <li>• Allows you to prove PM capabilities hands-on</li>
                    <li>• Often leads to full-time PM positions</li>
                    <li>• Builds PM network and references quickly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMInternshipResume;