import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Briefcase, Code, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  section: 'experience' | 'skills' | 'projects' | 'certifications' | 'about';
  category?: string;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Portfolio content for searching
  const searchableContent: SearchResult[] = [
    // Experience
    {
      id: 'dell-tech-lead',
      title: 'Systems Team Lead - Dell Technologies',
      content: 'Led 12-person team, healthcare IT operations, 24x7 monitoring, PHI compliance, team coordination, incident management, technical leadership',
      section: 'experience',
      category: 'Leadership'
    },
    {
      id: 'dell-analyst',
      title: 'Systems Analyst - Dell Technologies', 
      content: 'Datacenter monitoring, HVAC systems, fire suppression, network infrastructure, enterprise operations, technical analysis',
      section: 'experience',
      category: 'Technical'
    },
    {
      id: 'pnc-operator',
      title: 'Computer Operator - PNC Bank',
      content: 'Mainframe operations, batch processing, financial systems, computer operations, data processing, system monitoring',
      section: 'experience',
      category: 'Operations'
    },
    // Skills
    {
      id: 'project-management',
      title: 'Project Management',
      content: 'CAPM certification in progress, project planning, stakeholder communication, team leadership, project documentation, agile methodologies',
      section: 'skills',
      category: 'Core PM Skills'
    },
    {
      id: 'technical-skills',
      title: 'Technical Foundation',
      content: 'LAN administration, Windows systems, network security, Cisco networking, technical support, server support, infrastructure management',
      section: 'skills',
      category: 'Technical Skills'
    },
    // Projects
    {
      id: 'ai-presentation',
      title: 'Evolution of Artificial Intelligence Presentation',
      content: 'PowerPoint presentation, AI research, machine learning, artificial intelligence, technical presentation, academic project',
      section: 'projects',
      category: 'Academic'
    },
    {
      id: 'portfolio-website',
      title: 'Professional Portfolio Website',
      content: 'React, TypeScript, full-stack development, modern web technologies, responsive design, professional portfolio',
      section: 'projects',
      category: 'Development'
    },
    // Certifications
    {
      id: 'capm-cert',
      title: 'CAPM Certification',
      content: 'Project Management Institute, Certified Associate Project Management, PMI, project management certification',
      section: 'certifications',
      category: 'Project Management'
    },
    {
      id: 'cisco-certs',
      title: 'Cisco Certifications',
      content: 'CCNA Switching Routing Wireless, CCNA Intro Networks, Cybersecurity, Data Science, Networking Academy',
      section: 'certifications',
      category: 'Networking'
    },
    {
      id: 'testout-certs',
      title: 'CompTIA Certifications',
      content: 'Linux+, A+ Client, A+ PC Pro, Network+, TestOut certifications, technical certifications',
      section: 'certifications',
      category: 'Technical'
    },
    // About/Education
    {
      id: 'education',
      title: 'BAS-IS Education',
      content: 'Bachelor Applied Science Information Systems, Olympic College, Presidents Scholar, information systems degree',
      section: 'about',
      category: 'Education'
    }
  ];

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = searchableContent.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );

    setResults(filtered.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(-1);
  };

  // Handle search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    const sectionMap = {
      'experience': 'experience',
      'skills': 'skills', 
      'projects': 'projects',
      'certifications': 'skills', // Certifications are in skills section
      'about': 'about'
    };

    const targetSection = sectionMap[result.section];
    const element = document.getElementById(targetSection);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
      setQuery('');
    }
  };

  // Get icon for section
  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'experience': return Briefcase;
      case 'skills': return Code;
      case 'projects': return FileText;
      case 'certifications': return Award;
      case 'about': return FileText;
      default: return Search;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-start justify-center pt-20 px-4">
        <div 
          className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search portfolio content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 focus:ring-0 text-lg bg-transparent dark:text-white"
              data-testid="search-input"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              data-testid="search-close-button"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search Results */}
          <div ref={resultsRef} className="max-h-96 overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No results found for "{query}"
              </div>
            )}
            
            {results.map((result, index) => {
              const Icon = getSectionIcon(result.section);
              const isSelected = index === selectedIndex;
              
              return (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors duration-200 ${
                    isSelected ? 'bg-primary-blue/5 dark:bg-primary-blue/10' : ''
                  }`}
                  data-testid={`search-result-${result.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-blue/10 dark:bg-primary-blue/20 rounded-lg flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-primary-blue dark:text-primary-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {result.content}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        {result.category || result.section}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search Tips */}
          {!query.trim() && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Search for skills, experience, projects, or certifications
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;