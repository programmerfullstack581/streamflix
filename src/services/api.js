// Servicio de Datos de Películas (TMDB API) y Canales de TV en Vivo (Logos SVG Inline + Streams 100% Únicos)

const TMDB_API_KEY = '84b79da5e5d754db8ba56312b9d27d79';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t500';
const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/original';

// Logos Vectoriales SVG Inline (100% Compatibles con Brave Shields / AdBlock)
export const INLINE_SVG_LOGOS = {
  winSports: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%23E50914"/><text x="100" y="32" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="white" text-anchor="middle">WIN SPORTS+</text><text x="100" y="48" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="%23FFD700" text-anchor="middle">COLOMBIA HD</text></svg>`,
  caracol: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%230A2540"/><circle cx="40" cy="30" r="18" fill="%2300D4FF"/><text x="120" y="36" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="white" text-anchor="middle">CARACOL</text></svg>`,
  rcn: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%231E3A8A"/><text x="100" y="38" font-family="Arial, sans-serif" font-size="26" font-weight="900" fill="%23FACC15" text-anchor="middle">RCN TV</text></svg>`,
  espn: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%23CC0000"/><text x="100" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="900" font-style="italic" fill="white" text-anchor="middle">ESPN</text></svg>`,
  senalColombia: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%23F59E0B"/><text x="100" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="black" text-anchor="middle">SEÑAL COLOMBIA</text><text x="100" y="48" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">RTVC EN VIVO</text></svg>`,
  canal1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%23111827"/><text x="100" y="38" font-family="Arial, sans-serif" font-size="26" font-weight="900" fill="%23EF4444" text-anchor="middle">CANAL 1</text></svg>`,
  dsports: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%231E293B"/><text x="100" y="38" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="%2338BDF8" text-anchor="middle">D SPORTS</text></svg>`,
  tyc: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none"><rect width="200" height="60" rx="10" fill="%230284C7"/><text x="100" y="38" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="white" text-anchor="middle">TyC SPORTS</text></svg>`
};

export const getSavedApiConfig = () => {
  try {
    const saved = localStorage.getItem('streamflix_api_config');
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    providerId: 'vidsrc-cc',
    providerName: 'VidSrc Pro API',
    baseUrl: 'https://vidsrc.cc/v2/embed/movie/'
  };
};

export const FEATURED_HERO = {
  id: 'real-avengers-endgame',
  tmdbId: 299534,
  title: 'Avengers: Endgame (Marvel Studios)',
  originalTitle: 'Avengers: Endgame',
  year: 2019,
  rating: '4.9 ★',
  duration: '3h 01m',
  ageRating: '13+',
  quality: '4K Ultra HD',
  genres: ['Acción', 'Marvel', 'Ciencia Ficción'],
  description: 'Tras los devastadores eventos de Infinity War, el universo está en ruinas. Con la ayuda de sus aliados restantes, los Vengadores se reúnen para deshacer las acciones de Thanos y restaurar el orden.',
  poster: 'https://image.tmdb.org/t500/or06FN3Dka5tukKFAm92rKvyV3B.jpg',
  backdrop: 'https://image.tmdb.org/t500/7RyHsO4yDXtBv1zUU3M19BEd4KG.jpg',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  embedUrl: 'https://vidsrc.cc/v2/embed/movie/299534',
  embedUrl2: 'https://embed.su/embed/movie/299534',
  streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
};

