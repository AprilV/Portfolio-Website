import { Clock, Code, Users, ExternalLink, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const ProjectsSection = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const truncateDescription = (description: string, maxLines: number = 3) => {
    const words = description.split(' ');
    const wordsPerLine = 12; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) return description;
    
    return words.slice(0, maxWords).join(' ') + '...';
  };
  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "Professional portfolio website built from scratch using HTML, CSS, and JavaScript with responsive design and accessibility features for CIS151 Web Development capstone.",
      icon: Code,
      color: "navy",
      technologies: ["HTML", "CSS", "JavaScript", "CIS151 Capstone"],
      features: [
        "Custom navigation with Font Awesome icons",
        "Professional photo integration",
        "Mobile-responsive design",
        "Cross-browser compatibility",
      ],
      link: "https://aprilv.github.io/my-website/",
    },
    {
      title: "TimelyRx Medication App",
      description: "React-based medication reminder application featuring caregiver tracking, WCAG accessibility compliance, and local data management for IS320 App Development capstone. Initial design phase available on GitHub as ElderCare project. Currently in alpha development.",
      icon: Clock,
      color: "success-green",
      technologies: ["React", "WCAG", "Healthcare", "IS320 Capstone"],
      features: [
        "Comprehensive design architecture (GitHub: ElderCare)",
        "Caregiver notification system implementation", 
        "WCAG accessibility compliance and testing",
        "Local data tracking and management",
        "Professional interface design and scheduling logic",
        "Iterative development from initial concept to alpha release",
      ],
      link: "https://timely-rx-pro-aprilv120.replit.app/",
      githubLink: "https://github.com/AprilV/ElderCare",
    },
    {
      title: "PMP Quiz App",
      description: "Full-stack exam simulator with timer, randomized questions, and dynamic scoring developed using Agile methodology for PM450 Project Management capstone. Repository available on GitHub - AWS hosting discontinued due to cost optimization.",
      icon: Code,
      color: "purple-accent",
      technologies: ["Full-Stack", "Agile", "PM450 Capstone", "Education"],
      features: [
        "Complete full-stack architecture design and implementation",
        "Timer functionality and randomized question delivery system",
        "Dynamic scoring with real-time feedback mechanisms",
        "Agile sprint planning with iterative development cycles",
        "Project scope management using Agile methodology",
        "AWS deployment experience (discontinued for cost optimization)",
      ],
      link: "https://github.com/AprilV/PMP-Quiz-App",
    },
    {
      title: "The Evolution of Artificial Intelligence",
      description: "Comprehensive research paper and PowerPoint presentation examining AI's transformation from science fiction to societal infrastructure for IS390 AI Research capstone. Features creative FAL-9000 interview (female voice) reimagining HAL-9000 from 2001: A Space Odyssey.",
      icon: Users,
      color: "accent-blue",
      technologies: ["Research", "PowerPoint", "IS390 Capstone", "APA"],
      features: [
        "From Science Fiction to Societal Infrastructure analysis",
        "Academic research paper with APA formatting and citations", 
        "Creative FAL-9000 interview with female voice (reimagining HAL-9000)",
        "Covers AI evolution, Deep Blue, AlphaGo, transformer models, and ethics",
      ],
      link: "/attached_assets/Presentation - The Evolution of Artificial Intelligence2_1753390635100.pptx",
      videoLink: "https://www.youtube.com/watch?v=kVlNcL9oR6Q",
      paperLink: "/attached_assets/The Evolution of Artificial Intelligence_1753389614635.docx",
      blogLink: "https://aprilv.github.io/AprilsBlog/#/blog",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success-green":
        return "from-teal-blue/25 via-primary-blue/15 to-teal-blue/20 text-teal-blue";
      case "navy":
        return "from-primary-blue/25 via-teal-blue/15 to-primary-blue/20 text-primary-blue";
      case "accent-blue":
        return "from-primary-blue/25 via-teal-blue/15 to-primary-blue/20 text-primary-blue";
      case "purple-accent":
        return "from-primary-blue/25 via-teal-blue/15 to-primary-blue/20 text-primary-blue";
      case "orange-accent":
        return "from-teal-blue/25 via-primary-blue/15 to-teal-blue/20 text-teal-blue";
      default:
        return "from-primary-blue/10 to-teal-blue/10 text-primary-blue";
    }
  };

  const getBadgeVariant = (tech: string) => {
    if (["React", "Full-Stack", "Research", "HTML"].includes(tech)) return "default";
    if (["WCAG", "Agile", "APA", "IS320", "PM450", "IS390", "PowerPoint"].includes(tech)) return "secondary";
    return "outline";
  };

  return (
    <section id="projects" className="py-12 bg-background dark:bg-background" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="professional-experience-header" style={{marginTop: '0'}}>
            <h2 className="section-header">
              Featured Capstone Projects
              <div className="section-underline"></div>
            </h2>
            <p className="section-subtitle">Academic Excellence in Applied Technology</p>
          </div>
          <p className="text-xl text-muted-foreground mt-6">Four comprehensive capstone projects demonstrating technical skills and project management capabilities across multiple disciplines</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const isExpanded = expandedCards.includes(index);
            return (
            <Card key={index} className={`professional-card glassmorphism border-0 shadow-lg group animate-slide-in-bottom h-fit modern-card-hover ${
              index === 0 ? 'animation-delay-100' : 
              index === 1 ? 'animation-delay-200' : 
              index === 2 ? 'animation-delay-300' : 'animation-delay-400'
            }`}>
              <CardHeader className="pb-4">
                <div className={`h-32 bg-gradient-to-br ${getColorClasses(project.color)} flex items-center justify-center rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-center">
                    <div className={`w-12 h-12 ${project.color === 'success-green' || project.color === 'orange-accent' ? 'bg-teal-blue/20' : 'bg-primary-blue/20'} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <project.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-card-foreground mb-3">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                  {isExpanded ? project.description : truncateDescription(project.description)}
                  {project.description.split(' ').length > 36 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(index)}
                      className="ml-2 p-0 h-auto text-primary-blue hover:text-primary-blue/80 font-medium"
                    >
                      {isExpanded ? (
                        <>
                          Show less <ChevronUp className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Read more <ChevronDown className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </Button>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant={getBadgeVariant(tech)} className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-1.5">
                  {project.features.slice(0, isExpanded ? project.features.length : 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-teal-blue rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-card-foreground leading-tight">{feature}</span>
                    </div>
                  ))}
                  {project.features.length > 3 && !isExpanded && (
                    <div className="text-xs text-muted-foreground ml-4">
                      +{project.features.length - 3} more features
                    </div>
                  )}
                </div>
                
                {project.link !== "#" ? (
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="ghost" 
                      className="text-primary-blue hover:text-primary-blue/80 p-0 h-auto font-medium justify-start hover-lift"
                      onClick={() => {
                        if (project.link.includes('.pptx')) {
                          // Always use direct download for PowerPoint files
                          // This provides the most reliable experience across all environments
                          const link = document.createElement('a');
                          link.href = project.link;
                          link.download = 'The Evolution of Artificial Intelligence.pptx';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          window.open(project.link, '_blank');
                        }
                      }}
                    >
                      {project.link.includes('youtube') ? 'View Video Content' : 
                       project.link.includes('.pptx') ? 'Download Presentation' : 'View Project'}
                      <FileText className="ml-2 h-4 w-4" />
                    </Button>
                    {project.videoLink && (
                      <Button 
                        variant="ghost" 
                        className="text-primary-blue hover:text-primary-blue/80 p-0 h-auto font-medium justify-start hover-lift"
                        onClick={() => {
                          window.open(project.videoLink, '_blank');
                        }}
                      >
                        Watch FAL-9000 Interview
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {project.paperLink && (
                      <Button 
                        variant="ghost" 
                        className="text-primary-blue hover:text-primary-blue/80 p-0 h-auto font-medium justify-start hover-lift"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = project.paperLink;
                          link.download = 'The Evolution of Artificial Intelligence - Research Paper.docx';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        Download Paper
                        <FileText className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button 
                        variant="ghost" 
                        className="text-primary-blue hover:text-primary-blue/80 p-0 h-auto font-medium justify-start hover-lift"
                        onClick={() => {
                          window.open(project.githubLink, '_blank');
                        }}
                      >
                        View Initial Design (GitHub)
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {project.blogLink && (
                      <Button 
                        variant="ghost" 
                        className="text-primary-blue hover:text-primary-blue/80 p-0 h-auto font-medium justify-start hover-lift"
                        onClick={() => {
                          window.open(project.blogLink, '_blank');
                        }}
                      >
                        View Research Blog Journal
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="text-gray-500 p-0 h-auto font-medium cursor-not-allowed justify-start"
                    disabled
                  >
                    Academic Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
