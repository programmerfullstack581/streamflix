// Servicio central de música y descargas directas MP3

export const GENRES_CATEGORIES = [
  { id: 'reggaeton', name: 'Reggaetón & Urbano', color: 'from-red-950 via-red-900 to-black', query: 'reggaeton 2024 hits', icon: '🔥' },
  { id: 'trap', name: 'Trap Latino & Drill', color: 'from-neutral-900 via-red-950 to-black', query: 'trap latino lo mas nuevo', icon: '⚡' },
  { id: 'pop', name: 'Pop Latino & Global', color: 'from-red-900 via-rose-950 to-black', query: 'pop en espanol exitos', icon: '✨' },
  { id: 'rock', name: 'Rock & Alternativo', color: 'from-red-800 via-zinc-900 to-black', query: 'rock en espanol clasicos', icon: '🎸' },
  { id: 'salsa', name: 'Salsa Brava & Tropical', color: 'from-amber-900 via-red-950 to-black', query: 'salsa brava clasicos', icon: '🎺' },
  { id: 'lofi', name: 'Lo-Fi Chill & Beats', color: 'from-zinc-900 via-red-950 to-black', query: 'lofi hip hop chill beats to relax', icon: '☕' },
  { id: 'electronic', name: 'Electrónica & EDM', color: 'from-red-900 via-stone-900 to-black', query: 'edm electronic party hits', icon: '🎧' },
  { id: 'cumbia', name: 'Cumbia & Fiesta', color: 'from-red-950 via-neutral-900 to-black', query: 'cumbia villera fiesta exitos', icon: '🪗' },
  { id: 'regional', name: 'Regional Mexicano', color: 'from-red-950 via-amber-950 to-black', query: 'corridos tumbados peso pluma', icon: '🤠' },
  { id: 'hiphop', name: 'Hip-Hop & Rap', color: 'from-stone-900 via-red-950 to-black', query: 'hip hop hits 2024', icon: '🎤' },
  { id: 'romantica', name: 'Baladas & Sentimiento', color: 'from-rose-950 via-red-950 to-black', query: 'baladas romanticas en espanol', icon: '❤️' },
  { id: 'vallenato', name: 'Vallenatos Clásicos', color: 'from-red-900 via-zinc-950 to-black', query: 'vallenatos clasicos colombia', icon: '🪗' },
];

