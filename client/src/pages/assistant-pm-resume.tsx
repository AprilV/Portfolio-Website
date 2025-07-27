import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Target, ArrowLeft, FileText, Zap, Eye } from "lucide-react";
import { Link } from "wouter";
import { generateATSResumeContent, atsKeywords } from "@/lib/ats-resume-templates";

const AssistantPMResume = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadResume = async () => {
    setIsGenerating(true);
    
    // Generate resume content
    const resumeContent = generateATSResumeContent('assistant');
    
    // Create download
    const blob = new Blob([resumeContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'April_Sykes_Assistant_Project_Manager_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsGenerating(false);
  };

  const keyFeatures = [
    "Project coordination and support",
    "Cross-functional team collaboration", 
    "Process improvement initiatives",
    "Stakeholder communication",
    "Documentation and reporting",
    "Meeting facilitation and follow-up"
  ];

  const targetKeywords = [
    "Assistant Project Manager", "Project Coordination", "Team Support",
    "Process Improvement", "Stakeholder Management", "Documentation",
    "Project Planning", "Team Collaboration", "Meeting Management"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/resume" className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resume Builder
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary-blue/10">
                <Target className="h-8 w-8 text-primary-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-black dark:text-white">
                  Assistant Project Manager Resume
                </h1>
                <Badge className="text-primary-blue bg-primary-blue/10 border border-primary-blue/20 mt-2">
                  Primary Target
                </Badge>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Specialized resume emphasizing your coordination skills, team support experience, and readiness for assistant project manager roles.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Resume Details */}
          <div className="space-y-6">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-blue" />
                  Resume Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-black dark:text-white mb-2">Key Focus Areas:</h4>
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
                    <h4 className="font-semibold text-charcoal-black dark:text-white mb-2">Experience Emphasis:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• 20+ years IT infrastructure experience</li>
                      <li>• 6 years team leadership (up to 12 people)</li>
                      <li>• Cross-functional collaboration expertise</li>
                      <li>• Formal Project Management education</li>
                      <li>• CAPM certification candidate</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-blue" />
                  Key Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This resume emphasizes your strongest qualifications for assistant project manager roles:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {targetKeywords.slice(0, 6).map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="p-3 bg-primary-blue/5 rounded-lg border border-primary-blue/20">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      <strong>Strategic Focus:</strong> Emphasizes coordination and support skills while highlighting your technical background as a valuable differentiator.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <Card className="professional-card border-primary-blue/20">
              <CardHeader>
                <CardTitle className="text-center">Ready to Download</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="p-6 bg-gradient-to-br from-primary-blue/5 to-teal-blue/5 rounded-lg">
                    <FileText className="h-12 w-12 text-primary-blue mx-auto mb-3" />
                    <h3 className="font-semibold text-charcoal-black dark:text-white">
                      Assistant Project Manager Resume
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      ATS-optimized plain text format for maximum compatibility
                    </p>
                  </div>
                  
                  <Button
                    onClick={downloadResume}
                    disabled={isGenerating}
                    size="lg"
                    className="w-full bg-primary-blue text-white hover:bg-primary-blue/90 transform hover:scale-105 transition-all duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {isGenerating ? 'Generating...' : 'Download Resume'}
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm text-charcoal-black dark:text-white mb-2">Perfect For:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Assistant Project Manager positions</li>
                    <li>• Project Coordinator roles</li>
                    <li>• Team Support positions</li>
                    <li>• Project Analyst opportunities</li>
                    <li>• Cross-functional collaboration roles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary-blue" />
                  Career Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Why This Focus Works:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Positions you as ready for immediate contribution</li>
                    <li>• Emphasizes support and coordination strengths</li>
                    <li>• Highlights technical background as differentiator</li>
                    <li>• Shows clear career progression path</li>
                    <li>• Demonstrates formal PM education commitment</li>
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

export default AssistantPMResume;