import { ClipboardCheck, Code, BarChart3, Award, Shield } from "lucide-react";
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
        { name: "LAN Administration", experience: "20+ Years + Academic", description: "Professional experience + LAN Administration IV (4.0 GPA)", accent: "orange-accent" },
        { name: "Windows Systems", experience: "20+ Years + Academic", description: "Professional + Windows/Professionals course (4.0 GPA)", accent: "success-green" },
        { name: "Linux Systems", experience: "Academic", description: "Linux I course (4.0 GPA) with CompTIA certification", accent: "purple-accent" },
        { name: "Web Development", experience: "Academic", description: "Web Development I (4.0 GPA)", accent: "accent-blue" },
        { name: "Network Security", experience: "Academic", description: "Info System Security I (4.0 GPA)", accent: "navy" },
        { name: "Technical Support", experience: "Academic + Professional", description: "Technical Support Skills (4.0 GPA) + 20+ years experience", accent: "success-green" },
      ],
    },
    {
      title: "Business & Analytics",
      icon: BarChart3,
      color: "success-green",
      skills: [
        { name: "Information Systems Integration", experience: "Academic + Professional", description: "IS302 (4.0 GPA) + Top LinkedIn skill", accent: "purple-accent" },
        { name: "Business Statistics", experience: "Academic", description: "BUS215 Business Statistics (3.7 GPA)", accent: "accent-blue" },
        { name: "Research & Analysis", experience: "Academic", description: "IS390 Reading and Research (4.0 GPA)", accent: "orange-accent" },
        { name: "Digital Leadership", experience: "Academic", description: "IS320 Leading in the Digital World (4.0 GPA)", accent: "navy" },
        { name: "Technical Writing", experience: "Academic + Professional", description: "ENGL235 Technical Writing (4.0 GPA) + 20+ years experience", accent: "success-green" },
        { name: "Organizational Communication", experience: "Academic", description: "CMST242 Intro Comm in Organizations (4.0 GPA)", accent: "purple-accent" },
      ],
    },
  ];

  const certifications = [
    {
      name: "CAPM Candidate",
      description: "Project Management Institute",
      detail: "Summer 2025 - PM I & II Complete (4.0 GPA)",
      icon: Award,
      color: "navy",
      link: "https://www.pmi.org/certifications/certified-associate-capm",
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
      name: "CompTIA Linux+",
      description: "CompTIA Certification (via TestOut)",
      detail: "ID: 6-2C6-VCQ5KS",
      icon: Shield,
      color: "success-green",
      link: "https://www.comptia.org/certifications/linux",
      credentialId: "6-2C6-VCQ5KS"
    },
    {
      name: "CompTIA Security+",
      description: "CompTIA Security Certification (via TestOut)",
      detail: "ID: 6-2C6-V9F5UG",
      icon: Shield,
      color: "orange-accent",
      link: "https://www.comptia.org/certifications/security", 
      credentialId: "6-2C6-V9F5UG"
    },
    {
      name: "CompTIA A+ Client",
      description: "CompTIA A+ Certification (via TestOut)",
      detail: "ID: 6-2c6-v3pmva",
      icon: Shield,
      color: "accent-blue",
      link: "https://www.comptia.org/certifications/a",
      credentialId: "6-2c6-v3pmva"
    },
    {
      name: "CompTIA A+ PC Pro",
      description: "CompTIA A+ Certification (via TestOut)", 
      detail: "ID: 6-2c6-v3p73s",
      icon: Shield,
      color: "purple-accent",
      link: "https://www.comptia.org/certifications/a",
      credentialId: "6-2c6-v3p73s"
    },
    {
      name: "CompTIA Network+",
      description: "CompTIA Network Professional (via TestOut)",
      detail: "ID: 6-2c6-vv5625",
      icon: Shield,
      color: "success-green",
      link: "https://www.comptia.org/certifications/network",
      credentialId: "6-2c6-vv5625"
    },
    {
      name: "BAS-IS Student",
      description: "Olympic College - 3.94 GPA",
      detail: "President's Scholar (8 terms) | Spring 2026",
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
    <section id="skills" className="py-12 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 relative">
              Skills & Competencies
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-navy to-accent-blue rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-6">Technical expertise and project management capabilities</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gray-200">
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
        <div className="bg-gradient-to-r from-gray-50/80 to-gray-50/40 py-12 px-8 rounded-2xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
              Certifications & Education
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-accent to-success-green rounded-full"></div>
            </h3>
          </div>
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
