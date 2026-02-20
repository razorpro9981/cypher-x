
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'MISSION_INQUIRY',
    message: ''
  });
  const [status, setStatus] = useState('SYSTEM_IDLE');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [honeypot, setHoneypot] = useState('');

  const isValidEmail = (email: string) =>
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  const isFormValid = useMemo(() => {
    if (honeypot) return false;
    return (
      formState.name.trim().length > 2 &&
      isValidEmail(formState.email) &&
      formState.message.trim().length > 5
    );
  }, [formState, honeypot]);

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    setStatus(`BUFFERING_${field.toUpperCase()}...`);
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrors({
        name: formState.name.trim().length > 2 ? '' : 'Name is required.',
        email: isValidEmail(formState.email) ? '' : 'Enter a valid email.',
        message: formState.message.trim().length > 5 ? '' : 'Message is too short.',
      });
      setStatus('VALIDATION_FAILED');
      return;
    }
    if (honeypot) {
      setStatus('BOT_DETECTED');
      return;
    }
    setIsSending(true);
    setStatus("ENCRYPTING_PACKETS...");
    
    setTimeout(() => setStatus("ROUTING_THROUGH_HUB_7..."), 800);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setStatus("UPLINK_SUCCESSFUL");
      setTimeout(() => {
        setIsSuccess(false);
        setStatus("SYSTEM_IDLE");
      }, 3000);
    }, 2000);
  };

  const socials = [
    { name: 'X_TWITTER', key: 'x', color: 'text-primary', url: 'https://x.com/cypherzonex' },
    { name: 'TIKTOK', key: 'tiktok', color: 'text-secondary', url: 'https://tiktok.com/@cypherzonex' },
    { name: 'INSTA_GRAM', key: 'instagram', color: 'text-white', url: 'https://instagram.com/cypherzonex' }
  ];

  return (
    <main className="relative pt-32 pb-20 overflow-hidden min-h-screen bg-background-dark">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.03)_0%,transparent_70%)]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Simplified Header */}
        <div className="mb-16 border-l-2 border-primary pl-6">
          <div className="text-primary font-pixel text-[9px] tracking-[0.5em] uppercase mb-2">
            Communication_Protocol_v4.5
          </div>
          {/* <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter">
            <ShuffleText text="Contact" delay={100} />
            <span className="text-primary">
              <ShuffleText text="Us" delay={300} />
            </span>
          </h1> */}
          <h1 className=" font-pixel text-4xl md:text-5xl font-display font-black text-white tracking-tighter">
            <GlitchText text="Contact" color="white" persistent />
            <br />
            <span className="text-primary neon-glow-magenta">
              <ShuffleText text="Us" delay={400} />
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Form Terminal */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label
                    className="text-[8px] font-pixel text-slate-600 uppercase"
                    htmlFor="name"
                  >
                    Input_Identity
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="FULL NAME"
                    id="name"
                    className="w-full bg-white/5 border border-white/10 p-4 font-body text-white focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all placeholder:text-slate-700"
                    value={formState.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-400 font-pixel">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-[8px] font-pixel text-slate-600 uppercase"
                    htmlFor="email"
                  >
                    Return_Path
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="EMAIL@DOMAIN.COM"
                    id="email"
                    className="w-full bg-white/5 border border-white/10 p-4 font-body text-white focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all placeholder:text-slate-700"
                    value={formState.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-400 font-pixel">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[8px] font-pixel text-slate-600 uppercase">
                  Mission_Directive
                </div>
                <div className="flex flex-wrap gap-2">
                  {["INQUIRY", "SUPPORT", "PARTNER", "OTHER"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleInputChange("subject", opt)}
                      className={`px-4 py-2 min-h-[44px] border font-pixel text-[7px] tracking-widest transition-all rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        formState.subject === opt
                          ? "bg-primary text-black border-primary"
                          : "text-slate-500 border-white/5 hover:border-white/20"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-[8px] font-pixel text-slate-600 uppercase"
                  htmlFor="message"
                >
                  Data_Payload
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="ENTER MESSAGE..."
                  id="message"
                  className="w-full bg-white/5 border border-white/10 p-4 font-body text-white focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all resize-none placeholder:text-slate-700"
                  value={formState.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                ></textarea>
                {errors.message && (
                  <p className="text-[10px] text-red-400 font-pixel">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <button
                  disabled={isSending || !isFormValid}
                  className={`w-full md:w-auto px-12 py-4 font-pixel text-[10px] tracking-[0.2em] transition-all relative overflow-hidden ${
                    isSuccess
                      ? "bg-green-500 text-black"
                      : isFormValid
                        ? "bg-primary text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                        : "bg-slate-700 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  {isSending ? (
                    <ShuffleText text="TRANSMITTING..." />
                  ) : isSuccess ? (
                    "SENT_COMPLETED"
                  ) : (
                    "SEND_MESSAGE"
                  )}
                  {isSending && (
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                  )}
                </button>

                <div className="flex items-center gap-3" aria-live="polite">
                  <div
                    className={`w-2 h-2 rounded-full ${isSending ? "bg-primary animate-ping" : isSuccess ? "bg-green-500" : "bg-slate-800"}`}
                  ></div>
                  <div className="text-[9px] font-pixel text-slate-500 uppercase tracking-widest">
                    {status}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Enhanced Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <CyberBorder className="bg-white/5 border-white/5 p-6 md:p-8 space-y-6">
              {/* Tactical Sector Card */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-pixel text-primary uppercase tracking-widest">
                    Sector_Location
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[7px] font-pixel text-green-500 tracking-tighter">
                      NODE_ACTIVE
                    </span>
                  </div>
                </div>

                <div className="aspect-video bg-slate-900 relative group overflow-hidden border border-white/5 rounded">
                  <Image
                    src="/media/arcade/exterior-side.jpeg"
                    fill
                    priority
                    className="object-cover opacity-30 grayscale group-hover:opacity-50 transition-all duration-1000"
                    alt="Cypherzone Location"
                    sizes="(min-width: 1024px) 540px, 100vw"
                  />
                  {/* Radar Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[length:100%_15px]"></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#00f3ff] animate-pulse"></div>
                      <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Lat/Long Metadata */}
                  <div className="absolute bottom-2 left-2 text-[6px] font-pixel text-slate-500 space-y-0.5">
                    <div>LAT: 5.6037 N</div>
                    <div>LONG: 0.1870 W</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div className="font-body text-slate-400 space-y-1 max-w-sm">
                    <p className="font-bold text-white tracking-wider">
                      SPINTEX_HUB_01
                    </p>
                    <p className="text-sm">Inside Palace Mall, Spintex Road</p>
                    <p className="text-sm">Accra, Ghana</p>
                    <a
                      href="https://maps.google.com/?q=Cypherzone+VR+Spintex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] font-pixel text-primary hover:text-secondary transition-colors"
                    >
                      Open in Maps{" "}
                      <span className="material-symbols-outlined text-xs">
                        open_in_new
                      </span>
                    </a>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[7px] font-pixel text-slate-600 mb-1">
                      SIGNAL_STRENGTH
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-1 h-3 ${i < 5 ? "bg-primary" : "bg-slate-800"}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5"></div>

              {/* Social Channels */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-pixel text-secondary uppercase tracking-widest">
                  Social_Uplinks
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group rounded"
                    >
                      <span
                        className={`block ${social.color} group-hover:scale-110 transition-transform`}
                        aria-hidden="true"
                      >
                        {social.key === "x" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-current"
                          >
                            <path d="M3 3h5.1l4 5.5L16.8 3H21l-6.7 9 7 9H16l-4.3-6L7 21H3l7-9z" />
                          </svg>
                        )}
                        {social.key === "tiktok" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-current"
                          >
                            <path d="M14.5 3c.2 2 1.7 3.6 3.7 3.8v3.1a7.2 7.2 0 0 1-3.7-1.1v6.1a5.9 5.9 0 1 1-5.9-5.9c.4 0 .7 0 1 .1v3.2a2.7 2.7 0 1 0 1.6 2.5V3h3.3z" />
                          </svg>
                        )}
                        {social.key === "instagram" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-current"
                          >
                            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm11 1.5a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5Z" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[6px] font-pixel text-slate-500 group-hover:text-white transition-colors text-center">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/5"></div>

              {/* Direct Channels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 min-w-0">
                  <div className="text-[8px] font-pixel text-slate-600 uppercase">
                    Comm_Frequency
                  </div>
                  <a
                    href="tel:+2330260116116"
                    className="font-display font-bold text-white hover:text-primary transition-colors cursor-pointer block"
                  >
                    026 011 6116
                  </a>
                  <div className="text-[9px] font-pixel text-slate-500">
                    Avg response: ~15 min
                  </div>
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="text-[8px] font-pixel text-slate-600 uppercase">
                    Neural_Node
                  </div>
                  <a
                    href="mailto:marketing@cypherzonex.com"
                    className="font-display font-bold text-white hover:text-primary transition-colors cursor-pointer break-words"
                  >
                    marketing@cypherzonex.com
                  </a>
                  <div className="text-[9px] font-pixel text-slate-500">
                    We reply within 1 business day
                  </div>
                </div>
              </div>
            </CyberBorder>

            {/* Verification Module */}
            <div className="p-6 border border-dashed border-white/10 flex items-center gap-4 bg-black/40">
              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-xl animate-pulse">
                  security
                </span>
              </div>
              <div>
                <div className="text-[8px] font-pixel text-slate-400 uppercase mb-1">
                  ENCRYPTION: AES_256_ACTIVE
                </div>
                <p className="text-[9px] font-pixel text-slate-600 leading-relaxed uppercase tracking-widest">
                  All communications are protected via quantum-stable neural
                  links. We never sell or share your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
