import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Heart, 
  Download, 
  ListMusic, 
  Maximize2, 
  Sparkles,
  Video,
  X,
  Zap
} from 'lucide-react';

export default function Player({
  currentTrack,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrev,
  onToggleLike,
  isLiked,
  onOpenDownload,
  queue = [],
  onSelectQueueTrack
}) {
  if (!currentTrack) return null;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack.seconds || 180);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  const playerRef = useRef(null);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(currentTrack.seconds || 180);
    setIsPlaying(true);
  }, [currentTrack]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (repeatMode === 'one') {
              return 0;
            } else {
              onNext(isShuffle);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, repeatMode, isShuffle, onNext]);

  const formatSeconds = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const target = Number(e.target.value);
    setCurrentTime(target);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Mini Video / Lyrics Popup */}
      {isVideoPopupOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-80 sm:w-96 bg-[#141414] border border-red-500/40 rounded-3xl shadow-red-neon overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between p-3.5 bg-[#1a1a1a] border-b border-red-500/20">
            <span className="text-xs font-black text-white flex items-center space-x-2">
              <Video className="w-4 h-4 text-red-500" />
              <span>Video Musical Oficial</span>
            </span>
            <button onClick={() => setIsVideoPopupOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${currentTrack.videoId}?autoplay=1&enablejsapi=1`}
              title={currentTrack.title}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}

      {/* Queue Drawer */}
      {isQueueOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-80 sm:w-96 bg-[#141414] border border-red-500/30 rounded-3xl shadow-red-neon max-h-[60vh] flex flex-col overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between p-4 bg-[#1c1c1c] border-b border-white/10">
            <h3 className="text-xs font-black text-white flex items-center space-x-2">
              <ListMusic className="w-4 h-4 text-red-500" />
              <span>Cola de Reproducción ({queue.length})</span>
            </h3>
            <button onClick={() => setIsQueueOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-2 space-y-1 flex-1">
            {queue.map((t, idx) => {
              const isCurrent = t.videoId === currentTrack.videoId;
              return (
                <div
                  key={t.videoId + idx}
                  onClick={() => {
                    if (onSelectQueueTrack) onSelectQueueTrack(t);
                  }}
                  className={`flex items-center space-x-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                    isCurrent ? 'bg-red-950/60 border border-red-500/40 text-white' : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <img src={t.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isCurrent ? 'text-red-400' : 'text-white'}`}>{t.title}</p>
                    <p className="text-[10px] text-gray-400 truncate">{t.artist}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{t.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Red & Black Player Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0d]/98 border-t border-red-600/30 px-3 sm:px-6 py-2.5 sm:py-3 select-none backdrop-blur-2xl shadow-[0_-5px_30px_rgba(229,9,20,0.2)]">
        
        {/* Invisible Audio Bridge */}
        <div className="w-0 h-0 overflow-hidden opacity-0 absolute pointer-events-none">
          <iframe
            ref={playerRef}
            key={currentTrack.videoId}
            width="1"
            height="1"
            src={`https://www.youtube.com/embed/${currentTrack.videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&loop=1`}
            allow="autoplay; encrypted-media"
            title="audio-stream"
          />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Track Details */}
          <div className="flex items-center space-x-3 w-1/4 min-w-[130px] sm:min-w-[200px]">
            <div className="relative group/cover flex-shrink-0 cursor-pointer" onClick={() => setIsVideoPopupOpen(!isVideoPopupOpen)}>
              <img
                src={currentTrack.thumbnail}
                alt={currentTrack.title}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-lg ring-1 ring-red-600/60 group-hover/cover:brightness-75 transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity">
                <Video className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 truncate hover:underline cursor-pointer">
                {currentTrack.artist}
              </p>
            </div>

            <button
              onClick={() => onToggleLike(currentTrack)}
              className={`p-1.5 rounded-full hover:scale-110 transition-transform hidden sm:block ${
                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
              title={isLiked ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {/* Center: Main Controls & Seek Bar */}
          <div className="flex flex-col items-center max-w-xl w-2/4">
            {/* Control buttons */}
            <div className="flex items-center space-x-3 sm:space-x-5 mb-1.5">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-1 transition-colors hidden sm:block ${
                  isShuffle ? 'text-red-500' : 'text-gray-400 hover:text-white'
                }`}
                title="Aleatorio"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={onPrev}
                className="text-gray-300 hover:text-white p-1 transition-transform hover:scale-110"
                title="Anterior"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Big Red Play Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-red-neon transition-transform hover:scale-105"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={() => onNext(isShuffle)}
                className="text-gray-300 hover:text-white p-1 transition-transform hover:scale-110"
                title="Siguiente"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={toggleRepeat}
                className={`p-1 transition-colors hidden sm:block ${
                  repeatMode !== 'off' ? 'text-red-500' : 'text-gray-400 hover:text-white'
                }`}
                title={`Repetir: ${repeatMode}`}
              >
                {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>
            </div>

            {/* Time progress seek bar */}
            <div className="w-full flex items-center space-x-2 text-[10px] sm:text-xs text-gray-400 font-mono group">
              <span className="w-8 text-right select-none text-gray-300">{formatSeconds(currentTime)}</span>
              
              <div className="relative flex-1 flex items-center h-4 cursor-pointer">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 group-hover:bg-[#FF0033] shadow-[0_0_8px_#E50914] transition-colors"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <span className="w-8 text-left select-none text-gray-300">{formatSeconds(duration)}</span>
            </div>
          </div>

          {/* Right: Tools & Volume */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-3 w-1/4 min-w-[120px]">
            
            {/* Quick Download Format Button */}
            <button
              onClick={() => onOpenDownload(currentTrack)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs font-black transition-transform hover:scale-105 shadow-red-neon flex-shrink-0"
              title="Descargar en MP3 directo"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Descargar MP3</span>
            </button>

            {/* Queue Toggle */}
            <button
              onClick={() => setIsQueueOpen(!isQueueOpen)}
              className={`p-1.5 transition-colors hidden sm:block ${
                isQueueOpen ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
              title="Cola de reproducción"
            >
              <ListMusic className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="items-center space-x-1 hidden lg:flex group">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white p-1 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-500" />
                ) : volume < 50 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              
              <div className="w-20 relative flex items-center h-3">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 group-hover:bg-[#FF0033] transition-colors"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

          </div>

        </div>
      </footer>
    </>
  );
}
