import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  triggerOnce = true,
}) => {
  // Detect mobile/tablet devices for no animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1024;
  
  // If mobile or tablet, render without animations
  if (isMobile || isTablet) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce,
  });

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    
    switch (direction) {
      case 'left':
        return 'translate3d(-100px, 0, 0)';
      case 'right':
        return 'translate3d(100px, 0, 0)';
      case 'up':
        return 'translate3d(0, 100px, 0)';
      case 'down':
        return 'translate3d(0, -100px, 0)';
      default:
        return 'translate3d(0, 100px, 0)';
    }
  };

  // Cap desktop delays at 300ms
  const adjustedDelay = Math.min(delay, 300);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${adjustedDelay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;