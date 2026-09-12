import React from 'react';
import type { FinishConfig, AppId, NoteItem } from '../../types';
import { DEVICE_DIMENSIONS, WALLPAPERS } from '../../constants/device';
import { StatusBar } from '../Controls/StatusBar';
import { DynamicIsland } from '../Controls/DynamicIsland';
import { HomeScreen } from '../Screens/HomeScreen';
import { PhotosApp } from '../Screens/PhotosApp';
import { NotesApp } from '../Screens/NotesApp';
import { CameraApp } from '../Screens/CameraApp';
import { SettingsApp } from '../Screens/SettingsApp';
import { SplitViewApp } from '../Screens/SplitViewApp';
import { StandByScreen } from '../Screens/StandByScreen';

interface OuterScreenProps {
  finish: FinishConfig;
  openProgress: number; // 0 = closed, 1 = open
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

export const OuterScreen: React.FC<OuterScreenProps> = ({
  finish,
  openProgress,
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
  const { panelWidth, panelHeight, bezelRadius } = DEVICE_DIMENSIONS;

  const currentWp = WALLPAPERS.find((w) => w.id === wallpaper) || WALLPAPERS[0];

  // The outer screen is at its brightest when the phone is closed (openProgress = 0).
  // When opening (> 20 deg, openProgress > 0.1), it dims into StandBy / Always-On mode.
  const displayBrightness = Math.max(0.2, 1 - openProgress * 1.5);

  return (
    <div
      className="absolute inset-[8px] overflow-hidden select-none"
      style={{
        borderRadius: `${bezelRadius - 6}px`,
        background: isLocked ? '#000' : currentWp.gradient,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 0 12px rgba(0,0,0,0.8)',
        opacity: displayBrightness,
        transition: 'opacity 0.2s ease-out',
      }}
    >
      {/* Top Glass Reflection */}
      <div className="absolute inset-0 pointer-events-none rounded-inherit border border-white/10 z-30" />

      {/* Dynamic Island at the top center */}
      <DynamicIsland isCompact={true} />

      {/* Outer Status Bar */}
      <StatusBar side="single" isDark={true} />

      {/* Main App Content adapted for single compact display */}
      <div className="relative w-full h-[calc(100%-60px)] overflow-hidden">
        {isLocked ? (
          <div className="flex flex-col items-center justify-between h-full py-8 text-white">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-light font-mono tracking-tight">9:41</div>
              <div className="text-xs text-white/70 mt-1">Tuesday, September 15</div>
            </div>

            <div className="w-28 h-1 bg-white/40 rounded-full" />
          </div>
        ) : (
          renderOuterAppContent({
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
  );
};

function renderOuterAppContent(props: any) {
  const { activeApp, setActiveApp, notes, setNotes, activeNoteId, setActiveNoteId, finish, setFinish, wallpaper, setWallpaper, isDarkMode, setIsDarkMode } = props;

  switch (activeApp) {
    case 'photos':
      return <PhotosApp onBack={() => setActiveApp('home')} panel="outer" />;
    case 'notes':
      return (
        <NotesApp
          notes={notes}
          setNotes={setNotes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          onBack={() => setActiveApp('home')}
          panel="outer"
        />
      );
    case 'camera':
      return <CameraApp onBack={() => setActiveApp('home')} panel="outer" />;
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
          panel="outer"
        />
      );
    case 'split':
      return <SplitViewApp notes={notes} onBack={() => setActiveApp('home')} panel="outer" />;
    case 'standby':
      return <StandByScreen onBack={() => setActiveApp('home')} panel="outer" />;
    case 'home':
    default:
      return <HomeScreen panel="outer" onOpenApp={setActiveApp} activeApp={activeApp} />;
  }
}
