import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Detect mobile/tablet devices
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Adjust threshold and rootMargin for mobile/tablet
    const threshold = options.threshold ?? (isMobile || isTablet ? 0.01 : 0.1);
    const rootMargin = options.rootMargin ?? (isMobile || isTablet 
      ? '0px 0px -80% 0px'  // much earlier trigger on smaller screens
      : '0px 0px -20% 0px'); // moderate trigger for desktop

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return { ref, isVisible };
};

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (!mainElement) return;
      
      const totalHeight = mainElement.scrollHeight - mainElement.clientHeight;
      const currentProgress = (mainElement.scrollTop / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return progress;
};