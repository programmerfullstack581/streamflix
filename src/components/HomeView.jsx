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
  ChevronRight
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
  onSelectArtist
}) {
  // Dynamic greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="space-y-8 pb-32 animate-fadeIn">
      
      {/* Top Hero Greeting */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{greeting}</h1>
          <span className="text-xs text-gray-400 flex items-center space-x-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
            <span>Streaming & Descargas 100% Gratis</span>
          </span>
        </div>

        {/* 6 Quick Playlists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CURATED_TOP_HITS.slice(0, 6).map((track) => {
            const isThisPlaying = currentTrack?.videoId === track.videoId && isPlaying;
            return (
              <div
                key={track.videoId}
                onClick={() => onPlayTrack(track)}
                className="group flex items-center bg-[#282828]/60 hover:bg-[#282828] rounded-md overflow-hidden cursor-pointer transition-all shadow-md hover:shadow-xl"
              >
                <img 
                  src={track.thumbnail} 
                  alt={track.title} 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover flex-shrink-0 shadow-md"
                />
                <div className="flex-1 p-3 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{track.title}</p>
                  <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                </div>
                
                {/* Play hover button */}
                <div className="pr-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTrack(track);
                    }}
                    className={`w-10 h-10 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-xl transition-all transform ${
                      isThisPlaying ? 'opacity-100 scale-100' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-105'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 50 Mundial / Tendencias */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Flame className="w-6 h-6 text-[#1DB954]" />
              <span>Tendencias & Más Escuchadas</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">Las canciones más populares del momento listas para escuchar y descargar</p>
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
                className="group p-3.5 bg-[#181818] hover:bg-[#282828] rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between relative shadow-md hover:shadow-2xl"
              >
                {/* Thumbnail + Play Hover */}
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-[#121212] shadow-md">
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Floating Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTrack(track);
                    }}
                    className={`absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-2xl transition-all duration-300 transform ${
                      isThisPlaying
                        ? 'opacity-100 translate-y-0 scale-100 shadow-[#1DB954]/50'
                        : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-105'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className={`text-sm font-bold truncate ${isThisPlaying ? 'text-[#1DB954]' : 'text-white'}`}>
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
                      isLiked ? 'text-[#1DB954]' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#1DB954]' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDownload(track);
                    }}
                    className="flex items-center space-x-1 text-[11px] font-bold text-gray-400 hover:text-[#1DB954] transition-colors px-2 py-1 rounded bg-white/5 hover:bg-[#1DB954]/10"
                    title="Descargar en MP3, WAV, FLAC"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
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
              className="group p-3 bg-[#181818] hover:bg-[#282828] rounded-xl cursor-pointer transition-all flex flex-col items-center text-center shadow-md hover:shadow-xl"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-[#1DB954] transition-all shadow-lg">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white truncate w-full group-hover:text-[#1DB954] transition-colors">
                {artist.name}
              </h3>
              <p className="text-[10px] text-gray-400 truncate w-full mt-0.5">{artist.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Playlists Destacadas */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white">Playlists Oficiales Recomendadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onSelectGenre(pl.name)}
              className="group p-4 bg-[#181818] hover:bg-[#282828] rounded-2xl cursor-pointer transition-all shadow-md hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4 shadow-lg relative">
                <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {pl.tracksCount} temas
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-white group-hover:text-[#1DB954] transition-colors">{pl.name}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{pl.description}</p>
              </div>
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
              className={`h-24 sm:h-28 p-3 rounded-xl bg-gradient-to-br ${cat.color} cursor-pointer transition-transform hover:scale-105 relative overflow-hidden shadow-lg flex flex-col justify-between`}
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
