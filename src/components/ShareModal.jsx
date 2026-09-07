import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Send, Globe } from 'lucide-react';

export default function ShareModal({ track, onClose }) {
  if (!track) return null;

  const [copied, setCopied] = useState(false);
  const songUrl = `https://youtu.be/${track.videoId}`;
  const shareText = `🎵 ¡Escucha y descarga "${track.title}" de ${track.artist} en MP3 Alta Calidad!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(songUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + songUrl)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(songUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white border border-sky-100 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3 sm:pb-4">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200 flex-shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">Compartir Canción</h3>
              <p className="text-xs text-slate-500 truncate">Envía este tema a tus amigos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Preview */}
        <div className="flex items-center space-x-3 bg-sky-50/60 p-3 sm:p-3.5 rounded-2xl border border-sky-100 min-w-0">
          <img src={track.thumbnail} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{track.title}</h4>
            <p className="text-[11px] text-slate-500 truncate">{track.artist}</p>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <button
            onClick={handleWhatsApp}
            className="p-3 sm:p-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all hover:scale-105 cursor-pointer min-w-0"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="truncate">WhatsApp</span>
          </button>

          <button
            onClick={handleTelegram}
            className="p-3 sm:p-3.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all hover:scale-105 cursor-pointer min-w-0"
          >
            <Send className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span className="truncate">Telegram</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600">Enlace directo:</label>
          <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 min-w-0">
            <input 
              type="text" 
              readOnly 
              value={songUrl} 
              className="flex-1 min-w-0 bg-transparent text-xs text-slate-700 outline-none px-2 font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer flex-shrink-0 ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sm'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
