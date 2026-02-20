/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';
import { NewsItem, STORAGE_KEY, defaultSiteData, mergeSiteData } from '@/lib/siteData';

const NewsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [news, setNews] = useState<NewsItem[]>(defaultSiteData.news);
  const [activeLog, setActiveLog] = useState<NewsItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const scrollPosition = React.useRef(0);

  useEffect(() => setIsMounted(true), []);

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

  const filteredNews = filter === 'ALL' ? news : news.filter((item) => item.category === filter);
  const featured = news[0];

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-background-light dark:bg-background-dark overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-grid-pattern light-mode-grid opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-[600px] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(0,243,255,0.05)_0%,transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-12 bg-secondary"></div>
              <span className="text-secondary font-pixel text-[10px] tracking-widest uppercase">
                Decrypted_Feeds_v9
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-pixel text-slate-900 dark:text-white leading-none">
              <GlitchText text="SYSTEM" color="white" persistent />
              <br />
              <span className="text-primary neon-glow-cyan">
                <ShuffleText text="ARCHIVES" delay={400} />
              </span>
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

        {filter === 'ALL' && featured && (
          <div className="mb-12 group cursor-pointer">
            <CyberBorder className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/5 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[300px] lg:h-full overflow-hidden bg-slate-900">
                  <Image
                    src={featured.image}
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0"
                    alt="Featured Event"
                    sizes="(min-width:1024px) 640px, 100vw"
                    priority
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-secondary text-white font-pixel text-[10px]">
                      FEATURED_EVENT
                    </span>
                    <span className="px-3 py-1 bg-black/80 text-primary border border-primary/30 font-pixel text-[8px] uppercase">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center space-y-6">
                  <div className="text-[10px] font-pixel text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    [SOURCE_DECRYPT_ID: {featured.date}]
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-secondary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 font-body text-lg leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setActiveLog(featured)}
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
                    <span>[ID:{item.id}]</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-black text-slate-900 dark:text-white leading-tight group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed flex-grow">
                    {item.excerpt}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-white/10">
                    <button
                      onClick={() => setActiveLog(item)}
                      className="text-[10px] font-pixel text-primary hover:text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      ACCESS_LOG →
                    </button>
                    <div className="text-[8px] font-pixel px-2 py-1 bg-black/80 text-secondary border border-secondary/30">
                      {item.clearance}
                    </div>
                  </div>
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>
      </div>

      {isMounted && activeLog &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveLog(null)}></div>
            <div className="relative max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <CyberBorder className="bg-black border-white/10 p-8 md:p-12 relative">
                <button
                  onClick={() => setActiveLog(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="flex items-center gap-3 mb-4 text-[10px] font-pixel text-slate-500">
                  <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/30">{activeLog.category}</span>
                  <span>{activeLog.date}</span>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary border border-secondary/30">{activeLog.clearance}</span>
                </div>
                <h3 className="text-3xl font-display font-black text-white mb-4">{activeLog.title}</h3>
                <Image
                  src={activeLog.image}
                  alt={activeLog.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-lg border border-white/10 mb-6"
                />
                <p className="text-slate-300 font-body leading-relaxed whitespace-pre-line">{activeLog.content}</p>
              </CyberBorder>
            </div>
          </div>,
          document.body
        )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default NewsPage;
