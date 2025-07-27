import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchBar from "@/components/search-bar";
import { useSearch } from "@/hooks/use-search";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["hero", "about", "experience", "projects", "skills", "ats-resume", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    // Keyboard shortcut for search (Ctrl+K or Cmd+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSearch]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Professional Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "ats-resume", label: "ATS Resume" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md" : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
      } border-b border-gray-200 dark:border-gray-700`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center whitespace-nowrap mr-8">
            <span className="text-xl font-bold gradient-text-flow inline-block">April V. Sykes</span>
            <span className="ml-3 text-sm gradient-text-flow-title">Assistant Project Manager</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-charcoal-black dark:text-gray-200 hover:scale-105 hover:translate-y-[-1px] transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                  activeSection === item.id ? "text-primary-blue dark:text-primary-blue font-semibold" : ""
                }`}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={openSearch}
              className="flex items-center gap-2 text-charcoal-black dark:text-gray-200 hover:scale-105 hover:translate-y-[-1px] transition-all duration-200 focus-enhanced bg-transparent hover:bg-transparent"
              data-testid="search-button-desktop"
              aria-label="Open search (Ctrl+K or Cmd+K)"
              aria-keyshortcuts="Control+k Meta+k"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline text-sm">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded border" aria-label="Keyboard shortcut Command K">
                ⌘K
              </kbd>
            </Button>
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={openSearch}
              className="h-9 w-9 bg-transparent hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
              data-testid="search-button-mobile"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-transparent hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-lg font-medium transition-colors duration-200 ${
                        activeSection === item.id 
                          ? "text-primary font-semibold" 
                          : "text-foreground hover:scale-105 hover:translate-y-[-1px] transition-all duration-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={closeSearch} />
    </nav>
  );
};

export default Navigation;
