import React, { useState } from 'react';
import { X, Download, Maximize2, Minimize2 } from 'lucide-react';

export default function GlobalPlayer({ track, onClose, onOpenDownload }) {
  const [expanded, setExpanded] = useState(false);

  if (!track) return null;

  return (
    <div 
      className={`fixed left-0 md:left-64 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 flex flex-col shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out ${
        expanded ? 'top-0 md:top-0 bottom-0 h-full' : 'bottom-0 h-auto'
      }`}
    >
      {/* Expanded View Header */}
      {expanded && (
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">Reproductor NovaStream</h3>
          <button onClick={() => setExpanded(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Minimize2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex ${expanded ? 'flex-col p-4 sm:p-8 gap-6 overflow-y-auto' : 'flex-row items-center p-2 sm:p-4 gap-4'}`}>
        
        {/* Iframe Container */}
        <div className={`bg-black overflow-hidden flex-shrink-0 relative group transition-all duration-300 ${
          expanded ? 'w-full rounded-2xl aspect-video shadow-2xl max-w-4xl mx-auto' : 'w-28 sm:w-36 aspect-video rounded-lg'
        }`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${track.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={track.title}
            className="w-full h-full border-0 pointer-events-auto"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Track Info */}
        <div className={`flex-1 min-w-0 flex flex-col ${expanded ? 'items-center text-center' : ''}`}>
          <h4 className={`font-bold text-slate-900 dark:text-white truncate w-full ${expanded ? 'text-xl sm:text-2xl mb-2' : 'text-sm sm:text-base'}`}>
            {track.title}
          </h4>
          <p className={`text-slate-500 dark:text-slate-400 truncate w-full ${expanded ? 'text-sm sm:text-base' : 'text-xs'}`}>
            {track.channelTitle}
          </p>
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-2 sm:gap-4 flex-shrink-0 ${expanded ? 'justify-center w-full mt-auto pt-4' : 'pl-4'}`}>
          <button
            onClick={() => {
              if (expanded) setExpanded(false);
              onOpenDownload(track);
            }}
            className={`flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold shadow-md shadow-sky-500/25 transition-all ${
              expanded ? 'w-full sm:w-auto px-8 py-4 rounded-2xl text-lg' : 'p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-xl text-sm'
            }`}
          >
            <Download className={`${expanded ? 'w-6 h-6 mr-3' : 'w-4 h-4 sm:mr-2 inline'}`} />
            <span className={expanded ? 'inline' : 'hidden sm:inline'}>Descargar MP3 / MP4</span>
          </button>
          
          {!expanded && (
            <>
              <button
                onClick={() => setExpanded(true)}
                className="p-2 text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Pantalla Completa"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Cerrar Reproductor"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
