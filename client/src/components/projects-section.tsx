import { Clock, Code, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsSection = () => {
  const projects = [
    {
      title: "TimelyRx Medication App",
      description: "React-based medication reminder application featuring caregiver tracking, WCAG accessibility compliance, and local data management.",
      icon: Clock,
      color: "success-green",
      technologies: ["React", "WCAG", "Healthcare"],
      features: [
        "Caregiver notification system",
        "Accessibility compliance",
        "Local data tracking",
      ],
      link: "#",
    },
    {
      title: "PMP Exam Simulator",
      description: "Full-stack exam preparation tool with live scoring, randomized questions, and responsive design built using Agile development practices.",
      icon: Code,
      color: "navy",
      technologies: ["Full-Stack", "Agile", "Education"],
      features: [
        "Dynamic scoring system",
        "Randomized question logic",
        "Agile sprint planning",
      ],
      link: "#",
    },
    {
      title: "AI Research Presentation",
      description: "Comprehensive 20-minute academic presentation on the societal impact of artificial intelligence with APA citations and visual media integration.",
      icon: Users,
      color: "accent-blue",
      technologies: ["Research", "APA", "Academic"],
      features: [
        "Structured narrative design",
        "Visual media integration",
        "Academic formatting",
      ],
      link: "#",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success-green":
        return "from-success-green/20 to-accent-blue/20 text-success-green";
      case "navy":
        return "from-navy/20 to-accent-blue/20 text-navy";
      case "accent-blue":
        return "from-accent-blue/20 to-navy/20 text-accent-blue";
      default:
        return "from-gray-100 to-gray-200 text-gray-600";
    }
  };

  const getBadgeVariant = (tech: string) => {
    if (["React", "Full-Stack", "Research"].includes(tech)) return "default";
    if (["WCAG", "Agile", "APA"].includes(tech)) return "secondary";
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
                
                <Button 
                  variant="ghost" 
                  className="text-navy hover:text-navy/80 p-0 h-auto font-medium"
                  onClick={() => {
                    console.log(`View project: ${project.title}`);
                    alert("Project links would be implemented with actual repositories or demos");
                  }}
                >
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
