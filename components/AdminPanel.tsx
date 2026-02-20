/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';
import { Game, MenuCategory, MenuItem, NewsItem, SiteData } from '@/lib/siteData';

interface AdminPanelProps {
  siteData: SiteData;
  onUpdate: (newData: SiteData) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ siteData, onUpdate, onClose }) => {
  const [localData, setLocalData] = useState<SiteData>(siteData);
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'PRICING' | 'GAMES' | 'NEWS' | 'MENU' | 'SYSTEM'>('GENERAL');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalData(siteData);
  }, [siteData]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(localData);
      setIsSaving(false);
      alert("SYSTEM UPDATE DEPLOYED SUCCESSFULLY.");
    }, 1500);
  };

  const updateHero = (key: keyof SiteData['hero'], value: string) => {
    setLocalData({
      ...localData,
      hero: { ...localData.hero, [key]: value },
    });
  };

  const updateCard = (key: string, value: any) => {
    setLocalData({
      ...localData,
      pricing: {
        ...localData.pricing,
        card: { ...localData.pricing.card, [key]: value }
      }
    });
  };

  const updateTopup = (index: number, key: string, value: any) => {
    const newTopups = [...localData.pricing.topups];
    newTopups[index] = { ...newTopups[index], [key]: value };
    setLocalData({
      ...localData,
      pricing: { ...localData.pricing, topups: newTopups }
    });
  };

  const updateGameRate = (index: number, key: string, value: any) => {
    const newRates = [...localData.pricing.gameRates];
    newRates[index] = { ...newRates[index], [key]: value };
    setLocalData({
      ...localData,
      pricing: { ...localData.pricing, gameRates: newRates }
    });
  };

  const updateGame = (index: number, key: keyof Game, value: any) => {
    const nextGames = [...localData.games];
    nextGames[index] = { ...nextGames[index], [key]: value };
    setLocalData({ ...localData, games: nextGames });
  };

  const addGame = () => {
    const newGame: Game = {
      id: `g${Date.now()}`,
      title: 'NEW_EXPERIENCE',
      category: 'ACTION',
      players: '1',
      intensity: 'MED',
      image: '/media/games/1.png',
      description: 'Describe the new experience.',
      syncLevel: '100%',
      price: '50',
    };
    setLocalData({ ...localData, games: [...localData.games, newGame] });
  };

  const removeGame = (index: number) => {
    const nextGames = localData.games.filter((_, i) => i !== index);
    setLocalData({ ...localData, games: nextGames });
  };

  const updateNews = (index: number, key: keyof NewsItem, value: any) => {
    const nextNews = [...localData.news];
    nextNews[index] = { ...nextNews[index], [key]: value };
    setLocalData({ ...localData, news: nextNews });
  };

  const addNews = () => {
    const today = new Date().toISOString().slice(0, 10).replaceAll('-', '.');
    const newNews: NewsItem = {
      id: `n${Date.now()}`,
      date: today,
      category: 'EVENT',
      title: 'NEW_BRIEFING',
      excerpt: 'Summary of the new intel.',
      content: 'Full content for the new intel.',
      image: '/media/arcade/exterior-front.jpeg',
      clearance: 'LEVEL_1',
    };
    setLocalData({ ...localData, news: [newNews, ...localData.news] });
  };

  const removeNews = (index: number) => {
    const nextNews = localData.news.filter((_, i) => i !== index);
    setLocalData({ ...localData, news: nextNews });
  };

  const updateMenuCategory = (index: number, value: Partial<MenuCategory>) => {
    const nextMenu = [...localData.menu];
    nextMenu[index] = { ...nextMenu[index], ...value };
    setLocalData({ ...localData, menu: nextMenu });
  };

  const updateMenuItem = (catIndex: number, itemIndex: number, key: keyof MenuItem, value: any) => {
    const nextMenu = [...localData.menu];
    const items = [...nextMenu[catIndex].items];
    items[itemIndex] = { ...items[itemIndex], [key]: value };
    nextMenu[catIndex] = { ...nextMenu[catIndex], items };
    setLocalData({ ...localData, menu: nextMenu });
  };

  const addMenuItem = (catIndex: number) => {
    const nextMenu = [...localData.menu];
    const items = [...nextMenu[catIndex].items, { name: 'New Item', price: '0' }];
    nextMenu[catIndex] = { ...nextMenu[catIndex], items };
    setLocalData({ ...localData, menu: nextMenu });
  };

  const addMenuCategory = () => {
    setLocalData({
      ...localData,
      menu: [...localData.menu, { name: 'NEW_CATEGORY', items: [] }],
    });
  };

  const removeMenuItem = (catIndex: number, itemIndex: number) => {
    const nextMenu = [...localData.menu];
    const items = nextMenu[catIndex].items.filter((_, idx) => idx !== itemIndex);
    nextMenu[catIndex] = { ...nextMenu[catIndex], items };
    setLocalData({ ...localData, menu: nextMenu });
  };

  return (
    <main className="pt-16 pb-12 min-h-screen bg-[#0b0f14]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span className="text-emerald-100 font-pixel text-[10px] tracking-widest uppercase">Admin Panel</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-pixel text-white">
              <GlitchText text="Control" color="white" persistent />{" "}
              <span className="text-primary"><ShuffleText text="Center" delay={200} /></span>
            </h1>
            <p className="text-sm text-slate-400 font-body max-w-2xl">
              Edit site content with minimal distractions. Changes save locally; click Save when done.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="px-5 py-2 border border-white/15 text-white font-pixel text-[10px] hover:bg-white/5 transition-colors rounded"
          >
            EXIT
          </button>
        </div>

        <div className="flex gap-2 md:gap-3 flex-wrap">
          {(['GENERAL', 'PRICING', 'GAMES', 'NEWS', 'MENU', 'SYSTEM'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-4 py-2 font-pixel text-[8px] tracking-widest rounded border transition-colors ${
                activeTab === tab ? 'bg-primary text-black border-primary' : 'text-slate-300 border-white/10 hover:border-white/25'
              }`}
            >
              {tab}_MODULE
            </button>
          ))}
        </div>

        <CyberBorder className="bg-slate-900/80 p-6 md:p-8 overflow-y-auto max-h-[72vh] border-white/10 rounded-lg shadow-lg shadow-black/30">
          {activeTab === 'GENERAL' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-pixel text-slate-400 uppercase">Hero_Title_Primary</label>
                  <input 
                    type="text" 
                    value={localData.hero.title1}
                    onChange={(e) => updateHero('title1', e.target.value)}
                    className="w-full bg-black/40 border border-white/12 p-3 font-pixel text-xs text-primary focus:border-primary focus:outline-none rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-pixel text-slate-400 uppercase">Hero_Title_Secondary</label>
                  <input 
                    type="text" 
                    value={localData.hero.title2}
                    onChange={(e) => updateHero('title2', e.target.value)}
                    className="w-full bg-black/40 border border-white/12 p-3 font-pixel text-xs text-secondary focus:border-secondary focus:outline-none rounded"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-pixel text-slate-400 uppercase">Tagline_Encryption</label>
                <textarea 
                  value={localData.hero.tagline}
                  onChange={(e) => updateHero('tagline', e.target.value)}
                  className="w-full bg-black/40 border border-white/12 p-3 font-body text-slate-200 focus:border-primary focus:outline-none h-24 rounded"
                />
              </div>
            </div>
          )}

          {activeTab === 'PRICING' && (
            <div className="space-y-12">
              {/* Card Section */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-pixel text-primary uppercase">01_NEXUS_CARD_CONFIG</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-pixel text-slate-500">CARD_LABEL</label>
                    <input type="text" value={localData.pricing.card.name} onChange={(e) => updateCard('name', e.target.value)} className="w-full bg-black/50 border border-white/12 p-3 font-pixel text-[10px] text-white rounded" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-pixel text-slate-500">CARD_PRICE_GHC</label>
                    <input type="text" value={localData.pricing.card.price} onChange={(e) => updateCard('price', e.target.value)} className="w-full bg-black/50 border border-white/12 p-3 font-display text-xl text-primary rounded" />
                  </div>
                </div>
              </div>

              {/* Topups Section */}
              {/* <div className="space-y-6">
                <h4 className="text-[10px] font-pixel text-secondary uppercase">02_TOPUP_MODULES</h4>
                {localData.pricing.topups.map((pack: any, idx: number) => (
                  <div key={idx} className="p-4 border border-white/8 bg-black/25 grid grid-cols-1 md:grid-cols-4 gap-4 rounded">
                    <input type="text" value={pack.name} onChange={(e) => updateTopup(idx, 'name', e.target.value)} className="bg-black/40 border border-white/12 p-2 font-pixel text-[9px] text-white rounded" placeholder="NAME" />
                    <input type="number" value={pack.credits} onChange={(e) => updateTopup(idx, 'credits', parseInt(e.target.value))} className="bg-black/40 border border-white/12 p-2 font-display text-sm text-primary rounded" placeholder="CREDITS" />
                    <input type="text" value={pack.price} onChange={(e) => updateTopup(idx, 'price', e.target.value)} className="bg-black/40 border border-white/12 p-2 font-display text-sm text-secondary rounded" placeholder="PRICE" />
                    <input type="text" value={pack.bonus} onChange={(e) => updateTopup(idx, 'bonus', e.target.value)} className="bg-black/40 border border-white/12 p-2 font-pixel text-[9px] text-green-400 rounded" placeholder="BONUS" />
                  </div>
                ))}
              </div> */}

              {/* Game Rates Section */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-pixel text-white uppercase">03_GAME_SESSION_RATES</h4>
                <div className="space-y-3">
                  {localData.pricing.gameRates.map((rate: any, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <input type="text" value={rate.title} onChange={(e) => updateGameRate(idx, 'title', e.target.value)} className="flex-1 bg-black/40 border border-white/12 p-2 font-pixel text-[9px] text-slate-300 rounded" />
                      <input type="text" value={rate.cost} onChange={(e) => updateGameRate(idx, 'cost', e.target.value)} className="w-24 bg-black/40 border border-white/12 p-2 font-display text-sm text-white rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'GAMES' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-pixel text-primary uppercase">Interactive_Simulations</h4>
                <button onClick={addGame} className="px-3 py-2 bg-primary text-black font-pixel text-[9px] tracking-widest">ADD_GAME</button>
              </div>
              <div className="space-y-4">
                {localData.games.map((game, idx) => (
                  <div key={game.id} className="border border-white/10 bg-black/30 p-4 space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <input value={game.id} onChange={(e) => updateGame(idx, 'id', e.target.value)} className="flex-1 min-w-[120px] bg-black/40 border border-white/12 p-2 font-pixel text-[9px] text-slate-400 rounded" />
                      <input value={game.title} onChange={(e) => updateGame(idx, 'title', e.target.value)} className="flex-1 min-w-[160px] bg-black/40 border border-white/12 p-2 font-display text-sm text-white rounded" placeholder="Title" />
                      <select value={game.category} onChange={(e) => updateGame(idx, 'category', e.target.value as Game['category'])} className="bg-black/40 border border-white/12 p-2 text-[10px] font-pixel text-primary rounded">
                        {['ACTION', 'HORROR', 'RHYTHM', 'SIM'].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input value={game.players} onChange={(e) => updateGame(idx, 'players', e.target.value)} className="w-24 bg-black/40 border border-white/12 p-2 text-[10px] font-pixel text-slate-200 rounded" placeholder="Players" />
                      <select value={game.intensity} onChange={(e) => updateGame(idx, 'intensity', e.target.value as Game['intensity'])} className="bg-black/40 border border-white/12 p-2 text-[10px] font-pixel text-secondary rounded">
                        {['LOW', 'MED', 'HIGH', 'MAX'].map((level) => <option key={level} value={level}>{level}</option>)}
                      </select>
                      <input value={game.price} onChange={(e) => updateGame(idx, 'price', e.target.value)} className="w-24 bg-black/40 border border-white/12 p-2 font-display text-sm text-primary rounded" placeholder="₵" />
                      <button onClick={() => removeGame(idx)} className="px-3 py-1 border border-red-500/40 text-red-400 font-pixel text-[9px] hover:bg-red-500/10 rounded">REMOVE</button>
                    </div>
                    <input value={game.image} onChange={(e) => updateGame(idx, 'image', e.target.value)} className="w-full bg-black/40 border border-white/12 p-2 font-pixel text-[10px] text-slate-400 rounded" placeholder="/media/games/1.png" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input value={game.syncLevel} onChange={(e) => updateGame(idx, 'syncLevel', e.target.value)} className="bg-black/40 border border-white/12 p-2 font-pixel text-[10px] text-green-400 rounded" placeholder="98%" />
                      <textarea value={game.description} onChange={(e) => updateGame(idx, 'description', e.target.value)} className="bg-black/40 border border-white/12 p-2 font-body text-sm text-slate-300 rounded" rows={2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'NEWS' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-pixel text-secondary uppercase">Signal_Feed</h4>
                <button onClick={addNews} className="px-3 py-2 bg-secondary text-black font-pixel text-[9px] tracking-widest">ADD_BRIEF</button>
              </div>
              <div className="space-y-4">
                {localData.news.map((log, idx) => (
                  <div key={log.id} className="border border-white/10 bg-black/30 p-4 space-y-3 rounded">
                    <div className="flex flex-wrap gap-3">
                      <input value={log.id} onChange={(e) => updateNews(idx, 'id', e.target.value)} className="w-24 bg-black/40 border border-white/12 p-2 font-pixel text-[9px] text-slate-400 rounded" />
                      <input value={log.date} onChange={(e) => updateNews(idx, 'date', e.target.value)} className="w-28 bg-black/40 border border-white/12 p-2 font-pixel text-[9px] text-slate-200 rounded" placeholder="YYYY.MM.DD" />
                      <select value={log.category} onChange={(e) => updateNews(idx, 'category', e.target.value as NewsItem['category'])} className="bg-black/40 border border-white/12 p-2 text-[10px] font-pixel text-primary rounded">
                        {['SYSTEM_UPDATE', 'EVENT', 'INTEL', 'CLASSIFIED'].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={log.clearance} onChange={(e) => updateNews(idx, 'clearance', e.target.value as NewsItem['clearance'])} className="bg-black/40 border border-white/12 p-2 text-[10px] font-pixel text-secondary rounded">
                        {['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'OVERRIDE'].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <button onClick={() => removeNews(idx)} className="px-3 py-1 border border-red-500/40 text-red-400 font-pixel text-[9px] hover:bg-red-500/10 rounded">REMOVE</button>
                    </div>
                    <input value={log.title} onChange={(e) => updateNews(idx, 'title', e.target.value)} className="w-full bg-black/40 border border-white/12 p-2 font-display text-sm text-white rounded" placeholder="Headline" />
                    <input value={log.image} onChange={(e) => updateNews(idx, 'image', e.target.value)} className="w-full bg-black/40 border border-white/12 p-2 font-pixel text-[10px] text-slate-400 rounded" placeholder="/media/..." />
                    <textarea value={log.excerpt} onChange={(e) => updateNews(idx, 'excerpt', e.target.value)} className="w-full bg-black/40 border border-white/12 p-2 font-body text-sm text-slate-200 rounded" rows={2} placeholder="Excerpt" />
                    <textarea value={log.content} onChange={(e) => updateNews(idx, 'content', e.target.value)} className="w-full bg-black/40 border border-white/12 p-2 font-body text-sm text-slate-200 rounded" rows={4} placeholder="Full content" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'MENU' && (
              <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-pixel text-white uppercase">Neon_Bites_Menu</h4>
                <button onClick={addMenuCategory} className="px-3 py-2 bg-white text-black font-pixel text-[9px] tracking-widest">ADD_CATEGORY</button>
              </div>
              <div className="space-y-5">
                {localData.menu.map((category, catIdx) => (
                  <div key={`${category.name}-${catIdx}`} className="border border-white/10 bg-black/30 p-4 space-y-3 rounded">
                    <div className="flex flex-wrap gap-3 items-center">
                      <input value={category.name} onChange={(e) => updateMenuCategory(catIdx, { name: e.target.value })} className="flex-1 min-w-[200px] bg-black/40 border border-white/12 p-2 font-display text-sm text-white rounded" />
                      <div className="text-[9px] font-pixel text-slate-500">{category.items.length} ITEMS</div>
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <div key={`${item.name}-${itemIdx}`} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          <input value={item.name} onChange={(e) => updateMenuItem(catIdx, itemIdx, 'name', e.target.value)} className="md:col-span-2 bg-black/40 border border-white/12 p-2 font-body text-sm text-slate-200 rounded" placeholder="Item name" />
                          <input value={item.price} onChange={(e) => updateMenuItem(catIdx, itemIdx, 'price', e.target.value)} className="bg-black/40 border border-white/12 p-2 font-display text-sm text-primary rounded" placeholder="Price" />
                          <input value={item.note || ''} onChange={(e) => updateMenuItem(catIdx, itemIdx, 'note', e.target.value)} className="md:col-span-2 bg-black/40 border border-white/12 p-2 font-body text-sm text-slate-300 rounded" placeholder="Note (optional)" />
                          <button onClick={() => removeMenuItem(catIdx, itemIdx)} className="md:col-span-1 px-3 py-1 border border-red-500/40 text-red-400 font-pixel text-[9px] hover:bg-red-500/10 rounded">X</button>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => addMenuItem(catIdx)} className="px-3 py-2 border border-primary text-primary font-pixel text-[9px] hover:bg-primary/10 rounded">ADD_ITEM</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'SYSTEM' && (
            <div className="space-y-8">
              <div className="p-6 border-2 border-dashed border-primary/20 bg-primary/5">
                <div className="text-primary font-pixel text-[10px] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">terminal</span>
                  MANUAL_TERMINAL_OVERRIDE
                </div>
                <textarea 
                  value={localData.systemStatus}
                  onChange={(e) => setLocalData({...localData, systemStatus: e.target.value})}
                  placeholder="Enter manual system status update..."
                  className="w-full bg-black p-4 font-body text-sm text-green-500 focus:outline-none h-32 border border-primary/30"
                />
              </div>
              <div className="flex items-center gap-4 text-slate-500 font-pixel text-[8px]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                AI_LLM_AUTO_UPDATE: ENABLED
              </div>
            </div>
          )}
        </CyberBorder>

        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-body">
            All changes stay in your browser until you save.
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-primary text-black font-pixel text-sm font-black tracking-widest rounded transition-colors disabled:opacity-70"
          >
            {isSaving ? 'SAVING...' : 'SAVE_CHANGES'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
