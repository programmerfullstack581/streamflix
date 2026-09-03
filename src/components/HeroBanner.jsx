import React from 'react';
import { Play, Info, Download, Plus, Check, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroBanner({ movie, onPlay, onDownload, isSaved, onToggleWatchlist }) {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[90vh] text-white overflow-hidden select-none">
      
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-90 animate-pulse-slow"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#141414]" />
      </div>

      {/* Content Overlay */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24 z-10">
        <div className="max-w-2xl space-y-4">
          
          {/* Badge */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>ESTRENO DESTACADO</span>
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-white/30 bg-black/40 backdrop-blur-md">
              {movie.quality}
            </span>
            <span className="text-xs font-semibold text-yellow-400 flex items-center bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-yellow-400 mr-1" />
              {movie.rating}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-2xl leading-none text-white">
            {movie.title}
          </h1>

          {/* Subtitle / Meta */}
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-300 font-medium">
            <span className="text-green-400 font-bold">{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 border border-gray-500 rounded text-[10px] font-bold">
              {movie.ageRating || '13+'}
            </span>
            <span>•</span>
            <div className="flex items-center space-x-1 text-gray-400">
              {movie.genres?.map((g, i) => (
                <span key={g}>
                  {g}{i < movie.genres.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 line-clamp-3 leading-relaxed drop-shadow-md max-w-xl font-normal">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onPlay(movie)}
              className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Reproducir</span>
            </button>

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-lg font-semibold text-sm sm:text-base border backdrop-blur-md transition-all duration-200 ${
                isSaved 
                  ? 'bg-red-600/30 border-red-500 text-white' 
                  : 'bg-gray-800/70 hover:bg-gray-700/80 border-gray-600/60 text-white'
              }`}
            >
              {isSaved ? <Check className="w-5 h-5 text-red-400" /> : <Plus className="w-5 h-5" />}
              <span>{isSaved ? 'En Mi Lista' : 'Mi Lista'}</span>
            </button>

            <button
              onClick={() => onDownload(movie)}
              className="flex items-center justify-center space-x-2 px-5 py-3 bg-gray-800/70 hover:bg-gray-700/80 border border-gray-600/60 text-white font-semibold rounded-lg backdrop-blur-md transition-all text-sm sm:text-base"
              title="Descargar para ver offline"
            >
              <Download className="w-5 h-5 text-gray-300" />
              <span className="hidden sm:inline">Descargar</span>
            </button>
          </div>

          {/* Free Guarantee Banner */}
          <div className="pt-2 flex items-center space-x-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Transmisión 100% gratuita y sin anuncios molestos</span>
          </div>

        </div>
      </div>
    </div>
  );
}
