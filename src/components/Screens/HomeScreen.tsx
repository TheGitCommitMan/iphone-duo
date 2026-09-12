import React, { useState } from 'react';
import { 
  Camera, Image, FileText, Settings, Compass, MessageCircle, 
  Mail, MapPin, Music, Play, Pause, Sun, Heart, Flame, 
  Clock, CheckSquare, BarChart2, Radio, Folder, Phone,
  ChevronRight, Sparkles, CloudSun
} from 'lucide-react';
import type { AppId, PhotoItem } from '../../types';
import { CURATED_PHOTOS } from '../../constants/device';

interface HomeScreenProps {
  panel: 'left' | 'right' | 'outer';
  onOpenApp: (appId: AppId) => void;
  activeApp: AppId;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ panel, onOpenApp }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  const currentPhoto: PhotoItem = CURATED_PHOTOS[photoIndex];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % CURATED_PHOTOS.length);
  };

  // Left Panel Content: Large photo-memory widget and companion widgets
  if (panel === 'left') {
    return (
      <div className="flex flex-col h-full px-5 pb-5 pt-1 select-none">
        {/* Large Photo Memory Widget */}
        <div 
          onClick={() => onOpenApp('photos')}
          className="relative w-full h-[270px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-white/15 transition-transform duration-300 hover:scale-[1.01]"
        >
          <img 
            src={currentPhoto.url} 
            alt={currentPhoto.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Memory Tag */}
          <div className="absolute top-3.5 left-4 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white/95 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Memories • 1 Year Ago</span>
          </div>

          {/* Cycle photo button */}
          <button 
            onClick={handleNextPhoto}
            title="Next memory photo"
            className="absolute top-3.5 right-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:bg-black/60 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Photo Caption */}
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <h3 className="text-white font-bold text-lg leading-tight tracking-tight drop-shadow-md">
              {currentPhoto.title}
            </h3>
            <p className="text-white/75 text-xs font-medium flex items-center mt-0.5">
              <MapPin className="w-3 h-3 mr-1 text-white/60 inline" />
              {currentPhoto.location} • {currentPhoto.date}
            </p>
          </div>
        </div>

        {/* Companion Widgets (Music & Calendar) */}
        <div className="grid grid-cols-2 gap-3.5 mt-3.5 flex-1">
          {/* Apple Music Now Playing Widget */}
          <div className="glass-panel rounded-2xl p-3 flex flex-col justify-between text-left relative overflow-hidden border border-white/10 hover:border-white/25 transition-colors">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-xs font-bold truncate">Daylight</span>
                <span className="text-white/60 text-[10px] truncate">Taylor Swift</span>
              </div>
            </div>

            <div className="my-1">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div className="bg-white h-full w-2/3 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between text-[8px] text-white/50 font-mono mt-1">
                <span>2:14</span>
                <span>3:53</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[9px] text-pink-400 font-semibold uppercase tracking-wider">Now Playing</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingMusic(!isPlayingMusic);
                }}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Calendar / Hardware Review Widget */}
          <div className="glass-panel rounded-2xl p-3 flex flex-col justify-between text-left border border-white/10 hover:border-white/25 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">Calendar</span>
                <span className="text-white/50 text-[10px]">Today</span>
              </div>
              <div className="text-white text-xs font-bold mt-1.5 leading-snug">
                Duo Hinge Review
              </div>
              <div className="text-white/60 text-[10px] mt-0.5 flex items-center">
                <Clock className="w-2.5 h-2.5 mr-1" />
                10:30 AM – 11:30 AM
              </div>
            </div>

            <div className="bg-white/10 rounded-lg px-2 py-1 flex items-center justify-between text-[9px] text-white/80">
              <span>Cupertino Park 4</span>
              <span className="text-green-400 font-semibold">Accepted</span>
            </div>
          </div>
        </div>

        {/* Quick Tips Pill */}
        <div className="mt-3 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 flex items-center justify-between">
          <span>Tip: Drag slider or press Space to fold</span>
          <span className="text-amber-400 font-medium">9.41 AM</span>
        </div>
      </div>
    );
  }

  // Right Panel Content: Two compact widgets + 4-column app grid + Vertical Glass Dock
  if (panel === 'right') {
    return (
      <div className="flex h-full select-none pb-5 pt-1">
        {/* Main Content Area: Widgets + 4-column grid */}
        <div className="flex-1 flex flex-col px-3">
          {/* Two Compact 2x2 Widgets */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Weather Widget */}
            <div className="glass-panel rounded-2xl p-3 text-left relative overflow-hidden border border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white/70 text-[10px] font-medium">Cupertino</div>
                  <div className="text-white text-2xl font-bold tracking-tight">72°</div>
                </div>
                <CloudSun className="w-7 h-7 text-amber-300" />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-white/70">
                <span className="font-medium text-amber-200">Sunny</span>
                <span>H:78° L:56°</span>
              </div>
            </div>

            {/* Fitness Activity Rings Widget */}
            <div className="glass-panel rounded-2xl p-3 text-left relative overflow-hidden border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-white/70 text-[10px] font-medium">Activity</div>
                <div className="text-rose-400 text-xs font-bold mt-0.5">540 <span className="text-[9px] font-normal text-white/60">CAL</span></div>
                <div className="text-emerald-400 text-xs font-bold">35 <span className="text-[9px] font-normal text-white/60">MIN</span></div>
                <div className="text-cyan-400 text-xs font-bold">11 <span className="text-[9px] font-normal text-white/60">HRS</span></div>
              </div>
              {/* Concentric Rings Visual */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Outer Move Ring */}
                  <circle cx="18" cy="18" r="15" fill="transparent" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="transparent" stroke="#f43f5e" strokeWidth="3" strokeDasharray="94" strokeDashoffset="18" strokeLinecap="round" />
                  {/* Middle Exercise Ring */}
                  <circle cx="18" cy="18" r="11" fill="transparent" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="11" fill="transparent" stroke="#10b981" strokeWidth="3" strokeDasharray="69" strokeDashoffset="10" strokeLinecap="round" />
                  {/* Inner Stand Ring */}
                  <circle cx="18" cy="18" r="7" fill="transparent" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="7" fill="transparent" stroke="#06b6d4" strokeWidth="3" strokeDasharray="44" strokeDashoffset="5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4-Column App Grid */}
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 flex-1 content-start">
            {/* Row 1 */}
            <AppIcon icon={Image} label="Photos" bg="bg-gradient-to-br from-purple-500 via-rose-500 to-amber-400" onClick={() => onOpenApp('photos')} />
            <AppIcon icon={Camera} label="Camera" bg="bg-gradient-to-br from-zinc-700 to-zinc-900" onClick={() => onOpenApp('camera')} />
            <AppIcon icon={FileText} label="Notes" bg="bg-gradient-to-br from-amber-400 to-yellow-500" iconColor="text-zinc-900" onClick={() => onOpenApp('notes')} />
            <AppIcon icon={Settings} label="Settings" bg="bg-gradient-to-br from-zinc-500 to-zinc-700" onClick={() => onOpenApp('settings')} />

            {/* Row 2 */}
            <AppIcon icon={Compass} label="Safari" bg="bg-gradient-to-br from-blue-400 to-blue-600" onClick={() => onOpenApp('split')} />
            <AppIcon icon={MessageCircle} label="Messages" bg="bg-gradient-to-br from-emerald-400 to-green-600" badge="3" onClick={() => onOpenApp('home')} />
            <AppIcon icon={Mail} label="Mail" bg="bg-gradient-to-br from-sky-400 to-blue-600" onClick={() => onOpenApp('home')} />
            <AppIcon icon={MapPin} label="Maps" bg="bg-gradient-to-br from-emerald-500 to-teal-700" onClick={() => onOpenApp('home')} />

            {/* Row 3 */}
            <AppIcon icon={Music} label="Music" bg="bg-gradient-to-br from-pink-500 to-rose-600" onClick={() => onOpenApp('home')} />
            <AppIcon icon={Sparkles} label="App Store" bg="bg-gradient-to-br from-cyan-400 to-blue-600" onClick={() => onOpenApp('home')} />
            <AppIcon icon={Clock} label="Clock" bg="bg-black border border-white/20" onClick={() => onOpenApp('standby')} />
            <AppIcon icon={Heart} label="Health" bg="bg-gradient-to-br from-rose-500 to-pink-600" onClick={() => onOpenApp('home')} />

            {/* Row 4 */}
            <AppIcon icon={BarChart2} label="Stocks" bg="bg-gradient-to-br from-zinc-800 to-black border border-white/10" onClick={() => onOpenApp('home')} />
            <AppIcon icon={CheckSquare} label="Reminders" bg="bg-gradient-to-br from-orange-400 to-amber-500" onClick={() => onOpenApp('home')} />
            <AppIcon icon={Radio} label="Podcasts" bg="bg-gradient-to-br from-purple-600 to-indigo-800" onClick={() => onOpenApp('home')} />
            <AppIcon icon={Folder} label="Files" bg="bg-gradient-to-br from-sky-500 to-blue-600" onClick={() => onOpenApp('home')} />
          </div>

          {/* Home indicator pill */}
          <div className="w-28 h-1 bg-white/40 rounded-full mx-auto mt-2" />
        </div>

        {/* Vertical Glass Dock at the far-right edge */}
        <div className="w-13 glass-dock rounded-2xl py-3 px-1.5 flex flex-col items-center justify-between border border-white/20 shadow-2xl my-auto h-[440px]">
          <div className="text-[8px] font-bold uppercase tracking-widest text-white/40 rotate-90 my-2">
            DOCK
          </div>
          
          <div className="flex flex-col space-y-3.5 my-auto">
            <DockIcon icon={Phone} bg="bg-emerald-500" onClick={() => onOpenApp('home')} />
            <DockIcon icon={Compass} bg="bg-blue-500" onClick={() => onOpenApp('split')} />
            <DockIcon icon={MessageCircle} bg="bg-green-500" onClick={() => onOpenApp('home')} />
            <DockIcon icon={FileText} bg="bg-amber-400" iconColor="text-zinc-900" onClick={() => onOpenApp('notes')} />
            <DockIcon icon={Image} bg="bg-gradient-to-tr from-purple-500 to-rose-400" onClick={() => onOpenApp('photos')} />
          </div>

          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-1" />
        </div>
      </div>
    );
  }

  // Outer Screen layout (Compact phone mode)
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-4 select-none justify-between">
      {/* Outer Top Widgets */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="glass-panel rounded-2xl p-2.5 text-left border border-white/10">
          <div className="text-white/60 text-[9px]">Cupertino</div>
          <div className="text-white text-xl font-bold">72°</div>
          <div className="text-amber-300 text-[9px]">Sunny</div>
        </div>
        <div 
          onClick={() => onOpenApp('photos')}
          className="relative h-18 rounded-2xl overflow-hidden cursor-pointer border border-white/15"
        >
          <img src={currentPhoto.url} alt="Memory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-semibold drop-shadow">Memory</span>
        </div>
      </div>

      {/* 4-Column Grid on Outer Screen */}
      <div className="grid grid-cols-4 gap-y-3 gap-x-1 my-auto">
        <AppIcon icon={Image} label="Photos" bg="bg-gradient-to-br from-purple-500 to-amber-400" onClick={() => onOpenApp('photos')} compact />
        <AppIcon icon={Camera} label="Camera" bg="bg-gradient-to-br from-zinc-700 to-zinc-900" onClick={() => onOpenApp('camera')} compact />
        <AppIcon icon={FileText} label="Notes" bg="bg-gradient-to-br from-amber-400 to-yellow-500" iconColor="text-zinc-900" onClick={() => onOpenApp('notes')} compact />
        <AppIcon icon={Settings} label="Settings" bg="bg-gradient-to-br from-zinc-500 to-zinc-700" onClick={() => onOpenApp('settings')} compact />
        <AppIcon icon={Compass} label="Safari" bg="bg-gradient-to-br from-blue-400 to-blue-600" onClick={() => onOpenApp('split')} compact />
        <AppIcon icon={MessageCircle} label="Messages" bg="bg-gradient-to-br from-emerald-400 to-green-600" compact />
        <AppIcon icon={Music} label="Music" bg="bg-gradient-to-br from-pink-500 to-rose-600" compact />
        <AppIcon icon={Clock} label="Clock" bg="bg-black border border-white/20" onClick={() => onOpenApp('standby')} compact />
      </div>

      {/* Bottom Horizontal Dock on Outer Screen */}
      <div className="glass-panel rounded-3xl p-2.5 flex justify-around items-center border border-white/15">
        <DockIcon icon={Phone} bg="bg-emerald-500" onClick={() => onOpenApp('home')} />
        <DockIcon icon={Compass} bg="bg-blue-500" onClick={() => onOpenApp('split')} />
        <DockIcon icon={MessageCircle} bg="bg-green-500" onClick={() => onOpenApp('home')} />
        <DockIcon icon={Camera} bg="bg-zinc-800" onClick={() => onOpenApp('camera')} />
      </div>

      {/* Home Bar */}
      <div className="w-24 h-1 bg-white/40 rounded-full mx-auto" />
    </div>
  );
};

// Reusable Apple App Icon
interface AppIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  bg: string;
  badge?: string;
  iconColor?: string;
  onClick?: () => void;
  compact?: boolean;
}

const AppIcon: React.FC<AppIconProps> = ({ 
  icon: Icon, 
  label, 
  bg, 
  badge, 
  iconColor = 'text-white', 
  onClick,
  compact = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
    >
      <div className={`relative ${compact ? 'w-12 h-12 rounded-xl' : 'w-14 h-14 rounded-2xl'} ${bg} flex items-center justify-center shadow-lg border border-white/15 group-hover:brightness-110 transition-all`}>
        <Icon className={`${compact ? 'w-6 h-6' : 'w-7 h-7'} ${iconColor} drop-shadow-sm`} />
        {badge && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-black shadow">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-white/90 font-medium tracking-tight mt-1 truncate max-w-[56px] drop-shadow-sm">
        {label}
      </span>
    </div>
  );
};

// Reusable Dock Icon
interface DockIconProps {
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  iconColor?: string;
  onClick?: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ icon: Icon, bg, iconColor = 'text-white', onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shadow-md border border-white/20 active:scale-90 hover:scale-105 transition-all cursor-pointer`}
    >
      <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
    </button>
  );
};
