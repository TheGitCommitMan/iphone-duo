import { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  side: 'left' | 'right' | 'single';
  isDark?: boolean;
}

export const StatusBar = ({ side, isDark = true }: StatusBarProps) => {
  const [timeString, setTimeString] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format as 9:41 style or current time
      setTimeString(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = isDark ? 'text-white' : 'text-zinc-900';

  if (side === 'left') {
    return (
      <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold ${textColor} select-none`}>
        <div className="flex items-center space-x-1.5">
          <span className="text-[13px] tracking-tight">{timeString}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-white/90 font-medium">5G</span>
        </div>
        <div className="text-[11px] text-white/60 font-normal">
          Tue, Sep 15
        </div>
      </div>
    );
  }

  if (side === 'right') {
    return (
      <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold ${textColor} select-none`}>
        <div className="text-[11px] text-white/50 tracking-wider font-mono">
          DUO
        </div>
        <div className="flex items-center space-x-2">
          {/* Cellular bars */}
          <div className="flex items-end space-x-0.5 h-3">
            <div className="w-0.5 h-1 bg-current rounded-xs opacity-40"></div>
            <div className="w-0.5 h-1.5 bg-current rounded-xs opacity-70"></div>
            <div className="w-0.5 h-2 bg-current rounded-xs"></div>
            <div className="w-0.5 h-2.5 bg-current rounded-xs"></div>
          </div>
          {/* Wifi */}
          <Wifi className="w-3.5 h-3.5" />
          {/* Battery */}
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-mono">100%</span>
            <div className="relative flex items-center">
              <Battery className="w-4.5 h-4.5 stroke-[2.2]" />
              <div className="absolute inset-y-1 left-0.5 w-2.5 bg-green-400 rounded-xs"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Single outer screen status bar
  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold ${textColor} select-none`}>
      <span className="text-[13px] tracking-tight">{timeString}</span>
      <div className="flex items-center space-x-2">
        <Wifi className="w-3.5 h-3.5" />
        <div className="relative flex items-center">
          <Battery className="w-4 h-4" />
          <div className="absolute inset-y-1 left-0.5 w-2 bg-green-400 rounded-xs"></div>
        </div>
      </div>
    </div>
  );
};
