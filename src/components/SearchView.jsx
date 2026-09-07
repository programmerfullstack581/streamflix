import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Play, 
  Pause, 
  Heart, 
  Download, 
  Loader2, 
  X, 
  Music, 
  Sparkles, 
  Disc3,
  Clock,
  Zap
} from 'lucide-react';
import { GENRES_CATEGORIES, searchMusicOnline, CURATED_TOP_HITS } from '../services/musicService';

export default function SearchView({
  searchQuery,
  setSearchQuery,
  onPlayTrack,
  currentTrack,
  isPlaying,
  onToggleLike,
  likedTrackIds = [],
  onOpenDownload,
  onSelectGenre
}) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const QUICK_TAGS = [
    'Bad Bunny', 'Karol G', 'Feid', 'Peso Pluma', 'Maluma', 'Shakira', 
    'Blessd', 'Ryan Castro', 'J Balvin', 'Myke Towers', 'Anuel AA', 'The Weeknd'
  ];

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const data = await searchMusicOnline(searchQuery);
      setResults(data);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const topResult = results[0];

  return (
    <div className="space-y-6 pb-32 animate-fadeIn">
      
      {/* Search Header & Input */}
      <div className="space-y-4">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Qué quieres escuchar o descargar? Canción, artista o pega URL..."
            autoFocus
            className="w-full bg-[#141414] hover:bg-[#1a1a1a] focus:bg-[#141414] border border-white/10 focus:border-red-600 text-white placeholder-gray-500 rounded-2xl py-4 pl-12 pr-10 text-xs sm:text-sm font-medium outline-none transition-all shadow-xl focus:ring-1 focus:ring-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Artists Suggestions */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-xs px-3.5 py-1.5 bg-[#141414] hover:bg-red-950/40 hover:text-red-400 border border-white/5 hover:border-red-500/40 rounded-xl font-bold text-gray-300 transition-all whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* When Search Query is Active */}
      {searchQuery.trim() !== '' ? (
        <div className="space-y-6">
          {isSearching && results.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3 text-gray-400">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              <p className="text-sm font-bold">Buscando canciones y audio en alta calidad...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-20 text-center text-gray-400 space-y-2">
              <p className="text-base font-bold text-white">No encontramos resultados para "{searchQuery}"</p>
              <p className="text-xs">Prueba con otro título, nombre de artista o pega el enlace URL directo.</p>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Top Result + Songs Table */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Mejor Resultado (Card) */}
                {topResult && (
                  <div className="lg:col-span-2 space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-white">Mejor resultado</h3>
                    <div 
                      onClick={() => onPlayTrack(topResult)}
                      className="group p-5 bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-red-600/50 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-56 sm:h-64 relative shadow-2xl"
                    >
                      <div className="flex items-start space-x-4">
                        <img 
                          src={topResult.thumbnail} 
                          alt={topResult.title} 
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-2xl ring-2 ring-red-600/40"
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black text-white truncate group-hover:text-red-400 transition-colors">
                          {topResult.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 flex items-center space-x-2">
                          <span className="font-bold text-white">{topResult.artist}</span>
                          <span>•</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-red-600/20 text-red-400 rounded-full border border-red-500/30">
                            Canción MP3
                          </span>
                        </p>
                      </div>

                      {/* Play Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayTrack(topResult);
                        }}
                        className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-red-neon transition-transform hover:scale-105"
                      >
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Canciones Top 4 Results */}
                <div className={`space-y-2 ${topResult ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
                  <h3 className="text-base sm:text-lg font-black text-white">Canciones</h3>
                  <div className="space-y-1">
                    {results.slice(0, 5).map((track, idx) => {
                      const isThisPlaying = currentTrack?.videoId === track.videoId && isPlaying;
                      const isLiked = likedTrackIds.includes(track.videoId);

                      return (
                        <div
                          key={track.videoId + idx}
                          onClick={() => onPlayTrack(track)}
                          className={`group flex items-center space-x-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors border ${
                            isThisPlaying ? 'bg-red-950/40 border-red-500/40' : 'border-transparent hover:bg-white/5'
                          }`}
                        >
                          <div className="w-6 text-center text-xs font-mono text-gray-400 group-hover:hidden">
                            {isThisPlaying ? <Disc3 className="w-4 h-4 text-red-500 animate-spin mx-auto" /> : idx + 1}
                          </div>
                          <div className="w-6 text-center hidden group-hover:block">
                            <Play className="w-4 h-4 fill-white text-white mx-auto" />
                          </div>

                          <img src={track.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${isThisPlaying ? 'text-red-400' : 'text-white'}`}>
                              {track.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleLike(track);
                            }}
                            className={`p-1.5 transition-colors ${
                              isLiked ? 'text-red-500' : 'text-gray-600 hover:text-white'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDownload(track);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                            title="Descargar en formato deseado"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <span className="text-xs text-gray-500 font-mono w-10 text-right">{track.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* All results grid */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-base sm:text-lg font-black text-white">Todos los resultados ({results.length})</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {results.map((track, idx) => {
                    const isThisPlaying = currentTrack?.videoId === track.videoId && isPlaying;
                    const isLiked = likedTrackIds.includes(track.videoId);

                    return (
                      <div
                        key={track.videoId + idx}
                        onClick={() => onPlayTrack(track)}
                        className="p-3.5 bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 hover:border-red-600/30 rounded-2xl cursor-pointer transition-all flex items-center space-x-3 group shadow-lg"
                      >
                        <img src={track.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${isThisPlaying ? 'text-red-500' : 'text-white'}`}>
                            {track.title}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">{track.artist}</p>
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5">{track.duration}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDownload(track);
                          }}
                          className="p-2 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-gray-400 transition-all flex-shrink-0"
                          title="Descargar MP3"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* Explora todo (Categories Grid) */
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">Explorar Géneros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {GENRES_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSearchQuery(cat.name);
                }}
                className={`h-36 sm:h-44 p-4 rounded-2xl bg-gradient-to-br ${cat.color} border border-red-600/20 hover:border-red-500/60 cursor-pointer transition-transform hover:scale-105 relative overflow-hidden shadow-xl flex flex-col justify-between`}
              >
                <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-md">{cat.name}</h3>
                <div className="text-4xl sm:text-5xl self-end transform rotate-12 drop-shadow-lg">
                  {cat.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
