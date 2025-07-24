import { ClipboardCheck, Code, BarChart3, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Project Management",
      icon: ClipboardCheck,
      color: "navy",
      skills: [
        { name: "Agile Methodologies", experience: "Academic + Projects", description: "Coursework & capstone implementation", accent: "purple-accent" },
        { name: "Risk Management", experience: "Academic", description: "Project Management I & II coursework", accent: "accent-blue" },
        { name: "Stakeholder Communication", experience: "20+ Years", description: "Extensive professional experience", accent: "success-green" },
        { name: "Team Leadership", experience: "18+ Years", description: "Led 12-person teams at Dell Technologies", accent: "orange-accent" },
        { name: "Documentation", experience: "20+ Years", description: "Authored thousands of SOPs and procedures", accent: "navy" },
      ],
    },
    {
      title: "Technical Skills",
      icon: Code,
      color: "accent-blue",
      skills: [
        { name: "React/JavaScript", experience: "Academic + Projects", description: "TimelyRx and PMP Quiz apps", accent: "accent-blue" },
        { name: "Node.js/REST APIs", experience: "Academic + Projects", description: "Full-stack capstone development", accent: "purple-accent" },
        { name: "Network Administration", experience: "20+ Years", description: "Cisco networking, mainframe operations", accent: "orange-accent" },
        { name: "Linux/Windows Systems", experience: "20+ Years", description: "Enterprise system administration", accent: "success-green" },
        { name: "Database Management", experience: "Academic", description: "Coursework in database structures", accent: "navy" },
      ],
    },
    {
      title: "Business & Analytics",
      icon: BarChart3,
      color: "success-green",
      skills: [
        { name: "Business Process Analysis", experience: "Academic", description: "Information Systems coursework", accent: "purple-accent" },
        { name: "Data Analysis", experience: "Academic", description: "Business Statistics and Analytics courses", accent: "accent-blue" },
        { name: "Excel/Power Query", experience: "Professional", description: "Business reporting and data analysis", accent: "orange-accent" },
        { name: "Statistical Reporting", experience: "Academic", description: "Business Statistics coursework", accent: "navy" },
        { name: "Technical Writing", experience: "20+ Years", description: "Extensive documentation and procedures", accent: "success-green" },
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
      link: null,
      credentialId: null
    },
    {
      name: "CCNA: Switching & Routing",
      description: "Cisco Networking",
      detail: "Issued Mar 2024",
      icon: Code,
      color: "accent-blue",
      link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html",
      credentialId: null
    },
    {
      name: "CCNA: Intro to Networks",
      description: "Cisco Networking",
      detail: "Issued Dec 2023",
      icon: Code,
      color: "purple-accent",
      link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html",
      credentialId: null
    },
    {
      name: "TestOut Linux Pro",
      description: "CompTIA",
      detail: "ID: 6-2C6-VCQ5KS",
      icon: ClipboardCheck,
      color: "success-green",
      link: "https://www.testout.com/",
      credentialId: "6-2C6-VCQ5KS"
    },
    {
      name: "TestOut Security Pro",
      description: "Security Certification",
      detail: "ID: 6-2C6-V9F5UG",
      icon: ClipboardCheck,
      color: "orange-accent",
      link: "https://www.testout.com/",
      credentialId: "6-2C6-V9F5UG"
    },
    {
      name: "Certified Client Pro",
      description: "TestOut Certification",
      detail: "ID: 6-2c6-v3pmva",
      icon: ClipboardCheck,
      color: "accent-blue",
      link: "https://www.testout.com/",
      credentialId: "6-2c6-v3pmva"
    },
    {
      name: "Certified PC Pro",
      description: "TestOut Certification", 
      detail: "ID: 6-2c6-v3p73s",
      icon: ClipboardCheck,
      color: "purple-accent",
      link: "https://www.testout.com/",
      credentialId: "6-2c6-v3p73s"
    },
    {
      name: "Network Professional (CNP)",
      description: "TestOut Certification",
      detail: "ID: 6-2c6-vv5625",
      icon: ClipboardCheck,
      color: "success-green",
      link: "https://www.testout.com/",
      credentialId: "6-2c6-vv5625"
    },
    {
      name: "BAS-IS",
      description: "Olympic College",
      detail: "Spring 2026",
      icon: BarChart3,
      color: "navy",
      link: null,
      credentialId: null
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
      case "purple-accent":
        return "text-purple-accent bg-purple-accent/10";
      case "orange-accent":
        return "text-orange-accent bg-orange-accent/10";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getExperienceTagClass = (accent: string) => {
    switch (accent) {
      case "navy":
        return "text-navy bg-navy/10 border border-navy/20";
      case "accent-blue":
        return "text-accent-blue bg-accent-blue/10 border border-accent-blue/20";
      case "success-green":
        return "text-success-green bg-success-green/10 border border-success-green/20";
      case "purple-accent":
        return "text-purple-accent bg-purple-accent/10 border border-purple-accent/20";
      case "orange-accent":
        return "text-orange-accent bg-orange-accent/10 border border-orange-accent/20";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getBorderClass = (accent: string) => {
    switch (accent) {
      case "navy":
        return "border-navy";
      case "accent-blue":
        return "border-accent-blue";
      case "success-green":
        return "border-success-green";
      case "purple-accent":
        return "border-purple-accent";
      case "orange-accent":
        return "border-orange-accent";
      default:
        return "border-gray-200";
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
                  <div key={skillIndex} className={`border-l-4 ${getBorderClass(skill.accent)} pl-4 py-2`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getExperienceTagClass(skill.accent)}`}>
                        {skill.experience}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Certifications & Education</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColorClass(cert.color)}`}>
                    <cert.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{cert.name}</h4>
                    <p className="text-xs text-gray-600 mb-1">{cert.description}</p>
                    <p className="text-xs text-gray-500 mb-2">{cert.detail}</p>
                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-accent-blue hover:text-accent-blue/80 transition-colors font-medium"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verify Credential
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {cert.credentialId && (
                      <div className="mt-1">
                        <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                          ID: {cert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
