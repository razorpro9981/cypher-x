
import React, { useState, useEffect } from 'react';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';

interface AdminPanelProps {
  siteData: any;
  onUpdate: (newData: any) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ siteData, onUpdate, onClose }) => {
  const [localData, setLocalData] = useState(siteData);
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'PRICING' | 'SYSTEM'>('GENERAL');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(localData);
      setIsSaving(false);
      alert("SYSTEM UPDATE DEPLOYED SUCCESSFULLY.");
    }, 1500);
  };

  const updateNested = (category: string, key: string, value: any) => {
    setLocalData({
      ...localData,
      [category]: {
        ...localData[category],
        [key]: value
      }
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

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></span>
              <span className="text-red-500 font-pixel text-[10px] tracking-widest uppercase">Admin_Override_Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-pixel text-white">
              <GlitchText text="COMMAND" color="white" persistent /> <span className="text-primary"><ShuffleText text="CENTER" delay={400} /></span>
            </h1>
          </div>
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-white/20 text-white font-pixel text-[10px] hover:bg-white/10 transition-all"
          >
            EXIT_TERMINAL
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          {(['GENERAL', 'PRICING', 'SYSTEM'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-pixel text-[8px] tracking-widest border transition-all ${
                activeTab === tab ? 'bg-primary text-black border-primary' : 'text-slate-500 border-white/10'
              }`}
            >
              {tab}_MODULE
            </button>
          ))}
        </div>

        <CyberBorder className="bg-slate-900/60 p-8 md:p-12 backdrop-blur-xl mb-10 overflow-y-auto max-h-[70vh]">
          {activeTab === 'GENERAL' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-pixel text-slate-500 uppercase">Hero_Title_Primary</label>
                  <input 
                    type="text" 
                    value={localData.hero.title1}
                    onChange={(e) => updateNested('hero', 'title1', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 font-pixel text-xs text-primary focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-pixel text-slate-500 uppercase">Hero_Title_Secondary</label>
                  <input 
                    type="text" 
                    value={localData.hero.title2}
                    onChange={(e) => updateNested('hero', 'title2', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 font-pixel text-xs text-secondary focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-pixel text-slate-500 uppercase">Tagline_Encryption</label>
                <textarea 
                  value={localData.hero.tagline}
                  onChange={(e) => updateNested('hero', 'tagline', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 p-4 font-body text-slate-300 focus:border-primary focus:outline-none h-24"
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
                    <label className="text-[8px] font-pixel text-slate-600">CARD_LABEL</label>
                    <input type="text" value={localData.pricing.card.name} onChange={(e) => updateCard('name', e.target.value)} className="w-full bg-black border border-white/10 p-3 font-pixel text-[10px] text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-pixel text-slate-600">CARD_PRICE_GHC</label>
                    <input type="text" value={localData.pricing.card.price} onChange={(e) => updateCard('price', e.target.value)} className="w-full bg-black border border-white/10 p-3 font-display text-xl text-primary" />
                  </div>
                </div>
              </div>

              {/* Topups Section */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-pixel text-secondary uppercase">02_TOPUP_MODULES</h4>
                {localData.pricing.topups.map((pack: any, idx: number) => (
                  <div key={idx} className="p-4 border border-white/5 bg-black/20 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" value={pack.name} onChange={(e) => updateTopup(idx, 'name', e.target.value)} className="bg-black border border-white/10 p-2 font-pixel text-[8px] text-white" placeholder="NAME" />
                    <input type="number" value={pack.credits} onChange={(e) => updateTopup(idx, 'credits', parseInt(e.target.value))} className="bg-black border border-white/10 p-2 font-display text-sm text-primary" placeholder="CREDITS" />
                    <input type="text" value={pack.price} onChange={(e) => updateTopup(idx, 'price', e.target.value)} className="bg-black border border-white/10 p-2 font-display text-sm text-secondary" placeholder="PRICE" />
                    <input type="text" value={pack.bonus} onChange={(e) => updateTopup(idx, 'bonus', e.target.value)} className="bg-black border border-white/10 p-2 font-pixel text-[8px] text-green-500" placeholder="BONUS" />
                  </div>
                ))}
              </div>

              {/* Game Rates Section */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-pixel text-white uppercase">03_GAME_SESSION_RATES</h4>
                <div className="space-y-2">
                  {localData.pricing.gameRates.map((rate: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <input type="text" value={rate.title} onChange={(e) => updateGameRate(idx, 'title', e.target.value)} className="flex-1 bg-black border border-white/10 p-2 font-pixel text-[8px] text-slate-400" />
                      <input type="text" value={rate.cost} onChange={(e) => updateGameRate(idx, 'cost', e.target.value)} className="w-24 bg-black border border-white/10 p-2 font-display text-sm text-white" />
                    </div>
                  ))}
                </div>
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

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-6 bg-primary text-black font-pixel text-sm font-black tracking-widest hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all relative overflow-hidden"
        >
          {isSaving ? (
            <ShuffleText text="DEPLOYING_CHANGES..." />
          ) : (
            "COMMIT_SYSTEM_UPDATE"
          )}
          {isSaving && (
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
          )}
        </button>
      </div>
    </main>
  );
};

export default AdminPanel;
