import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Download, 
  Search, 
  Flame, 
  Film, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  X, 
  Tv, 
  Youtube, 
  Clock, 
  Eye, 
  Music, 
  Radio, 
  CheckCircle2, 
  ExternalLink,
  Loader2,
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { 
  searchMusicOnline, 
  CURATED_TOP_HITS, 
  getYoutubeThumbnail 
} from '../services/musicService';

// Categorías estilo chips de YouTube
const YOUTUBE_FEED_CATEGORIES = [
  { id: 'trending', label: '🔥 Tendencias Globales', query: 'tendencias musicales exitos 2024' },
  { id: 'musica_top', label: '🎵 Lo Más Visto', query: 'top hits mundiales official music video' },
  { id: 'reggaeton', label: '🌴 Reggaetón 2024', query: 'reggaeton 2024 hits video oficial' },
  { id: 'vallenato', label: '🪗 Vallenato de Oro', query: 'vallenato clasicos y en vivo' },
  { id: 'salsa', label: '🎺 Salsa Brava & Tropical', query: 'salsa brava exitos en vivo' },
  { id: 'regional', label: '🤠 Regional Mexicano', query: 'corridos y regional mexicano oficial' },
  { id: 'rock', label: '🎸 Rock en Español', query: 'rock en espanol clasicos video oficial' },
  { id: 'pop', label: '✨ Pop Internacional', query: 'pop hits official video' },
  { id: 'trap', label: '⚡ Trap & Drill', query: 'trap latino official video' },
  { id: 'podcasts', label: '🎙️ Entrevistas & Podcasts', query: 'podcast mejores momentos entrevista' },
  { id: 'lofi', label: '☕ Lo-Fi Chill Beats', query: 'lofi hip hop chill beats live' }
];

