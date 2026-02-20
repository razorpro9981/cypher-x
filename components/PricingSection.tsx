/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';
import Image from 'next/image';
import Link from 'next/link';

interface PricingSectionProps {
  pricingData?: any;
  isHome?: boolean;
  onNavigate?: (tab: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingData, isHome = false, onNavigate }) => {
  const data = pricingData || {
    card: { name: "ARCADE_CARD", price: "50", description: "Your permanent member card." },
    topups: [],
    gameRates: []
  };

  const recommendedPack = data.topups.find((p: any) => p.recommended) || data.topups[0];

  if (isHome) {
    return (
      <section id="pricing-summary" className="py-16 md:py-24 bg-background-dark/80 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-pixel text-[8px] tracking-[0.4em] uppercase mb-4">
                Starter_Protocol
              </div>
            <h2 className="text-2xl sm:text-4xl font-pixel text-white mb-6 leading-tight">
              <ShuffleText text="PRICING" delay={100} />
            </h2>
            <p className="text-slate-400 font-body text-base md:text-lg mb-8">
              Grab your lifetime card, load some credits, and jump into any game instantly.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center md:justify-start gap-4 text-white font-pixel text-[8px] md:text-[10px]">
                <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#00f3ff]"></span>
                ONE-TIME CARD: free
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-white font-pixel text-[8px] md:text-[10px]">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_#ff00ff]"></span>
                CREDITS FROM: any amount
              </div>
              <Link
                href="/pricing"
                className="mt-2 inline-flex items-center gap-2 text-primary font-display text-[11px] tracking-[0.2em] uppercase border-b border-primary/30 pb-1 hover:text-secondary transition-colors self-center md:self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View Pricing_
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
              <CyberBorder className="bg-black/60 p-6 border-primary/20">
                <div className="text-[8px] font-pixel text-slate-500 mb-2 uppercase">Lifetime_Card</div>
                <div className="text-xl md:text-2xl font-display font-black text-white mb-1">{data.card.name}</div>
                <div className="text-2xl md:text-3xl font-display font-black text-primary mb-4">FREE</div>
                <div className="text-[7px] font-pixel text-slate-600 uppercase">REQUIRED_TO_PLAY</div>
              </CyberBorder>

              <CyberBorder className="bg-black/60 p-6 border-secondary/20">
                <div className="text-[8px] font-pixel text-slate-500 mb-2 uppercase">Popular_Pack</div>
                <div className="text-xl md:text-2xl font-display font-black text-white mb-1">{recommendedPack?.name || 'PACKET'}</div>
                <div className="text-2xl md:text-3xl font-display font-black text-secondary mb-4">₵{'120'}</div>
                <div className="text-[7px] font-pixel text-slate-600 uppercase">INCLUDES_BONUS_CREDITS</div>
              </CyberBorder>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 md:py-32 bg-background-dark/80 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_80%_20%,rgba(0,243,255,0.03)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-3 py-1 border border-primary/20 bg-primary/5 text-primary font-pixel text-[8px] tracking-[0.4em] uppercase mb-4">
            How_To_Play
          </div>
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-pixel text-white mb-6 leading-tight">
            <ShuffleText text="PRICING" delay={100} />
          </h2>
          <p className="text-slate-500 font-display text-[9px] md:text-xs tracking-[0.4em] uppercase max-w-lg mx-auto leading-relaxed">
            Get your card, load credits, and play. Simple as that.
          </p>
        </div>

        {/* 1. THE CARD */}
        {/* <div className="mb-16 md:mb-24">
          <h3 className="text-primary font-pixel text-[9px] md:text-[10px] tracking-[0.2em] mb-8 uppercase flex items-center gap-4">
            <span className="h-px w-6 md:w-10 bg-primary"></span>
            Step_01: Get Your Card
          </h3>
          <CyberBorder className="bg-black/80 border-primary/30 max-w-4xl mx-auto shadow-[0_0_50px_rgba(0,243,255,0.1)] group">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative overflow-hidden bg-slate-900 border-r border-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 animate-pulse"></div>
                <div className="relative h-48 md:h-full flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-4">
                  <div className="w-16 h-24 md:w-24 md:h-32 border-2 border-white/10 rounded-lg relative flex flex-col items-center justify-center group-hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">badge</span>
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/5 overflow-hidden">
                       <div className="h-full bg-primary w-2/3"></div>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-pixel text-slate-500">MEMBER_ID_CARD</div>
                </div>
              </div>
              <div className="md:col-span-7 p-6 md:p-16 space-y-4 md:space-y-6 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h4 className="text-xl md:text-4xl font-display font-black text-white tracking-tighter mb-1 md:mb-2">
                      {data.card.name}
                    </h4>
                    <p className="text-slate-400 font-body text-sm md:text-lg">
                      Buy it once, keep it forever. Required to play any game.
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-3xl md:text-4xl font-display font-black text-primary">₵{data.card.price}</div>
                    <div className="text-[7px] font-pixel text-slate-600 mt-1 uppercase">ONE_TIME</div>
                  </div>
                </div>
                <div className="pt-4 md:pt-6 border-t border-white/5 grid grid-cols-2 gap-4 md:gap-8 text-[8px] md:text-[9px] font-pixel text-slate-500">
                   <div className="flex items-center gap-2 md:gap-3">
                     <span className="material-symbols-outlined text-primary text-xs md:text-sm">cached</span>
                     LIFETIME USE
                   </div>
                   <div className="flex items-center gap-2 md:gap-3">
                     <span className="material-symbols-outlined text-primary text-xs md:text-sm">save</span>
                     SAVES SCORES
                   </div>
                </div>
                <button className="w-full py-4 md:py-5 bg-primary text-black font-pixel text-[9px] md:text-[10px] tracking-widest font-black hover:shadow-[0_0_30px_#00f3ff] transition-all uppercase">
                  GET MY CARD
                </button>
              </div>
            </div>
          </CyberBorder>
        </div> */}

        {/* 2. TOP-UPS */}
        {/* <div className="mb-16 md:mb-24">
          <h3 className="text-secondary font-pixel text-[9px] md:text-[10px] tracking-[0.2em] mb-8 uppercase flex items-center gap-4">
            <span className="h-px w-6 md:w-10 bg-secondary"></span>
            Step_02: Load Credits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.topups.map((pack: any, idx: number) => (
              <div key={pack.name} className={`relative ${pack.recommended ? 'md:-translate-y-4' : ''}`}>
                {pack.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-secondary text-white font-pixel text-[7px] px-4 py-1 animate-pulse shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                    BEST DEAL
                  </div>
                )}
                <CyberBorder className={`h-full bg-black/60 backdrop-blur-md transition-all duration-500 ${pack.recommended ? 'border-secondary/50' : 'border-white/5 hover:border-white/20'}`}>
                  <div className="p-6 md:p-8 space-y-4 md:space-y-6 flex flex-col items-center text-center">
                    <div className="space-y-1">
                      <div className="text-[8px] font-pixel text-slate-500 uppercase">{pack.name}</div>
                      <div className="text-3xl md:text-4xl font-display font-black text-white">{pack.credits} <span className="text-primary text-xs md:text-sm">CR</span></div>
                    </div>
                    
                    <div className="text-2xl md:text-3xl font-display font-black text-secondary">
                      ₵{pack.price}
                    </div>

                    <div className="py-2 px-4 md:py-3 md:px-6 bg-white/5 border border-white/5 w-full">
                       <div className="text-[7px] font-pixel text-slate-500 mb-1">EXTRA BONUS</div>
                       <div className="text-[10px] md:text-xs font-pixel text-green-500">+{pack.bonus} FREE CREDITS</div>
                    </div>

                    <button className={`w-full py-3 md:py-4 font-pixel text-[8px] md:text-[9px] transition-all tracking-widest uppercase font-black ${
                      pack.recommended ? 'bg-secondary text-white hover:shadow-[0_0_30px_rgba(255,0,255,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                      BUY CREDITS
                    </button>
                  </div>
                </CyberBorder>
              </div>
            ))}
          </div>
        </div> */}

        {/* 3. GAME RATES */}
        <div>
          <h3 className="text-white font-pixel text-[9px] md:text-[10px] tracking-[0.2em] mb-8 uppercase flex items-center gap-4">
            <span className="h-px w-6 md:w-10 bg-white/20"></span>
           Game Prices
          </h3>
          <CyberBorder className="relative overflow-hidden bg-black/60 border-white/5 p-6 md:p-12">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-6">
                <h4 className="text-lg md:text-xl font-display font-black text-white flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary"></span>
                  PRICES PER GAME
                </h4>
                <div className="space-y-4">
                  {data.gameRates.map((rate: any) => (
                    <div key={rate.title} className="flex items-center justify-between py-3 md:py-4 border-b border-white/5 group">
                      <div className="flex items-center gap-3 md:gap-4">
                         <div className="w-1.5 h-1.5 bg-slate-800 group-hover:bg-primary transition-colors"></div>
                         <span className="font-pixel text-[8px] md:text-[10px] text-slate-400 group-hover:text-white transition-colors uppercase">{rate.title}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-black text-white text-lg md:text-xl">₵{rate.cost}</span>
                        <span className="text-[7px] font-pixel text-slate-600 uppercase">GHC</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative overflow-hidden flex flex-col justify-center space-y-6 md:space-y-8 bg-primary/5 p-6 md:p-8 border border-primary/10">
                 <Image
                   src="/media/vrboy.jpg"
                   alt="VR player"
                   fill
                   priority
                   className="object-cover opacity-50"
                   sizes="(min-width: 1024px) 550px, 100vw"
                 />
                 <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"></div>
                 <div className="relative space-y-2">
                    <div className="text-[9px] md:text-[10px] font-pixel text-primary uppercase">Player_Info</div>
                    <p className="text-xs md:text-sm text-slate-400 font-body leading-relaxed">
                      Prices are per person per game. Most sessions last around 15 to 20 minutes.
                    </p>
                 </div>
                 <div className="relative grid grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1">
                       <div className="text-[6px] md:text-[7px] font-pixel text-slate-600 uppercase">Expiry</div>
                       <div className="text-[8px] md:text-[9px] font-pixel text-white">NEVER EXPIRE</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-[6px] md:text-[7px] font-pixel text-slate-600 uppercase">Rate</div>
                       <div className="text-[8px] md:text-[9px] font-pixel text-white">1 CR = ₵1.00</div>
                    </div>
                 </div>
                 <div className="relative p-4 border border-dashed border-primary/30 flex items-center gap-3 md:gap-4">
                   <span className="material-symbols-outlined text-primary text-lg md:text-xl">info</span>
                   <span className="text-[7px] md:text-[8px] font-pixel text-slate-500 uppercase">Your credits stay on your card forever. No rush.</span>
                 </div>
              </div>
            </div>
          </CyberBorder>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
