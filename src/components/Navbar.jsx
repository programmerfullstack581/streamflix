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
  Library
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
      alert('Para instalar Streamify como App en tu teléfono o PC, abre el menú de tu navegador y selecciona "Instalar aplicación" o "Agregar a pantalla principal".');
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'buscar', label: 'Buscar & Explorar', icon: Search },
    { id: 'favoritos', label: 'Canciones que te gustan', icon: Heart, count: likedCount },
    { id: 'descargas', label: 'Descargas / Formatos MP3', icon: Download, count: downloadsCount },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#121212]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-white/5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Navigation Arrows + Brand on mobile */}
        <div className="flex items-center space-x-3">
          {/* Mobile Logo */}
          <div 
            onClick={() => setActiveTab('inicio')}
            className="md:hidden flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
              <Radio className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-black text-white">Streamify</span>
          </div>

          {/* Desktop Back / Forward */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => window.history.back()}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
              title="Atrás"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
              title="Adelante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search on desktop when in home/library */}
          {activeTab !== 'buscar' && (
            <div 
              onClick={() => setActiveTab('buscar')}
              className="hidden lg:flex items-center space-x-2.5 bg-[#242424] hover:bg-[#2a2a2a] text-gray-400 hover:text-white px-4 py-2 rounded-full cursor-pointer transition-colors text-xs font-medium w-64 border border-transparent hover:border-white/10"
            >
              <Search className="w-4 h-4" />
              <span>¿Qué quieres escuchar?</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Quick Download in Any Format Button */}
          <button
            onClick={() => setActiveTab('descargas')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full text-xs font-black transition-transform hover:scale-105 shadow-md"
            title="Centro de descargas en MP3, WAV, FLAC"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Música</span>
          </button>

          {/* PWA Install */}
          <button
            onClick={handleInstallApp}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-colors"
            title="Instalar App"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#1DB954]" />
            <span>Instalar App</span>
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#282828] border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
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
                  isActive ? 'bg-[#1DB954] text-black' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-black text-white' : 'bg-[#1DB954] text-black'
                  }`}>
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
              className="w-full flex items-center justify-center space-x-2 py-3 bg-white/10 text-white rounded-xl text-xs font-bold"
            >
              <Smartphone className="w-4 h-4 text-[#1DB954]" />
              <span>Instalar Streamify en tu teléfono</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
