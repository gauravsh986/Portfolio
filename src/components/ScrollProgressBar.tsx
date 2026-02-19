import React from 'react';
import { useScrollProgress } from '../hooks/useScrollAnimation';

const ScrollProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 z-[99999] w-full h-0.5 bg-transparent">
      <div
        className="h-full transition-all duration-300 ease-out shadow-lg bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-violet shadow-neon-cyan/30"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;