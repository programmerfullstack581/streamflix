import React, { useState, useEffect } from 'react';
import { X, Mic2, Sparkles, Music, Loader2, Search } from 'lucide-react';

export default function LyricsModal({ track, onClose }) {
  if (!track) return null;

  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const cleanTitle = track.title
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/video oficial/gi, '')
      .replace(/audio oficial/gi, '')
      .replace(/letra/gi, '')
      .trim();

    const cleanArtist = track.artist
      .replace(/ft\..*$/i, '')
      .replace(/feat\..*$/i, '')
      .trim();

    fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanTitle)}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data && data.lyrics) {
          setLyrics(data.lyrics);
        } else {
          setLyrics(`🎵 "${track.title}" — ${track.artist}\n\n(Disfruta del ritmo de esta canción en StreamBeat)\n\n♪ ♫ ♩ ♬`);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setLyrics(`🎵 "${track.title}" — ${track.artist}\n\n(Letra no disponible directamente. ¡Disfruta el audio en alta fidelidad!)`);
        setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [track]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white border border-sky-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 text-white border-b border-sky-200">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Mic2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-white truncate">{track.title}</h3>
              <p className="text-xs text-sky-100 truncate">{track.artist}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-center bg-white">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3 text-slate-500">
              <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
              <p className="text-xs font-bold">Buscando letra de la canción...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <pre className="whitespace-pre-line font-sans text-sm sm:text-base text-slate-800 leading-relaxed font-medium select-text">
                {lyrics}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Modo Letra StreamBeat</span>
          <button 
            onClick={onClose} 
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
