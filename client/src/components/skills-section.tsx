import { ClipboardCheck, Code, BarChart3, Award, Shield, Monitor, Terminal, Network, GraduationCap, Computer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Project Management Core",
      icon: ClipboardCheck,
      color: "primary-blue",
      type: "pm",
      skills: [
        { name: "CAPM Certification", experience: "In Progress", description: "Summer 2025 - Based on IS 350/450 PM coursework (4.0 GPA)", accent: "primary-blue" },
        { name: "Project Management I", experience: "Academic", description: "IS 350 - Project Management I (4.0 GPA)", accent: "primary-blue" },
        { name: "Project Management II", experience: "Academic", description: "IS 450 - Project Management II (4.0 GPA)", accent: "primary-blue" },
        { name: "Team Leadership", experience: "18+ Years", description: "Led 12-person teams at Dell Technologies", accent: "teal-blue" },
        { name: "Stakeholder Communication", experience: "20+ Years + Academic", description: "Professional experience + CMST 242 Organizational Comm (4.0)", accent: "primary-blue" },
        { name: "Project Documentation", experience: "20+ Years + Academic", description: "SOPs/procedures + ENGL& 235 Technical Writing (4.0)", accent: "teal-blue" },
      ],
    },
    {
      title: "Technical Foundation", 
      icon: Code,
      color: "primary-blue",
      type: "tech",
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

  // Verified Badges & Education (5 certifications)
  const verifiedBadges = [
    {
      name: "CAPM Candidate",
      description: "Project Management Institute – In Progress",
      detail: "Summer 2025 – PMI I & II Complete (4.0 GPA)",
      icon: Award,
      color: "primary-blue",
      link: null,
      credentialId: "In Progress"
    },
    {
      name: "CCNA: Introduction to Networks",
      description: "Cisco Verified Badge",
      detail: "Issued: Dec 7, 2023",
      icon: Code,
      color: "teal-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Introduction to Cybersecurity",
      description: "Cisco Verified Badge",
      detail: "Issued: Nov 11, 2024",  
      icon: Shield,
      color: "primary-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Introduction to Data Science",
      description: "Cisco Verified Badge",
      detail: "Issued: Feb 26, 2024",
      icon: BarChart3,
      color: "teal-blue", 
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    },
    {
      name: "Networking Academy Learn-A-Thon 2024",
      description: "Cisco Verified Badge",
      detail: "Issued: Feb 26, 2024",
      icon: Award,
      color: "primary-blue",
      link: "https://www.credly.com/users/april-sykes.3f9fe1f6",
      credentialId: "Credly Verified"
    }
  ];

  // Technical Certifications (4 certifications)
  const technicalCertifications = [
    {
      name: "CompTIA Linux+",
      description: "",
      detail: "TestOut ID: 6-2C6-VCQ5KS",
      icon: Terminal,
      color: "teal-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-vcq5ks",
      credentialId: "6-2C6-VCQ5KS"
    },
    {
      name: "CompTIA A+ Client",
      description: "",
      detail: "TestOut ID: 6-2c6-v3pmva",
      icon: Monitor,
      color: "teal-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-v3pmva",
      credentialId: "6-2c6-v3pmva"
    },
    {
      name: "CompTIA A+ PC Pro",
      description: "",
      detail: "TestOut ID: 6-2c6-v3p73s",
      icon: Computer,
      color: "primary-blue", 
      link: "https://certification.testout.com/verifycert/6-2c6-v3p73s",
      credentialId: "6-2c6-v3p73s"
    },
    {
      name: "CompTIA Network+",
      description: "",
      detail: "TestOut ID: 6-2c6-vw5625",
      icon: Network,
      color: "teal-blue",
      link: "https://certification.testout.com/verifycert/6-2c6-vw5625", 
      credentialId: "6-2c6-vw5625"
    }
  ];

  // Academic Recognition (1 certification)
  const academicRecognition = [
    {
      name: "BAS-IS Student",
      description: "Olympic College – 3.94 GPA",
      detail: "President's Scholar (9 terms and counting) | Spring 2026",
      icon: GraduationCap,
      color: "primary-blue",
      link: null,
      credentialId: "President's Scholar"
    }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary-blue": return "bg-primary-blue/10 text-primary-blue";
      case "teal-blue": return "bg-teal-blue/10 text-teal-blue";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getBorderClass = (accent: string) => {
    switch (accent) {
      case "primary-blue": return "border-primary-blue";
      case "teal-blue": return "border-teal-blue";
      default: return "border-gray-300";
    }
  };

  const getExperienceTagClass = (experience: string) => {
    if (experience.includes('Academic')) return 'bg-blue-100 text-blue-800';
    if (experience.includes('Years')) return 'bg-gray-100 text-gray-800';
    return 'bg-teal-100 text-teal-800';
  };

  return (
    <section id="skills" className="py-20 bg-light-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="hidden md:flex items-center justify-center mb-4">
            <Code className="w-8 h-8 text-primary-blue" />
          </div>
          <h2 className="text-4xl font-bold text-charcoal-black mb-4">
            Skills & Certifications
            <div className="w-24 h-1 bg-primary-blue mx-auto mt-2 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical expertise and project management capabilities developed through 20+ years of experience and continuous academic advancement
          </p>
        </div>

        {/* Skills Categories */}
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-column">
              <h3 className="skills-heading">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <h4 className="skill-name">{skill.name}</h4>
                    <p className="skill-description">{skill.description}</p>
                    <p className="skill-experience">
                      <strong>Experience:</strong> {skill.experience}
                    </p>
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
            
            {/* Verified Badges & Education */}
            <h3 className="cert-heading">Verified Badges & Education</h3>
            <div className="cert-grid">
              {verifiedBadges.map((cert, index) => (
                <div key={`verified-${index}`} className="cert-card modern-card hover-scale hover:border-primary-blue hover:border-2 transition-all duration-300 animate-fade-in-up border border-gray-100">
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
                            {cert.credentialId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Certifications */}
            <h3 className="cert-heading">Technical Certifications</h3>
            <div className="cert-grid">
              {technicalCertifications.map((cert, index) => (
                <div key={`technical-${index}`} className="cert-card modern-card hover-scale hover:border-primary-blue hover:border-2 transition-all duration-300 animate-fade-in-up border border-gray-100">
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
                          <span className="inline-flex items-center text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                            {cert.credentialId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Recognition */}
            <h3 className="cert-heading">Academic Recognition</h3>
            <div className="cert-grid">
              {academicRecognition.map((cert, index) => (
                <div key={`academic-${index}`} className="cert-card modern-card hover-scale hover:border-primary-blue hover:border-2 transition-all duration-300 animate-fade-in-up border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColorClass(cert.color)}`}>
                      <cert.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{cert.name}</h4>
                      <p className="text-xs text-gray-600 mb-1">{cert.description}</p>
                      <p className="text-xs text-gray-500 mb-2">{cert.detail}</p>
                      {cert.credentialId && (
                        <div className="mt-1">
                          <span className="inline-flex items-center text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                            {cert.credentialId}
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