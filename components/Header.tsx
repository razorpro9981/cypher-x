/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSfx } from '@/lib/useSfx';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrollTick = useRef(false);
  const { playClick, playHover } = useSfx();
  
  // Mapping for cleaner UI labels
  const tabMapping: Record<string, string> = {
    'HOME': 'HOME',
    'GAMES': 'GAMES',
    'PRICING': 'PRICING',
    'ABOUT': 'ABOUT',
    'NEWS': 'NEWS',
    'CONTACT': 'CONTACT',
    'ADMIN': 'ADMIN',
    'RESTAURANT': 'RESTAURANT',
    'GALLERY': 'GALLERY'
  };

  const mainNav = ["HOME", "GAMES", "RESTAURANT", "NEWS", "ABOUT", "CONTACT"];
  const sectorNav = [ "PRICING", "GALLERY"];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const handleMedia = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    media.addEventListener('change', handleMedia);

    const handleScroll = () => {
      if (scrollTick.current) return;
      scrollTick.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        scrollTick.current = false;
      });
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    if (reduceMotion) {
      document.documentElement.classList.add('prefers-reduced-motion');
    }
    
    // Ensure dark mode is strictly enforced as per the app theme
    document.documentElement.classList.add('dark');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      media.removeEventListener('change', handleMedia);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('prefers-reduced-motion');
    } else {
      document.documentElement.classList.remove('prefers-reduced-motion');
    }
  }, [reduceMotion]);

  const handleNavClick = (item: string) => {
    playClick();
    setActiveTab(item);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSectorActive = sectorNav.includes(activeTab);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 w-full z-[60] transition-all duration-700 ${scrolled ? "py-2" : "py-5"}`}
      >
        {/* Main Interface Bar */}
        <div
          className={`mx-4 md:mx-10 relative transition-all duration-500 ${
            scrolled
              ? "bg-black/90 shadow-[0_10px_40px_rgba(0,0,0,0.55)] border-white/20 backdrop-blur-2xl"
              : "bg-black/60 shadow-2xl"
          } border border-white/10 backdrop-blur-2xl overflow-visible`}
        >
          {/* Scanning Beam Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-[scan_6s_linear_infinite]"></div>
          </div>

          <div className="w-full flex items-center px-4 md:px-10 py-3 relative">
            {/* LOGO Section */}
            <button
              onClick={() => handleNavClick("HOME")}
              className="flex items-center gap-4 group cursor-pointer z-20 shrink-0 pr-10 border-r border-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Cypherzone home"
              onMouseEnter={playHover}
              onClickCapture={playClick}
            >
              <div className="relative w-14 h-14 overflow-hidden ">
                <Image
                  src="/logo-black.png"
                  alt="Cypherzone logo"
                  height={500}
                  width={500}
                  className="object-contain mt-2"
                  priority
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-display font-black text-lg md:text-xl tracking-tighter text-primary leading-none">
                  CYPHER
                  <span className="text-pink-400  group-hover:neon-glow-cyan transition-all">
                    ZONE
                  </span>
                  <span className='text-yellow-500'>X</span>
                </span>
                <span className="text-[6px] font-pixel text-slate-600 tracking-[0.6em] mt-1.5 group-hover:text-primary/60 transition-colors uppercase">
                  VR UNIVERSE
                </span>
              </div>
            </button>

            {/* STRETCHED NAVIGATION */}
            <nav className="hidden lg:flex flex-1 items-center justify-center px-10 gap-2 font-pixel text-[8px] tracking-[0.4em]">
              <div className="flex items-center justify-around w-full max-w-7xl">
                {mainNav.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    aria-current={activeTab === item ? "page" : undefined}
                    aria-pressed={activeTab === item}
                    aria-label={tabMapping[item] || item}
                    title={tabMapping[item] || item}
                    onMouseEnter={playHover}
                    className={`group relative px-5 py-3 transition-all rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      activeTab === item
                        ? "text-primary"
                        : "text-slate-500 hover:text-white"
                    } ${item === "ADMIN" ? "border border-primary/20 bg-primary/5 rounded px-3" : ""}`}
                  >
                    <span className="relative z-10">
                      {tabMapping[item] || item}
                    </span>

                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 text-primary font-pixel text-[7px] transition-all opacity-0 ${activeTab === item ? "opacity-100 translate-x-1" : "group-hover:opacity-40 translate-x-2 group-hover:translate-x-1"}`}
                    >
                      [
                    </span>
                    <span
                      className={`absolute right-0 top-1/2 -translate-y-1/2 text-primary font-pixel text-[7px] transition-all opacity-0 ${activeTab === item ? "opacity-100 -translate-x-1" : "group-hover:opacity-40 -translate-x-2 group-hover:-translate-x-1"}`}
                    >
                      ]
                    </span>

                    {activeTab === item && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rotate-45 shadow-[0_0_15px_#00f3ff] animate-pulse"></div>
                    )}
                    <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></div>
                  </button>
                ))}

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`group relative px-6 py-3 flex items-center gap-3 transition-all border-x border-transparent rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isSectorActive || isDropdownOpen
                        ? "text-secondary bg-secondary/5 border-secondary/10"
                        : "text-slate-500 hover:text-white"
                    }`}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onMouseEnter={playHover}
                  >
                    <span>MORE</span>
                    <span
                      className={`material-symbols-outlined text-[12px] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    >
                      expand_more
                    </span>
                    {isSectorActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary rotate-45 shadow-[0_0_15px_#ff00ff]"></div>
                    )}
                  </button>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-black/95 border border-white/10 backdrop-blur-3xl p-3 flex flex-col gap-1 transition-all duration-300 origin-top shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                      isDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                    }`}
                  >
                    {sectorNav.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleNavClick(item)}
                        className={`text-left px-4 py-3 transition-all flex items-center justify-between group/item rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          activeTab === item
                            ? "bg-primary/10 text-primary border-l-2 border-primary"
                            : "text-slate-500 hover:bg-white/5 hover:text-white"
                        }`}
                        aria-current={activeTab === item ? "page" : undefined}
                        onMouseEnter={playHover}
                      >
                        <span className="tracking-widest">
                          {tabMapping[item] || item}
                        </span>
                        <span className="text-[8px] opacity-0 group-hover/item:opacity-60 transition-opacity translate-x-2 group-hover/item:translate-x-0 duration-300 material-symbols-outlined">
                          trending_flat
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* ACTION AREA */}
            <div className="flex items-center gap-4 relative z-20 shrink-0 lg:pl-10 lg:border-l lg:border-white/5">
              <button
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-all rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-panel"
                onMouseEnter={playHover}
                onClickCapture={playClick}
              >
                <span className="material-symbols-outlined text-xl">
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>

              <div className="hidden lg:flex flex-col items-end gap-1 pointer-events-none">
                <div className="text-[6px] font-pixel text-primary/60 tracking-widest uppercase">
                  Encryption_State
                </div>
                <div className="text-[8px] font-pixel text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  SECURED
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE HUD MENU */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-500 lg:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div
          id="mobile-menu-panel"
          className={`absolute right-0 top-0 w-full max-w-[85vw] sm:max-w-xs h-full bg-background-dark/95 border-l border-white/5 p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col gap-8 sm:gap-12 transition-transform duration-500 shadow-2xl ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px flex-1 bg-white/10"></span>
              <div className="text-[9px] font-pixel text-slate-700 tracking-[0.6em]">
                ACCESS_NODES
              </div>
              <span className="h-px flex-1 bg-white/10"></span>
            </div>
            {[...mainNav, ...sectorNav].map((item, idx) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-left font-display text-xl sm:text-2xl font-black tracking-tighter flex items-center gap-4 sm:gap-5 group transition-all ${
                  activeTab === item
                    ? "text-primary"
                    : "text-slate-600 hover:text-white"
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
                onMouseEnter={playHover}
                onClickCapture={playClick}
              >
                <span
                  className={`w-2 h-2 rotate-45 transition-all ${activeTab === item ? "bg-primary shadow-[0_0_10px_#00f3ff]" : "bg-transparent border border-white/20"}`}
                ></span>
                {tabMapping[item] || item}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-8">
            <div className="flex justify-between items-center text-[7px] font-pixel text-slate-700 uppercase">
              <span>UPTIME: 99.998%</span>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span>LINK_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(150px); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default Header;
