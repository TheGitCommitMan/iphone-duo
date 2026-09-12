import React, { useState } from 'react';
import { ChevronLeft, Heart, Share2, Info, Sparkles, Play, Pause, Trash2 } from 'lucide-react';
import { CURATED_PHOTOS } from '../../constants/device';
import type { PhotoItem } from '../../types';

interface PhotosAppProps {
  onBack: () => void;
  panel?: 'left' | 'right' | 'full' | 'outer';
}

export const PhotosApp: React.FC<PhotosAppProps> = ({ onBack, panel = 'full' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ p1: true });
  const [activeTab, setActiveTab] = useState<'library' | 'memories'>('library');
  const [isPlayingMemory, setIsPlayingMemory] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // If in lightbox photo viewer
  if (selectedPhoto) {
    return (
      <div className="relative h-full flex flex-col justify-between bg-black text-white select-none">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-2 pb-2 bg-black/60 backdrop-blur-md z-10">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="flex items-center text-blue-400 text-xs font-semibold hover:text-blue-300"
          >
            <ChevronLeft className="w-4 h-4 mr-0.5" /> Photos
          </button>
          <div className="text-center">
            <div className="text-xs font-bold truncate max-w-[140px]">{selectedPhoto.title}</div>
            <div className="text-[10px] text-white/50">{selectedPhoto.date}</div>
          </div>
          <button 
            onClick={(e) => toggleFavorite(selectedPhoto.id, e)}
            className="text-white hover:text-rose-400 transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${favorites[selectedPhoto.id] ? 'text-rose-500 fill-rose-500' : 'text-white'}`} 
            />
          </button>
        </div>

        {/* Center photo display */}
        <div className="flex-1 flex items-center justify-center p-2 relative overflow-hidden">
          <img 
            src={selectedPhoto.url} 
            alt={selectedPhoto.title}
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
          />
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-black/60 backdrop-blur-md border-t border-white/10 text-white/80 z-10">
          <button className="hover:text-blue-400"><Share2 className="w-4 h-4" /></button>
          <div className="text-[11px] text-white/60 font-medium">
            {selectedPhoto.location}
          </div>
          <button className="hover:text-blue-400"><Info className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  // Left panel view in dual screen
  if (panel === 'left') {
    return (
      <div className="flex flex-col h-full bg-zinc-950/90 text-white p-4 select-none">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center text-blue-400 text-xs font-semibold">
            <ChevronLeft className="w-4 h-4 mr-0.5" /> Back
          </button>
          <h2 className="text-sm font-bold">Memories & Albums</h2>
          <span className="w-10"></span>
        </div>

        {/* Featured Memory Card */}
        <div className="relative rounded-2xl overflow-hidden h-44 shadow-lg mb-4 border border-white/15">
          <img src={CURATED_PHOTOS[0].url} alt="Memory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/50 text-[10px] text-amber-300 border border-white/15">
            <Sparkles className="w-3 h-3" />
            <span>Memory Video</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div>
              <div className="text-sm font-bold leading-tight">{CURATED_PHOTOS[0].title}</div>
              <div className="text-[10px] text-white/70">{CURATED_PHOTOS[0].location}</div>
            </div>
            <button 
              onClick={() => setIsPlayingMemory(!isPlayingMemory)}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlayingMemory ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Album Collections */}
        <div className="space-y-2 flex-1 overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider text-left">Collections</div>
          {CURATED_PHOTOS.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="flex items-center space-x-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
            >
              <img src={photo.url} alt={photo.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold text-white">{photo.title}</div>
                <div className="text-[10px] text-white/50">{photo.location}</div>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-white/30 rotate-180" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Right panel or single/outer screen view
  return (
    <div className="flex flex-col h-full bg-zinc-950/90 text-white p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={onBack} className="flex items-center text-blue-400 text-xs font-semibold">
          <ChevronLeft className="w-4 h-4 mr-0.5" /> Back
        </button>
        <div className="flex rounded-lg bg-white/10 p-0.5 text-[11px] font-medium">
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-2.5 py-1 rounded-md transition-all ${activeTab === 'library' ? 'bg-white/20 text-white font-bold' : 'text-white/60'}`}
          >
            Library
          </button>
          <button 
            onClick={() => setActiveTab('memories')}
            className={`px-2.5 py-1 rounded-md transition-all ${activeTab === 'memories' ? 'bg-white/20 text-white font-bold' : 'text-white/60'}`}
          >
            Favorites
          </button>
        </div>
        <span className="text-xs text-white/40 font-mono">4 items</span>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-1">
        {CURATED_PHOTOS.filter(p => activeTab === 'library' || favorites[p.id]).map((photo) => (
          <div 
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="relative rounded-xl overflow-hidden aspect-square cursor-pointer group border border-white/10 hover:border-white/30 transition-all"
          >
            <img 
              src={photo.url} 
              alt={photo.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center text-white">
              <span className="text-[10px] font-medium truncate drop-shadow">{photo.title}</span>
              <button 
                onClick={(e) => toggleFavorite(photo.id, e)}
                className="p-1 hover:scale-125 transition-transform"
              >
                <Heart 
                  className={`w-3.5 h-3.5 ${favorites[photo.id] ? 'text-rose-500 fill-rose-500' : 'text-white/80'}`} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer count */}
      <div className="text-center pt-2 text-[10px] text-white/40">
        All Photos Synced with iCloud • iPhone Duo Super Retina XDR
      </div>
    </div>
  );
};
