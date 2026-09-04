// Vercel Serverless Function — Descarga directa usando múltiples APIs de conversión
// Ruta: /api/download

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, format } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Asegurar URL completa de YouTube
  let fullUrl = url;
  if (!url.startsWith('http')) {
    fullUrl = `https://www.youtube.com/watch?v=${url}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // INTENTO 1: Cobalt API (instancias públicas activas)
  // ═══════════════════════════════════════════════════════════════
  const cobaltInstances = [
    'https://api.cobalt.tools',
    'https://cobalt-api.kwiatekmiki.com',
    'https://cobalt.api.timelessnesses.me',
    'https://api.cobalt.best'
  ];

  for (const instance of cobaltInstances) {
    try {
      const cobaltBody = {
        url: fullUrl,
        downloadMode: format === 'audio' ? 'audio' : 'auto',
        audioFormat: 'mp3',
        audioBitrate: '320',
        filenameStyle: 'pretty',
        videoQuality: '1080'
      };

      const response = await fetch(`${instance}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cobaltBody),
        signal: AbortSignal.timeout(12000)
      });

      if (!response.ok) continue;

      const data = await response.json();

      if ((data.status === 'tunnel' || data.status === 'redirect') && data.url) {
        return res.status(200).json({
          success: true,
          downloadUrl: data.url,
          filename: data.filename || null,
          source: 'cobalt'
        });
      }

      if (data.status === 'picker' && data.picker && data.picker.length > 0) {
        return res.status(200).json({
          success: true,
          downloadUrl: data.picker[0].url,
          filename: data.picker[0].filename || null,
          source: 'cobalt-picker'
        });
      }
    } catch (err) {
      continue;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // INTENTO 2: API alternativa con youtube-dl compatible
  // ═══════════════════════════════════════════════════════════════
  const altApis = [
    {
      name: 'savefrom-style',
      buildUrl: (ytUrl, fmt) => {
        const encodedUrl = encodeURIComponent(ytUrl);
        return `https://co.wuk.sh/api/json?url=${encodedUrl}&aFormat=mp3&filenamePattern=pretty&isAudioOnly=${fmt === 'audio'}&dubLang=false&vQuality=1080`;
      }
    }
  ];

  for (const api of altApis) {
    try {
      const apiUrl = api.buildUrl(fullUrl, format);
      const response = await fetch(apiUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) continue;
      const data = await response.json();

      if (data.url) {
        return res.status(200).json({
          success: true,
          downloadUrl: data.url,
          filename: data.filename || null,
          source: api.name
        });
      }
    } catch (err) {
      continue;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // NO HAY FALLBACK EXTERNO — Devolver error limpio
  // ═══════════════════════════════════════════════════════════════
  return res.status(200).json({
    success: false,
    error: 'Los servidores de descarga están temporalmente saturados. Intenta de nuevo en unos segundos.',
    retryable: true
  });
}
