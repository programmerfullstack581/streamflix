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
  AlertCircle,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Layers
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
  const [selectedFormat, setSelectedFormat] = useState('mp3'); // 'mp3', 'flac', 'wav', 'm4a', '1080'
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAlternativeServers, setShowAlternativeServers] = useState(false);

  // Analizar enlace URL y resolver canción real
  const handleAnalyzeUrl = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMessage('Por favor ingresa o pega un enlace de YouTube, TikTok o video musical.');
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
      MusicStorage.recordDownload(details, `MP3 (${selectedFormat.toUpperCase()})`);
      if (onRefreshDownloads) onRefreshDownloads();
    } else {
      const searchUrl = urlInput.trim();
      const mockTrack = {
        videoId: 'custom_' + Date.now(),
        title: searchUrl.length > 50 ? searchUrl.substring(0, 50) + '...' : searchUrl,
        artist: 'Audio Enlace Web',
        album: 'MP3 Descarga',
        duration: '3:30',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60'
      };
      setResolvedTrack(mockTrack);
      setIsResolving(false);
      MusicStorage.recordDownload(mockTrack, 'MP3 (320 kbps)');
      if (onRefreshDownloads) onRefreshDownloads();
    }
  };

  const handleSelectExample = async (track) => {
    setUrlInput(`https://www.youtube.com/watch?v=${track.videoId}`);
    setResolvedTrack(track);
    MusicStorage.recordDownload(track, 'MP3 (320 kbps)');
    if (onRefreshDownloads) onRefreshDownloads();
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
        const videoId = extractVideoId(text);
        if (videoId) {
          setIsResolving(true);
          const details = await getTrackDetailsById(videoId);
          setResolvedTrack(details);
          setIsResolving(false);
          MusicStorage.recordDownload(details, 'MP3 (320 kbps)');
          if (onRefreshDownloads) onRefreshDownloads();
        }
      }
    } catch (_) {}
  };

  const FORMAT_OPTIONS = [
    { id: 'mp3', name: 'MP3 (320 kbps)', desc: 'Audio HD Máxima Calidad', icon: Zap },
    { id: 'flac', name: 'FLAC (Hi-Fi)', desc: 'Sin Pérdida Studio', icon: FileAudio },
    { id: 'wav', name: 'WAV (PCM)', desc: 'Audio Sin Compresión', icon: Radio },
    { id: 'm4a', name: 'M4A / AAC', desc: 'Optimizado Apple/iOS', icon: Music },
    { id: '1080', name: 'MP4 (1080p)', desc: 'Video Full HD', icon: Film },
  ];

  const currentVideoId = resolvedTrack ? resolvedTrack.videoId : (extractVideoId(urlInput) || 'CHuq9r4HJOE');
  const currentYtUrl = `https://www.youtube.com/watch?v=${currentVideoId}`;

  return (
    <div className="space-y-8 pb-32 animate-fadeIn">
      
      {/* Header Banner Red Edition */}
      <div className="p-6 sm:p-10 bg-gradient-to-r from-red-950 via-[#141414] to-black rounded-3xl border border-red-600/30 shadow-red-neon relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/20 border border-red-500/40 rounded-full">
            <Zap className="w-4 h-4 text-red-500 animate-bounce" />
            <span className="text-xs font-black tracking-wider uppercase text-red-400">
              Descargas Directas Sin Redirecciones
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Descargar Música con URL en <span className="text-[#E50914] underline decoration-red-600">Esta Misma Página</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Pega el enlace de <strong className="text-white">YouTube, TikTok o Video</strong> y descárgalo directamente desde este panel a tu dispositivo en formato <strong className="text-red-400">MP3 320 kbps</strong> sin que se te abra otra página o ventanas molestas.
          </p>
        </div>
      </div>

      {/* Apartado Principal: Input de URL para descarga directa */}
      <div className="bg-[#121212] p-6 sm:p-8 rounded-3xl border border-red-600/30 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
            <Link className="w-5 h-5 text-[#E50914]" />
            <span>Pega la URL de la Canción o Video:</span>
          </h2>
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="text-xs font-bold text-red-400 hover:text-white px-3.5 py-2 bg-red-950/50 border border-red-500/30 rounded-xl transition-all flex items-center space-x-1.5 hover:scale-105"
          >
            <span>📋 Pegar del Portapapeles</span>
          </button>
        </div>

        <form onSubmit={handleAnalyzeUrl} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pega aquí: https://youtu.be/... o https://www.youtube.com/watch?v=..."
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
                <span>Cargando Descargador...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-white" />
                <span>GENERAR DESCARGA DIRECTA</span>
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

        {/* Panel de Descarga Integrado Directo (Sin Salir de la Página) */}
        {resolvedTrack && (
          <div className="p-5 sm:p-7 bg-gradient-to-br from-red-950/50 via-[#161616] to-[#0a0a0a] rounded-3xl border border-red-500/50 space-y-6 animate-fadeIn shadow-2xl">
            
            {/* Detalles de la Canción */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-white/10">
              <img
                src={resolvedTrack.thumbnail}
                alt={resolvedTrack.title}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-2xl ring-2 ring-red-600/70 flex-shrink-0"
              />

              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white tracking-wider">
                    Listo para Descargar
                  </span>
                  <span className="text-[10px] font-bold text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded-full border border-red-600/30">
                    {selectedFormat.toUpperCase()} Alta Calidad
                  </span>
                </div>
                <h3 className="text-base sm:text-2xl font-black text-white truncate">{resolvedTrack.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium">{resolvedTrack.artist}</p>
                <p className="text-xs text-gray-500 font-mono">Descarga directa en tu navegador a tu dispositivo</p>
              </div>

              <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onPlayTrack(resolvedTrack)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border border-white/10"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Escuchar</span>
                </button>
              </div>
            </div>

            {/* Selector de Formato Integrado */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-red-500" />
                <span>1. Selecciona el formato de archivo:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FORMAT_OPTIONS.map((fmt) => {
                  const Icon = fmt.icon;
                  const isSelected = selectedFormat === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setSelectedFormat(fmt.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-red-600 text-white border-red-400 shadow-red-neon scale-[1.02]' 
                          : 'bg-[#101010] text-gray-300 border-white/5 hover:border-red-500/40 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className="w-4 h-4" />
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold truncate">{fmt.name}</span>
                      <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>{fmt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Módulo de Descarga Directa en la Misma Página (Widget Integrado) */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                <Download className="w-4 h-4 text-red-500" />
                <span>2. Presiona el botón de descarga directa abajo (Sin salir de la página):</span>
              </label>

              {/* Botón / Widget de Descarga Directa Embebido */}
              <div className="p-4 bg-[#0a0a0a] rounded-2xl border border-red-500/40 flex flex-col items-center justify-center text-center space-y-3 shadow-inner">
                <div className="w-full max-w-md h-24 overflow-hidden rounded-xl flex items-center justify-center bg-[#111] border border-white/5">
                  <iframe
                    key={`${currentVideoId}-${selectedFormat}`}
                    src={`https://loader.to/api/button/?url=${encodeURIComponent(currentYtUrl)}&f=${selectedFormat}`}
                    className="w-full h-full border-0 rounded-xl"
                    scrolling="no"
                    title="Direct Downloader"
                  />
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  💡 Haz clic en el botón de descarga dentro del recuadro para guardar el archivo <strong className="text-red-400">{selectedFormat.toUpperCase()}</strong> directamente en tu dispositivo.
                </p>
              </div>
            </div>

            {/* Servidores Opcionales en Acordeón */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAlternativeServers(!showAlternativeServers)}
                className="text-xs font-bold text-gray-400 hover:text-red-400 flex items-center space-x-2 transition-colors"
              >
                <span>{showAlternativeServers ? '▼ Ocultar opciones alternativas' : '▶ ¿Problemas con la descarga? Ver servidores alternativos'}</span>
              </button>

              {showAlternativeServers && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 animate-fadeIn">
                  <a
                    href={`https://www.y2mate.com/youtube-mp3/${resolvedTrack.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 hover:border-red-500/40 rounded-xl text-xs font-bold text-gray-300 hover:text-white flex items-center justify-between transition-all"
                  >
                    <span>Y2Mate MP3 Direct</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                  </a>

                  <a
                    href={`https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent('https://youtu.be/' + resolvedTrack.videoId)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 hover:border-red-500/40 rounded-xl text-xs font-bold text-gray-300 hover:text-white flex items-center justify-between transition-all"
                  >
                    <span>YT1S MP3 Converter</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                  </a>

                  <a
                    href="https://cobalt.tools/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${resolvedTrack.videoId}`);
                    }}
                    className="p-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 hover:border-red-500/40 rounded-xl text-xs font-bold text-gray-300 hover:text-white flex items-center justify-between transition-all"
                  >
                    <span>Cobalt Tools (Sin Anuncios)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                  </a>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Ejemplos Rápidos de Prueba con 1 Clic */}
        <div className="pt-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            O prueba con una canción popular haciendo clic:
          </p>
          <div className="flex flex-wrap gap-2">
            {CURATED_TOP_HITS.slice(0, 6).map((track) => (
              <button
                key={track.videoId}
                type="button"
                onClick={() => handleSelectExample(track)}
                className="text-xs px-3.5 py-2 bg-[#171717] hover:bg-red-950/40 border border-white/5 hover:border-red-500/50 rounded-xl text-gray-300 hover:text-white transition-all font-medium flex items-center space-x-1.5"
              >
                <span>🎵</span>
                <span>{track.title} — {track.artist}</span>
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
            <span>Historial de Descargas ({downloads.length})</span>
          </h2>
        </div>

        {downloads.length === 0 ? (
          <div className="p-12 text-center bg-[#121212] rounded-3xl border border-white/5 space-y-3 text-gray-400">
            <Download className="w-12 h-12 mx-auto text-gray-700" />
            <h3 className="text-base font-bold text-white">No tienes descargas registradas todavía</h3>
            <p className="text-xs max-w-md mx-auto">
              Pega cualquier enlace arriba o haz clic en cualquier canción de ejemplo para iniciar tu descarga.
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
                    onClick={() => handleSelectExample(track)}
                    className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors"
                    title="Cargar en descargador"
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
