import { Users, Award, GraduationCap, CheckCircle } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    { 
      value: "Expert", 
      label: "IT Experience", 
      icon: CheckCircle,
      description: "Extensive hands-on infrastructure and data center expertise"
    },
    { 
      value: "President's Scholar", 
      label: "Academic Status", 
      icon: GraduationCap,
      description: "President's Scholar honors achieved for 9 terms"
    },
    { 
      value: "12", 
      label: "Team Members Led", 
      icon: Users,
      description: "Successfully managed teams up to 12 people in healthcare IT operations"
    },
    { 
      value: "100%", 
      label: "SLA Compliance", 
      icon: Award,
      description: "Service Level Agreement compliance maintained across all client engagements",
      ariaLabel: "100% Service Level Agreement Compliance - maintaining uptime and service standards across all client engagements"
    },
  ];

  const coreValues = [
    "Consistency in execution and delivery",
    "Clarity in communication and documentation", 
    "Ethical leadership and team development",
  ];

  return (
    <section id="about" className="py-20 bg-secondary dark:bg-background" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="professional-experience-header" style={{marginTop: '0'}}>
            <h2 className="section-header">
              About Me
              <div className="section-underline"></div>
            </h2>
            <p className="section-subtitle">Transforming extensive IT infrastructure expertise into project management excellence</p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="prose prose-lg text-card-foreground">
              <p className="text-lg leading-relaxed mb-6 text-left">
                I am an IT professional with extensive hands-on infrastructure and data center experience, 
                now transitioning into project management. Currently earning a <strong className="text-primary-blue">Bachelor of Applied Science in Information 
                Systems</strong> at <strong className="text-primary-blue">Olympic College</strong> with graduation expected end of Spring term 2026.
              </p>
            </div>

            {/* Academic Background */}
            <div>
              <h3 className="text-xl font-semibold text-charcoal-black mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary-blue dark:text-white" aria-hidden="true" />
                Academic Background
              </h3>
              <div className="prose prose-lg text-card-foreground">
                <p className="leading-relaxed mb-4 text-left">
                  My academic background includes comprehensive coursework in <strong className="text-primary-blue">Project Management I and II</strong>, 
                  LAN Administration, Information Assurance, Technical Writing, and Business Statistics. 
                  I have earned <strong className="text-primary-blue">President's Scholar honors</strong> for 9 terms.
                </p>
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h3 className="text-xl font-semibold text-charcoal-black mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-blue dark:text-white" aria-hidden="true" />
                Professional Experience
              </h3>
              <div className="prose prose-lg text-card-foreground">
                <p className="leading-relaxed mb-4 text-left">
                  Professionally, I have supervised teams and maintained critical operations at <strong className="text-primary-blue">Jewish Hospital</strong>, 
                  <strong className="text-primary-blue">Perot Systems</strong>, and <strong className="text-primary-blue">Dell Technologies</strong>, working with mainframes, Cisco networking, and Linux environments 
                  while managing client support and system transitions across regional teams.
                </p>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="border-t border-divider-gray my-8"></div>

            {/* Core Values */}
            <div className="professional-card p-6 hover:border-primary-blue dark:hover:border-primary-blue">
              <h3 className="text-xl font-semibold text-charcoal-black mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary-blue dark:text-white" aria-hidden="true" />
                Core Values
              </h3>
              <div className="grid sm:grid-cols-1 gap-4">
                {coreValues.map((value, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary-blue/5 dark:hover:bg-primary-blue/10 hover:translate-y-[-1px] hover:shadow-md transition-all duration-200">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      index === 0 ? 'bg-primary-blue' : index === 1 ? 'bg-teal-blue' : 'bg-primary-blue'
                    }`}></div>
                    <span className="text-card-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Achievement Stats */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={index} 
                    className="professional-card text-center p-6 hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-2 hover:border-primary-blue dark:hover:border-primary-blue transition-all duration-300 group min-h-[120px] flex flex-col justify-center"
                    title={achievement.description}
                    aria-label={achievement.ariaLabel || `${achievement.value} ${achievement.label} - ${achievement.description}`}
                  >
                    <IconComponent className="h-6 w-6 text-primary-blue mx-auto mb-2 transition-all duration-300" aria-hidden="true" />
                    <div className="text-3xl font-bold text-primary-blue mb-2 transition-all duration-300">
                      {achievement.value}
                    </div>
                    <div className="text-sm text-cool-gray font-medium leading-tight">
                      {achievement.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
