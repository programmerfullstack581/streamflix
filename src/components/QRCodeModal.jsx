import React, { useState } from 'react';
import { X, QrCode, Copy, CheckCircle2, Smartphone, Download, Share2 } from 'lucide-react';

export default function QRCodeModal({ track, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!track) return null;

  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?v=${track.videoId}`
    : `https://streamflix-eight-kappa.vercel.app/?v=${track.videoId}`;

  // Usar servicio seguro de generación de QR en SVG de alta resolución
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentUrl)}&color=ffffff&bgcolor=141414&margin=1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#121216] border border-red-500/40 rounded-3xl shadow-red-neon overflow-hidden p-6 space-y-5 text-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-red-neon">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Código QR de Descarga</h3>
              <p className="text-[10px] text-gray-400">Escanea con tu celular</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Track Info */}
        <div className="space-y-1">
          <h4 className="text-xs font-black text-white truncate">{track.title}</h4>
          <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-[#0a0a0d] rounded-2xl border border-red-500/20 shadow-inner inline-block mx-auto ring-1 ring-white/5">
          <img 
            src={qrImageUrl} 
            alt="Código QR de la canción"
            className="w-52 h-52 rounded-xl mx-auto shadow-md"
            loading="eager"
          />
        </div>

        <p className="text-[11px] text-gray-300 leading-relaxed">
          📱 <strong>Abre la cámara de tu celular</strong> y enfoca este código QR para abrir y descargar la canción directamente en tu teléfono.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleCopy}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-neon'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Enlace Copiado al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Enlace Directo</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
