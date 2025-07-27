import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Settings, ArrowLeft, FileText, Zap, Eye } from "lucide-react";
import { Link } from "wouter";
import { generateATSResumeContent } from "@/lib/ats-resume-templates";

const ITAssistantPMResume = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadResume = async () => {
    setIsGenerating(true);
    
    const resumeContent = generateATSResumeContent('technical');
    
    const blob = new Blob([resumeContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'April_Sykes_IT_Assistant_PM_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsGenerating(false);
  };

  const keyFeatures = [
    "Technical project coordination",
    "IT infrastructure expertise", 
    "System implementation support",
    "Technical documentation",
    "Cross-functional IT teams",
    "Technology vendor management"
  ];

  const targetKeywords = [
    "IT Project Management", "Technical Coordination", "Infrastructure",
    "System Implementation", "Technical Documentation", "IT Operations",
    "Network Management", "CompTIA Certified", "Technology Projects"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="mb-8">
          <Link href="/resume" className="inline-flex items-center text-teal-blue hover:text-teal-blue/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resume Builder
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-teal-blue/10">
                <Settings className="h-8 w-8 text-teal-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-black dark:text-white">
                  IT Assistant PM Resume
                </h1>
                <Badge className="text-teal-blue bg-teal-blue/10 border border-teal-blue/20 mt-2">
                  IT Specialty
                </Badge>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Combines your extensive IT expertise with assistant project management positioning for technology-focused roles.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-blue" />
                  Technical Resume Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-black dark:text-white mb-2">IT Focus Areas:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-blue rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-charcoal-black dark:text-white mb-2">Technical Credentials:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• CompTIA A+, Network+, Linux+ certified</li>
                      <li>• CCNA Switching, Routing & Wireless</li>
                      <li>• 20+ years enterprise IT infrastructure</li>
                      <li>• Windows Server & network administration</li>
                      <li>• Dell Technologies technical leadership</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-teal-blue" />
                  IT Project Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Optimized for IT project management and technical coordination roles:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {targetKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="p-3 bg-teal-blue/5 rounded-lg border border-teal-blue/20">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      <strong>Technical Advantage:</strong> Your deep IT background positions you uniquely for technology project management roles where technical credibility is essential.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="professional-card border-teal-blue/20">
              <CardHeader>
                <CardTitle className="text-center">Technical Resume Ready</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="p-6 bg-gradient-to-br from-teal-blue/5 to-primary-blue/5 rounded-lg">
                    <Settings className="h-12 w-12 text-teal-blue mx-auto mb-3" />
                    <h3 className="font-semibold text-charcoal-black dark:text-white">
                      IT Assistant Project Manager Resume
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Technical expertise meets project management readiness
                    </p>
                  </div>
                  
                  <Button
                    onClick={downloadResume}
                    disabled={isGenerating}
                    size="lg"
                    className="w-full bg-teal-blue text-white hover:bg-teal-blue/90 transform hover:scale-105 transition-all duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {isGenerating ? 'Generating...' : 'Download IT Resume'}
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm text-charcoal-black dark:text-white mb-2">Ideal For:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• IT Project Coordinator roles</li>
                    <li>• Technical Project Manager positions</li>
                    <li>• Infrastructure project support</li>
                    <li>• Technology implementation roles</li>
                    <li>• IT Operations project management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-teal-blue" />
                  Technical Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Your Technical Edge:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Speaks technical language with development teams</li>
                    <li>• Understands infrastructure constraints and requirements</li>
                    <li>• Can bridge business and technical stakeholders</li>
                    <li>• Proven track record in complex IT environments</li>
                    <li>• Multiple industry certifications validate expertise</li>
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

export default ITAssistantPMResume;