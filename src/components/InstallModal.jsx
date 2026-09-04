import React from 'react';
import { X, Smartphone, Download, CheckCircle, Apple, Monitor } from 'lucide-react';

export default function InstallModal({ isOpen, onClose, deferredPrompt, onDirectInstall }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#141414] border border-red-600/40 rounded-3xl shadow-red-neon overflow-hidden p-6 space-y-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-red-neon">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Instalar StreamBeat App</h3>
              <p className="text-xs text-gray-400">Sin Play Store ni descargas pesadas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Install Button if supported */}
        {deferredPrompt && (
          <button
            onClick={onDirectInstall}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-black text-sm shadow-red-neon flex items-center justify-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>INSTALAR AHORA CON 1 CLIC</span>
          </button>
        )}

        {/* Steps Guide */}
        <div className="space-y-3.5">
          {/* Android */}
          <div className="p-3.5 bg-[#0d0d0d] rounded-2xl border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs">
              <Smartphone className="w-4 h-4" />
              <span>En Teléfonos Android (Chrome / Brave / Edge):</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pl-6">
              1. Toca el menú de <strong>3 puntos (⋮)</strong> en la esquina superior derecha.<br />
              2. Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.
            </p>
          </div>

          {/* iPhone */}
          <div className="p-3.5 bg-[#0d0d0d] rounded-2xl border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs">
              <Apple className="w-4 h-4" />
              <span>En iPhone / iPad (Safari):</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pl-6">
              1. Toca el botón <strong>Compartir (📤)</strong> en la barra inferior.<br />
              2. Desliza hacia abajo y toca <strong>"Agregar al inicio" (➕)</strong>.
            </p>
          </div>

          {/* PC */}
          <div className="p-3.5 bg-[#0d0d0d] rounded-2xl border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs">
              <Monitor className="w-4 h-4" />
              <span>En Computadores (PC / Mac):</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pl-6">
              Haz clic en el icono de <strong>Instalar (💻 o ⬇️)</strong> que aparece al lado de la barra de dirección en Chrome o Edge.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-1 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Entendido, cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
