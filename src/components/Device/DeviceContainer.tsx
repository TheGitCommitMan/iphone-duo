import React, { useRef, useState, useEffect } from 'react';
import type { 
  FinishConfig, AppId, NoteItem, CameraPreset, FoldingTimelineState 
} from '../../types';
import { DEVICE_DIMENSIONS } from '../../constants/device';
import { LeftLeaf } from './LeftLeaf';
import { RightLeaf } from './RightLeaf';
import { HingeSpine } from './HingeSpine';

interface DeviceContainerProps {
  timelineState: FoldingTimelineState;
  finish: FinishConfig;
  activeApp: AppId;
  setActiveApp: (app: AppId) => void;
  wallpaper: string;
  setWallpaper: (wp: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  setFinish: (finish: any) => void;
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
  activeNoteId: string;
  setActiveNoteId: (id: string) => void;
  isLocked: boolean;
  cameraPreset: CameraPreset;
  onPresetChange: (preset: CameraPreset) => void;
  reducedMotion: boolean;
}

export const DeviceContainer: React.FC<DeviceContainerProps> = ({
  timelineState,
  finish,
  activeApp,
  setActiveApp,
  wallpaper,
  setWallpaper,
  isDarkMode,
  setIsDarkMode,
  setFinish,
  notes,
  setNotes,
  activeNoteId,
  setActiveNoteId,
  isLocked,
  cameraPreset,
  onPresetChange,
  reducedMotion,
}) => {
  const { panelWidth, panelHeight } = DEVICE_DIMENSIONS;

  // 3D Orbit orientation angles
  const [pitch, setPitch] = useState<number>(0);
  const [yaw, setYaw] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startPitch: number; startYaw: number }>({
    x: 0,
    y: 0,
    startPitch: 0,
    startYaw: 0,
  });

  // Camera preset positions
  useEffect(() => {
    switch (cameraPreset) {
      case 'front':
        setPitch(0);
        setYaw(0);
        break;
      case 'showcase':
        setPitch(12);
        setYaw(-22);
        break;
      case 'flex':
        setPitch(16);
        setYaw(-42);
        break;
      case 'hinge':
        setPitch(4);
        setYaw(-78);
        break;
      case 'back':
        setPitch(0);
        setYaw(180);
        break;
    }
  }, [cameraPreset]);

  // Touch and mouse drag orbit handling
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag if directly on the stage background or container (not on interactive screen buttons)
    if ((e.target as HTMLElement).closest('button, input, textarea, a, .group')) {
      return;
    }
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPitch: pitch,
      startYaw: yaw,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    // Map mouse movement to rotation degrees
    const nextYaw = dragStartRef.current.startYaw + dx * 0.45;
    const nextPitch = Math.max(-45, Math.min(45, dragStartRef.current.startPitch - dy * 0.45));
    setYaw(nextYaw);
    setPitch(nextPitch);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
    }
  };

  // Responsive scale to keep device comfortably framed on mobile or desktop
  const [scale, setScale] = useState<number>(0.84);
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 640) {
        setScale(Math.min(w / 440, (h - 280) / panelHeight, 0.62));
      } else if (w < 1024) {
        setScale(Math.min(w / 860, (h - 280) / panelHeight, 0.75));
      } else {
        setScale(Math.min(0.84, (h - 300) / panelHeight));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [panelHeight]);

  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{
          background: finish.accentColor,
          transform: `translate(${timelineState.centerOffsetX * 0.5}px, -20px)`,
        }}
      />

      {/* 3D Perspective Stage */}
      <div
        className="perspective-stage preserve-3d flex items-center justify-center"
        style={{
          width: `${panelWidth * 2}px`,
          height: `${panelHeight}px`,
          transform: `scale(${scale})`,
        }}
      >
        {/* Device Assembly Anchor */}
        {/* Requirement: "Keep the device centered throughout the fold." */}
        <div
          className="relative preserve-3d"
          style={{
            width: `${panelWidth * 2}px`,
            height: `${panelHeight}px`,
            transform: `
              rotateX(${pitch}deg)
              rotateY(${yaw}deg)
              translateX(${timelineState.centerOffsetX}px)
            `,
            transformStyle: 'preserve-3d',
            transition: isDragging || !reducedMotion ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {/* Dynamic Ground Shadow */}
          <div
            className="absolute left-1/2 -bottom-14 -translate-x-1/2 rounded-full pointer-events-none blur-2xl"
            style={{
              width: `${(panelWidth * (1 + timelineState.openProgress)) * 0.9}px`,
              height: '38px',
              background: 'rgba(0, 0, 0, 0.75)',
              transform: `rotateX(90deg) translateZ(-40px) scale(${0.8 + (1 - timelineState.openProgress) * 0.2})`,
            }}
          />

          {/* Left Leaf (Folds toward the right leaf) */}
          <LeftLeaf
            finish={finish}
            angle={timelineState.angle}
            openProgress={timelineState.openProgress}
            leftOffsetY={timelineState.leftOffsetY}
            leftBlur={timelineState.leftBlur}
            leftDarkness={timelineState.leftDarkness}
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

          {/* Central Hinge Spine */}
          <HingeSpine
            finish={finish}
            openProgress={timelineState.openProgress}
            hingeShadow={timelineState.hingeShadow}
          />

          {/* Right Leaf (Stationary, sharp, visible) */}
          <RightLeaf
            finish={finish}
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
    </div>
  );
};
