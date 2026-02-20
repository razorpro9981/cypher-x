/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import PricingSection from '@/components/PricingSection';
import { useEffect, useState } from 'react';

const DEFAULT_PRICING = {
  card: { name: 'ARCADE_CARD', price: '50', description: 'Lifetime member card. Mandatory for all players.' },
  topups: [
    { name: 'STARTER_PACK', credits: 50, price: '50', bonus: '0' },
    { name: 'POPULAR_PACK', credits: 120, price: '120', bonus: '20', recommended: true },
    { name: 'PRO_PACK', credits: 300, price: '250', bonus: '50' },
  ],
  gameRates: [
    { title: 'SPEED_RIDER', cost: '40' },
    { title: 'GUN_FIGHT_HERO', cost: '40' },
    { title: 'RACE_SIMULATOR', cost: '40' },
    { title: 'VR_360', cost: '55' },
    { title: 'TAKE_OFF_NOW', cost: '55' },
    { title: 'BATTLE_CAGE', cost: '45' },
    { title: 'FLYING_RIDE', cost: '55' },
    { title: '4X4_ADVENTURES', cost: '45' },
    { title: 'CINEMA_7D', cost: '90' },
  ],
};

const PricingRoute = () => {
  const [pricing, setPricing] = useState(DEFAULT_PRICING);

  useEffect(() => {
    const saved = localStorage.getItem('cypherzone_config');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed?.pricing) setPricing(parsed.pricing);
    } catch (e) {
      console.error('Failed to parse saved pricing', e);
    }
  }, []);

  return (
    <div className="pt-20">
      <PricingSection pricingData={pricing} />
    </div>
  );
};

export default PricingRoute;
