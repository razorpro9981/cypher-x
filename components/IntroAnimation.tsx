
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSfx } from '@/lib/useSfx';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: Boot Logs, 1: Neural Sync, 2: Logo Spotlight, 3: The Jump
  const [logs, setLogs] = useState<string[]>([]);
  const [syncProgress, setSyncProgress] = useState(0);
  const [rawMousePos, setRawMousePos] = useState({ x: 0, y: 0 });
  const { playClick, playHover } = useSfx();

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  const bootLogs = [
    "NEURAL_LINK_BOOT_V4.0...",
    "DETECTING_HMD_HARDWARE...",
    "CALIBRATING_OPTICS...",
    "SYNCING_HAPTIC_SUIT...",
    "ESTABLISHING_DATA_BRIDGE...",
    "SECURE_LINK_ESTABLISHED.",
    "READY_FOR_NEURAL_MAPPING."
  ];

  useEffect(() => {
    // Phase 0: System Boot Logs (Untouched per user request)
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev.slice(-5), bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setPhase(1), 800);
      }
    }, 120);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      // Create a master timeline for the sync and the jump
      const tl = gsap.timeline();

      // Cinematic Entry for HUD elements
      tl.fromTo(".hud-element", 
        { scale: 1.5, opacity: 0, rotationX: 45, filter: "blur(10px)" },
        { scale: 1, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.08, ease: "expo.out" }
      );

      // Automated Sync Progress
      tl.to(progressRef.current, {
        value: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => setSyncProgress(Math.floor(progressRef.current.value))
      });

      // Small pause at 100% to let the user see completion
      tl.to({}, { duration: 0.12 });

      // Phase 2: Logo-only spotlight
      tl.call(() => {
        setPhase(2);
        playClick();
      });

      // Let the logo breathe on screen
      tl.to({}, { duration: 1.8 });

      // Intensify glitch and shake leading up to the jump
      tl.to(".sync-visual", {
        x: () => gsap.utils.random(-15, 15),
        y: () => gsap.utils.random(-15, 15),
        duration: 0.05,
        repeat: 20,
        ease: "none",
      }, "-=0.5");

      // Trigger Phase 3 (The Jump)
      tl.call(() => {
        setPhase(3);
        playClick();
        
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 30,
            opacity: 0,
            filter: "blur(150px) brightness(4)",
            duration: 1.2,
            ease: "power4.in",
            onComplete: () => {
              // Final callback to parent to remove IntroAnimation from DOM
              onComplete();
            }
          });
        }
      });

      // Animation for HUD rings
      gsap.to(".hud-ring-1", { rotation: 360, duration: 12, repeat: -1, ease: "none" });
      gsap.to(".hud-ring-2", { rotation: -360, duration: 8, repeat: -1, ease: "none" });
    }
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase === 2 && logoRef.current) {
      // Logo enter + breathing during spotlight phase
      gsap.fromTo(logoRef.current, {
        scale: 0.6,
        opacity: 0,
        rotateX: -20,
        filter: "blur(12px) brightness(0.5)",
      }, {
        scale: 1.1,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px) brightness(1.2)",
        duration: 1.1,
        ease: "expo.out"
      });

      gsap.to(logoRef.current, {
        scale: 1.18,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        filter: "drop-shadow(0 0 38px rgba(0,243,255,0.5))",
      });
    }
  }, [phase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setRawMousePos({ x: e.clientX, y: e.clientY });
    playHover();
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] bg-background-dark flex items-center justify-center font-pixel overflow-hidden perspective-[1500px] cursor-none"
    >
      {/* Dynamic Laser Reticle */}
      <div 
        className="fixed pointer-events-none z-[500] mix-blend-screen"
        style={{ left: rawMousePos.x, top: rawMousePos.y, transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border border-secondary/20 rounded-full"></div>
            <div className="w-8 h-[1px] bg-primary shadow-[0_0_8px_#00f3ff]"></div>
            <div className="h-8 w-[1px] bg-primary absolute shadow-[0_0_8px_#00f3ff]"></div>
            <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 text-[7px] text-primary whitespace-nowrap tracking-[0.4em] font-black uppercase">
                {phase === 1 ? `LINKING_NODE: ${syncProgress}%` : ''}
            </div>
        </div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern animate-[tunnel_12s_linear_infinite]" style={{ transform: 'rotateX(80deg)' }}></div>
      </div>

      <div className="relative z-[110] w-full max-w-4xl px-10 flex flex-col items-center">
        {/* Phase 0: System Logs (Perfect Version Kept) */}
        {phase === 0 && (
          <div className="text-left w-full max-w-sm p-8 bg-black/60 border border-primary/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.1)]">
            <div className="mb-6">
                <div className="text-primary font-display font-black text-2xl tracking-tighter mb-1 uppercase italic flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary animate-pulse"></span>
                    Cypher <span className="text-secondary">Zone</span> X_OS
                </div>
                <div className="text-[6px] text-slate-500 tracking-[0.8em]">INIT_VERSION_4.2.1_STABLE</div>
            </div>
            {logs.map((log, i) => (
              <div key={i} className="text-primary text-[10px] md:text-xs mb-1.5 opacity-80 flex gap-2">
                <span className="text-secondary">#</span> {log}
              </div>
            ))}
          </div>
        )}

        {/* Phase 1: Cinematic Neural Sync (Automated) */}
        {phase === 1 && (
          <div className="sync-visual flex flex-col items-center gap-10 w-full preserve-3d">
            {/* Holographic Core - dedicated to loader */}
            <div className="hud-element relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <div className="hud-ring-1 absolute inset-0 border-2 border-primary/10 rounded-full border-dashed"></div>
              <div className="hud-ring-2 absolute inset-5 border border-secondary/15 rounded-full border-dotted"></div>
              <div className="absolute inset-10 border border-primary/5 rounded-full animate-pulse"></div>
              <div className="absolute inset-[-14%] bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.14),transparent_62%)] blur-2xl"></div>
              <div className="absolute inset-[-9%] border border-primary/20 rounded-full opacity-40 animate-ping"></div>

              <div className="relative text-center flex flex-col items-center gap-3 z-[2]">
              
                <div className="text-[9px] text-primary tracking-[0.6em] font-black uppercase opacity-60">Neural_Synchronization</div>
                <div className="text-7xl md:text-8xl font-display font-black text-white drop-shadow-[0_0_40px_rgba(0,243,255,0.8)]">
                  {syncProgress}<span className="text-2xl text-primary opacity-40">%</span>
                </div>
                <div className="mt-4 flex justify-center gap-1.5">
                   {[...Array(12)].map((_, i) => (
                     <div 
                      key={i} 
                      className={`w-2 h-5 transition-all duration-300 ${i < (syncProgress / 8.3) ? 'bg-primary shadow-[0_0_12px_#00f3ff]' : 'bg-white/5'}`}
                     ></div>
                   ))}
                </div>
              </div>
            </div>

            {/* Tactical Readouts */}
            <div className="hud-element grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl px-4">
              {[
                { label: 'UPLINK_STABILITY', val: syncProgress > 50 ? 'STABLE' : 'BUFFERING', color: 'text-primary' },
                { label: 'NEURAL_INTEGRITY', val: '99.99%', color: 'text-green-500' },
                { label: 'EYE_TRACKING', val: 'LOCKED', color: 'text-secondary' },
                { label: 'REALITY_PHASE', val: syncProgress > 80 ? 'DESYNC_READY' : 'WAITING', color: 'text-white' }
              ].map(stat => (
                <div key={stat.label} className="p-4 bg-black/40 border border-white/5 backdrop-blur-md flex flex-col items-center">
                   <div className="text-[6px] text-slate-500 mb-1.5 tracking-widest uppercase">{stat.label}</div>
                   <div className={`text-[8px] font-black uppercase tracking-wider ${stat.color}`}>{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2: Logo Spotlight */}
        {phase === 2 && (
          <div className="sync-visual flex flex-col items-center justify-center gap-10 w-full preserve-3d">
            <div ref={logoRef} className="relative flex items-center justify-center">
              <div className="absolute inset-[-45%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6),transparent_72%)] blur-3xl"></div>
              <div className="absolute inset-[-35%] bg-[conic-gradient(from_0deg,rgba(0,0,0,0.7),rgba(0,243,255,0.18),rgba(0,0,0,0.7))] blur-lg animate-[spin_12s_linear_infinite]"></div>
              <div className="absolute inset-[-15%] "></div>
              <div className="relative w-120 h-120 md:w-80 md:h-80 rounded-2xl overflow-hidden ">
                <Image
                  src="/logo-trans.png"
                  alt="Cypherzone logo"
                  fill
                  sizes="(min-width: 768px) 20rem, 14rem"
                  className="object-contain scale-125"
                  priority
                />
              </div>
            </div>
            {/* <div className="text-[9px] text-primary tracking-[0.6em] font-black uppercase opacity-70">
              Neural Link Secured
            </div> */}
          </div>
        )}

        {/* Phase 2: Flash Transition */}
        {phase === 3 && (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-[200]">
             <div className="w-full h-[3px] bg-primary animate-[scan_0.3s_linear_infinite]"></div>
          </div>
        )}
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes tunnel { 
          from { background-position: 0 0; } 
          to { background-position: 0 1000px; } 
        }
        @keyframes scan {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
