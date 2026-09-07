const fs = require('fs');

const jsx = `import React, { useState, useEffect } from 'react';
import { Search, Download, Play, Music, Heart, X, ExternalLink, Loader2, SkipForward, SkipBack, Volume2, VolumeX, Disc3 } from 'lucide-react';

const TRENDING = [
  { videoId: 'T3Auu0f-Z6M', title: 'Hawai', artist: 'Maluma', duration: '3:05', thumbnail: 'https://i.ytimg.com/vi/T3Auu0f-Z6M/mqdefault.jpg', views: '1.2B' },
  { videoId: 'CHuq9r4HJOE', title: 'Titi Me Pregunto', artist: 'Bad Bunny', duration: '4:04', thumbnail: 'https://i.ytimg.com/vi/CHuq9r4HJOE/mqdefault.jpg', views: '890M' },
  { videoId: 'xqeR5F4mRaE', title: 'Mi Gente', artist: 'J Balvin', duration: '3:14', thumbnail: 'https://i.ytimg.com/vi/xqeR5F4mRaE/mqdefault.jpg', views: '4.5B' },
  { videoId: 'K4DyBUG242c', title: 'Con Calma', artist: 'Daddy Yankee', duration: '3:14', thumbnail: 'https://i.ytimg.com/vi/K4DyBUG242c/mqdefault.jpg', views: '2.1B' },
  { videoId: 'kTJczUoc26U', title: 'Danza Kuduro', artist: 'Don Omar', duration: '3:41', thumbnail: 'https://i.ytimg.com/vi/kTJczUoc26U/mqdefault.jpg', views: '3.2B' },
  { videoId: 'mXnRNNiqBrI', title: 'Felices los 4', artist: 'Maluma', duration: '3:25', thumbnail: 'https://i.ytimg.com/vi/mXnRNNiqBrI/mqdefault.jpg', views: '1.8B' },
  { videoId: '60ItHLz5WEA', title: 'Pepas', artist: 'Farruko', duration: '3:17', thumbnail: 'https://i.ytimg.com/vi/60ItHLz5WEA/mqdefault.jpg', views: '900M' },
  { videoId: 'JGwWNGJdvx8', title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:53', thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/mqdefault.jpg', views: '6.1B' },
  { videoId: 'RgKAFK5djSk', title: 'See You Again', artist: 'Wiz Khalifa', duration: '3:56', thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/mqdefault.jpg', views: '5.9B' },
  { videoId: '450p7goxZqg', title: 'Lean On', artist: 'Major Lazer', duration: '2:56', thumbnail: 'https://i.ytimg.com/vi/450p7goxZqg/mqdefault.jpg', views: '3.2B' },
  { videoId: 'YqeW9_5kURI', title: 'Boom Boom', artist: 'RedOne ft. Daddy Yankee', duration: '3:13', thumbnail: 'https://i.ytimg.com/vi/YqeW9_5kURI/mqdefault.jpg', views: '600M' },
  { videoId: 'UceaB4D0jpo', title: 'Trumpets', artist: 'Jason Derulo', duration: '3:22', thumbnail: 'https://i.ytimg.com/vi/UceaB4D0jpo/mqdefault.jpg', views: '700M' },
];

const QUICK_TAGS = ['Maluma','Bad Bunny','Shakira','J Balvin','Karol G','Feid','Blessd','Peso Pluma','Carlos Vives','Ozuna','Grupo Firme','Marc Anthony'];

async function searchYT(query) {
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://invidious.privacyredirect.com',
  ];
  for (const base of instances) {
    try {
      const url = base + '/api/v1/search?q=' + encodeURIComponent(query + ' audio') + '&type=video&sort_by=relevance';
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) continue;
      return data.slice(0, 24).map(v => ({
        videoId: v.videoId,
        title: v.title,
        artist: v.author || 'Artista',
        duration: v.lengthSeconds
          ? Math.floor(v.lengthSeconds / 60) + ':' + String(v.lengthSeconds % 60).padStart(2, '0')
          : '?:??',
        thumbnail: 'https://i.ytimg.com/vi/' + v.videoId + '/mqdefault.jpg',
        views: v.viewCount
          ? v.viewCount > 1e9
            ? (v.viewCount / 1e9).toFixed(1) + 'B'
            : (v.viewCount / 1e6).toFixed(0) + 'M'
          : '',
      }));
    } catch (_) { continue; }
  }
  return [];
}

// ── Modal de descarga estilo Snaptube ───────────────────────────────────────
function DownloadModal({ track, onClose }) {
  const ytUrl = 'https://www.youtube.com/watch?v=' + track.videoId;
  const ytShort = 'https://youtu.be/' + track.videoId;
  const [activeFormat, setActiveFormat] = useState(0);
  const [copied, setCopied] = useState(false);

  const FORMATS = [
    {
      label: 'MP3 — Audio (128 kbps)',
      icon: '🎵',
      desc: 'Ideal para escuchar en el celular o computadora',
      providers: [
        { name: 'Cobalt Tools (Sin Anuncios ✅)', url: 'https://cobalt.tools/', note: 'Pega el enlace y elige MP3' },
        { name: 'YT1S MP3 Gratis', url: 'https://yt1s.io/youtube-to-mp3?q=' + encodeURIComponent(ytShort) },
        { name: 'Y2Mate MP3', url: 'https://www.y2mate.com/youtube-mp3/' + track.videoId },
        { name: 'SSYoutube MP3', url: 'https://ssyoutube.com/en57/youtube-video-downloader?url=' + encodeURIComponent(ytUrl) },
      ],
    },
    {
      label: 'MP3 — Alta Calidad (320 kbps)',
      icon: '🎶',
      desc: 'La mejor calidad de audio disponible en MP3',
      providers: [
        { name: 'Cobalt Tools 320k (Sin Anuncios ✅)', url: 'https://cobalt.tools/', note: 'Pega el enlace, selecciona Calidad Maxima' },
        { name: 'Loader.to MP3 320k', url: 'https://loader.to/api/button/?url=' + encodeURIComponent(ytUrl) + '&f=mp3' },
      ],
    },
    {
      label: 'MP4 — Video HD 720p',
      icon: '📹',
      desc: 'Video con audio en calidad HD 720p',
      providers: [
        { name: 'Cobalt Tools 720p (Sin Anuncios ✅)', url: 'https://cobalt.tools/', note: 'Pega el enlace, selecciona 720p' },
        { name: 'SSYoutube MP4 HD', url: 'https://ssyoutube.com/en57/youtube-video-downloader?url=' + encodeURIComponent(ytUrl) },
        { name: 'Y2Mate Video HD', url: 'https://www.y2mate.com/youtube/' + track.videoId },
      ],
    },
    {
      label: 'MP4 — Full HD 1080p',
      icon: '🎬',
      desc: 'Maxima calidad de video disponible',
      providers: [
        { name: 'Cobalt Tools 1080p (Sin Anuncios ✅)', url: 'https://cobalt.tools/', note: 'Pega el enlace, ajusta a 1080p' },
        { name: 'SaveFrom.net 1080p', url: 'https://en.savefrom.net/#url=' + encodeURIComponent(ytUrl) },
      ],
    },
    {
      label: 'WEBM — Audio Sin Perdida',
      icon: '🎙️',
      desc: 'Formato sin compresion, maxima fidelidad',
      providers: [
        { name: 'Cobalt Tools WEBM (Sin Anuncios ✅)', url: 'https://cobalt.tools/', note: 'Selecciona WEBM en el menu de formato' },
      ],
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(ytUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div
        className="w-full sm:max-w-lg bg-[#111] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center space-x-3 p-5 border-b border-white/10 flex-shrink-0">
          <img src={track.thumbnail} alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-green-500/40 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-white text-base truncate">{track.title}</h3>
            <p className="text-green-400 text-xs font-bold">{track.artist}</p>
            <p className="text-gray-600 text-[10px] mt-0.5 font-mono truncate">{ytUrl}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copiar enlace */}
        <div className="px-5 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={copyLink}
            className={"w-full py-2.5 rounded-xl text-xs font-bold border transition-all " + (copied ? 'bg-green-600 border-green-500 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white')}
          >
            {copied ? '✅ Enlace copiado — pega en Cobalt Tools!' : '📋 Copiar enlace de YouTube para pegar en Cobalt'}
          </button>
        </div>

        {/* Selector de formato */}
        <div className="px-5 pb-2 flex-shrink-0">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2">Elige el formato de descarga:</p>
          <div className="flex flex-col space-y-1.5">
            {FORMATS.map((fmt, i) => (
              <button
                key={i}
                onClick={() => setActiveFormat(i)}
                className={"flex items-center space-x-3 px-4 py-2.5 rounded-xl border transition-all text-left " + (activeFormat === i ? 'bg-white/10 border-white/30' : 'border-white/5 hover:border-white/15 hover:bg-white/5')}
              >
                <span className="text-xl w-7 text-center flex-shrink-0">{fmt.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className={"font-bold text-sm block " + (activeFormat === i ? 'text-white' : 'text-gray-400')}>{fmt.label}</span>
                  <span className="text-[10px] text-gray-600">{fmt.desc}</span>
                </div>
                {activeFormat === i && <span className="text-green-400 text-xs font-bold flex-shrink-0">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Servidores para el formato elegido */}
        <div className="px-5 pt-1 pb-5 overflow-y-auto">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2">Servidores de descarga disponibles:</p>
          <div className="space-y-2">
            {FORMATS[activeFormat].providers.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-4 py-3 bg-white/5 hover:bg-green-900/30 border border-white/5 hover:border-green-600/40 rounded-xl transition-all group"
              >
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/40 transition-all">
                  <Download className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors truncate">{p.name}</p>
                  {p.note && <p className="text-[10px] text-gray-500">{p.note}</p>}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-green-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-950/40 border border-green-800/30 rounded-xl">
            <p className="text-[10px] text-green-600 text-center font-medium">
              💡 <strong className="text-green-400">Recomendado: Cobalt Tools</strong> — Sin anuncios, sin registro, calidad maxima, todos los formatos. Copia el enlace de arriba y pegalo ahi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mini reproductor inferior ────────────────────────────────────────────────
function BottomPlayer({ track, onClose, onNext, onPrev, onDownload }) {
  const [muted, setMuted] = useState(false);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d]/97 border-t border-white/10 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.7)]">
      <div className="h-0.5 bg-white/5">
        <div className="h-full bg-gradient-to-r from-red-600 to-pink-500 w-2/5" />
      </div>
      <div className="px-4 py-3 flex items-center space-x-3 max-w-5xl mx-auto">
        <div className="relative w-12 h-12 flex-shrink-0">
          <img src={track.thumbnail} alt="" className="w-full h-full rounded-lg object-cover ring-2 ring-red-600/50" />
          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
            <div className="flex space-x-0.5 items-end">
              <div className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
              <div className="w-0.5 bg-white rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
              <div className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{track.title}</p>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
        </div>

        {/* Audio embed invisible */}
        <div className="w-0 h-0 overflow-hidden opacity-0 absolute pointer-events-none">
          <iframe
            key={track.videoId}
            width="1" height="1"
            src={"https://www.youtube.com/embed/" + track.videoId + "?autoplay=1&mute=" + (muted ? "1" : "0") + "&rel=0&controls=0&modestbranding=1"}
            allow="autoplay; encrypted-media"
            title="music-player"
          />
        </div>

        <button onClick={onPrev} className="text-gray-400 hover:text-white p-1.5 transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <a
          href={"https://www.youtube.com/watch?v=" + track.videoId}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
          title="Abrir en YouTube para reproduccion completa"
        >
          <Play className="w-5 h-5 fill-white text-white" />
        </a>
        <button onClick={onNext} className="text-gray-400 hover:text-white p-1.5 transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
        <button onClick={() => setMuted(!muted)} className="text-gray-400 hover:text-white p-1.5 transition-colors hidden sm:block">
          {muted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <button
          onClick={() => onDownload(track)}
          className="flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-all shadow-lg border border-green-400/30 flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Descargar</span>
        </button>
        <button onClick={onClose} className="text-gray-500 hover:text-white p-1.5 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Tarjeta de cancion ───────────────────────────────────────────────────────
function TrackCard({ track, index, isPlaying, onPlay, onLike, isLiked, onDownload }) {
  return (
    <div className={"group flex items-center space-x-3 px-3 py-2.5 rounded-xl border transition-all " + (isPlaying ? 'bg-red-900/20 border-red-500/40' : 'border-transparent hover:border-white/10 hover:bg-white/5')}>
      <div className="w-7 text-center flex-shrink-0">
        {isPlaying
          ? <Disc3 className="w-4 h-4 text-red-400 animate-spin mx-auto" />
          : <span className="text-gray-600 text-sm font-mono group-hover:hidden">{index + 1}</span>
        }
        {!isPlaying && (
          <button onClick={() => onPlay(track)} className="hidden group-hover:flex w-5 h-5 bg-white rounded-full items-center justify-center mx-auto">
            <Play className="w-3 h-3 fill-black text-black" />
          </button>
        )}
      </div>
      <img src={track.thumbnail} alt="" className="w-11 h-11 rounded-lg object-cover flex-shrink-0 bg-gray-800" />
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onPlay(track)}>
        <p className={"font-bold text-sm truncate " + (isPlaying ? 'text-red-400' : 'text-white')}>{track.title}</p>
        <p className="text-gray-500 text-xs truncate">{track.artist}</p>
      </div>
      {track.views && <span className="hidden md:block text-[10px] text-gray-600 font-mono flex-shrink-0">{track.views}</span>}
      <span className="hidden lg:block text-[10px] text-gray-600 font-mono flex-shrink-0">{track.duration}</span>
      <button onClick={() => onLike(track)} className={"p-1.5 transition-all flex-shrink-0 " + (isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-400')}>
        <Heart className={"w-4 h-4 " + (isLiked ? 'fill-red-500' : '')} />
      </button>
      <button
        onClick={() => onDownload(track)}
        className="flex items-center space-x-1 bg-green-600/80 hover:bg-green-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Descargar</span>
      </button>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function MusicSection() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [downloadTrack, setDownloadTrack] = useState(null);
  const [likedTracks, setLikedTracks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('music_liked') || '[]'); } catch { return []; }
  });
  const [activeTab, setActiveTab] = useState('trending');

  const displayTracks =
    activeTab === 'liked' ? likedTracks :
    (activeTab === 'results' && searchResults.length > 0) ? searchResults :
    TRENDING;

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      if (activeTab === 'results') setActiveTab('trending');
      return;
    }
    const t = setTimeout(async () => {
      setIsSearching(true);
      const r = await searchYT(query);
      setSearchResults(r);
      setIsSearching(false);
      if (r.length > 0) setActiveTab('results');
    }, 700);
    return () => clearTimeout(t);
  }, [query]);

  const handlePlay = (track) => {
    setCurrentTrack(track);
    const i = displayTracks.findIndex(t => t.videoId === track.videoId);
    setCurrentIdx(i >= 0 ? i : 0);
  };
  const handleNext = () => { const n = (currentIdx + 1) % displayTracks.length; setCurrentIdx(n); setCurrentTrack(displayTracks[n]); };
  const handlePrev = () => { const p = (currentIdx - 1 + displayTracks.length) % displayTracks.length; setCurrentIdx(p); setCurrentTrack(displayTracks[p]); };
  const handleLike = (track) => {
    const liked = likedTracks.some(t => t.videoId === track.videoId);
    const upd = liked ? likedTracks.filter(t => t.videoId !== track.videoId) : [...likedTracks, track];
    setLikedTracks(upd);
    localStorage.setItem('music_liked', JSON.stringify(upd));
  };

  return (
    <div className={"min-h-screen bg-[#141414] text-white " + (currentTrack ? 'pb-28' : 'pb-12')}>
      {downloadTrack && <DownloadModal track={downloadTrack} onClose={() => setDownloadTrack(null)} />}

      {/* Hero Search */}
      <div className="relative pt-24 pb-8 px-4 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-red-600 to-pink-700 rounded-2xl shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">StreamMusic <span className="text-red-500">Pro</span></h1>
              <p className="text-gray-500 text-xs">Busca · Reproduce · Descarga en MP3, MP4, WEBM y mas</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              {isSearching
                ? <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
                : <Search className="w-5 h-5 text-gray-500" />}
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Busca artista, cancion, album... ej: Maluma, Bad Bunny, Shakira"
              className="w-full bg-[#1c1c1c] border border-white/10 focus:border-red-500 text-white placeholder-gray-600 rounded-2xl py-4 pl-12 pr-10 text-sm font-medium outline-none shadow-xl transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tags rapidos */}
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-white rounded-full transition-all font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-4 flex items-center space-x-2 overflow-x-auto">
        {[
          { id: 'trending', label: 'Tendencias' },
          { id: 'results', label: 'Resultados (' + searchResults.length + ')' },
          { id: 'liked', label: 'Favoritos (' + likedTracks.length + ')' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={"px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap " + (activeTab === tab.id ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de canciones */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-1">
        {displayTracks.length === 0 ? (
          <div className="py-20 text-center text-gray-600 space-y-2">
            <Search className="w-10 h-10 mx-auto text-gray-800" />
            <p>{activeTab === 'liked' ? 'Sin favoritos. Toca el corazon en cualquier cancion.' : 'Escribe una cancion o artista para buscar.'}</p>
          </div>
        ) : displayTracks.map((track, i) => (
          <TrackCard
            key={track.videoId + i}
            track={track}
            index={i}
            isPlaying={currentTrack?.videoId === track.videoId}
            onPlay={handlePlay}
            onLike={handleLike}
            isLiked={likedTracks.some(t => t.videoId === track.videoId)}
            onDownload={setDownloadTrack}
          />
        ))}
      </div>

      {/* Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-8 p-4 bg-green-950/30 border border-green-800/30 rounded-2xl">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          <span className="text-green-400 font-bold">Como usar:</span>{' '}
          1) Busca tu cancion · 2) Toca para reproducir · 3) Presiona{' '}
          <span className="text-green-300 font-bold">Descargar</span>{' '}
          · 4) Elige formato: <span className="text-white font-bold">MP3 128k, MP3 320k, MP4 720p, MP4 1080p o WEBM</span> · 5) Elige servidor gratis
        </p>
      </div>

      {/* Mini Player */}
      {currentTrack && (
        <BottomPlayer
          track={currentTrack}
          onClose={() => setCurrentTrack(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          onDownload={setDownloadTrack}
        />
      )}
    </div>
  );
}
`;

fs.writeFileSync('G:/streamflix/src/components/MusicSection.jsx', jsx, 'utf8');
console.log('Written! Size:', fs.statSync('G:/streamflix/src/components/MusicSection.jsx').size, 'bytes');
