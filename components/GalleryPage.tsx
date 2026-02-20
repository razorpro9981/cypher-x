
import React, { useState, useEffect } from 'react';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  category: 'MISSION' | 'TECH' | 'ARENA' | 'RUNNER';
  title: string;
  src: string;
  meta: string;
}

const galleryData: GalleryItem[] = [
  { id: '1', category: 'ARENA', title: 'THE_FACILITY', src: '/media/arcade/exterior-front.jpeg', meta: 'LOCATION: SECTOR_7G' },
  { id: '2', category: 'ARENA', title: 'EXTERIOR_MURAL', src: '/media/arcade/exterior-side.jpeg', meta: 'STATUS: ICONIC' },
  { id: '3', category: 'TECH', title: 'COMBAT_ZONE', src: '/media/arcade/interior-starship.jpeg', meta: 'MODE: WAR_READY' },
  { id: '4', category: 'TECH', title: 'SIMULATOR_BAY', src: '/media/arcade/interior-simulator.jpeg', meta: 'INTEGRITY: 100%' },
  { id: '5', category: 'RUNNER', title: 'VR_SPEED_RIDER', src: '/media/arcade/interior-speedrider.jpeg', meta: 'STATUS: ACTIVE' },
  { id: '6', category: 'MISSION', title: 'VR_360_POD', src: '/media/games/1.png', meta: 'SYNC: 98%' },
  { id: '7', category: 'MISSION', title: 'FLYING_RIDE', src: '/media/games/2.png', meta: 'ALTITUDE: MAX' },
  { id: '8', category: 'RUNNER', title: 'SPEED_RACER', src: '/media/games/7.png', meta: 'G-FORCE: ENABLED' },
  { id: '9', category: 'MISSION', title: 'GUN_FIGHT_HERO', src: '/media/games/8.png', meta: 'ACCESS: ALL_RANKS' },
];

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const categories = ['ALL', 'MISSION', 'TECH', 'ARENA', 'RUNNER'];

  const filteredData = filter === 'ALL' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  useEffect(() => {
    // Simulate staggered loading effect for images
    const timer = setTimeout(() => {
      setLoadingItems(new Set(galleryData.map(i => i.id)));
    }, 100);
    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-background-dark overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-[radial-gradient(circle_at_70%_30%,rgba(0,243,255,0.05)_0%,transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary font-pixel text-[10px] tracking-widest uppercase">Visual_Archive_Explorer</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-pixel text-white">
              <GlitchText text="DECRYPTED" color="white" persistent /><br/>
              <span className="text-secondary neon-glow-magenta"><ShuffleText text="FILES" delay={400} /></span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-pixel text-[8px] tracking-widest border transition-all ${
                  filter === cat 
                    ? 'border-primary bg-primary text-black shadow-[0_0_10px_rgba(0,243,255,0.5)]' 
                    : 'border-white/10 text-slate-500 hover:border-primary/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group transition-all duration-700 transform ${loadingItems.has(item.id) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <CyberBorder className="bg-black/40 overflow-hidden border-white/5 group-hover:border-primary/40 transition-colors">
                <div className="relative aspect-square overflow-hidden bg-slate-900">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                  </div>

                  {/* Shimmer loading effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />

                  {/* Tactical Overlays */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="text-[8px] font-pixel bg-black/80 px-2 py-1 border border-white/10 text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors">
                      {item.category}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-display font-black text-white tracking-tighter mb-1">
                      <ShuffleText text={item.title} delay={idx * 50} />
                    </h3>
                    <div className="flex justify-between items-center text-[8px] font-pixel text-slate-500">
                      <span>{item.meta}</span>
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">DATA_CAPTURED_✓</span>
                    </div>
                  </div>
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>

        {/* Footer info for gallery */}
        <div className="mt-20 p-8 border border-dashed border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="text-[10px] font-pixel text-primary uppercase">Archive_Status</div>
            <div className="text-xs text-slate-400 font-body">
              All visual data encrypted via <span className="text-white">QUANTUM_VAULT_7</span>. Unauthorized replication will result in immediate neural disconnect.
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <div className="text-[8px] font-pixel text-slate-600">STORAGE_LOAD</div>
              <div className="w-32 h-1 bg-slate-800 mt-1 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-4/5 animate-pulse"></div>
              </div>
            </div>
            <div className="w-12 h-12 border border-white/10 flex items-center justify-center font-pixel text-[10px] text-white">
              88%
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
