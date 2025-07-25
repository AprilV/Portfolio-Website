const AboutSection = () => {
  const achievements = [
    { value: "20+", label: "Years IT Experience" },
    { value: "3.94", label: "Current GPA" },
    { value: "12", label: "Team Members Led" },
    { value: "100%", label: "SLA Compliance" },
  ];

  const coreValues = [
    "Consistency in execution and delivery",
    "Clarity in communication and documentation", 
    "Ethical leadership and team development",
  ];

  return (
    <section id="about" className="py-20 bg-background-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal-black mb-4 relative inline-block">
            About Me
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary-blue rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming two decades of IT infrastructure expertise into project management excellence
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                I am an IT professional with over twenty years of hands-on infrastructure and data center experience, 
                now transitioning into project management. Currently earning a Bachelor of Applied Science in Information 
                Systems at Olympic College with graduation expected Spring 2026.
              </p>
              <p>
                My academic background includes comprehensive coursework in Project Management I and II, 
                LAN Administration, Information Assurance, Technical Writing, and Business Statistics. 
                I maintain a 3.94 GPA and have earned President's Scholar honors every term.
              </p>
              <p>
                Professionally, I have supervised teams and maintained critical operations at Jewish Hospital, 
                Perot Systems, and Dell Technologies, working with mainframes, Cisco networking, and Linux environments 
                while managing client support and system transitions across regional teams.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-card-background p-6 rounded-xl shadow-sm text-center border border-divider-gray hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl font-bold text-navy mb-2">{achievement.value}</div>
                  <div className="text-sm text-gray-600">{achievement.label}</div>
                </div>
              ))}
            </div>
            
            {/* Core Values */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Values</h3>
              <div className="space-y-3">
                {coreValues.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-navy' : index === 1 ? 'bg-accent-blue' : 'bg-success-green'
                    }`}></div>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
