import type { DeviceFinish, FinishConfig, NoteItem, PhotoItem } from '../types';

export const DEVICE_DIMENSIONS = {
  panelWidth: 370,
  panelHeight: 570,
  bezelRadius: 38,
  innerRadius: 4,
  bezelWidth: 10,
  hingeWidth: 12,
  hingeDepth: 16,
  maxLeftOffsetY: 100, // Pixels left content sits lower when closed
  maxLeftBlur: 16,     // Pixels of blur when closed
};

export const FINISHES: Record<DeviceFinish, FinishConfig> = {
  natural: {
    id: 'natural',
    name: 'Natural Titanium',
    chassisColor: '#9b978f',
    railGradient: 'linear-gradient(135deg, #a39f97 0%, #7d7972 50%, #b8b4ac 100%)',
    bevelGradient: 'linear-gradient(90deg, #d4d0c8, #6e6a64)',
    antennaBand: '#5e5a54',
    hingeSpine: 'linear-gradient(180deg, #b0aca5 0%, #87837c 50%, #5e5a53 100%)',
    hingeHighlight: 'rgba(255, 255, 255, 0.45)',
    accentColor: '#c7a97b',
  },
  black: {
    id: 'black',
    name: 'Space Black',
    chassisColor: '#1d1d1f',
    railGradient: 'linear-gradient(135deg, #2c2c2e 0%, #151516 50%, #3a3a3c 100%)',
    bevelGradient: 'linear-gradient(90deg, #48484a, #1c1c1e)',
    antennaBand: '#121214',
    hingeSpine: 'linear-gradient(180deg, #323235 0%, #1c1c1e 50%, #111112 100%)',
    hingeHighlight: 'rgba(255, 255, 255, 0.22)',
    accentColor: '#0a84ff',
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    chassisColor: '#e2e2e4',
    railGradient: 'linear-gradient(135deg, #f5f5f7 0%, #cccccc 50%, #ffffff 100%)',
    bevelGradient: 'linear-gradient(90deg, #ffffff, #a8a8aa)',
    antennaBand: '#8e8e93',
    hingeSpine: 'linear-gradient(180deg, #f0f0f2 0%, #d1d1d6 50%, #8e8e93 100%)',
    hingeHighlight: 'rgba(255, 255, 255, 0.8)',
    accentColor: '#30d158',
  },
  desert: {
    id: 'desert',
    name: 'Desert Titanium',
    chassisColor: '#bfa38b',
    railGradient: 'linear-gradient(135deg, #ceb49e 0%, #9e846f 50%, #e0c8b3 100%)',
    bevelGradient: 'linear-gradient(90deg, #f0dfce, #8a705c)',
    antennaBand: '#6e5645',
    hingeSpine: 'linear-gradient(180deg, #d6bc9f 0%, #a88e73 50%, #735b44 100%)',
    hingeHighlight: 'rgba(255, 240, 220, 0.5)',
    accentColor: '#ff9f0a',
  },
};

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: '1',
    title: 'iPhone Duo Architecture',
    content: 'Dual Super Retina XDR panels connected with a titanium micro-gear spine. When unfolded, the left panel content smoothly rises 100px into unified alignment while blur clears seamlessly.',
    date: '9:41 AM',
    category: 'Engineering',
  },
  {
    id: '2',
    title: 'WWDC Keynote Talking Points',
    content: '• Split View multitasking with drag-and-drop\n• Zero-crease fluid display substrate\n• StandBy 90-degree tent mode for bedside charging\n• Continuity across cover and inner canvases',
    date: 'Yesterday',
    category: 'Keynote',
  },
  {
    id: '3',
    title: 'Haptic Hinge Feedback',
    content: 'Rotational resistance profile tuned to 42mN·m with magnetic lock detents at 0°, 90°, and 180° degrees.',
    date: 'Sep 10',
    category: 'Hardware',
  },
];

export const CURATED_PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    title: 'Big Sur Golden Hour',
    location: 'Pacific Coast Highway, CA',
    date: 'Sep 12, 2026',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    aspect: 'wide',
  },
  {
    id: 'p2',
    title: 'Kyoto Bamboo Forest',
    location: 'Arashiyama, Japan',
    date: 'Aug 28, 2026',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait',
  },
  {
    id: 'p3',
    title: 'Minimalist Architecture',
    location: 'Valencia, Spain',
    date: 'Aug 15, 2026',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    aspect: 'square',
  },
  {
    id: 'p4',
    title: 'Dolomites Alpine Ridge',
    location: 'South Tyrol, Italy',
    date: 'Jul 22, 2026',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    aspect: 'wide',
  },
];

export const WALLPAPERS = [
  {
    id: 'aurora',
    name: 'Duo Aurora',
    gradient: 'radial-gradient(ellipse at top left, #1d2671 0%, #c33764 50%, #0c0824 100%)',
  },
  {
    id: 'titanium',
    name: 'Titanium Waves',
    gradient: 'radial-gradient(circle at 60% 40%, #3a3f58 0%, #171822 55%, #08090e 100%)',
  },
  {
    id: 'solar',
    name: 'Solar Flare',
    gradient: 'radial-gradient(ellipse at bottom, #f12711 0%, #f5af19 45%, #140d07 100%)',
  },
  {
    id: 'deepspace',
    name: 'Deep Space',
    gradient: 'linear-gradient(180deg, #090a0f 0%, #1b1e2e 50%, #050608 100%)',
  },
];
