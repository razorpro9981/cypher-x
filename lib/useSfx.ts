'use client';

import { useRef, useCallback } from 'react';

const createTone = (ctx: AudioContext, freq: number, duration = 0.08, volume = 0.06) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain).connect(ctx.destination);
  const now = ctx.currentTime;
  osc.start(now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.stop(now + duration);
};

export const useSfx = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensureCtx = () => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  };

  const play = useCallback((freq: number, duration?: number, volume?: number) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    createTone(ctx, freq, duration, volume);
  }, []);

  const playClick = useCallback(() => play(520, 0.1, 0.08), [play]);
  const playHover = useCallback(() => play(760, 0.05, 0.05), [play]);

  return { playClick, playHover };
};
