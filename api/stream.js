// Vercel Serverless Function — Proxy de streaming para descarga directa
// Descarga el archivo y lo envía al navegador con Content-Disposition: attachment
// para que el navegador abra el diálogo "Guardar como..."

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { url, filename, format } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    // Descargar el archivo desde la URL directa
    const fileResponse = await fetch(url, {
      signal: AbortSignal.timeout(55000), // Vercel Pro permite hasta 60s
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!fileResponse.ok) {
      return res.status(502).json({ error: 'Failed to fetch file from source' });
    }

    const contentType = format === 'video' 
      ? 'video/mp4' 
      : 'audio/mpeg';

    const cleanFilename = (filename || 'descarga')
      .replace(/[<>:"/\\|?*]/g, '')
      .substring(0, 200);

    const ext = format === 'video' ? '.mp4' : '.mp3';
    const finalFilename = cleanFilename.endsWith(ext) ? cleanFilename : cleanFilename + ext;

    // Headers para forzar "Guardar como..." en el navegador
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${finalFilename}"; filename*=UTF-8''${encodeURIComponent(finalFilename)}`);
    
    const contentLength = fileResponse.headers.get('content-length');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    // Transmitir el archivo al navegador
    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.status(200).send(buffer);

  } catch (err) {
    console.error('Stream error:', err.message);
    return res.status(500).json({ error: 'Error downloading file: ' + err.message });
  }
}
