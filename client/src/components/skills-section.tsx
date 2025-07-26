import { ClipboardCheck, Code, BarChart3, Award, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Project Management Core",
      icon: ClipboardCheck,
      color: "primary-blue",
      skills: [
        { name: "CAPM Certification", experience: "In Progress", description: "Summer 2025 - Based on IS 350/450 PM coursework (4.0 GPA)", accent: "primary-blue" },
        { name: "Project Management I", experience: "Academic", description: "IS 350 - Project Management I (4.0 GPA)", accent: "primary-blue" },
        { name: "Project Management II", experience: "Academic", description: "IS 450 - Project Management II (4.0 GPA)", accent: "primary-blue" },
        { name: "Team Leadership", experience: "18+ Years", description: "Led 12-person teams at Dell Technologies", accent: "teal-blue" },
        { name: "Stakeholder Communication", experience: "20+ Years + Academic", description: "Professional experience + CMST 242 Organizational Comm (4.0)", accent: "primary-blue" },
        { name: "Project Documentation", experience: "20+ Years + Academic", description: "SOPs/procedures + ENGL& 235 Technical Writing (4.0)", accent: "teal-blue" },
        { name: "Risk Management", experience: "Academic", description: "Project Management I & II coursework", accent: "primary-blue" },
        { name: "Agile Methodologies", experience: "Academic + Projects", description: "Coursework & capstone implementation", accent: "teal-blue" },
      ],
    },
    {
      title: "Business & Operations",
      icon: BarChart3,
      color: "teal-blue",
      skills: [
        { name: "Information Systems Integration", experience: "Academic + Professional", description: "IS 302 (4.0 GPA) + Top LinkedIn skill", accent: "primary-blue" },
        { name: "Digital Leadership", experience: "Academic", description: "IS 320 - Leading in the Digital World (4.0 GPA)", accent: "teal-blue" },
        { name: "Business Analysis", experience: "Academic", description: "BUS 215 Business Statistics (3.7) + BUS& 101 Intro (4.0)", accent: "primary-blue" },
        { name: "Process Improvement", experience: "20+ Years", description: "Operational efficiency and system optimization", accent: "teal-blue" },
        { name: "Research & Analysis", experience: "Academic", description: "IS 390 - Reading and Research (4.0 GPA)", accent: "primary-blue" },
        { name: "Cross-functional Coordination", experience: "20+ Years", description: "Multi-departmental project coordination", accent: "teal-blue" },
      ],
    },
    {
      title: "Technical Foundation",
      icon: Code,
      color: "primary-blue",
      skills: [
        { name: "LAN Administration", experience: "20+ Years + Academic", description: "Professional experience + IS 346 LAN Administration IV (4.0)", accent: "teal-blue" },
        { name: "Windows Systems", experience: "20+ Years + Academic", description: "Professional + CIS 212 Windows/Professionals (4.0)", accent: "primary-blue" },
        { name: "Network Security", experience: "Academic", description: "CIS 236 - Info System Security I (4.0 GPA)", accent: "teal-blue" },
        { name: "Cisco Networking", experience: "Academic", description: "CIS 270 Cisco I (4.0) + CIS 271 Cisco II (4.0)", accent: "primary-blue" },
        { name: "Technical Support", experience: "20+ Years + Academic", description: "CIS 172 Technical Support Skills (4.0) + professional experience", accent: "teal-blue" },
        { name: "Server Support", experience: "Academic", description: "CIS 241 - Applications Server Support (4.0 GPA)", accent: "primary-blue" },
      ],
    },
  ];

  const certifications = [
    {
      name: "CAPM Candidate",
      description: "Project Management Institute - In Progress",
      detail: "Summer 2025 - PM I & II Complete (4.0 GPA)",
      icon: Award,
      color: "primary-blue",
      link: null,
      credentialId: "In Progress",
      status: "in-progress"
    },
    {
      name: "CCNA: Switching, Routing, and Wireless Essentials",
      description: "Cisco Verified Badge",
      detail: "Issued Mar 20, 2024",
      icon: Code,
      color: "primary-blue",
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
      color: "primary-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Introduction to Data Science",
      description: "Cisco Verified Badge",
      detail: "Issued Feb 26, 2024",
      icon: BarChart3,
      color: "teal-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Networking Academy Learn-A-Thon 2024",
      description: "Cisco Verified Badge",
      detail: "Issued Feb 26, 2024",
      icon: Award,
      color: "primary-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "CompTIA Linux+",
      description: "CompTIA Certification (via TestOut)",
      detail: "ID: 6-2C6-VCQ5KS",
      icon: Shield,
      color: "teal-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-vcq5ks",
      credentialId: "6-2C6-VCQ5KS"
    },
    {
      name: "CompTIA Security+",
      description: "CompTIA Security Certification (via TestOut)",
      detail: "ID: 6-2C6-V9F5UG",
      icon: Shield,
      color: "primary-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-v9f5ug", 
      credentialId: "6-2C6-V9F5UG"
    },
    {
      name: "CompTIA A+ Client",
      description: "CompTIA A+ Certification (via TestOut)",
      detail: "ID: 6-2c6-v3pmva",
      icon: Shield,
      color: "teal-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-v3pmva",
      credentialId: "6-2c6-v3pmva"
    },
    {
      name: "CompTIA A+ PC Pro",
      description: "CompTIA A+ Certification (via TestOut)", 
      detail: "ID: 6-2c6-v3p73s",
      icon: Shield,
      color: "primary-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-v3p73s",
      credentialId: "6-2c6-v3p73s"
    },
    {
      name: "CompTIA Network+",
      description: "CompTIA Network Professional (via TestOut)",
      detail: "ID: 6-2c6-vv5625",
      icon: Shield,
      color: "teal-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-vv5625",
      credentialId: "6-2c6-vv5625"
    },
    {
      name: "BAS-IS Student",
      description: "Olympic College - 3.94 GPA",
      detail: "President's Scholar (8 terms) | Spring 2026",
      icon: BarChart3,
      color: "primary-blue",
      link: null,
      credentialId: null
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary-blue":
        return "text-primary-blue bg-primary-blue/10";
      case "teal-blue":
        return "text-teal-blue bg-teal-blue/10";
      case "navy":
        return "text-primary-blue bg-primary-blue/10";
      case "accent-blue":
        return "text-primary-blue bg-primary-blue/10";
      case "success-green":
        return "text-teal-blue bg-teal-blue/10";
      case "purple-accent":
        return "text-primary-blue bg-primary-blue/10";
      case "orange-accent":
        return "text-teal-blue bg-teal-blue/10";
      case "coral":
        return "text-primary-blue bg-primary-blue/10";
      default:
        return "text-primary-blue bg-primary-blue/10";
    }
  };

  const getExperienceTagClass = (experience: string) => {
    // Enhanced badge contrast based on audit recommendations
    if (experience.includes("Academic")) {
      return "text-blue-700 bg-blue-100 border border-blue-200"; // Blue for Academic
    } else if (experience.includes("Years")) {
      return "text-gray-700 bg-gray-100 border border-gray-200"; // Dark Gray for Professional Experience
    } else if (experience.includes("Progress")) {
      return "text-teal-700 bg-teal-100 border border-teal-200"; // Teal for In Progress/Candidate
    } else {
      return "text-gray-700 bg-gray-100 border border-gray-200"; // Default to professional gray
    }
  };

  const getBorderClass = (accent: string) => {
    switch (accent) {
      case "primary-blue":
        return "border-primary-blue";
      case "teal-blue":
        return "border-teal-blue";
      case "navy":
        return "border-primary-blue";
      case "accent-blue":
        return "border-primary-blue";
      case "success-green":
        return "border-teal-blue";
      case "purple-accent":
        return "border-primary-blue";
      case "orange-accent":
        return "border-teal-blue";
      case "coral":
        return "border-primary-blue";
      default:
        return "border-primary-blue";
    }
  };

  return (
    <section id="skills" className="py-12 bg-secondary relative overflow-hidden" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-background-alt/50 to-background/50"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="professional-experience-header" style={{marginTop: '0'}}>
            <h2 className="section-header">
              Skills & Competencies
              <div className="section-underline"></div>
            </h2>
            <p className="section-subtitle">Technical Expertise & Project Management Capabilities</p>
          </div>
          <p className="text-xl text-muted-foreground mt-6">Technical expertise and project management capabilities</p>
        </div>
        
        <div className="skills-grid-container mb-12">
          {skillCategories.map((category, index) => (
            <div key={index} className={`modern-card-premium hover-glow group animate-fade-in-up ${
              index === 0 ? 'animation-delay-100' : 
              index === 1 ? 'animation-delay-200' : 'animation-delay-300'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center progress-ring ${getColorClass(category.color)}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-charcoal-black group-hover:text-primary-blue transition-all duration-300">{category.title}</h3>
                  <div className="w-16 h-1 bg-primary-blue/20 rounded-full mt-1 overflow-hidden">
                    <div className="w-full h-full bg-primary-blue rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className={`border-l-4 ${getBorderClass(skill.accent)} pl-4 py-2`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                      <span className={`badge-modern hover-scale ${
                        skill.experience === 'In Progress' ? 'badge-progress-shimmer' : getExperienceTagClass(skill.experience)
                      }`}>
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
        <div className="modern-card-premium relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/3 via-teal-blue/2 to-primary-blue/3"></div>
          <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-charcoal-black mb-4 relative inline-block">
              Certifications & Education
              <div className="section-underline"></div>
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className={`modern-card hover-scale hover:border-primary-blue hover:border-2 transition-all duration-300 animate-fade-in-up animation-delay-${(index % 6 + 1) * 100} border border-gray-100`}>
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
                        className="verify-credential-link inline-flex items-center text-xs text-primary-blue hover:text-primary-blue/80 transition-colors font-medium"
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
                        <span className={`inline-flex items-center text-xs px-2 py-1 rounded ${
                          cert.credentialId === 'In Progress' ? 'badge-progress' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                              cert.credentialId === 'In Progress' 
                                ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                : "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
                            } />
                          </svg>
                          {cert.credentialId === 'In Progress' ? 'In Progress' : `ID: ${cert.credentialId}`}
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
        
        {/* Professional CTA Section */}
        <div className="mt-12 text-center">
          <div className="modern-card-premium bg-gradient-to-r from-primary-blue/5 to-teal-blue/5 hover-glow">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-charcoal-black mb-4">Ready to Drive Your Next Project?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                20+ years of IT experience with proven team leadership and academic excellence in project management. 
                Let's discuss how I can contribute to your organization's success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#contact" 
                  className="cta-highlight inline-flex items-center gap-2 hover-lift"
                >
                  Let's Connect
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a 
                  href="#resume" 
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white rounded-lg transition-all duration-300 hover-lift"
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
