
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CyberBorder from './CyberBorder';
import { useSfx } from '@/lib/useSfx';

interface FooterProps {
  onAdminClick?: () => void;
  setActiveTab?: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, setActiveTab }) => {
  const { playHover, playClick } = useSfx();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden ">
                <Image
                  src="/logo-black.png"
                  alt="Cypherzone logo"
                  height={500}
                  width={500}
                  className="object-contain mt-2"
                  priority={false}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg md:text-xl tracking-tighter text-primary leading-none">
                  CYPHER
                  <span className="text-pink-400  group-hover:neon-glow-cyan transition-all">
                    ZONE
                  </span>
                  <span className="text-yellow-500">X</span>
                </span>
                <span className="text-[7px] font-pixel text-slate-600 tracking-[0.5em] mt-1 uppercase">
                  VR UNIVERSE
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 font-body leading-relaxed max-w-xs font-bold">
              The #1 place in Accra for amazing virtual reality adventures. We
              make gaming feel like real life.
            </p>
            <div className="flex gap-4">
              {[
                { name: "Twitter", key: "x" },
                { name: "TikTok", key: "tiktok" },
                { name: "Instagram", key: "instagram" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={
                    social.name === "Twitter"
                      ? "https://x.com/cypherzonex"
                      : social.name === "TikTok"
                      ? "https://tiktok.com/@cypherzonex"
                      : "https://instagram.com/cypherzonex"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <span className="block w-4 h-4">
                    {social.key === "x" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M3 3h5.1l4 5.5L16.8 3H21l-6.7 9 7 9H16l-4.3-6L7 21H3l7-9z" />
                      </svg>
                    )}
                    {social.key === "tiktok" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M14.5 3c.2 2 1.7 3.6 3.7 3.8v3.1a7.2 7.2 0 0 1-3.7-1.1v6.1a5.9 5.9 0 1 1-5.9-5.9c.4 0 .7 0 1 .1v3.2a2.7 2.7 0 1 0 1.6 2.5V3h3.3z" />
                      </svg>
                    )}
                    {social.key === "instagram" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm11 1.5a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5Z" />
                      </svg>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-pixel text-[10px] text-white tracking-widest uppercase border-l-2 border-primary pl-4">
              Menu
            </h4>
            <ul className="space-y-3 font-body font-bold text-slate-500">
              {[
                { label: "Home", href: "/" },
                { label: "Our Games", href: "/games" },
                { label: "Prices", href: "/pricing" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors flex items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onMouseEnter={playHover}
                    onClick={playClick}
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-pixel text-[10px] text-white tracking-widest uppercase border-l-2 border-secondary pl-4">
              Our Location
            </h4>
            <div className="space-y-4 font-body font-bold text-slate-400">
              <p className="leading-relaxed">
                Spintex Road,
                <br />
                Inside Palace Mall,
                <br />
                Accra, Ghana
              </p>
              <Link
                href="https://maps.google.com/?q=Cypherzone+VR+Spintex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary text-xs cursor-pointer hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onMouseEnter={playHover}
                onClick={playClick}
                aria-label="Get directions to Cypherzone on Google Maps"
              >
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                <span className="tracking-widest">GET DIRECTIONS</span>
              </Link>
              <div className="text-[10px] text-slate-500 font-pixel uppercase">
                Hours: Mon–Sun 10:00 – 23:00
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-pixel text-[10px] text-white tracking-widest uppercase border-l-2 border-brand-yellow pl-4">
              Stay Updated
            </h4>
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                Enter your email to get news about new games and special events.
              </p>
              <div className="relative">
                <label className="sr-only" htmlFor="footer-email">
                  Email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your Email..."
                  className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Subscribe to updates"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[8px] font-pixel text-slate-600 font-bold tracking-widest uppercase">
            <p>© {currentYear} CYPHERZONE X. ALL SYSTEMS GO.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
                <span>SYSTEM: STABLE</span>
              </div>
              <div
                onClick={onAdminClick}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></span>
                <span className="group-hover:text-primary transition-colors">
                  OVERRIDE: ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 text-[8px] font-pixel text-slate-500 uppercase font-bold">
            <Link
              href="#"
              className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onMouseEnter={playHover}
              onClick={playClick}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
