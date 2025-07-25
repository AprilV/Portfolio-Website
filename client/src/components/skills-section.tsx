import { ClipboardCheck, Code, BarChart3, Award, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Project Management Core",
      icon: ClipboardCheck,
      color: "tech-blue",
      skills: [
        { name: "CAPM Certification", experience: "In Progress", description: "Summer 2025 - Based on IS 350/450 PM coursework (4.0 GPA)", accent: "success-green" },
        { name: "Project Management I", experience: "Academic", description: "IS 350 - Project Management I (4.0 GPA)", accent: "tech-blue" },
        { name: "Project Management II", experience: "Academic", description: "IS 450 - Project Management II (4.0 GPA)", accent: "tech-blue" },
        { name: "Team Leadership", experience: "18+ Years", description: "Led 12-person teams at Dell Technologies", accent: "teal-blue" },
        { name: "Stakeholder Communication", experience: "20+ Years + Academic", description: "Professional experience + CMST 242 Organizational Comm (4.0)", accent: "tech-blue" },
        { name: "Project Documentation", experience: "20+ Years + Academic", description: "SOPs/procedures + ENGL& 235 Technical Writing (4.0)", accent: "teal-blue" },
        { name: "Risk Management", experience: "Academic", description: "Project Management I & II coursework", accent: "tech-blue" },
        { name: "Agile Methodologies", experience: "Academic + Projects", description: "Coursework & capstone implementation", accent: "teal-blue" },
      ],
    },
    {
      title: "Business & Operations",
      icon: BarChart3,
      color: "teal-blue",
      skills: [
        { name: "Information Systems Integration", experience: "Academic + Professional", description: "IS 302 (4.0 GPA) + Top LinkedIn skill", accent: "tech-blue" },
        { name: "Digital Leadership", experience: "Academic", description: "IS 320 - Leading in the Digital World (4.0 GPA)", accent: "teal-blue" },
        { name: "Business Analysis", experience: "Academic", description: "BUS 215 Business Statistics (3.7) + BUS& 101 Intro (4.0)", accent: "tech-blue" },
        { name: "Process Improvement", experience: "20+ Years", description: "Operational efficiency and system optimization", accent: "teal-blue" },
        { name: "Research & Analysis", experience: "Academic", description: "IS 390 - Reading and Research (4.0 GPA)", accent: "tech-blue" },
        { name: "Cross-functional Coordination", experience: "20+ Years", description: "Multi-departmental project coordination", accent: "teal-blue" },
      ],
    },
    {
      title: "Technical Foundation",
      icon: Code,
      color: "tech-blue",
      skills: [
        { name: "LAN Administration", experience: "20+ Years + Academic", description: "Professional experience + IS 346 LAN Administration IV (4.0)", accent: "teal-blue" },
        { name: "Windows Systems", experience: "20+ Years + Academic", description: "Professional + CIS 212 Windows/Professionals (4.0)", accent: "tech-blue" },
        { name: "Network Security", experience: "Academic", description: "CIS 236 - Info System Security I (4.0 GPA)", accent: "teal-blue" },
        { name: "Cisco Networking", experience: "Academic", description: "CIS 270 Cisco I (4.0) + CIS 271 Cisco II (4.0)", accent: "tech-blue" },
        { name: "Technical Support", experience: "20+ Years + Academic", description: "CIS 172 Technical Support Skills (4.0) + professional experience", accent: "teal-blue" },
        { name: "Server Support", experience: "Academic", description: "CIS 241 - Applications Server Support (4.0 GPA)", accent: "tech-blue" },
      ],
    },
  ];

  const certifications = [
    {
      name: "CAPM Candidate",
      description: "Project Management Institute",
      detail: "Summer 2025 - PM I & II Complete (4.0 GPA)",
      icon: Award,
      color: "success-green",
      link: "https://www.pmi.org/certifications/certified-associate-capm",
      credentialId: null
    },
    {
      name: "CCNA: Switching, Routing, and Wireless Essentials",
      description: "Cisco Verified Badge",
      detail: "Issued Mar 20, 2024",
      icon: Code,
      color: "tech-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "CCNA: Introduction to Networks",
      description: "Cisco Verified Badge",
      detail: "Issued Dec 7, 2023",
      icon: Code,
      color: "teal-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Introduction to Cybersecurity",
      description: "Cisco Verified Badge",
      detail: "Issued Nov 11, 2024",
      icon: Shield,
      color: "success-green",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Introduction to Data Science",
      description: "Cisco Verified Badge",
      detail: "Issued Feb 26, 2024",
      icon: BarChart3,
      color: "orange-accent",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Networking Academy Learn-A-Thon 2024",
      description: "Cisco Verified Badge",
      detail: "Issued Feb 26, 2024",
      icon: Award,
      color: "coral",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "CompTIA Linux+",
      description: "CompTIA Certification (via TestOut)",
      detail: "ID: 6-2C6-VCQ5KS",
      icon: Shield,
      color: "success-green",
      link: "https://certification.testout.com/verifycert/6-2c6-vcq5ks",
      credentialId: "6-2C6-VCQ5KS"
    },
    {
      name: "CompTIA Security+",
      description: "CompTIA Security Certification (via TestOut)",
      detail: "ID: 6-2C6-V9F5UG",
      icon: Shield,
      color: "orange-accent",
      link: "https://certification.testout.com/verifycert/6-2c6-v9f5ug", 
      credentialId: "6-2C6-V9F5UG"
    },
    {
      name: "CompTIA A+ Client",
      description: "CompTIA A+ Certification (via TestOut)",
      detail: "ID: 6-2c6-v3pmva",
      icon: Shield,
      color: "accent-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-v3pmva",
      credentialId: "6-2c6-v3pmva"
    },
    {
      name: "CompTIA A+ PC Pro",
      description: "CompTIA A+ Certification (via TestOut)", 
      detail: "ID: 6-2c6-v3p73s",
      icon: Shield,
      color: "purple-accent",
      link: "https://certification.testout.com/verifycert/6-2c6-v3p73s",
      credentialId: "6-2c6-v3p73s"
    },
    {
      name: "CompTIA Network+",
      description: "CompTIA Network Professional (via TestOut)",
      detail: "ID: 6-2c6-vv5625",
      icon: Shield,
      color: "success-green",
      link: "https://certification.testout.com/verifycert/6-2c6-vv5625",
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
    <section id="skills" className="py-12 bg-background-neutral relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-purple-accent/5 to-success-green/5"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-black mb-4 relative inline-block">
              Skills & Competencies
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary-blue rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-6">Technical expertise and project management capabilities</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-card-background p-6 rounded-xl shadow-md border border-divider-gray hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className={`absolute inset-0 opacity-5 ${
                category.color === 'navy' ? 'bg-gradient-to-br from-navy via-accent-blue to-transparent' : 
                category.color === 'accent-blue' ? 'bg-gradient-to-br from-accent-blue via-purple-accent to-transparent' : 
                'bg-gradient-to-br from-success-green via-teal to-transparent'
              }`}></div>
              <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClass(category.color)}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${
                  category.color === 'navy' ? 'from-navy to-accent-blue' : 
                  category.color === 'accent-blue' ? 'from-accent-blue to-purple-accent' : 
                  'from-success-green to-teal'
                } bg-clip-text text-transparent`}>{category.title}</h3>
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
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div className="bg-card-background-alt py-12 px-8 rounded-2xl relative overflow-hidden border border-divider-gray shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/3 via-teal-blue/2 to-success-green/3"></div>
          <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-charcoal-black mb-4 relative inline-block">
              Certifications & Education
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary-blue rounded-full"></div>
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-card-background-alt p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-divider-gray">
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
      </div>
    </section>
  );
};

export default SkillsSection;
