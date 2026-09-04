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

  // Helper para formatear segundos a MM:SS
  const formatSeconds = (sec) => {
    if (!sec || isNaN(sec)) return null;
    const num = parseInt(sec, 10);
    const mins = Math.floor(num / 60);
    const remaining = String(num % 60).padStart(2, '0');
    return `${mins}:${remaining}`;
  };

  // 1. Instancias Invidious & Piped para búsqueda directa en YouTube
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
          const sec = v.lengthSeconds || (v.duration ? parseInt(v.duration, 10) : 0);
          const durationFormatted = formatSeconds(sec) || (v.durationString || '3:30');

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
            duration: durationFormatted,
            seconds: sec || 210,
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

  // 2. Fallback de extracción directa de ytInitialData de YouTube para duraciones y títulos exactos
  try {
    const ytScrapeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}`;
    const ytRes = await fetch(ytScrapeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      },
      signal: AbortSignal.timeout(4500)
    });

    if (ytRes.ok) {
      const html = await ytRes.text();
      const jsonMatch = html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);

      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          const contents = parsed?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];

          const items = [];
          for (const item of contents) {
            const videoRenderer = item.videoRenderer;
            if (!videoRenderer || !videoRenderer.videoId) continue;

            const videoId = videoRenderer.videoId;
            const title = videoRenderer.title?.runs?.[0]?.text || cleanQuery;
            const artist = videoRenderer.ownerText?.runs?.[0]?.text || 'YouTube Oficial';
            const durationText = videoRenderer.lengthText?.simpleText || '3:30';
            const viewsText = videoRenderer.shortViewCountText?.simpleText || 'YouTube';

            items.push({
              videoId: videoId,
              title: title,
              artist: artist,
              duration: durationText,
              seconds: 210,
              thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
              views: viewsText,
              youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
            });

            if (items.length >= 20) break;
          }

          if (items.length > 0) {
            return res.status(200).json({ success: true, results: items });
          }
        } catch (_) {}
      }
    }
  } catch (_) {}

  return res.status(200).json({ success: false, results: [] });
}

