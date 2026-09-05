import React, { useState, useEffect } from 'react';
import DownloadsView from './components/DownloadsView';
import DownloadModal from './components/DownloadModal';
import InstallModal from './components/InstallModal';
import { MusicStorage } from './services/musicService';
import { Radio, Smartphone, Zap, HardDrive } from 'lucide-react';

export default function App() {
  const [downloadModalTrack, setDownloadModalTrack] = useState(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    setDownloads(MusicStorage.getDownloads());

    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInstallApp = () => {
    setIsInstallModalOpen(true);
  };

  const handleDirectInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setIsInstallModalOpen(false);
      });
    }
  };

  const handleOpenDownload = (track) => {
    setDownloadModalTrack(track);
  };

  const handleRefreshDownloads = () => {
    setDownloads(MusicStorage.getDownloads());
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-800 flex flex-col font-sans selection:bg-[#0284C7] selection:text-white">
      
      {/* Barra Superior Limpia y Moderna (Modo Claro Azul Cielo & Blanco) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-sky-100 select-none shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo / Marca */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white">
              <Radio className="w-5 h-5 font-black" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">STREAM</span>
                <span className="text-xl font-black text-[#0284C7] tracking-tight">BEAT</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                DESCARGADOR DE AUDIO (MP3) & VIDEO (MP4)
              </span>
            </div>
          </div>

          {/* Acciones Superiores: Contador de Descargas e Instalación PWA */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-600 font-bold bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100">
              <HardDrive className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Descargas guardadas: <strong className="text-slate-900">{downloads.length}</strong></span>
            </div>

            <button
              onClick={handleInstallApp}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-500/20 cursor-pointer active:scale-95"
              title="Instalar App en tu celular o PC"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Instalar App</span>
            </button>
          </div>

        </div>
      </header>

      {/* Vista Principal Exclusiva: Buscador, Descargador con URL, Éxitos y Historial */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 pb-20">
        <DownloadsView
          downloads={downloads}
          onOpenDownloadModal={handleOpenDownload}
          onRefreshDownloads={handleRefreshDownloads}
        />
      </main>

      {/* Modal de Descarga Multiformato */}
      {downloadModalTrack && (
        <DownloadModal
          track={downloadModalTrack}
          onClose={() => setDownloadModalTrack(null)}
          onDownloadRecorded={handleRefreshDownloads}
        />
      )}

      {/* Modal de Instalación PWA */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onDirectInstall={handleDirectInstall}
      />

      {/* Notificación Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#0284C7] text-white font-black px-5 py-3 rounded-full shadow-xl shadow-sky-500/30 flex items-center space-x-2 animate-fadeIn border border-white/30">
          <Zap className="w-4 h-4 fill-white" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
