export type DeviceFinish = 'natural' | 'black' | 'silver' | 'desert';

export type AppId = 'home' | 'photos' | 'notes' | 'camera' | 'settings' | 'split' | 'standby';

export type CameraPreset = 'front' | 'showcase' | 'flex' | 'hinge' | 'back';

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  location: string;
  date: string;
  url: string;
  aspect: string;
}

export interface FinishConfig {
  id: DeviceFinish;
  name: string;
  chassisColor: string;
  railGradient: string;
  bevelGradient: string;
  antennaBand: string;
  hingeSpine: string;
  hingeHighlight: string;
  accentColor: string;
}

export interface FoldingTimelineState {
  angle: number;           // Current interpolated hinge angle (0 to 180)
  targetAngle: number;     // Target angle set by user or playback
  isPlaying: boolean;      // Continuous folding playback active
  speed: number;           // Playback speed multiplier: 0.5, 1, 2
  openProgress: number;    // 0 = closed, 1 = fully open (180 deg)
  leftOffsetY: number;     // Vertical displacement of left screen content (px)
  leftBlur: number;        // Blur filter applied to left screen (px)
  leftDarkness: number;    // Shading opacity on left panel (0 to 1)
  hingeShadow: number;     // Crease shadow intensity (0 to 1)
  centerOffsetX: number;   // Horizontal offset to keep device perfectly centered
}
