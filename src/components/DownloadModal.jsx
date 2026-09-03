import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Music, 
  Radio, 
  Sparkles, 
  HardDrive, 
  FileAudio, 
  Film,
  Zap
} from 'lucide-react';
import { MusicStorage } from '../services/musicService';

export default function DownloadModal({ track, onClose, onDownloadRecorded }) {
  if (!track) return null;

  const ytUrl = `https://www.youtube.com/watch?v=${track.videoId}`;
  const ytShort = `https://youtu.be/${track.videoId}`;

  const [selectedFormatId, setSelectedFormatId] = useState('mp3-320');
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const FORMAT_GROUPS = [
    {
      type: 'audio',
      title: 'Formatos de Audio',
      formats: [
        {
          id: 'mp3-320',
          name: 'MP3 — 320 kbps',
          tag: 'MÁXIMA CALIDAD',
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          size: '~8.5 MB',
          desc: 'Audio en la más alta fidelidad estéreo MP3 disponible.',
          icon: FileAudio,
          providers: [
            { name: 'Cobalt Tools (Recomendado ⭐ Sin Anuncios)', url: 'https://cobalt.tools/', note: 'Pega el enlace y selecciona calidad 320k', best: true },
            { name: 'Loader.to MP3 320k Directo', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=mp3` },
            { name: 'Y2Mate MP3 Ultra', url: `https://www.y2mate.com/youtube-mp3/${track.videoId}` },
            { name: 'YT1S Convertidor MP3', url: `https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent(ytShort)}` },
          ]
        },
        {
          id: 'mp3-128',
          name: 'MP3 — 128 kbps',
          tag: 'LIVIANO',
          badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          size: '~3.4 MB',
          desc: 'Formato estándar ligero ideal para ahorrar espacio en el teléfono.',
          icon: Music,
          providers: [
            { name: 'Cobalt Tools MP3 Rápido', url: 'https://cobalt.tools/', note: 'Descarga rápida instantánea' },
            { name: 'SSYouTube MP3 Rápido', url: `https://ssyoutube.com/en57/youtube-video-downloader?url=${encodeURIComponent(ytUrl)}` },
            { name: 'Y2Mate MP3', url: `https://www.y2mate.com/youtube/${track.videoId}` },
          ]
        },
        {
          id: 'flac',
          name: 'FLAC — Lossless',
          tag: 'HI-FI SIN PÉRDIDA',
          badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
          size: '~25 MB',
          desc: 'Formato de estudio sin pérdida para audiófilos y equipos de sonido Hi-Fi.',
          icon: Zap,
          providers: [
            { name: 'Cobalt Tools FLAC Studio', url: 'https://cobalt.tools/', note: 'Elige FLAC en la lista de formatos' },
            { name: 'Loader.to FLAC Hi-Fi', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=flac` },
          ]
        },
        {
          id: 'wav',
          name: 'WAV — PCM Audio',
          tag: 'SIN COMPRESIÓN',
          badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          size: '~35 MB',
          desc: 'Audio PCM puro sin compresión, ideal para edición o producción musical.',
          icon: Radio,
          providers: [
            { name: 'Cobalt Tools WAV Master', url: 'https://cobalt.tools/', note: 'Selecciona formato WAV' },
            { name: 'Loader.to WAV', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=wav` },
          ]
        },
        {
          id: 'm4a',
          name: 'M4A / AAC (Apple)',
          tag: 'OPTIMIZADO IPHONE / MAC',
          badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
          size: '~6.8 MB',
          desc: 'Códec AAC optimizado nativamente para iPhone, iPad, Mac y iTunes.',
          icon: FileAudio,
          providers: [
            { name: 'Cobalt Tools AAC/M4A', url: 'https://cobalt.tools/', note: 'Selecciona formato AAC/M4A' },
            { name: 'Loader.to M4A', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=m4a` },
          ]
        },
        {
          id: 'ogg',
          name: 'OGG / OPUS',
          tag: 'FORMATO SPOTIFY',
          badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
          size: '~4.2 MB',
          desc: 'El códec de compresión moderno utilizado por Spotify en streaming.',
          icon: Music,
          providers: [
            { name: 'Cobalt Tools OPUS/OGG', url: 'https://cobalt.tools/', note: 'Elige OGG / OPUS' },
          ]
        }
      ]
    },
    {
      type: 'video',
      title: 'Formatos de Video Musical',
      formats: [
        {
          id: 'mp4-1080',
          name: 'MP4 — Full HD 1080p',
          tag: 'VIDEO FULL HD',
          badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          size: '~60 MB',
          desc: 'Video musical oficial con la máxima resolución y nitidez.',
          icon: Film,
          providers: [
            { name: 'Cobalt Tools 1080p (Sin Publicidad)', url: 'https://cobalt.tools/', note: 'Selecciona 1080p' },
            { name: 'SaveFrom.net 1080p', url: `https://en.savefrom.net/#url=${encodeURIComponent(ytUrl)}` },
            { name: 'Y2Mate 1080p', url: `https://www.y2mate.com/youtube/${track.videoId}` },
          ]
        },
        {
          id: 'mp4-720',
          name: 'MP4 — HD 720p',
          tag: 'VIDEO HD',
          badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
          size: '~28 MB',
          desc: 'Video en alta definición optimizado para cualquier pantalla.',
          icon: Film,
          providers: [
            { name: 'Cobalt Tools 720p', url: 'https://cobalt.tools/', note: 'Selecciona 720p' },
            { name: 'SSYouTube MP4 720p', url: `https://ssyoutube.com/en57/youtube-video-downloader?url=${encodeURIComponent(ytUrl)}` },
          ]
        }
      ]
    }
  ];

  const allFormats = FORMAT_GROUPS.flatMap(g => g.formats);
  const selectedFormat = allFormats.find(f => f.id === selectedFormatId) || allFormats[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ytUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleProviderClick = (provider) => {
    // Registrar la descarga en la biblioteca local
    MusicStorage.recordDownload(track, selectedFormat.name);
    if (onDownloadRecorded) onDownloadRecorded();
    setStatusMessage(`✅ Guardando registro de descarga en ${selectedFormat.name}`);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#181818] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Track info */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#202020] to-[#181818] p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0">
            <img 
              src={track.thumbnail} 
              alt={track.title} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-2xl ring-2 ring-[#1DB954]/50 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded-full border border-[#1DB954]/20">
                Descargador Multi-Formato
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white truncate mt-1">{track.title}</h2>
              <p className="text-sm text-gray-400 font-medium truncate">{track.artist}</p>
              <p className="text-xs text-gray-500 font-mono mt-0.5">Duración: {track.duration} • {track.views || 'Oficial'}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Action Copy Link */}
          <div className="bg-[#121212] p-3.5 rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="min-w-0 w-full">
              <p className="text-xs text-gray-400 font-medium truncate">Enlace directo de la canción:</p>
              <p className="text-xs text-emerald-400 font-mono truncate">{ytUrl}</p>
            </div>
            <button
              onClick={handleCopyLink}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 flex-shrink-0 ${
                copied 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
            </button>
          </div>

          {/* Format Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#1DB954]" />
              <span>1. Selecciona el formato que deseas descargar:</span>
            </h3>

            <div className="space-y-4">
              {FORMAT_GROUPS.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">{group.title}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.formats.map((fmt) => {
                      const Icon = fmt.icon;
                      const isSelected = selectedFormatId === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          onClick={() => setSelectedFormatId(fmt.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                            isSelected 
                              ? 'bg-emerald-950/40 border-[#1DB954] shadow-lg shadow-[#1DB954]/10 ring-1 ring-[#1DB954]' 
                              : 'bg-[#121212] border-white/5 hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#1DB954] text-black' : 'bg-white/5 text-gray-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                {fmt.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border ${fmt.badgeColor}`}>
                                {fmt.tag}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">{fmt.size}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-1 leading-snug">{fmt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Providers */}
          <div className="pt-2 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-2">
              <Download className="w-4 h-4 text-[#1DB954]" />
              <span>2. Descarga en <span className="text-[#1DB954] font-black">{selectedFormat.name}</span>:</span>
            </h3>

            <div className="space-y-2.5">
              {selectedFormat.providers.map((p, idx) => (
                <a
                  key={idx}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleProviderClick(p)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group ${
                    p.best 
                      ? 'bg-gradient-to-r from-emerald-950/60 to-[#121212] border-emerald-500/50 hover:border-emerald-400 shadow-lg' 
                      : 'bg-[#121212] border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      p.best ? 'bg-[#1DB954] text-black font-black' : 'bg-white/10 text-white'
                    }`}>
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white group-hover:text-[#1DB954] transition-colors truncate">
                          {p.name}
                        </span>
                        {p.best && (
                          <span className="text-[9px] font-black bg-[#1DB954] text-black px-1.5 py-0.2 rounded-full">
                            SIN ANUNCIOS
                          </span>
                        )}
                      </div>
                      {p.note && <p className="text-[11px] text-gray-400 mt-0.5">{p.note}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 pl-2">
                    <span className="text-xs font-bold text-[#1DB954] hidden sm:inline">Descargar ahora</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1DB954] transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            {statusMessage && (
              <p className="text-xs font-bold text-emerald-400 text-center mt-3 animate-fadeIn">{statusMessage}</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#121212] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <span>Formato actual: <strong className="text-white">{selectedFormat.name}</strong></span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
