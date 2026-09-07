import React from 'react';
import { 
  Play, 
  Pause, 
  Heart, 
  Download, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Radio, 
  Disc3,
  ChevronRight,
  Zap,
  Link as LinkIcon
} from 'lucide-react';
import { 
  CURATED_TOP_HITS, 
  FEATURED_PLAYLISTS, 
  TOP_ARTISTS, 
  GENRES_CATEGORIES 
} from '../services/musicService';

export default function HomeView({
  onPlayTrack,
  currentTrack,
  isPlaying,
  onToggleLike,
  likedTrackIds = [],
  onOpenDownload,
  onSelectGenre,
  onSelectArtist,
  onGoToUrlDownload
}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="space-y-8 pb-32 animate-fadeIn">
      
      {/* Red & Black Hero Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-red-950 via-[#181818] to-black rounded-3xl border border-red-600/30 shadow-red-neon relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 z-10 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/20 border border-red-500/40 rounded-full">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-xs font-black tracking-wider uppercase text-red-400">
              Plataforma de Música & Descargas
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {greeting} — Escucha & Descarga en <span className="text-red-500">MP3 320k</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Disfruta de streaming ilimitado sin cortes y descarga cualquier canción directamente por URL en formato MP3 o FLAC.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onGoToUrlDownload}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm rounded-xl transition-transform hover:scale-105 shadow-red-neon flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Descargar con URL Directo</span>
            </button>
            <button
              onClick={() => onPlayTrack(CURATED_TOP_HITS[0])}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center space-x-2 border border-white/10"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Reproducir Éxitos</span>
            </button>
          </div>
        </div>

        {/* Featured Card */}
        <div className="z-10 w-full sm:w-72 bg-[#101010]/90 border border-red-600/30 rounded-2xl p-4 shadow-2xl flex items-center space-x-4 flex-shrink-0">
          <img
            src={CURATED_TOP_HITS[0].thumbnail}
            alt=""
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-red-600/60 shadow-lg"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-black uppercase text-red-400 tracking-wider">#1 TENDENCIA HOY</span>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">{CURATED_TOP_HITS[0].title}</h4>
            <p className="text-[11px] text-gray-400 truncate">{CURATED_TOP_HITS[0].artist}</p>
          </div>
          <button
            onClick={() => onPlayTrack(CURATED_TOP_HITS[0])}
            className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform flex-shrink-0"
          >
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* 6 Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CURATED_TOP_HITS.slice(0, 6).map((track) => {
          const isThisPlaying = currentTrack?.videoId === track.videoId && isPlaying;
          return (
            <div
              key={track.videoId}
              onClick={() => onPlayTrack(track)}
              className="group flex items-center bg-[#141414] hover:bg-[#1e1e1e] border border-white/5 hover:border-red-600/30 rounded-xl overflow-hidden cursor-pointer transition-all shadow-md"
            >
              <img 
                src={track.thumbnail} 
                alt={track.title} 
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover flex-shrink-0 shadow-md"
              />
              <div className="flex-1 p-3 min-w-0">
                <p className={`text-sm font-bold truncate ${isThisPlaying ? 'text-red-500' : 'text-white'}`}>{track.title}</p>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
              </div>
              
              {/* Play hover button */}
              <div className="pr-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrack(track);
                  }}
                  className={`w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-red-neon transition-all transform ${
                    isThisPlaying ? 'opacity-100 scale-100' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-105'
                  }`}
                >
                  {isThisPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tendencias & Canciones Populares */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Flame className="w-6 h-6 text-red-500" />
              <span>Tendencias & Más Escuchadas</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">Canciones disponibles para reproducción y descarga en MP3 directo</p>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {CURATED_TOP_HITS.map((track) => {
            const isThisPlaying = currentTrack?.videoId === track.videoId && isPlaying;
            const isLiked = likedTrackIds.includes(track.videoId);

            return (
              <div
                key={track.videoId}
                onClick={() => onPlayTrack(track)}
                className="group p-3.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 hover:border-red-600/40 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between relative shadow-lg"
              >
                {/* Thumbnail + Play Hover */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-[#0a0a0a] shadow-md">
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Floating Red Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTrack(track);
                    }}
                    className={`absolute bottom-2 right-2 w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-red-neon transition-all duration-300 transform ${
                      isThisPlaying
                        ? 'opacity-100 translate-y-0 scale-100 shadow-red-600/70'
                        : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-105'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className={`text-sm font-bold truncate ${isThisPlaying ? 'text-red-500' : 'text-white'}`}>
                    {track.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{track.artist}</p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(track);
                    }}
                    className={`p-1.5 transition-colors ${
                      isLiked ? 'text-red-500' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDownload(track);
                    }}
                    className="flex items-center space-x-1 text-[11px] font-bold text-gray-300 hover:text-red-400 transition-colors px-2 py-1 rounded bg-white/5 hover:bg-red-950/40"
                    title="Descargar en MP3, WAV, FLAC"
                  >
                    <Download className="w-3.5 h-3.5 text-red-500" />
                    <span>MP3</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Artistas Populares */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white">Artistas Principales</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {TOP_ARTISTS.map((artist, idx) => (
            <div
              key={idx}
              onClick={() => onSelectArtist(artist.name)}
              className="group p-3 bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 hover:border-red-600/40 rounded-2xl cursor-pointer transition-all flex flex-col items-center text-center shadow-lg"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-red-600 transition-all shadow-lg">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white truncate w-full group-hover:text-red-400 transition-colors">
                {artist.name}
              </h3>
              <p className="text-[10px] text-gray-400 truncate w-full mt-0.5">{artist.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Géneros y Categorías */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white">Explorar por Género</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRES_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectGenre(cat.name)}
              className={`h-24 sm:h-28 p-3.5 rounded-2xl bg-gradient-to-br ${cat.color} border border-red-600/20 hover:border-red-500/60 cursor-pointer transition-transform hover:scale-105 relative overflow-hidden shadow-lg flex flex-col justify-between`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs sm:text-sm font-black text-white drop-shadow-md leading-tight">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
