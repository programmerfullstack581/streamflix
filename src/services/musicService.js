// Servicio central de música y catálogo estilo Spotify

export const GENRES_CATEGORIES = [
  { id: 'reggaeton', name: 'Reggaetón & Urbano', color: 'from-amber-500 to-red-600', query: 'reggaeton 2024 hits', icon: '🔥' },
  { id: 'trap', name: 'Trap Latino', color: 'from-purple-600 to-indigo-900', query: 'trap latino lo mas nuevo', icon: '😈' },
  { id: 'pop', name: 'Pop Éxitos', color: 'from-pink-500 to-rose-600', query: 'pop en espanol exitos', icon: '✨' },
  { id: 'rock', name: 'Rock & Alternativo', color: 'from-red-700 to-zinc-900', query: 'rock en espanol clasicos', icon: '🎸' },
  { id: 'salsa', name: 'Salsa & Tropical', color: 'from-yellow-500 to-orange-600', query: 'salsa brava clasicos', icon: '🎺' },
  { id: 'lofi', name: 'Lo-Fi & Chill Beats', color: 'from-teal-600 to-blue-900', query: 'lofi hip hop chill beats to relax', icon: '☕' },
  { id: 'electronic', name: 'Electrónica & EDM', color: 'from-blue-500 to-cyan-400', query: 'edm electronic party hits', icon: '⚡' },
  { id: 'cumbia', name: 'Cumbia & Fiesta', color: 'from-emerald-500 to-green-700', query: 'cumbia villera fiesta exitos', icon: '🪗' },
  { id: 'regional', name: 'Regional & Corridos', color: 'from-stone-600 to-amber-800', query: 'corridos tumbados peso pluma', icon: '🤠' },
  { id: 'hiphop', name: 'Hip-Hop Global', color: 'from-orange-600 to-purple-800', query: 'hip hop hits 2024', icon: '🎤' },
  { id: 'romantica', name: 'Baladas & Románticas', color: 'from-pink-600 to-red-900', query: 'baladas romanticas en espanol', icon: '❤️' },
  { id: 'vallenato', name: 'Vallenato Sentimiento', color: 'from-amber-600 to-yellow-700', query: 'vallenatos clasicos colombia', icon: '🪗' },
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
    thumbnail: 'https://i.ytimg.com/vi/CHuq9r4HJOE/mqdefault.jpg',
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
    thumbnail: 'https://i.ytimg.com/vi/T3Auu0f-Z6M/mqdefault.jpg',
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
    thumbnail: 'https://i.ytimg.com/vi/yU_E3O9q2e0/mqdefault.jpg',
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
    thumbnail: 'https://i.ytimg.com/vi/xqeR5F4mRaE/mqdefault.jpg',
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
    thumbnail: 'https://i.ytimg.com/vi/739Cvd4fJ5Q/mqdefault.jpg',
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
    thumbnail: 'https://i.ytimg.com/vi/K4DyBUG242c/mqdefault.jpg',
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
    name: 'Top 50 Global',
    description: 'Las canciones más escuchadas del momento en todo el mundo.',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    tracksCount: 50,
    gradient: 'from-emerald-700 to-black'
  },
  {
    id: 'reggaeton-hits',
    name: 'Éxitos Reggaetón 2024',
    description: 'El mejor perreo y los éxitos urbanos que dominan la calle.',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60',
    tracksCount: 40,
    gradient: 'from-amber-600 to-black'
  },
  {
    id: 'lofi-relax',
    name: 'Lo-Fi Beats & Relax',
    description: 'Música instrumental y tranquila para estudiar, trabajar o descansar.',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=60',
    tracksCount: 60,
    gradient: 'from-indigo-800 to-black'
  },
  {
    id: 'rock-clasicos',
    name: 'Rock Clásicos en Español',
    description: 'Los himnos legendarios de Soda Stereo, Héroes del Silencio, Enanitos Verdes y más.',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60',
    tracksCount: 45,
    gradient: 'from-red-900 to-black'
  }
];

// ── Búsqueda en API Invidious / Piped con fallback ─────────────────────────────
export async function searchMusicOnline(query) {
  if (!query || query.trim() === '') return [];

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
          album: 'Single / Official',
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
      return JSON.parse(localStorage.getItem('streamify_liked_tracks') || '[]');
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
    localStorage.setItem('streamify_liked_tracks', JSON.stringify(updated));
    return { updated, isLiked: !exists };
  },

  getCustomPlaylists() {
    try {
      return JSON.parse(localStorage.getItem('streamify_custom_playlists') || '[]');
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
    localStorage.setItem('streamify_custom_playlists', JSON.stringify(updated));
    return updated;
  },

  addTrackToPlaylist(playlistId, track) {
    const playlists = this.getCustomPlaylists();
    const updated = playlists.map(pl => {
      if (pl.id === playlistId) {
        const exists = pl.tracks.some(t => t.videoId === track.videoId);
        if (!exists) {
          return { ...pl, tracks: [...pl.tracks, track] };
        }
      }
      return pl;
    });
    localStorage.setItem('streamify_custom_playlists', JSON.stringify(updated));
    return updated;
  },

  getDownloads() {
    try {
      return JSON.parse(localStorage.getItem('streamify_downloads') || '[]');
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
    localStorage.setItem('streamify_downloads', JSON.stringify(updated));
    return updated;
  },

  removeDownload(videoId) {
    const current = this.getDownloads();
    const updated = current.filter(t => t.videoId !== videoId);
    localStorage.setItem('streamify_downloads', JSON.stringify(updated));
    return updated;
  }
};
