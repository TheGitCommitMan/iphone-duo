import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, ZapOff, RefreshCw, Circle, 
  Sparkles, Camera as CameraIcon, ChevronLeft, Video 
} from 'lucide-react';
import { CURATED_PHOTOS } from '../../constants/device';

interface CameraAppProps {
  onBack: () => void;
  panel?: 'left' | 'right' | 'full' | 'outer';
}

export const CameraApp: React.FC<CameraAppProps> = ({ onBack, panel = 'full' }) => {
  const [zoom, setZoom] = useState<'0.5x' | '1x' | '2x' | '5x'>('1x');
  const [mode, setMode] = useState<'PHOTO' | 'PORTRAIT' | 'VIDEO' | 'CINEMATIC'>('PHOTO');
  const [flash, setFlash] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [capturedThumb, setCapturedThumb] = useState<string>(CURATED_PHOTOS[0].url);
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle webcam stream toggle if user wants real camera preview
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useWebcam) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(() => {
          setUseWebcam(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [useWebcam]);

  const handleShutter = () => {
    // Trigger shutter flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 120);

    // Cycle through images as new captured photo
    const randomIndex = Math.floor(Math.random() * CURATED_PHOTOS.length);
    setCapturedThumb(CURATED_PHOTOS[randomIndex].url);
  };

  const modes: ('PHOTO' | 'PORTRAIT' | 'VIDEO' | 'CINEMATIC')[] = ['CINEMATIC', 'VIDEO', 'PHOTO', 'PORTRAIT'];

  return (
    <div className="relative h-full w-full bg-black text-white flex flex-col justify-between select-none overflow-hidden">
      {/* Shutter White Flash Overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white z-50 transition-opacity duration-100" />
      )}

      {/* Top Camera Bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2 bg-black/40 backdrop-blur-md z-20">
        <button onClick={onBack} className="p-1 rounded-full bg-white/10 hover:bg-white/20">
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setFlash(!flash)}
            className={`p-1 rounded-full ${flash ? 'text-amber-400 bg-amber-400/20' : 'text-white'}`}
          >
            {flash ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => setUseWebcam(!useWebcam)}
            className={`text-[10px] px-2 py-0.5 rounded-full border ${useWebcam ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-white/30 text-white/70'}`}
          >
            {useWebcam ? 'Live WebCam ON' : 'Simulated Sensor'}
          </button>
        </div>

        <div className="w-6"></div>
      </div>

      {/* Viewfinder Center Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-zinc-950">
        {useWebcam ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-transform duration-300 ${
              zoom === '0.5x' ? 'scale-75' : zoom === '2x' ? 'scale-150' : zoom === '5x' ? 'scale-225' : 'scale-100'
            }`}
          />
        ) : (
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
              alt="Viewfinder scenic"
              className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                zoom === '0.5x' ? 'scale-90' : zoom === '2x' ? 'scale-150' : zoom === '5x' ? 'scale-225' : 'scale-100'
              }`}
            />
            {/* Viewfinder crosshair focus bracket */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 border border-amber-400/80 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>
            </div>
            {/* Exposure / aperture label */}
            <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-[9px] font-mono text-white/80">
              f/1.6 • 1/120s • ISO 64
            </div>
          </div>
        )}

        {/* Zoom Selector Pill */}
        <div className="absolute bottom-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 z-20">
          {(['0.5x', '1x', '2x', '5x'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setZoom(lvl)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                zoom === lvl
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Camera Controls & Shutter */}
      <div className="bg-black/90 px-5 pt-2 pb-4 flex flex-col items-center select-none z-20">
        {/* Mode Selector */}
        <div className="flex items-center justify-center space-x-4 mb-3 text-[10px] font-bold tracking-widest text-white/50">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`transition-colors ${mode === m ? 'text-amber-400 scale-105' : 'hover:text-white/80'}`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Shutter row */}
        <div className="flex items-center justify-between w-full max-w-[280px]">
          {/* Recent thumbnail */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 shadow">
            <img src={capturedThumb} alt="Recent capture" className="w-full h-full object-cover" />
          </div>

          {/* Shutter Button */}
          <button
            onClick={handleShutter}
            className="relative w-16 h-16 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform hover:brightness-110 cursor-pointer"
          >
            <div className={`w-13 h-13 rounded-full ${mode === 'VIDEO' ? 'bg-rose-500 rounded-lg w-8 h-8' : 'bg-white'} transition-all`} />
          </button>

          {/* Flip camera button */}
          <button 
            onClick={() => setZoom(prev => prev === '1x' ? '0.5x' : '1x')}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 active:rotate-180 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
