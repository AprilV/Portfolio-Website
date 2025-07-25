import { CheckCircle, Clock, MapPin, Building2, Calendar, Award, Users, Target } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "IT Technician",
      company: "Olympic College", 
      period: "Aug 2023 - Jul 2024",
      location: "Bremerton, WA",
      type: "work",
      logo: "🎓", // Educational institution
      description: "Provided comprehensive IT support across campus systems while pursuing education. Strengthened communication and coordination skills in project-based environments.",
      achievements: [
        "Windows systems troubleshooting and repair",
        "Network device configuration and maintenance", 
        "Technical documentation and knowledge base contributions",
      ],
      highlights: [
        "Improved ticket resolution time by 25% through systematic troubleshooting",
        "Cross-departmental coordination with faculty and staff",
        "Proactive maintenance reduced system downtime significantly",
      ],
      techStack: ["Windows Server", "Active Directory", "Cisco Networking", "ServiceDesk", "Documentation"],
    },
    {
      title: "Bachelor of Applied Science Student", 
      company: "Olympic College",
      period: "Jan 2023 - Present",
      location: "Bremerton, WA", 
      type: "education",
      logo: "🎓", // Educational institution
      description: "Information Systems (BASIS) program with concentration in Project Management. Maintaining 3.94 GPA while completing comprehensive PM coursework.",
      achievements: [
        "Project Management I & II Completed with distinction",
        "President's Scholar honors achieved every quarter",
        "CAPM Exam Preparation scheduled for Summer 2025",
      ],
      highlights: [
        "Maintained 3.94 GPA while working full-time in IT support",
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
      company: "Dell Technologies",
      period: "Jan 2011 - Jun 2016",
      location: "Louisville, KY",
      type: "work",
      logo: "💻", // Technology company
      description: "Operations Lead for mainframe infrastructure upgrade and McKesson/Cerner migration project. Managed cross-functional teams and maintained critical healthcare operations during complex system transitions.",
      achievements: [
        "Coordinated departmental support scheduling for mainframe upgrade phases",
        "Collaborated with cross-functional teams on migration planning and execution",
        "Assisted with performing mainframe upgrades and system transitions",
        "Supported McKesson/Cerner migration from legacy mainframe systems",
      ],
      highlights: [
        "Achieved 100% system uptime during critical healthcare migration",
        "Reduced migration timeline by 15% through improved coordination",
        "Led cross-departmental teams spanning 3 regional states",
      ],
      techStack: ["Mainframes", "McKesson", "Cerner", "Healthcare IT", "Migration Planning", "Operations Coordination"],
      metrics: [
        { label: "Project Duration", value: "5+ Years" },
        { label: "System Uptime", value: "100%" },
        { label: "Regional Impact", value: "3 States" },
        { label: "Team Coordination", value: "Multi-Dept" },
      ],
    },
    {
      title: "System Analyst & Team Lead",
      company: "Dell Technologies",
      period: "Oct 1997 - Jun 2016",
      location: "Louisville, KY",
      status: "completed",
      description: "Led mainframe operations and infrastructure services for Jewish Hospital and KentuckyOne Healthcare through organizational transitions from Perot Systems to Dell Technologies to Wipro. Promoted to Team Lead with full P&L responsibility for 24/7 operations.",
      achievements: [
        "Managed 14,000 tape backup infrastructure with daily, weekly, quarterly, and yearly retention cycles",
        "Led annual disaster recovery operations at off-site New Jersey recovery center",
        "Generated department profit by offering and billing high-value services beyond standard SLA",
        "Coordinated multi-region hospital data integration across KY, IN, and OH",
        "Authored thousands of step-by-step guides, SOPs, and technical procedures for SharePoint archives",
        "Executed monthly system updates and time-sensitive IPLs across multiple time zones",
        "Maintained 100% SLA compliance with PeopleSoft ticket monitoring and escalation follow-through",
        "Coordinated with Dell support in Plano, TX and global teams in India for incident resolution",
      ],
      highlights: [
        "Mainframe Upgrade Project Leadership (2011-2013)",
        "Cross-functional team coordination",
        "Critical healthcare system reliability",
        "24/7 shift management and escalation chains",
      ],
      stats: [
        { label: "Years Experience", value: "18.75" },
        { label: "Team Members", value: "12" },
        { label: "Operations", value: "24/7" },
        { label: "SLA Compliance", value: "100%" },
        { label: "Tape Infrastructure", value: "14,000" },
        { label: "Regional Coverage", value: "3 States" },
      ],
    },
  ];

  return (
    <section id="experience" className="py-12 bg-background" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="section-header">
              Professional Experience
              <div className="section-underline"></div>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mt-6">Twenty years of IT infrastructure experience with six years of team leadership</p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary-blue/20 h-full hidden lg:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col lg:flex-row items-start lg:items-center">
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:order-2'} mb-8 lg:mb-0`}>
                  <div className="bg-card-gradient p-8 rounded-xl shadow-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full ${
                        exp.status === 'current' ? 'bg-teal-blue' : 'bg-primary-blue'
                      }`}></div>
                      {exp.status === 'current' && (
                        <span className="text-sm font-medium text-teal-blue">Current</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{exp.title}</h3>
                    <p className="text-primary-blue font-medium mb-1">{exp.company}</p>
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <p className="text-card-foreground mb-4">{exp.description}</p>
                    
                    {exp.stats && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {exp.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-2xl font-bold text-primary">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {(exp.achievements || []).slice(0, 4).map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-teal-blue flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                      {(exp.achievements || []).length > 4 && (
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-primary-blue hover:text-primary-blue/80 font-medium">
                            Show {(exp.achievements || []).length - 4} more achievements...
                          </summary>
                          <div className="mt-2 space-y-2">
                            {(exp.achievements || []).slice(4).map((achievement, achIndex) => (
                              <div key={achIndex + 4} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-teal-blue flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Timeline marker - aligned with job title */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg hidden lg:block top-16 ${
                  exp.status === 'current' ? 'bg-teal-blue' : index === 1 ? 'bg-primary-blue' : 'bg-primary-blue'
                }`}></div>
                
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8 lg:order-2' : 'lg:pr-8'}`}>
                  <div className="bg-card-gradient p-8 rounded-xl shadow-lg border border-border">
                    <h4 className="text-lg font-semibold text-card-foreground mb-4">
                      {exp.status === 'current' ? 'Key Achievements' : 'Major Accomplishments'}
                    </h4>
                    <ul className="space-y-2 text-card-foreground text-sm">
                      {(exp.highlights || []).map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary-blue rounded-full flex-shrink-0 mt-2"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
