import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ onAccessibilityToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Visit', href: '#visit' },
    { name: 'Shops Directory', href: '#shops' },
    { name: 'News & Updates', href: '#news' },
    { name: 'About OSDC', href: '#about' },
    { name: 'Governance', href: '#governance' },
    { name: 'Planning', href: '#planning' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-header shadow-lg' : 'bg-transparent'
      }`}
    >
      <a 
        href="#main-content" 
        className="skip-link focus-visible:focus-visible"
      >
        Skip to main content
      </a>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="heritage-serif text-2xl font-bold text-primary">
              OSDC
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="heritage-sans text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 focus-visible:focus-visible touch-target flex items-center justify-center"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Accessibility Button & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAccessibilityToggle}
              className="touch-target focus-visible:focus-visible"
              aria-label="Toggle accessibility settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden touch-target focus-visible:focus-visible"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="heritage-sans block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary transition-colors duration-200 rounded-md touch-target focus-visible:focus-visible"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

