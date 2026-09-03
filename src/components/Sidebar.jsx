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
  ExternalLink,
  Zap,
  Link as LinkIcon,
  Flame
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
    <aside className="w-64 bg-[#050505] flex flex-col h-full p-2 space-y-2 select-none flex-shrink-0 hidden md:flex border-r border-red-600/10">
      
      {/* Top Box: Brand & Navigation */}
      <div className="bg-[#101010] rounded-2xl p-4 space-y-4 border border-white/5 shadow-xl">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('inicio')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-red-neon group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 text-white font-black" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black text-white tracking-tight">STREAM</span>
              <span className="text-xl font-black text-red-600 tracking-tight">BEAT</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-600/20 px-2 py-0.2 rounded-full border border-red-500/40">
              RED EDITION
            </span>
          </div>
        </div>

        {/* Main Nav Items */}
        <nav className="space-y-1.5 pt-1">
          <button
            onClick={() => setActiveTab('inicio')}
            className={`w-full flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'inicio' 
                ? 'text-white bg-red-600 shadow-red-neon font-black' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </button>

          {/* Dedicated Tab: Descargar Música con URL */}
          <button
            onClick={() => setActiveTab('descargar-url')}
            className={`w-full flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative overflow-hidden group ${
              activeTab === 'descargar-url' 
                ? 'text-white bg-gradient-to-r from-red-600 to-rose-700 shadow-red-neon font-black' 
                : 'text-red-400 hover:text-white bg-red-950/30 hover:bg-red-900/50 border border-red-600/30'
            }`}
          >
            <Zap className="w-4 h-4 text-red-400 group-hover:text-white fill-current animate-pulse" />
            <div className="flex items-center justify-between flex-1">
              <span>Descargar con URL</span>
              <span className="text-[9px] font-black px-1.5 py-0.2 bg-black/60 rounded text-white border border-red-500/40">
                MP3
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('buscar')}
            className={`w-full flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'buscar' 
                ? 'text-white bg-red-600 shadow-red-neon font-black' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Buscar & Explorar</span>
          </button>

          <button
            onClick={() => setActiveTab('descargas')}
            className={`w-full flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'descargas' 
                ? 'text-white bg-red-600 shadow-red-neon font-black' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Download className="w-4 h-4" />
            <div className="flex items-center justify-between flex-1">
              <span>Mis Descargas</span>
              {downloadsCount > 0 && (
                <span className="text-[10px] bg-white text-black font-black px-2 py-0.2 rounded-full">
                  {downloadsCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Box: Library & Playlists */}
      <div className="bg-[#101010] rounded-2xl flex-1 p-3.5 flex flex-col overflow-hidden border border-white/5">
        
        {/* Library Header */}
        <div className="flex items-center justify-between px-2 py-2 mb-2">
          <div 
            onClick={() => setActiveTab('favoritos')}
            className="flex items-center space-x-2.5 text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            <Library className="w-5 h-5 text-red-500" />
            <span className="text-xs sm:text-sm font-bold">Tu Biblioteca</span>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="Crear Playlist"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Create Playlist Input */}
        {isCreating && (
          <form onSubmit={handleCreate} className="p-2.5 bg-[#1a1a1a] rounded-xl mb-2 space-y-2 animate-fadeIn border border-red-500/30">
            <input
              type="text"
              placeholder="Nombre de tu lista..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
              className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
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
                className="px-3 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500"
              >
                Crear
              </button>
            </div>
          </form>
        )}

        {/* Playlists List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          
          {/* Liked Songs Pinned */}
          <div
            onClick={() => setActiveTab('favoritos')}
            className={`flex items-center space-x-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
              activeTab === 'favoritos' ? 'bg-red-950/60 border border-red-500/40 text-white' : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-black flex items-center justify-center flex-shrink-0 shadow-md">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Favoritos Guardados</p>
              <p className="text-[10px] text-gray-400 flex items-center space-x-1">
                <span className="text-red-400 font-bold">Colección</span>
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
              className="flex items-center space-x-3 p-2 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1e1e1e] flex items-center justify-center flex-shrink-0 group-hover:bg-red-950/40 transition-colors">
                <ListMusic className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-300 group-hover:text-white truncate">{pl.name}</p>
                <p className="text-[10px] text-gray-500">{pl.tracks?.length || 0} canciones</p>
              </div>
            </div>
          ))}

        </div>

        {/* Quick URL Download Card at Bottom */}
        <div className="pt-2 border-t border-white/5 mt-auto">
          <div 
            onClick={() => setActiveTab('descargar-url')}
            className="p-3 bg-gradient-to-r from-red-950/60 to-black border border-red-500/30 rounded-xl cursor-pointer hover:border-red-500 transition-all group"
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-xs font-black text-white group-hover:text-red-400">Pegar URL y Descargar</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">MP3 320k de YouTube, TikTok, etc.</p>
          </div>
        </div>

      </div>

    </aside>
  );
}
