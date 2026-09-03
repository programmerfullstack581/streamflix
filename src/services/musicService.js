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

export const CURATED_TOP_HITS = [
  {
    videoId: 'CHuq9r4HJOE',
    title: 'Tití Me Preguntó',
    artist: 'Bad Bunny',
    album: 'Un Verano Sin Ti',
    duration: '4:04',
    seconds: 244,
    thumbnail: 'https://i.ytimg.com/vi/CHuq9r4HJOE/hqdefault.jpg',
    views: '890M',
    genre: 'Reggaetón'
  },
  {
    videoId: 'T3Auu0f-Z6M',
    title: 'Hawái',
    artist: 'Maluma',
    album: 'Papi Juancho',
    duration: '3:05',
    seconds: 185,
    thumbnail: 'https://i.ytimg.com/vi/T3Auu0f-Z6M/hqdefault.jpg',
    views: '1.2B',
    genre: 'Pop Urbano'
  },
  {
    videoId: 'yU_E3O9q2e0',
    title: 'LUNA',
    artist: 'Feid ft. ATL Jacob',
    album: 'FERXXOCALIPSIS',
    duration: '3:16',
    seconds: 196,
    thumbnail: 'https://i.ytimg.com/vi/yU_E3O9q2e0/hqdefault.jpg',
    views: '350M',
    genre: 'Reggaetón'
  },
  {
    videoId: 'xqeR5F4mRaE',
    title: 'Mi Gente',
    artist: 'J Balvin, Willy William',
    album: 'Vibras',
    duration: '3:14',
    seconds: 194,
    thumbnail: 'https://i.ytimg.com/vi/xqeR5F4mRaE/hqdefault.jpg',
    views: '4.5B',
    genre: 'Urbano'
  },
  {
    videoId: '739Cvd4fJ5Q',
    title: 'Qlona',
    artist: 'Karol G ft. Peso Pluma',
    album: 'MAÑANA SERÁ BONITO',
    duration: '2:52',
    seconds: 172,
    thumbnail: 'https://i.ytimg.com/vi/739Cvd4fJ5Q/hqdefault.jpg',
    views: '480M',
    genre: 'Reggaetón'
  },
  {
    videoId: 'K4DyBUG242c',
    title: 'Con Calma',
    artist: 'Daddy Yankee ft. Snow',
    album: 'Con Calma',
    duration: '3:14',
    seconds: 194,
    thumbnail: 'https://i.ytimg.com/vi/K4DyBUG242c/hqdefault.jpg',
    views: '2.1B',
    genre: 'Reggaetón'
  },
  {
    videoId: '60ItHLz5WEA',
    title: 'Pepas',
    artist: 'Farruko',
    album: 'La 167',
    duration: '3:17',
    seconds: 197,
    thumbnail: 'https://i.ytimg.com/vi/60ItHLz5WEA/mqdefault.jpg',
    views: '900M',
    genre: 'Guaracha / Dance'
  },
  {
    videoId: 'mXnRNNiqBrI',
    title: 'Felices los 4',
    artist: 'Maluma',
    album: 'F.A.M.E.',
    duration: '3:25',
    seconds: 205,
    thumbnail: 'https://i.ytimg.com/vi/mXnRNNiqBrI/mqdefault.jpg',
    views: '1.8B',
    genre: 'Pop Urbano'
  },
  {
    videoId: 'kTJczUoc26U',
    title: 'Danza Kuduro',
    artist: 'Don Omar ft. Lucenzo',
    album: 'Meet The Orphans',
    duration: '3:41',
    seconds: 221,
    thumbnail: 'https://i.ytimg.com/vi/kTJczUoc26U/mqdefault.jpg',
    views: '3.2B',
    genre: 'Mambo / Reggaetón'
  },
  {
    videoId: '450p7goxZqg',
    title: 'Lean On',
    artist: 'Major Lazer ft. MØ & DJ Snake',
    album: 'Peace Is the Mission',
    duration: '2:56',
    seconds: 176,
    thumbnail: 'https://i.ytimg.com/vi/450p7goxZqg/mqdefault.jpg',
    views: '3.2B',
    genre: 'Electronic'
  },
  {
    videoId: 'JGwWNGJdvx8',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    seconds: 233,
    thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/mqdefault.jpg',
    views: '6.1B',
    genre: 'Pop'
  },
  {
    videoId: 'RgKAFK5djSk',
    title: 'See You Again',
    artist: 'Wiz Khalifa ft. Charlie Puth',
    album: 'Furious 7',
    duration: '3:56',
    seconds: 236,
    thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/mqdefault.jpg',
    views: '5.9B',
    genre: 'Hip Hop / Pop'
  },
  {
    videoId: '4NRXx6U8ABQ',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    seconds: 200,
    thumbnail: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/mqdefault.jpg',
    views: '1.1B',
    genre: 'Synthwave / Pop'
  },
  {
    videoId: 'JFcgOboQZ08',
    title: 'lofi hip hop radio - beats to relax/study to',
    artist: 'Lofi Girl',
    album: 'Chill Radio',
    duration: 'LIVE',
    seconds: 300,
    thumbnail: 'https://i.ytimg.com/vi/JFcgOboQZ08/mqdefault.jpg',
    views: '50M',
    genre: 'Lo-Fi Chill'
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

// Obtener detalles de una canción por su Video ID
export async function getTrackDetailsById(videoId) {
  // 1. Intento con noembed.com (CORS libre, ultra rápido y confiable)
  try {
    const noembedRes = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`, { signal: AbortSignal.timeout(3500) });
    if (noembedRes.ok) {
      const data = await noembedRes.json();
      if (data && data.title && !data.error) {
        return {
          videoId: videoId,
          title: data.title,
          artist: data.author_name || 'Artista Oficial',
          album: 'MP3 HD 320kbps',
          duration: '3:30',
          seconds: 210,
          thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          views: 'HD'
        };
      }
    }
  } catch (_) {}

  // 2. Intento con instancias Invidious
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://invidious.privacyredirect.com',
    'https://invidious.jing.rocks',
    'https://vid.priv.au'
  ];

  for (const base of instances) {
    try {
      const url = `${base}/api/v1/videos/${videoId}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) continue;
      const v = await res.json();
      if (!v || !v.title) continue;

      const sec = v.lengthSeconds || 180;
      const mins = Math.floor(sec / 60);
      const remaining = String(sec % 60).padStart(2, '0');

      return {
        videoId: v.videoId || videoId,
        title: v.title,
        artist: v.author || 'Artista Oficial',
        album: 'Audio / Official',
        duration: `${mins}:${remaining}`,
        seconds: sec,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        views: v.viewCount ? (v.viewCount > 1e6 ? (v.viewCount / 1e6).toFixed(1) + 'M' : String(v.viewCount)) : 'Oficial',
      };
    } catch (_) {
      continue;
    }
  }

  // Fallback
  return {
    videoId: videoId,
    title: 'Canción Enlace Directo',
    artist: 'Audio Oficial',
    album: 'MP3 HD',
    duration: '3:30',
    seconds: 210,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    views: 'HD'
  };
}

