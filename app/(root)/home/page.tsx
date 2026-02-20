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
import { SiteData, STORAGE_KEY, defaultSiteData, mergeSiteData } from "@/lib/siteData";

interface PageProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  handleAdminAuth?: () => void;
}

const Page: React.FC<PageProps> = ({
  activeTab = "HOME",
  setActiveTab,
  handleAdminAuth,
}) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSiteData(mergeSiteData(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to load saved config", e);
      }
    }
  }, []);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
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
