import React, { useState } from 'react';
import { X, QrCode, Copy, CheckCircle2, Smartphone, Download, Share2 } from 'lucide-react';

export default function QRCodeModal({ track, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!track) return null;

  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?v=${track.videoId}`
    : `https://streamflix-eight-kappa.vercel.app/?v=${track.videoId}`;

  // Usar servicio seguro de generación de QR en SVG con fondo blanco y azul cielo/negro
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentUrl)}&color=0284c7&bgcolor=ffffff&margin=1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-white border border-sky-100 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-5 text-center max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3">
          <div className="flex items-center space-x-2 text-left min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 text-white flex-shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 truncate">Código QR de Descarga</h3>
              <p className="text-[10px] text-slate-500 truncate">Escanea con tu celular</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Track Info */}
        <div className="space-y-1">
          <h4 className="text-xs font-black text-slate-900 truncate">{track.title}</h4>
          <p className="text-[11px] text-slate-500 truncate">{track.artist}</p>
        </div>

        {/* QR Code Container */}
        <div className="p-3 sm:p-4 bg-sky-50/50 rounded-2xl border border-sky-200 shadow-inner inline-block mx-auto">
          <img 
            src={qrImageUrl} 
            alt="Código QR de la canción"
            className="w-40 h-40 xs:w-48 xs:h-48 sm:w-52 sm:h-52 rounded-xl mx-auto shadow-sm bg-white p-2 object-contain"
            loading="eager"
          />
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          📱 <strong>Abre la cámara de tu celular</strong> y enfoca este código QR para abrir y descargar la canción directamente en tu teléfono.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleCopy}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md ${
              copied 
                ? 'bg-emerald-600 text-white shadow-emerald-500/20' 
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-500/20'
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
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
