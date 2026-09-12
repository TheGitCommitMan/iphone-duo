import React from 'react';
import { 
  ChevronLeft, ChevronRight, Moon, Sun, 
  Smartphone, Shield, Wifi, Bluetooth, Battery, Info, Palette 
} from 'lucide-react';
import type { DeviceFinish } from '../../types';
import { FINISHES, WALLPAPERS } from '../../constants/device';

interface SettingsAppProps {
  finish: DeviceFinish;
  setFinish: (finish: DeviceFinish) => void;
  wallpaper: string;
  setWallpaper: (wp: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onBack: () => void;
  panel?: 'left' | 'right' | 'full' | 'outer';
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  finish,
  setFinish,
  wallpaper,
  setWallpaper,
  isDarkMode,
  setIsDarkMode,
  onBack,
  panel = 'full',
}) => {
  return (
    <div className="flex flex-col h-full bg-[#000000] text-white p-4 select-none overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button onClick={onBack} className="flex items-center text-blue-400 text-xs font-semibold">
          <ChevronLeft className="w-4 h-4 mr-0.5" /> Home
        </button>
        <span className="text-sm font-bold text-white">Settings</span>
        <span className="w-10"></span>
      </div>

      {/* User ID Profile card */}
      <div className="flex items-center space-x-3 p-3 bg-zinc-900/90 rounded-2xl my-3 border border-white/10">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow">
          AR
        </div>
        <div className="flex-1 text-left">
          <div className="text-xs font-bold text-white">Alex Rivers</div>
          <div className="text-[10px] text-zinc-400">Apple Account, iCloud+, Purchases</div>
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-500" />
      </div>

      {/* Section: Hardware Finish */}
      <div className="bg-zinc-900/90 rounded-2xl p-3.5 mb-3 border border-white/10 text-left">
        <div className="flex items-center space-x-2 mb-2.5">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Titanium Finish</span>
        </div>
        <p className="text-[10px] text-zinc-400 mb-3">
          Select aerospace-grade Grade 5 titanium chassis styling for the device.
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(FINISHES) as DeviceFinish[]).map((fKey) => {
            const f = FINISHES[fKey];
            const isSelected = finish === fKey;
            return (
              <button
                key={fKey}
                onClick={() => setFinish(fKey)}
                className={`flex items-center space-x-2.5 p-2 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-white/15 border-white/60 shadow-md ring-1 ring-white/30'
                    : 'bg-zinc-800/60 border-white/5 hover:bg-zinc-800'
                }`}
              >
                <div 
                  className="w-5 h-5 rounded-full border border-white/30 shadow-inner" 
                  style={{ background: f.chassisColor }}
                />
                <span className="text-xs font-medium text-white truncate">
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section: Dynamic Wallpaper */}
      <div className="bg-zinc-900/90 rounded-2xl p-3.5 mb-3 border border-white/10 text-left">
        <div className="flex items-center space-x-2 mb-2.5">
          <Palette className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Duo Wallpaper</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.id)}
              className={`flex flex-col items-center p-1 rounded-xl transition-all ${
                wallpaper === wp.id ? 'ring-2 ring-blue-500 scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div 
                className="w-12 h-14 rounded-lg shadow border border-white/20" 
                style={{ background: wp.gradient }} 
              />
              <span className="text-[9px] text-zinc-300 mt-1 truncate max-w-[48px]">{wp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section: Appearance & System */}
      <div className="bg-zinc-900/90 rounded-2xl divide-y divide-white/5 border border-white/10 text-left mb-3">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span className="text-xs text-white">Dark Appearance</span>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
              isDarkMode ? 'bg-green-500' : 'bg-zinc-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-white">True Tone & ProMotion</span>
          </div>
          <span className="text-[10px] font-mono text-green-400 font-semibold">120 Hz Active</span>
        </div>
      </div>

      {/* About Device Concept */}
      <div className="bg-zinc-900/90 rounded-2xl p-3 border border-white/10 text-left">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">About iPhone Duo</span>
        </div>
        <div className="space-y-1 text-[10px] text-zinc-400">
          <div className="flex justify-between"><span>Model:</span><span className="text-white">iPhone Duo (Concept)</span></div>
          <div className="flex justify-between"><span>Display:</span><span className="text-white">Dual Super Retina XDR OLED</span></div>
          <div className="flex justify-between"><span>Chipset:</span><span className="text-white">Apple A19 Pro Bionic</span></div>
          <div className="flex justify-between"><span>Hinge:</span><span className="text-white">Titanium 42-gear Micro-spine</span></div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/5 text-[9px] text-zinc-500 italic text-center">
          * Simulated prototype concept interface for interactive demonstration. Not affiliated with Apple Inc.
        </div>
      </div>
    </div>
  );
};
