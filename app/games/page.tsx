"use client";

import React, { useState } from "react";
import CyberBorder from "@/components/CyberBorder";
import ShuffleText from "@/components/ShuffleText";
import GlitchText from "@/components/GlitchText";
import Image from "next/image";

interface Game {
  id: string;
  title: string;
  category: "ACTION" | "HORROR" | "RHYTHM" | "SIM";
  players: string;
  intensity: "LOW" | "MED" | "HIGH" | "MAX";
  image: string;
  description: string;
  syncLevel: string;
  price: string;
}

const gamesData: Game[] = [
  {
    id: "g1",
    title: "VR_360",
    category: "SIM",
    players: "1-4",
    intensity: "HIGH",
    image: "/media/games/1.png",
    description:
      "Full 360-degree immersive VR experience. Rotate, spin, and dive into virtual worlds.",
    syncLevel: "98%",
    price: "55",
  },
  {
    id: "g2",
    title: "FLYING_RIDE",
    category: "SIM",
    players: "1-2",
    intensity: "HIGH",
    image: "/media/games/2.png",
    description:
      "Soar through breathtaking aerial landscapes in a fully enclosed flight simulator.",
    syncLevel: "99%",
    price: "55",
  },
  {
    id: "g3",
    title: "SPEED_RIDER",
    category: "ACTION",
    players: "1",
    intensity: "MAX",
    image: "/media/games/3.png",
    description:
      "High-speed motorcycle racing through neon-lit cyberpunk cityscapes. Feel every turn.",
    syncLevel: "97%",
    price: "40",
  },
  {
    id: "g4",
    title: "TAKE_OFF_NOW",
    category: "SIM",
    players: "1-4",
    intensity: "MED",
    image: "/media/games/4.png",
    description:
      "Free-roam VR adventure with full-body tracking. Walk, run, and explore virtual dimensions.",
    syncLevel: "94%",
    price: "55",
  },
  {
    id: "g5",
    title: "FLYING_CAR",
    category: "ACTION",
    players: "1-4",
    intensity: "HIGH",
    image: "/media/games/5.png",
    description:
      "Multi-seat flying vehicle simulator. Navigate aerial combat zones with your squad.",
    syncLevel: "95%",
    price: "45",
  },
  {
    id: "g6",
    title: "7D_CINEMA",
    category: "SIM",
    players: "2-8",
    intensity: "MED",
    image: "/media/games/6.png",
    description:
      "Next-gen cinematic experience with motion seats, wind, and sensory effects.",
    syncLevel: "100%",
    price: "90",
  },
  {
    id: "g7",
    title: "SPEED_RACER",
    category: "ACTION",
    players: "1",
    intensity: "MAX",
    image: "/media/games/7.png",
    description:
      "Professional racing simulator with full cockpit controls. G-force feedback enabled.",
    syncLevel: "96%",
    price: "40",
  },
  {
    id: "g8",
    title: "GUN_FIGHT_HERO",
    category: "ACTION",
    players: "1-2",
    intensity: "HIGH",
    image: "/media/games/8.png",
    description:
      "Arcade-style shooting experience. Test your aim and reflexes in intense combat scenarios.",
    syncLevel: "92%",
    price: "40",
  },
  {
    id: "g9",
    title: "PLAYSTATION_ZONE",
    category: "SIM",
    players: "1-4",
    intensity: "LOW",
    image: "/media/games/9.png",
    description:
      "Premium gaming lounge with latest PlayStation consoles and racing sim setups.",
    syncLevel: "100%",
    price: "40",
  },
];

const GamesPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredGames =
    filter === "ALL"
      ? gamesData
      : gamesData.filter((g) => g.category === filter);

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-background-dark overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-[800px] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,255,0.05)_0%,transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 md:w-12 bg-primary"></div>
              <span className="text-primary font-pixel text-[8px] md:text-[10px] tracking-widest uppercase">
                Simulation_Library_V4
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-pixel text-white leading-none">
              <GlitchText text="GAME" color="white" persistent />
              <br />
              <span className="text-secondary neon-glow-magenta">
                <ShuffleText text="DATABASE" delay={400} />
              </span>
            </h1>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "ACTION", "HORROR", "RHYTHM", "SIM"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 md:px-4 py-2 font-pixel text-[7px] md:text-[8px] tracking-[0.2em] border transition-all ${
                  filter === cat
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                    : "border-white/10 text-slate-500 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tactical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, idx) => (
            <div
              key={game.id}
              className="group relative h-full animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CyberBorder className="bg-black/40 border-white/5 h-full transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                <div className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.title}
                      width={1920}
                      height={1080}
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                    {/* Corner Tag */}
                    <div className="absolute top-0 right-0 p-3">
                      <div className="bg-black/80 border border-white/10 px-2 py-1 text-[8px] font-pixel text-slate-500">
                        {game.id}
                      </div>
                    </div>

                    {/* Scanning Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-[scan_2s_linear_infinite] shadow-[0_0_15px_#00f3ff]"></div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[8px] font-pixel text-primary mb-1 tracking-widest uppercase">
                          {game.category}
                        </div>
                        <h3 className="text-lg font-display font-black text-white group-hover:text-primary transition-colors">
                          {game.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-pixel text-slate-600 mb-1">
                          PRICE
                        </div>
                        <div className="text-sm font-display font-black text-primary">
                          ₵{game.price}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 font-body leading-relaxed flex-grow">
                      {game.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[8px] font-pixel text-slate-600 mb-1">
                          INTENSITY
                        </div>
                        <div
                          className={`text-[10px] font-pixel ${
                            game.intensity === "MAX"
                              ? "text-secondary"
                              : game.intensity === "HIGH"
                                ? "text-orange-500"
                                : game.intensity === "MED"
                                  ? "text-primary"
                                  : "text-green-500"
                          }`}
                        >
                          {game.intensity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-pixel text-slate-600 mb-1">
                          RUNNERS
                        </div>
                        <div className="text-[10px] font-pixel text-white">
                          {game.players}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>

        {/* Footer Technical Stats */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "PRICING", value: "PER PERSON" },
            { label: "TOTAL_GAMES", value: "9" },
            { label: "PRICE_RANGE", value: "₵40-₵90" },
            { label: "LOCATION", value: "SECTOR_7G" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 border border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5"
            >
              <div className="text-[8px] font-pixel text-slate-600 mb-2 tracking-widest">
                {stat.label}
              </div>
              <div className="text-sm font-display font-bold text-primary tracking-tighter">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default GamesPage;
