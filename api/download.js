// Vercel Serverless Function — Proxy de descarga directa usando Cobalt API
// Ruta: /api/download

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, format } = req.body; // format: 'audio' | 'video'

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Construir la YouTube URL completa si solo es un videoId
  let fullUrl = url;
  if (!url.startsWith('http')) {
    fullUrl = `https://www.youtube.com/watch?v=${url}`;
  }

  // Lista de instancias de Cobalt API (público, sin anuncios, open source)
  const cobaltInstances = [
    'https://api.cobalt.tools',
    'https://cobalt-api.kwiatekmiki.com',
    'https://cobalt.api.timelessnesses.me'
  ];

  // Intentar con cada instancia de Cobalt
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
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) continue;

      const data = await response.json();

      // Cobalt devuelve status: "tunnel" | "redirect" | "picker" con una URL directa
      if (data.status === 'tunnel' || data.status === 'redirect') {
        return res.status(200).json({
          success: true,
          downloadUrl: data.url,
          filename: data.filename || null
        });
      }

      // Si devuelve "picker" (múltiples opciones), tomar la primera
      if (data.status === 'picker' && data.picker && data.picker.length > 0) {
        return res.status(200).json({
          success: true,
          downloadUrl: data.picker[0].url,
          filename: data.picker[0].filename || null
        });
      }

    } catch (err) {
      console.error(`Cobalt instance ${instance} failed:`, err.message);
      continue;
    }
  }

  // Fallback: devolver URL de Y2Mate para que el frontend abra externamente
  const videoId = fullUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/)?.[1] || 
                   fullUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)?.[1] || '';
  
  const fallbackUrl = format === 'audio'
    ? `https://www.y2mate.com/youtube-mp3/${videoId}`
    : `https://www.y2mate.com/youtube/${videoId}`;

  return res.status(200).json({
    success: false,
    fallbackUrl: fallbackUrl,
    message: 'Direct download unavailable, using fallback'
  });
}
