import React, { useState } from 'react';
import { X, Download, Maximize2, Minimize2 } from 'lucide-react';

export default function OndaPlayer({ track, onClose, onOpenDownload }) {
  const [expanded, setExpanded] = useState(false);

  if (!track) return null;

  return (
    <div 
      className={`fixed left-0 md:left-64 right-0 z-50 flex flex-col transition-all duration-500 ease-in-out ${
        expanded ? 'top-0 md:top-0 bottom-0 h-full bg-background/95 backdrop-blur-3xl' : 'bottom-0 h-auto px-2 sm:px-4 pb-2 sm:pb-4 pt-0'
      }`}
    >
      {/* Expanded View Header */}
      {expanded && (
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surface-glass backdrop-blur-md">
          <h3 className="font-black text-2xl text-transparent bg-clip-text bg-onda-gradient tracking-tight">Onda</h3>
          <button onClick={() => setExpanded(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10">
            <Minimize2 className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex ${expanded ? 'flex-col p-4 sm:p-8 gap-6 overflow-y-auto w-full max-w-5xl mx-auto' : 'relative group max-w-4xl mx-auto w-full'}`}>
        
        {/* Glow dinámico de fondo (solo visible en modo barra inferior) */}
        {!expanded && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-onda-cyan to-onda-violet rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
        )}

        {/* Contenedor Glassmorphism Principal */}
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          expanded ? 'flex-col flex-1 w-full' : 'p-3 sm:p-4 rounded-3xl bg-surface-glass backdrop-blur-2xl border border-white/10 shadow-glass w-full'
        }`}>
          
          {/* Iframe & Info */}
          <div className={`flex flex-1 min-w-0 ${expanded ? 'flex-col w-full gap-8' : 'items-center gap-4'}`}>
            <div className={`overflow-hidden relative shadow-lg ${expanded ? 'w-full rounded-2xl aspect-video bg-black/50 shadow-glow-cyan' : 'w-24 sm:w-32 aspect-video rounded-xl bg-black'}`}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${track.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={track.title}
                className="w-full h-full border-0 pointer-events-auto"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className={`flex flex-col flex-1 min-w-0 ${expanded ? 'text-center' : ''}`}>
              <h4 className={`text-white font-bold truncate tracking-wide ${expanded ? 'text-2xl sm:text-4xl mb-2' : 'text-sm sm:text-base'}`}>
                {track.title || "Selecciona una canción"}
              </h4>
              <p className={`text-white/50 truncate ${expanded ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'}`}>
                {track.channelTitle || "Desconocido"}
              </p>
            </div>
          </div>

          {/* Acciones Secundarias (Descargar & Expandir Bottom Sheet) */}
          <div className={`flex items-center flex-shrink-0 ${expanded ? 'justify-center w-full mt-8 pt-8 border-t border-white/10 gap-6' : 'gap-3 ml-4'}`}>
            {/* Presets de descarga rápida */}
            <button 
              onClick={() => {
                if(expanded) setExpanded(false);
                onOpenDownload(track);
              }}
              className={`flex items-center justify-center bg-onda-gradient text-black font-bold shadow-glow-cyan hover:scale-105 active:scale-95 transition-all ${
                expanded ? 'px-8 py-4 rounded-2xl text-xl w-full sm:w-auto' : 'gap-2 px-4 py-2 rounded-full text-xs sm:text-sm'
              }`}
            >
              <Download className={expanded ? 'w-6 h-6 mr-3' : 'w-4 h-4'} />
              <span>Descargar</span>
            </button>

            {!expanded && (
              <>
                <button 
                  onClick={() => setExpanded(true)}
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  title="Pantalla Completa"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-red-400 transition-colors rounded-full hover:bg-white/10"
                  title="Cerrar Reproductor"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
