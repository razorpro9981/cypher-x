/* eslint-disable react-hooks/set-state-in-effect */

'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';
import { NewsItem, STORAGE_KEY, defaultSiteData, mergeSiteData } from '@/lib/siteData';

interface NewsSectionProps {
  onNavigate?: (tab: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = () => {
  const [news, setNews] = useState<NewsItem[]>(defaultSiteData.news);
  const [activeLog, setActiveLog] = useState<NewsItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = mergeSiteData(JSON.parse(saved));
      setNews(parsed.news);
    } catch (e) {
      console.error('Failed to parse saved news config', e);
    }
  }, []);

  useEffect(() => {
    if (!activeLog) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeLog]);

  function goToNews() {
    window.location.href = '/news';
  }

  return (
    <section id="news" className="py-16 md:py-32 bg-background-dark/50 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-display text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
              Decrypted Feeds
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel text-white leading-tight">
              <ShuffleText text="NEWS" delay={200} />
            </h2>
          </div>
          <Link
            href="/news"
            className="text-primary font-display text-xs tracking-[0.2em] hover:text-secondary transition-colors uppercase border-b border-primary/30 pb-1 self-center md:self-end min-h-[44px] px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            View All Logs_
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {news.slice(0, 3).map((item) => (
                <CyberBorder key={item.id} className="bg-black/40 backdrop-blur-sm group hover:bg-black/60 transition-all duration-500">
                  <button
                    type="button"
                    onClick={goToNews}
                    className="relative h-48 overflow-hidden text-left w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      sizes="(min-width:1024px) 420px, 100vw"
                      priority={item.id === '1'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                  <span className={`text-[8px] font-pixel px-2 py-1 border ${
                    item.category === 'EVENT' ? 'border-secondary text-secondary' : 
                    item.category === 'SYSTEM_UPDATE' ? 'border-primary text-primary' : 
                    'border-white text-white'
                  } bg-black/80`}>
                    {item.category}
                  </span>
                </div>
              </button>

              <div className="p-6 space-y-4">
                <div className="text-[10px] font-pixel text-slate-500">
                  [TIMESTAMP: {item.date}]
                </div>
                <h3 className="text-xl font-display font-black text-white group-hover:text-primary transition-colors">
                  <GlitchText text={item.title} color="white" />
                </h3>
                <p className="text-slate-400 font-body text-sm leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setActiveLog(item)}
                    className="flex items-center gap-2 text-[10px] font-pixel text-primary group-hover:translate-x-2 transition-transform min-h-[44px] px-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    READ_LOG <span className="text-xs">→</span>
                  </button>
                </div>
              </div>
            </CyberBorder>
          ))}
        </div>
      </div>

      {/* Modal for log details */}
      {isMounted && activeLog && createPortal(
        <div
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveLog(null)}
        >
          <div
            className="relative max-w-3xl w-full md:w-11/12 lg:w-3/4 bg-slate-950 border border-white/10 shadow-[0_0_40px_rgba(0,243,255,0.25)] max-h-[85vh] rounded-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0">
              <Image
                src={activeLog.image}
                alt={activeLog.title}
                fill
                className="object-cover opacity-80"
                sizes="(min-width:1024px) 800px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
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
                className="absolute top-3 right-3 text-white/70 hover:text-white font-pixel text-sm tracking-widest"
              >
                CLOSE ✕
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-4 overflow-y-auto">
              <div className="flex justify-between items-center text-[10px] font-pixel text-slate-400">
                <span>[TIMESTAMP: {activeLog.date}]</span>
                <span className="border border-white/10 px-2 py-1 text-[9px] uppercase">Clearance: PUBLIC</span>
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
                  className="text-primary font-pixel text-[10px] tracking-[0.25em] uppercase border-b border-primary/40 pb-1 hover:text-secondary transition-colors"
                >
                  Close Log
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default NewsSection;
