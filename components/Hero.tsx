/* eslint-disable react-hooks/purity */

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ShuffleText from './ShuffleText';
import AiSystemTerminal from './AiSystemTerminal';

interface HeroProps {
  onStart: () => void;
  customConfig?: {
    title1: string;
    title2: string;
    tagline: string;
  };
  customStatus?: string;
}

const Hero: React.FC<HeroProps> = ({ onStart, customConfig, customStatus }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const pendingPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pendingPos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      };
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          setMousePos(pendingPos.current);
          frameRef.current = null;
        });
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const config = customConfig || {
    title1: "CYPHER",
    title2: "ZONE",
    tagline: "Ghana's premier reality-bending neural simulation arena."
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-background-dark flex items-center justify-center ">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/arcade/exterior-front.jpeg"
          alt="Cypherzone VR Facility"
          fill
          priority
          className="object-cover grayscale opacity-[0.12] mix-blend-overlay"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/60 via-transparent to-background-dark/70"></div>
      </div>

      <div className="grid-scan-container">
        <div className="grid-scan-lines"></div>
        <div className="grid-scan-beam"></div>
        <div className="grid-fade-overlay"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.08)_0%,transparent_75%)] pointer-events-none z-[1]"></div>
      
      {/* HUD ELEMENTS */}
      <div className="absolute left-6 top-32 bottom-32 w-56 hidden xl:flex flex-col justify-between z-20 pointer-events-none">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-pixel text-[7px] animate-pulse">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            UP_LINK_ACTIVE
          </div>
          <div className="p-3 bg-black/40 border-l border-primary/30 backdrop-blur-sm">
            <AiSystemTerminal defaultStatus={customStatus} />
          </div>
        </div>
        <div className="space-y-1.5 text-[8px] font-pixel text-slate-500 uppercase tracking-widest">
            <div className="h-[1px] w-full bg-gradient-to-r from-primary/40 to-transparent"></div>
            <div>LAT: 5.6037° N</div>
            <div>LONG: 0.1870° W</div>
        </div>
      </div>

      <div className="absolute right-6 top-32 bottom-32 w-56 hidden xl:flex flex-col justify-between items-end z-20 pointer-events-none text-right">
        <div className="space-y-4">
          <div className="text-[9px] font-pixel text-secondary uppercase font-bold tracking-widest">Bio_Sync</div>
          <div className="flex items-end gap-1 h-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 bg-secondary animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-[9px] font-pixel text-primary animate-pulse font-bold tracking-[0.2em] uppercase">OVERRIDE_READY</div>
          <div className="flex flex-col items-end gap-3 w-full max-w-[140px]">
            <div className="flex gap-1 w-full justify-end">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 h-3 border border-primary/20 bg-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary animate-[loaderIn_2s_infinite_linear]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-2 h-2 border border-primary/20 ${Math.random() > 0.5 ? 'bg-primary/40 animate-pulse' : 'bg-transparent'}`}></div>
              ))}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-[6px] font-pixel text-slate-600 tracking-tighter uppercase">Memory_Buffer_Allocation</div>
              <div className="flex items-center gap-2">
                 <div className="h-0.5 w-20 bg-white/5 relative">
                   <div className="absolute inset-y-0 left-0 bg-primary/40 w-3/4 animate-[shimmer_3s_infinite_linear]"></div>
                 </div>
                 <span className="text-[7px] font-pixel text-primary/70">8.4GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CENTRAL HERO CONTENT */}
      <div 
        className="relative z-10 text-center transition-transform duration-300 ease-out flex flex-col items-center px-4 md:px-0"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[1.2] md:scale-[2.0] opacity-20">
          <svg className="w-64 h-64 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#00f3ff" strokeWidth="0.4" strokeDasharray="10 5" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#00f3ff" strokeWidth="0.1" opacity="0.4" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ff00ff" strokeWidth="0.2" strokeDasharray="2 2" />
          </svg>
        </div>

        <div className="space-y-4 relative">
          <div className="inline-block px-3 py-1 border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary font-pixel text-[9px] tracking-[0.4em] uppercase mb-4 font-bold">
            <ShuffleText text="SYSTEMS_ONLINE" delay={300} />
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[8px] md:text-[9px] font-pixel text-white tracking-[0.6em] mb-6 animate-pulse opacity-60">
              <ShuffleText text="INITIALIZING" delay={500} />
            </span>
            
            <div className="relative flex flex-col items-center gap-3">
              <div className="title-glitch-layer" data-text={config.title1}>
                <h1 className="retro-arcade-title text-2xl sm:text-3xl md:text-6xl font-pixel leading-none tracking-tight select-none">
                  <ShuffleText text={config.title1} delay={600} />
                </h1>
              </div>
              
              <div className="title-glitch-layer" data-text={config.title2}>
                <h2 className="retro-arcade-title text-xl sm:text-2xl md:text-5xl font-pixel leading-none tracking-[0.1em]">
                  <ShuffleText text={config.title2} delay={800} />
                </h2>
              </div>
              
              <div className="text-3xl sm:text-5xl md:text-8xl font-pixel text-secondary neon-glow-magenta leading-none mt-4 drop-shadow-[0_0_20px_rgba(255,0,255,0.7)] animate-[neonPulse_2s_infinite]">
                X
              </div>
            </div>
          </div>

          <p className="max-w-xs sm:max-w-sm mx-auto text-slate-400 font-pixel text-[7px] md:text-[9px] tracking-[0.2em] uppercase py-6 md:py-8 leading-relaxed font-semibold whitespace-pre-line">
            {config.tagline}
          </p>

          <button onClick={onStart} className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded blur opacity-20 group-hover:opacity-80 transition duration-500"></div>
            <div className="relative px-8 sm:px-10 md:px-16 py-4 sm:py-5 md:py-6 bg-black border border-white/20 flex flex-col items-center gap-3 group-hover:border-primary transition-all overflow-hidden">
              <span className="font-pixel text-[7px] md:text-[10px] text-primary tracking-[0.4em] group-hover:text-white transition-colors font-black">
                INSERT_COIN_TO_START
              </span>
              <div className="flex gap-2 mt-1">
                {[0.1, 0.2, 0.3].map(d => <div key={d} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${d}s` }}></div>)}
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-16 border-t border-white/5 bg-black/60 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-20">
        <div className="flex items-center gap-8 text-[7px] md:text-[9px] font-pixel text-slate-500 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2"><span className="text-primary opacity-70">SYNC:</span><span>OPTIMAL_V4</span></div>
          <div className="hidden md:flex items-center gap-2"><span className="text-primary opacity-70">NODES:</span><span>12/12 ACTIVE</span></div>
        </div>
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
      </div>

      <style>{`
        @keyframes neonPulse {
          0%, 100% { opacity: 1; transform: scale(1); filter: brightness(1.1) drop-shadow(0 0 20px #ff00ff); }
          50% { opacity: 0.85; transform: scale(0.99); filter: brightness(0.9) drop-shadow(0 0 10px #ff00ff); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
