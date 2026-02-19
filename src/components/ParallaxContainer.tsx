import React from 'react';
import { useParallax } from '../hooks/useScrollAnimation';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const offset = useParallax(speed);

  return (
    <div
      className={className}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;