export const TOP_ARTISTS = [
  { name: 'Bad Bunny', genre: 'Trap / Reggaetón', image: 'https://i.scdn.co/image/ab6761610000e5eb9ad50e413d3329f63503f56e', query: 'Bad Bunny audio oficial' },
  { name: 'Karol G', genre: 'Urbano / Pop', image: 'https://i.scdn.co/image/ab6761610000e5eb81775e5340ce976077335606', query: 'Karol G audio oficial' },
  { name: 'Feid (Ferxxo)', genre: 'Reggaetón', image: 'https://i.scdn.co/image/ab6761610000e5eb6046e7f232497678531ffeb2', query: 'Feid audio oficial' },
  { name: 'Peso Pluma', genre: 'Corridos Tumbados', image: 'https://i.scdn.co/image/ab6761610000e5eb56e879a6d71b402cf2e650df', query: 'Peso Pluma audio oficial' },
  { name: 'Maluma', genre: 'Urbano / Pop Latino', image: 'https://i.scdn.co/image/ab6761610000e5eb46115fa016f4ad27464fe461', query: 'Maluma audio oficial' },
  { name: 'Shakira', genre: 'Pop / Latino', image: 'https://i.scdn.co/image/ab6761610000e5eb0b9f9393a52541e21b7ff32d', query: 'Shakira audio oficial' },
  { name: 'J Balvin', genre: 'Reggaetón', image: 'https://i.scdn.co/image/ab6761610000e5eb21b7952a654716768a48efd3', query: 'J Balvin audio oficial' },
  { name: 'The Weeknd', genre: 'R&B / Synth Pop', image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb', query: 'The Weeknd official audio' },
];

// Helper universal para obtener miniaturas de YouTube 100% compatibles y estables
export function getYoutubeThumbnail(videoId, quality = 'mqdefault') {
  if (!videoId) return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export const CURATED_TOP_HITS = [
  {
    videoId: 'k85mRPqvMbE',
    title: 'Tití Me Preguntó',
    artist: 'Bad Bunny',
    album: 'Un Verano Sin Ti',
    duration: '4:04',
    seconds: 244,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa70',
    views: '890M',
    genre: 'Reggaetón'
  },
  {
    videoId: 'A_1fVpt18Zg',
    title: 'Qlona',
    artist: 'Karol G ft. Peso Pluma',
    album: 'MAÑANA SERÁ BONITO',
    duration: '2:52',
    seconds: 172,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27382d24d262d1a3c75f56b9c9f',
    views: '480M',
    genre: 'Reggaetón'
  },
  {
    videoId: 'vla02RzL1uM',
    title: 'LUNA',
    artist: 'Feid ft. ATL Jacob',
    album: 'FERXXOCALIPSIS',
    duration: '3:16',
    seconds: 196,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2739e52a818c8b185fa78484e5a',
    views: '350M',
    genre: 'Reggaetón'
  },
  {
    videoId: 'pK060iUFWXg',
    title: 'Hawái',
    artist: 'Maluma',
    album: 'Papi Juancho',
    duration: '3:20',
    seconds: 200,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2739343ee6dfeb098e6c75c0836',
    views: '1.1B',
    genre: 'Pop Urbano'
  },
  {
    videoId: 'lZiaYp1Z_60',
    title: 'Ella Baila Sola',
    artist: 'Eslabon Armado & Peso Pluma',
    album: 'Desvelado',
    duration: '3:14',
    seconds: 194,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2737279313a96cd84411175653b',
    views: '540M',
    genre: 'Regional Mexicano'
  },
  {
    videoId: 'dZ0fwJojhrs',
    title: 'un X100to',
    artist: 'Grupo Frontera ft. Bad Bunny',
    album: 'El Comienzo',
    duration: '3:15',
    seconds: 195,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27316fc1cb475b871c89f532a21',
    views: '800M',
    genre: 'Regional Mexicano'
  },
  {
    videoId: 'CocEMWJ79Hs',
    title: 'BZRP Music Sessions #53',
    artist: 'Bizarrap & Shakira',
    album: 'Single',
    duration: '3:33',
    seconds: 213,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273928e08ec073ac97e03eb158a',
    views: '710M',
    genre: 'Pop Urbano'
  },
  {
    videoId: 'A_g3lMcWVy0',
    title: 'Quevedo: BZRP Music Sessions #52 (Quédate)',
    artist: 'Bizarrap & Quevedo',
    album: 'Single',
    duration: '3:19',
    seconds: 199,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273b52d9a3b68f9a9c7b9148d8a',
    views: '650M',
    genre: 'Trap Latino'
  },
  {
    videoId: 'DiItGE3eAyQ',
    title: 'Con Calma',
    artist: 'Daddy Yankee ft. Snow',
    album: 'Con Calma',
    duration: '3:14',
    seconds: 194,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273ef4bcde4023c0cfcb12999e0',
    views: '2.1B',
    genre: 'Reggaetón'
  },
  {
    videoId: 'y83x7Wg2f1U',
    title: 'Pepas',
    artist: 'Farruko',
    album: 'La 167',
    duration: '3:17',
    seconds: 197,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273f3fb6151776ceeeec4653551',
    views: '900M',
    genre: 'Guaracha / Dance'
  },
  {
    videoId: 'wnJ6LuUFpMo',
    title: 'Mi Gente',
    artist: 'J Balvin, Willy William',
    album: 'Vibras',
    duration: '3:14',
    seconds: 194,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273cfb3fcb5c77e68fae6396f4a',
    views: '4.5B',
    genre: 'Reggaetón'
  },
  {
    videoId: '7zp1TbLFPp8',
    title: 'Danza Kuduro',
    artist: 'Don Omar ft. Lucenzo',
    album: 'Meet The Orphans',
    duration: '3:41',
    seconds: 221,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2738ff91d17d5494d4d6211eb90',
    views: '3.2B',
    genre: 'Reggaetón'
  },
  {
    videoId: 'nKjP_H74qU8',
    title: 'Tú Eres la Reina',
    artist: 'Diomedes Díaz',
    album: 'Título de Amor',
    duration: '4:12',
    seconds: 252,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27306bb2720d20d575775f0f35a',
    views: '110M',
    genre: 'Vallenato'
  },
  {
    videoId: 'f7mQf36f6xI',
    title: 'Materialista',
    artist: 'Silvestre Dangond ft. Nicky Jam',
    album: 'Sigo Invicto',
    duration: '3:40',
    seconds: 220,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273d2a7c413e1744cb89d3ea6ee',
    views: '95M',
    genre: 'Vallenato'
  },
  {
    videoId: '_5w4e7uM2w8',
    title: 'La Rebelión (No Le Pegue a la Negra)',
    artist: 'Joe Arroyo',
    album: 'Musa Original',
    duration: '4:45',
    seconds: 285,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273a0a3fead0790757790cf2c12',
    views: '150M',
    genre: 'Salsa'
  },
  {
    videoId: '-7K7wVeqq5U',
    title: 'De Música Ligera',
    artist: 'Soda Stereo',
    album: 'Canción Animal',
    duration: '3:32',
    seconds: 212,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273bbcf584a778b02c8c6c9a3d4',
    views: '290M',
    genre: 'Rock'
  },
  {
    videoId: 'kXyG4rL0dC4',
    title: 'Lamento Boliviano',
    artist: 'Los Enanitos Verdes',
    album: 'Big Yangu',
    duration: '3:43',
    seconds: 223,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273e913a890ea0dfb841a1a9e8f',
    views: '420M',
    genre: 'Rock'
  },
  {
    videoId: '4NRXx6U8ABQ',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    seconds: 200,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    views: '1.9B',
    genre: 'Pop'
  },
  {
    videoId: 'JGwWNGJdvx8',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    seconds: 233,
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    views: '6.1B',
    genre: 'Pop'
  }
];

export const FEATURED_PLAYLISTS = [
  {
    id: 'top-50-global',
    name: 'Top 50 Hits Mundiales',
    description: 'Los temas más reproducidos y descargados a nivel global.',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    tracksCount: 50,
  },
  {
    id: 'reggaeton-hits',
    name: 'Éxitos Callejeros 2024',
    description: 'El reggaetón y trap más sonado en discotecas y calles.',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60',
    tracksCount: 40,
  },
  {
    id: 'lofi-relax',
    name: 'Beats & Lo-Fi Session',
    description: 'Instrumentales relajantes para concentración, estudio y trabajo.',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=60',
    tracksCount: 60,
  },
  {
    id: 'rock-clasicos',
    name: 'Leyendas del Rock',
    description: 'Grandes himnos de rock clásico en español e inglés.',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60',
    tracksCount: 45,
  }
];

// Helper para extraer Video ID de cualquier enlace o string
export function extractVideoId(urlOrQuery) {
  if (!urlOrQuery) return null;
  const str = urlOrQuery.trim();

  // Caso: ya es un video ID simple de 11 caracteres
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // Caso: youtu.be/ID
  const youtuBeMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) return youtuBeMatch[1];

  // Caso: youtube.com/watch?v=ID
  const ytWatchMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (ytWatchMatch) return ytWatchMatch[1];

  // Caso: youtube.com/shorts/ID
  const shortsMatch = str.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Caso: youtube.com/embed/ID
  const embedMatch = str.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return null;
}

// Extraer ID de Playlist de YouTube
export function extractPlaylistId(url) {
  if (!url) return null;
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// Obtener canciones de una playlist
export async function getPlaylistTracks(playlistId) {
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://invidious.privacyredirect.com',
    'https://invidious.jing.rocks',
    'https://vid.priv.au'
  ];

  for (const base of instances) {
    try {
      const res = await fetch(`${base}/api/v1/playlists/${playlistId}`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (data && data.videos && Array.isArray(data.videos)) {
        return {
          title: data.title || 'Lista de Reproducción',
          author: data.author || 'YouTube Playlist',
          itemCount: data.videoCount || data.videos.length,
          tracks: data.videos.slice(0, 30).map(v => ({
            videoId: v.videoId,
            title: v.title,
            artist: v.author || data.author || 'Artista',
            duration: v.lengthSeconds ? `${Math.floor(v.lengthSeconds / 60)}:${String(v.lengthSeconds % 60).padStart(2, '0')}` : '3:30',
            seconds: v.lengthSeconds || 210,
            thumbnail: `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80`
          }))
        };
      }
    } catch (_) {
      continue;
    }
  }
  return null;
}
export async function getTrackDetailsById(videoId) {
  // 1. Intento con instancias Invidious / Piped para obtener duración y metadatos exactos
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://vid.priv.au',
    'https://invidious.privacyredirect.com',
    'https://invidious.jing.rocks'
  ];

  for (const base of instances) {
    try {
      const url = `${base}/api/v1/videos/${videoId}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) continue;
      const v = await res.json();
      if (!v || !v.title) continue;

      const sec = v.lengthSeconds || (v.duration ? parseInt(v.duration, 10) : 0);
      const mins = Math.floor(sec / 60);
      const remaining = String(sec % 60).padStart(2, '0');
      const durationFormatted = sec > 0 ? `${mins}:${remaining}` : 'YouTube';

      return {
        videoId: v.videoId || videoId,
        title: v.title,
        artist: v.author || 'Canal Oficial',
        album: 'YouTube Music',
        duration: durationFormatted,
        seconds: sec || 210,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        views: v.viewCount ? (v.viewCount > 1e6 ? (v.viewCount / 1e6).toFixed(1) + 'M' : String(v.viewCount)) : 'Oficial',
      };
    } catch (_) {
      continue;
    }
  }

  // 2. Intento con noembed.com
  try {
    const noembedRes = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`, { signal: AbortSignal.timeout(3500) });
    if (noembedRes.ok) {
      const data = await noembedRes.json();
      if (data && data.title && !data.error) {
        return {
          videoId: videoId,
          title: data.title,
          artist: data.author_name || 'Artista Oficial',
          album: 'YouTube Music',
          duration: 'YouTube Video',
          seconds: 210,
          thumbnail: data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          views: 'HD'
        };
      }
    }
  } catch (_) {}

  // Fallback
  return {
    videoId: videoId,
    title: 'Canción de YouTube',
    artist: 'Canal Oficial',
    album: 'YouTube Music',
    duration: 'YouTube Video',
    seconds: 210,
    thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    views: 'HD'
  };
}

// ── Búsqueda en Vivo en YouTube (100% Real Time) ─────────────────────────────
export async function searchMusicOnline(query) {
  if (!query || query.trim() === '') return [];

  const cleanQuery = query.trim();

  // 1. Verificar si el usuario pegó una URL directa de YouTube
  const extractedId = extractVideoId(cleanQuery);
  if (extractedId) {
    const directTrack = await getTrackDetailsById(extractedId);
    return directTrack ? [directTrack] : [];
  }

  // 2. Intentar primero con el endpoint serverless /api/search
  try {
    const apiRes = await fetch(`/api/search?q=${encodeURIComponent(cleanQuery)}`, {
      signal: AbortSignal.timeout(6000)
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.success && Array.isArray(data.results) && data.results.length > 0) {
        return data.results;
      }
    }
  } catch (_) {}

  // 3. Fallback directo a instancias de YouTube públicas (Invidious / Piped)
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://vid.priv.au',
    'https://invidious.privacyredirect.com',
    'https://invidious.jing.rocks'
  ];

  for (const base of instances) {
    try {
      const url = `${base}/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video&sort_by=relevance`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) continue;

      return data.slice(0, 24).map((v) => {
        const sec = v.lengthSeconds || 180;
        const mins = Math.floor(sec / 60);
        const remaining = String(sec % 60).padStart(2, '0');

        let viewsFormatted = 'YouTube';
        if (v.viewCount) {
          viewsFormatted = v.viewCount > 1e9 
            ? (v.viewCount / 1e9).toFixed(1) + 'B' 
            : v.viewCount > 1e6 
              ? (v.viewCount / 1e6).toFixed(0) + 'M' 
              : (v.viewCount / 1e3).toFixed(0) + 'K';
        }

        const videoId = v.videoId;
        return {
          videoId: videoId,
          title: v.title || cleanQuery,
          artist: v.author || 'Canal Oficial',
          album: 'YouTube Music',
          duration: `${mins}:${remaining}`,
          seconds: sec,
          thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          views: viewsFormatted,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
        };
      });
    } catch (_) {
      continue;
    }
  }

  return [];
}

