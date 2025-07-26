import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TOCSection {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  sections: TOCSection[];
}

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY + 120; // Enhanced offset for better detection
          let currentSection = '';
          
          // Find the section that's most in view
          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i].id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = element.offsetTop;
              
              // Enhanced detection: section is active if it's in the viewport or if we've scrolled past it
              if (scrollY >= elementTop - 50) {
                currentSection = sections[i].id;
                break;
              }
            }
          }
          
          // Default to first section if none detected and at top
          if (!currentSection && window.scrollY < 100) {
            currentSection = sections[0]?.id || '';
          }
          
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Enhanced smooth scrolling with proper offset
      const elementTop = element.offsetTop;
      const offset = 80; // Account for fixed header
      
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Left Sidebar Table of Contents */}
      <div className="toc-sidebar">
        <nav className="toc-nav">
          <div className="toc-header">
            <h3 className="toc-title">Navigation</h3>
          </div>
          <ul className="toc-list">
            {sections.map((section) => (
              <li key={section.id} className="toc-item">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`toc-link ${activeSection === section.id ? 'active' : ''}`}
                >
                  <span className="toc-indicator"></span>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Back to Top Button */}
      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: activeSection !== 'hero' ? 1 : 0,
          scale: activeSection !== 'hero' ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
    </>
  );
};

export default TableOfContents;