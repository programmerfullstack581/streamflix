import React, { useState, useRef, useEffect } from 'react';
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
  SlidersHorizontal, 
  Square, 
  Flame, 
  Filter, 
  Youtube, 
  ShieldCheck, 
  Music2, 
  TrendingUp, 
  QrCode, 
  Sliders, 
  Volume2,
  FolderDown
} from 'lucide-react';
import { 
  MusicStorage, 
  extractVideoId, 
  extractPlaylistId, 
  getPlaylistTracks, 
  getTrackDetailsById, 
  searchMusicOnline, 
  getYoutubeThumbnail, 
  CURATED_TOP_HITS, 
  TRENDING_GENRES_TABS 
} from '../services/musicService';
import RingtoneModal from './RingtoneModal';
import LyricsModal from './LyricsModal';
import ShareModal from './ShareModal';
import QRCodeModal from './QRCodeModal';
import AudioEffectsModal from './AudioEffectsModal';

// Sugerencias de tendencias en YouTube en vivo
const YOUTUBE_TRENDING_TOPICS = [
  { label: '🔥 Éxitos del Momento', query: 'top exitos musicales 2024' },
  { label: '🌴 Reggaetón 2024', query: 'reggaeton 2024 hits oficial' },
  { label: '🤠 Regional Mexicano', query: 'regional mexicano lo mas nuevo' },
  { label: '🪗 Vallenatos', query: 'vallenatos clasicos y nuevos' },
  { label: '🎺 Salsa Brava', query: 'salsa brava exitos' },
  { label: '🎸 Rock en Español', query: 'rock en espanol clasicos' },
  { label: '⚡ Trap Latino', query: 'trap latino 2024' },
  { label: '🌟 Karol G', query: 'Karol G canciones oficiales' },
  { label: '🐰 Bad Bunny', query: 'Bad Bunny audio oficial' },
  { label: '💚 Feid (Ferxxo)', query: 'Feid audio oficial' },
  { label: '🐺 Shakira', query: 'Shakira canciones oficiales' },
  { label: '🪶 Peso Pluma', query: 'Peso Pluma canciones oficiales' },
];

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
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [audioBitrate, setAudioBitrate] = useState('320k'); // 320k, 192k, 128k
  const [videoQuality, setVideoQuality] = useState('1080p'); // 1080p, 720p
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Tendencias en vivo desde YouTube
  const [liveTrending, setLiveTrending] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [activeTrendingChip, setActiveTrendingChip] = useState('top exitos musicales 2024');

  // Batch Playlist state
  const [batchProgress, setBatchProgress] = useState(null);
  const [completedPlaylistTracks, setCompletedPlaylistTracks] = useState([]);
  const cancelBatchRef = useRef(false);

  // Preview player state inside card
  const [previewTrack, setPreviewTrack] = useState(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // Modales adicionales
  const [ringtoneTrack, setRingtoneTrack] = useState(null);
  const [lyricsTrack, setLyricsTrack] = useState(null);
  const [shareTrack, setShareTrack] = useState(null);
  const [qrTrack, setQrTrack] = useState(null);
  const [effectsTrack, setEffectsTrack] = useState(null);
  const [appliedEffect, setAppliedEffect] = useState(null);

  const topSectionRef = useRef(null);

  // Cargar tendencias reales de YouTube en el inicio
  useEffect(() => {
    fetchTrendingFromYoutube('top exitos musicales 2024');
  }, []);

  const fetchTrendingFromYoutube = async (queryTopic) => {
    setIsLoadingTrending(true);
    setActiveTrendingChip(queryTopic);
    try {
      const results = await searchMusicOnline(queryTopic);
      if (results && results.length > 0) {
        setLiveTrending(results);
      }
    } catch (_) {
    } finally {
      setIsLoadingTrending(false);
    }
  };

  // Analizar enlace URL o buscar en vivo en YouTube por Nombre
  const handleAnalyzeOrSearch = async (e, customQuery = null) => {
    if (e) e.preventDefault();
    const query = (customQuery !== null ? customQuery : urlInput).trim();
    if (!query) {
      setErrorMessage('⚠️ Escribe el nombre de una canción o pega un enlace de YouTube.');
      return;
    }

    if (customQuery !== null) {
      setUrlInput(customQuery);
    }

    setErrorMessage('');
    setIsResolving(true);
    setResolvedTrack(null);
    setResolvedPlaylist(null);
    setActiveSearchTerm(query);

    // 1. Verificar si es una PLAYLIST de YouTube
    const playlistId = extractPlaylistId(query);
    if (playlistId) {
      const playlistData = await getPlaylistTracks(playlistId);
      setIsResolving(false);
      if (playlistData && playlistData.tracks && playlistData.tracks.length > 0) {
        setResolvedPlaylist(playlistData);
        scrollToTop();
        return;
      }
    }

    // 2. Verificar si es un video de YouTube directo
    const videoId = extractVideoId(query);
    const isUrl = /^(https?:\/\/|www\.|youtu\.be|youtube\.com)/i.test(query);

    if (videoId || isUrl) {
      const targetId = videoId || extractVideoId(query);
      if (targetId) {
        const details = await getTrackDetailsById(targetId);
        if (details) {
          setResolvedTrack(details);
          setIsResolving(false);
          MusicStorage.recordDownload(details, `Audio (MP3 ${audioBitrate})`);
          if (onRefreshDownloads) onRefreshDownloads();
          scrollToTop();
          return;
        }
      }
      setIsResolving(false);
      setErrorMessage('❌ No se pudo encontrar el video con esa URL. Verifica que el enlace de YouTube sea público.');
      return;
    }

    // 3. Búsqueda en vivo en YouTube por nombre
    const results = await searchMusicOnline(query);
    setIsResolving(false);
    if (results && results.length > 0) {
      setSearchResults(results);
    } else {
      setErrorMessage(`❌ No se encontraron resultados en YouTube para "${query}". Intenta con otro término.`);
    }
  };

  const scrollToTop = () => {
    if (topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Función estrella: Copiar URL de YouTube, pegarla arriba y preparar descarga
  const handleCopyUrlAndPrepareDownload = (track) => {
    const ytUrl = track.youtubeUrl || `https://www.youtube.com/watch?v=${track.videoId}`;
    
    // 1. Copiar al portapapeles del dispositivo
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ytUrl);
      }
    } catch (_) {}

    // 2. Colocar la URL en la barra de búsqueda
    setUrlInput(ytUrl);

    // 3. Seleccionar la canción lista para descargar
    setResolvedTrack(track);
    setResolvedPlaylist(null);
    setCopiedId(track.videoId);
    setTimeout(() => setCopiedId(null), 3500);

    // 4. Mostrar confirmación visual
    setDownloadSuccess(`📋 ¡URL copiada! "${track.title}" está lista para descargar en Audio MP3 o Video MP4.`);
    setTimeout(() => setDownloadSuccess(''), 6000);

    // 5. Desplazar la pantalla suavemente hacia la zona de descarga
    scrollToTop();

    MusicStorage.recordDownload(track, `Audio (MP3 ${audioBitrate})`);
    if (onRefreshDownloads) onRefreshDownloads();
  };

  const handleSelectTrack = (track) => {
    setResolvedTrack(track);
    setResolvedPlaylist(null);
    setUrlInput(`https://www.youtube.com/watch?v=${track.videoId}`);
    MusicStorage.recordDownload(track, `Audio (MP3 ${audioBitrate})`);
    if (onRefreshDownloads) onRefreshDownloads();
    scrollToTop();
  };

  const handleDelete = (videoId) => {
    MusicStorage.removeDownload(videoId);
    if (onRefreshDownloads) onRefreshDownloads();
  };

  const handleClearAllDownloads = () => {
    if (window.confirm('¿Deseas vaciar todo tu historial de descargas?')) {
      MusicStorage.clearAllDownloads();
      if (onRefreshDownloads) onRefreshDownloads();
      setDownloadSuccess('🧹 Historial de descargas vaciado correctamente.');
      setTimeout(() => setDownloadSuccess(''), 4000);
    }
  };

  const handleClearInput = () => {
    setUrlInput('');
    setResolvedTrack(null);
    setResolvedPlaylist(null);
    setSearchResults([]);
    setActiveSearchTerm('');
    setErrorMessage('');
    setDownloadSuccess('');
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
          scrollToTop();
        }
      }
    } catch (_) {}
  };

  // Descarga en lote de toda una Playlist de YouTube
  const handleDownloadAllPlaylist = async (playlist, formatType = 'audio') => {
    if (!playlist || !playlist.tracks || playlist.tracks.length === 0) return;

    cancelBatchRef.current = false;
    setCompletedPlaylistTracks([]);
    setErrorMessage('');

    const tracks = playlist.tracks;
    setBatchProgress({
      current: 1,
      total: tracks.length,
      trackTitle: tracks[0].title,
      format: formatType,
      isRunning: true
    });

    for (let i = 0; i < tracks.length; i++) {
      if (cancelBatchRef.current) {
        setDownloadSuccess('⏹️ Descarga en lote detenida.');
        break;
      }

      const track = tracks[i];
      setBatchProgress({
        current: i + 1,
        total: tracks.length,
        trackTitle: track.title,
        format: formatType,
        isRunning: true
      });

      try {
        const ytUrl = `https://www.youtube.com/watch?v=${track.videoId}`;
        const res = await fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: ytUrl, format: formatType })
        });

        const data = await res.json();
        if (data.success && data.downloadUrl) {
          const ext = formatType === 'audio' ? 'mp3' : 'mp4';
          const cleanName = `${track.title} - ${track.artist}`.replace(/[<>:"/\\|?*]/g, '').substring(0, 150);
          const finalFilename = `${cleanName}.${ext}`;

          const link = document.createElement('a');
          link.href = data.downloadUrl;
          link.download = finalFilename;
          link.target = '_self';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => document.body.removeChild(link), 1500);

          setCompletedPlaylistTracks(prev => [...prev, track.videoId]);
          MusicStorage.recordDownload(track, formatType === 'audio' ? 'Audio MP3 (Batch)' : 'Video MP4 (Batch)');
          if (onRefreshDownloads) onRefreshDownloads();
        }
      } catch (err) {
        console.error('Batch item error:', err);
      }

      if (i < tracks.length - 1 && !cancelBatchRef.current) {
        await new Promise(r => setTimeout(r, 2500));
      }
    }

    if (!cancelBatchRef.current) {
      setDownloadSuccess(`🎉 ¡Toda la playlist "${playlist.title}" ha sido descargada!`);
    }

    setBatchProgress(null);
    setTimeout(() => setDownloadSuccess(''), 10000);
  };

  const handleCancelBatch = () => {
    cancelBatchRef.current = true;
    setBatchProgress(null);
    setDownloadSuccess('⏹️ Cola de descarga de playlist cancelada.');
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  // Descarga directa individual
  const [downloadingId, setDownloadingId] = useState(null);

  const triggerDownloadAction = async (track, formatType = 'audio', retryCount = 0) => {
    if (!track) return;
    
    const label = formatType === 'audio' ? `Audio MP3 (${audioBitrate})` : `Video MP4 (${videoQuality})`;
    const ext = formatType === 'audio' ? 'mp3' : 'mp4';
    const mimeType = formatType === 'audio' ? 'audio/mpeg' : 'video/mp4';
    const cleanName = `${track.title} - ${track.artist}`.replace(/[<>:"/\\|?*]/g, '').substring(0, 150);
    const finalFilename = `${cleanName}.${ext}`;

    if (retryCount === 0) {
      MusicStorage.recordDownload(track, label);
      if (onRefreshDownloads) onRefreshDownloads();
    }

    setDownloadingId(track.videoId + formatType);
    setErrorMessage('');
    setDownloadSuccess(
      retryCount > 0
        ? `🔄 Reintentando descarga (intento ${retryCount + 1})...`
        : `⏳ Preparando "${track.title}" en ${formatType === 'audio' ? 'Audio MP3' : 'Video MP4'}...`
    );

    try {
      const ytUrl = `https://www.youtube.com/watch?v=${track.videoId}`;

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: ytUrl, format: formatType })
      });

      const data = await response.json();

      if (data.success && data.downloadUrl) {
        setDownloadSuccess(`⬇️ Descargando "${track.title}"...`);

        // PC: Explorador "Guardar como..." si está soportado
        if ('showSaveFilePicker' in window) {
          try {
            const fileHandle = await window.showSaveFilePicker({
              suggestedName: finalFilename,
              types: [{
                description: formatType === 'audio' ? 'Archivo de Audio MP3' : 'Archivo de Video MP4',
                accept: { [mimeType]: [`.${ext}`] }
              }]
            });

            setDownloadSuccess(`📥 Guardando "${track.title}" en la carpeta seleccionada...`);

            const fileResponse = await fetch(data.downloadUrl, {
              headers: { 'Accept': '*/*' }
            });

            if (!fileResponse.ok) throw new Error('Download stream failed');

            const blob = await fileResponse.blob();
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();

            setDownloadSuccess(`✅ ¡"${finalFilename}" se guardó correctamente en tu dispositivo!`);
            setDownloadingId(null);
            setTimeout(() => setDownloadSuccess(''), 10000);
            return;

          } catch (pickerErr) {
            if (pickerErr.name === 'AbortError') {
              setDownloadingId(null);
              setDownloadSuccess('');
              return;
            }
            console.warn('File picker fallback triggered:', pickerErr.message);
          }
        }

        // Descarga nativa directa (móvil y fallback)
        setDownloadSuccess(`⬇️ Descargando "${finalFilename}"...`);

        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = finalFilename;
        link.target = '_self';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
        }, 2000);

        setDownloadSuccess(`✅ ¡Descarga iniciada! El archivo se guardó en tu carpeta de Descargas.`);
        setDownloadingId(null);
        setTimeout(() => setDownloadSuccess(''), 10000);
        return;
      }

      if (data.retryable && retryCount < 2) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return triggerDownloadAction(track, formatType, retryCount + 1);
      }

      setDownloadingId(null);
      setDownloadSuccess('');
      setErrorMessage(`⚠️ ${data.error || 'Los servidores de descarga están procesando tu solicitud.'} Intenta de nuevo en unos segundos.`);
      setTimeout(() => setErrorMessage(''), 10000);

    } catch (err) {
      setDownloadingId(null);
      setDownloadSuccess('');
      setErrorMessage('⚠️ Error de conexión al servidor de descarga. Revisa tu conexión a internet e intenta de nuevo.');
      setTimeout(() => setErrorMessage(''), 10000);
    }
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
    <div ref={topSectionRef} className="space-y-6 sm:space-y-8 animate-fadeIn w-full overflow-x-hidden">
      
      {/* Header Banner - Ultra Profesional Modo Claro Azul Cielo & Blanco */}
      <div className="p-6 sm:p-9 md:p-11 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 rounded-2xl sm:rounded-3xl shadow-xl shadow-sky-500/15 relative overflow-hidden text-center sm:text-left text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-sky-300/15 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white">
            <Youtube className="w-4 h-4 text-white fill-white" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase">
              Conexión en Vivo con YouTube & Descargas Directas
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Descargar Música en <span className="text-sky-100 underline decoration-white/70">Audio (MP3)</span> o <span className="text-white underline decoration-sky-200">Video (MP4)</span>
          </h1>

          <p className="text-xs sm:text-sm text-sky-50 leading-relaxed max-w-2xl">
            Busca cualquier canción en vivo en <strong className="text-white font-bold">YouTube</strong>, copia su enlace con 1 clic y descárgala en la más alta calidad en tu <strong className="text-white font-bold">Celular o PC</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <span className="text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3.5 py-1.5 rounded-xl flex items-center space-x-2 shadow-sm">
              <FileAudio className="w-4 h-4 text-white" />
              <span>Audio MP3 ({audioBitrate})</span>
            </span>
            <span className="text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3.5 py-1.5 rounded-xl flex items-center space-x-2 shadow-sm">
              <Film className="w-4 h-4 text-white" />
              <span>Video MP4 ({videoQuality})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Calidad Profesional & Confianza (Tarjetas Blancas con Acentos Azul Cielo) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white rounded-2xl border border-sky-100 hover:border-sky-300 transition-all flex items-center space-x-3.5 shadow-sm hover:shadow-md group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <FileAudio className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">MP3 320 kbps</h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Audio HD de estudio</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-sky-100 hover:border-sky-300 transition-all flex items-center space-x-3.5 shadow-sm hover:shadow-md group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">Video MP4 1080p</h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Full HD sin cortes</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-sky-100 hover:border-sky-300 transition-all flex items-center space-x-3.5 shadow-sm hover:shadow-md group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">Carátula & Auto</h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Listo para Celular & BT</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-sky-100 hover:border-sky-300 transition-all flex items-center space-x-3.5 shadow-sm hover:shadow-md group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">100% Gratis</h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Sin límites ni registro</p>
          </div>
        </div>
      </div>

      {/* Panel Principal: Input de Búsqueda y Enlaces de YouTube */}
      <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-sky-100 shadow-xl shadow-sky-900/5 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xs sm:text-base md:text-lg font-black text-slate-900 flex items-center space-x-2">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] flex-shrink-0" />
            <span className="truncate">Busca una canción en YouTube o pega su enlace:</span>
          </h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="flex-1 sm:flex-none text-xs font-bold text-sky-700 hover:text-sky-800 px-3.5 py-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-all flex items-center justify-center space-x-1.5 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title="Pegar enlace copiado"
            >
              <span>📋 Pegar Enlace</span>
            </button>
            <button
              type="button"
              onClick={handleClearInput}
              className="flex-1 sm:flex-none text-xs font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all flex items-center justify-center space-x-1.5 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title="Limpiar campo y resultados"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* Formulario Principal de Búsqueda */}
        <form onSubmit={handleAnalyzeOrSearch} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Escribe el nombre de la canción o pega un enlace de YouTube (https://youtu.be/...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 text-slate-900 placeholder-slate-400 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-4 pr-10 text-xs sm:text-sm font-medium outline-none transition-all shadow-inner focus:ring-2 focus:ring-sky-500/20"
            />
            {urlInput && (
              <button
                type="button"
                onClick={() => { setUrlInput(''); setResolvedTrack(null); setResolvedPlaylist(null); setSearchResults([]); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isResolving}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all hover:scale-105 shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2 flex-shrink-0 disabled:opacity-50 cursor-pointer"
          >
            {isResolving ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Buscando en YouTube...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>BUSCAR EN YOUTUBE</span>
              </>
            )}
          </button>
        </form>

        {/* Chips de Búsqueda Rápida en YouTube */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center space-x-2 text-xs text-slate-600 font-bold">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Tendencias en YouTube (haz clic para buscar):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent">
            {YOUTUBE_TRENDING_TOPICS.map((topic) => {
              const isActive = activeTrendingChip === topic.query;
              return (
                <button
                  key={topic.query}
                  type="button"
                  onClick={() => {
                    fetchTrendingFromYoutube(topic.query);
                    handleAnalyzeOrSearch(null, topic.query);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 flex items-center space-x-1 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20 scale-105'
                      : 'bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 hover:border-sky-200'
                  }`}
                >
                  <span>{topic.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {downloadSuccess && (
          <div className="p-4 bg-sky-50 border border-sky-300 text-sky-900 rounded-2xl text-xs font-black text-center animate-fadeIn shadow-md flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Panel de Descarga de Canción Seleccionada (Audio MP3 & Video MP4 Grandes) */}
        {resolvedTrack && (
          <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/70 rounded-2xl sm:rounded-3xl border-2 border-sky-300 space-y-6 animate-fadeIn shadow-xl">
            
            {/* Detalles de la Canción de YouTube */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-sky-100">
              <img
                src={resolvedTrack.thumbnail || getYoutubeThumbnail(resolvedTrack.videoId)}
                alt={resolvedTrack.title}
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://img.youtube.com/vi/${resolvedTrack.videoId}/0.jpg`;
                }}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-lg ring-2 ring-sky-400 flex-shrink-0"
              />

              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white tracking-wider flex items-center space-x-1 shadow-sm">
                    <Youtube className="w-3 h-3 fill-current" />
                    <span>Video de YouTube Listo</span>
                  </span>
                  <span className="text-[10px] font-bold text-sky-800 font-mono bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                    {resolvedTrack.duration}
                  </span>
                </div>
                <h3 className="text-base sm:text-2xl font-black text-slate-900 truncate">{resolvedTrack.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold">{resolvedTrack.artist}</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-mono">
                  URL: https://www.youtube.com/watch?v={resolvedTrack.videoId}
                </p>
                
                {/* Herramientas Rápidas */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <button
                    onClick={() => handleCopyUrlAndPrepareDownload(resolvedTrack)}
                    className="px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5 text-sky-600" />
                    <span>Copiar Enlace</span>
                  </button>

                  <button
                    onClick={() => togglePreview(resolvedTrack)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
                      previewTrack?.videoId === resolvedTrack.videoId && isPreviewPlaying
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/20'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {previewTrack?.videoId === resolvedTrack.videoId && isPreviewPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pausar Preview</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
                        <span>Escuchar Preview</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setEffectsTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                    title="Ajustar graves y potencia"
                  >
                    <Sliders className="w-3.5 h-3.5 text-sky-600" />
                    <span>Bass Booster / EQ</span>
                  </button>

                  <button
                    onClick={() => setQrTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                    title="Generar código QR para celular"
                  >
                    <QrCode className="w-3.5 h-3.5 text-sky-600" />
                    <span>Código QR</span>
                  </button>

                  <button
                    onClick={() => setLyricsTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <Mic2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Letra</span>
                  </button>

                  <button
                    onClick={() => setRingtoneTrack(resolvedTrack)}
                    className="px-2.5 py-1.5 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <Scissors className="w-3.5 h-3.5 text-sky-600" />
                    <span>Ringtone</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${resolvedTrack.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-rose-500" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Preview player embebido */}
            {previewTrack?.videoId === resolvedTrack.videoId && isPreviewPlaying && (
              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-between shadow-inner">
                <div className="flex items-center space-x-2 text-xs text-sky-800 font-bold">
                  <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
                  <span>Reproduciendo previa desde YouTube...</span>
                </div>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${resolvedTrack.videoId}?autoplay=1`}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                  allow="autoplay"
                  title="preview"
                />
                <button
                  onClick={() => setIsPreviewPlaying(false)}
                  className="text-xs text-slate-700 hover:text-slate-900 px-3 py-1 bg-white border border-slate-200 rounded-lg cursor-pointer font-bold shadow-sm"
                >
                  Detener
                </button>
              </div>
            )}

            {/* LOS 2 BOTONES PRINCIPALES DE DESCARGA: AUDIO Y VIDEO */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                <Download className="w-4 h-4 text-[#0284C7]" />
                <span>Elige tu formato de descarga para guardar en tu dispositivo:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* FORMATO 1: DESCARGAR EN AUDIO MP3 */}
                <button
                  onClick={() => triggerDownloadAction(resolvedTrack, 'audio')}
                  disabled={downloadingId === resolvedTrack.videoId + 'audio'}
                  className="p-5 sm:p-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-3xl font-black shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer border border-sky-400 disabled:opacity-70 disabled:cursor-wait"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-sky-600 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                      {downloadingId === resolvedTrack.videoId + 'audio' ? (
                        <Loader2 className="w-7 h-7 animate-spin text-sky-600" />
                      ) : (
                        <FileAudio className="w-7 h-7 fill-sky-600 text-sky-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-base sm:text-lg">
                          {downloadingId === resolvedTrack.videoId + 'audio' ? 'DESCARGANDO...' : 'DESCARGAR AUDIO (MP3)'}
                        </span>
                        <span className="text-[9px] bg-white/25 px-2 py-0.5 rounded text-white font-bold">{audioBitrate.toUpperCase()}</span>
                      </div>
                      <p className="text-xs text-sky-100 font-medium mt-1">
                        {downloadingId === resolvedTrack.videoId + 'audio' 
                          ? 'Procesando tu archivo de audio...' 
                          : 'Se guarda directo en tu celular o PC'}
                      </p>
                    </div>
                  </div>
                  {downloadingId === resolvedTrack.videoId + 'audio' ? (
                    <Loader2 className="w-5 h-5 animate-spin flex-shrink-0 ml-2 text-white" />
                  ) : (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                  )}
                </button>

                {/* FORMATO 2: DESCARGAR EN VIDEO MP4 */}
                <button
                  onClick={() => triggerDownloadAction(resolvedTrack, 'video')}
                  disabled={downloadingId === resolvedTrack.videoId + 'video'}
                  className="p-5 sm:p-6 bg-white hover:bg-sky-50 border-2 border-sky-300 hover:border-sky-500 text-slate-900 rounded-3xl font-black transition-all hover:scale-[1.02] flex items-center justify-between text-left group cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-wait"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center flex-shrink-0 border border-sky-200">
                      {downloadingId === resolvedTrack.videoId + 'video' ? (
                        <Loader2 className="w-7 h-7 animate-spin text-sky-600" />
                      ) : (
                        <Film className="w-7 h-7 text-sky-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-base sm:text-lg text-slate-900">
                          {downloadingId === resolvedTrack.videoId + 'video' ? 'DESCARGANDO...' : 'DESCARGAR VIDEO (MP4)'}
                        </span>
                        <span className="text-[9px] bg-sky-100 border border-sky-200 text-sky-800 px-2 py-0.5 rounded font-bold">{videoQuality.toUpperCase()}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {downloadingId === resolvedTrack.videoId + 'video'
                          ? 'Procesando tu archivo de video...'
                          : 'Se guarda directo en tu celular o PC'}
                      </p>
                    </div>
                  </div>
                  {downloadingId === resolvedTrack.videoId + 'video' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-sky-600 flex-shrink-0 ml-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-sky-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  )}
                </button>

              </div>
            </div>

            {/* Indicaciones para PC y Celular */}
            <div className="p-4 bg-white rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-xs text-slate-600 shadow-sm">
              <div className="flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span><strong>En PC:</strong> Se guardará en tu carpeta <em>Descargas</em> o donde elijas.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span><strong>En Celular:</strong> Se guardará automáticamente en tu almacenamiento interno.</span>
              </div>
            </div>

          </div>
        )}

        {/* Detector de Playlists de YouTube */}
        {resolvedPlaylist && (
          <div className="p-5 sm:p-7 bg-gradient-to-br from-sky-50 via-white to-blue-50 rounded-3xl border-2 border-sky-300 space-y-5 animate-fadeIn shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-sky-100">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                  <FolderDown className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-sky-600 px-2 py-0.5 rounded text-white font-black">PLAYLIST DE YOUTUBE</span>
                    <span className="text-xs text-slate-500 font-bold">{resolvedPlaylist.tracks.length} canciones</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 truncate">{resolvedPlaylist.title}</h3>
                  <p className="text-xs text-slate-600 truncate">{resolvedPlaylist.author}</p>
                </div>
              </div>
            </div>

            {batchProgress && (
              <div className="p-4 bg-white border border-sky-200 rounded-2xl space-y-3 animate-fadeIn shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold min-w-0 truncate">
                    <Loader2 className="w-4 h-4 text-sky-600 animate-spin flex-shrink-0" />
                    <span className="truncate">
                      Descargando {batchProgress.current} de {batchProgress.total}: <em>"{batchProgress.trackTitle}"</em>
                    </span>
                  </div>
                  <button
                    onClick={handleCancelBatch}
                    className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg font-bold flex items-center space-x-1 flex-shrink-0 ml-2 border border-rose-200 cursor-pointer"
                  >
                    <Square className="w-3 h-3 fill-current" />
                    <span>Detener</span>
                  </button>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${Math.round((batchProgress.current / batchProgress.total) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-600" />
                <span>Descarga automática de toda la playlist:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleDownloadAllPlaylist(resolvedPlaylist, 'audio')}
                  disabled={batchProgress?.isRunning}
                  className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <FileAudio className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>⚡ DESCARGAR TODAS EN AUDIO (MP3)</span>
                </button>

                <button
                  onClick={() => handleDownloadAllPlaylist(resolvedPlaylist, 'video')}
                  disabled={batchProgress?.isRunning}
                  className="p-4 bg-white hover:bg-sky-50 border-2 border-sky-300 text-sky-800 rounded-2xl font-black text-xs sm:text-sm transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Film className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
                  <span>🎬 DESCARGAR TODAS EN VIDEO (MP4)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sección de Resultados de Búsqueda en Vivo de YouTube */}
        {searchResults.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                <Youtube className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Resultados de YouTube para "{activeSearchTerm}" ({searchResults.length})</span>
              </h3>
              <button
                onClick={() => setSearchResults([])}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Ocultar resultados
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
              {searchResults.map((track) => (
                <SongCard
                  key={track.videoId}
                  track={track}
                  isCopied={copiedId === track.videoId}
                  onCopyAndDownload={handleCopyUrlAndPrepareDownload}
                  onSelect={handleSelectTrack}
                  onDownloadAudio={() => triggerDownloadAction(track, 'audio')}
                  onDownloadVideo={() => triggerDownloadAction(track, 'video')}
                  onTogglePreview={() => togglePreview(track)}
                  isPreviewPlaying={previewTrack?.videoId === track.videoId && isPreviewPlaying}
                  isAudioDownloading={downloadingId === track.videoId + 'audio'}
                  isVideoDownloading={downloadingId === track.videoId + 'video'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sección de Exploración de YouTube en Vivo (Tendencias y Videos reales) */}
        <div className="pt-6 sm:pt-8 border-t border-slate-100 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Youtube className="w-5 h-5 text-rose-500 fill-rose-500 flex-shrink-0" />
                <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight">
                  Canciones & Videos en Vivo de YouTube
                </h3>
                {isLoadingTrending && (
                  <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
                )}
              </div>
              <p className="text-xs text-slate-500">
                Cada tarjeta te permite <strong className="text-slate-800">Copiar la URL</strong>, <strong className="text-slate-800">Descargar en MP3/MP4</strong> o <strong className="text-slate-800">Escuchar Previa</strong>.
              </p>
            </div>
          </div>

          {/* Grilla de Canciones en Vivo de YouTube */}
          {liveTrending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[650px] overflow-y-auto pr-1">
              {liveTrending.map((track) => (
                <SongCard
                  key={track.videoId}
                  track={track}
                  isCopied={copiedId === track.videoId}
                  onCopyAndDownload={handleCopyUrlAndPrepareDownload}
                  onSelect={handleSelectTrack}
                  onDownloadAudio={() => triggerDownloadAction(track, 'audio')}
                  onDownloadVideo={() => triggerDownloadAction(track, 'video')}
                  onTogglePreview={() => togglePreview(track)}
                  isPreviewPlaying={previewTrack?.videoId === track.videoId && isPreviewPlaying}
                  isAudioDownloading={downloadingId === track.videoId + 'audio'}
                  isVideoDownloading={downloadingId === track.videoId + 'video'}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Cargando canciones y videos directamente desde YouTube...
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Historial de Descargas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 flex items-center space-x-2">
            <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7]" />
            <span>Historial de Descargas ({downloads.length})</span>
          </h2>
          {downloads.length > 0 && (
            <button
              onClick={handleClearAllDownloads}
              className="text-xs font-bold text-slate-600 hover:text-rose-600 px-3.5 py-1.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-sm"
              title="Vaciar todo el historial"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Vaciar Historial</span>
            </button>
          )}
        </div>

        {downloads.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl sm:rounded-3xl border border-sky-100 shadow-sm space-y-3 text-slate-500">
            <Download className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-sky-300" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">No tienes descargas registradas todavía</h3>
            <p className="text-xs max-w-md mx-auto">
              Escribe el nombre de cualquier canción de YouTube para descargar en Audio (MP3) o Video (MP4).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloads.map((track) => (
              <div
                key={track.videoId}
                className="p-3.5 sm:p-4 bg-white hover:bg-sky-50/50 rounded-2xl border border-slate-200 hover:border-sky-300 transition-all flex items-center space-x-3 group shadow-sm hover:shadow-md"
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
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 shadow ring-1 ring-sky-100"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{track.title}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{track.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {track.downloadFormat || 'Audio (MP3)'}
                    </span>
                    <span className="text-[10px] text-slate-400">{track.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => triggerDownloadAction(track, 'audio')}
                    className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:scale-105 transition-transform shadow-md shadow-sky-500/20 cursor-pointer"
                    title="Descargar Audio MP3"
                  >
                    <FileAudio className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => triggerDownloadAction(track, 'video')}
                    className="p-2 bg-white text-sky-700 border border-sky-200 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer"
                    title="Descargar Video MP4"
                  >
                    <Film className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(track.videoId)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
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

      {/* Barra Flotante de Reproducción de Preview */}
      {previewTrack && isPreviewPlaying && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-xl border border-sky-300 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-slideUp">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${previewTrack.videoId}?autoplay=1`}
            className="w-0 h-0 opacity-0 pointer-events-none absolute"
            allow="autoplay"
            title="preview-audio"
          />
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={previewTrack.thumbnail || getYoutubeThumbnail(previewTrack.videoId)}
              alt={previewTrack.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://img.youtube.com/vi/${previewTrack.videoId}/0.jpg`;
              }}
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-sky-300 flex-shrink-0 shadow-sm"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-black uppercase text-sky-700">Escuchando Previa</span>
              </div>
              <h5 className="text-xs font-black text-slate-900 truncate">{previewTrack.title}</h5>
              <p className="text-[10px] text-slate-500 truncate">{previewTrack.artist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <button
              onClick={() => triggerDownloadAction(previewTrack, 'audio')}
              className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl text-xs font-bold transition-transform hover:scale-105 cursor-pointer shadow-md shadow-sky-500/20"
              title="Descargar MP3"
            >
              <FileAudio className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPreviewPlaying(false)}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Detener Previa"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

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

      {qrTrack && (
        <QRCodeModal track={qrTrack} onClose={() => setQrTrack(null)} />
      )}

      {effectsTrack && (
        <AudioEffectsModal 
          track={effectsTrack} 
          onClose={() => setEffectsTrack(null)} 
          onApplyEffect={(eff) => {
            setAppliedEffect(eff);
            setDownloadSuccess(`🎛️ Perfil "${eff.preset}" activado. Descargando con ecualización...`);
            setTimeout(() => setDownloadSuccess(''), 6000);
            triggerDownloadAction(effectsTrack, 'audio');
          }}
        />
      )}

    </div>
  );
}

// Subcomponente: Tarjeta individual de Canción / Video de YouTube con Botón Copiar Enlace y Descargas
function SongCard({
  track,
  isCopied,
  onCopyAndDownload,
  onSelect,
  onDownloadAudio,
  onDownloadVideo,
  onTogglePreview,
  isPreviewPlaying,
  isAudioDownloading,
  isVideoDownloading
}) {
  return (
    <div className="p-3.5 bg-white hover:bg-sky-50/40 rounded-2xl border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-3 group shadow-sm hover:shadow-md">
      
      {/* Miniatura y Metadatos */}
      <div className="flex items-start space-x-3">
        <div 
          className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer shadow ring-1 ring-slate-100"
          onClick={onTogglePreview}
          title="Clic para escuchar previa"
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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-sky-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {isPreviewPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 
            onClick={() => onSelect(track)}
            className="text-xs sm:text-sm font-bold text-slate-900 truncate hover:text-[#0284C7] cursor-pointer transition-colors"
            title={track.title}
          >
            {track.title}
          </h4>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">{track.artist}</p>
          
          <div className="flex items-center space-x-2 mt-1.5">
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200 truncate flex items-center space-x-1">
              <Youtube className="w-2.5 h-2.5 fill-rose-600" />
              <span>YouTube</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{track.duration}</span>
          </div>
        </div>
      </div>

      {/* BOTÓN ESTRELLA: COPIAR URL Y CARGAR ARRIBA */}
      <button
        type="button"
        onClick={() => onCopyAndDownload(track)}
        className={`w-full py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm ${
          isCopied
            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
            : 'bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white border border-sky-200 hover:border-sky-500'
        }`}
        title="Copiar el enlace de YouTube y colocarlo arriba listo para descargar"
      >
        {isCopied ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>¡URL Copiada y Cargada Arriba!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>📋 Copiar URL y Descargar</span>
          </>
        )}
      </button>

      {/* Botones de Descarga Directa en 1 Clic */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={onDownloadAudio}
          disabled={isAudioDownloading}
          className="py-2 px-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-60"
          title="Descargar Audio en MP3"
        >
          {isAudioDownloading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="text-[11px]">Guardando...</span>
            </>
          ) : (
            <>
              <FileAudio className="w-3.5 h-3.5 fill-current" />
              <span>Audio MP3</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onDownloadVideo}
          disabled={isVideoDownloading}
          className="py-2 px-2 bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-300 text-sky-800 font-bold text-xs rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-60 shadow-sm"
          title="Descargar Video en MP4"
        >
          {isVideoDownloading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
              <span className="text-[11px]">Guardando...</span>
            </>
          ) : (
            <>
              <Film className="w-3.5 h-3.5 text-sky-600" />
              <span>Video MP4</span>
            </>
          )}
        </button>
      </div>

      {/* Barra de Reproducción Rápida de Previa */}
      <button
        type="button"
        onClick={onTogglePreview}
        className={`w-full py-1 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
          isPreviewPlaying
            ? 'bg-sky-100 text-sky-800 border border-sky-300'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
        }`}
      >
        {isPreviewPlaying ? (
          <>
            <Pause className="w-3 h-3 text-sky-600" />
            <span>Pausar Preview</span>
          </>
        ) : (
          <>
            <Play className="w-3 h-3 text-sky-600" />
            <span>Escuchar Preview</span>
          </>
        )}
      </button>

    </div>
  );
}
