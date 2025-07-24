import { ClipboardCheck, Code, BarChart3, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Project Management",
      icon: ClipboardCheck,
      color: "navy",
      skills: [
        { name: "Agile Methodologies", level: 90, proficiency: "Advanced" },
        { name: "Risk Management", level: 85, proficiency: "Proficient" },
        { name: "Stakeholder Communication", level: 95, proficiency: "Expert" },
        { name: "Team Leadership", level: 92, proficiency: "Expert" },
        { name: "Documentation", level: 98, proficiency: "Expert" },
      ],
    },
    {
      title: "Technical Skills",
      icon: Code,
      color: "accent-blue",
      skills: [
        { name: "React/JavaScript", level: 85, proficiency: "Proficient" },
        { name: "Node.js/REST APIs", level: 80, proficiency: "Proficient" },
        { name: "Network Administration", level: 95, proficiency: "Expert" },
        { name: "Linux/Windows Systems", level: 90, proficiency: "Expert" },
        { name: "Database Management", level: 78, proficiency: "Proficient" },
      ],
    },
    {
      title: "Business & Analytics",
      icon: BarChart3,
      color: "success-green",
      skills: [
        { name: "Business Process Analysis", level: 88, proficiency: "Advanced" },
        { name: "Data Analysis", level: 82, proficiency: "Proficient" },
        { name: "Excel/Power Query", level: 90, proficiency: "Advanced" },
        { name: "Statistical Reporting", level: 85, proficiency: "Proficient" },
        { name: "Technical Writing", level: 95, proficiency: "Expert" },
      ],
    },
  ];

  const certifications = [
    {
      name: "CAPM",
      description: "In Progress",
      detail: "Summer 2025",
      icon: Award,
      color: "navy",
    },
    {
      name: "CCNA",
      description: "Cisco Networking",
      detail: "Switching & Routing",
      icon: Code,
      color: "accent-blue",
    },
    {
      name: "TestOut Pro",
      description: "Security & Network",
      detail: "Multiple Certifications",
      icon: ClipboardCheck,
      color: "success-green",
    },
    {
      name: "BAS-IS",
      description: "Olympic College",
      detail: "Spring 2026",
      icon: BarChart3,
      color: "navy",
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "navy":
        return "text-navy bg-navy/10";
      case "accent-blue":
        return "text-accent-blue bg-accent-blue/10";
      case "success-green":
        return "text-success-green bg-success-green/10";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case "navy":
        return "bg-navy";
      case "accent-blue":
        return "bg-accent-blue";
      case "success-green":
        return "bg-success-green";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Skills & Competencies</h2>
          <p className="text-xl text-gray-600">Technical expertise and project management capabilities</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClass(category.color)}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className={`text-sm font-medium text-${category.color}`}>{skill.proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(category.color)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Certifications & Education</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${getColorClass(cert.color)}`}>
                  <cert.icon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.description}</p>
                <p className="text-xs text-gray-500">{cert.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
