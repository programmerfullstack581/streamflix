import React, { useState } from 'react';
import { 
  Download, 
  Play, 
  Trash2, 
  FileAudio, 
  Music, 
  Film, 
  Radio, 
  Zap, 
  Search, 
  ExternalLink, 
  Sparkles, 
  HardDrive,
  Check,
  Copy
} from 'lucide-react';
import { MusicStorage } from '../services/musicService';

export default function DownloadsView({
  downloads = [],
  onPlayTrack,
  onOpenDownloadModal,
  onRefreshDownloads
}) {
  const [customLink, setCustomLink] = useState('');
  const [activeFormat, setActiveFormat] = useState('mp3-320');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDelete = (videoId) => {
    MusicStorage.removeDownload(videoId);
    if (onRefreshDownloads) onRefreshDownloads();
  };

  const handleCustomDownload = (e) => {
    e.preventDefault();
    if (!customLink.trim()) return;
    
    // Create a generic track item from link
    const trackItem = {
      videoId: customLink.includes('v=') ? customLink.split('v=')[1].split('&')[0] : 'custom_' + Date.now(),
      title: 'Canción Personalizada',
      artist: 'Audio Enlace Web',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60',
      duration: 'HD'
    };
    onOpenDownloadModal(trackItem);
  };

  return (
    <div className="space-y-8 pb-32 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-[#181818] to-[#121212] rounded-3xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-[#1DB954] text-black rounded-xl font-black">
              <Download className="w-5 h-5" />
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-[#1DB954]">
              Centro de Descargas & Conversión
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Descarga Cualquier Canción en Cualquier Formato
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Descarga en <strong className="text-white">MP3 320 kbps (Máxima Calidad)</strong>, <strong className="text-white">FLAC (Lossless)</strong>, <strong className="text-white">WAV</strong>, <strong className="text-white">M4A</strong> o <strong className="text-white">MP4 1080p</strong> de forma gratuita, sin límites y sin publicidad invasiva.
          </p>
        </div>
      </div>

      {/* Convertidor Directo de Enlaces */}
      <div className="bg-[#181818] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
        <h2 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#1DB954]" />
          <span>Convertir y Descargar por Enlace o Búsqueda</span>
        </h2>

        <form onSubmit={handleCustomDownload} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pega aquí el enlace de YouTube o nombre de la canción para descargar..."
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
              className="w-full bg-[#121212] border border-white/15 focus:border-[#1DB954] text-white placeholder-gray-500 rounded-xl py-3 px-4 text-xs sm:text-sm outline-none transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-xs sm:text-sm rounded-xl transition-transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Generar Formatos</span>
          </button>
        </form>

        {/* Formatos soportados badges */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          <span className="text-[10px] font-bold text-gray-500 self-center">Formatos soportados:</span>
          {[
            { name: 'MP3 320k (Studio)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
            { name: 'MP3 128k (Estándar)', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
            { name: 'FLAC Lossless', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
            { name: 'WAV Original', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
            { name: 'M4A / AAC (Apple)', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
            { name: 'MP4 1080p (Video)', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
          ].map((fmt, i) => (
            <span key={i} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${fmt.color}`}>
              {fmt.name}
            </span>
          ))}
        </div>
      </div>

      {/* Historial de Descargas Registradas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-[#1DB954]" />
            <span>Tus Descargas Registradas ({downloads.length})</span>
          </h2>
        </div>

        {downloads.length === 0 ? (
          <div className="p-12 text-center bg-[#181818] rounded-2xl border border-white/5 space-y-3 text-gray-400">
            <Download className="w-12 h-12 mx-auto text-gray-600" />
            <h3 className="text-base font-bold text-white">Aún no tienes canciones en tu historial de descargas</h3>
            <p className="text-xs max-w-md mx-auto">
              Cuando descargues una canción desde cualquier vista o reproductor, aparecerá aquí organizada para que la disfrutes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloads.map((track) => (
              <div
                key={track.videoId}
                className="p-4 bg-[#181818] hover:bg-[#282828] rounded-2xl border border-white/5 transition-all flex items-center space-x-3 group"
              >
                <img 
                  src={track.thumbnail} 
                  alt={track.title} 
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-md"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{track.title}</h4>
                  <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30">
                      {track.downloadFormat || 'MP3 (320 kbps)'}
                    </span>
                    <span className="text-[10px] text-gray-500">{track.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="p-2 bg-[#1DB954] text-black rounded-full hover:scale-105 transition-transform shadow-md"
                    title="Reproducir"
                  >
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                  </button>

                  <button
                    onClick={() => onOpenDownloadModal(track)}
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                    title="Volver a descargar en otro formato"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(track.videoId)}
                    className="p-2 text-gray-500 hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors"
                    title="Eliminar de la lista"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
