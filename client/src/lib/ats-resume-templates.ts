export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin?: string;
  };
  summary: Record<string, string>;
  experience: Array<{
    title: string;
    company: string;
    dates: string;
    achievements: string[];
  }>;
  capstoneProjects: Array<{
    title: string;
    course: string;
    technologies: string[];
    achievements: string[];
  }>;
  education: {
    degree: string;
    school: string;
    gpa: string;
    honors: string[];
    relevantCourses: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
  skills: {
    projectManagement: string[];
    technical: string[];
    software: string[];
    methodologies: string[];
  };
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "April V. Sykes",
    title: "Assistant Project Manager | IT Professional | CAPM Candidate",
    location: "Bremerton, WA",
    email: "april.sykes.pm@gmail.com",
    phone: "(360) 555-0123",
    linkedin: "linkedin.com/in/aprilsykes"
  },
  summary: {
    standard: "Results-driven IT professional with 20+ years of infrastructure experience transitioning to project management. Currently pursuing CAPM certification with formal education in Project Management I & II. Proven track record of leading cross-functional teams up to 12 members at Dell Technologies. Combines deep technical expertise with emerging project leadership skills to drive operational excellence and stakeholder satisfaction.",
    
    technical: "Senior IT Infrastructure Professional with 20+ years hands-on experience in enterprise environments, transitioning to technical project management roles. CAPM candidate with formal Project Management I & II coursework. Expert in Windows systems, LAN administration, and network security with CompTIA certifications. Proven ability to bridge technical and business stakeholders while managing complex infrastructure projects and cross-functional teams.",
    
    wastate: "Dedicated IT professional with 20+ years of experience serving Washington State communities, seeking Assistant Project Manager role in state government. Currently completing Bachelor of Applied Science in Information Systems at Olympic College with specialized Project Management coursework. President's Scholar with proven academic excellence. Committed to public service excellence with proven track record of managing critical infrastructure supporting citizens and government operations. Strong background in compliance, documentation, and stakeholder collaboration essential for effective public sector project management.",
    
    internship: "Motivated IT professional with 20+ years of hands-on experience transitioning to project management through formal education. Currently pursuing Bachelor of Applied Science in Information Systems with specialized Project Management I & II coursework. President's Scholar with strong academic foundation combined with extensive technical background provides unique perspective for project management internships. Eager to apply classroom learning and technical expertise to real-world project challenges while contributing to organizational success.",
    
    assistant: "Results-oriented IT professional with 20+ years of technical experience seeking Assistant Project Manager role to leverage deep infrastructure knowledge in project coordination. Currently completing Bachelor of Applied Science in Information Systems with formal Project Management education. President's Scholar with proven ability to support cross-functional teams, document processes, and facilitate stakeholder communication. Ready to transition technical expertise into project support role while pursuing CAPM certification.",
    
    datacenter: "Senior Infrastructure Professional with 20+ years of comprehensive datacenter operations and enterprise system administration experience. Expert in Windows Server environments, network infrastructure, and critical system maintenance supporting 1000+ users at Dell Technologies. Proven track record of managing complex infrastructure projects, system migrations, and 24/7 operations ensuring 99.9% uptime. CompTIA and CCNA certified with deep expertise in virtualization, network security, and disaster recovery protocols.",
    
    federal: "Highly qualified IT professional with two decades of enterprise infrastructure experience seeking Assistant Project Manager role in federal/government environment. Currently completing Bachelor of Applied Science in Information Systems with specialized Project Management coursework. Security-conscious with extensive compliance and documentation experience. President's Scholar with proven academic excellence and commitment to continuous professional development.",
    
    executive: "Strategic IT leader with 20+ years of progressive experience managing complex technical initiatives and leading high-performance teams. Currently advancing project management expertise through formal CAPM certification track. Demonstrated success in cross-functional collaboration, stakeholder management, and operational excellence at Fortune 500 organizations. Proven ability to deliver results while mentoring technical professionals and driving organizational transformation."
  },
  experience: [
    {
      title: "Senior IT Infrastructure Specialist",
      company: "Dell Technologies",
      dates: "2018 - Present",
      achievements: [
        "Led cross-functional teams of up to 12 technical professionals across multiple infrastructure modernization projects",
        "Managed critical infrastructure upgrades affecting 1000+ users with zero downtime, ensuring business continuity",
        "Developed and maintained comprehensive documentation and standard operating procedures, improving team efficiency by 40%",
        "Coordinated with stakeholders across IT, operations, and business units to ensure project alignment with organizational goals",
        "Implemented process improvements reducing system resolution time by 35% and increasing customer satisfaction scores",
        "Mentored junior team members and provided technical leadership during complex system migrations and upgrades"
      ]
    },
    {
      title: "IT Systems Administrator",
      company: "Previous Organizations",
      dates: "2004 - 2018",
      achievements: [
        "Administered enterprise Windows environments supporting 500+ users across multiple business units",
        "Managed LAN/WAN infrastructure and network security protocols, maintaining 99.9% uptime for mission-critical systems",
        "Provided technical leadership for system migrations and upgrades, ensuring minimal business impact",
        "Collaborated with vendors and third-party service providers to deliver integrated technology solutions",
        "Developed disaster recovery procedures and conducted regular testing to ensure business continuity",
        "Created training materials and conducted knowledge transfer sessions for technical staff"
      ]
    }
  ],
  capstoneProjects: [
    {
      title: "PMP Quiz App - Full-Stack Exam Simulator",
      course: "PM450 Project Management Capstone",
      technologies: ["Full-Stack Development", "Agile Methodology", "AWS Deployment"],
      achievements: [
        "Developed complete full-stack architecture with timer functionality and randomized question delivery",
        "Implemented dynamic scoring with real-time feedback mechanisms for enhanced user experience",
        "Applied Agile sprint planning with iterative development cycles and project scope management",
        "Gained hands-on experience with AWS deployment and cloud infrastructure management"
      ]
    },
    {
      title: "TimelyRx Medication Reminder App",
      course: "IS320 App Development Capstone", 
      technologies: ["React", "WCAG Accessibility", "Healthcare Technology"],
      achievements: [
        "Built React-based application with comprehensive design architecture and caregiver tracking features",
        "Implemented WCAG accessibility compliance and comprehensive testing protocols",
        "Designed professional interface with scheduling logic and local data tracking management",
        "Completed iterative development process from initial concept through alpha release"
      ]
    },
    {
      title: "Professional Portfolio Website",
      course: "CIS151 Web Development Capstone",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      achievements: [
        "Built professional portfolio from scratch with custom navigation and Font Awesome integration",
        "Implemented mobile-responsive design with cross-browser compatibility testing",
        "Integrated professional photography and optimized user experience for multiple devices",  
        "Deployed live website demonstrating comprehensive web development skills"
      ]
    }
  ],
  education: {
    degree: "Bachelor of Applied Science - Information Systems",
    school: "Olympic College",
    gpa: "President's Scholar",
    honors: ["President's Scholar (8 consecutive terms)", "Dean's List"],
    relevantCourses: [
      "Project Management I (IS 350)",
      "Project Management II (IS 450)", 
      "Information Systems Integration (IS 302)",
      "Leading in the Digital World (IS 320)",
      "LAN Administration IV (IS 346)",
      "Information System Security I (CIS 236)"
    ]
  },
  certifications: [
    {
      name: "CAPM (Certified Associate in Project Management) - In Progress",
      issuer: "Project Management Institute (PMI)",
      date: "Summer 2025"
    },
    {
      name: "CompTIA Linux+ Professional",
      issuer: "CompTIA",
      date: "2024",
      credentialId: "6-2C6-VCQ5KS"
    },
    {
      name: "CompTIA Network+ Professional", 
      issuer: "CompTIA",
      date: "2024",
      credentialId: "6-2C6-VV5625"
    },
    {
      name: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco (Credly Verified)",
      date: "March 20, 2024"
    },
    {
      name: "CCNA: Introduction to Networks",
      issuer: "Cisco (Credly Verified)", 
      date: "December 7, 2023"
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco (Credly Verified)",
      date: "November 11, 2024"
    },
    {
      name: "Introduction to Data Science",
      issuer: "Cisco (Credly Verified)",
      date: "February 26, 2024"
    },
    {
      name: "Networking Academy Learn-A-Thon 2024",
      issuer: "Cisco (Credly Verified)",
      date: "February 26, 2024"
    }
  ],
  skills: {
    projectManagement: [
      "Project lifecycle management",
      "Cross-functional team leadership",
      "Stakeholder communication and management",
      "Risk assessment and mitigation",
      "Process improvement and optimization",
      "Resource allocation and planning",
      "Project documentation and reporting",
      "Budget management and cost control"
    ],
    technical: [
      "Windows Server administration (20+ years)",
      "LAN/WAN network administration",
      "Network security protocols and compliance",
      "Linux system administration",
      "Cisco routing and switching",
      "Infrastructure design and implementation",
      "System migration and upgrades",
      "Disaster recovery planning"
    ],
    software: [
      "Microsoft Project",
      "Microsoft Office Suite (Advanced)",
      "Active Directory",
      "VMware virtualization",
      "Cisco networking tools",
      "Network monitoring systems",
      "Help desk ticketing systems",
      "Documentation platforms"
    ],
    methodologies: [
      "Agile project management",
      "ITIL framework",
      "Change management processes",
      "Quality assurance protocols",
      "Continuous improvement practices",
      "Vendor management",
      "Service level agreement (SLA) management",
      "Incident response procedures"
    ]
  }
};

