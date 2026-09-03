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
  Link as LinkIcon,
  Loader2,
  AlertCircle,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Layers,
  Smartphone,
  Laptop,
  Scissors,
  Mic2,
  Share2,
  ListPlus
} from 'lucide-react';
import { 
  MusicStorage, 
  extractVideoId, 
  getTrackDetailsById,
  searchMusicOnline,
  CURATED_TOP_HITS 
} from '../services/musicService';
import AudioVisualizer from './AudioVisualizer';
import RingtoneModal from './RingtoneModal';
import LyricsModal from './LyricsModal';
import ShareModal from './ShareModal';

export default function DownloadsView({
  downloads = [],
  onPlayTrack,
  onOpenDownloadModal,
  onRefreshDownloads,
  isPlaying = false
}) {
  const [urlInput, setUrlInput] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedTrack, setResolvedTrack] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Modales adicionales
  const [ringtoneTrack, setRingtoneTrack] = useState(null);
  const [lyricsTrack, setLyricsTrack] = useState(null);
  const [shareTrack, setShareTrack] = useState(null);

  // Analizar enlace URL o buscar por Nombre
  const handleAnalyzeOrSearch = async (e) => {
    if (e) e.preventDefault();
    const cleanInput = urlInput.trim();
    if (!cleanInput) {
      setErrorMessage('⚠️ Ingresa el nombre de una canción/artista o pega un enlace de YouTube.');
      setResolvedTrack(null);
      setSearchResults([]);
      return;
    }

    setErrorMessage('');
    setIsResolving(true);
    setResolvedTrack(null);
    setSearchResults([]);

    const videoId = extractVideoId(cleanInput);
    const isUrl = /^(https?:\/\/|www\.|youtu\.be|youtube\.com)/i.test(cleanInput);

    // Si es un enlace de YouTube directo
    if (videoId || isUrl) {
      setSearchMode(false);
      const targetId = videoId || extractVideoId(cleanInput);
      if (targetId) {
        const details = await getTrackDetailsById(targetId);
        if (details) {
          setResolvedTrack(details);
          setIsResolving(false);
          MusicStorage.recordDownload(details, `MP3 (320 kbps)`);
          if (onRefreshDownloads) onRefreshDownloads();
          return;
        }
      }
      setIsResolving(false);
      setErrorMessage('❌ No se pudo encontrar el video con esa URL. Verifica que sea público.');
      return;
    }

    // Si no es URL, es una BÚSQUEDA POR NOMBRE
    setSearchMode(true);
    const results = await searchMusicOnline(cleanInput);
    setIsResolving(false);
    if (results && results.length > 0) {
      setSearchResults(results);
    } else {
      setErrorMessage(`❌ No se encontraron canciones para "${cleanInput}". Intenta con otro término.`);
    }
  };

  const handleSelectTrack = (track) => {
    setResolvedTrack(track);
    setUrlInput(`https://www.youtube.com/watch?v=${track.videoId}`);
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

  const handleRecordDownloadClick = (track, formatName = 'MP3 (320 kbps)') => {
    MusicStorage.recordDownload(track, formatName);
    if (onRefreshDownloads) onRefreshDownloads();
    setDownloadSuccess(`🚀 ¡Iniciando descarga de "${track.title}"!`);
    setTimeout(() => setDownloadSuccess(''), 5000);
  };

  const currentYtUrl = resolvedTrack ? `https://www.youtube.com/watch?v=${resolvedTrack.videoId}` : '';
  const currentYtShort = resolvedTrack ? `https://youtu.be/${resolvedTrack.videoId}` : '';

  return (
    <div className="space-y-6 sm:space-y-8 pb-32 animate-fadeIn w-full overflow-x-hidden">
      
      {/* Header Banner Red Edition */}
      <div className="p-5 sm:p-8 md:p-10 bg-gradient-to-r from-red-950 via-[#141414] to-black rounded-2xl sm:rounded-3xl border border-red-600/30 shadow-red-neon relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/20 border border-red-500/40 rounded-full">
              <Zap className="w-4 h-4 text-red-500 animate-bounce" />
              <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-red-400">
                Descargador & Buscador MP3 Pro
              </span>
            </div>
            
            <div className="hidden sm:block">
              <AudioVisualizer isPlaying={isPlaying} />
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Descargar Música con <span className="text-[#E50914] underline decoration-red-600">Nombre o URL</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Busca cualquier canción por su <strong className="text-white">Nombre o Artista</strong> o pega su enlace de <strong className="text-white">YouTube</strong> y descárgalo directamente en <strong className="text-red-400">MP3 320 kbps</strong> a tu PC o Teléfono Celular.
          </p>
        </div>
      </div>

      {/* Apartado Principal: Input Híbrido (Búsqueda por Nombre o Enlace URL) */}
      <div className="bg-[#121212] p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-red-600/30 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-sm sm:text-base md:text-lg font-black text-white flex items-center space-x-2">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#E50914]" />
            <span>Escribe el Nombre de la Canción o pega la URL:</span>
          </h2>
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="text-xs font-bold text-red-400 hover:text-white px-3 py-1.5 bg-red-950/50 border border-red-500/30 rounded-xl transition-all flex items-center space-x-1.5 hover:scale-105 cursor-pointer"
          >
            <span>📋 Pegar del Portapapeles</span>
          </button>
        </div>

        <form onSubmit={handleAnalyzeOrSearch} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ej: Martin Elias Cancelada, Karol G Provenza, o https://youtu.be/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#E50914] text-white placeholder-gray-500 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-4 pr-10 text-xs sm:text-sm font-medium outline-none transition-all shadow-inner focus:ring-1 focus:ring-[#E50914]"
            />
            {urlInput && (
              <button
                type="button"
                onClick={() => { setUrlInput(''); setResolvedTrack(null); setSearchResults([]); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isResolving}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all hover:scale-105 shadow-red-neon flex items-center justify-center space-x-2 flex-shrink-0 disabled:opacity-50 cursor-pointer"
          >
            {isResolving ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                <span>BUSCAR / DESCARGAR</span>
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

        {/* Resultados de Búsqueda por Nombre (Grid Interactivo) */}
        {searchResults.length > 0 && !resolvedTrack && (
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <Music className="w-4 h-4 text-red-500" />
              <span>Resultados encontrados ({searchResults.length}) — Toca para descargar:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-1">
              {searchResults.map((track) => (
                <div
                  key={track.videoId}
                  className="p-3.5 bg-[#171717] hover:bg-[#202020] rounded-2xl border border-white/5 hover:border-red-500/40 transition-all flex items-center space-x-3 group shadow-md"
                >
                  <img src={track.thumbnail} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow ring-1 ring-white/10" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{track.title}</h4>
                    <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                    <span className="text-[10px] text-red-400 font-mono font-bold mt-1 block">{track.duration}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    <button
                      onClick={() => onPlayTrack(track)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                      title="Escuchar"
                    >
                      <Play className="w-4 h-4 fill-white" />
                    </button>
                    <button
                      onClick={() => handleSelectTrack(track)}
                      className="px-3 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-xl shadow-red-neon transition-transform hover:scale-105 flex items-center space-x-1"
                      title="Descargar MP3"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel de Descarga Directo y Funcional */}
        {resolvedTrack && (
          <div className="p-4 sm:p-6 md:p-7 bg-gradient-to-br from-red-950/50 via-[#161616] to-[#0a0a0a] rounded-2xl sm:rounded-3xl border border-red-500/50 space-y-5 animate-fadeIn shadow-2xl">
            
            {/* Detalles de la Canción */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 sm:pb-5 border-b border-white/10">
              <img
                src={resolvedTrack.thumbnail}
                alt={resolvedTrack.title}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl object-cover shadow-2xl ring-2 ring-red-600/70 flex-shrink-0"
              />

              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white tracking-wider">
                    Listo para Descargar
                  </span>
                  <span className="text-[10px] font-bold text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded-full border border-red-600/30">
                    MP3 320 kbps
                  </span>
                </div>
                <h3 className="text-sm sm:text-xl md:text-2xl font-black text-white truncate">{resolvedTrack.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium">{resolvedTrack.artist}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 font-mono">Formato de salida: Audio MP3 Estéreo HD</p>
                
                {/* Herramientas Rápidas (Ringtone, Letras, Compartir) */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    onClick={() => setRingtoneTrack(resolvedTrack)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Crear Ringtone</span>
                  </button>

                  <button
                    onClick={() => setLyricsTrack(resolvedTrack)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <Mic2 className="w-3.5 h-3.5" />
                    <span>Ver Letra</span>
                  </button>

                  <button
                    onClick={() => setShareTrack(resolvedTrack)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onPlayTrack(resolvedTrack)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border border-white/10 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Escuchar</span>
                </button>
              </div>
            </div>

            {/* Opciones de Descarga Directa con enlaces nativos garantizados */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                <Download className="w-4 h-4 text-red-500" />
                <span>Haz clic en tu opción de descarga:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Opción 1: Y2Mate MP3 Directo (320 kbps) */}
                <a
                  href={`https://www.y2mate.com/youtube-mp3/${resolvedTrack.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleRecordDownloadClick(resolvedTrack, 'MP3 (320 kbps)')}
                  className="p-4 sm:p-5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-black shadow-red-neon transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer border border-red-400/40"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-black text-sm sm:text-base">DESCARGAR MP3 (320 kbps)</span>
                        <span className="text-[8px] sm:text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-white font-bold">RECOMENDADO</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-red-100 font-medium mt-0.5 truncate">Descarga directa en PC o Teléfono Móvil</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                </a>

                {/* Opción 2: YT1S MP3 Rápido */}
                <a
                  href={`https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent(currentYtShort)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleRecordDownloadClick(resolvedTrack, 'MP3 (YT1S)')}
                  className="p-4 sm:p-5 bg-[#171717] hover:bg-[#222] border border-red-500/40 hover:border-red-500 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 text-red-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-sm sm:text-base">Servidor Rápido 2 (YT1S MP3)</span>
                      <p className="text-[11px] sm:text-xs text-gray-400 font-normal mt-0.5 truncate">Conversión instantánea en 1 clic</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                </a>

                {/* Opción 3: Cobalt Tools Sin Anuncios */}
                <a
                  href="https://cobalt.tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    navigator.clipboard.writeText(currentYtUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 3000);
                    handleRecordDownloadClick(resolvedTrack, 'MP3 (Cobalt)');
                  }}
                  className="p-3.5 sm:p-4 bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-red-500/50 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs sm:text-sm">Cobalt Tools</span>
                        <span className="text-[9px] bg-red-600/30 text-red-400 border border-red-500/40 px-1.5 py-0.2 rounded font-black">SIN ANUNCIOS</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal truncate">
                        {copiedLink ? '¡Enlace copiado! Pega en Cobalt' : 'Audio original en máxima fidelidad'}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                </a>

                {/* Opción 4: Video MP4 HD */}
                <a
                  href={`https://www.y2mate.com/youtube/${resolvedTrack.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleRecordDownloadClick(resolvedTrack, 'MP4 (1080p)')}
                  className="p-3.5 sm:p-4 bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-red-500/50 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Film className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs sm:text-sm">Descargar Video MP4 HD</span>
                      <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal truncate">Video musical completo en alta definición</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                </a>

              </div>
            </div>

            {/* Indicaciones para PC y Celular */}
            <div className="p-3.5 sm:p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span><strong>En PC:</strong> Se abrirá la ventana para guardar o irá directo a tu carpeta <em>Descargas</em>.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span><strong>En Móvil:</strong> Se descargará automáticamente en tu carpeta <em>Descargas / Música</em>.</span>
              </div>
            </div>

          </div>
        )}

        {downloadSuccess && (
          <div className="p-3.5 sm:p-4 bg-red-950/80 border border-red-500 text-white rounded-2xl text-xs font-black text-center animate-fadeIn shadow-red-neon flex items-center justify-center space-x-2">
            <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Ejemplos Rápidos de Prueba con 1 Clic */}
        <div className="pt-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            O prueba con una canción popular haciendo clic:
          </p>
          <div className="flex flex-wrap gap-2">
            {CURATED_TOP_HITS.slice(0, 8).map((track) => (
              <button
                key={track.videoId}
                type="button"
                onClick={() => handleSelectTrack(track)}
                className="text-xs px-3 py-1.5 sm:px-3.5 sm:py-2 bg-[#171717] hover:bg-red-950/40 border border-white/5 hover:border-red-500/50 rounded-xl text-gray-300 hover:text-white transition-all font-medium flex items-center space-x-1.5 cursor-pointer"
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
          <h2 className="text-base sm:text-lg md:text-xl font-black text-white flex items-center space-x-2">
            <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-[#E50914]" />
            <span>Historial de Descargas ({downloads.length})</span>
          </h2>
        </div>

        {downloads.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-[#121212] rounded-2xl sm:rounded-3xl border border-white/5 space-y-3 text-gray-400">
            <Download className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-700" />
            <h3 className="text-sm sm:text-base font-bold text-white">No tienes descargas registradas todavía</h3>
            <p className="text-xs max-w-md mx-auto">
              Escribe el nombre de cualquier canción arriba o pega un enlace para iniciar tu descarga.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloads.map((track) => (
              <div
                key={track.videoId}
                className="p-3.5 sm:p-4 bg-[#141414] hover:bg-[#1f1f1f] rounded-2xl border border-white/5 hover:border-red-500/30 transition-all flex items-center space-x-3 group shadow-lg"
              >
                <img 
                  src={track.thumbnail} 
                  alt={track.title} 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 shadow-md ring-1 ring-white/10"
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
                    className="p-2 sm:p-2.5 bg-red-600 text-white rounded-full hover:scale-105 transition-transform shadow-md hover:bg-red-500 cursor-pointer"
                    title="Reproducir"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
                  </button>

                  <button
                    onClick={() => handleSelectTrack(track)}
                    className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    title="Cargar en descargador"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(track.videoId)}
                    className="p-2 text-gray-500 hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Eliminar del historial"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modales extras */}
      {ringtoneTrack && (
        <RingtoneModal track={ringtoneTrack} onClose={() => setRingtoneTrack(null)} />
      )}

      {lyricsTrack && (
        <LyricsModal track={lyricsTrack} onClose={() => setLyricsTrack(null)} />
      )}

      {shareTrack && (
        <ShareModal track={shareTrack} onClose={() => setShareTrack(null)} />
      )}

    </div>
  );
}
