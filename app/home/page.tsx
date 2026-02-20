/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import WorkingDays from "@/components/WorkingDays";
import NewsSection from "@/components/NewsSection";
import AboutPage from "@/components/AboutPage";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import PricingSection from "@/components/PricingSection";
import ContactPage from "@/components/ContactPage";
import GalleryPage from "@/components/GalleryPage";
import RestaurantPage from "@/components/RestaurantPage";
import GamesPage from "@/components/GamesPage";
import NewsPage from "@/components/NewsPage";
import ArcadeGallery from "@/components/ArcadeGallery";
import AdminPanel from "@/components/AdminPanel";

interface PageProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  handleAdminAuth?: () => void;
}

const DEFAULT_DATA = {
  hero: {
    title1: "CYPHER",
    title2: "ZONE",
    tagline: "Ghana's premier reality-bending neural simulation arena.",
  },
  pricing: {
    card: {
      name: "ARCADE_CARD",
      price: "50",
      description: "Lifetime member card. Mandatory for all players.",
    },
    topups: [
      { name: "STARTER_PACK", credits: 50, price: "50", bonus: "0" },
      {
        name: "POPULAR_PACK",
        credits: 120,
        price: "120",
        bonus: "20",
        recommended: true,
      },
      { name: "PRO_PACK", credits: 300, price: "250", bonus: "50" },
    ],
    gameRates: [
      { title: "SPEED_RIDER", cost: "40" },
      { title: "GUN_FIGHT_HERO", cost: "40" },
      { title: "RACE_SIMULATOR", cost: "40" },
      { title: "VR_360", cost: "55" },
      { title: "TAKE_OFF_NOW", cost: "55" },
      { title: "BATTLE_CAGE", cost: "45" },
      { title: "FLYING_RIDE", cost: "55" },
      { title: "4X4_ADVENTURES", cost: "45" },
      { title: "CINEMA_7D", cost: "90" },
    ],
  },
  systemStatus: "INTEGRITY: OPTIMAL\nNEURAL_LINK: ACTIVE\nLOCATION: SECTOR_7G",
};

const Page: React.FC<PageProps> = ({
  activeTab = "HOME",
  setActiveTab,
  handleAdminAuth,
}) => {
  const [siteData, setSiteData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const saved = localStorage.getItem("cypherzone_config");
    if (saved) {
      try {
        setSiteData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved config", e);
      }
    }
  }, []);

  const updateSiteData = (newData: typeof DEFAULT_DATA) => {
    setSiteData(newData);
    localStorage.setItem("cypherzone_config", JSON.stringify(newData));
  };

  const handleStart = () => {
    if (setActiveTab) {
      setActiveTab("GAMES");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {activeTab === "ADMIN" ? (
        <AdminPanel
          siteData={siteData}
          onUpdate={updateSiteData}
          onClose={() => setActiveTab && setActiveTab("HOME")}
        />
      ) : activeTab === "ABOUT" ? (
        <AboutPage />
      ) : activeTab === "GAMES" ? (
        <GamesPage />
      ) : activeTab === "NEWS" ? (
        <NewsPage />
      ) : activeTab === "EXPERIENCES" ? (
        <div className="pt-20">
          <ExperienceShowcase />
        </div>
      ) : activeTab === "PRICING" ? (
        <div className="pt-20">
          <PricingSection pricingData={siteData.pricing} />
        </div>
      ) : activeTab === "RESTAURANT" ? (
        <RestaurantPage />
      ) : activeTab === "GALLERY" ? (
        <div className="pt-20">
          <GalleryPage />
        </div>
      ) : activeTab === "CONTACT" ? (
        <ContactPage />
      ) : (
        <>
          <Hero
            onStart={handleStart}
            customConfig={siteData.hero}
            customStatus={siteData.systemStatus}
          />

          <ArcadeGallery />

          <NewsSection />
          <ExperienceShowcase />

          {/* Restaurant teaser */}
          <section className="relative  mb-18 max-w-7xl mx-auto px-4 md:px-6">
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/60">
              <Image
                src="/media/food/burgers.jpg"
                alt="Neon Bites Restaurant"
                fill
                className="object-cover opacity-40"
                sizes="(min-width:1024px) 1100px, 100vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 text-secondary font-pixel text-[9px] tracking-[0.3em] uppercase">
                    Neon_Bites
                  </span>
                  <h3 className="text-2xl md:text-3xl font-pixel text-white leading-tight">
                    Refuel with burgers, pizza, shawarma, shakes & shisha.
                  </h3>
                  <p className="text-slate-300 font-body text-sm md:text-base max-w-2xl">
                    Freshly made inside Cypherzone HQ. Over a dozen categories
                    from starters to desserts.
                  </p>
                </div>
                <Link
                  href="/restaurant"
                  className="self-start md:self-end px-6 py-3 bg-primary text-black font-pixel text-[10px] tracking-[0.2em] uppercase hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  View Menu →
                </Link>
              </div>
            </div>
          </section>

          <PricingSection
            pricingData={siteData.pricing}
            isHome
            onNavigate={setActiveTab}
          />
          <WorkingDays />
        </>
      )}
    </div>
  );
};

export default Page;
