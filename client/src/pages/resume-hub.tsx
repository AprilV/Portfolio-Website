import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Settings, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const ResumeHub = () => {
  const resumeTypes = [
    {
      key: 'assistant-pm',
      name: "Assistant Project Manager",
      description: "Your primary target - specialized for assistant PM roles",
      features: ["Project coordination", "Team support", "Process improvement", "Stakeholder communication"],
      color: "primary-blue",
      icon: Target,
      path: "/resume/assistant-pm",
      bestFor: "Assistant PM and project coordination positions",
      priority: "Primary Target"
    },
    {
      key: 'it-assistant-pm', 
      name: "IT Assistant PM",
      description: "Combines IT expertise with assistant project manager positioning",
      features: ["Technical coordination", "IT project support", "Infrastructure knowledge", "Technical communication"],
      color: "teal-blue",
      icon: Settings,
      path: "/resume/it-assistant-pm",
      bestFor: "IT-focused assistant PM and technical coordination roles",
      priority: "IT Specialty"
    },
    {
      key: 'pm-internship',
      name: "PM Internship",
      description: "Designed for project management internships and learning opportunities",
      features: ["Growth mindset", "Academic foundation", "Hands-on experience", "Professional development"],
      color: "primary-blue",
      icon: GraduationCap,
      path: "/resume/pm-internship",
      bestFor: "PM internships and entry-level project management roles",
      priority: "Growth Opportunity"
    }
  ];

  return (
    <section id="resume" className="py-12 bg-background relative overflow-hidden" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-teal-blue/5 to-primary-blue/5"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="professional-experience-header" style={{marginTop: '0'}}>
            <h2 className="section-header">
              Resume Builder
              <div className="section-underline"></div>
            </h2>
            <p className="section-subtitle">Choose your target role for a customized resume experience</p>
          </div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {resumeTypes.map((resume) => (
            <Card 
              key={resume.key}
              className="professional-card border-2 border-divider-gray hover:border-primary-blue/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.4)] transform hover:scale-105"
            >
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className={`p-4 rounded-xl bg-${resume.color}/10`}>
                    <resume.icon className={`h-8 w-8 text-${resume.color}`} />
                  </div>
                  <div>
                    <Badge 
                      className={`text-${resume.color} bg-${resume.color}/10 border border-${resume.color}/20 mb-3`}
                    >
                      {resume.priority}
                    </Badge>
                    <CardTitle className="text-xl font-bold">{resume.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-2">{resume.bestFor}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-center">{resume.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-charcoal-black dark:text-white">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link href={resume.path}>
                    <Button
                      size="lg"
                      className={`w-full bg-${resume.color} text-white hover:bg-${resume.color}/90 transform hover:scale-105 transition-all duration-200`}
                    >
                      Build Resume
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="max-w-2xl mx-auto p-6 bg-primary-blue/5 rounded-lg border border-primary-blue/20">
            <h3 className="text-lg font-semibold text-charcoal-black dark:text-white mb-3">
              Focused Career Strategy
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each resume is specifically tailored to highlight the most relevant skills and experience for that role type. 
              This targeted approach increases your chances of getting past ATS systems and impressing hiring managers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResumeHub;