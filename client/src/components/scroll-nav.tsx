import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));

      // Determine active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));

      const currentSection = sectionElements.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
        <motion.div 
          className="scroll-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Navigation */}
      <motion.div 
        className="scroll-nav"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="scroll-nav-container">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`scroll-nav-dot ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={section.label}
            >
              <span className="dot-indicator"></span>
              <span className="dot-label">{section.icon || section.label.charAt(0)}</span>
              
              {/* Tooltip - Always visible on hover, highlighted when active */}
              <motion.div 
                className={`nav-tooltip ${activeSection === section.id ? 'active-tooltip' : 'hover-tooltip'}`}
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                animate={{ 
                  opacity: activeSection === section.id ? 1 : 0, 
                  x: activeSection === section.id ? 0 : 10 
                }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ScrollNav;