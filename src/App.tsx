import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, ExternalLink, Info, 
  HelpCircle, CheckCircle2 
} from 'lucide-react';
import type { DeviceFinish, AppId, NoteItem, CameraPreset } from './types';
import { FINISHES, INITIAL_NOTES } from './constants/device';
import { useFoldingAnimation } from './hooks/useFoldingAnimation';
import { DeviceContainer } from './components/Device/DeviceContainer';
import { ControlPanel } from './components/Controls/ControlPanel';
import { KeyboardShortcutsModal } from './components/Controls/KeyboardShortcutsModal';

export function App() {
  // Device finish state
  const [finish, setFinish] = useState<DeviceFinish>('natural');
  // Wallpaper state
  const [wallpaper, setWallpaper] = useState<string>('aurora');
  // Display theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  // Lock state
  const [isLocked, setIsLocked] = useState<boolean>(false);
  // Active App (shared between inner and outer screens)
  const [activeApp, setActiveApp] = useState<AppId>('home');
  // 3D Camera view preset
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('showcase');
  // User notes state (persistent across folds and app switching)
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState<string>(INITIAL_NOTES[0].id);
  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  // Keyboard help modal
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Initialize reduced motion from system
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Folding animation hook
  const {
    timelineState,
    setAngle,
    togglePlayback,
    setSpeed,
    stepFold,
  } = useFoldingAnimation({
    initialAngle: 180,
    reducedMotion,
  });

  // Reset to initial baseline
  const handleReset = useCallback(() => {
    setAngle(180);
    setCameraPreset('front');
    setIsLocked(false);
  }, [setAngle]);

  // Cycle finish helper
  const cycleFinish = useCallback(() => {
    const finishes: DeviceFinish[] = ['natural', 'black', 'silver', 'desert'];
    setFinish((prev) => {
      const idx = finishes.indexOf(prev);
      return finishes[(idx + 1) % finishes.length];
    });
  }, []);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayback();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          stepFold(-3);
          break;
        case 'ArrowRight':
          e.preventDefault();
          stepFold(+3);
          break;
        case 'ArrowDown':
          e.preventDefault();
          stepFold(-15);
          break;
        case 'ArrowUp':
          e.preventDefault();
          stepFold(+15);
          break;
        case '1':
          setAngle(0);
          break;
        case '2':
          setAngle(90);
          break;
        case '3':
          setAngle(180);
          break;
        case 'f':
        case 'F':
          cycleFinish();
          break;
        case 'r':
        case 'R':
          handleReset();
          break;
        case 'l':
        case 'L':
          setIsLocked((prev) => !prev);
          break;
        case '?':
          setShowHelp((prev) => !prev);
          break;
        case 'Escape':
          setShowHelp(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayback, stepFold, setAngle, cycleFinish, handleReset]);

  const activeFinishConfig = FINISHES[finish];

  return (
    <div className="relative min-h-screen w-full bg-[#08080a] text-white flex flex-col justify-between overflow-hidden">
      {/* Subtle Starfield / Noise Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-40 px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.92-12.01-14.64-5.9-9.13-10.43-19.68-13.58-31.66-3.15-11.97-4.73-23.2-4.73-33.68 0-14.57 3.59-26.69 10.77-36.37 7.18-9.67 16.31-14.65 27.39-14.93 5.43 0 11.1 1.41 17.02 4.23 5.92 2.83 9.87 4.3 11.85 4.43 1.52-.13 5.65-1.68 12.38-4.66 6.74-2.98 12.56-4.32 17.47-4.02 13.06.77 23.47 5.76 31.22 14.99-11.53 7.08-17.18 16.89-16.96 29.43.22 9.79 3.91 18.06 11.08 24.81 7.17 6.74 15.65 10.72 25.43 11.92-2.17 6.53-4.67 12.94-7.51 19.23zm-32.99-106.94c0-7.29 2.5-14.03 7.51-20.21 5.01-6.19 11.21-10.15 18.6-11.9-1.2 7.07-3.92 13.71-8.15 19.92-4.24 6.2-9.79 10.27-16.66 12.2-0.44-.01-.9-.01-1.3-.01z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold tracking-tight text-white m-0">
                iPhone Duo
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 font-semibold uppercase tracking-wider">
                Concept Demo
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 m-0">
              Interactive 3D Fluid Folding Architecture
            </p>
          </div>
        </div>

        {/* Center Live Status Readout */}
        <div className="hidden md:flex items-center space-x-3 text-xs bg-white/5 border border-white/10 rounded-full px-4 py-1.5 shadow-sm">
          <span className="flex items-center space-x-1.5 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-white font-semibold">{Math.round(timelineState.angle)}°</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="text-zinc-300 font-medium">{activeFinishConfig.name}</span>
          <span className="text-white/20">•</span>
          <span className="text-zinc-400">Left Rise: {Math.round(timelineState.leftOffsetY)}px</span>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>
        </div>
      </header>

      {/* Main 3D Interactive Stage Area */}
      <main className="relative flex-1 w-full flex items-center justify-center my-auto min-h-[600px] h-[600px]">
        <DeviceContainer
          timelineState={timelineState}
          finish={activeFinishConfig}
          activeApp={activeApp}
          setActiveApp={setActiveApp}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setFinish={setFinish}
          notes={notes}
          setNotes={setNotes}
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          isLocked={isLocked}
          cameraPreset={cameraPreset}
          onPresetChange={setCameraPreset}
          reducedMotion={reducedMotion}
        />

        {/* Subtle 3D Orbit Tip on stage */}
        <div className="absolute bottom-2 left-6 pointer-events-none text-[11px] text-white/40 flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span>Click & drag stage to rotate in 3D • Arrow keys or Space to fold</span>
        </div>
      </main>

      {/* Floating Bottom Glass Control Island */}
      <footer className="relative z-40 w-full pt-1">
        <ControlPanel
          timelineState={timelineState}
          onSetAngle={setAngle}
          onTogglePlayback={togglePlayback}
          onSetSpeed={setSpeed}
          finish={finish}
          onSetFinish={setFinish}
          cameraPreset={cameraPreset}
          onSetCameraPreset={setCameraPreset}
          activeApp={activeApp}
          onSetActiveApp={setActiveApp}
          isLocked={isLocked}
          onToggleLock={() => setIsLocked(!isLocked)}
          onReset={handleReset}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
          onOpenHelp={() => setShowHelp(true)}
        />

        {/* Disclaimer Bar */}
        <div className="pb-3 text-center text-[10px] text-zinc-500 select-none">
          Simulated prototype concept interface created for demonstration purposes. Not an official Apple product or iOS release.
        </div>
      </footer>

      {/* Shortcuts Modal */}
      <KeyboardShortcutsModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}

export default App;
