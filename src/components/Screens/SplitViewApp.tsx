import React, { useState } from 'react';
import { 
  ChevronLeft, Compass, Search, RefreshCw, 
  ExternalLink, FileText, Image as ImageIcon, Music, Play, Pause, Sparkles 
} from 'lucide-react';
import type { NoteItem } from '../../types';

interface SplitViewAppProps {
  notes: NoteItem[];
  onBack: () => void;
  panel?: 'left' | 'right' | 'full' | 'outer';
}

export const SplitViewApp: React.FC<SplitViewAppProps> = ({ notes, onBack, panel = 'full' }) => {
  const [url, setUrl] = useState('apple.com/iphone-duo');
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // If left panel in dual-screen
  if (panel === 'left') {
    return (
      <div className="flex flex-col h-full bg-[#1c1c1e] text-white p-4 select-none">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <button onClick={onBack} className="flex items-center text-blue-400 text-xs font-semibold">
            <ChevronLeft className="w-4 h-4 mr-0.5" /> Close Split
          </button>
          <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Notes (Left App)</span>
          </div>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">Live</span>
        </div>

        <div className="mt-3 flex-1 flex flex-col text-left">
          <div className="text-sm font-bold text-amber-400 mb-1">{notes[0]?.title || 'Keynote Notes'}</div>
          <div className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-white/5 flex-1 overflow-y-auto">
            {notes[0]?.content}
            <div className="mt-4 pt-3 border-t border-white/10 text-white/50 text-[10px]">
              • Safari link dragged from right panel<br />
              • Instant cross-panel drag and drop enabled
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Right panel: Safari browser
  if (panel === 'right') {
    return (
      <div className="flex flex-col h-full bg-[#121214] text-white select-none">
        {/* Safari URL search bar */}
        <div className="p-3 bg-zinc-900 border-b border-white/10 flex items-center space-x-2">
          <div className="flex-1 flex items-center bg-zinc-800/90 rounded-xl px-3 py-1.5 border border-white/10">
            <Search className="w-3.5 h-3.5 text-zinc-400 mr-2" />
            <span className="text-xs text-white font-mono flex-1 text-left">{url}</span>
            <RefreshCw className="w-3 h-3 text-zinc-400" />
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 p-4 overflow-y-auto text-left space-y-4">
          <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-2xl p-4 border border-blue-500/20">
            <div className="flex items-center space-x-1.5 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apple Special Event</span>
            </div>
            <h3 className="text-base font-bold text-white">iPhone Duo</h3>
            <p className="text-xs text-zinc-300 mt-1 leading-snug">
              Two displays. Zero compromises. The world's most fluid foldable architecture.
            </p>
          </div>

          <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/5 text-xs text-zinc-300 space-y-2">
            <div className="font-bold text-white text-xs">Simultaneous Dual Execution:</div>
            <p className="text-[11px] text-zinc-400">
              Run full iPadOS-class multitasking with separate window buffers on both panels without frame drops or UI rebuilding.
            </p>
          </div>

          {/* Interactive music mini widget in Safari */}
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Apple Music Stream</div>
                <div className="text-[9px] text-zinc-400">Spatial Audio with Dolby Atmos</div>
              </div>
            </div>
            <button 
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Outer Screen adaptive view
  return (
    <div className="flex flex-col h-full bg-[#121214] text-white p-3 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <button onClick={onBack} className="flex items-center text-blue-400 text-xs font-semibold">
          <ChevronLeft className="w-4 h-4 mr-0.5" /> Back
        </button>
        <span className="text-xs font-bold">Split View Multitask</span>
        <span className="w-10"></span>
      </div>
      <div className="mt-4 p-3 bg-zinc-900 rounded-xl border border-white/10 text-xs text-zinc-300">
        Open the phone to 180° to experience dual side-by-side multitasking with Notes & Safari.
      </div>
    </div>
  );
};
