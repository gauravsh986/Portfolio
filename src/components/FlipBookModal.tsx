import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Code, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

interface FlipBookModalProps {
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
    about?: string;
    problemsFaced?: string[];
    lessonsLearned?: string[];
  };
}

const FlipBookModal: React.FC<FlipBookModalProps> = ({ isOpen, onClose, project }) => {
  const flipbookRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(8);
  const [isInitialized, setIsInitialized] = useState(false);

  const getProjectColor = (id: number) => {
    switch (id) {
      case 1: return { primary: '#06b6d4', secondary: '#0891b2', accent: '#0e7490', light: '#e0f7fa' };
      case 2: return { primary: '#f59e0b', secondary: '#d97706', accent: '#b45309', light: '#fff8e1' };
      case 3: return { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9', light: '#f3e8ff' };
      case 4: return { primary: '#f97316', secondary: '#ea580c', accent: '#c2410c', light: '#fff7ed' };
      default: return { primary: '#06b6d4', secondary: '#0891b2', accent: '#0e7490', light: '#e0f7fa' };
    }
  };

  const colors = getProjectColor(project.id);

  useEffect(() => {
    if (isOpen && flipbookRef.current && window.$ && !isInitialized) {
      const $ = window.$;
      
      // Initialize Turn.js
      $(flipbookRef.current).turn({
        width: 800,
        height: 600,
        autoCenter: true,
        duration: 1000,
        gradients: true,
        elevation: 50,
        when: {
          turning: function(event: any, page: number) {
            setCurrentPage(page);
          }
        }
      });

      setIsInitialized(true);
    }

    return () => {
      if (flipbookRef.current && window.$ && isInitialized) {
        try {
          window.$(flipbookRef.current).turn('destroy');
          setIsInitialized(false);
        } catch (e) {
          console.log('Turn.js cleanup error:', e);
        }
      }
    };
  }, [isOpen, isInitialized]);

  const nextPage = () => {
    if (flipbookRef.current && window.$) {
      window.$(flipbookRef.current).turn('next');
    }
  };

  const prevPage = () => {
    if (flipbookRef.current && window.$) {
      window.$(flipbookRef.current).turn('previous');
    }
  };

  const goToPage = (page: number) => {
    if (flipbookRef.current && window.$) {
      window.$(flipbookRef.current).turn('page', page);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 p-3 text-white transition-all duration-300 border border-white/20 rounded-full glass-card hover:border-white/40 hover:scale-110"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Controls */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60">
        <button
          onClick={prevPage}
          disabled={currentPage <= 1}
          className="p-3 text-white transition-all duration-300 border border-white/20 rounded-full glass-card hover:border-white/40 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60">
        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages}
          className="p-3 text-white transition-all duration-300 border border-white/20 rounded-full glass-card hover:border-white/40 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Page Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60">
        <div className="flex items-center gap-2 px-4 py-2 glass-card border border-white/20 rounded-full">
          <span className="text-white text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Flipbook Container */}
      <div className="relative">
        <div
          ref={flipbookRef}
          className="flipbook"
          style={{
            width: '800px',
            height: '600px',
            margin: '0 auto',
          }}
        >
          {/* Page 1 - Cover */}
          <div className="page" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
            <div className="flex flex-col items-center justify-center h-full p-8 text-white">
              <div className="mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-64 h-40 object-cover rounded-lg shadow-2xl"
                />
              </div>
              <h1 className="mb-4 text-4xl font-bold text-center font-orbitron">{project.title}</h1>
              <p className="mb-6 text-center text-white/90 max-w-md">{project.description.slice(0, 200)}...</p>
              <div className="flex items-center gap-2 text-white/80">
                <BookOpen className="w-5 h-5" />
                <span>Click to explore details</span>
              </div>
            </div>
          </div>

          {/* Page 2 - About Project */}
          <div className="page bg-white">
            <div className="h-full p-8 text-gray-800">
              <h2 className="mb-6 text-3xl font-bold font-orbitron flex items-center gap-3" style={{ color: colors.primary }}>
                <Code className="w-8 h-8" />
                About This Project
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {project.about || project.description}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Key Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 4).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 2</span>
              </div>
            </div>
          </div>

          {/* Page 3 - Tech Stack */}
          <div className="page bg-white">
            <div className="h-full p-8 text-gray-800">
              <h2 className="mb-6 text-3xl font-bold font-orbitron flex items-center gap-3" style={{ color: colors.primary }}>
                <Code className="w-8 h-8" />
                Technology Stack
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Technologies Used</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border-2 text-center font-medium transition-all duration-300 hover:scale-105"
                        style={{ 
                          borderColor: colors.primary + '40',
                          backgroundColor: colors.light,
                          color: colors.accent
                        }}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Project Links</h3>
                  <div className="space-y-3">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                      style={{ 
                        borderColor: colors.primary + '40',
                        backgroundColor: colors.light
                      }}
                    >
                      <ExternalLink className="w-5 h-5" style={{ color: colors.primary }} />
                      <span style={{ color: colors.accent }}>Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                      style={{ 
                        borderColor: colors.primary + '40',
                        backgroundColor: colors.light
                      }}
                    >
                      <Github className="w-5 h-5" style={{ color: colors.primary }} />
                      <span style={{ color: colors.accent }}>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 3</span>
              </div>
            </div>
          </div>

          {/* Page 4 - Features */}
          <div className="page bg-white">
            <div className="h-full p-8 text-gray-800">
              <h2 className="mb-6 text-3xl font-bold font-orbitron flex items-center gap-3" style={{ color: colors.primary }}>
                <Lightbulb className="w-8 h-8" />
                Key Features
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                    style={{ 
                      borderColor: colors.primary + '20',
                      backgroundColor: colors.light
                    }}>
                    <div 
                      className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 4</span>
              </div>
            </div>
          </div>

          {/* Page 5 - Problems Faced */}
          <div className="page bg-white">
            <div className="h-full p-8 text-gray-800">
              <h2 className="mb-6 text-3xl font-bold font-orbitron flex items-center gap-3" style={{ color: colors.primary }}>
                <AlertTriangle className="w-8 h-8" />
                Challenges & Solutions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Problems Faced During Development</h3>
                  <div className="space-y-4">
                    {(project.problemsFaced || [
                      'Complex state management across multiple components',
                      'Performance optimization for large datasets',
                      'Cross-browser compatibility issues',
                      'Responsive design challenges on various devices',
                      'Integration with third-party APIs and services'
                    ]).map((problem, index) => (
                      <div key={index} className="p-4 rounded-lg border-l-4 bg-red-50"
                        style={{ borderLeftColor: colors.primary }}>
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{problem}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 5</span>
              </div>
            </div>
          </div>

          {/* Page 6 - Lessons Learned */}
          <div className="page bg-white">
            <div className="h-full p-8 text-gray-800">
              <h2 className="mb-6 text-3xl font-bold font-orbitron flex items-center gap-3" style={{ color: colors.primary }}>
                <Lightbulb className="w-8 h-8" />
                What I Learned
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Key Learnings & Insights</h3>
                  <div className="space-y-4">
                    {(project.lessonsLearned || [
                      'Advanced React patterns and state management techniques',
                      'Importance of performance optimization and code splitting',
                      'Best practices for responsive design and accessibility',
                      'Effective debugging and testing strategies',
                      'Project planning and time management skills',
                      'Client communication and requirement gathering'
                    ]).map((lesson, index) => (
                      <div key={index} className="p-4 rounded-lg border-l-4"
                        style={{ 
                          borderLeftColor: colors.primary,
                          backgroundColor: colors.light
                        }}>
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                          <span className="text-gray-700">{lesson}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 6</span>
              </div>
            </div>
          </div>

          {/* Page 7 - Project Impact */}
          <div className="page bg-white">
            <div className="h-full p-8 text-gray-800">
              <h2 className="mb-6 text-3xl font-bold font-orbitron" style={{ color: colors.primary }}>
                Project Impact & Future
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-lg border-2" style={{ 
                  borderColor: colors.primary + '40',
                  backgroundColor: colors.light
                }}>
                  <h3 className="mb-3 text-xl font-semibold">Development Approach</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This project was built using modern development practices with a focus on scalability, 
                    performance, and user experience. The architecture follows industry best practices 
                    and implements responsive design principles for optimal cross-platform compatibility.
                  </p>
                </div>

                <div className="p-6 rounded-lg border-2" style={{ 
                  borderColor: colors.primary + '40',
                  backgroundColor: colors.light
                }}>
                  <h3 className="mb-3 text-xl font-semibold">Future Enhancements</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Planned improvements include additional features, performance optimizations, 
                    enhanced user interface elements, and expanded functionality based on user feedback 
                    and emerging technologies in the development ecosystem.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
                    <div className="text-2xl font-bold font-orbitron mb-2" style={{ color: colors.primary }}>
                      {project.technologies.length}+
                    </div>
                    <div className="text-sm text-gray-600">Technologies</div>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
                    <div className="text-2xl font-bold font-orbitron mb-2" style={{ color: colors.primary }}>
                      {project.features.length}+
                    </div>
                    <div className="text-sm text-gray-600">Features</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>Page 7</span>
              </div>
            </div>
          </div>

          {/* Page 8 - Back Cover */}
          <div className="page" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})` }}>
            <div className="flex flex-col items-center justify-center h-full p-8 text-white">
              <h2 className="mb-6 text-3xl font-bold text-center font-orbitron">Thank You!</h2>
              <p className="mb-8 text-center text-white/90 max-w-md">
                Thanks for exploring this project in detail. I hope you found the information valuable 
                and gained insights into my development process and technical capabilities.
              </p>
              
              <div className="flex gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 rounded-lg font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Live
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/20 rounded-lg font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105"
                >
                  Close Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-60">
        <div className="flex gap-2 px-4 py-2 glass-card border border-white/20 rounded-full">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === i + 1 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlipBookModal;