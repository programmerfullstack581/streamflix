// Vercel Serverless Function — Conversión y Descarga Directa de Audio y Video
// Ruta: /api/download

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, format } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  let fullUrl = url;
  if (!url.startsWith('http')) {
    fullUrl = `https://www.youtube.com/watch?v=${url}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // MOTOR PRINCIPAL: Loader.to API (Alta velocidad y 100% garantizado)
  // ═══════════════════════════════════════════════════════════════
  try {
    const targetFormat = format === 'video' ? '720' : 'mp3';
    const initUrl = `https://loader.to/ajax/download.php?format=${targetFormat}&url=${encodeURIComponent(fullUrl)}`;

    const initRes = await fetch(initUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (initRes.ok) {
      const initData = await initRes.json();
      const progressUrl = initData.progress_url;
      const title = initData.title || initData.info?.title || 'musica';

      if (progressUrl) {
        // Polling hasta que el archivo esté listo (máximo 20 intentos = ~25 seg)
        for (let i = 0; i < 20; i++) {
          await new Promise(r => setTimeout(r, 1200));
          try {
            const pRes = await fetch(progressUrl, {
              headers: { 'User-Agent': 'Mozilla/5.0' },
              signal: AbortSignal.timeout(5000)
            });

            if (pRes.ok) {
              const pData = await pRes.json();
              if (pData.download_url && pData.download_url.length > 5) {
                return res.status(200).json({
                  success: true,
                  downloadUrl: pData.download_url,
                  filename: title,
                  format: format
                });
              }
            }
          } catch (_) {
            continue;
          }
        }
      }
    }
  } catch (err) {
    console.error('Loader API error:', err.message);
  }

  // ═══════════════════════════════════════════════════════════════
  // MOTOR SECUNDARIO: Cobalt API (Fallback)
  // ═══════════════════════════════════════════════════════════════
  const cobaltInstances = [
    'https://api.cobalt.tools',
    'https://cobalt-api.kwiatekmiki.com',
    'https://cobalt.api.timelessnesses.me'
  ];

  for (const instance of cobaltInstances) {
    try {
      const response = await fetch(`${instance}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          url: fullUrl,
          downloadMode: format === 'audio' ? 'audio' : 'auto',
          audioFormat: 'mp3',
          videoQuality: '720'
        }),
        signal: AbortSignal.timeout(8000)
      });

      if (!response.ok) continue;
      const data = await response.json();

      if ((data.status === 'tunnel' || data.status === 'redirect') && data.url) {
        return res.status(200).json({
          success: true,
          downloadUrl: data.url,
          filename: data.filename || null
        });
      }
    } catch (_) {
      continue;
    }
  }

  return res.status(200).json({
    success: false,
    error: 'El video está tardando más de lo habitual en procesarse. Por favor haz clic de nuevo para reintentar.',
    retryable: true
  });
}