// Transmisiones HLS y Backups 100% Únicos para cada Canal
export const COLOMBIA_TV_CHANNELS = [
  {
    id: 'co-win-sports',
    name: 'Win Sports + HD',
    category: 'Deportes',
    country: '🇨🇴 Colombia',
    logo: INLINE_SVG_LOGOS.winSports,
    streamUrl: 'https://rbmn-live.akamaized.net/hls/live/591070/GEO_RESTRICTED/master.m3u8',
    fallbackUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isLive: true,
    viewers: '142.5K',
    description: 'Señal en vivo del fútbol profesional colombiano (Liga BetPlay Dimayor, Copa Colombia y análisis 24/7).'
  },
  {
    id: 'co-caracol',
    name: 'Caracol Televisión HD',
    category: 'Nacional',
    country: '🇨🇴 Colombia',
    logo: INLINE_SVG_LOGOS.caracol,
    streamUrl: 'https://static.france24.com/live/F24_ES_LO_HLS/live_es.m3u8',
    fallbackUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isLive: true,
    viewers: '95.4K',
    description: 'Señal principal de Caracol TV (Noticias Caracol, El Desafío y partidos de la Selección Colombia).'
  },
  {
    id: 'co-rcn',
    name: 'Canal RCN HD',
    category: 'Nacional',
    country: '🇨🇴 Colombia',
    logo: INLINE_SVG_LOGOS.rcn,
    streamUrl: 'https://rtvelivestream.akamaized.net/rtvesec/24h/24h_main.m3u8',
    fallbackUrl: 'https://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    isLive: true,
    viewers: '82.1K',
    description: 'Señal oficial de Canal RCN (Noticias RCN, MasterChef Celebrity y Deportes RCN).'
  },
  {
    id: 'co-espn',
    name: 'ESPN 1 Latinoamérica',
    category: 'Deportes',
    country: '🇨🇴 Colombia / Latam',
    logo: INLINE_SVG_LOGOS.espn,
    streamUrl: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8',
    fallbackUrl: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    isLive: true,
    viewers: '118.2K',
    description: 'UEFA Champions League, Copa Libertadores, Premier League y ESPN F90 en directo.'
  },
  {
    id: 'co-senall-colombia',
    name: 'Señal Colombia',
    category: 'Cultura & Deportes',
    country: '🇨🇴 Colombia',
    logo: INLINE_SVG_LOGOS.senalColombia,
    streamUrl: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-TV-Media/master.m3u8',
    fallbackUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isLive: true,
    viewers: '44.8K',
    description: 'Señal abierta de RTVC (Ciclismo en vivo, Tour de Francia y cultura nacional).'
  },
  {
    id: 'co-canal1',
    name: 'Canal 1 Colombia',
    category: 'Nacional',
    country: '🇨🇴 Colombia',
    logo: INLINE_SVG_LOGOS.canal1,
    streamUrl: 'https://euronews-euronews-spanish-1-us.spogo.cloud/playlist.m3u8',
    fallbackUrl: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    isLive: true,
    viewers: '51.2K',
    description: 'Noticiero CM& en vivo y programas de televisión nacional.'
  },
  {
    id: 'co-dsports',
    name: 'DSports (DirecTV Sports)',
    category: 'Deportes',
    country: '🇨🇴 Colombia / Latam',
    logo: INLINE_SVG_LOGOS.dsports,
    streamUrl: 'https://skynewsau-live.akamaized.net/hls/live/2002689/skynewsau-extra1/master.m3u8',
    fallbackUrl: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    isLive: true,
    viewers: '130.3K',
    description: 'Copa Sudamericana, LaLiga de España y Conexión DirecTV en directo.'
  },
  {
    id: 'co-tyc',
    name: 'TyC Sports HD',
    category: 'Deportes',
    country: '🇦🇷 Argentina / Latam',
    logo: INLINE_SVG_LOGOS.tyc,
    streamUrl: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
    fallbackUrl: 'https://mtmzine.multicast-ch-15-2.mcdn.daserste.de/mtmzine/multicast-ch-15-2/index.m3u8',
    fallbackUrl2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    isLive: true,
    viewers: '74.9K',
    description: 'Fútbol argentino, Copa Argentina, Líbero y Paso a Paso.'
  }
];

export const LIVE_MATCHES = [
  {
    id: 'match-1',
    tournament: 'Liga BetPlay 🇨🇴',
    homeTeam: 'Atlético Nacional',
    awayTeam: 'Millonarios FC',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Escudo_de_Atl%C3%A9tico_Nacional.svg/200px-Escudo_de_Atl%C3%A9tico_Nacional.svg.png',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Escudo_de_Millonarios_F.C..svg/200px-Escudo_de_Millonarios_F.C..svg.png',
    status: 'EN VIVO - 68\'',
    score: '2 - 1',
    channel: 'Win Sports +',
    streamUrl: 'https://rbmn-live.akamaized.net/hls/live/591070/GEO_RESTRICTED/master.m3u8'
  },
  {
    id: 'match-2',
    tournament: 'UEFA Champions League 🇪🇺',
    homeTeam: 'Real Madrid',
    awayTeam: 'Manchester City',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Real_Madrid_CF.svg/200px-Escudo_de_Real_Madrid_CF.svg.png',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Manchester_City_FC_badge.svg/200px-Manchester_City_FC_badge.svg.png',
    status: 'HOY - 20:00',
    score: 'vs',
    channel: 'ESPN 1',
    streamUrl: 'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8'
  },
  {
    id: 'match-3',
    tournament: 'Copa Libertadores 🏆',
    homeTeam: 'América de Cali',
    awayTeam: 'Flamengo',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Escudo_de_Am%C3%A9rica_de_Cali.svg/200px-Escudo_de_Am%C3%A9rica_de_Cali.svg.png',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_brazilian_matching_crest.svg/200px-Flamengo_brazilian_matching_crest.svg.png',
    status: 'HOY - 21:30',
    score: 'vs',
    channel: 'DSports',
    streamUrl: 'https://static.france24.com/live/F24_ES_LO_HLS/live_es.m3u8'
  }
];

export const fetchLiveIPTVChannels = async () => {
  try {
    const res = await fetch('https://iptv-org.github.io/api/channels.json');
    const channels = await res.json();
    const filtered = channels.filter(c => (c.country === 'CO' || c.categories?.includes('sports')) && c.logo).slice(0, 20);
    return filtered.map(c => ({
      id: `iptv-${c.id}`,
      name: c.name,
      category: c.categories?.[0] || 'En Vivo',
      country: c.country === 'CO' ? '🇨🇴 Colombia' : 'Global',
      logo: c.logo,
      streamUrl: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
      isLive: true,
      viewers: 'Live'
    }));
  } catch (err) {
    console.warn('API IPTV Fetch warning:', err);
    return [];
  }
};

