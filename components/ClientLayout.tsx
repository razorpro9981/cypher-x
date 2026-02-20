'use client';

import React, { useEffect, useMemo, useState, ReactElement, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('HOME');
  const pathname = usePathname();
  const router = useRouter();

  const tabToRoute = useMemo(
    () => ({
      HOME: '/',
      GAMES: '/games',
      PRICING: '/pricing',
      ABOUT: '/about',
      NEWS: '/news',
      CONTACT: '/contact',
      RESTAURANT: '/restaurant',
      GALLERY: '/gallery',
      EXPERIENCES: '/experiences',
      ADMIN: '/admin',
    }),
    []
  );

  const routeToTab = useMemo(() => {
    const entries = Object.entries(tabToRoute).map(([tab, route]) => [route, tab]);
    return Object.fromEntries(entries) as Record<string, string>;
  }, [tabToRoute]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onIntroFinish = () => {
    setIsEntering(true);
    setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setIsEntering(false), 800);
    }, 150);
  };

  const handleAdminAuth = () => {
    const code = prompt('ENTER NEURAL SECURITY OVERRIDE CODE:');
    if (code === 'CYPHER2077') {
      setActiveTab('ADMIN');
      router.push(tabToRoute.ADMIN);
    } else if (code !== null) {
      alert('ACCESS DENIED. UNAUTHORIZED BIO-SIGNATURE.');
    }
  };

  useEffect(() => {
    const tab = routeToTab[pathname] || 'HOME';
    setActiveTab(tab);
  }, [pathname, routeToTab]);

  const setTabAndNavigate = (tab: string) => {
    setActiveTab(tab);
    const target = tabToRoute[tab as keyof typeof tabToRoute] || '/';
    router.prefetch(target);
    router.push(target);
  };

  const pageWithProps = React.isValidElement(children)
    ? React.cloneElement(children as ReactElement<Record<string, unknown>>, {
        activeTab,
        setActiveTab: setTabAndNavigate,
        handleAdminAuth,
      })
    : children;

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-black bg-background-light dark:bg-background-dark transition-colors duration-500">
      <div
        className="custom-cursor hidden md:flex"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          borderColor: '#00f3ff',
        }}
      >
        <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full"></div>
      </div>

      {isEntering && (
        <div className="fixed inset-0 z-[1000] bg-white dark:bg-primary mix-blend-screen animate-[flashOut_0.8s_ease-out_forwards]"></div>
      )}

      {showIntro ? (
        <IntroAnimation onComplete={onIntroFinish} />
      ) : (
        <div className="animate-[homeEntrance_1s_cubic-bezier(0.22,1,0.36,1)_forwards]">
          <Header
            activeTab={activeTab}
            setActiveTab={(tab) => {
              if (tab === 'ADMIN') {
                handleAdminAuth();
              } else {
                setTabAndNavigate(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />

          <main id="main-content" className="transition-all duration-500">
            {pageWithProps}
          </main>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <Footer
            onAdminClick={handleAdminAuth}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes flashOut {
          0% { opacity: 0; transform: scale(0.8); }
          20% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes homeEntrance {
          0% { opacity: 0; transform: scale(1.05) translateY(30px); filter: blur(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default ClientLayout;
