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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#141414] border border-red-600/40 rounded-3xl shadow-red-neon overflow-hidden p-6 space-y-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Compartir Canción</h3>
              <p className="text-xs text-gray-400">Envía este tema a tus amigos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Preview */}
        <div className="flex items-center space-x-3 bg-[#0d0d0d] p-3.5 rounded-2xl border border-white/5">
          <img src={track.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{track.title}</h4>
            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="p-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTelegram}
            className="p-3.5 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/40 text-[#0088cc] rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400">Enlace directo:</label>
          <div className="flex items-center space-x-2 bg-[#0a0a0a] p-2 rounded-2xl border border-white/10">
            <input 
              type="text" 
              readOnly 
              value={songUrl} 
              className="flex-1 bg-transparent text-xs text-gray-300 outline-none px-2 font-mono"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                copied ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-500 text-white shadow-red-neon'
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
