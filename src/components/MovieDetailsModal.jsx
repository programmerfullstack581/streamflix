import React from 'react';
import { X, Play, Plus, Check, Download, Star, Film, Sparkles, Share2, ShieldCheck } from 'lucide-react';

export default function MovieDetailsModal({ movie, onClose, onPlay, onDownload, isSaved, onToggleWatchlist }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn select-none">
      
      {/* Container */}
      <div className="relative bg-[#181818] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Backdrop Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-gray-900 overflow-hidden">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-transparent to-transparent" />

          {/* Quick Play Floating Button */}
          <div className="absolute bottom-6 left-6 flex items-center space-x-4">
            <button
              onClick={() => { onClose(); onPlay(movie); }}
              className="flex items-center space-x-2 px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-extrabold rounded-xl shadow-2xl hover:scale-105 transition-all text-base"
            >
              <Play className="w-6 h-6 fill-black" />
              <span>Reproducir Película</span>
            </button>
          </div>
        </div>

        {/* Movie Info & Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Meta Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-xs">
              <span className="bg-red-600/90 text-white font-extrabold px-2.5 py-0.5 rounded-full">
                {movie.quality || '4K Ultra HD'}
              </span>
              <span className="text-yellow-400 font-extrabold flex items-center bg-black/60 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-yellow-400 mr-1" />
                {movie.rating}
              </span>
              <span className="text-gray-300 font-bold">{movie.year}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">{movie.duration}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white">{movie.title}</h2>
            {movie.originalTitle && (
              <p className="text-xs text-gray-400 font-mono">Título Original: {movie.originalTitle}</p>
            )}
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => { onClose(); onPlay(movie); }}
              className="flex-1 min-w-[180px] flex items-center justify-center space-x-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xl transition-all"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Ver Ahora</span>
            </button>

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`px-5 py-3 rounded-xl font-bold text-sm border flex items-center space-x-2 transition-all ${
                isSaved 
                  ? 'bg-red-950/40 border-red-500 text-red-400' 
                  : 'bg-gray-800/80 hover:bg-gray-700 border-white/10 text-white'
              }`}
            >
              {isSaved ? <Check className="w-5 h-5 text-red-500" /> : <Plus className="w-5 h-5" />}
              <span>{isSaved ? 'En Mi Lista' : 'Mi Lista'}</span>
            </button>

            <button
              onClick={() => onDownload(movie)}
              className="px-5 py-3 bg-gray-800/80 hover:bg-gray-700 border border-white/10 text-white font-bold text-sm rounded-xl flex items-center space-x-2 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Descargar Offline</span>
            </button>
          </div>

          {/* Additional Metadata Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div>
              <span className="text-gray-400 block">Géneros</span>
              <span className="text-white font-semibold">{movie.genre}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Calidad de Video</span>
              <span className="text-green-400 font-semibold">1080p / 4K UHD</span>
            </div>
            <div>
              <span className="text-gray-400 block">Audio & Subtítulos</span>
              <span className="text-white font-semibold">Español Latino / VOSE</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
