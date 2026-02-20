/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import PricingSection from "@/components/PricingSection";
import { useEffect, useState } from "react";
import { PricingData, STORAGE_KEY, defaultSiteData, mergeSiteData } from "@/lib/siteData";

const PricingRoute = () => {
  const [pricing, setPricing] = useState<PricingData>(defaultSiteData.pricing);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = mergeSiteData(JSON.parse(saved));
      setPricing(parsed.pricing);
    } catch (e) {
      console.error("Failed to parse saved pricing", e);
    }
  }, []);

  return (
    <div className="pt-20">
      <PricingSection pricingData={pricing} />
    </div>
  );
};

export default PricingRoute;
