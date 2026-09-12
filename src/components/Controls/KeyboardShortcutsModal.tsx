import React from 'react';
import { X, Command, Sliders, Play, RotateCcw, Smartphone } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Play / Pause continuous folding animation' },
    { key: '← / →', desc: 'Fine adjustment of hinge angle (±2°)' },
    { key: '↓ / ↑', desc: 'Step fold toward closed (0°) or open (180°)' },
    { key: '1', desc: 'Jump to Fully Closed (0°)' },
    { key: '2', desc: 'Jump to Halfway Flex (90°)' },
    { key: '3', desc: 'Jump to Fully Open (180°)' },
    { key: 'F', desc: 'Cycle Titanium Finish' },
    { key: 'R', desc: 'Reset device to 180° and front orientation' },
    { key: 'L', desc: 'Lock / Unlock device display' },
    { key: 'Drag', desc: 'Click and drag canvas to freely orbit in 3D' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="glass-control rounded-3xl max-w-md w-full p-6 border border-white/20 shadow-2xl text-left">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Command className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Keyboard Shortcuts</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-2.5">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between text-xs">
              <span className="text-zinc-300">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-white/10 border border-white/15 font-mono text-[11px] text-white font-semibold">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white shadow-md transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
