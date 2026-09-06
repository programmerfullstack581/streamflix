import React, { useState } from 'react';
import { 
  HardDrive, 
  Trash2, 
  FileAudio, 
  Film, 
  Download, 
  Search, 
  ExternalLink, 
  Music, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { MusicStorage, getYoutubeThumbnail } from '../services/musicService';

export default function HistoryView({
  downloads = [],
  onRefreshDownloads,
  onOpenDownloadModal,
  onGoToHome
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const filteredDownloads = downloads.filter(track => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (track.title && track.title.toLowerCase().includes(term)) ||
      (track.artist && track.artist.toLowerCase().includes(term))
    );
  });

  const handleDelete = (videoId) => {
    MusicStorage.removeDownload(videoId);
    if (onRefreshDownloads) onRefreshDownloads();
    setDownloadSuccess('🗑️ Canción eliminada del historial.');
    setTimeout(() => setDownloadSuccess(''), 3000);
  };

  const handleClearAll = () => {
    if (window.confirm('¿Deseas vaciar todo tu historial de descargas?')) {
      MusicStorage.clearAllDownloads();
      if (onRefreshDownloads) onRefreshDownloads();
      setDownloadSuccess('🧹 Historial de descargas vaciado correctamente.');
      setTimeout(() => setDownloadSuccess(''), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn w-full">
      
      {/* Header Banner Historial */}
      <div className="p-4 sm:p-7 md:p-8 bg-white rounded-3xl border border-sky-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4">
        <div className="flex items-center space-x-3 sm:space-x-3.5 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-400/20 flex-shrink-0">
            <HardDrive className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                Historial de Descargas
              </h1>
              <span className="text-[10px] sm:text-xs font-bold text-sky-700 bg-sky-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-sky-100 flex-shrink-0">
                {downloads.length} guardadas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Vuelve a descargar en MP3 o MP4 las canciones que ya has procesado.
            </p>
          </div>
        </div>

        {downloads.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-2xl text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs flex-shrink-0"
          >
            <Trash2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>Vaciar Todo el Historial</span>
          </button>
        )}
      </div>

      {downloadSuccess && (
        <div className="p-3.5 bg-sky-50 border border-sky-200 text-sky-900 rounded-2xl text-xs font-bold text-center animate-fadeIn shadow-xs flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Buscador dentro del historial si hay descargas */}
      {downloads.length > 0 && (
        <div className="relative">
          <input
            type="text"
            placeholder="Filtrar por nombre de canción o artista en tu historial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-sky-400 text-slate-900 placeholder-slate-400 rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm font-medium outline-none transition-all shadow-xs focus:ring-2 focus:ring-sky-100"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Grid de Descargas o Estado Vacío */}
      {downloads.length === 0 ? (
        <div className="p-8 sm:p-16 text-center bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4 text-slate-500">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-sky-50 flex items-center justify-center mx-auto text-sky-400">
            <Download className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              No tienes canciones en tu historial todavía
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Ve a la sección de Inicio para buscar cualquier canción en YouTube y descargarla en Audio MP3 (320k) o Video MP4 (1080p).
            </p>
          </div>
          <button
            onClick={onGoToHome}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ir a Descargar Música</span>
          </button>
        </div>
      ) : filteredDownloads.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No se encontraron canciones que coincidan con "<strong>{searchTerm}</strong>".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {filteredDownloads.map((track) => (
            <div
              key={track.videoId}
              className="p-3 sm:p-4 bg-white hover:bg-sky-50/30 rounded-2xl border border-slate-200/80 hover:border-sky-200 transition-all flex items-center space-x-2.5 sm:space-x-3.5 group shadow-xs hover:shadow-sm min-w-0"
            >
              <img 
                src={track.thumbnail || getYoutubeThumbnail(track.videoId)} 
                alt={track.title} 
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://img.youtube.com/vi/${track.videoId}/0.jpg`;
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 shadow-xs ring-1 ring-sky-100"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={track.title}>
                  {track.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{track.artist}</p>
                <div className="flex items-center space-x-1.5 sm:space-x-2 mt-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100 truncate">
                    {track.downloadFormat || 'Audio (MP3)'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{track.duration}</span>
                </div>
              </div>

              {/* Botones de acción rápida */}
              <div className="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
                <button
                  onClick={() => onOpenDownloadModal(track)}
                  className="p-1.5 sm:p-2 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl shadow-xs hover:scale-105 transition-transform cursor-pointer"
                  title="Descargar de nuevo"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(track.videoId)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Eliminar de mi historial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
