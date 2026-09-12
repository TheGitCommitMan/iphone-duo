import React, { useState } from 'react';
import { 
  ChevronLeft, Plus, Search, CheckSquare, 
  Share, MoreHorizontal, Trash2, Edit3, Folder 
} from 'lucide-react';
import type { NoteItem } from '../../types';

interface NotesAppProps {
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
  activeNoteId: string;
  setActiveNoteId: (id: string) => void;
  onBack: () => void;
  panel?: 'left' | 'right' | 'full' | 'outer';
}

export const NotesApp: React.FC<NotesAppProps> = ({
  notes,
  setNotes,
  activeNoteId,
  setActiveNoteId,
  onBack,
  panel = 'full',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleUpdateNote = (field: 'title' | 'content', value: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? { ...n, [field]: value, date: 'Just now' }
          : n
      )
    );
  };

  const handleAddNote = () => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: 'New Quick Note',
      content: '',
      date: 'Just now',
      category: 'General',
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (notes.length <= 1) return;
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    setActiveNoteId(remaining[0].id);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Left Panel in Dual-Screen: Sidebar List of Notes
  if (panel === 'left') {
    return (
      <div className="flex flex-col h-full bg-[#1c1c1e]/95 text-white p-4 select-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center text-amber-400 text-xs font-semibold">
            <ChevronLeft className="w-4 h-4 mr-0.5" /> Home
          </button>
          <span className="text-sm font-bold text-amber-400">All iCloud</span>
          <button 
            onClick={handleAddNote}
            className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center hover:bg-amber-400/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>

        {/* Notes List */}
        <div className="space-y-2 flex-1 overflow-y-auto pr-1">
          {filteredNotes.map((note) => {
            const isSelected = note.id === activeNote.id;
            return (
              <div
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`p-3 rounded-xl cursor-pointer text-left transition-all border ${
                  isSelected
                    ? 'bg-amber-400/20 border-amber-400/40 text-white'
                    : 'bg-zinc-900/60 border-white/5 hover:bg-zinc-800/70 text-zinc-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs truncate max-w-[200px] text-white">
                    {note.title || 'Untitled Note'}
                  </h4>
                  <span className="text-[10px] text-zinc-500 shrink-0 font-mono">
                    {note.date}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                  {note.content || 'No additional text'}
                </p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[9px] text-zinc-500">
                  <span className="flex items-center">
                    <Folder className="w-2.5 h-2.5 mr-1 text-amber-400" />
                    {note.category}
                  </span>
                  {notes.length > 1 && (
                    <button 
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className="text-zinc-500 hover:text-rose-400 p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-[10px] text-center text-zinc-500 font-medium">
          {notes.length} Notes • iCloud Storage Synced
        </div>
      </div>
    );
  }

  // Right Panel in Dual-Screen: Note Editor
  if (panel === 'right') {
    return (
      <div className="flex flex-col h-full bg-[#1c1c1e]/95 text-white p-4 select-none">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="text-[11px] text-zinc-400 font-mono">
            Edited {activeNote.date}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleUpdateNote('content', activeNote.content + '\n• ')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300"
              title="Add bullet item"
            >
              <CheckSquare className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleAddNote}
              className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 hover:bg-amber-400/30"
              title="New note"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Note Title Input */}
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => handleUpdateNote('title', e.target.value)}
          placeholder="Title"
          className="bg-transparent text-lg font-bold text-white placeholder-zinc-600 border-none outline-none mt-3 mb-2 px-1 focus:ring-0"
        />

        {/* Note Body Textarea */}
        <textarea
          value={activeNote.content}
          onChange={(e) => handleUpdateNote('content', e.target.value)}
          placeholder="Start typing your thoughts here..."
          className="flex-1 bg-transparent text-xs leading-relaxed text-zinc-200 placeholder-zinc-600 border-none outline-none resize-none px-1 focus:ring-0 font-sans"
        />

        {/* Bottom Word/Character Stats */}
        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-zinc-500">
          <span>{activeNote.content.split(/\s+/).filter(Boolean).length} words</span>
          <span className="text-amber-400/80">iPhone Duo Fluid Sync</span>
        </div>
      </div>
    );
  }

  // Outer Screen / Full view (Adaptive single screen)
  return (
    <div className="flex flex-col h-full bg-[#1c1c1e] text-white p-3 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <button onClick={onBack} className="flex items-center text-amber-400 text-xs font-semibold">
          <ChevronLeft className="w-4 h-4 mr-0.5" /> Back
        </button>
        <span className="text-xs font-bold text-amber-400">{activeNote.title}</span>
        <button onClick={handleAddNote} className="text-amber-400">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <input
        type="text"
        value={activeNote.title}
        onChange={(e) => handleUpdateNote('title', e.target.value)}
        className="bg-transparent text-sm font-bold text-white outline-none mt-2 px-1"
      />

      <textarea
        value={activeNote.content}
        onChange={(e) => handleUpdateNote('content', e.target.value)}
        placeholder="Type note..."
        className="flex-1 bg-transparent text-xs leading-relaxed text-zinc-200 outline-none resize-none px-1 mt-1 font-sans"
      />
    </div>
  );
};
