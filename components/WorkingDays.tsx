
import React from 'react';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';

const WorkingDays: React.FC = () => {
  const schedule = [
    { day: 'MONDAY', hours: '12:00 - 22:00', status: 'STABLE' },
    { day: 'TUESDAY', hours: '12:00 - 22:00', status: 'STABLE' },
    { day: 'WEDNESDAY', hours: '12:00 - 22:00', status: 'STABLE' },
    { day: 'THURSDAY', hours: '12:00 - 22:00', status: 'STABLE' },
    { day: 'FRIDAY', hours: '12:00 - 00:00', status: 'OVERDRIVE' },
    { day: 'SATURDAY', hours: '12:00 - 00:00', status: 'OVERDRIVE' },
    { day: 'SUNDAY', hours: '14:00 - 22:00', status: 'RECOVERY' },
  ];

  // Get current day index (0 = Sunday, 1 = Monday...)
  const currentDayIndex = new Date().getDay();
  // Map index to match our array (Monday is index 0 in our schedule)
  const mappedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  return (
    <section id="hours" className="py-16 md:py-32 bg-background-dark relative overflow-hidden border-t border-white/5">
      {/* Hardware / Circuitry Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/media/arcade/interior-simulator.jpeg"
          alt="Cypherzone Interior" 
          className="w-full h-full object-cover grayscale opacity-[0.06] brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-background-dark/80"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern bg-fixed opacity-20 z-[1]"></div>
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary font-display text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">
            Availability Matrix
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel text-primary neon-glow-cyan leading-tight">
            <ShuffleText text="WORKING_DAYS" delay={300} />
          </h2>
        </div>

        <CyberBorder className="bg-black/60 backdrop-blur-xl">
          <div className="p-4 md:p-12 space-y-4 md:space-y-6">
            {schedule.map((item, index) => (
              <div 
                key={item.day}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0 group transition-all duration-500 ${index === mappedIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              >
                <div className="flex items-center gap-4 min-w-[120px] md:min-w-[150px]">
                  <div className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full ${index === mappedIndex ? 'bg-primary animate-pulse shadow-[0_0_12px_#00f3ff]' : 'bg-slate-800'}`}></div>
                  <span className={`font-pixel text-[8px] md:text-xs tracking-wider ${index === mappedIndex ? 'text-primary font-black' : 'text-slate-400'}`}>
                    {item.day}
                  </span>
                </div>
                
                <div className="hidden md:block flex-1 border-t border-dotted border-white/10 mx-8 opacity-30"></div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12">
                  <span className={`font-display font-bold tracking-[0.1em] md:tracking-[0.2em] text-base md:text-lg ${index === mappedIndex ? 'text-white' : 'text-slate-500'}`}>
                    {item.hours}
                  </span>
                  
                  <div className={`text-[8px] md:text-[9px] font-pixel px-1.5 md:px-2 py-0.5 md:py-1 border transition-colors font-bold ${
                    index === mappedIndex 
                      ? 'border-primary text-primary bg-primary/5' 
                      : 'border-white/10 text-slate-600'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CyberBorder>

        <div className="mt-12 md:mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 text-slate-500 font-display text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-bold">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            Neural Link Status: <span className="text-primary">Optimized</span>
          </div>
          
          <p className="text-slate-600 font-body text-xs md:text-sm text-center max-w-md italic font-medium">
            * Holiday protocols may vary. Check our encrypted social channels for emergency shutdowns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkingDays;
