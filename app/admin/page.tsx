/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import AdminPanel from '@/components/AdminPanel';

const DEFAULT_DATA = {
  hero: {
    title1: 'CYPHER',
    title2: 'ZONE',
    tagline: "Ghana's premier reality-bending neural simulation arena.",
  },
  pricing: {
    card: {
      name: 'ARCADE_CARD',
      price: '50',
      description: 'Lifetime member card. Mandatory for all players.',
    },
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
  },
  systemStatus: 'INTEGRITY: OPTIMAL\nNEURAL_LINK: ACTIVE\nLOCATION: SECTOR_7G',
};

const AdminRoute = () => {
  const [siteData, setSiteData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const saved = localStorage.getItem('cypherzone_config');
    if (saved) {
      try {
        setSiteData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved config', e);
      }
    }
  }, []);

  const updateSiteData = (newData: typeof DEFAULT_DATA) => {
    setSiteData(newData);
    localStorage.setItem('cypherzone_config', JSON.stringify(newData));
  };

  return (
    <AdminPanel
      siteData={siteData}
      onUpdate={updateSiteData}
      onClose={() => {
        window.location.href = '/';
      }}
    />
  );
};

export default AdminRoute;