export const generateATSResumeContent = (format: string): string => {
  const data = resumeData;
  const selectedSummary = data.summary[format] || data.summary.standard;

  let resumeContent = `${data.personalInfo.name.toUpperCase()}
${data.personalInfo.title}
${data.personalInfo.location} | ${data.personalInfo.email} | ${data.personalInfo.phone}`;

  if (data.personalInfo.linkedin) {
    resumeContent += ` | ${data.personalInfo.linkedin}`;
  }

  resumeContent += `

PROFESSIONAL SUMMARY
${selectedSummary}

CORE COMPETENCIES`;

  // Add skills based on format
  if (format === 'technical') {
    resumeContent += `\n• ${data.skills.technical.slice(0, 4).join(' • ')}\n• ${data.skills.projectManagement.slice(0, 4).join(' • ')}\n• ${data.skills.software.slice(0, 4).join(' • ')}`;
  } else if (format === 'wastate') {
    resumeContent += `\n• ${data.skills.projectManagement.slice(0, 4).join(' • ')}\n• Public sector experience • Stakeholder collaboration • Process improvement • Community service\n• ${data.skills.technical.slice(0, 3).join(' • ')} • Government compliance`;
  } else if (format === 'internship') {
    resumeContent += `\n• Academic Excellence: President's Scholar • Project Management Coursework • CAPM Candidate\n• ${data.skills.technical.slice(0, 4).join(' • ')}\n• Strong foundation in ${data.skills.methodologies.slice(0, 3).join(', ')} methodologies`;
  } else if (format === 'assistant') {
    resumeContent += `\n• ${data.skills.projectManagement.slice(0, 4).join(' • ')}\n• Process documentation • Team support • Stakeholder coordination • Technical communication\n• ${data.skills.technical.slice(0, 3).join(' • ')} • ${data.skills.software.slice(0, 2).join(' • ')}`;
  } else if (format === 'datacenter') {
    resumeContent += `\n• ${data.skills.technical.join(' • ')}\n• Datacenter operations • 24/7 system monitoring • Infrastructure management • Disaster recovery\n• ${data.skills.software.slice(0, 4).join(' • ')} • ${data.skills.methodologies.slice(0, 3).join(' • ')}`;
  } else if (format === 'federal') {
    resumeContent += `\n• ${data.skills.projectManagement.slice(0, 6).join(' • ')}\n• ${data.skills.methodologies.slice(0, 4).join(' • ')}`;
  } else {
    resumeContent += `\n• ${data.skills.projectManagement.slice(0, 4).join(' • ')}\n• ${data.skills.technical.slice(0, 4).join(' • ')}`;
  }

  resumeContent += `\n\nPROFESSIONAL EXPERIENCE\n`;

  // Add experience
  data.experience.forEach(job => {
    resumeContent += `\n${job.title} | ${job.company} | ${job.dates}\n`;
    job.achievements.forEach(achievement => {
      resumeContent += `• ${achievement}\n`;
    });
  });

  // Add capstone projects
  resumeContent += `\nCAPSTONE PROJECTS\n`;
  data.capstoneProjects.forEach(project => {
    resumeContent += `\n${project.title} | ${project.course}\n`;
    resumeContent += `Technologies: ${project.technologies.join(', ')}\n`;
    project.achievements.forEach(achievement => {
      resumeContent += `• ${achievement}\n`;
    });
  });

  // Add education
  resumeContent += `\nEDUCATION\n\n${data.education.degree} | ${data.education.school} | Expected 2026\n`;
  resumeContent += `• ${data.education.honors.join(' | ')}\n`;
  resumeContent += `• Relevant Coursework: ${data.education.relevantCourses.join(', ')}\n`;

  // Add certifications
  resumeContent += `\nCERTIFICATIONS\n`;
  data.certifications.forEach(cert => {
    resumeContent += `\n• ${cert.name} - ${cert.issuer} (${cert.date})`;
    if (cert.credentialId) {
      resumeContent += ` - ID: ${cert.credentialId}`;
    }
  });

  // Add technical skills section
  resumeContent += `\n\nTECHNICAL SKILLS\n`;
  resumeContent += `• Project Management: ${data.skills.projectManagement.slice(0, 6).join(', ')}\n`;
  resumeContent += `• Technical Systems: ${data.skills.technical.slice(0, 6).join(', ')}\n`;
  resumeContent += `• Software & Tools: ${data.skills.software.join(', ')}\n`;
  resumeContent += `• Methodologies: ${data.skills.methodologies.slice(0, 6).join(', ')}`;

  return resumeContent;
};

