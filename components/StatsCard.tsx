
import React from 'react';
import CyberBorder from './CyberBorder';

interface StatsCardProps {
  label: string;
  value: string;
  color: 'primary' | 'secondary' | 'white';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, color }) => {
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white'
  };

  return (
    <CyberBorder className="p-6 bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className={`text-4xl font-pixel ${colorMap[color]} mb-2 group-hover:scale-105 transition-transform`}>
        {value}
      </div>
      <div className="font-display text-xs tracking-widest text-slate-500 uppercase">
        {label}
      </div>
    </CyberBorder>
  );
};

export default StatsCard;
