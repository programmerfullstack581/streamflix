import React from 'react';
import { 
  Home, 
  Download, 
  HardDrive, 
  Smartphone, 
  Zap, 
  Radio, 
  Sparkles,
  FileAudio,
  Film,
  Music2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({
  activeTab = 'inicio',
  setActiveTab,
  downloadsCount = 0,
  onOpenInstallModal
}) {
  return (
    <aside className="w-64 bg-white border-r border-sky-100 flex-col justify-between p-4 select-none flex-shrink-0 hidden md:flex h-screen sticky top-0 z-20 shadow-xs">
      
      {/* Top Section: Logo & Navigation */}
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('inicio')}
          className="flex items-center space-x-3 cursor-pointer group px-2 py-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 flex items-center justify-center shadow-md shadow-sky-400/20 text-white group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 font-black" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">STREAM</span>
              <span className="text-xl font-black text-sky-500 tracking-tight">BEAT</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
              AUDIO (MP3) & VIDEO (MP4)
            </span>
          </div>
        </div>

        {/* Main Navigation Menu */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Menú Principal
          </p>

          {/* Tab 1: Inicio / Descargador */}
          <button
            onClick={() => setActiveTab('inicio')}
            className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'inicio'
                ? 'bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 text-white shadow-md shadow-sky-400/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50/70 border border-transparent hover:border-sky-100'
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <div className="flex items-center justify-between flex-1">
              <span>Inicio / Descargador</span>
              {activeTab === 'inicio' && (
                <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded-md font-bold">
                  Activo
                </span>
              )}
            </div>
          </button>

          {/* Tab 2: Historial de Descargas Separado */}
          <button
            onClick={() => setActiveTab('historial')}
            className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'historial'
                ? 'bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 text-white shadow-md shadow-sky-400/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50/70 border border-transparent hover:border-sky-100'
            }`}
          >
            <HardDrive className="w-4 h-4 flex-shrink-0" />
            <div className="flex items-center justify-between flex-1">
              <span>Historial de Descargas</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'historial'
                  ? 'bg-white text-sky-700'
                  : 'bg-sky-100 text-sky-700'
              }`}>
                {downloadsCount}
              </span>
            </div>
          </button>

          {/* Tab 3: Instalar App */}
          <button
            onClick={onOpenInstallModal}
            className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-all cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-sky-500 flex-shrink-0" />
            <div className="flex items-center justify-between flex-1">
              <span>Instalar Aplicación</span>
              <span className="text-[9px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-md font-bold">
                PWA
              </span>
            </div>
          </button>
        </div>

        {/* Formatos Disponibles */}
        <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100/80 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-sky-800 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Calidades de Estudio</span>
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center space-x-1.5">
                <FileAudio className="w-3.5 h-3.5 text-sky-500" />
                <span>Audio MP3</span>
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-100">
                320 kbps HD
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center space-x-1.5">
                <Film className="w-3.5 h-3.5 text-sky-500" />
                <span>Video MP4</span>
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-100">
                1080p Full HD
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: Footer Status */}
      <div className="pt-4 border-t border-sky-100 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Servicio 100% Seguro y Gratis</span>
        </div>
        <p className="text-[10px] text-slate-400">
          StreamBeat © 2026 • Modo Claro Pastel
        </p>
      </div>

    </aside>
  );
}
