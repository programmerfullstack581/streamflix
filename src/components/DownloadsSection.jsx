import React from 'react';
import { Download, Play, Trash2, HardDrive, CheckCircle2, Film } from 'lucide-react';

export default function DownloadsSection({ downloads, onPlay, onDelete }) {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 select-none">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-red-500 font-bold text-sm tracking-wider uppercase mb-1">
            <HardDrive className="w-4 h-4" />
            <span>ALMACENAMIENTO LOCAL DISPONIBLE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Mis Descargas (Modo Offline)
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Contenidos descargados en tu dispositivo para ver sin conexión a internet.
          </p>
        </div>

        <div className="bg-netflix-card px-4 py-2 rounded-xl border border-white/10 flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-xs text-gray-400">Total Descargados</p>
            <p className="text-base font-extrabold text-white">{downloads.length} Títulos</p>
          </div>
        </div>
      </div>

      {/* Downloads Grid or Empty State */}
      {downloads.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-netflix-card/50 rounded-2xl border border-dashed border-white/10">
          <div className="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No tienes descargas aún</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Explora el catálogo de películas y haz clic en el botón de descarga para guardar películas y verlas cuando no tengas internet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="bg-netflix-card border border-white/10 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group hover:border-red-500/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <img
                  src={item.backdrop || item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onPlay(item)}
                    className="p-4 bg-red-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-white" />
                  </button>
                </div>

                <div className="absolute top-2 right-2 bg-black/80 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded border border-green-500/30 backdrop-blur-sm">
                  LISTO OFFLINE
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Guardado el {item.downloadedAt}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={() => onPlay(item)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-red-500" />
                    <span>Reproducir Ahora</span>
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
                    title="Eliminar descarga"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
