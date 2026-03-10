import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Github, Instagram, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import ParallaxContainer from './ParallaxContainer';
import AnimatedSection from './AnimatedSection';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

  const toggleTheme = () => {
    if (isThemeTransitioning) return;
    
    setIsThemeTransitioning(true);
    
    // Play theme switch sound
    const playThemeSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create multiple oscillators for a richer sound
      const createTone = (freq: number, type: OscillatorType, delay: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filterNode = audioContext.createBiquadFilter();
        
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + delay);
        
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(2000, audioContext.currentTime + delay);
        filterNode.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + delay + duration);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + delay + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + delay + duration);
        
        oscillator.start(audioContext.currentTime + delay);
        oscillator.stop(audioContext.currentTime + delay + duration);
      };
      
      if (isDarkMode) {
        // Light mode sound - bright and uplifting
        createTone(440, 'sine', 0, 0.15);
        createTone(554, 'triangle', 0.05, 0.15);
        createTone(659, 'sine', 0.1, 0.2);
        createTone(880, 'triangle', 0.15, 0.1);
      } else {
        // Dark mode sound - deep and professional
        createTone(220, 'sine', 0, 0.2);
        createTone(165, 'triangle', 0.08, 0.15);
        createTone(110, 'sine', 0.15, 0.1);
      }
    };

    try {
      playThemeSound();
    } catch (error) {
      console.log('Audio not supported');
    }
    
    // Get button position for animation origin
    const button = themeButtonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Create theme transition overlay
      const overlay = document.createElement('div');
      overlay.className = 'theme-transition-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        background: ${isDarkMode ? 'radial-gradient(circle at ' + x + 'px ' + y + 'px, #f7fafc 0%, #edf2f7 100%)' : 'radial-gradient(circle at ' + x + 'px ' + y + 'px, #0a0a0f 0%, #1a1a2e 100%)'};
        transform: scale(0);
        border-radius: 50%;
        animation: themeWaveExpand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      `;
      
      document.body.appendChild(overlay);
      
      // Create floating particles for enhanced effect
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'theme-particle';
        particle.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${isDarkMode ? '#fbbf24' : '#60a5fa'};
          pointer-events: none;
          z-index: 10000;
          animation: particleFloat${i} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => particle.remove(), 1200);
      }
      
      // Add wave animation keyframes if not already added
      if (!document.querySelector('#theme-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'theme-animation-styles';
        style.textContent = `
          @keyframes themeWaveExpand {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }
          
          @keyframes iconFlip {
            0% { transform: rotateY(0deg) scale(1); }
            50% { transform: rotateY(90deg) scale(1.2); filter: brightness(1.5); }
            100% { transform: rotateY(0deg) scale(1); }
          }
          
          .theme-icon-flip {
            animation: iconFlip 0.6s ease-in-out;
          }
          
          ${Array.from({length: 12}, (_, i) => `
            @keyframes particleFloat${i} {
              0% {
                transform: translate(0, 0) scale(0);
                opacity: 1;
              }
              50% {
                opacity: 1;
                transform: translate(${Math.cos(i * 30 * Math.PI / 180) * 100}px, ${Math.sin(i * 30 * Math.PI / 180) * 100}px) scale(1);
              }
              100% {
                transform: translate(${Math.cos(i * 30 * Math.PI / 180) * 200}px, ${Math.sin(i * 30 * Math.PI / 180) * 200}px) scale(0);
                opacity: 0;
              }
            }
          `).join('')}
        `;
        document.head.appendChild(style);
      }
      
      // Add icon flip animation
      const icon = button.querySelector('svg');
      if (icon) {
        icon.classList.add('theme-icon-flip');
      }
      
      // Change theme after animation starts
      setTimeout(() => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark');
        document.body.classList.toggle('light-theme');
      }, 400);
      
      // Clean up after animation
      setTimeout(() => {
        overlay.remove();
        setIsThemeTransitioning(false);
        if (icon) {
          icon.classList.remove('theme-icon-flip');
        }
      }, 800);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cubeRef.current || !containerRef.current) return;
      
      // Only apply mouse move effects on desktop
      if (window.innerWidth <= 1024) return;

      const container = containerRef.current.getBoundingClientRect();
      const centerX = container.left + container.width / 2;
      const centerY = container.top + container.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / container.height) * 30;
      const rotateY = (mouseX / container.width) * 30;

      cubeRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Apply saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light-theme');
    }
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="absolute z-30 top-4 md:top-8 right-4 md:right-8">
        <button
          ref={themeButtonRef}
          onClick={toggleTheme}
          disabled={isThemeTransitioning}
          className="relative p-2 overflow-hidden transition-all duration-300 border rounded-full md:p-3 glass-card border-neon-blue/30 md:hover:border-neon-blue/60 md:hover:scale-105 group"
        >
          <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 md:group-hover:opacity-100"></div>
          <div className="relative z-10">
            {isDarkMode ? (
              <Sun className="w-5 h-5 transition-all duration-300 md:w-6 md:h-6 text-neon-cyan md:group-hover:text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 transition-all duration-300 md:w-6 md:h-6 text-neon-blue md:group-hover:text-indigo-400" />
            )}
          </div>
          {/* Pulse effect on hover - desktop only */}
          <div className="absolute inset-0 transition-transform duration-300 scale-0 rounded-full bg-neon-blue/20 md:group-hover:scale-100 md:group-hover:animate-ping"></div>
        </button>
      </div>

      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background gradient */}
      <ParallaxContainer speed={0.2} className="absolute inset-0 z-[2]">
        <div className="h-full bg-gradient-to-br from-neon-violet/10 via-transparent to-neon-cyan/10" />
      </ParallaxContainer>
      
      {/* Animated background elements */}
      <ParallaxContainer speed={0.3} className="absolute inset-0 z-[3]">
        <div>
          <div className="absolute w-2 h-2 rounded-full top-20 left-20 bg-neon-blue animate-pulse" />
          <div className="absolute w-1 h-1 rounded-full top-40 right-32 bg-neon-cyan animate-ping" />
          <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-neon-violet rounded-full animate-pulse" />
        </div>
      </ParallaxContainer>

      <div className="relative z-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center min-h-screen gap-8 py-16 lg:gap-12 lg:py-20 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <AnimatedSection direction="left" className="order-2 space-y-6 lg:space-y-8 lg:order-1">
            <AnimatedSection direction="up" delay={200}>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-orbitron">
                <span className="text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-violet bg-clip-text">
                  GAURAV
                </span>
                <br />
                <span className="text-white">SHARMA</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={100}>
              <p className="text-lg font-light leading-relaxed text-gray-300 sm:text-xl lg:text-2xl">
                BCA Student & Aspiring Full-Stack Developer crafting
                <span className="font-medium text-neon-cyan"> scalable digital solutions</span>
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
              <p className="text-base leading-relaxed text-gray-400 lg:text-lg">
                Passionate about creating innovative web and mobile applications with modern technologies. 
                Currently pursuing BCA at Dr. Bhimrao Ambedkar University and working on cutting-edge projects.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={200} className="flex flex-col gap-4 mt-6 sm:gap-6 lg:mt-8 sm:flex-row">
              <button 
                onClick={scrollToProjects}
                className="px-6 py-3 transition-all duration-300 border rounded-lg lg:px-8 lg:py-4 glass-card border-neon-blue/30 md:hover:border-neon-blue/60 md:hover:scale-105 group"
              >
                <span className="font-semibold text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
                  View Projects
                </span>
                <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 md:group-hover:opacity-100" />
              </button>
              
              <a 
                href="/Gaurav_Sharma.pdf" 
                download="Gaurav_Sharma_Resume.pdf"
                className="inline-block px-6 py-3 font-semibold text-center text-white transition-all duration-300 border rounded-lg lg:px-8 lg:py-4 border-white/20 md:hover:border-white/40 md:hover:scale-105"
              >
                Download CV
              </a>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0} className="flex flex-wrap gap-3 mt-6 lg:gap-4 lg:mt-8">
              {['React', 'Node.js', 'React Native', 'MySQL', 'JavaScript', 'SQLite', 'MongoDB', 'Express.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-300 border rounded-lg lg:px-4 lg:text-base glass-card border-neon-blue/20 text-neon-cyan md:hover:border-neon-blue/40"
                >
                  {tech}
                </span>
              ))}
            </AnimatedSection>
          </AnimatedSection>

          {/* Right Side - Profile Picture */}
          <AnimatedSection direction="right" delay={200} className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-cyan to-neon-violet blur-2xl opacity-30 animate-pulse"></div>
                <div className="absolute rounded-full inset-2 bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20"></div>
                <img
                  src="/gaurav-pic.jpeg"
                  alt="Gaurav Sharma"
                  className="relative object-cover w-full h-full border-4 rounded-full shadow-2xl border-neon-cyan/50 shadow-neon-cyan/20"
                />
                <div className="absolute inset-0 border-2 rounded-full border-gradient-to-br from-neon-blue to-neon-cyan opacity-60"></div>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute w-6 h-6 delay-300 rounded-full lg:w-8 lg:h-8 -top-3 lg:-top-4 -right-3 lg:-right-4 bg-neon-blue animate-bounce"></div>
              <div className="absolute w-4 h-4 delay-700 rounded-full lg:w-6 lg:h-6 -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 bg-neon-cyan animate-bounce"></div>
              <div className="absolute w-3 h-3 rounded-full lg:w-4 lg:h-4 top-1/2 -left-6 lg:-left-8 bg-neon-violet animate-pulse"></div>
              
              {/* Social Icons - Hide on mobile, show on larger screens */}
              <div className="absolute right-[-180px] lg:right-[-240px] top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col gap-4">
                <a 
                  href="https://github.com/gauravsh986" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 transition-all duration-300 border rounded-full glass-card border-neon-blue/30 hover:border-neon-blue/60 hover:scale-110 group"
                >
                  <Github className="w-6 h-6 text-gray-300 transition-colors duration-300 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/gaurav-sharma-280755252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 transition-all duration-300 border rounded-full glass-card border-neon-blue/30 hover:border-neon-blue/60 hover:scale-110 group"
                >
                  <Linkedin className="w-6 h-6 text-gray-300 transition-colors duration-300 group-hover:text-neon-cyan" />
                </a>
                <a 
                  href="https://www.instagram.com/gaurav_sharma37?igsh=YjdqMjR0NmQ5czN0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 transition-all duration-300 border rounded-full glass-card border-neon-blue/30 hover:border-neon-blue/60 hover:scale-110 group"
                >
                  <Instagram className="w-6 h-6 text-gray-300 transition-colors duration-300 group-hover:text-pink-400" />
                </a>
                <a 
                  href="https://wa.me/919528846056?text=Hi%20Gaurav%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20career%20opportunity%20with%20you%2E"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 transition-all duration-300 border rounded-full glass-card border-neon-blue/30 hover:border-neon-blue/60 hover:scale-110 group"
                >
                  <svg className="w-6 h-6 text-gray-300 transition-colors duration-300 group-hover:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=gauravsh986@gmail.com"
                  className="p-3 transition-all duration-300 border rounded-full glass-card border-neon-blue/30 hover:border-neon-blue/60 hover:scale-110 group"
                >
                  <Mail className="w-6 h-6 text-gray-300 transition-colors duration-300 group-hover:text-red-400" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <AnimatedSection direction="up" delay={250} className="absolute transform -translate-x-1/2 bottom-2 sm:bottom-3 lg:bottom-8 left-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="p-2 transition-all duration-300 border rounded-full lg:p-3 border-white/20 md:hover:border-neon-cyan/60 md:hover:bg-neon-cyan/10"
          >
            <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6 text-neon-cyan" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;