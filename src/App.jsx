import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DownloadsView from './components/DownloadsView';
import YoutubeFeedView from './components/YoutubeFeedView';
import HistoryView from './components/HistoryView';
import DownloadModal from './components/DownloadModal';
import OndaPlayer from './components/OndaPlayer';
import InstallModal from './components/InstallModal';
import { MusicStorage } from './services/musicService';
import { 
  Radio, 
  Smartphone, 
  Zap, 
  HardDrive, 
  Home, 
  Download, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Youtube,
  Moon,
  Sun
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [globalPlayerTrack, setGlobalPlayerTrack] = useState(null);
  const [downloadModalTrack, setDownloadModalTrack] = useState(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Por defecto Modo Claro (#F8FAFC); solo activa oscuro si el usuario lo activó explícitamente
    return localStorage.getItem('theme_mode') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_mode', 'dark');
      localStorage.removeItem('theme');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_mode', 'light');
      localStorage.removeItem('theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setDownloads(MusicStorage.getDownloads());

    // Capturar evento de instalación nativa PWA
    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallModalOpen(false);
      showToast('🎉 ¡AlgoRitmo se agregó exitosamente a tu pantalla de inicio!');
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Función inteligente para instalar la App
  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showToast('🎉 ¡Instalando AlgoRitmo en tu dispositivo!');
        }
        setDeferredPrompt(null);
        setIsInstallModalOpen(false);
      }).catch(() => {
        setIsInstallModalOpen(true);
      });
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const handleDirectInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showToast('🎉 ¡AlgoRitmo instalada en tu pantalla de inicio!');
        }
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
    <div className="h-screen w-full bg-background text-slate-200 flex font-sans selection:bg-onda-cyan selection:text-black overflow-hidden transition-colors duration-300">
      
      {/* 1. Menú Lateral Izquierdo (Sidebar en Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          const scrollContainer = document.getElementById('main-scroll-container');
          if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        downloadsCount={downloads.length}
        onOpenInstallModal={handleInstallApp}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* 2. Área Principal de Contenido (Responsive) */}
      <div id="main-scroll-container" className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto pb-24 sm:pb-28 md:pb-8">
        
        {/* Barra Superior */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-md px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3 border-b border-sky-100/80 dark:border-slate-800 select-none shadow-xs transition-colors duration-300">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
            
            {/* Logo en Móvil y Toggle (oculto en desktop porque ya está en el Sidebar) */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-1 sm:-ml-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer flex-shrink-0"
                title="Menú de Navegación"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group" onClick={() => setActiveTab('inicio')}>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 flex items-center justify-center shadow-md shadow-sky-400/20 text-white flex-shrink-0">
                  <span className="font-bold text-lg sm:text-xl transform -skew-x-6">N</span>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-base sm:text-lg font-black text-slate-800 tracking-tight">Nova</span>
                    <span className="text-base sm:text-lg font-black text-sky-500 tracking-tight">Stream</span>
                  </div>
                  <span className="hidden min-[380px]:inline-block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 truncate">
                    Premium Music
                  </span>
                </div>
              </div>
            </div>

            {/* Navegación Desktop: se expande al ancho completo */}
            <div className="hidden md:flex items-center flex-1">
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 flex-1">
                <button
                  onClick={() => setActiveTab('inicio')}
                  className={`flex items-center justify-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex-1 ${
                    activeTab === 'inicio'
                      ? 'bg-white text-sky-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Inicio</span>
                </button>

                <button
                  onClick={() => setActiveTab('youtube')}
                  className={`flex items-center justify-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex-1 ${
                    activeTab === 'youtube'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-red-600'
                  }`}
                >
                  <Youtube className={`w-4 h-4 ${activeTab === 'youtube' ? 'text-white' : 'text-red-500'}`} />
                  <span>Videos YouTube</span>
                </button>

                <button
                  onClick={() => setActiveTab('historial')}
                  className={`flex items-center justify-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex-1 ${
                    activeTab === 'historial'
                      ? 'bg-white text-sky-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HardDrive className="w-4 h-4" />
                  <span>Historial ({downloads.length})</span>
                </button>
              </div>

              {/* Botón Instalar App Desktop */}
              <button
                onClick={handleInstallApp}
                className="flex items-center space-x-2 px-5 py-2.5 ml-3 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-sky-400/20 cursor-pointer active:scale-95 flex-shrink-0"
                title="Instalar App en tu celular o PC"
              >
                <Smartphone className="w-4 h-4" />
                <span>Instalar App</span>
              </button>
            </div>

            {/* Acciones Móvil: Pestañas compactas + Modo Claro/Oscuro + Instalar */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 flex-shrink-0 md:hidden">
              
              {/* Selector de Pestañas compacto en Header para Tablet */}
              <div className="hidden sm:flex md:hidden items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <button
                  onClick={() => setActiveTab('inicio')}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'inicio'
                      ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Inicio</span>
                </button>

                <button
                  onClick={() => setActiveTab('youtube')}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'youtube'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <Youtube className={`w-3.5 h-3.5 ${activeTab === 'youtube' ? 'text-white' : 'text-red-500'}`} />
                  <span>Videos YouTube</span>
                </button>

                <button
                  onClick={() => setActiveTab('historial')}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'historial'
                      ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Historial ({downloads.length})</span>
                </button>
              </div>

              {/* Botón Modo Claro / Modo Oscuro en Móvil */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
                title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                aria-label="Cambiar tema"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Botón Instalar App Móvil */}
              <button
                onClick={handleInstallApp}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-400/20 cursor-pointer active:scale-95 flex-shrink-0"
                title="Instalar App en tu celular o PC"
              >
                <Smartphone className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden xs:inline">Instalar App</span>
                <span className="xs:hidden">Instalar</span>
              </button>
            </div>

          </div>

          {/* Drawer Desplegable Móvil */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-slate-100 dark:border-slate-800 mt-3 space-y-2 animate-fadeIn bg-white dark:bg-[#141414] p-3 rounded-2xl shadow-xl">
              <button
                onClick={() => { setActiveTab('inicio'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'inicio'
                    ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>🏠 Inicio / Descargar Música</span>
              </button>

              <button
                onClick={() => { setActiveTab('youtube'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>📺 Videos YouTube (Feed & Reproductor)</span>
              </button>

              <button
                onClick={() => { setActiveTab('historial'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'historial'
                    ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-4 h-4" />
                  <span>📂 Historial de Descargas</span>
                </div>
                <span className="bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full text-[10px]">
                  {downloads.length}
                </span>
              </button>

              {/* Botón de Modo Claro / Oscuro en Drawer */}
              <button
                onClick={() => { setIsDarkMode(!isDarkMode); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
                  <span>{isDarkMode ? '☀️ Cambiar a Modo Claro' : '🌙 Cambiar a Modo Oscuro'}</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {isDarkMode ? 'Oscuro' : 'Claro'}
                </span>
              </button>

              <button
                onClick={() => { handleInstallApp(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <Smartphone className="w-4 h-4 text-sky-500" />
                <span>📱 Instalar en Pantalla Principal</span>
              </button>
            </div>
          )}

        </header>

        {/* Vista Activa Principal */}
        <main className="max-w-6xl w-full mx-auto px-3.5 sm:px-8 py-5 sm:py-8">
          {activeTab === 'inicio' && (
            <DownloadsView
              downloads={downloads}
              onOpenDownloadModal={handleOpenDownload}
              onRefreshDownloads={handleRefreshDownloads}
              onGoToHistory={() => {
                setActiveTab('historial');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'youtube' && (
            <YoutubeFeedView
              onOpenDownloadModal={handleOpenDownload}
              onShowToast={showToast}
              onPlayVideo={setGlobalPlayerTrack}
            />
          )}

          {activeTab === 'historial' && (
            <HistoryView
              downloads={downloads}
              onRefreshDownloads={handleRefreshDownloads}
              onOpenDownloadModal={handleOpenDownload}
              onGoToHome={() => {
                setActiveTab('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

      </div>

<<<<<<< HEAD
      {/* Reproductor Persistente Onda */}
      <OndaPlayer 
        track={globalPlayerTrack} 
        onClose={() => setGlobalPlayerTrack(null)} 
        onOpenDownload={handleOpenDownload} 
      />

      {/* 3. Navegación Inferior (Mobile Solo) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-[#09090B] border-t border-sky-100 dark:border-slate-800 flex justify-around p-3 pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors duration-300">
=======
      {/* 3. Barra de Navegación Inferior Flotante (100% Mobile Responsive con Safe-Area) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-md border-t border-sky-100 dark:border-slate-800 py-2 px-6 flex justify-around items-center shadow-lg pb-safe transition-colors duration-300">
>>>>>>> cd1393c4c6a0933d745fef907f0d786a008bded5
        
        {/* Botón Móvil: Inicio */}
        <button
          onClick={() => {
            setActiveTab('inicio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center space-y-1 transition-all cursor-pointer ${
            activeTab === 'inicio' ? 'text-sky-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>

        {/* Botón Móvil: Videos YouTube */}
        <button
          onClick={() => {
            setActiveTab('youtube');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center space-y-1 transition-all cursor-pointer ${
            activeTab === 'youtube' ? 'text-red-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Youtube className="w-5 h-5" />
          <span className="text-[10px] font-bold">Videos</span>
        </button>

        {/* Botón Móvil: Historial con burbuja contadora */}
        <button
          onClick={() => {
            setActiveTab('historial');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center space-y-1 transition-all relative cursor-pointer ${
            activeTab === 'historial' ? 'text-sky-600 scale-105' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <HardDrive className="w-5 h-5" />
            {downloads.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-sky-400 to-sky-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {downloads.length > 99 ? '99+' : downloads.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Historial</span>
        </button>

        {/* Botón Móvil: Instalar */}
        <button
          onClick={handleInstallApp}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-sky-600 transition-all cursor-pointer"
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] font-bold">Instalar</span>
        </button>

      </nav>

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

      {/* Notificación Toast (posicionada sobre la barra inferior móvil) */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg shadow-sky-400/25 flex items-center space-x-2 animate-fadeIn border border-white/30 max-w-[90vw] text-center">
          <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
