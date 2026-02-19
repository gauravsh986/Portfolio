import React from 'react';
import { Menu, X, Home, User, Briefcase, FolderOpen, MessageSquare, Code, Mail } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState('up');
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [showNav, setShowNav] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (!mainElement) return;
      
      const currentScrollY = mainElement.scrollTop;
      
      // Adjust scroll threshold for mobile/tablet
      const isMobile = window.innerWidth <= 768;
      const scrollThreshold = isMobile ? 50 : 100;
      
      if (currentScrollY > scrollThreshold) {
        if (currentScrollY < lastScrollY) {
          setScrollDirection('up');
          setShowNav(true);
        } else {
          setScrollDirection('down');
          setShowNav(false);
        }
      } else {
        setShowNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'about', label: 'About', icon: <User size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={16} /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageSquare size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const mainElement = document.querySelector('main');
    if (element && mainElement) {
      const offsetTop = element.offsetTop - mainElement.offsetTop;
      mainElement.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ease-in-out ${
      showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="mx-2 md:mx-4">
        {/* Section 1 - Main Navigation Bar */}
        <div className={`px-4 py-3 transition-all duration-150 border md:px-8 glass-card border-white/20 backdrop-blur-xl bg-dark/80 md:hover:border-neon-cyan/40 md:hover:bg-dark/80 ${
          isMobileMenuOpen ? 'rounded-t-2xl' : 'rounded-full'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-shrink-0 md:mr-8">
              <span className="text-base font-bold md:text-lg font-orbitron text-neon-cyan">
                Ved<span className="text-neon-blue">.</span>
              </span>
              
              {/* Home icon and divider for mobile/tablet */}
              <div className="flex items-center ml-3 md:hidden">
                <button
                  onClick={() => scrollToSection('home')}
                  className="p-1.5 text-gray-300 transition-colors duration-200 rounded-full hover:text-neon-cyan hover:bg-white/10"
                >
                  <Home size={18} />
                </button>
                <div className="w-px h-5 mx-2 bg-white/20"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                {navItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-neon-cyan relative group rounded-full ${
                        activeSection === item.id
                          ? 'text-neon-cyan bg-neon-cyan/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                    {index < navItems.length - 1 && (
                      <div className="w-px h-4 bg-white/20"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 transition-colors rounded-full duration-0 hover:text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2 - Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="w-full px-4 py-4 transition-all duration-150 border border-t-0 md:hidden glass-card border-white/20 backdrop-blur-xl bg-dark/80">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 text-left px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;