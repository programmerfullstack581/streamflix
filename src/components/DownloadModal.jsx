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
  Zap,
  CheckCircle2
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
          badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
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
          badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
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
          badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
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
          badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
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
          badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white border border-sky-100 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Track info Sky Blue */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 p-5 sm:p-6 border-b border-sky-200 flex items-center justify-between text-white">
          <div className="flex items-center space-x-4 min-w-0">
            <img 
              src={track.thumbnail} 
              alt={track.title} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-lg ring-2 ring-white/60 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-white bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
                Descargador Multiformato
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white truncate mt-1">{track.title}</h2>
              <p className="text-sm text-sky-100 font-medium truncate">{track.artist}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* Direct URL copy bar */}
          <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center space-x-2 min-w-0 text-xs text-slate-600 font-mono truncate">
              <span className="text-slate-400">URL:</span>
              <span className="truncate">{ytUrl}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 flex-shrink-0 cursor-pointer shadow-sm ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          {statusMessage && (
            <div className="p-3 bg-sky-50 border border-sky-300 text-sky-900 rounded-xl text-xs font-bold text-center animate-fadeIn">
              {statusMessage}
            </div>
          )}

          {/* Formats Grid */}
          <div className="space-y-4">
            {FORMAT_GROUPS.map((group) => (
              <div key={group.type} className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  {group.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {group.formats.map((fmt) => {
                    const isSelected = selectedFormatId === fmt.id;
                    const IconComp = fmt.icon;
                    return (
                      <div
                        key={fmt.id}
                        onClick={() => setSelectedFormatId(fmt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-sky-50/80 border-sky-400 shadow-md ring-1 ring-sky-300'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3 min-w-0">
                          <div className={`p-2 rounded-xl flex-shrink-0 ${
                            isSelected ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                              <h5 className="text-xs font-bold text-slate-900 truncate">{fmt.name}</h5>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{fmt.desc}</p>
                            <span className="text-[10px] text-slate-400 font-mono mt-1 inline-block">{fmt.size}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border flex-shrink-0 ${fmt.badgeColor}`}>
                          {fmt.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Providers for Selected Format */}
          <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Servidores para {selectedFormat.name}:
              </h4>
              <span className="text-[10px] text-slate-500">Selecciona uno para abrir</span>
            </div>

            <div className="space-y-2">
              {selectedFormat.providers.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleProviderClick(provider)}
                  className={`p-3 rounded-xl flex items-center justify-between border transition-all ${
                    provider.best
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-md shadow-sky-500/20 hover:scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold truncate block">{provider.name}</span>
                    {provider.note && (
                      <span className={`text-[10px] block ${provider.best ? 'text-sky-100' : 'text-slate-500'}`}>
                        {provider.note}
                      </span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">StreamBeat © Descargador Profesional</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
