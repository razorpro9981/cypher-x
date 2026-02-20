
import React from 'react';
import Link from 'next/link';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';
import Image from 'next/image';

const experiences = [
  {
    title: "SPEED_RACER",
    genre: "RACING/SIM",
    difficulty: "HARD",
    players: "1",
    image: "/media/games/7.png",
    description: "Professional racing simulator with full cockpit controls. G-force feedback enabled."
  },
  {
    title: "VR_360",
    genre: "IMMERSIVE/SIM",
    difficulty: "EASY",
    players: "1-4",
    image: "/media/games/1.png",
    description: "Full 360-degree immersive VR experience. Rotate, spin, and dive into virtual worlds."
  },
  {
    title: "GUN_FIGHT_HERO",
    genre: "ARCADE/COMBAT",
    difficulty: "ELITE",
    players: "1-2",
    image: "/media/games/8.png",
    description: "Arcade-style shooting experience. Test your aim and reflexes in intense combat."
  }
];

interface ExperienceShowcaseProps {
  onNavigate?: (tab: string) => void;
}

const ExperienceShowcase: React.FC<ExperienceShowcaseProps> = () => {

  return (
    <section id="experiences" className="py-16 md:py-32 bg-background-dark relative border-t border-white/5 overflow-hidden">
      {/* Backdrop Arena Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/media/arcade/interior-starship.jpeg"
          alt="Cypherzone Interior" 
          className="w-full h-full object-cover grayscale opacity-[0.05] contrast-150"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark opacity-90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="h-px w-8 md:w-12 bg-primary"></div>
            <span className="text-primary font-pixel text-[8px] md:text-[10px] tracking-widest uppercase font-bold">CHOOSE_YOUR_REALITY</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-pixel text-white text-center md:text-left leading-tight">
              <ShuffleText text="GAMES" delay={200} />
            </h2>
            <Link
              href="/games"
              className="self-center md:self-end text-primary font-display text-xs tracking-[0.25em] uppercase border-b border-primary/40 pb-1 hover:text-secondary transition-colors"
            >
              View All Games_
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, i) => (
            <div key={exp.title} className="group cursor-crosshair">
              <CyberBorder className="bg-slate-900/50 overflow-hidden backdrop-blur-sm">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={exp.image} 
                    alt={exp.title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[9px] font-pixel text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 w-fit font-bold">
                        {exp.genre}
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tighter">
                        {exp.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 border-t border-white/5">
                  <p className="text-sm text-slate-400 font-body leading-relaxed h-12 overflow-hidden font-medium">
                    {exp.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-[10px] font-pixel">
                    <div className="space-y-1">
                      <div className="text-slate-500 uppercase font-bold">Difficulty</div>
                      <div className={`font-black ${exp.difficulty === 'ELITE' ? 'text-secondary' : 'text-primary'}`}>
                        {exp.difficulty}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-slate-500 uppercase font-bold">Sync_Limit</div>
                      <div className="text-white font-black">{exp.players} PLAYERS</div>
                    </div>
                  </div>

                 
                </div>
              </CyberBorder>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
