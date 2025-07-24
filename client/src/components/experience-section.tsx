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
      title: "System Analyst & Team Lead",
      company: "Dell Technologies",
      period: "Oct 1997 - Jun 2016",
      location: "Louisville, KY",
      status: "completed",
      description: "Led mainframe operations and infrastructure services for Jewish Hospital and KentuckyOne Healthcare. Promoted to Team Lead, managing 12 staff across 24/7 operations with full P&L responsibility.",
      achievements: [
        "Managed 14,000 tape backup infrastructure",
        "Led annual disaster recovery operations in NJ",
        "Generated department profit through value-added services",
        "Coordinated multi-region hospital data integration",
        "Authored comprehensive SOPs and technical documentation",
        "Maintained critical systems across KY, IN, and OH",
      ],
      stats: [
        { label: "Years Experience", value: "18.75" },
        { label: "Team Members", value: "12" },
        { label: "Operations", value: "24/7" },
        { label: "SLA Compliance", value: "100%" },
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <p className="text-xl text-gray-600">Two decades of progressive leadership in IT infrastructure and operations</p>
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
                      {(exp.achievements || []).slice(0, 3).map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success-green flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
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
