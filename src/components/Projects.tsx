import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ParallaxContainer from './ParallaxContainer';

const Projects: React.FC = () => {
  const [flipbookOpen, setFlipbookOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showDevelopmentPopup, setShowDevelopmentPopup] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(!document.body.classList.contains('light-theme'));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const openFlipbook = (project: any) => {
    setSelectedProject(project);
    setFlipbookOpen(true);
  };

  const closeFlipbook = () => {
    setFlipbookOpen(false);
    setSelectedProject(null);
  };

  const handleViewDetails = () => {
    setShowComingSoon(true);
  };

  const handleViewLive = (project: any) => {
    setCurrentProject(project);
    if (project.id === 1 || project.id === 2) {
      setShowDevelopmentPopup(true);
    } else {
      window.open(project.live, '_blank');
    }
  };

  const closePopups = () => {
    setShowComingSoon(false);
    setShowDevelopmentPopup(false);
    setCurrentProject(null);
  };

  const projects = [
    {
      id: 1,
      title: 'ApnaEduHub Mobile App',
      description: 'Cross-platform mobile application for teachers, students, and parents built with React Native CLI. Features role-based interfaces, real-time notifications, and offline capabilities for seamless educational experience.',
      image: '/ApnaEduhub-Mobile.png',
      technologies: ['React Native CLI', 'SQLite', 'MySQL', 'Node.js', 'FCM Push Notifications', 'JWT Authentication'],
      github: '#',
      live: '#',
      features: [
        'Teacher Dashboard & Attendance',
        'Student/Parent Portal',
        'Real-time Push Notifications (FCM)',
        'Assignment Submission & Grading',
        'Offline Data Sync',
        'Multiple User Role Modules',
        'Timetable & Schedule Management',
        'Fee Payment Integration',
        'Progress Tracking',
        'Parent-Teacher Communication'
      ],
      highlights: [
        'Built with React Native CLI without Expo',
        'Multiple screens for different user roles',
        'Push notifications using FCM',
        'Real-time data synchronization'
      ]
    },
    {
      id: 2,
      title: 'ApnaEduHub Management Website',
      description: 'Comprehensive admin portal for educational institutions built with Vite+React+TypeScript. Manages all school operations from front-desk to director level. Future plan includes converting to desktop application using Electron.js framework.',
      image: '/ApnaEduHub-Laptop.png',
      technologies: ['Vite+React+TypeScript', 'MySQL', 'Node.js', 'Express.js', 'Socket.io', 'Electron.js (Planned)'],
      github: '#',
      live: '#',
      features: [
        'Multi-Level Admin Dashboard',
        'Student & Staff Management',
        'Fee Collection & Finance',
        'Attendance & Academic Records',
        'Report Generation System',
        'Data Sync to Mobile App',
        'Role-Based Access Control',
        'Notification Management',
        'Analytics & Insights',
        'System Configuration'
      ],
      highlights: [
        'Complete school management solution',
        'Future desktop app with Electron.js',
        'Sends data to mobile application',
        'Multi-role access from front-desk to director'
      ]
    },
    {
      id: 3,
      title: 'NeuroSpark Technologies Website',
      description: 'Professional business website for my freelance venture, serving as the primary digital presence for NeuroSpark Technologies. Showcases comprehensive portfolio of services including School ERP systems, Hotel Management solutions, E-Commerce platforms, and custom application development.',
      image: '/neurospark-website.png',
      technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'SEO Optimization', 'Performance Optimization'],
      github: '#',
      live: 'https://neurosparktechnologies.in/',
      features: [
        'Professional Service Portfolio',
        'Client Testimonials Section', 
        'Contact & Inquiry System',
        'SEO Optimized Content',
        'Mobile-First Design',
        'Fast Loading Performance',
        'Social Media Integration',
        'Analytics Dashboard'
      ],
      highlights: [
        'Responsive design across all devices',
        'Optimized for search engines and performance',
        'Professional UI/UX for client trust building',
        'Integrated contact and inquiry management'
      ]
    },
    {
      id: 4,
      title: 'QuickClinic - Appointment Management System',
      description: 'A healthcare patient management application that allows patients to easily register, book, and manage their appointments with doctors, featuring administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications, all built using Next.js.',
      image: '/QuickClinic.png',
      technologies: ['Next.js', 'Appwrite', 'TypeScript', 'TailwindCSS', 'ShadCN', 'Twilio', 'Sentry'],
      github: '#',
      live: 'https://quickclinic.vedsharma.me/',
      features: [
        'Patient Registration & Profiles',
        'Doctor Appointment Booking',
        'Admin Appointment Management',
        'SMS Notifications via Twilio',
        'File Upload with Appwrite Storage',
        'Appointment Confirmation System',
        'Complete Responsiveness',
        'Performance Monitoring with Sentry',
        'Multiple Appointment Scheduling',
        'Admin Dashboard Controls',
        'Cancel/Reschedule Appointments',
        'Secure File Management'
      ],
      highlights: [
        'Complete healthcare management solution',
        'SMS notifications for appointment confirmations',
        'Secure file upload and storage system',
        'Real-time performance monitoring with Sentry'
      ]
    },
    {
      id: 5,
      title: 'VS Music – Music Streaming Platform',
      description: 'Academic project demonstrating full-stack web development expertise using traditional PHP and MySQL technologies. Built as part of 3rd-semester coursework to showcase database management skills, dynamic content handling, and user interface design principles.',
      image: '/VS-Music.png',
      technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Audio API', 'Session Management', 'Database Design'],
      github: '#',
      live: 'https://VS-MUSIC.tech',
      features: [
        'Comprehensive Music Library',
        'Custom Playlist Creation',
        'Advanced Search & Filtering',
        'Responsive Audio Player',
        'User Authentication System',
        'Music Upload & Management',
        'Artist Profile Pages',
        'Genre-based Categorization',
        'Favorites & Bookmarks',
        'Play History Tracking',
        'Admin Content Management',
        'Database Optimization'
      ],
      highlights: [
        'Academic project showcasing PHP/MySQL expertise',
        'Demonstrates database design and management skills',
        'Interactive music player with full controls',
        'Complete user management and authentication system'
      ]
    },
  ];

  return (
    <section id="projects" className="relative py-20">
      <ParallaxContainer speed={0.15} className="absolute inset-0">
        <div className="h-full bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
      </ParallaxContainer>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl font-orbitron">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan" />
          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
          </p>
        </AnimatedSection>

        {/* Timeline Projects Layout */}
        <AnimatedSection direction="up" delay={100} className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-neon-blue h-full hidden md:block"></div>
          
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col md:flex-row gap-8 items-center mb-20 relative ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Timeline Dot */}
              <div className="absolute z-10 hidden w-4 h-4 transition-transform duration-300 transform -translate-x-1/2 border-4 rounded-full left-1/2 border-neon-cyan bg-dark hover:scale-125 md:block"></div>
              
              {/* Connecting Line */}
              <AnimatedSection direction={index % 2 === 0 ? 'left' : 'right'} delay={150 + index * 25} className={`absolute top-1/2 ${project.id === 1 ? 'w-48' : 'w-20'} h-0.5 bg-neon-cyan hidden md:block z-10 ${index % 2 === 0 ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`}>
                <div className="w-full h-full bg-neon-cyan"></div>
              </AnimatedSection>
              
              {/* Project Image */}
              <AnimatedSection direction={index % 2 === 0 ? 'left' : 'right'} delay={150 + index * 25} className="relative z-20 w-full md:w-1/2">
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="relative block group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`${project.id === 1 ? 'w-2/5 mx-auto' : 'w-full'} duration-500 h-75 trasition-transform rounded-xl group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-dark/80 to-transparent rounded-xl group-hover:opacity-100"></div>
                  <div className="absolute inset-0 transition-colors duration-300 border-2 border-transparent group-hover:border-neon-cyan/50 rounded-xl"></div>
                  
                  {/* Hover overlay with link */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <div className="px-4 py-2 border rounded-lg bg-dark/90 backdrop-blur-sm border-neon-cyan/30">
                      <span className="text-sm font-medium text-neon-cyan">Visit Website</span>
                    </div>
                  </div>
                </a>
              </AnimatedSection>

              {/* Project Details */}
              <AnimatedSection direction={index % 2 === 0 ? 'right' : 'left'} delay={200 + index * 25} className="w-full md:w-1/2">
                <div className="p-6 transition-all duration-300 border glass-card rounded-xl border-white/10 hover:border-neon-cyan/30">
                  <h3 className={`font-bold text-2xl md:text-3xl mb-2 ${
                    index === 0 ? 'text-yellow-400' : 
                    index === 1 ? 'text-purple-400' : 
                    index === 2 ? 'text-neon-cyan' :
                    index === 3 ? 'text-green-400' :
                    index === 4 ? 'text-indigo-400' :
                    'text-neon-cyan'
                  }`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-base md:text-lg mb-4 ${
                    index === 0 ? 'text-yellow-400/80' : 
                    index === 1 ? 'text-purple-400/80' : 
                    index === 2 ? 'text-neon-cyan/80' :
                    index === 3 ? 'text-green-400/80' :
                    index === 4 ? 'text-indigo-400/80' :
                    'text-neon-cyan/80'
                  }`}>
                    ({index === 0 ? 'Mobile Application' : index === 1 ? 'Management Portal' : index === 2 ? 'Business Website' : index === 3 ? 'Healthcare System' : index === 4 ? 'Academic Project' : 'Project'})
                  </p>
                  
                  <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
                    {project.description}
                  </p>

                  {/* Project Highlights */}
                  {project.highlights && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-semibold text-white">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {project.highlights.slice(0, 3).map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2 text-xs text-gray-400">
                            <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                              index === 0 ? 'bg-yellow-400' : 
                              index === 1 ? 'bg-purple-400' : 
                              index === 2 ? 'bg-neon-cyan' :
                              index === 3 ? 'bg-green-400' :
                              index === 4 ? 'bg-indigo-400' :
                              'bg-orange-400'
                            }`}></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          index === 0 ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' : 
                          index === 1 ? 'bg-purple-400/20 text-purple-400 border-purple-400/30' : 
                          index === 2 ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30' :
                          index === 3 ? 'bg-green-400/20 text-green-400 border-green-400/30' :
                          index === 4 ? 'bg-indigo-400/20 text-indigo-400 border-indigo-400/30' :
                          'bg-orange-400/20 text-orange-400 border-orange-400/30'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleViewLive(project)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 text-sm ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-dark' : 
                        index === 1 ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-dark' : 
                        index === 2 ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark' :
                        index === 3 ? 'bg-gradient-to-r from-green-400 to-green-500 text-dark' :
                        index === 4 ? 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-dark' :
                        'bg-gradient-to-r from-orange-400 to-orange-500 text-dark'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </button>
                    <button
                      onClick={handleViewDetails}
                      className={`px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 text-sm border-2 ${
                        index === 0 ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-dark' : 
                        index === 1 ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-dark' : 
                        index === 2 ? 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark' :
                        index === 3 ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-dark' :
                        index === 4 ? 'border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-dark' :
                        'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-dark'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </AnimatedSection>
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closePopups}
        >
          <div 
            className="relative max-w-md p-8 mx-auto border shadow-2xl rounded-2xl"
            style={{
              backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#d1d5db'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mb-4 text-4xl">🚀</div>
              <h3 
                className="mb-3 text-xl font-bold font-orbitron"
                style={{
                  color: isDarkMode ? '#ffffff' : '#111827'
                }}
              >
                Coming Soon
              </h3>
              <p 
                className="mb-6"
                style={{
                  color: isDarkMode ? '#d1d5db' : '#374151'
                }}
              >
                Detailed project showcase is currently under development. Stay tuned for an immersive experience!
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closePopups}
                  className="px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                    color: isDarkMode ? '#d1d5db' : '#111827',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#4b5563' : '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#f3f4f6';
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Popup */}
      {showDevelopmentPopup && currentProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closePopups}
        >
          <div 
            className="relative max-w-md p-8 mx-auto border shadow-2xl rounded-2xl"
            style={{
              backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#d1d5db'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mb-4 text-4xl">🔧</div>
              <h3 
                className="mb-3 text-xl font-bold font-orbitron"
                style={{
                  color: isDarkMode ? '#ffffff' : '#111827'
                }}
              >
                Project in Development
              </h3>
              <p 
                className="mb-6"
                style={{
                  color: isDarkMode ? '#d1d5db' : '#374151'
                }}
              >
                This project is currently in active development. While not yet deployed, you can explore the codebase and technical implementation details.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closePopups}
                  className="px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                    color: isDarkMode ? '#d1d5db' : '#111827',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#4b5563' : '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#f3f4f6';
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;