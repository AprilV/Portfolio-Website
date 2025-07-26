import { CheckCircle, Clock, MapPin, Building2, Calendar, Award, Users, Target } from "lucide-react";
import { motion } from "framer-motion";

// Company logo components
const DellLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#007DB8"/>
    <text x="16" y="22" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10">DELL</text>
  </svg>
);

const OlympicLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#1E3A8A"/>
    <circle cx="16" cy="12" r="4" fill="white"/>
    <rect x="12" y="18" width="8" height="6" fill="white"/>
    <rect x="10" y="24" width="12" height="2" fill="white"/>
  </svg>
);

const ExperienceSection = () => {
  const experiences = [
    {
      title: "IT Technician",
      company: "Olympic College", 
      period: "Aug 2023 - Jul 2024",
      location: "Bremerton, WA",
      type: "work",
      logo: <OlympicLogo />,
      description: "Provided comprehensive IT support across campus systems while pursuing education. Strengthened communication and coordination skills in project-based environments.",
      achievements: [
        "Provided comprehensive IT support and troubleshooting for 1,200+ campus users across 5 academic buildings",
        "Improved ticket resolution time by 25% through systematic troubleshooting across multi-building network", 
        "Coordinated with faculty and staff on incident resolution, reducing response time by 30%",
        "Provided technical support and troubleshooting assistance to faculty and staff across campus",
      ],
      techStack: ["Windows Server", "Active Directory", "Cisco Networking", "ServiceDesk", "Documentation"],
      metrics: [
        { value: "1,200+", label: "Campus Users" },
        { value: "25%", label: "Faster Resolution" },
        { value: "5", label: "Academic Buildings" },
        { value: "30%", label: "Response Time" },
      ],
    },
    {
      title: "Bachelor of Applied Science Student", 
      company: "Olympic College",
      period: "Jan 2023 - Present",
      location: "Bremerton, WA", 
      type: "education",
      logo: <OlympicLogo />,
      description: "Information Systems (BASIS) program with concentration in Project Management. Completing comprehensive PM coursework with academic distinction.",
      achievements: [
        "Project Management I & II Completed with distinction",
        "President's Scholar honors achieved 9 quarters during program",
        "CAPM Exam Preparation scheduled for Summer 2025",
      ],
      highlights: [
        "Maintained 3.94 GPA while working part-time in IT support",
        "Built TimelyRx medication reminder app using modern development practices",
        "Developed PMP exam simulator implementing Agile methodologies",
      ],
      techStack: ["Project Management", "Systems Analysis", "Technical Writing", "Business Statistics", "Information Assurance"],
      metrics: [
        { label: "Current GPA", value: "3.94" },
        { label: "President's Scholar", value: "Every Term" },
        { label: "Graduation", value: "Spring 2026" },
      ],
    },
    {
      title: "Operations Lead - Mainframe Upgrade & Migration Project",
      company: "Dell Technologies (Contracted to CHI/Jewish Hospital & UofL Health)",
      period: "Jan 2011 - Jan 2013",
      location: "Louisville, KY",
      type: "work",
      logo: <DellLogo />,
      description: "Operations Lead for mainframe infrastructure upgrade and McKesson/Cerner migration project. Managed cross-functional teams and maintained critical healthcare operations during complex system transitions. Left project during transition phase.",
      achievements: [
        "Led team of 12 technicians supporting 5000+ endpoints across regional hospitals in 3 states",
        "Achieved 100% system uptime during critical McKesson/Cerner healthcare migration phases",
        "Coordinated cross-functional teams during complex healthcare system migration phases",
        "Managed comprehensive mainframe upgrade deliverables spanning KY, IN, and OH regions",
      ],
      techStack: ["Mainframes", "McKesson", "Cerner", "Healthcare IT", "Migration Planning", "Operations Coordination"],
      metrics: [
        { label: "Project Duration", value: "2 Years" },
        { label: "System Uptime", value: "100%" },
        { label: "Regional Impact", value: "3 States" },
        { label: "Team Coordination", value: "Multi-Dept" },
      ],
    },
    {
      title: "System Analyst & Team Lead",
      company: "Dell Technologies (Contracted to CHI/Jewish Hospital & UofL Health)",
      period: "Oct 1997 - Jan 2013",
      location: "Louisville, KY",
      type: "work",
      logo: <DellLogo />,
      description: "Led mainframe operations and infrastructure services for Jewish Hospital and KentuckyOne Healthcare through organizational transitions from Perot Systems to Dell Technologies. Promoted to Team Lead with full P&L responsibility for 24/7 operations.",
      achievements: [
        "Managed 24x7 operations with 3-shift scheduling and on-call responsibilities for 5,000+ devices across Jewish Hospital, UofL, and affiliated regional healthcare facilities",
        "Supervised remote staff in India while coordinating with support teams in Plano, TX for cross-departmental incident resolution",
        "Monitored all regional incidents, tickets, and resolutions while maintaining direct end-user support during and after organizational transition to Dell",
        "Authored and maintained thousands of technical documents in both physical binders and SharePoint systems",
        "Responsible for PHI (Protected Health Information) security and compliance in healthcare systems",
        "Maintained 99.9% system uptime during three major organizational transitions (Perot→Dell→Wipro)",
        "Awarded Ambassador Award for Excellence at Jewish Hospital for outstanding performance and dedication",
      ],
      techStack: ["Mainframes", "PeopleSoft", "SharePoint", "Disaster Recovery", "SLA Management", "Healthcare IT"],
      metrics: [
        { value: "5,000+", label: "Devices Managed" },
        { value: "24x7", label: "Operations" },
        { value: "PHI", label: "Compliance" },
        { value: "Multi-State", label: "Coverage" },
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="professional-experience-header">
              <h2 className="section-header">
                Professional Experience
                <div className="section-underline"></div>
              </h2>
              <p className="section-subtitle">Selected Roles Demonstrating IT & Leadership Growth</p>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Progressive advancement from IT specialist to infrastructure leader and project coordinator with a strong foundation in team management and enterprise systems
            </p>
            
            {/* Role Impact Summary Banner */}
            <div className="role-impact-banner">
              <div className="impact-icon">💼</div>
              <div className="impact-text-multiline">
                <div className="impact-line-primary">20+ years of experience in IT Operations, Systems Analysis, and Technical Leadership</div>
                <div className="impact-line-secondary">12+ years as Systems Analyst and Operations Technician, 6+ years as Team Lead</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="experience-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Experience Header */}
              <div className="experience-header">
                <div className="company-logo-container">
                  <div className="company-logo">
                    {exp.logo}
                  </div>
                  <div className="timeline-connector">
                    <div className="timeline-dot"></div>
                    {index < experiences.length - 1 && <div className="timeline-line"></div>}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <h3 className="job-title job-title-hover">
                        {exp.title}
                      </h3>
                      <p className="company-name">{exp.company}</p>
                      <div className="job-meta">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                        {exp.type === "education" && (
                          <span className="education-badge">
                            <Award className="h-3 w-3" />
                            Academic
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Metrics Panel - Only for Operations Lead role */}
                    {exp.metrics && (
                      <div className="metrics-grid">
                        {exp.metrics.map((metric, idx) => (
                          <div key={idx} className="metric-card">
                            <div className="metric-value">{metric.value}</div>
                            <div className="metric-label">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="experience-description">{exp.description}</p>

                  {/* Main Achievements Section */}
                  <div className="achievements-section">
                    <h4 className="section-title">
                      <Target className="h-4 w-4" />
                      Key Responsibilities & Achievements
                    </h4>
                    <ul className="responsibilities">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>

                    {/* Integrated Major Accomplishments */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="highlights-section">
                        <h5 className="highlights-title">
                          <Award className="h-4 w-4" />
                          Major Accomplishments
                        </h5>
                        <ul className="highlights">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx}>
                              <span className="highlight">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Mini Skill Badges per Job */}
                  {exp.techStack && (
                    <div className="tech-stack-section">
                      <h5 className="tech-stack-title">
                        <span className="flex items-center gap-2">
                          <span className="tech-icon">⚡</span>
                          Key Technologies & Skills
                        </span>
                      </h5>
                      <div className="tech-stack">
                        {exp.techStack.map((tech, idx) => (
                          <span key={idx} className="tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Professional Summary CTA */}
        <div className="mt-16 text-center">
          <div className="bg-card-gradient p-8 rounded-xl shadow-lg border border-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Ready to Lead Your Next IT Project?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Two decades of IT infrastructure expertise combined with formal project management education. 
              Proven track record of leading teams, managing complex systems, and delivering results in high-stakes environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#resume" 
                className="inline-flex items-center gap-2 bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-primary-blue/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Resume Templates
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Let's Connect
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
