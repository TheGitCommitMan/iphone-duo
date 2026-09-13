import React from 'react';
import type { FinishConfig, AppId, NoteItem } from '../../types';
import { DEVICE_DIMENSIONS, WALLPAPERS } from '../../constants/device';
import { StatusBar } from '../Controls/StatusBar';
import { OuterScreen } from './OuterScreen';
import { HomeScreen } from '../Screens/HomeScreen';
import { PhotosApp } from '../Screens/PhotosApp';
import { NotesApp } from '../Screens/NotesApp';
import { CameraApp } from '../Screens/CameraApp';
import { SettingsApp } from '../Screens/SettingsApp';
import { SplitViewApp } from '../Screens/SplitViewApp';
import { StandByScreen } from '../Screens/StandByScreen';

interface LeftLeafProps {
  finish: FinishConfig;
  angle: number;           // 0 to 180
  openProgress: number;    // 0 to 1
  leftOffsetY: number;     // Content vertical offset in px
  leftBlur: number;        // Blur in px
  leftDarkness: number;    // Darkness opacity
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

export const LeftLeaf: React.FC<LeftLeafProps> = ({
  finish,
  angle,
  openProgress,
  leftOffsetY,
  leftBlur,
  leftDarkness,
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

  // The LEFT half folds toward the RIGHT half (forward towards user).
  // In screen space (+Y down), negative Y rotation swings forward into +Z.
  // At 180° (open): foldAngle = 0° (flat).
  // At 90° (halfway): foldAngle = -90° (swings forward into +Z).
  // At 0° (closed): foldAngle = -180° (folds flat onto the front of right leaf).
  const foldAngle = -(180 - angle);
  // Offset in Z to sit cleanly in front of right leaf when closed
  const zOffset = (1 - openProgress) * 12;

  const currentWp = WALLPAPERS.find((w) => w.id === wallpaper) || WALLPAPERS[0];

  return (
    <div
      className="absolute top-0 preserve-3d"
      style={{
        left: '0px', // Anchors from x = 0 to x = panelWidth (hinge is at right edge)
        width: `${panelWidth}px`,
        height: `${panelHeight}px`,
        transformOrigin: 'right center',
        transform: `translateZ(${zOffset}px) rotateY(${foldAngle}deg)`,
        zIndex: foldAngle < -90 ? 35 : 20,
      }}
    >
      {/* 3D Chassis Body (Outer Titanium Shell & Thickness) */}
      <div
        className="absolute inset-0 shadow-2xl border border-black/30"
        style={{
          background: finish.railGradient,
          borderRadius: `${bezelRadius}px ${innerRadius}px ${innerRadius}px ${bezelRadius}px`,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.4),
            inset 0 -1px 2px rgba(0,0,0,0.6),
            -15px 20px 40px rgba(0,0,0,0.45)
          `,
        }}
      >
        {/* Antenna Band on Left Chassis Rail */}
        <div
          className="absolute left-0 top-24 w-1.5 h-1"
          style={{ background: finish.antennaBand }}
        />
        <div
          className="absolute left-0 bottom-24 w-1.5 h-1"
          style={{ background: finish.antennaBand }}
        />

        {/* Volume Rockers on Left Edge */}
        <div className="absolute -left-1 top-28 w-1 h-12 bg-zinc-800 rounded-l-xs shadow-md border-y border-white/20" />
        <div className="absolute -left-1 top-44 w-1 h-12 bg-zinc-800 rounded-l-xs shadow-md border-y border-white/20" />

        {/* Action Button */}
        <div className="absolute -left-1 top-16 w-1 h-7 bg-zinc-800 rounded-l-xs shadow-md border border-amber-400/40" />
      </div>

      {/* Front Face: Inner Left Display */}
      <div
        className="absolute inset-[8px] overflow-hidden select-none backface-hidden"
        style={{
          borderRadius: `${bezelRadius - 6}px ${innerRadius}px ${innerRadius}px ${bezelRadius - 6}px`,
          background: isLocked ? '#000' : currentWp.gradient,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 8px rgba(0,0,0,0.8)',
          transform: 'translateZ(4px)',
        }}
      >
        {/* Screen Bezel Lip Reflection */}
        <div className="absolute inset-0 pointer-events-none rounded-inherit border border-white/10 z-30" />

        {/* Display Status Bar (Always at the top) */}
        {!isLocked && (
          <div className="relative z-20">
            <StatusBar side="left" isDark={true} />
          </div>
        )}

        {/* Content Viewport with Clipping */}
        {/* Requirement: "While partially open, the LEFT-side content sits lower, partly clipped below the display edge." */}
        {/* Requirement: "As the phone opens fully, the left content smoothly rises into its final position." */}
        {/* Requirement: "The left panel starts blurred and darkened. Gradually remove its blur and dark shading as it opens." */}
        <div
          className="relative w-full h-[calc(100%-28px)] overflow-hidden"
          style={{
            // The clipping container clips anything extending below the screen
            overflow: 'hidden',
          }}
        >
          {/* Inner Content Wrapper driven by timeline state */}
          <div
            className="w-full h-full"
            style={{
              transform: `translateY(${leftOffsetY}px)`,
              filter: `blur(${leftBlur}px)`,
              // Will-change ensures smooth GPU composition without redraw cost
              willChange: 'transform, filter',
            }}
          >
            {isLocked ? (
              <div className="flex flex-col items-center justify-center h-full text-white/50">
                <div className="text-3xl font-light font-mono text-white/80">9:41</div>
                <div className="text-xs text-white/40 mt-1">Tap to Unlock</div>
              </div>
            ) : (
              renderLeftAppContent({
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

        {/* Attached Dark Shading Overlay */}
        {/* Requirement: "Keep shading attached to the left panel and hinge. Gradually remove dark shading as it opens." */}
        {/* Requirement: "Do NOT add a moving diagonal black stripe. Do NOT fade the entire inner screen to black." */}
        <div
          className="absolute inset-0 pointer-events-none z-25 transition-opacity duration-75"
          style={{
            opacity: leftDarkness,
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.75) 100%)',
          }}
        />
      </div>

      {/* Back Face: Outer Cover Screen of Left Leaf (Visible when closed) */}
      <div
        className="absolute inset-0 preserve-3d"
        style={{
          borderRadius: `${bezelRadius}px ${innerRadius}px ${innerRadius}px ${bezelRadius}px`,
          background: finish.chassisColor,
          transform: 'translateZ(-2px) rotateY(180deg)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <OuterScreen
          finish={finish}
          openProgress={openProgress}
          activeApp={activeApp}
          setActiveApp={setActiveApp}
          wallpaper={wallpaper}
          isDarkMode={isDarkMode}
          notes={notes}
          setNotes={setNotes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setFinish={setFinish}
          setWallpaper={setWallpaper}
          setIsDarkMode={setIsDarkMode}
          isLocked={isLocked}
        />
      </div>
    </div>
  );
};

// Helper to render appropriate app content on the Left Screen
function renderLeftAppContent(props: any) {
  const { activeApp, setActiveApp, notes, setNotes, activeNoteId, setActiveNoteId, finish, setFinish, wallpaper, setWallpaper, isDarkMode, setIsDarkMode } = props;

  switch (activeApp) {
    case 'photos':
      return <PhotosApp onBack={() => setActiveApp('home')} panel="left" />;
    case 'notes':
      return (
        <NotesApp
          notes={notes}
          setNotes={setNotes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          onBack={() => setActiveApp('home')}
          panel="left"
        />
      );
    case 'camera':
      return <CameraApp onBack={() => setActiveApp('home')} panel="left" />;
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
          panel="left"
        />
      );
    case 'split':
      return <SplitViewApp notes={notes} onBack={() => setActiveApp('home')} panel="left" />;
    case 'standby':
      return <StandByScreen onBack={() => setActiveApp('home')} panel="left" />;
    case 'home':
    default:
      return <HomeScreen panel="left" onOpenApp={setActiveApp} activeApp={activeApp} />;
  }
}