export default function YoutubeFeedView({ 
  onOpenDownloadModal, 
  onShowToast 
}) {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeWatchVideo, setActiveWatchVideo] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [theaterMode, setTheaterMode] = useState(false);
  const playerRef = useRef(null);

  // Cargar videos al cambiar de categoría
  useEffect(() => {
    loadCategoryVideos(activeCategory);
  }, [activeCategory]);

  const loadCategoryVideos = async (catId) => {
    setIsLoading(true);
    const cat = YOUTUBE_FEED_CATEGORIES.find(c => c.id === catId);
    const query = cat ? cat.query : 'top exitos musicales 2024';

    try {
      const results = await searchMusicOnline(query);
      if (results && results.length > 0) {
        setVideos(results);
      } else {
        // Fallback garantizado con catálogo curado
        setVideos(CURATED_TOP_HITS);
      }
    } catch (err) {
      console.warn('Error fetching YouTube feed:', err);
      setVideos(CURATED_TOP_HITS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchMusicOnline(searchQuery.trim());
      if (results && results.length > 0) {
        setVideos(results);
      } else {
        if (onShowToast) onShowToast('No se encontraron videos exactos, mostrando tendencias.');
        setVideos(CURATED_TOP_HITS);
      }
    } catch (err) {
      console.error('Search error:', err);
      setVideos(CURATED_TOP_HITS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVideoToWatch = (video) => {
    setActiveWatchVideo(video);
    // Hacer scroll suave hacia el reproductor si no está visible
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCopyVideoUrl = (videoId, title) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(videoId);
      if (onShowToast) onShowToast(`🔗 Enlace de YouTube copiado: "${title.substring(0, 30)}..."`);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* 1. Header Banner estilo YouTube con Barra de Búsqueda */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-5 sm:p-7 text-white shadow-lg shadow-red-500/20 relative overflow-hidden">
        {/* Adorno visual de fondo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border border-white/30">
            <Youtube className="w-4 h-4 text-white fill-white" />
            <span>Feed de Videos YouTube</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Explora, reproduce y descarga cualquier video en alta resolución
          </h1>

          <p className="text-xs sm:text-sm text-red-100 max-w-xl font-medium">
            Disfruta de la experiencia completa de YouTube dentro de StreamBeat. Reproduce videos sin cortes comerciales y descárgalos con un solo clic en formato de Audio MP3 (320k) o Video MP4 (1080p).
          </p>

          {/* Barra de búsqueda directa */}
          <form onSubmit={handleSearchSubmit} className="pt-2 flex items-center gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar videos, artistas, canciones o canales en YouTube..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-3 focus:ring-white/40 shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. Reproductor de Video Integrado (Modo Teatro / Watch View) */}
      {activeWatchVideo && (
        <div 
          ref={playerRef}
          className="bg-slate-950 rounded-3xl p-3 sm:p-5 text-white shadow-2xl border border-slate-800 animate-fadeIn space-y-4"
        >
          {/* Barra superior del reproductor */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Reproduciendo en Directo
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTheaterMode(!theaterMode)}
                className="text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors hidden sm:inline-flex items-center space-x-1 cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>{theaterMode ? 'Vista Estándar' : 'Modo Cine'}</span>
              </button>
              <button
                onClick={() => setActiveWatchVideo(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Cerrar Reproductor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Iframe 16:9 con YouTube Embed Limpio */}
          <div className={`w-full rounded-2xl overflow-hidden bg-black shadow-inner transition-all ${
            theaterMode ? 'aspect-[21/9] sm:aspect-video max-h-[75vh]' : 'aspect-video max-h-[65vh]'
          }`}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeWatchVideo.videoId}?autoplay=1&rel=0`}
              title={activeWatchVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Metadatos y Barra de Descarga Rápida */}
          <div className="p-2 sm:p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-800">
            <div className="space-y-1 min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-black text-white line-clamp-2">
                {activeWatchVideo.title}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="font-bold text-red-400">{activeWatchVideo.artist}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{activeWatchVideo.views || 'YouTube'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeWatchVideo.duration}</span>
                </span>
              </div>
            </div>

            {/* Botones de acción directa bajo el video */}
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onOpenDownloadModal(activeWatchVideo)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-black transition-all shadow-md shadow-red-500/30 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Descargar MP3 / MP4</span>
              </button>

              <button
                onClick={() => handleCopyVideoUrl(activeWatchVideo.videoId, activeWatchVideo.title)}
                className="flex items-center space-x-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                title="Copiar enlace oficial de YouTube"
              >
                {copiedId === activeWatchVideo.videoId ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span>Compartir</span>
              </button>

              <a
                href={activeWatchVideo.youtubeUrl || `https://www.youtube.com/watch?v=${activeWatchVideo.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors"
                title="Abrir en YouTube oficial"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. Chips Horizontales de Categorías (YouTube Filter Bar) */}
      <div className="relative">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none select-none">
          {YOUTUBE_FEED_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm scale-102'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Cuadrícula de Videos (YouTube Home Grid) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Videos Recomendados'}
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {videos.length} videos
            </span>
          </div>
          
          <button
            onClick={() => loadCategoryVideos(activeCategory)}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>Actualizar feed</span>
          </button>
        </div>

        {/* Estado de Carga */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs animate-pulse space-y-3">
                <div className="aspect-video bg-slate-200 rounded-xl w-full" />
                <div className="flex space-x-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 bg-slate-200 rounded-md w-4/5" />
                    <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {videos.map((video, idx) => {
              const isWatchingThis = activeWatchVideo?.videoId === video.videoId;
              return (
                <div
                  key={video.videoId + idx}
                  className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                    isWatchingThis 
                      ? 'ring-2 ring-red-500 border-red-500 shadow-md shadow-red-500/10' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Miniatura 16:9 con Duración y Botón Play Hover */}
                  <div 
                    onClick={() => handleSelectVideoToWatch(video)}
                    className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={video.thumbnail || getYoutubeThumbnail(video.videoId)}
                      alt={video.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = getYoutubeThumbnail(video.videoId, 'hqdefault');
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay oscuro y botón Play en Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Badge de Duración estilo YouTube */}
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                      <span>{video.duration || '3:30'}</span>
                    </div>

                    {/* Badge si está reproduciéndose */}
                    {isWatchingThis && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>REPRODUCIENDO</span>
                      </div>
                    )}
                  </div>

                  {/* Información del Video */}
                  <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="flex items-start space-x-3">
                      {/* Avatar del canal */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs">
                        {(video.artist || 'YT').charAt(0).toUpperCase()}
                      </div>

                      {/* Título y Canal */}
                      <div className="min-w-0 flex-1">
                        <h3 
                          onClick={() => handleSelectVideoToWatch(video)}
                          className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug cursor-pointer group-hover:text-red-600 transition-colors"
                          title={video.title}
                        >
                          {video.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                          {video.artist}
                        </p>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium">
                          <span>{video.views || 'YouTube'}</span>
                          <span>•</span>
                          <span>Recomendado</span>
                        </div>
                      </div>
                    </div>

                    {/* Botonera de Acciones Rápidas (Ver & Descargar) */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => handleSelectVideoToWatch(video)}
                        className="flex-1 flex items-center justify-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[11px] font-bold transition-colors cursor-pointer"
                        title="Ver video en StreamBeat"
                      >
                        <Play className="w-3 h-3 fill-current text-slate-700" />
                        <span>Ver Video</span>
                      </button>

                      <button
                        onClick={() => onOpenDownloadModal(video)}
                        className="flex-1 flex items-center justify-center space-x-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200/80 rounded-xl text-[11px] font-black transition-colors cursor-pointer"
                        title="Descargar este video en MP3 o MP4"
                      >
                        <Download className="w-3 h-3" />
                        <span>Descargar</span>
                      </button>

                      <button
                        onClick={() => handleCopyVideoUrl(video.videoId, video.title)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Copiar enlace"
                      >
                        {copiedId === video.videoId ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
