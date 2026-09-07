import React, { useState } from 'react';
import { X, Scissors, Music, Download, Play, Check, Zap, Smartphone } from 'lucide-react';

export default function RingtoneModal({ track, onClose }) {
  if (!track) return null;

  const totalSecs = track.seconds || 210;
  const [startTime, setStartTime] = useState(30);
  const [duration, setDuration] = useState(30); // 15, 30, 45, 60s

  const endTime = Math.min(startTime + duration, totalSecs);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleDownloadRingtone = () => {
    const ytShort = `https://youtu.be/${track.videoId}`;
    const url = `https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent(ytShort)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white border border-sky-100 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3 sm:pb-4">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200 flex-shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">Creador de Ringtone / Tono</h3>
              <p className="text-xs text-slate-500 truncate">Recorta el coro para tu celular</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Info */}
        <div className="flex items-center space-x-3 bg-sky-50/60 p-3 sm:p-3.5 rounded-2xl border border-sky-100 min-w-0">
          <img src={track.thumbnail} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{track.title}</h4>
            <p className="text-[11px] text-slate-500 truncate">{track.artist}</p>
          </div>
          <span className="text-xs font-mono text-sky-700 font-bold flex-shrink-0">{track.duration}</span>
        </div>

        {/* Trim Controls */}
        <div className="space-y-3.5 sm:space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Inicio del recorte:</span>
              <span className="text-sky-600 font-mono">{formatTime(startTime)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={Math.max(0, totalSecs - duration)} 
              value={startTime} 
              onChange={e => setStartTime(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Duration Selector */}
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-2">Duración del tono:</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map(sec => (
                <button
                  key={sec}
                  onClick={() => setDuration(sec)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    duration === sec 
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Segment display */}
          <div className="p-3 sm:p-3.5 bg-sky-50 border border-sky-200 rounded-2xl flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs">
            <span className="text-slate-600 font-medium">Fragmento seleccionado:</span>
            <span className="text-sky-900 font-mono font-black text-xs sm:text-sm truncate">
              {formatTime(startTime)} ➔ {formatTime(endTime)} ({duration}s)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleDownloadRingtone}
            className="flex-1 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>DESCARGAR COMO RINGTONE</span>
          </button>
        </div>

      </div>
    </div>
  );
}
