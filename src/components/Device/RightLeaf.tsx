import React from 'react';
import type { FinishConfig, AppId, NoteItem } from '../../types';
import { DEVICE_DIMENSIONS, WALLPAPERS } from '../../constants/device';
import { StatusBar } from '../Controls/StatusBar';
import { HomeScreen } from '../Screens/HomeScreen';
import { PhotosApp } from '../Screens/PhotosApp';
import { NotesApp } from '../Screens/NotesApp';
import { CameraApp } from '../Screens/CameraApp';
import { SettingsApp } from '../Screens/SettingsApp';
import { SplitViewApp } from '../Screens/SplitViewApp';
import { StandByScreen } from '../Screens/StandByScreen';

interface RightLeafProps {
  finish: FinishConfig;
  activeApp: AppId;
  setActiveApp: (app: AppId) => void;
  wallpaper: string;
  isDarkMode: boolean;
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
  activeNoteId: string;
  setActiveNoteId: (id: string) => void;
  setFinish: (finish: any) => void;
  setWallpaper: (wp: string) => void;
  setIsDarkMode: (dark: boolean) => void;
  isLocked: boolean;
}

export const RightLeaf: React.FC<RightLeafProps> = ({
  finish,
  activeApp,
  setActiveApp,
  wallpaper,
  isDarkMode,
  notes,
  setNotes,
  activeNoteId,
  setActiveNoteId,
  setFinish,
  setWallpaper,
  setIsDarkMode,
  isLocked,
}) => {
  const { panelWidth, panelHeight, bezelRadius, innerRadius } = DEVICE_DIMENSIONS;

  const currentWp = WALLPAPERS.find((w) => w.id === wallpaper) || WALLPAPERS[0];

  return (
    <div
      className="absolute top-0 preserve-3d"
      style={{
        left: `${panelWidth}px`, // Anchors from x = panelWidth to x = panelWidth * 2
        width: `${panelWidth}px`,
        height: `${panelHeight}px`,
        transformOrigin: 'left center',
        transform: 'translateZ(0px)',
        zIndex: 10,
      }}
    >
      {/* 3D Chassis Body (Right Titanium Shell & Thickness) */}
      <div
        className="absolute inset-0 shadow-2xl border border-black/30"
        style={{
          background: finish.railGradient,
          borderRadius: `${innerRadius}px ${bezelRadius}px ${bezelRadius}px ${innerRadius}px`,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.4),
            inset 0 -1px 2px rgba(0,0,0,0.6),
            15px 20px 40px rgba(0,0,0,0.45)
          `,
        }}
      >
        {/* Antenna Band on Right Chassis Rail */}
        <div
          className="absolute right-0 top-24 w-1.5 h-1"
          style={{ background: finish.antennaBand }}
        />
        <div
          className="absolute right-0 bottom-24 w-1.5 h-1"
          style={{ background: finish.antennaBand }}
        />

        {/* Power / Siri Lock Button on Right Edge */}
        <div className="absolute -right-1 top-24 w-1 h-16 bg-zinc-800 rounded-r-xs shadow-md border-y border-white/20" />
      </div>

      {/* Front Face: Inner Right Display */}
      {/* Requirement: "Keep the right-side apps sharp, visible, and stationary." */}
      {/* Requirement: "Do NOT move the right-side interface downward." */}
      <div
        className="absolute inset-[8px] overflow-hidden select-none backface-hidden"
        style={{
          borderRadius: `${innerRadius}px ${bezelRadius - 6}px ${bezelRadius - 6}px ${innerRadius}px`,
          background: isLocked ? '#000' : currentWp.gradient,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 8px rgba(0,0,0,0.8)',
          transform: 'translateZ(4px)',
        }}
      >
        {/* Bezel Lip Specular Reflection */}
        <div className="absolute inset-0 pointer-events-none rounded-inherit border border-white/10 z-30" />

        {/* Display Status Bar (Right side: Battery, Cellular, Wifi) */}
        {!isLocked && (
          <div className="relative z-20">
            <StatusBar side="right" isDark={true} />
          </div>
        )}

        {/* Right Content Area: Stays rock-solid, sharp, stationary */}
        <div className="relative w-full h-[calc(100%-28px)] overflow-hidden">
          {isLocked ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
          ) : (
            renderRightAppContent({
              activeApp,
              setActiveApp,
              notes,
              setNotes,
              activeNoteId,
              setActiveNoteId,
              finish: finish.id,
              setFinish,
              wallpaper,
              setWallpaper,
              isDarkMode,
              setIsDarkMode,
            })
          )}
        </div>
      </div>

      {/* Back Face: Camera Island & Titanium Back */}
      <div
        className="absolute inset-0 flex flex-col items-start p-6 pointer-events-none"
        style={{
          borderRadius: `${innerRadius}px ${bezelRadius}px ${bezelRadius}px ${innerRadius}px`,
          background: finish.chassisColor,
          transform: 'translateZ(-2px) rotateY(180deg)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pro Camera Island (Top Right of Phone Back) */}
        <div
          className="w-36 h-36 rounded-3xl p-3 relative shadow-2xl border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            transform: 'translateZ(6px)',
          }}
        >
          {/* 3 Camera Lenses */}
          {/* Main 48MP Wide Lens */}
          <div className="absolute top-3 left-3 w-13 h-13 rounded-full bg-black/90 border-2 border-zinc-600 flex items-center justify-center shadow-lg">
            <div className="w-7 h-7 rounded-full bg-blue-950/80 border border-blue-400/40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />
            </div>
          </div>

          {/* Ultra Wide Lens */}
          <div className="absolute bottom-3 left-3 w-13 h-13 rounded-full bg-black/90 border-2 border-zinc-600 flex items-center justify-center shadow-lg">
            <div className="w-7 h-7 rounded-full bg-blue-950/80 border border-blue-400/40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />
            </div>
          </div>

          {/* 5x Periscope Telephoto Lens */}
          <div className="absolute top-10 right-3 w-13 h-13 rounded-full bg-black/90 border-2 border-zinc-600 flex items-center justify-center shadow-lg">
            <div className="w-7 h-7 rounded-full bg-blue-950/80 border border-blue-400/40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />
            </div>
          </div>

          {/* True Tone Flash */}
          <div className="absolute top-3 right-5 w-4 h-4 rounded-full bg-amber-100 border border-amber-300/60 shadow-sm" />

          {/* LiDAR Scanner */}
          <div className="absolute bottom-3 right-5 w-3.5 h-3.5 rounded-full bg-black border border-zinc-700" />
        </div>
      </div>
    </div>
  );
};

// Helper to render appropriate app content on the Right Screen
function renderRightAppContent(props: any) {
  const { activeApp, setActiveApp, notes, setNotes, activeNoteId, setActiveNoteId, finish, setFinish, wallpaper, setWallpaper, isDarkMode, setIsDarkMode } = props;

  switch (activeApp) {
    case 'photos':
      return <PhotosApp onBack={() => setActiveApp('home')} panel="right" />;
    case 'notes':
      return (
        <NotesApp
          notes={notes}
          setNotes={setNotes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          onBack={() => setActiveApp('home')}
          panel="right"
        />
      );
    case 'camera':
      return <CameraApp onBack={() => setActiveApp('home')} panel="right" />;
    case 'settings':
      return (
        <SettingsApp
          finish={finish}
          setFinish={setFinish}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBack={() => setActiveApp('home')}
          panel="right"
        />
      );
    case 'split':
      return <SplitViewApp notes={notes} onBack={() => setActiveApp('home')} panel="right" />;
    case 'standby':
      return <StandByScreen onBack={() => setActiveApp('home')} panel="right" />;
    case 'home':
    default:
      return <HomeScreen panel="right" onOpenApp={setActiveApp} activeApp={activeApp} />;
  }
}