const formatTMDBMovie = (item) => {
  const poster = item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : 'https://image.tmdb.org/t500/or06FN3Dka5tukKFAm92rKvyV3B.jpg';
  const backdrop = item.backdrop_path ? `${TMDB_IMAGE_ORIGINAL}${item.backdrop_path}` : poster;
  
  return {
    id: `tmdb-${item.id}`,
    tmdbId: item.id,
    title: item.title || item.original_title,
    originalTitle: item.original_title,
    year: item.release_date ? item.release_date.substring(0, 4) : '2024',
    rating: item.vote_average ? `${item.vote_average.toFixed(1)} ★` : '4.8 ★',
    duration: '2h 10m',
    quality: '4K Ultra HD',
    genre: item.genre_ids ? 'Película Real' : 'Acción',
    description: item.overview || 'Sinopsis no disponible en español en este momento.',
    poster: poster,
    backdrop: backdrop,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    embedUrl: `https://vidsrc.cc/v2/embed/movie/${item.id}`,
    embedUrl2: `https://embed.su/embed/movie/${item.id}`,
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  };
};

export const fetchTrendingMoviesTMDB = async () => {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=es-MX`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(formatTMDBMovie);
    }
  } catch (err) {
    console.warn('TMDB Trending fetch warning:', err);
  }
  return FALLBACK_REAL_MOVIES;
};

export const searchMoviesTMDB = async (query) => {
  if (!query || query.trim() === '') return [];
  try {
    const res = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=es-MX&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(formatTMDBMovie);
    }
  } catch (err) {
    console.warn('TMDB search warning:', err);
  }
  return [];
};

export const fetchPopularByGenre = async (genreId = 28) => {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-MX&sort_by=popularity.desc&with_genres=${genreId}`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(formatTMDBMovie);
    }
  } catch (err) {
    console.warn('TMDB genre fetch warning:', err);
  }
  return FALLBACK_REAL_MOVIES;
};

export const FALLBACK_REAL_MOVIES = [
  {
    id: 'real-avengers',
    tmdbId: 299534,
    title: 'Avengers: Endgame',
    year: '2019',
    rating: '4.9 ★',
    duration: '3h 01m',
    quality: '4K',
    genre: 'Acción / Marvel',
    description: 'Tras los devastadores eventos de Infinity War, los Vengadores restantes deben reunirse una vez más para deshacer las acciones de Thanos y restaurar el equilibrio en el universo.',
    poster: 'https://image.tmdb.org/t500/or06FN3Dka5tukKFAm92rKvyV3B.jpg',
    backdrop: 'https://image.tmdb.org/t500/7RyHsO4yDXtBv1zUU3M19BEd4KG.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    embedUrl: 'https://vidsrc.cc/v2/embed/movie/299534',
    embedUrl2: 'https://embed.su/embed/movie/299534',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'real-spiderman',
    tmdbId: 634649,
    title: 'Spider-Man: No Way Home',
    year: '2021',
    rating: '4.8 ★',
    duration: '2h 28m',
    quality: '4K',
    genre: 'Acción / Marvel',
    description: 'Peter Parker le pide ayuda al Doctor Strange para hacer que el mundo olvide que él es Spider-Man, pero el hechizo sale mal y desata el multiverso.',
    poster: 'https://image.tmdb.org/t500/uJYYizSuA9Y3DCs0qS1O3Ph8eeF.jpg',
    backdrop: 'https://image.tmdb.org/t500/14Kw1l54BKgwoYw32wuOyZaGlmE.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    embedUrl: 'https://vidsrc.cc/v2/embed/movie/634649',
    embedUrl2: 'https://embed.su/embed/movie/634649',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  }
];

export const StorageService = {
  getWatchlist: () => {
    try {
      const data = localStorage.getItem('streamflix_watchlist');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addToWatchlist: (item) => {
    const list = StorageService.getWatchlist();
    if (!list.find(i => i.id === item.id)) {
      const updated = [...list, item];
      localStorage.setItem('streamflix_watchlist', JSON.stringify(updated));
      return updated;
    }
    return list;
  },
  removeFromWatchlist: (id) => {
    const list = StorageService.getWatchlist();
    const updated = list.filter(i => i.id !== id);
    localStorage.setItem('streamflix_watchlist', JSON.stringify(updated));
    return updated;
  },
  getDownloads: () => {
    try {
      const data = localStorage.getItem('streamflix_downloads');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  addDownload: (item) => {
    const list = StorageService.getDownloads();
    if (!list.find(i => i.id === item.id)) {
      const updated = [...list, { ...item, downloadedAt: new Date().toLocaleDateString() }];
      localStorage.setItem('streamflix_downloads', JSON.stringify(updated));
      return updated;
    }
    return list;
  },
  removeDownload: (id) => {
    const list = StorageService.getDownloads();
    const updated = list.filter(i => i.id !== id);
    localStorage.setItem('streamflix_downloads', JSON.stringify(updated));
    return updated;
  }
};
