import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, Code, Users, Award } from 'lucide-react';

interface FlipBookProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    live: string;
    features: string[];
    highlights: string[];
  };
}

const FlipBook: React.FC<FlipBookProps> = ({ isOpen, onClose, project }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookState, setBookState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setBookState('opening');
      setTimeout(() => {
        setBookState('open');
      }, 800);
    } else {
      setBookState('closing');
      setTimeout(() => {
        setBookState('closed');
        setCurrentPage(0);
      }, 800);
    }
  }, [isOpen]);

  const nextPage = () => {
    if (isAnimating || currentPage >= 2) return;
    setIsAnimating(true);
    setCurrentPage(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevPage = () => {
    if (isAnimating || currentPage <= 0) return;
    setIsAnimating(true);
    setCurrentPage(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const closeBook = () => {
    if (currentPage > 0) {
      setIsAnimating(true);
      setCurrentPage(0);
      setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 800);
    } else {
      onClose();
    }
  };

  if (!isOpen && bookState === 'closed') return null;

  const getProjectColor = (id: number) => {
    switch (id) {
      case 1: return { primary: '#06b6d4', secondary: '#0891b2', accent: '#0e7490' };
      case 2: return { primary: '#f59e0b', secondary: '#d97706', accent: '#b45309' };
      case 3: return { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' };
      case 4: return { primary: '#f97316', secondary: '#ea580c', accent: '#c2410c' };
      default: return { primary: '#06b6d4', secondary: '#0891b2', accent: '#0e7490' };
    }
  };

  const colors = getProjectColor(project.id);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-800 ${
      bookState === 'open' ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
    }`}>
      {/* Close button */}
      {bookState === 'open' && (
        <button
          onClick={closeBook}
          className="absolute top-4 right-4 z-60 p-2 text-white transition-all duration-300 border border-white/20 rounded-full glass-card hover:border-white/40 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Book Container */}
      <div 
        ref={bookRef}
        className={`relative transition-all duration-800 ${
          bookState === 'opening' || bookState === 'open' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        style={{ perspective: '2000px' }}
      >
        <div className="relative w-[800px] h-[600px] max-w-[90vw] max-h-[80vh]">
          
          {/* Book Cover - Front */}
          <div 
            className={`absolute inset-0 transition-all duration-800 transform-gpu ${
              currentPage > 0 ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: '12px 4px 4px 12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-white">
              <div className="mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-48 h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-center font-orbitron">{project.title}</h1>
              <p className="mb-6 text-center text-white/80">{project.description.slice(0, 150)}...</p>
              <button
                onClick={nextPage}
                disabled={isAnimating}
                className="flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 bg-white/20 rounded-lg hover:bg-white/30 hover:scale-105"
              >
                Open Book <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Page 1 & 2 */}
          <div 
            className={`absolute inset-0 transition-all duration-800 transform-gpu ${
              currentPage === 1 ? 'rotate-y-0 opacity-100' : currentPage < 1 ? 'rotate-y-180 opacity-0' : 'rotate-y-180 opacity-0'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center'
            }}
          >
            {/* Left Page (Page 1) */}
            <div 
              className="absolute left-0 w-1/2 h-full p-6 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
              style={{ borderRadius: '12px 0 0 12px' }}
            >
              <h2 className="mb-6 text-2xl font-bold font-orbitron" style={{ color: colors.primary }}>
                Project Overview
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 mb-2 text-lg font-semibold">
                    <Code className="w-5 h-5" style={{ color: colors.primary }} />
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 mb-2 text-lg font-semibold">
                    <Award className="w-5 h-5" style={{ color: colors.primary }} />
                    Key Highlights
                  </h3>
                  <ul className="space-y-1">
                    {project.highlights.slice(0, 4).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: colors.primary }}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="absolute bottom-4 left-6">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 1</span>
              </div>
            </div>

            {/* Right Page (Page 2) */}
            <div 
              className="absolute right-0 w-1/2 h-full p-6 bg-gradient-to-bl from-gray-50 to-gray-100 text-gray-800"
              style={{ borderRadius: '0 12px 12px 0' }}
            >
              <h2 className="mb-6 text-2xl font-bold font-orbitron" style={{ color: colors.primary }}>
                Technologies
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium text-white rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 mb-3 text-lg font-semibold">
                    <Users className="w-5 h-5" style={{ color: colors.primary }} />
                    Project Links
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg hover:bg-gray-200"
                    >
                      <ExternalLink className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg hover:bg-gray-200"
                    >
                      <Github className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className="text-sm">Source Code</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-6">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 2</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={prevPage}
                disabled={isAnimating}
                className="p-2 text-gray-600 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPage}
                disabled={isAnimating}
                className="p-2 text-gray-600 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Page 3 & 4 */}
          <div 
            className={`absolute inset-0 transition-all duration-800 transform-gpu ${
              currentPage === 2 ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center'
            }}
          >
            {/* Left Page (Page 3) */}
            <div 
              className="absolute left-0 w-1/2 h-full p-6 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
              style={{ borderRadius: '12px 0 0 12px' }}
            >
              <h2 className="mb-6 text-2xl font-bold font-orbitron" style={{ color: colors.primary }}>
                Features
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-6">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 3</span>
              </div>
            </div>

            {/* Right Page (Page 4) */}
            <div 
              className="absolute right-0 w-1/2 h-full p-6 bg-gradient-to-bl from-gray-50 to-gray-100 text-gray-800"
              style={{ borderRadius: '0 12px 12px 0' }}
            >
              <h2 className="mb-6 text-2xl font-bold font-orbitron" style={{ color: colors.primary }}>
                Project Impact
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold">Development Approach</h3>
                  <p className="text-sm leading-relaxed">
                    This project was built using modern development practices with a focus on scalability, 
                    performance, and user experience. The architecture follows industry best practices 
                    and implements responsive design principles.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold">Future Enhancements</h3>
                  <p className="text-sm leading-relaxed">
                    Planned improvements include additional features, performance optimizations, 
                    and expanded functionality based on user feedback and emerging technologies.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={closeBook}
                    className="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg hover:scale-105"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Close Book
                  </button>
                </div>
              </div>

              <div className="absolute bottom-4 right-6">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 4</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={prevPage}
                disabled={isAnimating}
                className="p-2 text-gray-600 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Book Cover - Back */}
          <div 
            className={`absolute inset-0 transition-all duration-800 transform-gpu ${
              currentPage >= 3 ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
              borderRadius: '4px 12px 12px 4px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-white">
              <h2 className="mb-4 text-2xl font-bold text-center font-orbitron">Thank You!</h2>
              <p className="mb-6 text-center text-white/80">
                Thanks for exploring this project. Feel free to check out the live demo or source code.
              </p>
              <button
                onClick={closeBook}
                className="px-6 py-3 font-semibold transition-all duration-300 bg-white/20 rounded-lg hover:bg-white/30 hover:scale-105"
              >
                Close Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;