// ── Storage Local (Liked Songs, Custom Playlists, Descargas) ───────────────────
// Helper para validar si un texto o enlace es una URL de música/video válida
export function isValidMusicUrl(urlOrQuery) {
  if (!urlOrQuery || typeof urlOrQuery !== 'string') return false;
  const str = urlOrQuery.trim();
  const videoId = extractVideoId(str);
  return videoId !== null;
}

export const MusicStorage = {
  getLikedTracks() {
    try {
      return JSON.parse(localStorage.getItem('redstream_liked_tracks') || '[]');
    } catch {
      return [];
    }
  },

  toggleLikeTrack(track) {
    const current = this.getLikedTracks();
    const exists = current.some(t => t.videoId === track.videoId);
    let updated;
    if (exists) {
      updated = current.filter(t => t.videoId !== track.videoId);
    } else {
      updated = [track, ...current];
    }
    localStorage.setItem('redstream_liked_tracks', JSON.stringify(updated));
    return { updated, isLiked: !exists };
  },

  getCustomPlaylists() {
    try {
      return JSON.parse(localStorage.getItem('redstream_custom_playlists') || '[]');
    } catch {
      return [];
    }
  },

  createPlaylist(name, description = '') {
    const playlists = this.getCustomPlaylists();
    const newPl = {
      id: 'pl_' + Date.now(),
      name,
      description,
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60',
      tracks: [],
      createdAt: new Date().toISOString()
    };
    const updated = [newPl, ...playlists];
    localStorage.setItem('redstream_custom_playlists', JSON.stringify(updated));
    return updated;
  },

  getDownloads() {
    try {
      const items = JSON.parse(localStorage.getItem('redstream_downloads') || '[]');
      // Filtrar descargas inválidas o mocks viejos
      return items.filter(t => t && t.videoId && !t.videoId.startsWith('custom_') && t.artist !== 'Audio Enlace Web');
    } catch {
      return [];
    }
  },

  recordDownload(track, format = 'MP3 (320 kbps)') {
    if (!track || !track.videoId || track.videoId.startsWith('custom_')) return this.getDownloads();
    const current = this.getDownloads();
    const newEntry = {
      ...track,
      downloadFormat: format,
      downloadedAt: new Date().toLocaleString()
    };
    const updated = [newEntry, ...current.filter(t => t.videoId !== track.videoId)];
    localStorage.setItem('redstream_downloads', JSON.stringify(updated));
    return updated;
  },

  removeDownload(videoId) {
    const current = this.getDownloads();
    const updated = current.filter(t => t.videoId !== videoId);
    localStorage.setItem('redstream_downloads', JSON.stringify(updated));
    return updated;
  }
};
