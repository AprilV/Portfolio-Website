import { CheckCircle, Clock, MapPin } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Bachelor of Applied Science Student",
      company: "Olympic College",
      period: "Jan 2023 - Present",
      location: "Bremerton, WA",
      status: "current",
      description: "Information Systems (BASIS) program with concentration in Project Management. Maintaining 3.94 GPA while completing comprehensive PM coursework.",
      achievements: [
        "Project Management I & II Completed",
        "President's Scholar (Multiple Quarters)",
        "CAPM Exam Preparation (Summer 2025)",
      ],
      highlights: [
        "Phi Theta Kappa Honor Society Member",
        "Active mental health advocate (NAMI Tacoma)",
        "Built TimelyRx medication reminder app",
        "Developed PMP exam simulator using Agile methods",
      ],
    },
    {
      title: "IT Technician",
      company: "Olympic College",
      period: "Aug 2023 - Jul 2024",
      location: "Bremerton, WA",
      status: "completed",
      description: "Provided comprehensive IT support across campus systems while pursuing education. Strengthened communication and coordination skills in project-based environments.",
      achievements: [
        "Windows systems troubleshooting and repair",
        "Network device configuration and maintenance",
        "Technical documentation and knowledge base contributions",
      ],
      highlights: [
        "Stakeholder support",
        "Cross-departmental coordination",
        "Service continuity planning",
      ],
    },
    {
      title: "Operations Lead - Mainframe Upgrade & Migration Project",
      company: "Dell Technologies",
      period: "Jan 2011 - Jun 2016",
      location: "Louisville, KY",
      status: "completed",
      description: "Operations Lead for mainframe infrastructure upgrade and McKesson/Cerner migration project. Scheduled departmental support, coordinated with cross-functional teams, and assisted with system upgrades while maintaining critical healthcare operations.",
      achievements: [
        "Coordinated departmental support scheduling for mainframe upgrade phases",
        "Collaborated with cross-functional teams on migration planning and execution",
        "Assisted with performing mainframe upgrades and system transitions",
        "Supported McKesson/Cerner migration from legacy mainframe systems",
        "Maintained operational continuity during complex system transitions",
        "Ensured critical healthcare systems remained operational throughout upgrades",
      ],
      highlights: [
        "Operations coordination for complex healthcare migration",
        "Cross-departmental collaboration and scheduling",
        "Mainframe to McKesson/Cerner transition support",
        "Critical system reliability during upgrades",
      ],
      stats: [
        { label: "Project Involvement", value: "5+ Years" },
        { label: "System Uptime", value: "100%" },
        { label: "Regional Impact", value: "3 States" },
        { label: "Migration Role", value: "Operations Lead" },
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
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 relative">
              Professional Experience
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-success-green to-accent-blue rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-6">Two decades of progressive leadership in IT infrastructure, operations, and project management</p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-navy/20 h-full hidden lg:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col lg:flex-row items-start lg:items-center">
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:order-2'} mb-8 lg:mb-0`}>
                  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full ${
                        exp.status === 'current' ? 'bg-success-green' : 'bg-accent-blue'
                      }`}></div>
                      {exp.status === 'current' && (
                        <span className="text-sm font-medium text-success-green">Current</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                    <p className="text-accent-blue font-medium mb-1">{exp.company}</p>
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{exp.description}</p>
                    
                    {exp.stats && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {exp.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-2xl font-bold text-navy">{stat.value}</div>
                            <div className="text-xs text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {(exp.achievements || []).slice(0, 4).map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success-green flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                      {(exp.achievements || []).length > 4 && (
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-accent-blue hover:text-accent-blue/80 font-medium">
                            Show {(exp.achievements || []).length - 4} more achievements...
                          </summary>
                          <div className="mt-2 space-y-2">
                            {(exp.achievements || []).slice(4).map((achievement, achIndex) => (
                              <div key={achIndex + 4} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success-green flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Timeline marker */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg hidden lg:block ${
                  exp.status === 'current' ? 'bg-success-green' : index === 1 ? 'bg-accent-blue' : 'bg-navy'
                }`}></div>
                
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8 lg:order-2' : 'lg:pr-8'}`}>
                  <div className={`p-8 rounded-xl ${
                    exp.status === 'current' 
                      ? 'bg-gradient-to-br from-success-green/10 to-accent-blue/10'
                      : 'bg-light-bg'
                  }`}>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {exp.status === 'current' ? 'Key Achievements' : 'Major Accomplishments'}
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      {(exp.highlights || []).map((highlight, highlightIndex) => (
                        <li key={highlightIndex}>• {highlight}</li>
                      ))}
                    </ul>
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

export default ExperienceSection;