export const atsKeywords = {
  projectManagement: [
    "project management", "project manager", "assistant project manager",
    "PMP", "CAPM", "agile", "scrum", "waterfall", "kanban",
    "stakeholder management", "risk management", "budget management",
    "cross-functional teams", "project lifecycle", "deliverables",
    "milestone tracking", "resource allocation", "change management"
  ],
  technical: [
    "IT infrastructure", "network administration", "system administration",
    "Windows Server", "Active Directory", "LAN/WAN", "TCP/IP",
    "CompTIA", "Cisco", "CCNA", "Linux", "virtualization",
    "network security", "troubleshooting", "technical support"
  ],
  softSkills: [
    "leadership", "communication", "problem-solving", "analytical",
    "team collaboration", "mentoring", "training", "documentation",
    "customer service", "time management", "attention to detail",
    "process improvement", "continuous learning"
  ],
  waState: [
    "public service", "government operations", "state agency", "municipal",
    "citizen services", "public administration", "regulatory compliance",
    "Washington State", "local government", "community engagement",
    "public sector", "government contracting", "transparency",
    "accountability", "civic responsibility", "public interest"
  ],
  internship: [
    "internship", "entry level", "recent graduate", "academic excellence",
    "coursework", "academic excellence", "learning oriented", "growth potential",
    "educational background", "project management student", "CAPM candidate",
    "fresh perspective", "eager to learn", "strong foundation"
  ],
  assistant: [
    "assistant project manager", "project coordinator", "project analyst",
    "project support", "team collaboration", "process documentation",
    "stakeholder coordination", "project administration", "meeting coordination",
    "status reporting", "project tracking", "administrative support"
  ],
  datacenter: [
    "datacenter operations", "infrastructure services", "system administration",
    "server management", "network operations", "24/7 monitoring", "uptime",
    "disaster recovery", "backup systems", "virtualization", "enterprise infrastructure",
    "critical systems", "hardware maintenance", "capacity planning"
  ]
};