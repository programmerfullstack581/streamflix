import React from 'react';
import { X, Smartphone, Download, CheckCircle, Apple, Monitor } from 'lucide-react';

export default function InstallModal({ isOpen, onClose, deferredPrompt, onDirectInstall }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white border border-sky-100 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 text-white">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Instalar StreamBeat App</h3>
              <p className="text-xs text-slate-500">Sin Play Store ni descargas pesadas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Install Button if supported */}
        {deferredPrompt && (
          <button
            onClick={onDirectInstall}
            className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-black text-sm shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>INSTALAR AHORA CON 1 CLIC</span>
          </button>
        )}

        {/* Steps Guide */}
        <div className="space-y-3.5">
          {/* Android */}
          <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-sky-800 font-bold text-xs">
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>En Teléfonos Android (Chrome / Brave / Edge):</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              1. Toca el menú de <strong>3 puntos (⋮)</strong> en la esquina superior derecha.<br />
              2. Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.
            </p>
          </div>

          {/* iPhone */}
          <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-sky-800 font-bold text-xs">
              <Apple className="w-4 h-4 text-sky-600" />
              <span>En iPhone / iPad (Safari):</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              1. Toca el botón <strong>Compartir (📤)</strong> en la barra inferior.<br />
              2. Desliza hacia abajo y toca <strong>"Agregar al inicio" (➕)</strong>.
            </p>
          </div>

          {/* PC */}
          <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-sky-800 font-bold text-xs">
              <Monitor className="w-4 h-4 text-sky-600" />
              <span>En Computadores (PC / Mac):</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Haz clic en el icono de <strong>Instalar (💻 o ⬇️)</strong> que aparece al lado de la barra de dirección en Chrome o Edge.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-1 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Entendido, cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
