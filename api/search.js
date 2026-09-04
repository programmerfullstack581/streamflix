// Vercel Serverless Function — Búsqueda en Vivo de YouTube
// Ruta: /api/search?q=nombre_de_cancion

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const query = req.query.q;
  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Missing search query (q)' });
  }

  const cleanQuery = query.trim();

  // Instancias Invidious & Piped para búsqueda directa en YouTube
  const searchEndpoints = [
    `https://inv.nadeko.net/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video&sort_by=relevance`,
    `https://invidious.nerdvpn.de/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video&sort_by=relevance`,
    `https://vid.priv.au/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video&sort_by=relevance`,
    `https://invidious.privacyredirect.com/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video&sort_by=relevance`,
    `https://invidious.jing.rocks/api/v1/search?q=${encodeURIComponent(cleanQuery)}&type=video&sort_by=relevance`
  ];

  for (const url of searchEndpoints) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(4500)
      });

      if (!response.ok) continue;
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const results = data.slice(0, 24).map((v) => {
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
            title: v.title || 'Canción de YouTube',
            artist: v.author || 'Canal Oficial',
            duration: `${mins}:${remaining}`,
            seconds: sec,
            thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            views: viewsFormatted,
            youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
          };
        });

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        return res.status(200).json({ success: true, results });
      }
    } catch (_) {
      continue;
    }
  }

  // Si fallan las instancias, fallback scraping liviano de YouTube
  try {
    const ytScrapeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}`;
    const ytRes = await fetch(ytScrapeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(4000)
    });

    if (ytRes.ok) {
      const html = await ytRes.text();
      const videoIds = [...new Set([...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]))].slice(0, 15);

      if (videoIds.length > 0) {
        const results = videoIds.map((id, index) => ({
          videoId: id,
          title: `${cleanQuery} (Resultado ${index + 1})`,
          artist: 'YouTube Oficial',
          duration: '3:30',
          seconds: 210,
          thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          views: 'HD',
          youtubeUrl: `https://www.youtube.com/watch?v=${id}`
        }));

        return res.status(200).json({ success: true, results });
      }
    }
  } catch (_) {}

  return res.status(200).json({ success: false, results: [] });
}
