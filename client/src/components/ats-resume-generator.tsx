import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Zap, Eye, Settings, Target, Shield, Users, TrendingUp, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateATSResumeContent, atsKeywords } from "@/lib/ats-resume-templates";

const ATSResumeGenerator = () => {
  const [selectedFormat, setSelectedFormat] = useState('standard');
  const [previewMode, setPreviewMode] = useState(false);

  const resumeFormats = {
    standard: {
      name: "Standard ATS",
      description: "Clean, chronological format compatible with 95% of ATS systems",
      features: ["Simple layout", "Standard sections", "Keyword optimized", "Universal compatibility"],
      fileType: ".docx",
      color: "primary-blue",
      icon: FileText,
      bestFor: "General assistant PM roles, corporate positions"
    },
    technical: {
      name: "Technical PM",
      description: "Emphasizes technical skills and IT project management experience",
      features: ["Skills-first approach", "Technical keywords", "Project metrics", "IT focus"],
      fileType: ".docx", 
      color: "primary-blue",
      icon: Settings,
      bestFor: "IT project management, technical coordinator roles"
    },
    wastate: {
      name: "Washington State",
      description: "Optimized for Washington State government positions and agencies",
      features: ["State-specific keywords", "Public service focus", "Education emphasis", "Local experience"],
      fileType: ".docx",
      color: "primary-blue",
      icon: Users,
      bestFor: "WA state agencies, municipalities, public sector"
    },
    federal: {
      name: "Federal/Government",
      description: "Detailed format for government positions with security clearance",
      features: ["Comprehensive details", "Education emphasis", "Compliance focused", "Security clearance"],
      fileType: ".docx",
      color: "primary-blue",
      icon: Shield,
      bestFor: "Government agencies, federal contractors"
    },
    internship: {
      name: "Internship/Entry",
      description: "Education-focused format for internships and entry-level PM positions",
      features: ["Education emphasis", "Transferable skills", "Academic projects", "Growth potential"],
      fileType: ".docx",
      color: "primary-blue",
      icon: GraduationCap,
      bestFor: "PM internships, entry-level assistant PM roles"
    },
    assistant: {
      name: "Assistant PM",
      description: "Optimized for assistant project manager and coordinator positions",
      features: ["Support role focus", "Team collaboration", "Process improvement", "Learning orientation"],
      fileType: ".docx", 
      color: "primary-blue",
      icon: Users,
      bestFor: "Assistant PM, project coordinator, project analyst roles"
    },
    datacenter: {
      name: "Datacenter/Infrastructure",
      description: "Specialized for datacenter operations and infrastructure services roles",
      features: ["Infrastructure expertise", "Operations focus", "System reliability", "Technical depth"],
      fileType: ".docx",
      color: "primary-blue", 
      icon: Settings,
      bestFor: "Datacenter operations, infrastructure services, system administration"
    },
    executive: {
      name: "Senior PM",
      description: "Leadership-focused format for senior project management roles", 
      features: ["Leadership emphasis", "Strategic outcomes", "Team management", "Results-driven"],
      fileType: ".docx",
      color: "primary-blue",
      icon: TrendingUp,
      bestFor: "Senior PM roles, team lead positions"
    }
  };

  const atsOptimizations = [
    {
      category: "Format Compliance",
      items: [
        "Uses .docx format for maximum ATS compatibility",
        "Clean, simple layout with no graphics or tables",
        "Standard fonts (Arial, Calibri) for proper parsing",
        "Consistent formatting and bullet points"
      ]
    },
    {
      category: "Keyword Optimization",
      items: [
        "Project management keywords from job descriptions",
        "Technical skills and certifications prominently featured",
        "Action verbs specific to PM roles",
        "Industry-standard terminology and acronyms"
      ]
    },
    {
      category: "Content Structure",
      items: [
        "Professional Summary with target job title",
        "Reverse chronological work experience",
        "Quantified achievements with metrics",
        "Education and certifications section"
      ]
    }
  ];

  const resumeData = {
    personalInfo: {
      name: "April V. Sykes",
      title: "Assistant Project Manager | IT Professional | CAPM Candidate",
      location: "Bremerton, WA",
      email: "april.sykes.pm@gmail.com",
      phone: "(360) 555-0123"
    },
    summary: {
      standard: "Results-driven IT professional with 20+ years of infrastructure experience transitioning to project management. Currently pursuing CAPM certification with formal education in Project Management I & II. Proven track record of leading cross-functional teams up to 12 members at Dell Technologies. Combines deep technical expertise with emerging project leadership skills.",
      technical: "Senior IT Infrastructure Professional with 20+ years hands-on experience in enterprise environments, transitioning to technical project management roles. CAPM candidate with formal Project Management I & II coursework. Expert in Windows systems, LAN administration, and network security with CompTIA certifications. Proven ability to bridge technical and business stakeholders.",
      federal: "Highly qualified IT professional with two decades of enterprise infrastructure experience seeking Assistant Project Manager role in federal/government environment. Currently completing Bachelor of Applied Science in Information Systems with specialized Project Management coursework. Security-conscious with extensive compliance and documentation experience. President's Scholar with proven academic excellence.",
      executive: "Strategic IT leader with 20+ years of progressive experience managing complex technical initiatives and leading high-performance teams. Currently advancing project management expertise through formal CAPM certification track. Demonstrated success in cross-functional collaboration, stakeholder management, and operational excellence at Fortune 500 organizations."
    }
  };

  const generateATSResume = (format: string) => {
    // This would generate different formatted resumes based on the selected format
    
    // For demo purposes, we'll trigger a download
    const resumeContent = createResumeContent(format);
    downloadResumeFile(resumeContent, format);
  };

  const createResumeContent = (format: string) => {
    return generateATSResumeContent(format);
  };

  const downloadResumeFile = (content: string, format: string) => {
    // Create a properly formatted plain text resume for maximum ATS compatibility
    const formattedContent = content.replace(/\n\n/g, '\n\n').trim();
    
    const blob = new Blob([formattedContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const formatNames = {
      standard: 'Standard_ATS',
      technical: 'Technical_PM',
      wastate: 'WA_State_Gov',
      internship: 'Internship_Entry', 
      assistant: 'Assistant_PM',
      datacenter: 'Datacenter_Infrastructure',
      federal: 'Federal_Gov',
      executive: 'Senior_PM'
    };
    
    link.download = `April_Sykes_${formatNames[format as keyof typeof formatNames]}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Resume download completed successfully
  };

  return (
    <section id="resume" className="py-12 bg-background relative overflow-hidden" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-teal-blue/5 to-primary-blue/5"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <div className="professional-experience-header" style={{marginTop: '0'}}>
            <h2 className="section-header">
              ATS Resume Generator
              <div className="section-underline"></div>
            </h2>
            <p className="section-subtitle">Professional resumes optimized for applicant tracking systems</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Format Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-charcoal-black dark:text-white mb-4">Choose Resume Format</h3>
            <div className="grid gap-4">
              {Object.entries(resumeFormats).map(([key, format]) => (
                <Card 
                  key={key} 
                  className={`professional-card cursor-pointer border-2 transition-all duration-300 ${
                    selectedFormat === key 
                      ? 'border-primary-blue bg-primary-blue/5 shadow-lg' 
                      : 'border-divider-gray hover:border-primary-blue/30'
                  }`}
                  onClick={() => setSelectedFormat(key)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${format.color}/10`}>
                          <format.icon className={`h-5 w-5 text-${format.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">{format.name}</CardTitle>
                          <p className="text-sm text-gray-500 mt-1">{format.bestFor}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`text-${format.color} bg-${format.color}/10 border border-${format.color}/20`}
                      >
                        {format.fileType}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{format.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {format.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Download Button */}
            <div className="pt-4">
              <Button
                onClick={() => generateATSResume(selectedFormat)}
                size="lg"
                className="w-full bg-primary-blue text-white hover:bg-primary-blue/90 transform hover:scale-105 transition-all duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Download {resumeFormats[selectedFormat as keyof typeof resumeFormats]?.name} Resume
              </Button>
            </div>
          </div>

          {/* ATS Optimization Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-charcoal-black dark:text-white mb-4">ATS Optimization Features</h3>
            <div className="space-y-4">
              {atsOptimizations.map((section, index) => (
                <Card key={index} className="professional-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-charcoal-black dark:text-white flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
              
              {/* Keyword Analysis Section */}
              <Card className="professional-card bg-gradient-to-r from-primary-blue/5 via-teal-blue/5 to-primary-blue/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-charcoal-black dark:text-white flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Terms by Role
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-medium text-primary-blue mb-1 text-sm">Project Management</h4>
                      <div className="flex flex-wrap gap-1">
                        {atsKeywords.projectManagement.slice(0, 3).map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-primary-blue/30 text-primary-blue">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-blue mb-1 text-sm">Technical</h4>
                      <div className="flex flex-wrap gap-1">
                        {atsKeywords.technical.slice(0, 3).map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-teal-blue/30 text-teal-blue">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-blue mb-1 text-sm">Assistant PM</h4>
                      <div className="flex flex-wrap gap-1">
                        {atsKeywords.assistant.slice(0, 3).map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-primary-blue/30 text-primary-blue">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-blue mb-1 text-sm">Internship</h4>
                      <div className="flex flex-wrap gap-1">
                        {atsKeywords.internship.slice(0, 3).map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-teal-blue/30 text-teal-blue">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                  </div>
                  <div className="mt-3 p-3 bg-primary-blue/10 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Pro Tip:</strong> Keywords are automatically integrated based on your chosen format for optimal ATS compatibility.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ATSResumeGenerator;