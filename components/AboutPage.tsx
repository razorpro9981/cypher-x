
import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import CyberBorder from './CyberBorder';
import StatsCard from './StatsCard';
import ShuffleText from './ShuffleText';

const BACKGROUND_IMAGES = [
  '/media/arcade/exterior-front.jpeg',
  '/media/arcade/interior-starship.jpeg',
  '/media/arcade/interior-simulator.jpeg',
  '/media/arcade/exterior-side.jpeg'
];

const AboutPage: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative pt-32 pb-20 overflow-hidden min-h-screen bg-background-dark">
      {/* Dynamic Background Layer with Cross-fade */}
      <div className="absolute inset-0 z-0">
        {BACKGROUND_IMAGES.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              currentBg === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Background ${idx}`} 
              className="w-full h-full object-cover grayscale opacity-[0.12] mix-blend-screen scale-110"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-background-dark"></div>
      </div>

      {/* Moving Grid and Glow Overlays */}
      <div className="absolute inset-0 bg-grid-moving opacity-[0.05] pointer-events-none z-[1]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,243,255,0.05)_0%,transparent_70%)] pointer-events-none z-[1]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,0,255,0.05)_0%,transparent_70%)] pointer-events-none z-[1]"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Content Column */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1.5 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-display text-[10px] tracking-[0.4em] uppercase mb-4 animate-pulse font-bold">
              <ShuffleText text="ENCRYPTED_ARCHIVE_ACCESSED" delay={500} />
            </div>
            
            {/* Branding Header */}
            <div className="flex flex-col gap-4">
               <div className="relative w-[280px] md:w-[420px] mb-4">
                
                  <div className="absolute -bottom-4 left-0 text-[10px] font-pixel text-primary tracking-[0.6em] uppercase opacity-60">
                     Genesis_Archive_v4
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8 text-base md:text-xl text-slate-300 font-medium leading-[1.8] max-w-xl tracking-wide">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-brand-yellow to-secondary rounded-full"></div>
              <p className="pl-8 py-2">
                <span className="text-brand-yellow font-black block text-[10px] mb-4 font-pixel tracking-[0.2em]">[EST_2021.LOG]</span>
                <span className="text-white font-bold">Cypher Zone X</span> was born in the digital underground of Accra, founded by a collective of hackers and artists who believed reality was just a poorly optimized operating system. 
              </p>
            </div>
            
            <p className="drop-shadow-sm leading-relaxed">
              Our mission is absolute: to provide an escape velocity from the mundane. We don&apos;t just sell VR sessions; we provide the keys to a multiverse where <span className="text-primary italic">physics is a suggestion</span> and your <span className="text-secondary italic">imagination</span> is the only limiting factor.
            </p>

            <div className="flex items-center gap-6 mt-12 py-6 border-y border-white/5 group">
              <div className="flex flex-col gap-1">
                <div className="w-8 h-0.5 bg-primary group-hover:w-16 transition-all duration-500"></div>
                <div className="w-12 h-0.5 bg-brand-yellow group-hover:w-20 transition-all duration-700"></div>
                <div className="w-4 h-0.5 bg-secondary group-hover:w-12 transition-all duration-300"></div>
              </div>
              <p className="italic text-white font-bold text-lg md:text-xl tracking-tight leading-none transition-all group-hover:text-brand-yellow">
                &quot;Welcome to the Edge. Welcome to Zone X.&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-16">
            <StatsCard label="Neural Interfaces" value="50+" color="primary" />
            <StatsCard label="Deep Link Runners" value="10K+" color="secondary" />
            <StatsCard label="Sync Latency" value="0.04ms" color="white" />
            <StatsCard label="Reality Desync" value="0.0%" color="primary" />
          </div>
        </div>

        {/* Visuals Column */}
        <div className="relative hidden lg:block perspective-1000">
          <div className="transform transition-transform hover:rotate-y-6 hover:rotate-x-3 duration-1000">
            <CyberBorder className="shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900">
              <div className="relative overflow-hidden aspect-[4/5] group">
                {/* Internal Scanline for the image */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                    <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(0,243,255,0.05),transparent,rgba(255,0,255,0.05))] bg-[length:100%_4px,100%_100%]"></div>
                </div>

                <img 
                  alt="Cyberpunk VR headset close up" 
                  className="object-cover w-full h-full opacity-60 mix-blend-screen grayscale contrast-125 brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[2000ms]" 
                  src="/media/arcade/interior-speedrider.jpeg"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                
                {/* HUD Overlay Info Plate */}
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-black/90 backdrop-blur-xl border border-brand-yellow/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] font-pixel text-brand-yellow font-black tracking-widest uppercase">SYSTEM_MANIFESTO</div>
                    <div className="flex gap-1">
                       <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                       <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                       <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-300 font-body leading-relaxed font-bold tracking-wider">
                    CORE INTEGRITY: <span className="text-primary">100%</span><br/>
                    ZONE X STABILITY: <span className="text-secondary">NOMINAL</span><br/>
                    HUMAN OVERRIDE: <span className="text-brand-yellow">DISABLED</span>
                  </div>
                  <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-yellow w-3/4 animate-[shimmer_3s_infinite_linear]"></div>
                  </div>
                </div>
              </div>
            </CyberBorder>
          </div>

          <div className="absolute -bottom-24 -right-24 text-[250px] font-black text-white/[0.03] select-none -z-10 font-display leading-none">
            CYPHER
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
