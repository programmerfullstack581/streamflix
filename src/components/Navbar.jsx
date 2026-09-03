import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Download, 
  User, 
  Menu, 
  X, 
  Radio, 
  Sparkles,
  Heart,
  Home,
  Library,
  Zap,
  Link as LinkIcon
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  likedCount = 0,
  downloadsCount = 0,
  onOpenQuickDownload
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      alert('Para instalar StreamBeat Red como App en tu teléfono o PC, abre el menú de tu navegador y selecciona "Instalar aplicación" o "Agregar a pantalla principal".');
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'descargar-url', label: 'Descargar con URL (MP3 Directo)', icon: Zap, badge: 'MP3', badgeColor: 'bg-red-600 text-white' },
    { id: 'buscar', label: 'Buscar & Explorar', icon: Search },
    { id: 'favoritos', label: 'Favoritos Guardados', icon: Heart, count: likedCount },
    { id: 'descargas', label: 'Historial de Descargas', icon: Download, count: downloadsCount },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0d0d0d]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-red-600/15 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Navigation Arrows + Brand on mobile */}
        <div className="flex items-center space-x-3">
          {/* Mobile Logo */}
          <div 
            onClick={() => setActiveTab('inicio')}
            className="md:hidden flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-red-neon">
              <Radio className="w-4 h-4 text-white font-black" />
            </div>
            <span className="text-lg font-black text-white">STREAM<span className="text-red-500">BEAT</span></span>
          </div>

          {/* Desktop Back / Forward */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => window.history.back()}
              className="w-8 h-8 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] text-white flex items-center justify-center transition-colors border border-white/5"
              title="Atrás"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="w-8 h-8 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] text-white flex items-center justify-center transition-colors border border-white/5"
              title="Adelante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Bar on desktop */}
          {activeTab !== 'buscar' && (
            <div 
              onClick={() => setActiveTab('buscar')}
              className="hidden lg:flex items-center space-x-2.5 bg-[#171717] hover:bg-[#202020] text-gray-400 hover:text-white px-4 py-2 rounded-xl cursor-pointer transition-colors text-xs font-medium w-64 border border-white/5 hover:border-red-500/40"
            >
              <Search className="w-4 h-4 text-red-500" />
              <span>Buscar canción o pegar URL...</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Direct URL Downloader Button */}
          <button
            onClick={() => setActiveTab('descargar-url')}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs font-black transition-transform hover:scale-105 shadow-red-neon"
            title="Descargar música pegando enlace URL"
          >
            <Zap className="w-3.5 h-3.5 fill-white animate-pulse" />
            <span>Descargar con URL</span>
          </button>

          {/* PWA Install */}
          <button
            onClick={handleInstallApp}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors border border-white/10"
            title="Instalar App"
          >
            <Smartphone className="w-3.5 h-3.5 text-red-400" />
            <span>Instalar App</span>
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-neutral-900 border border-red-500/40 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md">
            <User className="w-4 h-4 text-white" />
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive ? 'bg-red-600 text-white font-black' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
                {item.count > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-black bg-white text-black">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                handleInstallApp();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-red-950/40 border border-red-500/30 text-white rounded-xl text-xs font-bold"
            >
              <Smartphone className="w-4 h-4 text-red-400" />
              <span>Instalar StreamBeat en tu celular</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
