import React, { useRef } from 'react';
import { Play, Plus, Check, Download, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function MovieRow({ title, movies, onPlay, onDownload, savedIds = [], onToggleWatchlist }) {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      rowRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 px-4 sm:px-6 lg:px-8 py-4 select-none group/row">
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center space-x-2">
        <span>{title}</span>
      </h2>

      {/* Row Wrapper with Arrow Controls */}
      <div className="relative">
        
        {/* Left Arrow */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/60 hover:bg-black/90 text-white p-2 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 rounded-r-md"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-4 px-1"
        >
          {movies.map((movie) => {
            const isSaved = savedIds.includes(movie.id);
            return (
              <div
                key={movie.id}
                className="flex-none w-44 sm:w-56 lg:w-64 bg-netflix-card rounded-lg overflow-hidden shadow-lg border border-white/5 movie-card-hover group/card relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] sm:aspect-[2/3] overflow-hidden bg-gray-900">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Quality & Rating Badges */}
                  <div className="absolute top-2 left-2 flex items-center space-x-1">
                    <span className="bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/20">
                      {movie.quality || 'HD'}
                    </span>
                    <span className="bg-yellow-500/90 text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center">
                      <Star className="w-2.5 h-2.5 fill-black mr-0.5" />
                      {movie.rating}
                    </span>
                  </div>

                  {/* Hover Overlay with Action Buttons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 space-y-2">
                    
                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {movie.title}
                    </h3>
                    
                    <p className="text-[11px] text-gray-300 line-clamp-2">
                      {movie.description}
                    </p>

                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => onPlay(movie)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-white hover:bg-gray-200 text-black text-xs font-bold py-1.5 px-2 rounded transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Ver</span>
                      </button>

                      <button
                        onClick={() => onToggleWatchlist(movie)}
                        className="p-1.5 bg-gray-800/80 hover:bg-gray-700 text-white rounded border border-white/20 transition-colors"
                        title={isSaved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
                      >
                        {isSaved ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onDownload(movie)}
                        className="p-1.5 bg-gray-800/80 hover:bg-gray-700 text-white rounded border border-white/20 transition-colors"
                        title="Descargar"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Footer Info (Visible when not hovering) */}
                <div className="p-3 group-hover/card:hidden">
                  <h3 className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                    <span>{movie.genre}</span>
                    <span>{movie.year}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/60 hover:bg-black/90 text-white p-2 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 rounded-l-md"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

      </div>
    </div>
  );
}