// ── Búsqueda en API Invidious / Piped con fallback ─────────────────────────────
export async function searchMusicOnline(query) {
  if (!query || query.trim() === '') return [];

  // Verificar si el usuario pegó una URL directa
  const extractedId = extractVideoId(query);
  if (extractedId) {
    const directTrack = await getTrackDetailsById(extractedId);
    return [directTrack];
  }

  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://invidious.privacyredirect.com',
    'https://invidious.jing.rocks',
    'https://vid.priv.au'
  ];

  for (const base of instances) {
    try {
      const url = `${base}/api/v1/search?q=${encodeURIComponent(query + ' audio')}&type=video&sort_by=relevance`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) continue;

      return data.slice(0, 30).map(v => {
        const sec = v.lengthSeconds || 180;
        const mins = Math.floor(sec / 60);
        const remaining = String(sec % 60).padStart(2, '0');
        
        let viewsFormatted = '';
        if (v.viewCount) {
          viewsFormatted = v.viewCount > 1e9 
            ? (v.viewCount / 1e9).toFixed(1) + 'B' 
            : v.viewCount > 1e6 
              ? (v.viewCount / 1e6).toFixed(0) + 'M' 
              : (v.viewCount / 1e3).toFixed(0) + 'K';
        }

        return {
          videoId: v.videoId,
          title: v.title,
          artist: v.author || 'Artista',
          album: 'Audio / Official',
          duration: `${mins}:${remaining}`,
          seconds: sec,
          thumbnail: `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`,
          views: viewsFormatted,
        };
      });
    } catch (_) {
      continue;
    }
  }

  // Fallback a filtrado de canciones locales si falla la red
  const q = query.toLowerCase();
  const localMatched = CURATED_TOP_HITS.filter(
    t => t.title.toLowerCase().includes(q) || 
         t.artist.toLowerCase().includes(q) || 
         (t.genre && t.genre.toLowerCase().includes(q))
  );

  return localMatched.length > 0 ? localMatched : CURATED_TOP_HITS.slice(0, 8);
}

// ── Storage Local (Liked Songs, Custom Playlists, Descargas) ───────────────────
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
      return JSON.parse(localStorage.getItem('redstream_downloads') || '[]');
    } catch {
      return [];
    }
  },

  recordDownload(track, format = 'MP3 (320 kbps)') {
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
