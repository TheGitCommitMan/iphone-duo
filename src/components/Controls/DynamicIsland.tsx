import { useState } from 'react';
import { Music, PhoneCall } from 'lucide-react';

interface DynamicIslandProps {
  isCompact?: boolean;
}

export const DynamicIsland = ({ isCompact = true }: DynamicIslandProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-center w-full pt-2 select-none relative z-30">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-black text-white rounded-full transition-all duration-300 ease-out flex items-center justify-between cursor-pointer border border-white/10 shadow-lg ${
          isExpanded
            ? 'w-64 h-11 px-4'
            : isCompact
            ? 'w-28 h-7 px-2.5'
            : 'w-36 h-8 px-3'
        }`}
      >
        {isExpanded ? (
          <div className="flex items-center justify-between w-full text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-pink-600 flex items-center justify-center">
                <Music className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-[11px] leading-tight">Daylight</span>
                <span className="text-[9px] text-white/60">Taylor Swift</span>
              </div>
            </div>
            {/* Audio wave bars */}
            <div className="flex items-end space-x-0.5 h-3">
              <span className="w-0.5 h-3 bg-pink-500 rounded-full animate-pulse"></span>
              <span className="w-0.5 h-2 bg-pink-500 rounded-full animate-pulse delay-75"></span>
              <span className="w-0.5 h-3.5 bg-pink-500 rounded-full animate-pulse delay-150"></span>
              <span className="w-0.5 h-1.5 bg-pink-500 rounded-full animate-pulse delay-100"></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500 flex items-center justify-center">
              <Music className="w-1.5 h-1.5 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700/80"></div>
              <div className="flex items-end space-x-0.5 h-2">
                <span className="w-0.5 h-2 bg-pink-500 rounded-full"></span>
                <span className="w-0.5 h-1.5 bg-pink-500 rounded-full"></span>
                <span className="w-0.5 h-2.5 bg-pink-500 rounded-full"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
