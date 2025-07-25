import { useState, useEffect } from 'react';

interface ScrollNavProps {
  sections: Array<{
    id: string;
    label: string;
    icon?: string;
  }>;
}

const ScrollNav = ({ sections }: ScrollNavProps) => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Calculate scroll progress
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));

          // Determine active section - simplified logic
          const scrollY = window.scrollY + 150; // Offset for better detection
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i].id);
            if (element && scrollY >= element.offsetTop) {
              setActiveSection(sections[i].id);
              break;
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
      <div className="scroll-nav">
        <div className="scroll-nav-container">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`scroll-nav-dot ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
              title={section.label}
            >
              <span className="dot-indicator"></span>
              <span className="dot-label">{section.icon || section.label.charAt(0)}</span>
              
              {/* Tooltip - Always visible on hover, highlighted when active */}
              <div 
                className={`nav-tooltip ${activeSection === section.id ? 'active-tooltip' : 'hover-tooltip'}`}
                style={{ 
                  opacity: activeSection === section.id ? 1 : 0,
                  transform: `translateX(${activeSection === section.id ? 0 : 10}px) translateY(-50%)`
                }}
              >
                {section.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollNav;