import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import ScrollProgressBar from './components/ScrollProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import backendWarmer from './utils/backendWarmer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (!mainElement) return;
      
      const sections = ['home', 'about', 'experience', 'projects', 'reviews', 'skills', 'contact'];
      const scrollPosition = mainElement.scrollTop + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - mainElement.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    // Initialize backend warmer to prevent cold starts
    backendWarmer.start().catch((error) => {
      console.debug('Backend warmer initialization failed:', error);
    });
    
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Hide default scrollbar
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Parallax effect
    const handleParallax = () => {
      const mainElement = document.querySelector('main');
      if (!mainElement) return;
      
      const scrolled = mainElement.scrollTop;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleParallax);
      return () => {
        // Clean up event listeners
        mainElement.removeEventListener('scroll', handleParallax);
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        // Stop backend warmer when component unmounts
        backendWarmer.stop();
      };
    }
    
    // If no main element found, still provide cleanup for backend warmer
    return () => {
      backendWarmer.stop();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-white bg-dark transition-all duration-300">
      <ScrollProgressBar />
      <Navigation activeSection={activeSection} />
      <main className="h-screen overflow-x-hidden overflow-y-auto transition-all duration-300">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Reviews />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;