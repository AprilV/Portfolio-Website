import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full bg-transparent border-0 hover:bg-transparent transition-all duration-300 micro-bounce focus-enhanced"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle-button"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      )}
    </Button>
  );
};