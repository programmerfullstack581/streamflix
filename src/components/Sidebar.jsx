import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Heart, 
  Download, 
  Music, 
  Radio, 
  Sparkles,
  Smartphone,
  ListMusic,
  Disc3,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  likedCount = 0,
  downloadsCount = 0,
  customPlaylists = [],
  onCreatePlaylist,
  onSelectPlaylist
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    onCreatePlaylist(newPlaylistName.trim());
    setNewPlaylistName('');
    setIsCreating(false);
  };

  return (
    <aside className="w-64 bg-[#000000] flex flex-col h-full p-2 space-y-2 select-none flex-shrink-0 hidden md:flex">
      
      {/* Top Box: Brand & Navigation */}
      <div className="bg-[#121212] rounded-xl p-4 space-y-4">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('inicio')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 text-black font-black" />
          </div>
          <div>
            <span className="text-xl font-black text-white tracking-tight">Streamify</span>
            <span className="text-[10px] ml-1.5 font-bold uppercase tracking-wider text-[#1DB954] bg-[#1DB954]/10 px-1.5 py-0.2 rounded border border-[#1DB954]/30">
              PRO
            </span>
          </div>
        </div>

        {/* Main Nav Items */}
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('inicio')}
            className={`w-full flex items-center space-x-4 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'inicio' 
                ? 'text-white bg-[#282828]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab('buscar')}
            className={`w-full flex items-center space-x-4 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'buscar' 
                ? 'text-white bg-[#282828]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Buscar & Explorar</span>
          </button>

          <button
            onClick={() => setActiveTab('descargas')}
            className={`w-full flex items-center space-x-4 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'descargas' 
                ? 'text-white bg-[#282828]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Download className="w-5 h-5" />
            <div className="flex items-center justify-between flex-1">
              <span>Descargas / MP3</span>
              {downloadsCount > 0 && (
                <span className="text-[10px] bg-[#1DB954] text-black font-black px-1.5 py-0.2 rounded-full">
                  {downloadsCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Box: Library & Playlists */}
      <div className="bg-[#121212] rounded-xl flex-1 p-3 flex flex-col overflow-hidden">
        
        {/* Library Header */}
        <div className="flex items-center justify-between px-2 py-2 mb-2">
          <div 
            onClick={() => setActiveTab('biblioteca')}
            className="flex items-center space-x-3 text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            <Library className="w-6 h-6" />
            <span className="text-sm font-bold">Tu Biblioteca</span>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            title="Crear Playlist"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Create Playlist Input */}
        {isCreating && (
          <form onSubmit={handleCreate} className="p-2 bg-[#202020] rounded-xl mb-2 space-y-2 animate-fadeIn">
            <input
              type="text"
              placeholder="Nombre de la playlist..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
              className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954]"
            />
            <div className="flex items-center justify-end space-x-2 text-xs">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-2.5 py-1 text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-[#1DB954] text-black font-bold rounded-lg hover:bg-[#1ed760]"
              >
                Crear
              </button>
            </div>
          </form>
        )}

        {/* Playlists List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          
          {/* Liked Songs Pinned */}
          <div
            onClick={() => setActiveTab('favoritos')}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === 'favoritos' ? 'bg-[#282828]' : 'hover:bg-white/5'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center flex-shrink-0 shadow">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Canciones que te gustan</p>
              <p className="text-[10px] text-gray-400 flex items-center space-x-1">
                <span className="text-[#1DB954] font-bold">Favoritos</span>
                <span>•</span>
                <span>{likedCount} canciones</span>
              </p>
            </div>
          </div>

          {/* Custom Playlists */}
          {customPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => {
                if (onSelectPlaylist) onSelectPlaylist(pl);
                setActiveTab('playlist-detail');
              }}
              className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#282828] flex items-center justify-center flex-shrink-0 group-hover:bg-[#333]">
                <ListMusic className="w-5 h-5 text-gray-400 group-hover:text-[#1DB954]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-200 group-hover:text-white truncate">{pl.name}</p>
                <p className="text-[10px] text-gray-500">Playlist • {pl.tracks?.length || 0} canciones</p>
              </div>
            </div>
          ))}

          {customPlaylists.length === 0 && !isCreating && (
            <div className="p-3 text-center text-gray-500 space-y-1">
              <p className="text-xs">Crea tu primera playlist con el botón + de arriba.</p>
            </div>
          )}

        </div>

        {/* Quality Banner Footer */}
        <div className="pt-2 border-t border-white/5 mt-auto">
          <div className="p-2.5 bg-gradient-to-r from-emerald-950/40 to-transparent border border-emerald-500/20 rounded-xl">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1DB954]" />
              <span className="text-[11px] font-bold text-white">Audio Hi-Fi 320 kbps</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">Descargas ilimitadas en MP3, FLAC y WAV</p>
          </div>
        </div>

      </div>

    </aside>
  );
}
