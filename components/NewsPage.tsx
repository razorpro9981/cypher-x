
﻿'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';

interface NewsItem {
  id: string;
  date: string;
  category: 'SYSTEM_UPDATE' | 'EVENT' | 'INTEL' | 'CLASSIFIED';
  title: string;
  excerpt: string;
  content: string;
  image: string;
  clearance: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'OVERRIDE';
}

const newsData: NewsItem[] = [
  {
    id: '1',
    date: '2026.02.14',
    category: 'EVENT',
    title: "VALENTINE'S DAY SPECIALS",
    excerpt: '5 exclusive couples packages from ₵350 to ₵850. VR experiences + dining combos for 2-4 people.',
    content: 'Celebrate love at Cypherzone! Package 1: First Date Reloaded (₵350) - 1 VR game + 2 Burgers/Pizza + Fries + 2 Soft Drinks. Package 2: Love & Adrenaline (₵450) - 2 VR games + Combo Platter + Pizza + 2 Drinks. Package 3: Escape Reality (₵550) - Flying Ride + VR 360 + Mozzarella Sticks + 2 Burgers + 2 Ice Creams. Package 4: Forever Mode (₵750) - Any 3 VR games + Chicken Tenders + Jollof & Fried Chicken + 2 Drinks. Package 5: Double Date Chaos (₵850 for 4 people) - Flying Ride + Battle Cage + Flying Car + 7D Cinema + 2 Pizzas + 4 Pcs Broasted Chicken + 4 Ice Creams + 4 Drinks. Call +233 26 011 6116 to book!',
    image: '/media/vals.png',
    clearance: 'LEVEL_1'
  },
  {
    id: '2',
    date: '2026.02.10',
    category: 'SYSTEM_UPDATE',
    title: '9 VR EXPERIENCES NOW LIVE',
    excerpt: 'Full game lineup deployed. Speed Rider, VR 360, Flying Ride, 7D Cinema, Speed Racer and more.',
    content: 'All 9 VR stations are now fully operational. Prices range from ₵40 to ₵90 per person per game. Speed Rider (₵40), Gun Fight Hero (₵40), Race Simulator (₵40), VR 360 (₵55), Take Off Now (₵55), Battle Cage (₵45 each), Flying Ride (₵55), 4x4 Adventures (₵45), Cinema 7D (₵90).',
    image: '/media/games/7.png',
    clearance: 'LEVEL_1'
  },
  {
    id: '3',
    date: '2026.02.05',
    category: 'INTEL',
    title: 'NEON_BITES FULL MENU',
    excerpt: 'Complete restaurant menu now serving. Burgers, pizza, shawarma, broasted chicken, shisha and more.',
    content: 'Our Neon Bites kitchen is fully operational with 13 menu categories. Starters from ₵40, Burgers from ₵115, Pizza from ₵100, Main Course dishes, Sandwiches, Pasta & Noodles, Salads, Breakfast, Cakes & Pastries, Hot Drinks, Cold Drinks, Shakes, and Shisha. All freshly prepared daily at Cypherzone HQ.',
    image: '/media/arcade/exterior-front.jpeg',
    clearance: 'LEVEL_1'
  },
  {
    id: '4',
    date: '2026.02.01',
    category: 'SYSTEM_UPDATE',
    title: 'BATTLE_CAGE ACTIVATED',
    excerpt: 'The Starship Troopers VR combat arena is now open. Gear up and go to war.',
    content: 'Our indoor combat zone featuring the Starship Troopers experience is now fully online. ₵45 per person. Full-body immersion with squad-based gameplay. Walk-ins welcome.',
    image: '/media/arcade/interior-starship.jpeg',
    clearance: 'LEVEL_2'
  },
  {
    id: '5',
    date: '2026.01.20',
    category: 'INTEL',
    title: 'PLAYSTATION_ZONE OPEN',
    excerpt: 'Premium gaming lounge with the latest PlayStation consoles and racing sim setups.',
    content: 'Relax in our dedicated PlayStation Zone. Multiple stations with the latest consoles, racing simulators, and comfortable seating. Perfect for casual gaming between VR sessions.',
    image: '/media/games/9.png',
    clearance: 'LEVEL_1'
  },
  {
    id: '6',
    date: '2026.01.15',
    category: 'EVENT',
    title: 'GRAND OPENING',
    excerpt: 'Cypherzone VR Universe is officially open in Ghana. Redefine your reality.',
    content: 'We are proud to announce the grand opening of Cypherzone VR Universe - Ghana\'s premier VR entertainment destination. Featuring 9 immersive VR experiences, a full-service restaurant, and a premium gaming lounge. Visit us today!',
    image: '/media/arcade/exterior-side.jpeg',
    clearance: 'LEVEL_1'
  }
];

const NewsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [activeLog, setActiveLog] = useState<NewsItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const scrollPosition = React.useRef(0);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!activeLog) return;
    scrollPosition.current = window.scrollY;
    const prev = document.body.style.cssText;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.cssText = prev;
      window.scrollTo(0, scrollPosition.current);
    };
  }, [activeLog]);

  const categories = ['ALL', 'SYSTEM_UPDATE', 'EVENT', 'INTEL', 'CLASSIFIED'];

  const filteredNews = filter === 'ALL' 
    ? newsData 
    : newsData.filter(item => item.category === filter);

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-background-light dark:bg-background-dark overflow-hidden transition-colors">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern light-mode-grid opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-[600px] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(0,243,255,0.05)_0%,transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-12 bg-secondary"></div>
              <span className="text-secondary font-pixel text-[10px] tracking-widest uppercase">Decrypted_Feeds_v9</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-pixel text-slate-900 dark:text-white leading-none">
              <GlitchText text="SYSTEM" color="white" persistent /><br/>
              <span className="text-primary neon-glow-cyan"><ShuffleText text="ARCHIVES" delay={400} /></span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-pixel text-[8px] tracking-[0.2em] border transition-all ${
                  filter === cat 
                    ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                    : 'border-slate-200 dark:border-white/10 text-slate-500 hover:border-primary/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured News Hero */}
        {filter === 'ALL' && (
          <div className="mb-12 group cursor-pointer">
            <CyberBorder className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/5 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[300px] lg:h-full overflow-hidden bg-slate-900">
                  <Image
                    src={newsData[0].image}
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0"
                    alt="Featured Event"
                    sizes="(min-width:1024px) 640px, 100vw"
                    priority
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-secondary text-white font-pixel text-[10px]">FEATURED_EVENT</span>
                    <span className="px-3 py-1 bg-black/80 text-primary border border-primary/30 font-pixel text-[8px] uppercase">{newsData[0].category}</span>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center space-y-6">
                  <div className="text-[10px] font-pixel text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    [SOURCE_DECRYPT_ID: {newsData[0].date}]
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-secondary transition-colors">
                    {newsData[0].title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 font-body text-lg leading-relaxed">
                    {newsData[0].excerpt}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setActiveLog(newsData[0])}
                      className="flex items-center gap-4 text-[10px] font-pixel text-secondary group-hover:translate-x-4 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      ACCESS_FULL_LOG <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </CyberBorder>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, idx) => (
            <div 
              key={item.id} 
              className="group animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CyberBorder className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/5 h-full flex flex-col hover:border-primary/40 transition-colors">
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    sizes="(min-width:1024px) 420px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="text-[8px] font-pixel bg-black/80 border border-white/10 px-2 py-1 text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors">
                      {item.category}
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-pixel text-slate-400 dark:text-slate-500">
                    <span>{item.date}</span>
                    <span className="text-[8px] border border-slate-200 dark:border-white/10 px-1.5 py-0.5">{item.clearance}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-primary transition-colors">
                    <ShuffleText text={item.title} delay={idx * 100} />
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed flex-grow">
                    {item.excerpt}
                  </p>

                  <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                    <button
                      onClick={() => setActiveLog(item)}
                      className="text-[10px] font-pixel text-primary group-hover:translate-x-2 transition-transform uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Decode_Log_
                    </button>
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-lg">terminal</span>
                  </div>
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isMounted && activeLog && createPortal(
          <div
            className="fixed inset-0 z-[1800] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveLog(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-950 border border-white/10 shadow-[0_0_40px_rgba(0,243,255,0.25)] max-h-[85vh] rounded-lg overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52 md:h-72 overflow-hidden">
                <Image
                  src={activeLog.image}
                  alt={activeLog.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 900px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-primary/20 border border-primary/40 text-primary font-pixel text-[9px] tracking-widest">
                    {activeLog.category}
                  </span>
                  <span className="px-3 py-1 bg-secondary text-white font-pixel text-[9px] tracking-widest">
                    LOG_{activeLog.id}
                  </span>
                </div>
                <button
                  onClick={() => setActiveLog(null)}
                  className="absolute top-3 right-3 text-white/70 hover:text-white font-pixel text-sm tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  CLOSE ✕
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-4 overflow-y-auto">
                <div className="flex flex-wrap justify-between items-center text-[10px] font-pixel text-slate-400 gap-2">
                  <span>[TIMESTAMP: {activeLog.date}]</span>
                  <span className="border border-white/10 px-2 py-1 text-[9px] uppercase">{activeLog.clearance}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
                  {activeLog.title}
                </h3>
                <p className="text-slate-300 font-body leading-relaxed text-sm md:text-base">
                  {activeLog.content}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveLog(null)}
                    className="text-primary font-pixel text-[10px] tracking-[0.25em] uppercase border-b border-primary/40 pb-1 hover:text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Close Log
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Global Alert Banner */}
        <div className="mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-secondary/10 animate-pulse"></div>
          <div className="relative p-6 border border-secondary/30 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 rounded-full">
                <span className="material-symbols-outlined text-secondary animate-bounce">warning</span>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs font-pixel text-secondary mb-1">GLOBAL_ALERT_STABILITY_PROTOCOL</div>
                <div className="text-sm font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                  SECTOR_4_UNDERGOING_DEEP_LINK_MAINTENANCE. EXPECT MINOR DESYNC.
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-pixel text-slate-500 mb-1">TIME_UNTIL_STABILIZATION</div>
              <div className="text-lg font-pixel text-secondary">00:45:12</div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default NewsPage;
