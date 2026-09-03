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
  Copy,
  Link,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  MusicStorage, 
  extractVideoId, 
  getTrackDetailsById,
  CURATED_TOP_HITS 
} from '../services/musicService';

export default function DownloadsView({
  downloads = [],
  onPlayTrack,
  onOpenDownloadModal,
  onRefreshDownloads
}) {
  const [urlInput, setUrlInput] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedTrack, setResolvedTrack] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Analizar enlace URL
  const handleAnalyzeUrl = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMessage('Por favor ingresa o pega un enlace válido.');
      return;
    }

    setErrorMessage('');
    setIsResolving(true);
    setResolvedTrack(null);

    const videoId = extractVideoId(urlInput);

    if (videoId) {
      const details = await getTrackDetailsById(videoId);
      setResolvedTrack(details);
      setIsResolving(false);
    } else {
      // Si no es un ID directo de YT, buscar por nombre
      const searchUrl = urlInput.trim();
      const mockTrack = {
        videoId: 'custom_' + Date.now(),
        title: searchUrl.length > 40 ? searchUrl.substring(0, 40) + '...' : searchUrl,
        artist: 'Audio Enlace Web',
        album: 'MP3 Descarga Directa',
        duration: 'HD',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60'
      };
      setResolvedTrack(mockTrack);
      setIsResolving(false);
    }
  };

  // Descarga directa MP3
  const handleDirectMp3Download = (track, formatName = 'MP3 (320 kbps)') => {
    MusicStorage.recordDownload(track, formatName);
    if (onRefreshDownloads) onRefreshDownloads();

    setDownloadSuccess(`🚀 ¡Descargando "${track.title}" en ${formatName}!`);
    setTimeout(() => setDownloadSuccess(''), 5000);

    const ytUrl = `https://www.youtube.com/watch?v=${track.videoId}`;
    
    // Abrir descargador directo optimizado sin publicidad
    const directDownloadUrl = `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=mp3`;
    window.open(directDownloadUrl, '_blank');
  };

  const handleCobaltDirect = (track) => {
    MusicStorage.recordDownload(track, 'MP3 (Cobalt Ultra)');
    if (onRefreshDownloads) onRefreshDownloads();
    
    const ytUrl = `https://www.youtube.com/watch?v=${track.videoId}`;
    navigator.clipboard.writeText(ytUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
    window.open('https://cobalt.tools/', '_blank');
  };

  const handleDelete = (videoId) => {
    MusicStorage.removeDownload(videoId);
    if (onRefreshDownloads) onRefreshDownloads();
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text);
      }
    } catch (_) {}
  };

  return (
    <div className="space-y-8 pb-32 animate-fadeIn">
      
      {/* Hero Header Red & Black */}
      <div className="p-6 sm:p-10 bg-gradient-to-r from-red-950 via-[#141414] to-black rounded-3xl border border-red-600/30 shadow-red-neon relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/20 border border-red-500/40 rounded-full">
            <Zap className="w-4 h-4 text-red-500 animate-bounce" />
            <span className="text-xs font-black tracking-wider uppercase text-red-400">
              Descargador Directo de Música MP3
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Descargar Música con URL en <span className="text-[#E50914] underline decoration-red-600">MP3 Directo</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Pega el enlace de <strong className="text-white">YouTube, TikTok, Soundcloud o Video</strong> y descárgalo directamente a tu celular o computadora en formato <strong className="text-red-400">MP3 320 kbps Alta Calidad</strong> sin anuncios molestos ni esperas.
          </p>
        </div>
      </div>

      {/* Apartado Principal: Input de URL para descarga directa */}
      <div className="bg-[#121212] p-6 sm:p-8 rounded-3xl border border-red-600/30 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center space-x-2">
            <Link className="w-5 h-5 text-[#E50914]" />
            <span>Pega la URL de la Canción o Video:</span>
          </h2>
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="text-xs font-bold text-red-400 hover:text-white px-3 py-1.5 bg-red-950/40 border border-red-500/30 rounded-xl transition-colors flex items-center space-x-1"
          >
            <span>📋 Pegar del Portapapeles</span>
          </button>
        </div>

        <form onSubmit={handleAnalyzeUrl} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ejemplo: https://www.youtube.com/watch?v=CHuq9r4HJOE o cualquier enlace..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#E50914] text-white placeholder-gray-500 rounded-2xl py-4 pl-4 pr-10 text-xs sm:text-sm font-medium outline-none transition-all shadow-inner focus:ring-1 focus:ring-[#E50914]"
            />
            {urlInput && (
              <button
                type="button"
                onClick={() => { setUrlInput(''); setResolvedTrack(null); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isResolving}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm rounded-2xl transition-all hover:scale-105 shadow-red-neon flex items-center justify-center space-x-2 flex-shrink-0 disabled:opacity-50 cursor-pointer"
          >
            {isResolving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analizando URL...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-white" />
                <span>DESCARGAR MP3 DIRECTO</span>
              </>
            )}
          </button>
        </form>

        {errorMessage && (
          <div className="p-3 bg-red-950/40 border border-red-600/40 rounded-xl flex items-center space-x-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tarjeta de Canción Encontrada con Botones de Descarga Directa */}
        {resolvedTrack && (
          <div className="p-5 sm:p-6 bg-gradient-to-br from-red-950/40 via-[#181818] to-[#0d0d0d] rounded-2xl border border-red-500/40 space-y-4 animate-fadeIn shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={resolvedTrack.thumbnail}
                alt={resolvedTrack.title}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl ring-2 ring-red-600/50 flex-shrink-0"
              />

              <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white tracking-wider">
                  Audio Listo para Descargar
                </span>
                <h3 className="text-base sm:text-xl font-black text-white truncate">{resolvedTrack.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium">{resolvedTrack.artist}</p>
                <p className="text-xs text-gray-500 font-mono">Duración: {resolvedTrack.duration} • Calidad de descarga: 320 kbps MP3</p>
              </div>

              <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onPlayTrack(resolvedTrack)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Escuchar</span>
                </button>
              </div>
            </div>

            {/* Opciones Rápidas de Descarga Directa */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Botón 1: Descarga MP3 320k Directa */}
              <button
                onClick={() => handleDirectMp3Download(resolvedTrack, 'MP3 (320 kbps)')}
                className="p-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-black text-xs sm:text-sm shadow-red-neon transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Descargar MP3 (320 kbps)</span>
              </button>

              {/* Botón 2: Cobalt Tools Sin Anuncios */}
              <button
                onClick={() => handleCobaltDirect(resolvedTrack)}
                className="p-3.5 bg-[#222] hover:bg-[#2a2a2a] text-white border border-red-500/30 hover:border-red-500 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>{copiedLink ? '¡Enlace Copiado!' : 'Cobalt (Sin Anuncios)'}</span>
              </button>

              {/* Botón 3: Más Formatos (FLAC, WAV, MP4) */}
              <button
                onClick={() => onOpenDownloadModal(resolvedTrack)}
                className="p-3.5 bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
              >
                <FileAudio className="w-4 h-4 text-red-400" />
                <span>Más Formatos (FLAC/WAV/MP4)</span>
              </button>

            </div>
          </div>
        )}

        {downloadSuccess && (
          <div className="p-3.5 bg-red-950/60 border border-red-500/60 text-white rounded-xl text-xs font-black text-center animate-fadeIn shadow-lg">
            {downloadSuccess}
          </div>
        )}

        {/* Ejemplos rápidos para probar */}
        <div className="pt-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">O prueba con una canción popular:</p>
          <div className="flex flex-wrap gap-2">
            {CURATED_TOP_HITS.slice(0, 5).map((track) => (
              <button
                key={track.videoId}
                type="button"
                onClick={() => {
                  setUrlInput(`https://www.youtube.com/watch?v=${track.videoId}`);
                  setResolvedTrack(track);
                }}
                className="text-xs px-3 py-1.5 bg-[#1a1a1a] hover:bg-red-900/30 border border-white/5 hover:border-red-500/40 rounded-xl text-gray-300 hover:text-white transition-all font-medium"
              >
                🎵 {track.title} — {track.artist}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Historial de Descargas Registradas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-[#E50914]" />
            <span>Historial de Canciones Descargadas ({downloads.length})</span>
          </h2>
        </div>

        {downloads.length === 0 ? (
          <div className="p-12 text-center bg-[#121212] rounded-3xl border border-white/5 space-y-3 text-gray-400">
            <Download className="w-12 h-12 mx-auto text-gray-700" />
            <h3 className="text-base font-bold text-white">No tienes descargas registradas todavía</h3>
            <p className="text-xs max-w-md mx-auto">
              Usa el buscador de URL arriba o presiona descargar en cualquier canción para guardarla aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloads.map((track) => (
              <div
                key={track.videoId}
                className="p-4 bg-[#141414] hover:bg-[#1f1f1f] rounded-2xl border border-white/5 hover:border-red-500/30 transition-all flex items-center space-x-3 group shadow-lg"
              >
                <img 
                  src={track.thumbnail} 
                  alt={track.title} 
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-md ring-1 ring-white/10"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{track.title}</h4>
                  <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                      {track.downloadFormat || 'MP3 (320 kbps)'}
                    </span>
                    <span className="text-[10px] text-gray-500">{track.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="p-2.5 bg-red-600 text-white rounded-full hover:scale-105 transition-transform shadow-md hover:bg-red-500"
                    title="Reproducir"
                  >
                    <Play className="w-4 h-4 fill-white ml-0.5" />
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
                    title="Eliminar del historial"
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
