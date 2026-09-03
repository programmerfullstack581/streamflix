import React, { useState } from 'react';
import { X, Scissors, Music, Download, Play, Check, Zap, Smartphone } from 'lucide-react';

export default function RingtoneModal({ track, onClose }) {
  if (!track) return null;

  const totalSecs = track.seconds || 210;
  const [startTime, setStartTime] = useState(30);
  const [duration, setDuration] = useState(30); // 15, 30, 45, 60s
  const [copied, setCopied] = useState(false);

  const endTime = Math.min(startTime + duration, totalSecs);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleDownloadRingtone = () => {
    // Generar enlace de descarga con parámetros o conversor directo
    const ytShort = `https://youtu.be/${track.videoId}`;
    const url = `https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent(ytShort)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#141414] border border-red-600/40 rounded-3xl shadow-red-neon overflow-hidden space-y-5 p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Creador de Ringtone / Tono</h3>
              <p className="text-xs text-gray-400">Recorta el coro para tu celular</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Info */}
        <div className="flex items-center space-x-3 bg-[#0d0d0d] p-3.5 rounded-2xl border border-white/5">
          <img src={track.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{track.title}</h4>
            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
          </div>
          <span className="text-xs font-mono text-red-400 font-bold">{track.duration}</span>
        </div>

        {/* Trim Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
              <span>Inicio del recorte:</span>
              <span className="text-red-400 font-mono">{formatTime(startTime)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={Math.max(0, totalSecs - duration)} 
              value={startTime} 
              onChange={e => setStartTime(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer h-2 bg-white/10 rounded-lg"
            />
          </div>

          {/* Duration Selector */}
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-2">Duración del tono:</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map(sec => (
                <button
                  key={sec}
                  onClick={() => setDuration(sec)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    duration === sec 
                      ? 'bg-red-600 text-white shadow-red-neon' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Segment display */}
          <div className="p-3.5 bg-red-950/30 border border-red-600/30 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-gray-300">Fragmento seleccionado:</span>
            <span className="text-white font-mono font-black text-sm">
              {formatTime(startTime)} ➔ {formatTime(endTime)} ({duration}s)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleDownloadRingtone}
            className="flex-1 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-black text-xs sm:text-sm shadow-red-neon flex items-center justify-center space-x-2 transition-transform hover:scale-105"
          >
            <Smartphone className="w-4 h-4" />
            <span>DESCARGAR COMO RINGTONE</span>
          </button>
        </div>

      </div>
    </div>
  );
}
