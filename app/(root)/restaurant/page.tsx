/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CyberBorder from "@/components/CyberBorder";
import ShuffleText from "@/components/ShuffleText";
import GlitchText from "@/components/GlitchText";
import { MenuCategory, STORAGE_KEY, defaultSiteData, mergeSiteData } from "@/lib/siteData";

const RestaurantPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(defaultSiteData.menu);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = mergeSiteData(JSON.parse(saved));
      setMenuCategories(parsed.menu);
    } catch (e) {
      console.error("Failed to parse saved menu config", e);
    }
  }, []);
  const categoryImages: Record<string, string> = {
    STARTERS: "/media/food/chicken.jpg",
    BURGERS: "/media/food/burgers.jpg",
    PIZZA: "/media/food/pizza.jpg",
    MAIN_COURSE: "/media/food/main.jpg",
    SANDWICHES: "/media/food/sandwich.jpg",
    PASTA__NOODLES: "/media/food/noodles.jpg",
    SALAD: "/media/food/salad.jpg",
    SIDERS: "/media/food/siders.jpg",
    BREAKFAST: "/media/food/breakfast.jpg",
    CAKES__PASTRIES: "/media/food/pastries.jpg",
    HOT_DRINKS: "/media/food/hot_drinks.jpg",
    DRINKS: "/media/food/drinks.jpg",
    SHISHA: "/media/food/shisha.jpg",
  };

  const filteredCategories =
    activeCategory === "ALL"
      ? menuCategories
      : menuCategories.filter((cat) => cat.name === activeCategory);

  const categoryNames = ["ALL", ...menuCategories.map((c) => c.name)];

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-background-dark overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-grid-moving opacity-10 pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.05)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-8 md:w-12 bg-primary"></div>
              <span className="text-primary font-pixel text-[8px] md:text-[10px] tracking-widest uppercase">
                Gastro_Sync_System
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-pixel text-white leading-none tracking-tighter">
              <GlitchText text="NEON" color="white" persistent />
              <br />
              <span className="text-secondary neon-glow-magenta">
                <ShuffleText text="BITES" delay={400} />
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-pixel tracking-widest uppercase">
              All prices in GHC
            </p>
          </div>

          <div className="flex flex-wrap gap-2 max-w-lg">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 font-pixel text-[7px] tracking-[0.15em] border transition-all ${
                  activeCategory === cat
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                    : "border-white/10 text-slate-500 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat === "ALL" ? "FULL_MENU" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category, catIdx) => (
            <div
              key={category.name}
              className="animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${catIdx * 0.1}s` }}
            >
              <CyberBorder className="bg-black/40 border-white/5 overflow-hidden">
                {/* Category Image */}
                <div className="relative h-56 md:h-72 border-b border-white/10 overflow-hidden">
                  <Image
                    src={
                      categoryImages[category.name] ||
                      categoryImages[category.name.replace("&", "__")] ||
                      "/media/arcade/exterior-front.jpeg"
                    }
                    alt={category.name}
                    fill
                    className="object-cover scale-[1.05] saturate-150 contrast-115"
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    priority={catIdx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.15)_0%,transparent_55%)] pointer-events-none"></div>
                </div>

                {/* Category Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></div>
                    <h2 className="text-lg md:text-2xl font-display font-black text-white tracking-tight">
                      {category.name.replace(/_/g, " ")}
                    </h2>
                  </div>
                  <div className="text-[8px] font-pixel text-slate-600 tracking-widest">
                    {category.items.length}_ITEMS
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/5">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[8px] font-pixel text-slate-600 w-6">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-sm md:text-base font-body font-bold text-slate-200 group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        {item.note && (
                          <p className="text-[10px] text-slate-500 font-body ml-9 mt-1">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <div className="bg-white/5 border border-white/10 px-4 py-2 font-display font-black text-primary text-sm group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                        ₵{item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>

        {/* Tactical Footer Readout */}
        <div className="mt-20 p-8 border border-dashed border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 border border-primary p-1 rounded-full group">
              <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-full group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">
                  restaurant
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-pixel text-primary mb-1 uppercase tracking-widest">
                Kitchen_Status
              </div>
              <p className="text-xs text-slate-400 font-body max-w-sm">
                Fresh ingredients prepared daily at Cypherzone HQ. From starters
                to shisha, we fuel your gaming sessions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-[8px] font-pixel text-slate-600 mb-2">
                KITCHEN_HEAT
              </div>
              <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="px-4 py-2 bg-black border border-green-500/50 text-green-500 font-pixel text-[10px] animate-pulse">
              STATUS: SERVING
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default RestaurantPage;
