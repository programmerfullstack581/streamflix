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
          setLyrics(`🎵 "${track.title}" — ${track.artist}\n\n(Disfruta del ritmo de esta canción en StreamBeat Red)\n\n♪ ♫ ♩ ♬`);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setLyrics(`🎵 "${track.title}" — ${track.artist}\n\n(Letra no disponible directamente. ¡Disfruta el audio en alta calidad!)`);
        setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [track]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#141414] border border-red-600/40 rounded-3xl shadow-red-neon overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-red-950 via-[#1a1a1a] to-[#141414] border-b border-red-600/20">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg flex-shrink-0">
              <Mic2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-white truncate">{track.title}</h3>
              <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-center">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3 text-gray-400">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              <p className="text-xs font-bold">Buscando letra de la canción...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <pre className="whitespace-pre-line font-sans text-sm sm:text-base text-gray-200 leading-relaxed font-medium select-text">
                {lyrics}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0d0d0d] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Modo Karaoke StreamBeat</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
