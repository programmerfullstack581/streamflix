import React, { useState } from 'react';
import { 
  Download, 
  Play, 
  Pause,
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
  FolderDown,
  SlidersHorizontal
} from 'lucide-react';
import { 
  MusicStorage, 
  extractVideoId, 
  extractPlaylistId,
  getPlaylistTracks,
  getTrackDetailsById,
  searchMusicOnline,
  CURATED_TOP_HITS 
} from '../services/musicService';
import RingtoneModal from './RingtoneModal';
import LyricsModal from './LyricsModal';
import ShareModal from './ShareModal';

export default function DownloadsView({
  downloads = [],
  onOpenDownloadModal,
  onRefreshDownloads
}) {
  const [urlInput, setUrlInput] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedTrack, setResolvedTrack] = useState(null);
  const [resolvedPlaylist, setResolvedPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [audioBitrate, setAudioBitrate] = useState('320k'); // 320k, 192k, 128k
  const [videoQuality, setVideoQuality] = useState('1080p'); // 1080p, 720p
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Preview player state inside card
  const [previewTrack, setPreviewTrack] = useState(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

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
      setResolvedPlaylist(null);
      setSearchResults([]);
      return;
    }

    setErrorMessage('');
    setIsResolving(true);
    setResolvedTrack(null);
    setResolvedPlaylist(null);
    setSearchResults([]);

    // 1. Verificar si es una PLAYLIST de YouTube
    const playlistId = extractPlaylistId(cleanInput);
    if (playlistId) {
      const playlistData = await getPlaylistTracks(playlistId);
      setIsResolving(false);
      if (playlistData && playlistData.tracks && playlistData.tracks.length > 0) {
        setResolvedPlaylist(playlistData);
        return;
      }
    }

    // 2. Verificar si es un video de YouTube directo
    const videoId = extractVideoId(cleanInput);
    const isUrl = /^(https?:\/\/|www\.|youtu\.be|youtube\.com)/i.test(cleanInput);

    if (videoId || isUrl) {
      const targetId = videoId || extractVideoId(cleanInput);
      if (targetId) {
        const details = await getTrackDetailsById(targetId);
        if (details) {
          setResolvedTrack(details);
          setIsResolving(false);
          MusicStorage.recordDownload(details, `Audio (MP3 ${audioBitrate})`);
          if (onRefreshDownloads) onRefreshDownloads();
          return;
        }
      }
      setIsResolving(false);
      setErrorMessage('❌ No se pudo encontrar el video con esa URL. Verifica que sea público.');
      return;
    }

    // 3. Búsqueda por Nombre de Canción
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
    setResolvedPlaylist(null);
    setUrlInput(`https://www.youtube.com/watch?v=${track.videoId}`);
    MusicStorage.recordDownload(track, `Audio (MP3 ${audioBitrate})`);
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
          MusicStorage.recordDownload(details, `Audio (MP3 ${audioBitrate})`);
          if (onRefreshDownloads) onRefreshDownloads();
        }
      }
    } catch (_) {}
  };

  // Descarga directa en formato Audio o Video
  const triggerDownloadAction = (track, formatType = 'audio') => {
    if (!track) return;
    
    const label = formatType === 'audio' ? `Audio MP3 (${audioBitrate})` : `Video MP4 (${videoQuality})`;
    MusicStorage.recordDownload(track, label);
    if (onRefreshDownloads) onRefreshDownloads();

    setDownloadSuccess(`🚀 ¡Descargando "${track.title}" en formato ${formatType === 'audio' ? 'AUDIO (MP3)' : 'VIDEO (MP4)'}!`);
    setTimeout(() => setDownloadSuccess(''), 6000);

    let targetUrl = '';
    if (formatType === 'audio') {
      targetUrl = `https://www.y2mate.com/youtube-mp3/${track.videoId}`;
    } else {
      targetUrl = `https://www.y2mate.com/youtube/${track.videoId}`;
    }

    window.open(targetUrl, '_blank');
  };

  const togglePreview = (track) => {
    if (previewTrack?.videoId === track.videoId && isPreviewPlaying) {
      setIsPreviewPlaying(false);
    } else {
      setPreviewTrack(track);
      setIsPreviewPlaying(true);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full overflow-x-hidden">
      
      {/* Header Banner Red Edition */}
      <div className="p-5 sm:p-8 md:p-10 bg-gradient-to-r from-red-950 via-[#141414] to-black rounded-2xl sm:rounded-3xl border border-red-600/30 shadow-red-neon relative overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-red-600/20 border border-red-500/40 rounded-full">
            <Zap className="w-4 h-4 text-red-500 animate-bounce" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-red-400">
              Descargador MP3 & MP4 Pro Edition
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Descargar Música en <span className="text-[#E50914] underline decoration-red-600">Audio (MP3)</span> o <span className="text-white underline decoration-red-600">Video (MP4)</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Escribe el nombre de la canción o pega un enlace de <strong className="text-white">YouTube o Playlist</strong>. Guarda canciones y videos directamente en tu <strong className="text-white">Celular o PC</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <span className="text-xs font-bold bg-red-950/80 border border-red-500/40 text-red-300 px-3 py-1 rounded-xl flex items-center space-x-1.5">
              <FileAudio className="w-4 h-4 text-red-400" />
              <span>Audio MP3 ({audioBitrate})</span>
            </span>
            <span className="text-xs font-bold bg-neutral-900 border border-white/10 text-gray-300 px-3 py-1 rounded-xl flex items-center space-x-1.5">
              <Film className="w-4 h-4 text-red-400" />
              <span>Video MP4 ({videoQuality})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Input de Búsqueda y Enlaces */}
      <div className="bg-[#121212] p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-red-600/30 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-sm sm:text-base md:text-lg font-black text-white flex items-center space-x-2">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#E50914]" />
            <span>Busca por Nombre o pega la URL (Canción o Playlist):</span>
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
              placeholder="Escribe: Martin Elias, Karol G, o pega https://youtu.be/... o playlist"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#E50914] text-white placeholder-gray-500 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-4 pr-10 text-xs sm:text-sm font-medium outline-none transition-all shadow-inner focus:ring-1 focus:ring-[#E50914]"
            />
            {urlInput && (
              <button
                type="button"
                onClick={() => { setUrlInput(''); setResolvedTrack(null); setResolvedPlaylist(null); setSearchResults([]); }}
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
                <Download className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
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

        {/* Detector de Playlists y Álbumes Completos */}
        {resolvedPlaylist && (
          <div className="p-5 sm:p-7 bg-gradient-to-br from-red-950/70 via-[#181818] to-[#0a0a0a] rounded-3xl border border-red-500/60 space-y-5 animate-fadeIn shadow-2xl">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
              <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <FolderDown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded text-white font-black">PLAYLIST / ÁLBUM</span>
                  <span className="text-xs text-gray-400 font-bold">{resolvedPlaylist.itemCount} canciones</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">{resolvedPlaylist.title}</h3>
                <p className="text-xs text-gray-400">{resolvedPlaylist.author}</p>
              </div>
            </div>

            <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
              {resolvedPlaylist.tracks.map((track, i) => (
                <div 
                  key={track.videoId + i}
                  className="p-3 bg-[#111] hover:bg-[#1a1a1a] rounded-2xl border border-white/5 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <span className="text-xs font-bold text-gray-500 w-5 text-center">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">{track.title}</h4>
                      <p className="text-[11px] text-gray-400 truncate">{track.artist} • {track.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => triggerDownloadAction(track, 'audio')}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-1"
                    >
                      <FileAudio className="w-3.5 h-3.5" />
                      <span>MP3</span>
                    </button>
                    <button
                      onClick={() => triggerDownloadAction(track, 'video')}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <Film className="w-3.5 h-3.5 text-red-400" />
                      <span>MP4</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel de Descarga de Canción Seleccionada (2 Formatos Grandes: Audio MP3 & Video MP4) */}
        {resolvedTrack && (
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-950/60 via-[#161616] to-[#0a0a0a] rounded-2xl sm:rounded-3xl border border-red-500/50 space-y-6 animate-fadeIn shadow-2xl">
            
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
                    Listo para Guardar
                  </span>
                  <span className="text-[10px] font-bold text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded-full border border-red-600/30">
                    {resolvedTrack.duration}
                  </span>
                </div>
                <h3 className="text-base sm:text-2xl font-black text-white truncate">{resolvedTrack.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium">{resolvedTrack.artist}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 font-mono">Selecciona abajo si deseas guardar el Audio o el Video:</p>
                
                {/* Herramientas Rápidas (Ringtone, Letras, Compartir) */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <button
                    onClick={() => togglePreview(resolvedTrack)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      previewTrack?.videoId === resolvedTrack.videoId && isPreviewPlaying
                        ? 'bg-red-600 text-white shadow-red-neon'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {previewTrack?.videoId === resolvedTrack.videoId && isPreviewPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pausar Preview</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Escuchar Preview</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setRingtoneTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Crear Ringtone</span>
                  </button>

                  <button
                    onClick={() => setLyricsTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <Mic2 className="w-3.5 h-3.5" />
                    <span>Ver Letra</span>
                  </button>

                  <button
                    onClick={() => setShareTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Preview player embebido */}
            {previewTrack?.videoId === resolvedTrack.videoId && isPreviewPlaying && (
              <div className="p-3 bg-black/60 rounded-2xl border border-red-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-red-400 font-bold">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Reproduciendo preview de audio...</span>
                </div>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${resolvedTrack.videoId}?autoplay=1`}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                  allow="autoplay"
                  title="preview"
                />
                <button
                  onClick={() => setIsPreviewPlaying(false)}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1 bg-white/10 rounded-lg"
                >
                  Detener
                </button>
              </div>
            )}

            {/* LOS 2 BOTONES PRINCIPALES DE DESCARGA: AUDIO Y VIDEO */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-white flex items-center space-x-2">
                <Download className="w-4 h-4 text-red-500" />
                <span>Selecciona tu formato de descarga:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* FORMATO 1: DESCARGAR EN AUDIO MP3 (320 KBPS) */}
                <button
                  onClick={() => triggerDownloadAction(resolvedTrack, 'audio')}
                  className="p-5 sm:p-6 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-3xl font-black shadow-red-neon transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer border border-red-400/40"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                      <FileAudio className="w-7 h-7 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-base sm:text-lg">DESCARGAR AUDIO (MP3)</span>
                        <span className="text-[9px] bg-black/60 px-2 py-0.5 rounded text-white font-bold">{audioBitrate.toUpperCase()}</span>
                      </div>
                      <p className="text-xs text-red-100 font-medium mt-1">Guarda solo el archivo de música en tu celular o PC</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                </button>

                {/* FORMATO 2: DESCARGAR EN VIDEO MP4 (HD 1080P) */}
                <button
                  onClick={() => triggerDownloadAction(resolvedTrack, 'video')}
                  className="p-5 sm:p-6 bg-[#161616] hover:bg-[#202020] border-2 border-red-500/50 hover:border-red-500 text-white rounded-3xl font-black transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600/20 text-red-400 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-500/30">
                      <Film className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-base sm:text-lg">DESCARGAR VIDEO (MP4)</span>
                        <span className="text-[9px] bg-red-600/30 border border-red-500/40 text-red-300 px-2 py-0.5 rounded font-bold">{videoQuality.toUpperCase()}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium mt-1">Guarda el video musical completo en tu celular o PC</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </button>

              </div>
            </div>

            {/* Indicaciones para PC y Celular */}
            <div className="p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span><strong>En PC:</strong> Se guardará directamente en tu carpeta <em>Descargas</em>.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span><strong>En Celular:</strong> Se guardará automáticamente en tu carpeta <em>Descargas / Música o Videos</em>.</span>
              </div>
            </div>

          </div>
        )}

        {/* Resultados de Búsqueda por Nombre */}
        {searchResults.length > 0 && !resolvedTrack && !resolvedPlaylist && (
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <Music className="w-4 h-4 text-red-500" />
              <span>Resultados encontrados ({searchResults.length}) — Descarga en Audio o Video:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
              {searchResults.map((track) => (
                <div
                  key={track.videoId}
                  className="p-4 bg-[#171717] hover:bg-[#202020] rounded-2xl border border-white/5 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-3 group shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <img src={track.thumbnail} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow ring-1 ring-white/10" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">{track.title}</h4>
                      <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                      <span className="text-[10px] text-red-400 font-mono font-bold mt-0.5 block">{track.duration}</span>
                    </div>
                  </div>

                  {/* Botones de acción directa: Audio MP3 y Video MP4 */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                    <button
                      onClick={() => triggerDownloadAction(track, 'audio')}
                      className="py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-red-neon transition-transform hover:scale-[1.02] flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <FileAudio className="w-3.5 h-3.5" />
                      <span>Audio (MP3)</span>
                    </button>

                    <button
                      onClick={() => triggerDownloadAction(track, 'video')}
                      className="py-2.5 px-3 bg-[#252525] hover:bg-[#333] border border-white/10 text-white font-bold text-xs rounded-xl transition-transform hover:scale-[1.02] flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Film className="w-3.5 h-3.5 text-red-400" />
                      <span>Video (MP4)</span>
                    </button>
                  </div>
                </div>
              ))}
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
            O descarga una canción popular con 1 clic:
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
              Escribe el nombre de cualquier canción o pega un enlace para descargar en Audio (MP3) o Video (MP4).
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
                      {track.downloadFormat || 'Audio (MP3)'}
                    </span>
                    <span className="text-[10px] text-gray-500">{track.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => triggerDownloadAction(track, 'audio')}
                    className="p-2 bg-red-600 text-white rounded-xl hover:scale-105 transition-transform shadow-md hover:bg-red-500 cursor-pointer"
                    title="Descargar Audio MP3"
                  >
                    <FileAudio className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => triggerDownloadAction(track, 'video')}
                    className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
                    title="Descargar Video MP4"
                  >
                    <Film className="w-3.5 h-3.5 text-red-400" />
                  </button>

                  <button
                    onClick={() => handleDelete(track.videoId)}
                    className="p-2 text-gray-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Eliminar del historial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
