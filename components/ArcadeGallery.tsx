
import React from 'react';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';

const arcadeImages = [
  {
    id: '01',
    title: 'THE_FACILITY',
    src: '/media/arcade/exterior-front.jpeg',
    desc: 'Cypherzone VR HQ. Step through the portal and leave reality behind.',
    size: 'col-span-1 md:col-span-2 md:row-span-2' // Large square
  },
  {
    id: '02',
    title: 'EXTERIOR_VIEW',
    src: '/media/arcade/exterior-side.jpeg',
    desc: 'Our iconic VR mural. You can\'t miss us.',
    size: 'col-span-1 md:col-span-2' // Wide rectangle
  },
  {
    id: '03',
    title: 'COMBAT_ZONE',
    src: '/media/arcade/interior-starship.jpeg',
    desc: 'Starship Troopers VR arena. Gear up and go to war.',
    size: 'col-span-1' // Small square
  },
  {
    id: '04',
    title: 'SIMULATOR_BAY',
    src: '/media/arcade/interior-simulator.jpeg',
    desc: 'Full-motion simulator pod. Feel every twist and drop.',
    size: 'col-span-1' // Small square
  },
];

const ArcadeGallery: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-background-dark relative overflow-hidden border-t border-white/5">
      {/* Background drifting grid */}
      <div className="absolute inset-0 bg-grid-moving opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-pixel text-[7px] md:text-[8px] tracking-[0.4em] uppercase font-bold">
              VIEW_OUR_SPACES
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel text-white leading-tight">
              <ShuffleText text="THE_FACILITY" delay={100} />
            </h2>
          </div>
          <div className="text-[9px] font-pixel text-slate-600 hidden md:block uppercase tracking-[0.3em]">
            Database_Map: Loaded_v4.2
          </div>
        </div>

        {/* Unusual Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[200px]">
          {arcadeImages.map((img, idx) => (
            <div 
              key={img.id} 
              className={`group relative transition-all duration-500 ${img.size}`}
            >
              <CyberBorder className="h-full bg-black/40 overflow-hidden border-white/5 transition-all duration-500 group-hover:border-primary/50 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden">
                  
                  {/* Visual Scanline Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_15px_#00f3ff] animate-[scanLine_3s_linear_infinite]"></div>
                  </div>

                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover brightness-90 contrast-110 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[1.5s]"
                  />

                  {/* Top-Right Badge */}
                  <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-3 py-1 bg-primary text-black font-pixel text-[7px] font-black uppercase shadow-[0_0_15px_#00f3ff]">
                      READY_TO_TOUR
                    </div>
                  </div>

                  {/* ID Tag */}
                  <div className="absolute top-4 left-4 z-30">
                    <div className="px-2 py-1 bg-black/80 border border-white/10 text-[8px] font-pixel text-slate-500 group-hover:text-primary transition-colors font-bold">
                      AREA_{img.id}
                    </div>
                  </div>

                  {/* Info Plate */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <h3 className={`font-display font-black text-white tracking-tighter mb-2 ${idx === 0 ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}`}>
                      <GlitchText text={img.title} color="white" className="leading-tight" />
                    </h3>
                    <p className={`text-slate-400 font-body leading-snug font-bold transition-all duration-500 max-w-sm ${idx === 0 ? 'text-base opacity-100' : 'text-xs opacity-0 group-hover:opacity-100'}`}>
                      {img.desc}
                    </p>
                  </div>
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>

        {/* Tactical Readout Footer */}
        <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
           <div className="flex gap-2 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 md:w-8 h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-brand-yellow w-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                </div>
              ))}
           </div>
           <div className="text-[7px] md:text-[8px] font-pixel text-slate-600 tracking-widest uppercase font-bold">
              Facility_Status: <span className="text-green-500">OPTIMAL</span>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scanLine {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </section>
  );
};

export default ArcadeGallery;
