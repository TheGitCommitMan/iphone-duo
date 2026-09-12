import React, { useState, useEffect } from 'react';
import { ChevronLeft, Moon, Sun, CloudSun, Music, Calendar } from 'lucide-react';

interface StandByScreenProps {
  onBack: () => void;
  panel?: 'left' | 'right' | 'full' | 'outer';
}

export const StandByScreen: React.FC<StandByScreenProps> = ({ onBack, panel = 'full' }) => {
  const [time, setTime] = useState<string>('09:41');
  const [seconds, setSeconds] = useState<string>('00');
  const [nightMode, setNightMode] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
      setSeconds(s);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const redTint = nightMode ? 'text-red-500' : 'text-white';
  const redBg = nightMode ? 'bg-black' : 'bg-black';

  // Left Panel: Big StandBy Clock
  if (panel === 'left') {
    return (
      <div className={`flex flex-col h-full ${redBg} ${redTint} p-6 justify-between select-none relative overflow-hidden transition-colors duration-500`}>
        {/* Top bar */}
        <div className="flex items-center justify-between z-10">
          <button onClick={onBack} className="flex items-center text-xs font-semibold opacity-70 hover:opacity-100">
            <ChevronLeft className="w-4 h-4 mr-0.5" /> Exit
          </button>
          <button 
            onClick={() => setNightMode(!nightMode)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-semibold"
          >
            <Moon className="w-3 h-3 text-red-400" />
            <span>{nightMode ? 'Night Mode Active' : 'Toggle Night Red'}</span>
          </button>
        </div>

        {/* Center Giant StandBy Clock */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="text-7xl font-black tracking-tighter leading-none font-mono drop-shadow-2xl">
            {time}
          </div>
          <div className="text-sm font-semibold tracking-widest uppercase opacity-60 mt-3">
            Tuesday, September 15 • {seconds}s
          </div>
        </div>

        {/* Bottom Tent Mode Indicator */}
        <div className="text-center text-[10px] opacity-40 font-mono">
          STANDBY • 90° BEDSTAND MODE
        </div>
      </div>
    );
  }

  // Right Panel: Ambient Weather & Music Widgets
  if (panel === 'right') {
    return (
      <div className={`flex flex-col h-full ${redBg} ${redTint} p-6 justify-between select-none transition-colors duration-500`}>
        <div className="text-right text-[10px] font-mono opacity-50">
          CUPERTINO, CA
        </div>

        {/* Ambient widgets */}
        <div className="space-y-4 my-auto">
          {/* Weather card */}
          <div className={`p-4 rounded-2xl ${nightMode ? 'bg-red-950/20 border border-red-800/40' : 'bg-zinc-900/80 border border-white/10'} text-left`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">72°</div>
                <div className="text-xs opacity-70">Clear Skies • High 78°</div>
              </div>
              <CloudSun className={`w-10 h-10 ${nightMode ? 'text-red-400' : 'text-amber-400'}`} />
            </div>
          </div>

          {/* Calendar card */}
          <div className={`p-4 rounded-2xl ${nightMode ? 'bg-red-950/20 border border-red-800/40' : 'bg-zinc-900/80 border border-white/10'} text-left`}>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Next Up</span>
            </div>
            <div className="text-sm font-bold">Sleep Schedule • 10:30 PM</div>
            <div className="text-[11px] opacity-70 mt-0.5">8 hrs sleep goal configured</div>
          </div>
        </div>

        <div className="text-center text-[10px] opacity-40 font-mono">
          MAGSAFE INDUCTIVE CHARGE 100%
        </div>
      </div>
    );
  }

  // Outer Screen adaptive view
  return (
    <div className={`flex flex-col h-full ${redBg} ${redTint} p-4 justify-between select-none`}>
      <button onClick={onBack} className="flex items-center text-xs opacity-70 hover:opacity-100">
        <ChevronLeft className="w-4 h-4 mr-0.5" /> Exit
      </button>
      <div className="text-center">
        <div className="text-5xl font-black font-mono">{time}</div>
        <div className="text-xs opacity-60 mt-1">Tuesday, Sep 15</div>
      </div>
      <div className="text-[10px] opacity-40 text-center font-mono">STANDBY</div>
    </div>
  );
};
