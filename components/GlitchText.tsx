
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  color: 'primary' | 'secondary' | 'white';
  persistent?: boolean;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, color, persistent = false, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!persistent) return;

    const glitchCycle = () => {
      // Trigger a glitch for 200-500ms
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), Math.random() * 300 + 200);
      
      // Schedule next glitch in 2-5 seconds
      const nextDelay = Math.random() * 3000 + 2000;
      setTimeout(glitchCycle, nextDelay);
    };

    const initialTimeout = setTimeout(glitchCycle, 1000);
    return () => clearTimeout(initialTimeout);
  }, [persistent]);

  const colorClass = 
    color === 'primary' ? 'text-primary neon-glow-cyan' : 
    color === 'secondary' ? 'text-secondary neon-glow-magenta' : 
    'text-white';

  const glitchStateClass = isGlitching || persistent ? 'opacity-70' : 'opacity-0 group-hover:opacity-70';
  const glitchAnimationClass = isGlitching || persistent ? 'animate-glitch' : 'group-hover:animate-glitch';

  return (
    <span className={`relative inline-block group cursor-default ${className}`}>
      <span className={`relative z-10 ${colorClass}`}>{text}</span>
      
      {/* Red/Magenta Layer */}
      <span className={`absolute top-0 left-0 w-full h-full text-red-500 ${glitchStateClass} translate-x-[2px] translate-y-[-1px] transition-all ${glitchAnimationClass} mix-blend-screen pointer-events-none`}>
        {text}
      </span>
      
      {/* Blue/Cyan Layer */}
      <span className={`absolute top-0 left-0 w-full h-full text-cyan-500 ${glitchStateClass} translate-x-[-2px] translate-y-[1px] transition-all ${glitchAnimationClass} mix-blend-screen pointer-events-none`} style={{ animationDelay: '0.1s' }}>
        {text}
      </span>
      
      {/* White Noise Layer (Subtle) */}
      <span className={`absolute top-0 left-0 w-full h-full text-white/20 ${glitchStateClass} scale-x-110 transition-all ${glitchAnimationClass} mix-blend-overlay pointer-events-none`} style={{ animationDelay: '0.15s' }}>
        {text}
      </span>
    </span>
  );
};

export default GlitchText;
