import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Settings, Radio, RefreshCw, Server, AlertCircle, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export default function VideoPlayerModal({ item, onClose }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedServer, setSelectedServer] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const isLive = item?.isLive || item?.streamUrl?.includes('.m3u8');

  const getActiveMedia = () => {
    if (selectedServer === 2) {
      const embedUrl = item?.embedUrl || item?.fallbackUrl || item?.streamUrl;
      return { url: embedUrl, isEmbed: true };
    }
    if (selectedServer === 3) {
      const fallbackUrl = item?.fallbackUrl2 || item?.videoUrl || item?.fallbackUrl || item?.streamUrl;
      return { url: fallbackUrl, isEmbed: false };
    }
    const directUrl = item?.streamUrl || item?.videoUrl;
    const isEmbedDirect = directUrl && directUrl.startsWith('http') && !directUrl.endsWith('.m3u8') && !directUrl.endsWith('.mp4');
    return { url: directUrl, isEmbed: isEmbedDirect };
  };

  const { url: activeUrl, isEmbed } = getActiveMedia();

  useEffect(() => {
    if (isEmbed) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    const video = videoRef.current;
    if (!video || !activeUrl) return;

    setIsLoading(true);
    setHasError(false);

    if (activeUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        if (hlsRef.current) hlsRef.current.destroy();

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          manifestLoadingTimeOut: 10000,
          maxBufferLength: 30,
        });
        hlsRef.current = hls;

        hls.loadSource(activeUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().catch(() => setIsPlaying(false));
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.warn('HLS stream warning on server', selectedServer, data.type);
            hls.destroy();
            setIsLoading(false);
            
            if (selectedServer === 1) {
              setSelectedServer(3);
            } else {
              setHasError(true);
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = activeUrl;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          video.play();
        });
      }
    } else {
      video.src = activeUrl;
      video.play().catch(() => setIsPlaying(false));
      setIsLoading(false);
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [activeUrl, selectedServer, isEmbed, item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setProgress(seekTime);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleOpenDirectWindow = () => {
    window.open(activeUrl, '_blank', 'noopener,noreferrer');
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden animate-fadeIn select-none">
      
      {/* Top Bar with Server Selector & Direct Window Button */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/95 via-black/60 to-transparent z-30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-auto transition-opacity duration-300">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-3">
            {isLive ? (
              <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-sm flex items-center shadow-lg animate-pulse uppercase tracking-widest border border-red-500/50">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span>
                Transmisión Oficial Activa
              </span>
            ) : (
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center shadow-lg">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                PELÍCULA REAL
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
            {item.title || item.name}
          </h2>
          {isLive && (
            <p className="text-green-400 text-xs font-bold font-mono bg-black/60 px-2 py-0.5 rounded border border-white/10 w-fit mt-1 flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1" /> Decodificando señal única HLS de {item.name}...
            </p>
          )}
        </div>

        {/* Server Selector Bar & Direct Window Action */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
          
          {/* Direct Window Button (Guaranteed Fallback) */}
          <button
            onClick={handleOpenDirectWindow}
            className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all border border-green-400/40"
            title="Abrir transmisión directa en ventana externa"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Servidor Directo</span>
          </button>

          {/* Server Selector Buttons */}
          <div className="flex items-center space-x-1 bg-black/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setSelectedServer(1)}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-[11px] ${selectedServer === 1 ? 'bg-red-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
            >
              Señal 1
            </button>
            <button
              onClick={() => setSelectedServer(2)}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-[11px] ${selectedServer === 2 ? 'bg-red-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
            >
              Señal 2
            </button>
            <button
              onClick={() => setSelectedServer(3)}
              className={`px-3 py-1 rounded-lg font-bold transition-all text-[11px] ${selectedServer === 3 ? 'bg-red-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
            >
              Respaldo
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white rounded-full transition-all focus:outline-none backdrop-blur-md"
            title="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video / Embed Screen */}
      <div 
        className="relative w-full h-full flex items-center justify-center cursor-pointer bg-black"
        onMouseMove={() => setShowControls(true)}
      >
        {/* En Vivo Background Watermark Overlay for Live Channels */}
        {isLive && (
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-[0.03]">
             <img src={item.logo} alt="" className="w-3/4 max-h-[80vh] object-contain blur-[2px] grayscale" />
          </div>
        )}

        {isEmbed ? (
          <iframe
            src={activeUrl}
            title={item.title || item.name}
            className="w-full h-full border-0 relative z-20"
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            className="w-full h-full object-contain relative z-20"
            playsInline
            autoPlay
            onClick={togglePlay}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && !isEmbed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-30">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-800 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Radio className="w-6 h-6 text-red-500 animate-pulse" />
              </div>
            </div>
            <h3 className="text-white text-lg font-black tracking-widest mt-6 uppercase">
              {isLive ? 'Conectando Satélite...' : 'Cargando Película...'}
            </h3>
            <p className="text-xs text-green-400 mt-2 font-mono bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
              Conectado a Señal {selectedServer} — {item.name || item.title}
            </p>
          </div>
        )}

        {/* Browser Block / Fallback Banner Assistance */}
        {selectedServer === 2 && isEmbed && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-red-500/50 px-6 py-3 rounded-2xl z-30 text-center flex flex-col items-center shadow-2xl space-y-2 max-w-sm w-full">
            <span className="text-sm font-bold text-white flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
              ¿El video no se reproduce?
            </span>
            <span className="text-xs text-gray-400 leading-tight">
              Los navegadores bloquean algunos reproductores. Usa el servidor directo para saltar las restricciones.
            </span>
            <button
              onClick={handleOpenDirectWindow}
              className="mt-2 w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>Abrir en Servidor Directo 100% Libre</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stream Error Recovery */}
        {hasError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 p-6 z-40 text-center space-y-6">
            <div className="p-5 bg-red-950/50 text-red-500 rounded-full border-2 border-red-500/50 relative">
              <AlertCircle className="w-12 h-12 relative z-10" />
              <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Interrupción de Señal Detectada</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                La transmisión de <strong className="text-white">{item.name || item.title}</strong> en la Señal {selectedServer} ha sido interrumpida por la red.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={() => setSelectedServer(3)}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Alternar a Señal de Respaldo</span>
              </button>
              <button
                onClick={handleOpenDirectWindow}
                className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all flex items-center justify-center space-x-2 border border-green-500/50"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Forzar Servidor Directo Externo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar for Standard Native Video */}
      {!isEmbed && (
        <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          
          {!isLive && (
            <div className="mb-5 flex items-center space-x-4">
              <span className="text-xs text-gray-300 font-mono tracking-wider">{formatTime(progress)}</span>
              <div className="flex-1 relative group cursor-pointer flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={handleSeek}
                  className="absolute z-20 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 relative transition-all duration-75"
                    style={{ width: `${(progress / duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-mono tracking-wider">{formatTime(duration)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button onClick={togglePlay} className="text-white hover:text-red-500 hover:scale-110 transition-all focus:outline-none drop-shadow-lg">
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
              </button>

              <div className="flex items-center space-x-3 group/vol">
                <button onClick={toggleMute} className="text-gray-300 hover:text-white transition-colors focus:outline-none">
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="w-0 sm:w-24 overflow-hidden group-hover/vol:w-24 transition-all duration-300 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-gray-400 mr-2">
                <span>{item.title || item.name}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="text-white">{isLive ? 'EN DIRECTO' : 'HD'}</span>
              </div>

              <button
                onClick={() => setSelectedServer(selectedServer === 1 ? 3 : 1)}
                className="text-xs bg-black/60 hover:bg-white/10 text-white border border-white/20 px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all"
                title="Cambiar rápidamente de origen de transmisión"
              >
                <Server className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Alternar Señal</span>
              </button>

              <button onClick={toggleFullscreen} className="text-gray-300 hover:text-white hover:scale-110 transition-all focus:outline-none">
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
