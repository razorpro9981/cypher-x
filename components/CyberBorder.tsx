
import React from 'react';

interface CyberBorderProps {
  children: React.ReactNode;
  className?: string;
}

const CyberBorder: React.FC<CyberBorderProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative p-1 border border-white/10 ${className}`}>
      {/* Top Left Corner */}
      <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-2 border-l-2 border-primary"></div>
      {/* Bottom Right Corner */}
      <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-2 border-r-2 border-secondary"></div>
      
      {/* Static Glow effect */}
      <div className="absolute top-0 left-0 w-full h-full border border-primary/5 pointer-events-none"></div>
      
      {children}
    </div>
  );
};

export default CyberBorder;
