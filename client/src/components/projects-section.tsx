import { Clock, Code, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "Professional portfolio website built from scratch using HTML, CSS, and JavaScript with responsive design and accessibility features.",
      icon: Code,
      color: "navy",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
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
      description: "React-based medication reminder application featuring caregiver tracking, WCAG accessibility compliance, and local data management for IS320 capstone.",
      icon: Clock,
      color: "success-green",
      technologies: ["React", "WCAG", "Healthcare", "IS320"],
      features: [
        "Caregiver notification system",
        "WCAG accessibility compliance",
        "Local data tracking",
        "Interface design and scheduling logic",
      ],
      link: "#",
    },
    {
      title: "PMP Quiz App",
      description: "Full-stack exam simulator with timer, randomized questions, and dynamic scoring developed using Agile methodology for PM450 capstone project.",
      icon: Code,
      color: "purple-accent",
      technologies: ["Full-Stack", "Agile", "PM450", "Education"],
      features: [
        "Timer and randomized questions",
        "Dynamic scoring system",
        "Agile sprint planning and iterations",
        "Scope management using Agile methodology",
      ],
      link: "#",
    },
    {
      title: "The Evolution of Artificial Intelligence",
      description: "Comprehensive research paper and PowerPoint presentation examining AI's transformation from science fiction to societal infrastructure for IS390, with supplementary video content.",
      icon: Users,
      color: "accent-blue",
      technologies: ["Research", "PowerPoint", "IS390", "APA"],
      features: [
        "From Science Fiction to Societal Infrastructure analysis",
        "Academic research paper with APA formatting and citations",
        "Professional PowerPoint presentation with multimedia",
        "Covers Deep Blue, AlphaGo, transformer models, and ethics",
      ],
      link: "https://www.youtube.com/watch?v=kVlNcL9oR6Q",
    },
    {
      title: "Blog Research Project",
      description: "Academic research and analysis project exploring industry trends and technical topics with structured writing and citation standards.",
      icon: Users,
      color: "orange-accent",
      technologies: ["Research", "Technical Writing", "Analysis"],
      features: [
        "Industry trend analysis",
        "Technical topic exploration",
        "Structured academic writing",
        "Citation and reference standards",
      ],
      link: "#",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success-green":
        return "from-success-green/25 via-purple-accent/15 to-accent-blue/20 text-success-green";
      case "navy":
        return "from-navy/25 via-accent-blue/15 to-purple-accent/20 text-navy";
      case "accent-blue":
        return "from-accent-blue/25 via-orange-accent/15 to-success-green/20 text-accent-blue";
      case "purple-accent":
        return "from-purple-accent/25 via-navy/15 to-accent-blue/20 text-purple-accent";
      case "orange-accent":
        return "from-orange-accent/25 via-success-green/15 to-purple-accent/20 text-orange-accent";
      default:
        return "from-gray-100 to-gray-200 text-gray-600";
    }
  };

  const getBadgeVariant = (tech: string) => {
    if (["React", "Full-Stack", "Research", "HTML"].includes(tech)) return "default";
    if (["WCAG", "Agile", "APA", "IS320", "PM450", "IS390", "PowerPoint"].includes(tech)) return "secondary";
    return "outline";
  };

  return (
    <section id="projects" className="py-20 bg-light-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600">Demonstrating technical skills and project management capabilities</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className={`h-48 bg-gradient-to-br ${getColorClasses(project.color)} flex items-center justify-center rounded-lg mb-4`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-${project.color}/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <project.icon className="w-8 h-8" />
                    </div>
                    <p className="text-sm text-gray-600">{project.title.split(' ')[0]} Interface</p>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{project.title}</CardTitle>
                <CardDescription className="text-gray-700">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant={getBadgeVariant(tech)} className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  {project.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success-green rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {project.link !== "#" ? (
                  <Button 
                    variant="ghost" 
                    className="text-navy hover:text-navy/80 p-0 h-auto font-medium"
                    onClick={() => {
                      window.open(project.link, '_blank');
                    }}
                  >
                    {project.link.includes('youtube') ? 'View Video Content' : 'View Project'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="text-gray-500 p-0 h-auto font-medium cursor-not-allowed"
                    disabled
                  >
                    Capstone Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
