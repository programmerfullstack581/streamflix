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
      title: 'Formatos de Audio (MP3 / FLAC / WAV)',
      formats: [
        {
          id: 'mp3-320',
          name: 'MP3 — 320 kbps (Directo)',
          tag: 'MÁXIMA CALIDAD ⭐',
          badgeColor: 'bg-red-600/20 text-red-400 border-red-500/40',
          size: '~8.5 MB',
          desc: 'Audio en la más alta fidelidad estéreo MP3 disponible.',
          icon: Zap,
          providers: [
            { name: 'Y2Mate MP3 (Descarga Rápida 320k)', url: `https://www.y2mate.com/youtube-mp3/${track.videoId}`, best: true },
            { name: 'YT1S Convertidor MP3', url: `https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent(ytShort)}` },
            { name: 'Cobalt Tools (Sin Anuncios ⭐)', url: 'https://cobalt.tools/', note: 'Pega el enlace copiado y descarga al instante' },
            { name: 'Loader.to MP3 Directo', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=mp3` },
          ]
        },
        {
          id: 'mp3-128',
          name: 'MP3 — 128 kbps (Ligero)',
          tag: 'LIVIANO',
          badgeColor: 'bg-neutral-800 text-gray-300 border-neutral-700',
          size: '~3.4 MB',
          desc: 'Formato estándar ligero ideal para ahorrar espacio en el teléfono.',
          icon: Music,
          providers: [
            { name: 'YT1S MP3 Rápido', url: `https://yt1s.io/youtube-to-mp3?q=${encodeURIComponent(ytShort)}`, best: true },
            { name: 'SSYouTube MP3', url: `https://ssyoutube.com/en57/youtube-video-downloader?url=${encodeURIComponent(ytUrl)}` },
            { name: 'Y2Mate MP3', url: `https://www.y2mate.com/youtube-mp3/${track.videoId}` },
          ]
        },
        {
          id: 'flac',
          name: 'FLAC — Lossless',
          tag: 'HI-FI SIN PÉRDIDA',
          badgeColor: 'bg-red-950 text-red-300 border-red-700',
          size: '~25 MB',
          desc: 'Formato de estudio sin pérdida para audiófilos y sonido Hi-Fi.',
          icon: FileAudio,
          providers: [
            { name: 'Loader.to FLAC Hi-Fi', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=flac` },
            { name: 'Cobalt Tools FLAC Studio', url: 'https://cobalt.tools/', note: 'Elige FLAC en formatos' },
          ]
        },
        {
          id: 'wav',
          name: 'WAV — PCM Audio',
          tag: 'AUDIO PURO',
          badgeColor: 'bg-neutral-800 text-gray-300 border-neutral-700',
          size: '~35 MB',
          desc: 'Audio PCM puro sin compresión.',
          icon: Radio,
          providers: [
            { name: 'Loader.to WAV Directo', url: `https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=wav` },
            { name: 'Cobalt Tools WAV Master', url: 'https://cobalt.tools/' },
          ]
        }
      ]
    },
    {
      type: 'video',
      title: 'Formatos de Video Musical (MP4)',
      formats: [
        {
          id: 'mp4-1080',
          name: 'MP4 — Full HD 1080p',
          tag: 'VIDEO FULL HD',
          badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
          size: '~60 MB',
          desc: 'Video musical oficial con la máxima resolución.',
          icon: Film,
          providers: [
            { name: 'Cobalt 1080p (Sin Anuncios)', url: 'https://cobalt.tools/', note: 'Selecciona 1080p' },
            { name: 'Y2Mate 1080p', url: `https://www.y2mate.com/youtube/${track.videoId}` },
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
    MusicStorage.recordDownload(track, selectedFormat.name);
    if (onDownloadRecorded) onDownloadRecorded();
    setStatusMessage(`✅ Guardando registro de descarga en ${selectedFormat.name}`);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#141414] border border-red-600/40 rounded-2xl sm:rounded-3xl shadow-red-neon overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Track info Red & Black */}
        <div className="bg-gradient-to-r from-red-950 via-[#1a1a1a] to-[#141414] p-5 sm:p-6 border-b border-red-600/30 flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0">
            <img 
              src={track.thumbnail} 
              alt={track.title} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-2xl ring-2 ring-red-600/70 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-600/20 px-2 py-0.5 rounded-full border border-red-500/30">
                Descargador Directo MP3
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white truncate mt-1">{track.title}</h2>
              <p className="text-sm text-gray-300 font-medium truncate">{track.artist}</p>
              <p className="text-xs text-gray-500 font-mono mt-0.5">Duración: {track.duration} • Audio Alta Calidad</p>
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
          <div className="bg-[#0d0d0d] p-3.5 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="min-w-0 w-full">
              <p className="text-xs text-gray-400 font-medium truncate">Enlace directo de la canción:</p>
              <p className="text-xs text-red-400 font-mono truncate">{ytUrl}</p>
            </div>
            <button
              onClick={handleCopyLink}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 flex-shrink-0 ${
                copied 
                  ? 'bg-red-600 text-white shadow-lg' 
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
              <Sparkles className="w-4 h-4 text-[#E50914]" />
              <span>1. Elige el formato para descargar:</span>
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
                              ? 'bg-red-950/50 border-red-500 shadow-lg ring-1 ring-red-500' 
                              : 'bg-[#0d0d0d] border-white/5 hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-bold truncate block ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                              {fmt.name}
                            </span>
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

          {/* In-Modal Direct Downloader Widget */}
          <div className="pt-2 border-t border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-red-500 fill-current" />
              <span>2. Descarga Directa en Esta Pantalla (Sin Salir):</span>
            </h3>

            <div className="p-4 bg-[#0a0a0a] rounded-2xl border border-red-500/40 flex flex-col items-center justify-center text-center space-y-3 shadow-inner">
              <div className="w-full max-w-md h-24 overflow-hidden rounded-xl flex items-center justify-center bg-[#111] border border-white/5">
                <iframe
                  key={`${track.videoId}-${selectedFormatId}`}
                  src={`https://loader.to/api/button/?url=${encodeURIComponent(ytUrl)}&f=${selectedFormatId.includes('mp4') ? '1080' : selectedFormatId.includes('flac') ? 'flac' : selectedFormatId.includes('wav') ? 'wav' : 'mp3'}`}
                  className="w-full h-full border-0 rounded-xl"
                  scrolling="no"
                  title="Direct Download Modal"
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                Presiona el botón de descarga dentro del cuadro para descargar <strong className="text-red-400">{selectedFormat.name}</strong> directo a tu dispositivo.
              </p>
            </div>
          </div>

          {/* Server Providers */}
          <div className="pt-2 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-2">
              <Download className="w-4 h-4 text-[#E50914]" />
              <span>Otras Opciones de Descarga Rápida:</span>
            </h3>

            <div className="space-y-2.5">
              {selectedFormat.providers.map((p, idx) => (
                <a
                  key={idx}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleProviderClick(p)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all group ${
                    p.best 
                      ? 'bg-gradient-to-r from-red-950/80 to-[#121212] border-red-500/60 hover:border-red-400 shadow-red-neon' 
                      : 'bg-[#0d0d0d] border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      p.best ? 'bg-red-600 text-white font-black shadow-md' : 'bg-white/10 text-white'
                    }`}>
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                          {p.name}
                        </span>
                        {p.best && (
                          <span className="text-[9px] font-black bg-red-600 text-white px-2 py-0.2 rounded-full">
                            DIRECTO MP3
                          </span>
                        )}
                      </div>
                      {p.note && <p className="text-[11px] text-gray-400 mt-0.5">{p.note}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 pl-2">
                    <span className="text-xs font-bold text-red-400 hidden sm:inline">Descargar ahora</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            {statusMessage && (
              <p className="text-xs font-bold text-red-400 text-center mt-3 animate-fadeIn">{statusMessage}</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#0d0d0d] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Formato: <strong className="text-white">{selectedFormat.name}</strong></span>
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
