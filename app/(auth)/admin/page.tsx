/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPanel from "@/components/AdminPanel";
import { SiteData, STORAGE_KEY, defaultSiteData, mergeSiteData } from "@/lib/siteData";

const AdminRoute = () => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("cypher_admin_unlocked") === "true") {
      setAuthed(true);
    }

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

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "cypherzone";
    if (pass === expected) {
      localStorage.setItem("cypher_admin_unlocked", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Access denied");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-black/40 border border-white/10 rounded-lg p-6 space-y-4 shadow-lg">
          <div className="space-y-2">
            <p className="text-[10px] font-pixel text-primary tracking-[0.2em] uppercase">Admin Access</p>
            <h1 className="text-xl font-display font-black">Enter Passcode</h1>
          </div>
          <form className="space-y-3" onSubmit={handleAuth}>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="Passcode"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-primary text-black font-pixel text-[10px] tracking-[0.2em] rounded hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-shadow"
            >
              UNLOCK
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminPanel
      siteData={siteData}
      onUpdate={updateSiteData}
      onClose={() => {
        localStorage.removeItem("cypher_admin_unlocked");
        window.location.href = '/';
      }}
    />
  );
};

export default AdminRoute;
