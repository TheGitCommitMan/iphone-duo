import React from 'react';
import { 
  Play, Pause, RotateCcw, Lock, Unlock, 
  Eye, Sliders, Smartphone, Sparkles, FastForward, 
  HelpCircle, Monitor 
} from 'lucide-react';
import type { 
  DeviceFinish, CameraPreset, AppId, FoldingTimelineState 
} from '../../types';
import { FINISHES } from '../../constants/device';

interface ControlPanelProps {
  timelineState: FoldingTimelineState;
  onSetAngle: (angle: number) => void;
  onTogglePlayback: () => void;
  onSetSpeed: (speed: number) => void;
  finish: DeviceFinish;
  onSetFinish: (finish: DeviceFinish) => void;
  cameraPreset: CameraPreset;
  onSetCameraPreset: (preset: CameraPreset) => void;
  activeApp: AppId;
  onSetActiveApp: (app: AppId) => void;
  isLocked: boolean;
  onToggleLock: () => void;
  onReset: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenHelp: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  timelineState,
  onSetAngle,
  onTogglePlayback,
  onSetSpeed,
  finish,
  onSetFinish,
  cameraPreset,
  onSetCameraPreset,
  activeApp,
  onSetActiveApp,
  isLocked,
  onToggleLock,
  onReset,
  reducedMotion,
  onToggleReducedMotion,
  onOpenHelp,
}) => {
  const { angle, isPlaying, speed } = timelineState;

  // Determine state label
  const stateLabel =
    angle <= 5
      ? 'Fully Closed (0°)'
      : angle >= 175
      ? 'Fully Open (180°)'
      : Math.abs(angle - 90) <= 8
      ? 'Halfway Flex (90°)'
      : `${Math.round(angle)}° Flex`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 z-40 select-none pb-4">
      {/* Floating Glass Control Island */}
      <div className="glass-control rounded-3xl p-4 md:p-5 border border-white/15 shadow-2xl backdrop-blur-2xl text-white">
        {/* Top Row: Hinge Angle Slider + Quick Presets + Play/Pause */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Main Hinge Slider & State Indicator */}
          <div className="lg:col-span-6 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                <span className="font-semibold uppercase tracking-wider text-white/90">Hinge Angle</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 font-mono text-[11px] font-bold">
                  {stateLabel}
                </span>
              </div>
            </div>

            {/* Range Slider */}
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-mono text-white/50 w-6 text-right">0°</span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="0.5"
                  value={angle}
                  onChange={(e) => onSetAngle(parseFloat(e.target.value))}
                  className="w-full h-2 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />
                {/* 90 degree tick marker */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-1 h-3 bg-white/40 pointer-events-none rounded-xs"
                  title="90° Halfway"
                />
              </div>
              <span className="text-[11px] font-mono text-white/50 w-8 text-left">180°</span>
            </div>

            {/* Quick Angle Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => onSetAngle(0)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  angle < 10
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
                }`}
              >
                Closed (0°)
              </button>
              <button
                onClick={() => onSetAngle(90)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  Math.abs(angle - 90) < 10
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
                }`}
              >
                Halfway (90°)
              </button>
              <button
                onClick={() => onSetAngle(180)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  angle > 170
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
                }`}
              >
                Open (180°)
              </button>
            </div>
          </div>

          {/* Playback Controls & Speed */}
          <div className="lg:col-span-3 flex flex-col space-y-2 border-t lg:border-t-0 lg:border-l border-white/10 pt-3 lg:pt-0 lg:pl-4">
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider text-left">
              Animation Loop
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={onTogglePlayback}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 border transition-all shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-300 shadow-amber-500/20'
                    : 'bg-white text-black hover:bg-white/90 border-white shadow-white/20'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Auto Fold</span>
                  </>
                )}
              </button>

              {/* Speed Pills */}
              <div className="flex bg-white/10 rounded-xl p-0.5 border border-white/10 text-[11px] font-bold">
                {[0.5, 1, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => onSetSpeed(s)}
                    className={`px-2 py-1.5 rounded-lg transition-all ${
                      speed === s ? 'bg-white/25 text-white shadow-xs' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Utility Reset & Lock buttons */}
            <div className="flex items-center space-x-2 pt-0.5">
              <button
                onClick={onToggleLock}
                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-medium border flex items-center justify-center space-x-1 transition-all ${
                  isLocked ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70'
                }`}
              >
                {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
              </button>

              <button
                onClick={onReset}
                className="py-1 px-2.5 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 flex items-center space-x-1"
                title="Reset device to flat 180° and front view"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>

              <button
                onClick={onOpenHelp}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70"
                title="Keyboard shortcuts & help"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Titanium Finish Picker */}
          <div className="lg:col-span-3 flex flex-col space-y-2 border-t lg:border-t-0 lg:border-l border-white/10 pt-3 lg:pt-0 lg:pl-4">
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider text-left">
              Chassis Finish
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(FINISHES) as DeviceFinish[]).map((fKey) => {
                const f = FINISHES[fKey];
                const isSelected = finish === fKey;
                return (
                  <button
                    key={fKey}
                    onClick={() => onSetFinish(fKey)}
                    className={`flex items-center space-x-2 p-1.5 rounded-xl border text-[11px] transition-all text-left ${
                      isSelected
                        ? 'bg-white/15 border-white/50 text-white font-bold ring-1 ring-white/30'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-inner"
                      style={{ background: f.chassisColor }}
                    />
                    <span className="truncate">{f.name.replace(' Titanium', '')}</span>
                  </button>
                );
              })}
            </div>

            {/* 3D Perspective Presets */}
            <div className="flex items-center space-x-1 pt-1 overflow-x-auto">
              {(['front', 'showcase', 'flex', 'hinge', 'back'] as CameraPreset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onSetCameraPreset(p)}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-md capitalize border transition-all shrink-0 ${
                    cameraPreset === p
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/5 border-white/5 text-white/50 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Interactive Apps Quick Switcher Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1.5 text-white/50 text-[11px]">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-white/80">Interactive Apps:</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'photos', label: 'Photos' },
                { id: 'notes', label: 'Notes' },
                { id: 'camera', label: 'Camera' },
                { id: 'settings', label: 'Settings' },
                { id: 'split', label: 'Split View' },
                { id: 'standby', label: 'StandBy (90°)' },
              ] as const
            ).map((app) => (
              <button
                key={app.id}
                onClick={() => onSetActiveApp(app.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  activeApp === app.id
                    ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                    : 'bg-white/5 hover:bg-white/15 text-white/70 border-white/10'
                }`}
              >
                {app.label}
              </button>
            ))}
          </div>

          <button
            onClick={onToggleReducedMotion}
            className={`text-[11px] px-2.5 py-1 rounded-lg border flex items-center space-x-1 transition-all ${
              reducedMotion ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
            }`}
            title="Toggle reduced motion preference"
          >
            <Monitor className="w-3 h-3" />
            <span>{reducedMotion ? 'Reduced Motion: ON' : 'ProMotion 120Hz'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
