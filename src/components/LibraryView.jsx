import React from 'react';
import { 
  Heart, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Music, 
  Clock, 
  ListMusic, 
  Plus, 
  Sparkles,
  Disc3
} from 'lucide-react';

export default function LibraryView({
  viewType = 'favoritos',
  likedTracks = [],
  selectedPlaylist = null,
  onPlayTrack,
  currentTrack,
  isPlaying,
  onToggleLike,
  likedTrackIds = [],
  onOpenDownload,
  onPlayAll
}) {
  const isLikedView = viewType === 'favoritos';
  const tracks = isLikedView ? likedTracks : (selectedPlaylist?.tracks || []);
  const title = isLikedView ? 'Canciones Favoritas' : (selectedPlaylist?.name || 'Tu Biblioteca');
  const description = isLikedView 
    ? 'Tus canciones guardadas con el corazón listas para reproducir y descargar.'
    : (selectedPlaylist?.description || 'Playlist de música');

  return (
    <div className="space-y-6 pb-32 animate-fadeIn">
      
      {/* Header Banner Red & Black */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 ${
        isLikedView 
          ? 'bg-gradient-to-br from-red-950 via-[#181818] to-black border-red-500/30 shadow-red-neon' 
          : 'bg-gradient-to-br from-neutral-900 via-[#181818] to-black border-white/10'
      }`}>
        <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl ${
          isLikedView 
            ? 'bg-gradient-to-br from-red-600 via-rose-700 to-black ring-2 ring-red-500/50' 
            : 'bg-[#1e1e1e] ring-1 ring-white/10'
        }`}>
          {isLikedView ? (
            <Heart className="w-20 h-20 fill-white text-white" />
          ) : (
            <ListMusic className="w-20 h-20 text-red-500" />
          )}
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-400 bg-red-600/20 px-2.5 py-1 rounded-full border border-red-500/30">
            {isLikedView ? 'Colección Favorita' : 'Playlist'}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight truncate">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">{description}</p>
          <p className="text-xs text-gray-400 flex items-center justify-center sm:justify-start space-x-2 pt-1">
            <span className="font-bold text-white">StreamBeat Red</span>
            <span>•</span>
            <span className="text-red-400 font-bold">{tracks.length} canciones</span>
          </p>
        </div>
      </div>

      {/* Action Bar */}
      {tracks.length > 0 && (
        <div className="flex items-center space-x-4 py-2">
          <button
            onClick={() => onPlayAll(tracks)}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-red-neon transition-transform hover:scale-105"
            title="Reproducir todo"
          >
            <Play className="w-7 h-7 fill-white ml-1" />
          </button>
        </div>
      )}

      {/* Tracks Table */}
      {tracks.length === 0 ? (
        <div className="p-16 text-center bg-[#121212] rounded-3xl border border-white/5 space-y-3 text-gray-400">
          <Heart className="w-12 h-12 mx-auto text-gray-700" />
          <h3 className="text-lg font-bold text-white">No tienes canciones guardadas aquí</h3>
          <p className="text-xs max-w-sm mx-auto">
            Explora canciones en el Inicio o en Buscar y toca el ícono de corazón para guardarlas en tu biblioteca.
          </p>
        </div>
      ) : (
        <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-6 sm:col-span-5">Título</div>
            <div className="hidden sm:block sm:col-span-4">Artista</div>
            <div className="col-span-5 sm:col-span-2 text-right flex items-center justify-end space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Duración</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {tracks.map((track, idx) => {
              const isThisPlaying = currentTrack?.videoId === track.videoId && isPlaying;
              const isLiked = likedTrackIds.includes(track.videoId);

              return (
                <div
                  key={track.videoId + idx}
                  onClick={() => onPlayTrack(track)}
                  className={`grid grid-cols-12 gap-2 px-4 py-3 items-center cursor-pointer transition-colors group ${
                    isThisPlaying ? 'bg-red-950/40 text-red-400' : 'hover:bg-white/5'
                  }`}
                >
                  {/* Number / Play icon */}
                  <div className="col-span-1 text-center text-xs font-mono text-gray-400">
                    {isThisPlaying ? (
                      <Disc3 className="w-4 h-4 text-red-500 animate-spin mx-auto" />
                    ) : (
                      <>
                        <span className="group-hover:hidden">{idx + 1}</span>
                        <Play className="w-4 h-4 fill-white text-white mx-auto hidden group-hover:block" />
                      </>
                    )}
                  </div>

                  {/* Title & Cover */}
                  <div className="col-span-6 sm:col-span-5 flex items-center space-x-3 min-w-0">
                    <img src={track.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className={`text-xs sm:text-sm font-bold truncate ${isThisPlaying ? 'text-red-400' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate sm:hidden">{track.artist}</p>
                    </div>
                  </div>

                  {/* Artist */}
                  <div className="hidden sm:block sm:col-span-4 min-w-0">
                    <p className="text-xs text-gray-300 truncate">{track.artist}</p>
                  </div>

                  {/* Actions & Duration */}
                  <div className="col-span-5 sm:col-span-2 flex items-center justify-end space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(track);
                      }}
                      className={`p-1.5 transition-colors ${
                        isLiked ? 'text-red-500' : 'text-gray-600 hover:text-white'
                      }`}
                      title={isLiked ? 'Quitar de Favoritos' : 'Guardar'}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDownload(track);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                      title="Descargar en MP3 directo"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <span className="text-xs text-gray-500 font-mono w-10 text-right">{track.duration}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
